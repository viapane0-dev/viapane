
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SUBIDA_DIR = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida site/Pães macios'
const TXT_FILE = path.resolve(dirname, '../../paes_macios.txt')

const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()

const tokenize = (str: string) => normalize(str).split(/\s+/).filter(t => t.length > 2)

const parseProducts = () => {
    const content = fs.readFileSync(TXT_FILE, 'utf-8')
    const lines = content.split('\n').map(l => l.trim()).filter(l => l)

    const products: any[] = []

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('Ingredientes:')) {
            // Found a product block anchor. 
            // The previous line is the Name.
            const name = lines[i - 1]
            if (!name) continue // Should not happen unless file starts with Ingredientes

            const product: any = { name }

            // Parse fields from here until next Name (or End)
            // Next Name is defined as the line BEFORE the NEXT 'Ingredientes:'
            // So we scan until we find the next 'Ingredientes:'

            let j = i
            let ingredients = ''
            let preparation = ''
            let features = ''

            // Collect Ingredients
            if (lines[j].startsWith('Ingredientes:')) {
                ingredients = lines[j].replace(/^Ingredientes:\s*/, '')
                j++
            }

            // Collect Preparation
            while (j < lines.length && !lines[j].startsWith('Modo de Preparo:') && !lines[j].startsWith('Modo de preparo:') && !lines[j].startsWith('Características:')) {
                // If we hit next product's ingredients, stop
                if (j + 1 < lines.length && lines[j + 1].startsWith('Ingredientes:')) break
                // Append to ingredients if multi-line? Usually single line but safety check
                // For now assume structure is strict
                j++
            }

            if (j < lines.length && (lines[j].startsWith('Modo de Preparo:') || lines[j].startsWith('Modo de preparo:'))) {
                preparation = lines[j].replace(/^Modo de [Pp]reparo:\s*/, '')
                j++
            }

            // Collect Features
            // Skip until Características
            while (j < lines.length && !lines[j].startsWith('Características:')) {
                if (j + 1 < lines.length && lines[j + 1].startsWith('Ingredientes:')) break
                j++
            }

            if (j < lines.length && lines[j].startsWith('Características:')) {
                features = lines[j].replace(/^Características:\s*/, '')
                j++
                // Continued features?
                while (j < lines.length) {
                    // specific stop check: if next line is followed by 'Ingredientes:'
                    if (j + 1 < lines.length && lines[j + 1].startsWith('Ingredientes:')) break
                    // Or current line is PÃES MACIOS title
                    if (lines[j] === 'PÃES MACIOS') break

                    features += ' ' + lines[j]
                    j++
                }
            }

            product.ingredients = ingredients
            product.preparation = preparation
            product.features = features

            products.push(product)
        }
    }
    return products
}

const createRichText = (text: string) => ({
    root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                    {
                        mode: 'normal',
                        text: text || '',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    }
                ]
            }
        ]
    }
})

const uploadProducts = async () => {
    const payload = await getPayload({ config })
    const products = parseProducts()

    console.log(`Found ${products.length} products to upload.`)

    const categories = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Pães Macios' } }
    })

    let category = categories.docs[0]
    if (!category) {
        const allCats = await payload.find({ collection: 'product-categories', limit: 100 })
        category = allCats.docs.find((c: any) => normalize(c.name) === normalize('Pães Macios'))
    }

    if (!category) {
        console.error('Category Pães Macios not found! Please create it manually.')
        process.exit(1)
    }

    console.log(`Using category: ${category.name} (${category.id})`)

    const validFolders = fs.readdirSync(SUBIDA_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())

    for (const prod of products) {
        process.stdout.write(`Processing ${prod.name}... `)

        // Matching
        let folder = validFolders.find(d => normalize(d.name) === normalize(prod.name))

        if (!folder) {
            const prodTokens = tokenize(prod.name)
            folder = validFolders.find(d => {
                const folderTokens = tokenize(d.name)
                const intersection = prodTokens.filter(t => folderTokens.some(ft => ft.includes(t) || t.includes(ft)))
                return intersection.length >= Math.min(prodTokens.length, 2)
            })
        }

        let mediaId = null
        if (folder) {
            const folderPath = path.join(SUBIDA_DIR, folder.name)
            const files = fs.readdirSync(folderPath)
            const imageFile = files.find(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

            if (imageFile) {
                const imagePath = path.join(folderPath, imageFile)
                try {
                    // Convert with Sharp to fix any corruption/format issues and strip metadata
                    const buffer = await sharp(imagePath)
                        .rotate() // Auto-rotate based on EXIF
                        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }) // Reasonable max size
                        .jpeg({ quality: 85 })
                        .toBuffer()

                    const media = await payload.create({
                        collection: 'media',
                        data: { alt: prod.name },
                        file: {
                            data: buffer,
                            name: imageFile.replace(/\.[^.]+$/, '.jpg'),
                            mimetype: 'image/jpeg',
                            size: buffer.length
                        }
                    })
                    mediaId = media.id
                    process.stdout.write(`[Image Uploaded] `)
                } catch (e) {
                    process.stdout.write(`[Image Failed: ${e.message}] `)
                }
            } else {
                process.stdout.write(`[No Image File] `)
            }
        } else {
            process.stdout.write(`[No Folder] `)
        }

        // Create/Update Product
        try {
            const existing = await payload.find({
                collection: 'products',
                where: { name: { equals: prod.name } }
            })

            const data = {
                name: prod.name,
                slug: normalize(prod.name).replace(/\s+/g, '-'),
                category: category.id,
                description: createRichText(prod.features),
                ingredients: createRichText(prod.ingredients),
                preparation: createRichText(prod.preparation),
                image: mediaId,
                nutritionalTable: { description: "Informação nutricional indisponível no momento." }
            }

            if (existing.docs.length > 0) {
                await payload.update({
                    collection: 'products',
                    id: existing.docs[0].id,
                    data: data
                })
                console.log(`[Updated Product]`)
            } else {
                await payload.create({
                    collection: 'products',
                    data: data
                })
                console.log(`[Created Product]`)
            }

        } catch (e) {
            console.error(`[Product Error: ${e.message}]`)
        }
    }

    console.log('Done.')
    process.exit(0)
}

uploadProducts()

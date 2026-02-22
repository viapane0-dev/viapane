
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

    // We iterate looking for "Ingredientes:"
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('Ingredientes:')) {
            // The line BEFORE is the name.
            if (i === 0) continue // Should not happen
            const name = lines[i - 1]

            // Collect Ingredients
            let ingredients = lines[i].replace(/^Ingredientes:\s*/, '')

            // Search for Preparation
            let j = i + 1
            let preparation = ''

            // Absorb extra lines into ingredients if they don't start with keywords
            while (j < lines.length && !lines[j].match(/^Modo de [Pp]reparo:/) && !lines[j].startsWith('Características:')) {
                // Safety: stop if we hit another "Ingredientes:" (means we missed a keyword, better to fail soft)
                if (lines[j].startsWith('Ingredientes:')) break
                ingredients += ' ' + lines[j]
                j++
            }

            // Collect Preparation
            if (j < lines.length && lines[j].match(/^Modo de [Pp]reparo:/)) {
                preparation = lines[j].replace(/^Modo de [Pp]reparo:\s*/, '')
                j++
                while (j < lines.length && !lines[j].startsWith('Características:')) {
                    if (lines[j].startsWith('Ingredientes:')) break
                    preparation += ' ' + lines[j]
                    j++
                }
            }

            // Collect Features
            let features = ''
            if (j < lines.length && lines[j].startsWith('Características:')) {
                features = lines[j].replace(/^Características:\s*/, '')
                j++
                while (j < lines.length) {
                    // Stop if we see the NEXT product's anchor (Ingredientes:)
                    // The line BEFORE that anchor is the name, so we stop 1 line before that anchor.
                    if (j + 1 < lines.length && lines[j + 1].startsWith('Ingredientes:')) break

                    // Also stop if we hit explicit "PÃES MACIOS"
                    if (lines[j] === 'PÃES MACIOS') break

                    features += ' ' + lines[j]
                    j++
                }
            }

            products.push({
                name,
                ingredients,
                preparation,
                features
            })
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

    // Find or Create Category
    let category
    const categories = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Pães Macios' } }
    })

    if (categories.docs.length > 0) {
        category = categories.docs[0]
    } else {
        // Case insensitive check
        const allCats = await payload.find({ collection: 'product-categories', limit: 100 })
        category = allCats.docs.find((c: any) => normalize(c.name) === normalize('Pães Macios'))

        if (!category) {
            console.log('Category Pães Macios not found, creating...')
            const parent = allCats.docs.find((c: any) => normalize(c.name) === normalize('Panificação'))
            category = await payload.create({
                collection: 'product-categories',
                data: {
                    name: 'Pães Macios',
                    parent: parent ? parent.id : undefined
                }
            })
        }
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
                // Relaxed fuzzy matching
                const intersection = prodTokens.filter(t => folderTokens.some(ft => ft.includes(t) || t.includes(ft)))
                return intersection.length >= Math.min(prodTokens.length, 1) // At least 1 strong token match
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
                    // Sharp processing
                    const buffer = await sharp(imagePath)
                        .rotate()
                        .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
                        .jpeg({ quality: 80 })
                        .toBuffer()

                    const media = await payload.create({
                        collection: 'media',
                        data: { alt: prod.name },
                        file: {
                            data: buffer,
                            name: `${normalize(prod.name).replace(/\s+/g, '-')}.jpg`,
                            mimetype: 'image/jpeg',
                            size: buffer.length
                        }
                    })
                    mediaId = media.id
                    process.stdout.write(`[Img OK] `)
                } catch (e) {
                    process.stdout.write(`[Img Fail] `)
                }
            } else {
                process.stdout.write(`[No Img File] `)
            }
        } else {
            process.stdout.write(`[No Folder] `)
        }

        // Create/Update Product
        try {
            // Correct Schema Mapping based on Products.ts
            const data = {
                name: prod.name,
                slug: normalize(prod.name).replace(/\s+/g, '-'),
                category: category.id,

                // Tabs -> Dados Básicos
                description: prod.features.substring(0, 150) + '...', // Short description from first part of features
                mainImage: mediaId, // CORRECT FIELD NAME

                // Tabs -> Detalhes e Info Técnica
                characteristics: createRichText(prod.features), // CORRECT FIELD NAME

                // Tabs -> Preparo e Ingredientes
                ingredients: createRichText(prod.ingredients),
                preparationMode: createRichText(prod.preparation), // CORRECT FIELD NAME

                nutritionalTable: { description: "Informação nutricional indisponível no momento." }
            }

            await payload.create({
                collection: 'products',
                data: data
            })
            console.log(`[Created]`)

        } catch (e) {
            console.error(`[Error: ${(e as Error).message}]`)
        }
    }

    console.log('Done.')
    process.exit(0)
}

uploadProducts()

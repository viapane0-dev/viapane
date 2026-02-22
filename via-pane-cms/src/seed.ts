import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../.env'),
})

console.log('Loading env from:', path.resolve(dirname, '../.env'))
console.log('PAYLOAD_SECRET present:', !!process.env.PAYLOAD_SECRET)
console.log('DATABASE_URI present:', !!process.env.DATABASE_URI)

import { getPayload } from 'payload'

const seed = async () => {
    const { default: config } = await import('./payload.config')
    const payload = await getPayload({ config })

    // unique strings to perform lookups on
    const email = 'viapane0@gmail.com'

    // Create Admin User
    const users = await payload.find({
        collection: 'users',
        where: {
            email: {
                equals: email,
            },
        },
    })

    if (users.totalDocs === 0) {
        await payload.create({
            collection: 'users',
            data: {
                email,
                password: '!QAZ2wsx',
            },
        })
        console.log('Admin user created')
    }

    // Create Categories
    let breadCat
    const catResult = await payload.find({ collection: 'product-categories' })
    if (catResult.totalDocs === 0) {
        breadCat = await payload.create({
            collection: 'product-categories',
            data: { name: 'Pães' }
        })
        await payload.create({
            collection: 'product-categories',
            data: { name: 'Bolos' }
        })
        console.log('Categories created')
    } else {
        breadCat = catResult.docs[0]
    }

    // Create Placeholder Media
    // Note: We can't easily upload a file in seed without a physical file path. 
    // We'll skip media creation or mock it if possible, but Payload requires file upload for media.
    // We'll try to find existing media or fail gracefully.
    const mediaResult = await payload.find({ collection: 'media' })
    let mainImage

    if (mediaResult.totalDocs > 0) {
        mainImage = mediaResult.docs[0].id
    } else {
        console.log('No media found. Skipping product creation that requires media.')
        // In a real scenario we would upload a buffer here.
    }

    // Create Product if media exists
    if (mainImage && breadCat) {
        const existingProduct = await payload.find({
            collection: 'products',
            where: { slug: { equals: 'pao-de-alho' } }
        })

        if (existingProduct.totalDocs === 0) {
            await payload.create({
                collection: 'products',
                data: {
                    name: 'Pão de Alho',
                    slug: 'pao-de-alho',
                    category: breadCat.id,
                    mainImage: mainImage,
                    description: 'Delicioso pão de alho tradicional.',
                    characteristics: {
                        root: {
                            children: [
                                {
                                    children: [{ text: 'Sabor inigualável', version: 1 }],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 0,
                                    type: 'paragraph',
                                    version: 1
                                }
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            type: 'root',
                            version: 1
                        }
                    }
                }
            })
            console.log('Product created: Pão de Alho')
        }
    }

    console.log('Seeding completed')
    process.exit(0)
}

seed()

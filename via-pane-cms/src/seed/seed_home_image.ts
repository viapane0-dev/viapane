
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BANNER_IMAGE_PATH = path.resolve(__dirname, '../../../via-pane-next/public/assets/39dc205a9f8d08ca89349ecd63a7a091c55335b5.png')

const seedHomeImage = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding Home Banner Image...')

    if (!fs.existsSync(BANNER_IMAGE_PATH)) {
        console.error('Banner image not found at:', BANNER_IMAGE_PATH)
        process.exit(1)
    }

    try {
        // Read file into buffer
        const fileBuffer = fs.readFileSync(BANNER_IMAGE_PATH)

        // 1. Upload the image to Media collection
        // Payload Local API expects 'file' to be an object with data (Buffer), name, mimetype, size
        console.log('Uploading image...')
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: 'Via Pane Home Banner',
            },
            file: {
                data: fileBuffer,
                name: 'home-banner.png',
                mimetype: 'image/png',
                size: fileBuffer.length,
            }
        })

        console.log('Image uploaded successfully:', media.id)

        // 2. Update Home Global with the new media ID
        console.log('Linking image to Home Global...')
        await payload.updateGlobal({
            slug: 'home',
            data: {
                heroBanner: [
                    {
                        type: 'dynamic',
                        title: "Fermentando sonhos,<br />construindo sabores",
                        subtitle: "A excelência da panificação premium que alimenta o Brasil há gerações",
                        buttonText: "Conheça nossa história",
                        buttonUrl: "/sobre",
                        image: media.id // Link the uploaded image
                    }
                ]
            }
        })
        console.log('Home Global updated with image.')

    } catch (error) {
        console.error('Error seeding home image:', error)
    }

    process.exit(0)
}

seedHomeImage()

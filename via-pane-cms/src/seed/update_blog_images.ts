import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'

const UNSPLASH_URLS = [
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1556745750-68295fefafc5?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1607151815172-254f6b0c9b4b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1599819055803-717bba43890f?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80&w=1200'
]

async function downloadImage(url: string): Promise<Buffer> {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
}

async function uploadMediaFromUrl(payload: any, url: string, alt: string) {
    try {
        console.log(`Downloading image from ${url}...`)
        const buffer = await downloadImage(url)

        // Create a filename derived from URL or random
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = `blog-image-${uniqueSuffix}.jpg`

        console.log(`Uploading ${filename}...`)
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: alt,
            },
            file: {
                data: buffer,
                name: filename,
                mimetype: 'image/jpeg',
                size: buffer.length,
            },
        })

        return media.id
    } catch (error) {
        console.error('Error uploading media:', error)
        return null
    }
}

async function updateBlogImages() {
    const payload = await getPayload({ config: configPromise })

    console.log('--- Updating Blog Images ---')

    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
    })

    console.log(`Found ${posts.totalDocs} posts.`)

    for (let i = 0; i < posts.docs.length; i++) {
        const post = posts.docs[i]
        // Force update even if an image exists

        const imageUrl = UNSPLASH_URLS[i % UNSPLASH_URLS.length]
        console.log(`Processing "${post.title}"...`)

        const mediaId = await uploadMediaFromUrl(payload, imageUrl, post.title)

        if (mediaId) {
            await payload.update({
                collection: 'posts',
                id: post.id,
                data: {
                    image: mediaId
                }
            })
            console.log(`Updated "${post.title}" with image ID: ${mediaId}`)
        }
    }

    console.log('--- Update Complete ---')
    process.exit(0)
}

updateBlogImages()


import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const deleteProducts = async () => {
    const payload = await getPayload({ config })

    console.log('Finding products to delete in "Pães Macios"...')

    // Find Category
    const categories = await payload.find({
        collection: 'product-categories',
        where: {
            name: {
                equals: 'Pães Macios'
            }
        }
    })

    if (categories.docs.length === 0) {
        console.log('Category not found. Nothing to delete specific to it, but checking all products just in case user wants full cleanup.')
    }

    const catId = categories.docs[0]?.id

    const products = await payload.find({
        collection: 'products',
        limit: 1000,
        where: catId ? {
            category: { equals: catId }
        } : {}
    })

    console.log(`Found ${products.docs.length} products. Deleting...`)

    for (const prod of products.docs) {
        await payload.delete({
            collection: 'products',
            id: prod.id
        })
        console.log(`Deleted ${prod.name}`)
    }

    console.log('Done.')
    process.exit(0)
}

deleteProducts()

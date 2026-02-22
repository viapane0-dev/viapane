
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const testUpdate = async () => {
    try {
        const payload = await getPayload({ config })

        console.log('Attempting to find product...')
        // Find "Pão de Ovos Egg"
        const products = await payload.find({
            collection: 'products',
            where: {
                name: {
                    equals: 'Pão de Ovos Egg'
                }
            }
        })

        if (products.docs.length === 0) {
            console.log('Product not found')
            process.exit(1)
        }

        const product = products.docs[0]
        console.log(`Product found: ${product.id}. Attempting update...`)

        // Attempt a trivial update
        const updated = await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                name: 'Pão de Ovos Egg' // Same name, just triggering update
            }
        })

        console.log('Update successful:', updated.id)
        process.exit(0)

    } catch (error) {
        console.error('Update failed:', error)
        process.exit(1)
    }
}

testUpdate()

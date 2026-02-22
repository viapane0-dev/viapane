
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const checkImage = async () => {
    const payload = await getPayload({ config })

    // Find "Brioche Francês"
    const products = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: 'brioche-frances'
            }
        },
        depth: 2
    })

    if (products.docs.length > 0) {
        console.log('Product Found:')
        const prod = products.docs[0];
        console.log('Name:', prod.name);
        console.log('Main Image:', JSON.stringify(prod.mainImage, null, 2));
    } else {
        console.log('Product not found')
    }

    process.exit(0)
}

checkImage()

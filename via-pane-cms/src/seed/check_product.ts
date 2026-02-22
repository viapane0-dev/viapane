
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const checkProduct = async () => {
    const payload = await getPayload({ config })

    // Find "Pão de Ovos Egg"
    const products = await payload.find({
        collection: 'products',
        where: {
            name: {
                equals: 'Pão de Ovos Egg'
            }
        }
    })

    if (products.docs.length > 0) {
        console.log('Product Found:')
        console.log(JSON.stringify(products.docs[0], null, 2))
    } else {
        console.log('Product not found')
    }

    process.exit(0)
}

checkProduct()

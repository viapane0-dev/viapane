
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const checkCategories = async () => {
    const payload = await getPayload({ config })

    // Find all categories
    const categories = await payload.find({
        collection: 'product-categories',
        limit: 100,
    })

    console.log('Total Categories:', categories.totalDocs)
    categories.docs.forEach(cat => {
        console.log(`- ${cat.name} (ID: ${cat.id})`)
        if (cat.parent) {
            const parentName = typeof cat.parent === 'object' ? cat.parent.name : cat.parent;
            console.log(`  -> Parent: ${parentName}`)
        } else {
            console.log(`  -> Parent: None (Root)`)
        }
    })

    process.exit(0)
}

checkCategories()

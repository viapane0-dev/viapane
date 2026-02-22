
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const seedCategories = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding Root Categories...')

    const rootCats = ['Panificação', 'Confeitaria', 'Ingredientes']
    const createdCats = {}

    for (const name of rootCats) {
        // Check if exists
        const existing = await payload.find({
            collection: 'product-categories',
            where: { name: { equals: name } }
        })

        if (existing.totalDocs > 0) {
            console.log(`Category "${name}" already exists.`)
            createdCats[name] = existing.docs[0]
        } else {
            console.log(`Creating category "${name}"...`)
            const newCat = await payload.create({
                collection: 'product-categories',
                data: { name }
            })
            createdCats[name] = newCat
        }
    }

    // Now fix "Pães macios" to be a child of "Panificação"
    console.log('Linking "Pães macios" to "Panificação"...')
    const paesMacios = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Pães macios' } }
    })

    if (paesMacios.totalDocs > 0) {
        await payload.update({
            collection: 'product-categories',
            id: paesMacios.docs[0].id,
            data: {
                parent: createdCats['Panificação'].id
            }
        })
        console.log('Linked successfully.')
    } else {
        console.log('"Pães macios" not found.')
    }

    process.exit(0)
}

seedCategories()

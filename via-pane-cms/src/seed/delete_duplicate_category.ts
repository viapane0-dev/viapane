import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'

async function deleteCategory() {
    const payload = await getPayload({ config: configPromise });

    const duplicateId = 14;

    console.log(`Checking products in category ${duplicateId}...`);
    const products = await payload.find({
        collection: 'products',
        where: { category: { equals: duplicateId } }
    });

    if (products.totalDocs > 0) {
        console.error(`ERROR: Category ${duplicateId} is not empty! Contains ${products.totalDocs} products.`);
        process.exit(1);
    }

    console.log(`Deleting category ${duplicateId}...`);
    await payload.delete({
        collection: 'product-categories',
        id: duplicateId
    });

    console.log(`Category ${duplicateId} deleted successfully.`);
    process.exit(0);
}

deleteCategory();

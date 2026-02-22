import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'

async function updateCategoryImage() {
    const payload = await getPayload({ config: configPromise });

    const categoryId = 12;
    const imageId = 72;

    console.log(`Updating Category ${categoryId} with Image ${imageId}...`);

    await payload.update({
        collection: 'product-categories',
        id: categoryId,
        data: {
            media: imageId
        }
    });

    console.log(`Category ${categoryId} updated successfully.`);
    process.exit(0);
}

updateCategoryImage();

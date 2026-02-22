import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'
import path from 'path'
import fs from 'fs'

async function uploadUserImage() {
    const payload = await getPayload({ config: configPromise });

    const imagePath = '/Users/gtotoli/.gemini/antigravity/brain/93590daf-5ce8-4775-9538-94c39c13930b/media__1771461324992.jpg';

    if (!fs.existsSync(imagePath)) {
        console.error(`File not found: ${imagePath}`);
        process.exit(1);
    }

    console.log(`Uploading image: ${imagePath}`);

    const media = await payload.create({
        collection: 'media',
        data: {
            alt: 'Confeitaria Seca - User Provided Image',
        },
        file: {
            path: imagePath,
            name: 'confeitaria-seca-user-image.jpg',
            mimetype: 'image/jpeg',
            size: fs.statSync(imagePath).size,
        }
    });

    console.log(`Image uploaded successfully. ID: ${media.id}`);

    const categoryId = 12; // Confeitaria Seca
    console.log(`Updating Category ${categoryId} with Media ID ${media.id}...`);

    await payload.update({
        collection: 'product-categories',
        id: categoryId,
        data: {
            media: media.id
        }
    });

    console.log(`Category ${categoryId} updated successfully.`);
    process.exit(0);
}

uploadUserImage();

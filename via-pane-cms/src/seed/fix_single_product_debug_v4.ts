import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'

async function debugFix() {
    const payload = await getPayload({ config: configPromise });

    // Find Product
    const products = await payload.find({
        collection: 'products',
        where: { name: { equals: 'Bolo Cremoso de Milho' } }
    });

    if (products.docs.length === 0) {
        console.error('Product not found');
        process.exit(1);
    }
    const product = products.docs[0];

    // Known good image from artifacts (used in upload_user_image.ts)
    const goodImagePath = '/Users/gtotoli/.gemini/antigravity/brain/93590daf-5ce8-4775-9538-94c39c13930b/media__1771461324992.jpg';

    if (fs.existsSync(goodImagePath)) {
        console.log(`Using known good image: ${goodImagePath}`);

        try {
            const media = await payload.create({
                collection: 'media',
                data: { alt: 'Bolo Cremoso de Milho Debug Good Image' },
                file: {
                    path: goodImagePath,
                    name: 'known_good_image.jpg',
                    mimetype: 'image/jpeg',
                    size: fs.statSync(goodImagePath).size
                }
            });
            console.log(`Media Created: ${media.id}`);

            await payload.update({
                collection: 'products',
                id: product.id,
                data: { mainImage: media.id }
            });
            console.log(`Product Updated with GOOD IMAGE.`);
        } catch (e: any) {
            console.error('Upload Failed:', e.message);
            if (e.data) console.error('Error Data:', e.data);
            console.error(e.stack);
        }
    } else {
        console.error('Known good image not found');
    }
    process.exit(0);
}

debugFix();

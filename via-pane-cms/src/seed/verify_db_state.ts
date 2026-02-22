import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'

async function verifyState() {
    const payload = await getPayload({ config: configPromise });

    const products = await payload.find({
        collection: 'products',
        where: {
            name: { like: 'Bolo Cremoso de Milho' }
        }
    });

    if (products.docs.length > 0) {
        const p = products.docs[0];
        console.log('Product Found:', p.name);
        console.log('Main Image:', p.mainImage);

        if (p.mainImage) {
            // Check media
            const mediaId = typeof p.mainImage === 'object' ? p.mainImage.id : p.mainImage;
            const media = await payload.findByID({
                collection: 'media',
                id: mediaId
            });
            console.log('Media Details:', media);
        }
    } else {
        console.log('Product not found');
    }
    process.exit(0);
}

verifyState();

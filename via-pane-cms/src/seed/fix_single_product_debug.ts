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
    console.log(`Processing: ${product.name} (ID: ${product.id})`);

    // Image Path
    const imagePath = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site/Bolos Cremosos/Bolo Cremoso de Milho/Bolo Cremoso de Milho.jpg'; // Guessing name, script will list
    const dir = path.dirname(imagePath);

    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
        console.log(`Files in dir: ${files.join(', ')}`);

        if (files.length > 0) {
            const actualFile = path.join(dir, files[0]);
            console.log(`Uploading: ${actualFile}`);

            try {
                const media = await payload.create({
                    collection: 'media',
                    data: { alt: 'Bolo Cremoso de Milho Debug' },
                    file: {
                        path: actualFile,
                        name: files[0],
                        mimetype: 'image/jpeg',
                        size: fs.statSync(actualFile).size
                    }
                });
                console.log(`Media Created: ${media.id}`);

                const updated = await payload.update({
                    collection: 'products',
                    id: product.id,
                    data: { mainImage: media.id }
                });
                console.log(`Product Updated. MainImage in Return:`, updated.mainImage);
            } catch (e) {
                console.error(e);
            }
        }
    } else {
        console.error('Dir not found');
    }
    process.exit(0);
}

debugFix();

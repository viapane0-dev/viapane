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

    // Image Path - simplify
    const originalPath = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site/Bolos Cremosos/Bolo Cremoso de Milho/WhatsApp Image 2026-02-18 at 21.19.03.jpeg';
    const tempPath = '/tmp/debug_bolo_milho.jpeg';

    if (fs.existsSync(originalPath)) {
        fs.copyFileSync(originalPath, tempPath);
        console.log(`Copied to ${tempPath}`);

        try {
            const media = await payload.create({
                collection: 'media',
                data: { alt: 'Bolo Cremoso de Milho Debug V2' },
                file: {
                    path: tempPath,
                    name: 'bolo_milho_debug.jpeg', // Simple name
                    mimetype: 'image/jpeg',
                    size: fs.statSync(tempPath).size
                }
            });
            console.log(`Media Created: ${media.id}`);

            await payload.update({
                collection: 'products',
                id: product.id,
                data: { mainImage: media.id }
            });
            console.log(`Product Updated.`);
        } catch (e: any) {
            console.error('Upload Failed:', e.message);
            if (e.data) console.error('Error Data:', e.data);
        }
    } else {
        console.error('Original file not found at hardcoded path');
    }
    process.exit(0);
}

debugFix();

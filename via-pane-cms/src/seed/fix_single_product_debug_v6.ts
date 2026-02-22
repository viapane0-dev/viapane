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

    // WhatsApp Image
    const badImagePath = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site/Bolos Cremosos/Bolo Cremoso de Milho/WhatsApp Image 2026-02-18 at 21.19.03.jpeg';

    if (fs.existsSync(badImagePath)) {
        console.log(`Reading buffer from: ${badImagePath}`);
        const buffer = fs.readFileSync(badImagePath);

        try {
            const media = await payload.create({
                collection: 'media',
                data: { alt: 'Bolo Cremoso de Milho Debug WhatsApp Buffer' },
                file: {
                    data: buffer,
                    name: 'whatsapp_debug.jpeg',
                    mimetype: 'image/jpeg',
                    size: buffer.length
                }
            });
            console.log(`Media Created: ${media.id}`);

            await payload.update({
                collection: 'products',
                id: product.id,
                data: { mainImage: media.id }
            });
            console.log(`Product Updated with WHATSAPP BUFFER.`);
        } catch (e: any) {
            console.error('Upload Failed:', (e as Error).message);
            if (e.data) console.error('Error Data:', e.data);
            console.error(e.stack);
        }
    } else {
        console.error('Image not found');
    }
    process.exit(0);
}

debugFix();

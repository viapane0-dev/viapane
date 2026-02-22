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

    // Use a known good image (from previous verified upload if available, or just a dummy buffer)
    // Actually, let's use a buffer to create a valid JPG in temp
    const tempPath = '/tmp/valid_placeholder.jpg';

    // Create a 1x1 pixel JPEG (base64)
    const base64 = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP/Z';
    fs.writeFileSync(tempPath, Buffer.from(base64, 'base64'));

    console.log(`Created valid placeholder at ${tempPath}`);

    try {
        const media = await payload.create({
            collection: 'media',
            data: { alt: 'Bolo Cremoso de Milho Debug Placeholder' },
            file: {
                path: tempPath,
                name: 'valid_placeholder.jpg',
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
        console.log(`Product Updated with PLACEHOLDER.`);
    } catch (e: any) {
        console.error('Upload Failed:', e.message);
        if (e.data) console.error('Error Data:', e.data);
    }
    process.exit(0);
}

debugFix();

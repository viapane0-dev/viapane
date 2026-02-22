import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Helper to wait
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BASE_DIR = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Manual Mapping based on folder names I saw in list_dir
const FOLDER_MAPPINGS: Record<string, string> = {
    // Cakes
    'fuba-cremoso': 'Cakes/Mistura para Cake Fubá Cremoso – 2kg',
    'fuba-cremoso-erva-doce': 'Cakes/Mistura para Cake Fubá Cremoso com Erva Doce – 2kg',
    'cake-neutro': 'Cakes/Mistura para Cake Neutro – 2kg',
    'cake-chocolate': 'Cakes/Mistura para Cake Chocolate – 2kg',
    'cake-milho': 'Cakes/Mistura para Cake Milho – 2kg',
    'cake-laranja': 'Cakes/Mistura para Cake Laranja – 2kg',
    'cake-aipim': 'Cakes/Mistura para Cake Aipim – 2kg',
    'cake-limao': 'Cakes/Mistura para Cake Limão – 2kg',
    'cake-cenoura': 'Cakes/Mistura para Cake Cenoura – 2kg',
    'cake-red-velvet': 'Cakes/Mistura para Cake Red Velvet – 2kg',

    // Bolos Cremosos
    'bolo-cremoso-de-aipim': 'Bolos Cremosos/Bolo Cremoso de Aipim',
    'bolo-cremoso-de-chocolate': 'Bolos Cremosos/Bolo Cremoso de Chocolate',
    'bolo-cremoso-de-fuba': 'Bolos Cremosos/Bolo Cremoso de Fubá',
    'bolo-cremoso-de-milho': 'Bolos Cremosos/Bolo Cremoso de Milho',
    'bolo-cremoso-de-laranja': 'Bolos Cremosos/Bolo Cremoso de Laranja', // Guessing if exists

    // Aditivos (If folders existed, but logs said no)
    'vp-spray': 'Aditivos e desmoldantes/VP SPRAY 600 ML',
};

async function fixLastBatchFinal() {
    const payload = await getPayload({ config: configPromise });

    // 1. Get Categories to filter products
    const categories = await payload.find({
        collection: 'product-categories',
        where: {
            name: { in: ['Aditivos e Desmoldantes', 'Cakes', 'Bolos Cremosos'] }
        }
    });

    const catIds = categories.docs.map(c => c.id);
    console.log(`Target Categories: ${categories.docs.map(c => c.name).join(', ')}`);

    // 2. Get Products
    const products = await payload.find({
        collection: 'products',
        limit: 100,
        where: {
            category: { in: catIds }
        }
    });

    console.log(`Found ${products.docs.length} products to check.`);

    for (const product of products.docs) {
        console.log(`\nChecking: ${product.name} (Slug: ${product.slug})`);

        // Match Folder
        let matchedFolder: string | null = null;

        // Try precise manual map first
        if (product.slug && FOLDER_MAPPINGS[product.slug]) {
            matchedFolder = FOLDER_MAPPINGS[product.slug];
        } else {
            // Fuzzy match keys
            for (const [key, folderPath] of Object.entries(FOLDER_MAPPINGS)) {
                if (product.slug && product.slug.includes(key)) {
                    matchedFolder = folderPath;
                    break;
                }
            }
        }

        if (matchedFolder) {
            const folderPath = path.join(BASE_DIR, matchedFolder);
            console.log(`> Mapped to folder: ${matchedFolder}`);

            if (fs.existsSync(folderPath)) {
                // Find Image
                const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
                if (files.length > 0) {
                    const imageFile = files[0]; // Take first
                    const fullImagePath = path.join(folderPath, imageFile);
                    console.log(`> Found Image: ${imageFile}`);

                    try {
                        // READ AS BUFFER (CRITICAL FIX)
                        const buffer = fs.readFileSync(fullImagePath);
                        const fileSize = fs.statSync(fullImagePath).size;
                        const mime = imageFile.toLowerCase().endsWith('png') ? 'image/png' : 'image/jpeg'; // Simple mime

                        // Upload to Media
                        const media = await payload.create({
                            collection: 'media',
                            data: {
                                alt: product.name + ' - Image',
                            },
                            file: {
                                data: buffer,
                                name: imageFile, // Keep original name or sanitize? Payload handles it.
                                mimetype: mime,
                                size: fileSize
                            }
                        });
                        console.log(`> Media Uploaded: ${media.id}`);

                        // Update Product
                        await payload.update({
                            collection: 'products',
                            id: product.id,
                            data: {
                                mainImage: media.id
                            }
                        });
                        console.log(`> Updated Product Main Image.`);
                    } catch (e: any) {
                        console.error(`> Error uploading image: ${e.message}`);
                    }
                } else {
                    console.log(`> Folder exists but NO image files found.`);
                }
            } else {
                console.log(`> Folder path does not exist on disk: ${folderPath}`);
            }
        } else {
            console.log(`> No folder mapping found for ${product.name}`);
        }

        // populate description if empty (optional, was done partially before)
        if (!product.description || product.description === '') {
            // ... logic skipped for brevity unless essential
        }
    }

    console.log('\nFix Complete.');
    process.exit(0);
}

fixLastBatchFinal();

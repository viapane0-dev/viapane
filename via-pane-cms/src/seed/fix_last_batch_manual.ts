import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'

const BASE_DIR = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Manual Mappings
// Key: Part of the Product Name (slug-like or distinctive)
// Value: Exact Folder Name relative to BASE_DIR
const FOLDER_MAPPINGS: Record<string, string> = {
    // Bolos Cremosos
    'bolo-cremoso-de-milho': 'Bolos Cremosos/Bolo Cremoso de Milho',
    'bolo-cremoso-de-cenoura': 'Bolos Cremosos/Bolo Cremoso de Cenoura',
    'bolo-cremoso-de-aipim': 'Bolos Cremosos/Bolo Cremoso de Aipim',
    'bolo-cremoso-de-cacarola': 'Bolos Cremosos/Bolo Cremoso de Caçarola com Queijo', // Note the cedilla check

    // Cakes
    'cake-abobora': 'Cakes/Mistura para Cake Abóbora com Coco – 2kg',
    'cake-cenoura': 'Cakes/Mistura para Cake Cenoura – 2kg',
    'cake-chocolate': 'Cakes/Mistura para Cake Chocolate – 2kg',
    'cake-indiano': 'Cakes/Mistura para Cake Indiano – 2kg',
    'cake-leite-cremoso': 'Cakes/Mistura para Cake Leite Cremoso – 2kg',
    'cake-neutro': 'Cakes/Mistura para Cake Neutro – 2kg',
    'cake-red-velvet': 'Cakes/Mistura para Cake Red Velvet – 2kg',
    'cake-fuba': 'Cakes/Mistura para Cake de Fubá – 2kg', // Check accent
    'cake-pao-de-mel': 'Cakes/Mistura para Cake Pão de Mel – 2kg', // Assuming this exists? Check directory listing if missing.

    // Aditivos
    'vp-spray': 'Aditivos e Desmoldantes/VP Spray 600 ml',
    'melhorador-ouro': null, // No folder found in listing
    'melhorador-vp': null,   // No folder found in listing
};

async function fixLastBatch() {
    const payload = await getPayload({ config: configPromise });

    // Get all products in these categories
    // IDs: 16 (Aditivos), 17 (Cakes), 18 (Bolos)
    const products = await payload.find({
        collection: 'products',
        where: {
            category: { in: [16, 17, 18] }
        },
        limit: 100
    });

    console.log(`Found ${products.totalDocs} products to check.`);

    for (const product of products.docs) {
        console.log(`\nChecking: ${product.name} (Slug: ${product.slug})`);

        // 1. MATCH FOLDER
        let matchedFolder = null;
        const slug = product.slug || '';

        // Simple distinct keyword matching against our map keys
        for (const [key, folderPath] of Object.entries(FOLDER_MAPPINGS)) {
            if (slug.includes(key) || product.name.toLowerCase().includes(key.replace(/-/g, ' '))) {
                matchedFolder = folderPath;
                break;
            }
        }

        // Special check for "Fubá" / "Fuba" due to accents
        if (!matchedFolder && product.name.toLowerCase().includes('fub')) {
            matchedFolder = 'Cakes/Mistura para Cake de Fubá – 2kg';
        }

        // 2. UPLOAD IMAGE
        if (matchedFolder) {
            const fullFolderPath = path.join(BASE_DIR, matchedFolder);
            if (fs.existsSync(fullFolderPath)) {
                // Find image
                const files = fs.readdirSync(fullFolderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
                if (files.length > 0) {
                    const imageFile = files[0];
                    console.log(`  > Found Image: ${imageFile} in ${matchedFolder}`);

                    try {
                        const media = await payload.create({
                            collection: 'media',
                            data: { alt: product.name },
                            file: {
                                path: path.join(fullFolderPath, imageFile),
                                name: imageFile,
                                mimetype: 'image/jpeg',
                                size: fs.statSync(path.join(fullFolderPath, imageFile)).size
                            }
                        });

                        await payload.update({
                            collection: 'products',
                            id: product.id,
                            data: { mainImage: media.id }
                        });
                        console.log(`  > Updated Main Image.`);
                    } catch (e) {
                        console.error(`  > Error uploading image: ${e.message}`);
                    }
                } else {
                    console.warn(`  > Folder exists but NO image files found.`);
                }
            } else {
                console.warn(`  > Mapped folder does not exist on disk: ${fullFolderPath}`);
            }
        } else {
            console.log(`  > No folder mapping found (likely Aditivos without images).`);
        }

        // 3. FIX DESCRIPTION (Content)
        // If description is missing, populate it from Characteristics or Ingredients
        if (!product.description) {
            let newDesc = '';

            // Try Characteristics text extraction (Mocking the extraction since we don't have the rich text traverser easily here)
            // But we can check if 'characteristics' exists on the product object
            if (product.characteristics && typeof product.characteristics === 'object') {
                // Try to grab text from the first paragraph?
                // In the dump we saw it had structure.
                // Ideally we'd map it. For now, let's use Ingredients as a fallback description if Characteristics unavailable
            }

            // Fallback: Use Ingredients as description
            if (product.ingredients) {
                newDesc = `Ingredientes: ${product.ingredients.substring(0, 150)}${product.ingredients.length > 150 ? '...' : ''}`;
                // Or better: Just blank if we want clean cards, but user complained content was wrong.
                // Usually cards show a snippet.

                // Let's actually Look at the DOCX dump logic again. 
                // "Bolos Cremosos" had a "Características" section.
                // "Cakes" did not.

                // If it's a Cake, maybe use "Modo de Preparo" snippet?
                // Let's just set description to Ingredients for now as a safe bet for SEO/Cards.

                console.log(`  > Populating missing Description with Ingredients snippet.`);
                await payload.update({
                    collection: 'products',
                    id: product.id,
                    data: { description: newDesc }
                });
            }
        }
    }
    console.log('--- FIX COMPLETE ---');
    process.exit(0);
}

fixLastBatch();

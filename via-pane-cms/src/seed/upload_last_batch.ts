import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'

const PRODUCTS_DIR_BASE = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Helper to normalize strings for comparison (handles NFD/NFC)
function normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Robust folder finding
function findFolder(baseDir: string, folderName: string): string | null {
    if (!fs.existsSync(baseDir)) return null;
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });

    // Direct match first
    const directMatch = entries.find(e => e.isDirectory() && e.name === folderName);
    if (directMatch) return path.join(baseDir, directMatch.name);

    // Normalized match
    const targetNormalized = normalizeString(folderName);
    const normalizedMatch = entries.find(e => e.isDirectory() && normalizeString(e.name) === targetNormalized);
    if (normalizedMatch) return path.join(baseDir, normalizedMatch.name);

    return null;
}

const CATEGORIES_TO_PROCESS = [
    { name: 'Aditivos e Desmoldantes', docx: 'Aditivos e Desmoldantes Site.docx' },
    { name: 'Cakes', docx: 'Cakes Site.docx' },
    { name: 'Bolos Cremosos', docx: 'Bolos Cremosos Site.docx' }
];

async function seedLastBatch() {
    const payload = await getPayload({ config: configPromise });

    console.log('--- STARTING LAST BATCH UPLOAD ---');

    for (const catInfo of CATEGORIES_TO_PROCESS) {
        console.log(`\nProcessing Category: ${catInfo.name}`);
        const categoryDir = path.join(PRODUCTS_DIR_BASE, catInfo.name);
        const docxPath = path.join(categoryDir, catInfo.docx);

        if (!fs.existsSync(docxPath)) {
            console.error(`DOCX NOT FOUND: ${docxPath}`);
            continue;
        }

        // 1. Create/Get Category
        const categorySlug = normalizeString(catInfo.name).replace(/\s+/g, '-');
        let categoryId;

        const existingCat = await payload.find({
            collection: 'product-categories',
            where: { name: { equals: catInfo.name } }
        });

        if (existingCat.totalDocs > 0) {
            categoryId = existingCat.docs[0].id;
            console.log(`Category "${catInfo.name}" exists (ID: ${categoryId})`);
        } else {
            const newCat = await payload.create({
                collection: 'product-categories',
                data: { name: catInfo.name }
            });
            categoryId = newCat.id;
            console.log(`Created Category "${catInfo.name}" (ID: ${categoryId})`);
        }

        // 2. Parse DOCX
        const { value: text } = await mammoth.extractRawText({ path: docxPath });
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);

        let currentProduct: any = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Heuristic for new product: Line is bold/short and usually followed by empty or Ingredient line (in raw text dump it's hard to tell bold)
            // Pattern: Product Name -> (empty lines) -> Ingredientes: ...

            // Checks for specific product/header lines to start a new product object
            // "Aditivos e Desmoldantes" (header, skip)
            if (line.toLowerCase() === catInfo.name.toLowerCase() || line.toUpperCase() === catInfo.name.toUpperCase()) continue;

            const isIngredient = line.toLowerCase().startsWith('ingredientes:');
            const isMode = line.toLowerCase().startsWith('modo de preparo:') || line.toLowerCase().startsWith('modo de usar:');
            const isCharacteristics = line.toLowerCase().startsWith('características') || line.toLowerCase().startsWith('caracteristicas');

            if (!isIngredient && !isMode && !isCharacteristics && line.length < 100 && !line.includes(':')) {
                // Potentially a product name. Save previous if exists.
                if (currentProduct) {
                    await uploadProduct(payload, currentProduct, categoryId, categoryDir);
                }
                currentProduct = { name: line, description: '', ingredients: '', preparationMode: '', characteristics: '' };
            } else if (currentProduct) {
                if (isIngredient) currentProduct.ingredients = line.replace(/ingredientes:/i, '').trim();
                else if (isMode) currentProduct.preparationMode = line.replace(/modo de preparo:|modo de usar:/i, '').trim();
                else if (isCharacteristics) currentProduct.characteristics = line.replace(/características:|caracteristicas:/i, '').trim();
                else {
                    // Append to description if not a spec line
                    // But strictly speaking, description isn't clearly separated in the dump often.
                    // We will leave description empty or append if it's not one of the above keys.
                    // Ideally we verify if it belongs to previous section.
                }
            }
        }

        // Upload last product
        if (currentProduct) {
            await uploadProduct(payload, currentProduct, categoryId, categoryDir);
        }
    }

    console.log('\n--- UPLOAD COMPLETE ---');
    process.exit(0);
}

async function uploadProduct(payload: any, product: any, categoryId: number, categoryDir: string) {
    // Check duplication
    const existing = await payload.find({
        collection: 'products',
        where: { name: { equals: product.name } }
    });

    if (existing.totalDocs > 0) {
        console.log(`Skipping existing: ${product.name}`);
        return;
    }

    console.log(`Uploading: ${product.name}`);

    // Image Handling
    let mainImageId = null;
    // Attempt multiple naming conventions for folder
    // 1. Exact Name
    // 2. Name without "Mistura para"
    // 3. Name without " - 2kg" etc

    // Clean name for folder search
    const cleanName = product.name.replace(/–.*|-.*|\d+kg|\d+g|\d+ml/gi, '').trim();
    const cleanNameNoPrefix = cleanName.replace(/Mistura para |Bolo Cremoso de /gi, '').trim();

    // Try to find folder
    let productFolder = findFolder(categoryDir, product.name);
    if (!productFolder) productFolder = findFolder(categoryDir, cleanName);
    if (!productFolder) productFolder = findFolder(categoryDir, cleanNameNoPrefix);
    // Specific hacks for these folders based on listing
    if (!productFolder && product.name.includes("VP Spray")) productFolder = findFolder(categoryDir, "VP Spray 600 ml");
    if (!productFolder && product.name.includes("Aipim")) productFolder = findFolder(categoryDir, "Bolo Cremoso de Aipim"); // etc

    if (productFolder) {
        const images = fs.readdirSync(productFolder).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
        if (images.length > 0) {
            const imagePath = path.join(productFolder, images[0]);
            try {
                const media = await payload.create({
                    collection: 'media',
                    data: { alt: product.name },
                    file: {
                        path: imagePath,
                        name: path.basename(imagePath),
                        mimetype: 'image/jpeg', // simplified
                        size: fs.statSync(imagePath).size
                    }
                });
                mainImageId = media.id;
                console.log(`  > Image uploaded: ${images[0]}`);
            } catch (e) {
                console.error(`  > Failed to upload image ${images[0]}: ${(e as Error).message}`);
            }
        }
    } else {
        console.warn(`  > Image folder NOT FOUND for "${product.name}" (Tried: "${product.name}", "${cleanName}", "${cleanNameNoPrefix}")`);
    }

    // Create Product
    await payload.create({
        collection: 'products',
        data: {
            name: product.name,
            category: categoryId,
            ingredients: product.ingredients,
            preparationMode: product.preparationMode,
            characteristics: product.characteristics ? {
                root: {
                    children: [{
                        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: product.characteristics, type: 'text', version: 1 }],
                        direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1
                    }],
                    direction: 'ltr', format: '', indent: 0, type: 'root', version: 1
                }
            } : undefined,
            mainImage: mainImageId,
            slug: normalizeString(product.name).replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        }
    });
    console.log(`  > Product created.`);
}

seedLastBatch();

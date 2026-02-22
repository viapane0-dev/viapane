import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
// @ts-ignore
import mammoth from 'mammoth'
import { v2 as cloudinary } from 'cloudinary'

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

const CATEGORIES = [
    {
        name: 'Pães crocantes',
        id: 11,
        folderName: 'Pães crocantes',
        docxName: 'Pães Crocantes Site.docx'
    },
    {
        name: 'Pães Fermentação Natural',
        id: 10,
        folderName: 'Pães Fermentação Natural',
        docxName: 'Pães Fermentação Natural Site.docx'
    },
    {
        name: 'Pães integrais',
        id: 9,
        folderName: 'Pães integrais',
        docxName: 'Pães Integrais Site.docx'
    }
];

// Helper to create Lexical format
function createLexicalStructure(content: string) {
    return {
        root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [{
                type: 'paragraph',
                version: 1,
                children: [{
                    type: 'text',
                    version: 1,
                    text: content || ''
                }]
            }]
        }
    }
}

function normalizeStr(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

async function uploadImages(dirPath: string, productName: string) {
    const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    console.log(`      Found ${files.length} images in ${dirPath}: ${files.join(', ')}`);
    const uploadedIds = [];

    const payload = await getPayload({ config: configPromise });

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.parse(file).name;

        // Sanitize public ID
        const publicId = `new-cats-${Date.now()}-${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

        console.log(`Uploading image: ${file} for ${productName}...`);

        try {
            // Upload to Cloudinary
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { public_id: publicId, folder: 'via-pane-new-cats' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(fileBuffer);
            });

            // Create Media in Payload
            const mediaDoc = await payload.create({
                collection: 'media',
                data: {
                    alt: `${productName} - ${fileName}`,
                    cloudinaryPublicId: uploadResult.public_id,
                    url: uploadResult.secure_url,
                    filename: `${publicId}.jpg`,
                    mimeType: 'image/jpeg',
                    filesize: uploadResult.bytes,
                    width: uploadResult.width,
                    height: uploadResult.height,
                }
            });

            uploadedIds.push(mediaDoc.id);
            console.log(`      Uploaded image ID: ${mediaDoc.id}`);

        } catch (err) {
            console.error(`      Failed to upload ${file}:`, err);
        }
    }

    return uploadedIds;
}

// Simple text extractor using regex specific to these docx structure
function extractProductInfo(fullText: string, productName: string) {
    // Attempt to find the block for this product
    // Strategy: Find the Product Name in text, then grab everything until the next product name or EOF
    // But since we don't know the exact "Next Product Name", we might rely on the structure "Ingredientes:"

    // Normalize simple lookup
    // Since names in folders might differ slightly from doc headers, we try fuzzy match
    // or just look for lines that look like headers.

    // Actually, splitting by "Ingredientes:" is safer to find blocks.
    // but we need to map the block to the name.

    // Quick approach: Regex match the product name in the text
    // The product name in docx usually appears before "Ingredientes:"

    const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);

    let bestBlock = {
        ingredients: '',
        preparation: '',
        characteristics: '',
        description: ''
    };

    // Find line index that roughly matches product name
    const normalizedName = normalizeStr(productName);
    let nameIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        // Check exact or partial match
        if (normalizeStr(lines[i]).includes(normalizedName) || normalizedName.includes(normalizeStr(lines[i]))) {
            // Check if "Ingredientes" is near (within next 5 lines)
            let hasIngredientes = false;
            for (let j = 1; j < 5; j++) {
                if (lines[i + j] && lines[i + j].toLowerCase().startsWith('ingredientes')) {
                    hasIngredientes = true;
                    break;
                }
            }

            if (hasIngredientes) {
                nameIndex = i;
                break;
            }
        }
    }

    if (nameIndex === -1) {
        console.warn(`Could not find text block for: ${productName}. Using defaults.`);
        return bestBlock;
    }

    // Extract block
    let currentSection = 'none';
    for (let i = nameIndex + 1; i < lines.length; i++) {
        const line = lines[i];

        // Stop if we hit a line that looks like a new product title (implied by checking if we have populated data and hit a line that doesn't look like content)
        // Or simpler: Stop if we hit a line that is valid for another product? hard to know.
        // Easiest: The structure is Title -> Ingredientes -> Modo de preparo -> Características.

        if (line.toLowerCase().startsWith('ingredientes:')) {
            currentSection = 'ingredients';
            bestBlock.ingredients += line.replace(/ingredientes:/i, '').trim() + ' ';
        } else if (line.toLowerCase().startsWith('modo de preparo:')) {
            currentSection = 'preparation';
            bestBlock.preparation += line.replace(/modo de preparo:/i, '').trim() + ' ';
        } else if (line.toLowerCase().startsWith('características:')) {
            currentSection = 'characteristics';
            // Characteristics line often contains the text directly
            bestBlock.characteristics += line.replace(/características:/i, '').trim() + ' ';
            bestBlock.description += line.replace(/características:/i, '').trim() + ' ';
        } else {
            // Append to current section
            if (currentSection === 'ingredients') bestBlock.ingredients += line + ' ';
            if (currentSection === 'preparation') bestBlock.preparation += line + ' ';
            if (currentSection === 'characteristics') {
                bestBlock.characteristics += line + ' ';
                bestBlock.description += line + ' ';
            }
        }

        // Heuristic to stop: empty lines were filtered, but maybe we hit a very short line that looks like a title?
        // Let's iterate until the next label or end of file?
        // The issue is distinguishing the next title.
        // Let's assume the order is I -> P -> C. After C, if we hit I again, it's next block.
        if (currentSection === 'characteristics' && line.toLowerCase().startsWith('ingredientes:')) {
            break; // Gone too far
        }
    }

    return {
        ingredients: bestBlock.ingredients.trim(),
        preparation: bestBlock.preparation.trim(),
        characteristics: bestBlock.characteristics.trim(),
        description: bestBlock.description.trim() // Using characteristics as description
    };
}


async function seed() {
    const payload = await getPayload({ config: configPromise });

    for (const cat of CATEGORIES) {
        console.log(`\nProcessing Category: ${cat.name}...`);

        // Parse Docx
        const docxPath = path.join(BASE_PATH, cat.folderName, cat.docxName);
        let docText = '';
        try {
            if (fs.existsSync(docxPath)) {
                const result = await mammoth.extractRawText({ path: docxPath });
                docText = result.value;
                console.log(`Parsed ${cat.docxName} (${docText.length} chars)`);
            } else {
                console.warn(`Docx not found: ${docxPath}`);
            }
        } catch (e) {
            console.error(`Error parsing docx ${docxPath}`, e);
        }

        // List Product Directories
        const catDir = path.join(BASE_PATH, cat.folderName);
        const entries = fs.readdirSync(catDir, { withFileTypes: true });
        const productDirs = entries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

        for (const prodName of productDirs) {
            console.log(`  Processing Product: ${prodName}`);

            // Upload Images
            const prodPath = path.join(catDir, prodName);
            const mediaIds = await uploadImages(prodPath, prodName);

            if (mediaIds.length === 0) {
                console.warn(`    No images found for ${prodName}`);
            }

            // Extract Info
            const info = extractProductInfo(docText, prodName);

            // Create Product
            // Normalize strings to NFC for consistency
            const finalName = prodName.normalize('NFC');
            const slug = normalizeStr(finalName);

            try {
                // Check if exists
                const existing = await payload.find({
                    collection: 'products',
                    where: { slug: { equals: slug } }
                });

                const productData = {
                    name: finalName,
                    category: cat.id,
                    description: info.description || 'Descrição a ser atualizada.',
                    mainImage: mediaIds[0],
                    gallery: mediaIds.map(id => ({ image: id })),
                    ingredients: createLexicalStructure(info.ingredients || 'A ser atualizado'),
                    characteristics: createLexicalStructure(info.characteristics || 'A ser atualizado'),
                    preparationMode: createLexicalStructure(info.preparation || 'A ser atualizado'),
                };

                if (existing.totalDocs > 0) {
                    console.log(`    Product ${finalName} already exists. Updating...`);
                    await payload.update({
                        collection: 'products',
                        id: existing.docs[0].id,
                        data: productData
                    });
                } else {
                    console.log(`    Creating new product: ${finalName}`);
                    await payload.create({
                        collection: 'products',
                        data: {
                            ...productData,
                            slug: slug
                        }
                    });
                }
            } catch (err: any) {
                console.error(`    Error saving product ${prodName}:`, err.message);
                if (err.data) console.error('    Validation Data:', JSON.stringify(err.data, null, 2));
            }
        }
    }

    console.log('\n--- Bulk Upload Complete ---');
    process.exit(0);
}

seed();

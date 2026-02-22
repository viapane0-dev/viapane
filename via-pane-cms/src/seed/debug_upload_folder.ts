import fs from 'fs';
import path from 'path';

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';
const CAT_FOLDER = 'Pães integrais';
const TARGET_PROD = 'Pão Integral – 55%'; // Hardcoded name, might mismatch if NFD/NFC

async function debug() {
    const catPath = path.join(BASE_PATH, CAT_FOLDER);
    console.log(`Listing category: ${catPath}`);

    try {
        const entries = fs.readdirSync(catPath);
        console.log('Entries in category:', entries);

        for (const entry of entries) {
            if (entry.includes('55%')) {
                console.log(`Found candidate: "${entry}"`);
                console.log(`Char codes: ${entry.split('').map(c => c.charCodeAt(0)).join(',')}`);

                const prodPath = path.join(catPath, entry);
                console.log(`Checking product path: ${prodPath}`);

                try {
                    const files = fs.readdirSync(prodPath);
                    console.log(`Files in product folder:`, files);

                    const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
                    console.log(`Filtered images:`, images);
                } catch (e) {
                    console.error(`Error listing product folder:`, e);
                }
            }
        }
    } catch (e) {
        console.error('Error listing category:', e);
    }
}

debug();

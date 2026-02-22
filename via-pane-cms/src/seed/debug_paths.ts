import fs from 'fs';
import path from 'path';

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Same helper
function findFolder(basePath: string, targetName: string): string | null {
    if (!fs.existsSync(basePath)) {
        console.log(`[DEBUG] Base path does not exist: ${basePath}`);
        return null;
    }
    const entries = fs.readdirSync(basePath);
    console.log(`[DEBUG] Scanning ${basePath}. Entries: ${entries.length}`);

    // Exact
    if (entries.includes(targetName)) {
        console.log(`[DEBUG] Exact match found for: ${targetName}`);
        return path.join(basePath, targetName);
    }

    // Normalized
    const targetNorm = targetName.normalize('NFC');
    console.log(`[DEBUG] Looking for normalized: '${targetNorm}' (Code points: ${toCodes(targetNorm)})`);

    for (const entry of entries) {
        const entryNorm = entry.normalize('NFC');
        if (entryNorm === targetNorm) {
            console.log(`[DEBUG] Normalized match found: '${entry}' (Code points: ${toCodes(entry)})`);
            return path.join(basePath, entry);
        }
    }

    console.log(`[DEBUG] NO match found for: ${targetName}`);
    // Log close matches?
    entries.forEach(e => {
        if (e.includes('Integral') || e.includes('Fermen') || e.includes('Crocante')) {
            console.log(`[PENDING] Candidate: '${e}' - Codes: ${toCodes(e)}`);
        }
    });

    return null;
}

function toCodes(str: string) {
    return Array.from(str).map(c => c.charCodeAt(0).toString(16)).join(' ');
}

const CATEGORIES = [
    { name: 'Pães integrais', folder: 'Pães integrais', prod: 'Bisnaguinha Integral – 52%' }, // Note: check dash
    { name: 'Pães Fermentação Natural', folder: 'Pães Fermentação Natural', prod: 'Baguette Francesa' },
    { name: 'Pães crocantes', folder: 'Pães crocantes', prod: 'Ciabatta' }
];

function run() {
    console.log(`Base Path Exists: ${fs.existsSync(BASE_PATH)}\n`);

    for (const cat of CATEGORIES) {
        console.log(`--- Checking Category: ${cat.name} ---`);
        const catPath = findFolder(BASE_PATH, cat.folder);

        if (catPath) {
            console.log(`  [SUCCESS] Category Path: ${catPath}`);
            console.log(`  --- Checking Product: ${cat.prod} ---`);
            const prodPath = findFolder(catPath, cat.prod);
            if (prodPath) {
                console.log(`    [SUCCESS] Product Path: ${prodPath}`);
                const files = fs.readdirSync(prodPath);
                console.log(`    [FILES] ${files.join(', ')}`);
            } else {
                console.log(`    [FAIL] Product Path NOT FOUND for ${cat.prod}`);
            }
        } else {
            console.log(`  [FAIL] Category Path NOT FOUND`);
        }
        console.log('\n');
    }
}

run();

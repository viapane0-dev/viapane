// @ts-ignore
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

const FILES = [
    'Pães crocantes/Pães Crocantes Site.docx',
    'Pães Fermentação Natural/Pães Fermentação Natural Site.docx',
    'Pães integrais/Pães Integrais Site.docx'
];

async function dumpDocx() {
    for (const filePath of FILES) {
        const absolutePath = path.join(BASE_PATH, filePath);
        if (fs.existsSync(absolutePath)) {
            console.log(`\n\n=== CONTENT OF: ${path.basename(filePath)} ===\n`);
            const result = await mammoth.extractRawText({ path: absolutePath });
            console.log(result.value);
            console.log(`\n===========================================\n`);
        } else {
            console.error(`File not found: ${absolutePath}`);
        }
    }
}

dumpDocx();

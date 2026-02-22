// @ts-ignore
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

async function parseDocx(filePath: string) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        const text = result.value;
        const messages = result.messages;

        console.log(`--- Parsed Content for ${path.basename(filePath)} ---`);
        console.log(text);
        console.log('-----------------------------------');

        if (messages.length > 0) {
            console.log('Messages:', messages);
        }
    } catch (error) {
        console.error('Error parsing docx:', error);
    }
}

const basePath = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';
const files = [
    path.join(basePath, 'Pães crocantes/Pães Crocantes Site.docx'),
    path.join(basePath, 'Pães Fermentação Natural/Pães Fermentação Natural Site.docx'),
    path.join(basePath, 'Pães integrais/Pães Integrais Site.docx')
];

(async () => {
    for (const file of files) {
        await parseDocx(file);
    }
})();

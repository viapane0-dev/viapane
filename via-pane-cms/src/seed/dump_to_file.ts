// @ts-ignore
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

const FILES = [
    'Confeitaria Seca/Confeitaria Seca.docx',
    'Panetones e Confeitaria/Panetones e Confeitaria Site.docx',
    'Patisserie e Pão de Ló/Patisserie e Pão de Ló Site.docx'
];

async function dumpDocx() {
    let fullContent = '';

    for (const filePath of FILES) {
        // Try to find the file robustly
        const folderName = path.dirname(filePath);
        const fileName = path.basename(filePath);

        let targetFolder = path.join(BASE_PATH, folderName);
        if (!fs.existsSync(targetFolder)) {
            const entries = fs.readdirSync(BASE_PATH);
            const match = entries.find(e => e.normalize('NFC') === folderName.normalize('NFC'));
            if (match) targetFolder = path.join(BASE_PATH, match);
        }

        const absolutePath = path.join(targetFolder, fileName);
        if (fs.existsSync(absolutePath)) {
            fullContent += `\n\n=== CONTENT OF: ${fileName} ===\n`;
            try {
                const result = await mammoth.extractRawText({ path: absolutePath });
                fullContent += result.value;
            } catch (e) {
                fullContent += `Error parsing: ${e}\n`;
            }
            fullContent += `\n===========================================\n`;
        } else {
            fullContent += `File not found: ${absolutePath}\n`;
        }
    }

    fs.writeFileSync('docx_dump.txt', fullContent);
    console.log('Dumped to docx_dump.txt');
}

dumpDocx();

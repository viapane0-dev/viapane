import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const baseDir = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';
const categories = [
    'Aditivos e Desmoldantes',
    'Cakes',
    'Bolos Cremosos'
];

async function dumpDocx() {
    const output = [];

    for (const category of categories) {
        const categoryPath = path.join(baseDir, category);

        if (!fs.existsSync(categoryPath)) {
            output.push(`CATEGORY NOT FOUND: ${category}`);
            continue;
        }

        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.docx') && !f.startsWith('~$'));

        output.push(`\n=== CATEGORY: ${category} ===\n`);

        for (const file of files) {
            output.push(`--- FILE: ${file} ---`);
            const filePath = path.join(categoryPath, file);

            try {
                const result = await mammoth.extractRawText({ path: filePath });
                output.push(result.value);
                output.push('\n-----------------------------------\n');
            } catch (err) {
                output.push(`ERROR reading ${file}: ${err.message}`);
            }
        }
    }

    const outputPath = 'docx_dump_last_batch.txt';
    fs.writeFileSync(outputPath, output.join('\n'));
    console.log(`Dumped content to ${outputPath}`);
}

dumpDocx();

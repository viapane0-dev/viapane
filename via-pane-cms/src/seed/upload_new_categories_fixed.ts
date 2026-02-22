import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Manual Data Mapping based on Docx Dump and Folder structure
const CATEGORY_MAP = [
    {
        id: 9, // Pães integrais
        name: 'Pães integrais',
        path: 'Pães integrais',
        products: [
            {
                folder: 'Bisnaguinha Integral – 52%',
                name: 'Bisnaguinha Integral – 52%',
                data: {
                    ingredients: 'Farinha integral, farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, fibras, sal, cevada, melhorador, conservante INS 282 e estearoil lactil lactato de cálcio.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Bisnaguinha Premium Integral, a água gelada e deixar misturar até formar uma massa e por último o fermento. Bater em velocidade rápida (2) até atingir o ponto de véu. Cortar a massa no tamanho desejado e modelar, levar os pães para o carrinho de fermentação e deixar crescer até dobrar de tamanho. Levar para assar em forno de lastro a 180°C a 190ºC 25 a 30 minutos ou forno turbo 150°C a 160ºC de 20 a 25 minutos.',
                    characteristics: 'A bisnaguinha premium integral costuma ter uma textura macia, sabor levemente adocicado e uma coloração mais escura por conta da farinha integral. É rica em fibras, oferece maior saciedade e possui uma composição mais nutritiva que a versão tradicional.'
                }
            },
            {
                folder: 'Francês Integral – 37%',
                name: 'Francês Integral – 37%', // Corrected accent
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, farinha integral, fibras, açúcar, sal, cevada, melhorador e aroma alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Pão Francês Integral, a água gelada e bater na velocidade baixa por mais ou menos 5 minutos. Adicionar o fermento e bater em alta velocidade até que a massa esteja em ponto de véu. Colocar para descansar por 10 minutos e modelar, colocar em bandejas da mesma forma que é feito o Pão Francês e deixar crescer no tamanho adequado. Levar para assar em forno de lastro a 200°C de 30 a 34 minutos ou forno turbo a 160°C 25 a 30 minutos. Obs: O Pão Francês Integral pode ficar 18h fora da câmara fria ou 24h dentro da câmara fria.',
                    characteristics: 'Pão francês integral apresenta casca levemente crocante, miolo macio e coloração mais escura devido a farinhas integral. É rico em fibras, ajuda na saciedade e possui sabor suave, mantendo a leveza do francês tradicional, mas com uma opção mais nutritiva para o dia a dia.'
                }
            },
            {
                folder: 'Pão Integral – 55%',
                name: 'Pão Integral – 55%',
                data: {
                    ingredients: 'Farinha integral, farinha de trigo especial enriquecida com ferro e ácido fólico, fibras, açúcar, sal, cevada, melhorador, conservante INS 282 e aroma alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Pão Integral, a água gelada e por último o fermento. Deixar bater até obter uma massa lisa e em ponto de véu. Colocar a massa sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos. Modelar no tamanho desejado, adicionar a cobertura e deixar fermentar por +/- 50 minutos. Levar para assar em forno de lastro com vapor de 180 a 200°C de 20 a 25 minutos. Se o forno for turbo assar com vapor na temperatura de 150 a 170°C de 20 a 25 minutos.',
                    characteristics: 'O pão integral 55%, possui uma textura macia e um sabor suave, levemente encorpado. É conhecido por oferecer maior saciedade e ser uma opção equilibrada para o consumo diário, combinando bem com diversos tipos de acompanhamentos.'
                }
            }
        ]
    },
    {
        id: 10, // Pães Fermentação Natural
        name: 'Pães Fermentação Natural',
        path: 'Pães Fermentação Natural',
        products: [
            {
                folder: 'Baguette Francesa',
                name: 'Baguette Francesa',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, massa madre, melhorador e malte.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Baguette Francesa e a água gelada. Deixar misturar em velocidade lenta até formar uma massa e por último acrescentar o fermento. Bater em velocidade rápida (2) até atingir o ponto de véu. Colocar a massa em uma caixa plástica untada com azeite e ir fazendo as dobras de 40 em 40 minutos (fazer 3 dobras). Levar para a câmara fria e deixar descansar de um dia para o outro (24 horas). Retirar da câmara fria e deixar em temperatura ambiente. Dividir a massa no tamanho desejado (350g), pré-modelar e deixar descansar por 20 minutos cobertos com plástico. Modelar e arrumar em assadeiras ou calhas. Deixar fermentar por +/- 60 minutos ou até dobrar de tamanho. Fazer os cortes e levar ao forno de lastro com vapor a 230°C de 25 a 30 minutos ou forno turbo em 190°C de 20 a 25 minutos.',
                    characteristics: 'A baguette francesa com fermentação natural, tem casca fina, crocante e dourada, com miolo alveolado e macio de coloração creme. Seu sabor é complexo, levemente ácido e adocicado, com aroma marcante de cereais e fermentação longa.'
                }
            },
            {
                folder: 'Ciabatta com Fermentação Natural', // Note folder name accent
                name: 'Ciabatta com Fermentação Natural',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, massa madre, açúcar e melhorador.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Ciabatta com Fermentação Natural, acrescentar a água gelada aos poucos. Adicione o fermento fresco, por último o azeite. Bater em velocidade baixa até misturar bem e bater em velocidade alta até desgrudar do recipiente. Colocar a massa em uma caixa plástica untada com azeite, faça 3 dobras na massa e acrescentar mais azeite por cima da massa. Leve para a câmara fria, e deixe descansar até o dia seguinte. No dia seguinte, tire da câmara para fermentar, em seguida, despeje a massa sobre a mesa untada com farinha, e com uma espátula, corte do tamanho desejado. Estique as duas pontas com a mão e coloque na assadeira. Deixar crescer por 20 minutos e levar ao forno de lastro com vapor a 230°C de 20 a 25 minutos ou forno turbo em 170°C de 20 a 25 minutos.',
                    characteristics: 'A ciabatta com fermentação natural apresenta casca fina e levemente crocante e miolo macio e aerado, com textura irregular característica. Seu sabor é suave e seu aroma é marcante e artesanal, tornando-a ideal para sanduíches ou acompanhamentos sofisticados.'
                }
            },
            {
                folder: 'Focaccia Italiana',
                name: 'Focaccia Italiana',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, massa madre, açúcar, melhorador e azeite.',
                    preparation: 'Colocar na masseira a Mistura de Focaccia com Fermentação Natural e a água gelada. Deixar misturar em velocidade lenta até formar uma massa e por último acrescentar o fermento. Bater em velocidade rápida (2) até atingir o ponto de véu. Depois que a massa estiver pronta, adicione 40ml de azeite e bata em velocidade lenta até misturar o azeite na massa. Colocar a massa em uma caixa plástica untada com azeite e ir fazendo as dobras (3 dobras) de 40 em 40 minutos. Levar para a câmara fria de um dia para o outro. Retirar da câmara fria e deixar em temperatura ambiente. Coloque a massa na assadeira untada com azeite e deixe fermentar até dobrar de volume. Fure a massa com as pontas dos dedos e coloque o recheio desejado. (sal grosso e alecrim, tomate cereja e queijo, azeitona e cebola, etc). Levar para assar em forno de lastro a 230°C de 20 a 25 minutos ou forno turbo a 190°C de 20 a 25 minutos.',
                    characteristics: 'A Focaccia Italiana com Fermentação Natural apresenta uma massa macia e aerada, com bordas ligeiramente crocantes e douradas. Seu sabor é enriquecido pelo azeite de oliva e ervas, com um leve toque de acidez da fermentação natural, proporcionando um aroma irresistível e textura única.'
                }
            },
            {
                folder: 'Robust Sementes',
                name: 'Robust Sementes',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, gergelim, fibras, linhaça, sal, açúcar, melhorador, cevada e fermento natural.',
                    preparation: 'Coloque na masseira a Mistura para Pão Robust Sementes Rústico e o fermento. Adicione a água aos poucos e deixe bater até atingir o ponto de véu. Retire a massa e corte nos tamanhos desejados. Leve para descansar por +/- 40 minutos. Após o descanso, modele e deixe fermentar por aproximadamente 1 hora ou até dobrar de tamanho. Corte os pães com auxílio de um bisturi e leve para assar em forno de lastro de 210°C a 220°C de 20 a 25 minutos com vapor, ou forno turbo a 180°C de 20 a 25 minutos com vapor. Obs: Para os pães terem uma casca mais crocante, deixar a porta do forno aberta por aproximadamente 3 minutos. obs. ²: para processo de câmara fria diminuir a fermentação em 50%.',
                    characteristics: 'O Robust Sementes é enriquecido com ferro e ácido fólico, que combina gergelim, linhaça, fibras e cevada. Apresenta miolo macio, casca firme e sabor encorpado, oferecendo maior saciedade e nutrientes importantes para a alimentação diária. É uma opção versátil e nutritiva, ideal para lanches e refeições.'
                }
            },
            {
                folder: 'Robust integral – 59%',
                name: 'Robust integral – 59%',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, fibras, açúcar mascavo, sal, açúcar, melhorador, cevada e fermento natural.',
                    preparation: 'Coloque na masseira a Mistura para Pão Robust Integral Rústico e o fermento. Adicione a água aos poucos e deixe bater até atingir o ponto de véu. Retire a massa e corte nos tamanhos desejados. Leve para descansar por +/- 40 minutos. Após o descanso, modele e deixe fermentar por aproximadamente 1 hora ou até dobrar de tamanho. Corte os pães com auxílio de um bisturi e leve para assar em forno de lastro de 210°C a 220°C de 20 a 25 minutos com vapor, ou forno turbo a 180°C de 20 a 25 minutos com vapor. Obs: Para os pães terem uma casca mais crocante, deixar a porta do forno aberta por aproximadamente 3 minutos. obs. ²: para processo de câmara fria diminuir a fermentação em 50%.',
                    characteristics: 'O Robust Integral apresenta textura firme, miolo macio e sabor levemente encorpado. Tem cor mais escura e oferece maior saciedade, sendo uma opção nutritiva e versátil para lanches e refeições do dia a dia.'
                }
            }
        ]
    },
    {
        id: 11, // Pães crocantes
        name: 'Pães crocantes',
        path: 'Pães crocantes',
        products: [
            {
                folder: 'Ciabatta',
                name: 'Ciabatta',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, açúcar, melhorador e massa madre.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Ciabatta, acrescentar a água gelada aos poucos e adicione o fermento fresco. Bater em velocidade baixa até misturar bem e bater em velocidade alta até desgrudar do recipiente. Colocar a massa em uma caixa plástica untada com azeite e deixar descansar por 40 a 60 minutos. Despejar a massa sobre a mesa untada com farinha e, com uma espátula, cortar do tamanho desejado. Esticar as duas pontas com a mão e colocar na assadeira. Deixar crescer até dobrar de volume e levar ao forno de lastro com vapor a 200°C de 20 a 25 minutos ou forno turbo em 160°C de 20 a 25 minutos.',
                    characteristics: 'A Ciabatta tradicional tem formato achatado e alongado, com casca fina, crocante e enfarinhada. O miolo é macio, aerado e com grandes alvéolos, resultado da alta hidratação. Seu sabor é suave e levemente fermentado, ideal para sanduíches e antepastos.'
                }
            },
            {
                folder: 'Pane Choco Amaro',
                name: 'Pane Choco Amaro',
                data: {
                    ingredients: 'Farinha de trigo enriquecida com ferro e ácido fólico, açúcar, cacau em pó, gordura vegetal low trans, sal e aroma alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Pane Choco Amaro, a água gelada e o fermento fresco. Deixar bater em velocidade lenta até misturar bem (5 minutos). Passar para velocidade rápida, adicionar as gotas de chocolate e bater até atingir o ponto de véu. Cortar a massa no tamanho desejado, modelar e cobrir com plástico. Deixar descansar por 20 minutos. Modelar no formato desejado, colocar em assadeiras e deixar fermentar até dobrar de volume. Levar para assar em forno de lastro a 180°C por aproximadamente 25 minutos ou forno turbo a 150°C por aproximadamente 25 minutos.',
                    characteristics: 'O Pane Choco Amaro possui massa escura e macia, com sabor intenso de cacau e leve toque amargo. É aromático e sofisticado, ideal para harmonizações com cafés, geleias ou consumido puro como uma opção diferenciada.'
                }
            },
            {
                folder: 'Pão Semi-italiano',
                name: 'Pão Semi-italiano',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, sal, gordura vegetal low trans, melhorador e conservante INS 282.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Pão Semi Italiano, a água gelada e o fermento fresco. Bater em velocidade lenta até misturar bem. Passar para velocidade rápida e bater até atingir o ponto de véu. Cortar a massa no tamanho desejado (400g ou 500g), bolear e deixar descansar por 20 minutos. Modelar no formato redondo ou filão curto, colocar em assadeiras e deixar fermentar até dobrar de volume. Fazer cortes na superfície antes de assar. Levar ao forno de lastro com vapor a 180°C por 30 a 35 minutos ou forno turbo a 150°C por 30 a 35 minutos.',
                    characteristics: 'O Pão Semi Italiano tem casca dourada e levemente crocante, com miolo macio e uniforme. Seu sabor é suave e versátil, sendo perfeito para o dia a dia, torradas, bruschettas e acompanhamentos de sopas e caldos.'
                }
            },
            {
                folder: 'Pão de Tapioca',
                name: 'Pão de Tapioca',
                data: {
                    ingredients: 'Fécula de mandioca, farinha de trigo especial enriquecida com ferro e ácido fólico, gordura vegetal, queijo, açúcar, leite em pó, sal e aroma alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Pão de Tapioca, a água ambiente, os ovos e o queijo parmesão. Misturar em velocidade lenta até homogeneizar. Bater em velocidade média por aproximadamente 2 minutos. Adicionar o fermento e misturar levemente. Cortar a massa no tamanho desejado, bolear e colocar em assadeiras untadas. Deixar fermentar até dobrar de volume. Levar para assar em forno de lastro a 180°C por 20 a 25 minutos ou forno turbo a 150°C por 20 a 25 minutos.',
                    characteristics: 'O Pão de Tapioca tem textura única, com casca fina e levemente crocante e miolo elástico e macio, lembrando o pão de queijo. Possui sabor suave de mandioca e queijo, sendo uma opção deliciosa e diferenciada para lanches e café da manhã.'
                }
            },
            {
                folder: 'Pizza',
                name: 'Pizza',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, açúcar, óleo de soja e melhorador.',
                    preparation: 'Colocar na masseira a Mistura para Pizza e a água gelada. Misturar bem em velocidade lenta e adicionar o fermento. Bater até obter uma massa lisa e enxuta. Dividir a massa em bolinhas de tamanho desejado (350g para média), bolear e deixar descansar coberto com plástico por 30 minutos. Abrir a massa com rolo ou na mão, colocar em assadeiras de pizza e pré-assar em forno lastro a 250°C por 3 a 5 minutos. Rechear a gosto e levar ao forno para finalizar.',
                    characteristics: 'A massa de pizza preparada com esta mistura resulta em uma base crocante por fora e macia por dentro, com espessura ideal para diversos tipos de recheio. Tem sabor equilibrado e ótima textura, garantindo uma pizza de qualidade profissional.'
                }
            }
        ]
    }
];

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

// Helper to find folder ignoring normalization
function findFolder(basePath: string, targetName: string): string | null {
    if (!fs.existsSync(basePath)) return null;
    const entries = fs.readdirSync(basePath);
    // Try exact match first
    if (entries.includes(targetName)) return path.join(basePath, targetName);

    // Try normalized match
    const targetNorm = targetName.normalize('NFC');
    for (const entry of entries) {
        if (entry.normalize('NFC') === targetNorm) {
            return path.join(basePath, entry);
        }
    }

    // Try partial match or sanitized match (remove special chars) as fallback
    // This handles things like "Pão" vs "Pao" if manual map has typos
    // But for now, normalized should be enough if map is correct.
    return null;
}

async function uploadImages(baseDir: string, folderName: string, productName: string) {
    const dirPath = findFolder(baseDir, folderName);

    console.log(`    Looking for images for ${folderName}...`);
    if (!dirPath) {
        console.error(`      ERROR: Product Directory not found: ${folderName} in ${baseDir}`);
        const actual = fs.readdirSync(baseDir);
        console.log(`      Available folders: ${actual.join(', ')}`);
        return [];
    }

    console.log(`      Found folder: ${dirPath}`);

    const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/.test(f));
    console.log(`      Found ${files.length} images: ${files.join(', ')}`);
    const uploadedIds = [];

    const payload = await getPayload({ config: configPromise });

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.parse(file).name;

        const publicId = `via-pane-manual-v2-${Date.now()}-${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

        try {
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { public_id: publicId, folder: 'via-pane-new-cats-fixed' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(fileBuffer);
            });

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
            console.log(`      Uploaded: ${mediaDoc.filename} (ID: ${mediaDoc.id})`);

        } catch (err) {
            console.error(`      Failed to upload ${file}:`, err);
        }
    }

    return uploadedIds;
}

async function seed() {
    const payload = await getPayload({ config: configPromise });

    for (const cat of CATEGORY_MAP) {
        console.log(`\nProcessing Category: ${cat.name} (${cat.id})...`);

        // Find Category Base Path robustly too
        // "Pães integrais" might be NFD in FS
        const catBasePath = findFolder(BASE_PATH, cat.path);

        if (!catBasePath) {
            console.error(`  ERROR: Category Folder not found: ${cat.path}`);
            // List base to help debug
            console.log(`  Base folders: ${fs.readdirSync(BASE_PATH).join(', ')}`);
            continue;
        }

        for (const prod of cat.products) {
            console.log(`  Processing Product: ${prod.name}`);

            // Image Upload using robust find
            const mediaIds = await uploadImages(catBasePath, prod.folder, prod.name);

            // Create/Update Product
            const normalizedName = prod.name.normalize('NFC');
            const slug = normalizeStr(normalizedName);

            console.log(`    DEBUG: mediaIds for ${prod.name}:`, mediaIds);

            const productData = {
                name: normalizedName,
                slug: slug,
                category: cat.id,
                description: prod.data.characteristics || prod.name, // Fallback
                mainImage: mediaIds.length > 0 ? mediaIds[0] : null,
                gallery: mediaIds.map(id => ({ image: id })),
                ingredients: createLexicalStructure(prod.data.ingredients),
                preparationMode: createLexicalStructure(prod.data.preparation),
                characteristics: createLexicalStructure(prod.data.characteristics)
            };

            console.log(`    DEBUG: productData.mainImage:`, productData.mainImage);

            try {
                const existing = await payload.find({
                    collection: 'products',
                    where: { slug: { equals: slug } }
                });

                if (existing.totalDocs > 0) {
                    console.log(`    Updating existing product...`);
                    // @ts-ignore
                    await payload.update({
                        collection: 'products',
                        id: existing.docs[0].id,
                        data: productData
                    });
                } else {
                    console.log(`    Creating new product...`);
                    await payload.create({
                        collection: 'products',
                        data: productData
                    });
                }

            } catch (error) {
                console.error(`    ERROR saving ${prod.name}:`, error);
            }
        }
    }

    console.log('\n--- Manual Upload Complete ---');
    process.exit(0);
}

seed();

import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida Site';

// Cloudinary Config - Fixed with robust env check
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper: Normalize String for Slug
function normalizeStr(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

// Helper: Find Folder Robustly (NFC/NFD)
function findFolder(basePath: string, targetName: string): string | null {
    if (!fs.existsSync(basePath)) return null;
    const entries = fs.readdirSync(basePath);
    // Exact match
    if (entries.includes(targetName)) return path.join(basePath, targetName);
    // Normalized match
    const targetNorm = targetName.normalize('NFC');
    for (const entry of entries) {
        if (entry.normalize('NFC') === targetNorm) {
            return path.join(basePath, entry);
        }
    }
    return null;
}

// Helper: Create Lexical Structure
function createLexicalStructure(text: string) {
    return {
        root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: [{
                type: "paragraph",
                version: 1,
                children: [{
                    text: text.trim(),
                    type: "text",
                    version: 1
                }],
                direction: "ltr"
            }],
            direction: "ltr"
        }
    };
}

// --- DATA MAPPING ---

const CATEGORY_MAP = [
    {
        name: 'Confeitaria Seca',
        path: 'Confeitaria Seca',
        products: [
            {
                name: 'Broa de Milho',
                folder: 'Broa de Milho',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, fubá, ovos, margarina, leite, erva doce, sal, bicarbonato de sódio e fermento químico.',
                    preparation: 'Colocar na masseira a Mistura para Broa de Milho, os ovos e o leite e misturar em primeira velocidade por 3 minutos até obter uma massa homogênea. Cortar peças de 50g e bolear. 3- Passar a parte superior no fubá e arrumar em assadeiras lisas. Forno de lastro 180ºC por 20 minutos e forno turbo 150ºC por 15 minutos.',
                    characteristics: 'A broa de milho é um clássico de sabor rústico e reconfortante. Com sua cor dourada vibrante e textura levemente granulada por fora, ela revela um interior macio e úmido. Feita à base de milho e fubá, seu sabor é levemente adocicado, com o toque inconfundível do milho.'
                }
            },
            {
                name: 'Broa Portuguesa',
                folder: 'Broa Portuguesa',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, fubá, açúcar, sal, erva doce, ovos, leite, óleo, fermento e aroma alimentício.',
                    preparation: 'Colocar todos os ingredientes na masseira e misturar em primeira velocidade até formar uma massa homogênea. Pesar peças de 400g e bolear. Colocar em assadeiras untadas e deixar fermentar até dobrar de volume. Pincelar com ovos e polvilhar fubá. Forno de lastro 180ºC por 40 minutos e forno turbo 150ºC por 35 minutos.',
                    characteristics: 'A broa portuguesa é um pão denso e saboroso,feito com uma mistura de farinha de trigo e de milho. Sua casca é grossa e crocante, muitas vezes rachada rusticamente, enquanto o miolo é macio, amarelado e ligeiramente úmido. Possui um sabor levemente adocicado e marcante.'
                }
            },
            {
                name: 'Biscoito de Nata',
                folder: 'Biscoito de Nata',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, amido de milho, nata, ovos, margarina e fermento químico.',
                    preparation: 'Misturar todos os ingredientes até obter uma massa homogênea e que solte das mãos. Modelar os biscoitos no formato desejado. Colocar em assadeiras. Forno de lastro 180ºC por 15 a 20 minutos ou até dourar levemente.',
                    characteristics: 'O biscoito de nata é delicado, derrete na boca e tem um sabor suave e amanteigado, típico da nata fresca. Com textura leve e friável, é levemente crocante por fora e macio por dentro.'
                }
            },
            {
                name: 'Broa Airosa',
                folder: 'Broa Airosa', // Likely missing
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ácido fólico e ferro, fubá de milho, açúcar, amido, erva doce, sal, bicarbonato de sódio e aroma alimentício.',
                    preparation: 'Colocar na masseira a Mistura para Broa Airosa, leita, o óleo e os ovos e em velocidade baixa deixe misturar bem. Cortar em tamanho de 50 g, modele em formato bola, passar no fubá de milho e levar para assar imediatamente em forno de lastro a +/- 200ºC ou em forno turbo a +/- 155ºC por aproximadamente 10 minutos.',
                    characteristics: 'A broa airosa possui uma textura leve e macia, muito mais fofa do que as broas tradicionais. Seu miolo é suave, úmido e aerado, enquanto a casquinha é fina, oferecendo um contraste delicado ao morder. É uma broa equilibrada, leve no paladar e agradável tanto para comer pura quanto acompanhada.'
                }
            },
            {
                name: 'Chipa',
                folder: 'Chipa', // Likely missing
                data: {
                    ingredients: 'Fécula de mandioca, polvilho azedo, gordura vegetal low trans, sal e aroma alimentício.',
                    preparation: 'Colocar na batedeira a Mistura para Chipa, queijo ralado, ovos e o leite e bater por +/- 3 minutos em velocidade média (2) usando o batedor tipo leque. Cortar a massa com 40g, modelar em formato de meia-lua e fornear sem vapor em forno de lastro a 200°C de 15 a 20 minutos aproximadamente, ou em forno turbo a 170°C de 10 a 15 minutos aproximadamente.',
                    characteristics: 'A chipa é um pão típico da culinária paraguaia e do sul do Brasil, a Chipa Via Pane possui um sabor levemente salgado e marcante de queijo é firme por fora e macia por dentro.'
                }
            },
            {
                name: 'Donuts',
                folder: 'Donuts', // Likely missing
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, sal, melhorador, aroma alimentício, corante alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Donuts, os ovos, acrescente água gelada e o fermento. Misturar bem em velocidade baixa por 5 minutos e aumente a velocidade até atingir o ponto de véu. Colocar a massa sobre a mesa e cubra com um plástico deixando descansar por 10 minutos. Dividir no tamanho desejado, modelar e deixar fermentar até dobrar de tamanho por +/- 50 minutos. Levar ao forno de lastro com vapor a +/- 180°C de 30 a 35 minutos e forno for turbo assar com vapor na temperatura de +/- 140 a 160°C de 25 a 30 minutos.',
                    characteristics: 'O donuts possui uma textura macia e leve. Seu sabor é doce e amanteigado, podendo variar conforme coberturas ou recheios, como chocolate, açúcar, glacê ou creme.'
                }
            },
            {
                name: 'Farofa Doce',
                folder: 'Farofa Doce',
                data: {
                    ingredients: 'Farinha de trigo enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, sal, leite, bicarbonato de sódio, conservante INS 282, aroma alimentício e corante alimentício.',
                    preparation: 'Pode ser utilizada em pães, doces, bolos, tortas, cuca alemã entre outras. Aplicar sempre em cima do produto como cobertura na hora de assar, o que traz mais sabor, suavidade e crocância ao produto.',
                    characteristics: 'A Farofa Doce Via Pane, possui um sabor com sabor maravilhoso, marcadamente adocicado e levemente caramelizado, que encanta o paladar. Sua textura é crocante e levemente granulada.'
                }
            },
            {
                name: 'Pão de Queijo',
                folder: 'Pão de Queijo',
                data: {
                    ingredients: 'Amido de mandioca, amido modificado, gordura vegetal low trans, sal, leite e aroma alimentício.',
                    preparation: 'Colocar na masseira a Mistura para Pão de Queijo, acrescentar os ovos, mussarela, e por último aos poucos a água. Bater em velocidade baixa até ficar uma massa homogênea por alguns minutos, tirar a massa da masseira e colocar sobre a mesa modelar no tamanho desejado. Assar em forno de lastro a 180°C 35 a 30 minutos ou forno turbo a 150º C de 30 a 25 minutos.',
                    characteristics: 'Pão típico brasileiro, possui uma textura macia e elástica por dentro e levemente crocante por fora. Seu sabor é levemente salgado e marcante de queijo. O aroma é intenso e convidativo, com cheiro característico de queijo assado. É um alimento fofo, saboroso e nutritivo, ideal para lanches, café da manhã ou lanche da tarde.'
                }
            },
            {
                name: 'Sonho Americano',
                folder: 'Sonho Americano',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, sal, leite, melhorador, corante alimentício, aroma alimentício e conservante INS282.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Sonho Americano, adicionar a água gelada, as gemas e os ovos inteiros, misture em velocidade lenta por 5 minutos até a massa ficar homogênea. Adicionar a margarina e o fermento, misture em velocidade lenta por 1 minuto, passar para a velocidade alta e deixar bater +/- 8 minutos até ponto de véu. Dividir a massa com 70g, bolear, arrumar na assadeira com farinha e deixar crescer até dobrar de tamanho. Fritar a 130º C, cortar no meio e rechear com uma camada de creme de baunilha, morango picado, brilho de morango e por último peneirar açúcar gelado por cima.',
                    characteristics: 'O Sonho Americano possui uma massa leve, fofa e aerada. Essa textura faz com que o doce seja muito versátil, podendo receber diferentes tipos de recheios: creme de baunilha, chocolate, doce de leite, frutas ou ganaches. A massa serve como base estável e delicada, proporcionando equilíbrio entre o miolo macio e o recheio cremoso, enquanto a superfície levemente adocicada ou polvilhada com açúcar complementa o sabor e a apresentação.'
                }
            },
            {
                name: 'Cuca Alemã',
                folder: 'Cucã Alemã', // Handling typo separately or normalizing
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, leite, sal, melhorador, corante alimentício e aroma alimentício.',
                    preparation: 'Colocar na batedeira a Mistura para Cuca Alemã, adicionar metade da água gelada (300 ml). Misturar em baixa velocidade por +/- 4 minutos. Acrescentar o fermento fresco e bater em velocidade alta até ficar bem misturado. Acrescentar o restante da água gelada e bater em velocidade alta até o ponto de véu. Colocar em forma adequada para cuca alemã. Cortar nos tamanhos desejado, untar a forma antes de colocar a massa, cobrir com o plástico e deixar por +/- 30 minutos. Após o descanso espalhar a farofa doce sobre a massa e levar para o carrinho de fermentação por 30 minutos. Fornear por +/- 35 minutos em forno de lastro a 180º C usando uma assadeira de pão francês embaixo da forma se necessário, assar em forno turbo a +/- 150º C por +/- 25 minutos.',
                    characteristics: 'A Cuca Alemã é um bolo tradicional de origem germânica, conhecido por sua massa macia, levemente adocicada e aerada, que lembra um pão doce. Pode ser feita com diversos sabores, como banana, maçã, uva, doce de leite, goiabada e etc. Ideal ser finalizada com a Farofa Doce Via Pane.'
                }
            },
            {
                name: 'Bombas e Carolinas',
                folder: 'Bombas e Carolinas',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, sal, amido e bicarbonato de sódio.',
                    preparation: 'Colocar na batedeira o óleo a água e a Mistura para Bombas e Carolinas, acrescente aos poucos os ovos, depois de adicionar todos os ovos deixe a massa bater até ficar bem misturada. Com o auxílio de uma manga de confeiteiro, pingar a massa nas assadeiras. Levar para assar em forno turbo a 140°C ou forno de lastro a 180°C por +/- 35 minutos.',
                    characteristics: 'Possui uma massa leve e com textura oca, que permite a criação de doces delicados e aerados. A massa é macia por dentro e levemente crocante por fora, servindo de base perfeita para diferentes recheios cremosos, como creme de confeiteiro, chocolate ou doce de leite.'
                }
            }
        ]
    },
    {
        name: 'Panetones e Confeitaria',
        path: 'Panetones e Confeitaria',
        products: [
            {
                name: 'Panetone com Pasta Gema', // Adjusted name based on docx context
                folder: 'Panetone Pasta com Gema',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gema, gordura vegetal low trans, sal, estabilizantes mono e diglicerídeos de ácidos graxos, melhorador, aroma alimentício, corante alimentício e conservante INS 282.',
                    preparation: 'Primeira Etapa - Esponja:  Colocar na masseira a farinha, a água gelada e bater em velocidade lenta até que a mistura incorpore a água. Acrescentar o fermento e bater em velocidade rápida até a massa ficar homogênea e parcialmente desenvolvida. Cobrir a massa com um plástico e deixar fermentar por 60 minutos. Segunda Etapa: Colocar na masseira a Mistura para Panetone Concentrado com Gema e bater em velocidade rápida até dissolver o bloco de pasta, adicionar a farinha de trigo, água gelada e a esponja e bater em velocidade lenta até formar uma massa homogênea. Depois bater em velocidade rápida até que a massa fique lisa e elástica (desgrudando totalmente das paredes da masseira). A temperatura da massa não deve exceder de 28º C, acrescentar as frutas e a uva e misturar em velocidade lenta até serem incorporadas pela massa. Retirar a massa da masseira e colocar sobre a mesa untada com óleo, dividir em pedaços de 550g, bolear e deixar descansar por 20 minutos na mesa. Após o descanso, bolear novamente e colocar nas formas para panetone. 5- Deixar fermentar por aproximadamente 2 horas ou até dobrar de tamanho, fazer um X com a risca pão ou navalha. Levar para assar em forno de lastro a 165ºC de 30 a 35 minutos aproximadamente e em forno turbo a 135ºC de 30 a 35 minutos, sem vapor. Embalar logo após esfriar (+/- 60 minutos). OBS: Ao embalar recomendamos pulverizar com antimofo líquido para maior durabilidade.',
                    characteristics: 'O panetone com gema tem miolo ainda mais macio, rico e sabor encorpado, com cor dourada característica. Seu aroma é intenso e a textura é fofa e delicada, proporcionando uma experiência tradicional e sofisticada de sabor. É uma opção prática e versátil, que possui maior rendimento.'
                }
            },
            {
                name: 'Panetone sem Gema', // Adjusted name based on docx context
                folder: 'Panetone Pasta sem Gema',
                data: {
                    ingredients: 'Açúcar, gordura vegetal low trans, estabilizantes mono e diglicerídeos de ácidos graxos, melhorador, aroma alimentício, corante alimentício e conservante INS 282.',
                    preparation: 'Primeira Etapa - Esponja:  Colocar na masseira a farinha, a água gelada e bater em velocidade lenta até que a mistura incorpore a água. Acrescentar o fermento e bater em velocidade rápida até a massa ficar homogênea e parcialmente desenvolvida. Cobrir a massa com um plástico e deixar fermentar por 60 minutos. Segunda Etapa: Colocar na masseira a Mistura para Panetone Concentrado sem Gema e bater em velocidade rápida até dissolver o bloco de pasta, adicionar a farinha de trigo, água gelada e a esponja e bater em velocidade lenta até formar uma massa homogênea. Depois bater em velocidade rápida até que a massa fique lisa e elástica (desgrudando totalmente das paredes da masseira). A temperatura da massa não deve exceder de 28º C, acrescentar as frutas e a uva e misturar em velocidade lenta até serem incorporadas pela massa. Retirar a massa da masseira e colocar sobre a mesa untada com óleo, dividir em pedaços de 550g, bolear e deixar descansar por 20 minutos na mesa. Após o descanso, bolear novamente e colocar nas formas para panetone. 5- Deixar fermentar por aproximadamente 2 horas ou até dobrar de tamanho, fazer um X com a risca pão ou navalha. Levar para assar em forno de lastro a 165ºC de 30 a 35 minutos aproximadamente e em forno turbo a 135ºC de 30 a 35 minutos, sem vapor. Embalar logo após esfriar (+/- 60 minutos). OBS: Ao embalar recomendamos pulverizar com antimofo líquido para maior durabilidade.',
                    characteristics: 'O panetone sem gema apresenta miolo macio e leve, com sabor adocicado suave e textura fofa. É uma opção prática e versátil, que possui maior rendimento.'
                }
            },
            {
                name: 'Panetone Tradicional',
                folder: 'Panetone Tradicional',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, gema, sal, estabilizantes mono e diglicerídeos de ácidos graxos, melhorador, aroma alimentício, corante alimentício e conservante INS 282.',
                    preparation: 'Primeira Etapa: Esponja: Colocar na masseira a farinha, a água ambiente e o fermento e bater em velocidade baixa. Deixar bater até obter uma massa homogênea. Deixar descansar por 40 minutos. Segunda Etapa: Colocar na masseira a esponja, a Mistura para Panetone Tradicional, acrescentar metade da água gelada pedida aos poucos e deixar misturar em velocidade baixa até que incorpore toda a mistura, passe a bater em velocidade alta e ir adicionando o restante da água gelada aos poucos até atingir ponto de véu. Adicionar as frutas e a uva passa e misturar bem para incorporar em toda massa. Retirar a massa da masseira e colocar sobre a mesa untada com óleo, dividir em pedaços de 550g, bolear e deixar descansar por 20 minutos na mesa. Após o descanso, bolear novamente e colocar nas formas para panetone. Deixar fermentar por aproximadamente 2 horas ou até dobrar de tamanho, fazer um X com a risca pão ou navalha. Levar para assar em forno de lastro a 165ºC de 30 a 35 minutos aproximadamente e em forno turbo a 135ºC de 30 a 35 minutos, sem vapor. Embalar logo após esfriar (+/- 60 minutos). OBS: Ao embalar recomendamos pulverizar com antimofo líquido para maior durabilidade.',
                    characteristics: 'O panetone tradicional tem miolo macio e aerado, com sabor adocicado e aroma característico. Sua textura leve e fofa, combinada com frutas cristalizadas ou gotas de chocolate, torna-o ideal para celebrações e ocasiões especiais.'
                }
            },
            {
                name: 'Creme de Confeiteiro',
                folder: 'Creme de Confeiteiro',
                data: {
                    ingredients: 'Açúcar, amido de milho modificado, aroma idêntico ao natural de baunilha, sal, corante idêntico ao natural betacaroteno.',
                    preparation: 'Colocar o leite para ferver, antes de abrir fervura adicione a Mistura para Creme de Confeiteiro e mexa até que se obtenha a consistência desejada.',
                    characteristics: 'O creme de confeiteiro é um creme clássico da confeitaria, possui uma textura cremosa, sabor suave e versatilidade. Pode ser utilizado em recheio de bolos, tortas, sonhos e éclairs, ele se destaca pelo equilíbrio entre doçura e leveza.'
                }
            }
        ]
    },
    {
        name: 'Patisserie e Pão de Ló',
        path: 'Patisserie e Pão de Ló',
        products: [
            {
                name: 'Croissant',
                folder: 'Croissant',
                data: {
                    ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, sal, leite, melhorador, corante alimentício e aroma alimentício.',
                    preparation: 'Colocar na masseira ou batedeira a Mistura para Croissant, a água gelada, os ovos e o fermento e bater até obter o ponto de véu. Colocar a massa sobre a mesa, e deixar descansar por 10 minutos. Após o descanso abrir a massa com um rolo, pesar a manteiga folhada e folhear a massa em três dobras. Abrir novamente com altura de 1 cm, cortar em triângulos ou no tamanho desejado. Pode ser recheada para uso doce ou salgado. Ex.: com frios ou requeijão, calabresa, chocolate, frutas cristalizadas, ou qualquer recheio doce torneável. Pincelar com a gema do ovo e deixar fermentar por +/- 50 minutos. Assar em forno de lastro a 190°C de 30 a 35 minutos ou forno turbo a 140°C de 25 a 30 minutos. Obs.: Não precisa de vapor. Com baixa fermentação pode ser guardado na câmara fria para ser assado no dia seguinte.',
                    characteristics: 'O croissant é um pão de origem francesa, famoso por sua textura leve, folhada e extremamente macia por dentro, com uma casca dourada e crocante por fora. Produzido com massa fermentada e bastante manteiga, ele passa por um processo de dobras que cria suas camadas características. Seu sabor é delicado e amanteigado, podendo ser consumido tanto na versão tradicional quanto recheado com ingredientes doces ou salgados. É muito apreciado no café da manhã e no lanche.'
                }
            },
            {
                name: 'Pão de Ló de Baunilha',
                folder: 'Pão de Ló de Baunilha',
                data: {
                    ingredients: 'Açúcar, farinha de trigo enriquecida com ferro e ácido fólico, amido de milho, aroma alimentício, bicarbonato de sódio, pirofosfato de sódio e sal.',
                    preparation: 'Colocar na batedeira a Mistura para Pão de Ló Baunilha, a água e os ovos. Bater por alguns segundos na velocidade 1 para homogeneizar a mistura. Passar para a velocidade 3 e deixar bater por aproximadamente 4 minutos. Colocar a massa nas formas untadas e levar ao forno de lastro 170º C de 30 a 35 minutos aproximadamente e no forno turbo 150º C de 25 a 30 minutos aproximadamente.',
                    characteristics: 'O pão de ló de baunilha é um bolo leve, macio e aerado, com uma textura extremamente fofinha e sabor suave. A massa possui a característica de ser úmida e muito versátil, servindo como base para bolos recheados ou sendo apreciado puro. O aroma da baunilha traz um toque especial, deixando o pão de ló ainda mais doce e convidativo.'
                }
            },
            {
                name: 'Pão de Ló de Chocolate',
                folder: 'Pão de Ló de Chocolate',
                data: {
                    ingredients: 'Açúcar, farinha de trigo enriquecida com ferro e ácido fólico, amido de milho, bicarbonato de sódio, farinha de trigo especial enriquecida com ferro e ácido fólico, cacau em pó e aroma alimentício.',
                    preparation: 'Colocar na batedeira a Mistura para Pão de Ló Chocolate, a água e os ovos. Bater por alguns segundos na velocidade 1 para homogeneizar a mistura. Passar para a velocidade 3 e deixar bater por aproximadamente 4 minutos. Colocar a massa nas formas untadas e levar ao forno de lastro a 170º C de 30 a 35 minutos aproximadamente e no forno turbo 150º C de 25 a 30 minutos aproximadamente.',
                    characteristics: 'O pão de ló de chocolate é um bolo leve, macio e aerado, com uma textura extremamente fofinha e sabor suave. A massa possui a característica de ser úmida e muito versátil, servindo como base para bolos recheados ou sendo apreciado puro.'
                }
            }
        ]
    }
];

// --- UPLOAD LOGIC ---

async function uploadImages(baseDir: string, folderName: string, productName: string, payload: any) {
    const dirPath = findFolder(baseDir, folderName);

    console.log(`    Looking for images for ${folderName}...`);
    if (!dirPath) {
        console.warn(`      WARNING: Product Directory not found: ${folderName} in ${baseDir}. Skipping image upload.`);
        return [];
    }

    console.log(`      Found folder: ${dirPath}`);

    const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/.test(f));
    console.log(`      Found ${files.length} images: ${files.join(', ')}`);
    const uploadedIds = [];

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.parse(file).name;

        const publicId = `via-pane-auto-v3-${Date.now()}-${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

        try {
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { public_id: publicId, folder: 'via-pane-confeitaria' },
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
        console.log(`\nProcessing Category: ${cat.name}...`);

        // Find Category Base Path
        const catBasePath = findFolder(BASE_PATH, cat.path);

        if (!catBasePath) {
            console.error(`  ERROR: Category Folder not found: ${cat.path}`);
            continue;
        }

        // Find or Create Category in CMS
        const catSlug = normalizeStr(cat.name);
        let categoryId;
        const existingCat = await payload.find({
            collection: 'product-categories',
            where: { name: { equals: cat.name } } // Match by name or create
        });

        if (existingCat.totalDocs > 0) {
            categoryId = existingCat.docs[0].id;
            console.log(`  Found existing category ID: ${categoryId}`);
        } else {
            const newCat = await payload.create({
                collection: 'product-categories',
                data: { name: cat.name, parent: 5 } // Assuming 5 is 'Produtos' top level if applicable, or null. Defaulting to 5 as per previous scripts.
            });
            categoryId = newCat.id;
            console.log(`  Created new category ID: ${categoryId}`);
        }

        for (const prod of cat.products) {
            console.log(`  Processing Product: ${prod.name}`);

            // Image Upload
            const mediaIds = await uploadImages(catBasePath, prod.folder, prod.name, payload);

            // Create/Update Product
            const normalizedName = prod.name.normalize('NFC');
            const slug = normalizeStr(normalizedName);

            const productData = {
                name: normalizedName,
                slug: slug,
                category: categoryId,
                description: prod.data.characteristics || prod.name,
                mainImage: mediaIds.length > 0 ? mediaIds[0] : null,
                gallery: mediaIds.map(id => ({ image: id })),
                ingredients: createLexicalStructure(prod.data.ingredients),
                preparationMode: createLexicalStructure(prod.data.preparation),
                characteristics: createLexicalStructure(prod.data.characteristics)
            };

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

    console.log('\n--- Confeitaria Upload Complete ---');
    process.exit(0);
}

seed();

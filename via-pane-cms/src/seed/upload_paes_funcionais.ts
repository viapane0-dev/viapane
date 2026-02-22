import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Base path for images
const BASE_PATH = '/Volumes/SSD/Via Pane/Site/Via Pane/Subida site/Pães funcionais'

const products = [
    {
        name: 'Ciabatta Funcional',
        slug: 'ciabatta-funcional',
        folderName: 'Ciabatta Funcional',
        description: 'A ciabatta funcional é uma versão mais saudável da tradicional ciabatta, mantendo a casca crocante e o interior macio e aerado. Ela é preparada com ingredientes nutritivos que aumenta seu valor nutricional. Possui sabor suave, leve e versátil, sendo ideal para sanduíches naturais, torradas ou como acompanhamento em refeições equilibradas. É uma opção que une sabor, textura e benefícios à saúde.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, fibras, amido modificado, semente de girassol, semente de linhaça, melhorador, soja, castanha, sal, açúcar e conservante INS 282.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Ciabatta Funcional, a água gelada e o fermento fresco.',
            'Deixar bater até desgrudar do recipiente, colocar a massa em uma forma quadrada borrifada com bastante farinha, acrescentar mais farinha por cima e deixar crescer até dobrar de tamanho.',
            'Despejar na mesa a massa e cortar com uma espátula no tamanho desejado.',
            'Esticar as duas pontas com a mão e colocar na assadeira.',
            'Deixar crescer por 20 minutos e levar ao forno de lastro com vapor a 200°C 20 a 30 minutos ou forno turbo em 150°C 25 a 30 minutos.'
        ],
        characteristics: [
            'Casca crocante e interior macio',
            'Rico em fibras',
            'Sementes de girassol e linhaça',
            'Ideal para sanduíches naturais'
        ]
    },
    {
        name: 'Pão de Granola Light',
        slug: 'pao-granola-light',
        folderName: 'Pão de Granola Light',
        description: 'O pão de granola light é uma opção saudável e nutritiva, ideal para quem busca uma alimentação equilibrada. Possui sabor suave e levemente adocicado, além de textura macia com crocância dos grãos. Por ter menos gordura e açúcar, é muito utilizado em dietas e combina bem com recheios leves.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar (redução de 50%), granola, sal, leite, melhorador, cevada, corante alimentício e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão de Granola Light, a água gelada e por último o fermento.',
            'Deixar bater até obter uma massa lisa e em ponto de véu.',
            'Tirar a massa da masseira e colocar sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado, adicionar a cobertura e deixar fermentar por +/- 50 minutos.',
            'Levar para assar em forno de lastro com vapor 200°C 30 a 35 minutos ou em forno turbo 160°C 25 a 30 minutos.'
        ],
        characteristics: [
            'Crocância dos grãos',
            'Menos gordura e açúcar',
            'Sabor suave e levemente adocicado',
            'Ideal para dietas'
        ]
    },
    {
        name: 'Pão Aveia Light',
        slug: 'pao-aveia-light',
        folderName: 'Pão Aveia light',
        description: 'O pão de aveia light é conhecido por ser uma opção mais saudável e leve, ideal para quem busca uma alimentação equilibrada. Feito com aveia, rica em fibras, ele ajuda na digestão e promove maior sensação de saciedade. Sua textura é macia, com sabor suave e levemente tostado.',
        ingredients: 'Farinha de trigo enriquecida com ferro e ácido fólico, açúcar, fibra, sal, cevada, melhorador e aroma alimentício.',
        preparation: [
            'Adicionar à masseira a Mistura para Pão de Aveia, água gelada e fermento.',
            'Bater até obter ponto de véu.',
            'Descansar a massa por 10 minutos.',
            'Modelar e fermentar por aproximadamente 50 minutos.',
            'Assar a 200°C (lastro) ou 160°C (turbo).'
        ],
        characteristics: [
            'Rico em fibras',
            'Ajuda na digestão',
            'Textura macia',
            'Sabor suave e levemente tostado'
        ]
    },
    {
        name: 'Pão Aveia e Mel',
        slug: 'pao-aveia-mel',
        folderName: 'Pão aveia e mel',
        description: 'Delicioso pão que combina os benefícios da aveia com o sabor suave e adocicado do mel. Uma opção nutritiva e saborosa para o seu café da manhã ou lanche da tarde.',
        ingredients: 'Farinha de trigo enriquecida, aveia, mel, açúcar, sal, gordura vegetal, fermento biológico e melhorador de farinha.', // Generic approximation
        preparation: [
            'Misturar os ingredientes na masseira com água gelada.',
            'Bater até atingir o ponto de véu.',
            'Deixar descansar, modelar e fermentar.',
            'Assar em forno pré-aquecido até dourar.'
        ],
        characteristics: [
            'Sabor suave de mel',
            'Nutritivo com aveia',
            'Macio e aromático'
        ]
    },
    {
        name: 'Pão de Centeio',
        slug: 'pao-de-centeio',
        folderName: 'Pão de Centeio', // Does not exist, will skip image
        description: 'O pão de centeio possui um sabor marcante, levemente ácido, e pela textura mais densa em comparação ao pão de trigo. É um pão muito nutritivo, rico em fibras, colaborando para a digestão e a sensação de saciedade. Versátil, combina muito bem com manteiga, queijos, frios e pratos salgados.',
        ingredients: 'Farinha de trigo enriquecida com ferro e ácido fólico, açúcar, fibra, sal, cevada, melhorador e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão de Centeio, a água gelada e por último o fermento. Deixar bater até obter uma massa lisa e uniforme.',
            'Colocar a massa sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado e deixar fermentar por +/- 50 minutos.',
            'Levar para assar no forno de lastro com vapor na temperatura de 200°C de 30 a 35 minutos. Se o forno for turbo asse na temperatura de 150 a 170°C de 25 a 30 minutos.'
        ],
        characteristics: [
            'Sabor marcante e levemente ácido',
            'Textura mais densa',
            'Rico em fibras',
            'Sensação de saciedade'
        ]
    },
    {
        name: 'Pão de Cevada Torrada',
        slug: 'pao-cevada-torrada',
        folderName: 'Pão de Cevada Torrada', // Does not exist, will skip image
        description: 'O pão de cevada torrada destaca-se pelo sabor intenso, característico da cevada submetida ao processo de torrefação. Possui coloração mais escura, aroma marcante e textura macia por dentro, com casca firme. É uma opção nutritiva, rica em fibras, que contribui para a digestão e proporciona maior sensação de saciedade.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, fibras, sal, gordura vegetal low trans, cevada torrada, melhorador e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão de Cevada Torrada, água gelada e por último fermento fresco, e deixar bater até obter uma massa lisa e ponto de véu.',
            'Tirar a massa da masseira e colocar sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado e deixar fermentar por +/- 50 minutos.',
            'Assar em forno de lastro 200°C de 30 a 35 minutos ou forno turbo 160ºC de 25 a 30 minutos.'
        ],
        characteristics: [
            'Sabor intenso de cevada torrada',
            'Coloração mais escura',
            'Aroma marcante',
            'Textura macia por dentro'
        ]
    },
    {
        name: 'Pão Light Fibras',
        slug: 'pao-light-fibras',
        folderName: 'Pão Light Fibras', // Does not exist, will skip image
        description: 'O pão light fibras é uma opção leve e saudável, ideal para quem busca uma alimentação equilibrada. Ele é rico em fibras, que auxiliam no bom funcionamento do intestino e promovem maior sensação de saciedade. Possui menor teor de calorias e gorduras em comparação aos pães tradicionais, além de textura macia e sabor suave.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar (redução de 50%), leite, fibras, sal, cevada, melhorador e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão Light Fibras, água gelada e por último o fermento.',
            'Deixar bater em velocidade baixa por 5 minutos até formar uma massa homogênea, passar para a velocidade alta até obter uma massa lisa e em ponto de véu.',
            'Tirar a massa e colocar sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado, adicionar a cobertura e deixar fermentar por +/- 50 minutos.',
            'Levar para assar em forno de lastro com vapor a 200°C 30 a 35 minutos ou forno turbo a 160°C 25 a 30 minutos.'
        ],
        characteristics: [
            'Rico em fibras',
            'Menor teor de calorias e gorduras',
            'Textura macia e sabor suave',
            'Auxilia no funcionamento do intestino'
        ]
    },
    {
        name: 'Pão Trigal e Milho',
        slug: 'pao-trigal-milho',
        folderName: 'Pão Trigal e Milho', // Does not exist
        description: 'O pão trigal possui uma textura macia e sabor suave, resultando em um miolo leve e aerado. Apresenta textura mais densa e sabor levemente adocicado.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, fibras, açúcar gordura vegetal low trans, sal, cevada, melhorador, conservante INS 282 e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão Integral, a água gelada e por último o fermento. Deixar bater até obter uma massa lisa e em ponto de véu.',
            'Colocar a massa sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado, adicionar a cobertura e deixar fermentar por +/- 50 minutos.',
            'Levar para assar em forno de lastro com vapor de 180 a 200°C de 30 a 35 minutos. Se o forno for turbo assar com vapor na temperatura de 150 a 170°C de 25 a 30 minutos.'
        ],
        characteristics: [
            'Textura macia',
            'Sabor suave',
            'Miolo leve e aerado',
            'Sabor levemente adocicado'
        ]
    },
    {
        name: 'Pão Trigal e Milho Light',
        slug: 'pao-trigal-milho-light',
        folderName: 'Pão Trigal e Milho Light', // Does not exist
        description: 'O Pão Trigal e Milho Light possui uma textura macia e sabor suave, resultando em um miolo leve e aerado. Apresenta textura mais densa e sabor levemente adocicado.',
        ingredients: 'Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar (redução de 50%), fubá de milho (milho geneticamente modificado a partir das espécies doadoras, bacillus thunringiensis, streptomyces, viridochromogenes, agrobacteriumefaciens, sphingobium herbicidorovans e zea mays l), fibras, sal, gordura vegetal low trans, leite, melhorador e aroma alimentício.',
        preparation: [
            'Colocar na masseira ou batedeira a Mistura para Pão Trigal e Milho Light, a água gelada e por último o fermento. Deixar bater até obter uma massa lisa e em ponto de véu.',
            'Tirar a massa da masseira e colocar sobre a mesa, cobrir com um plástico e deixar descansar por 10 minutos.',
            'Modelar no tamanho desejado, adicionar a cobertura e deixar fermentar por +/- 50 minutos.',
            'Levar para assar em forno de lastro com vapor a 200°C 30 a 35 minutos ou forno turbo a 160°C 25 a 30 minutos.'
        ],
        characteristics: [
            'Textura macia e sabor suave',
            'Miolo leve e aerado',
            'Opção light'
        ]
    }
]

// Helper to create Lexical RichText structure
function createLexicalStructure(content: string | string[]) {
    let children = []
    if (Array.isArray(content)) {
        children = content.map(text => ({
            type: 'paragraph',
            version: 1,
            children: [
                {
                    type: 'text',
                    version: 1,
                    text: text
                }
            ]
        }))
    } else {
        children = [{
            type: 'paragraph',
            version: 1,
            children: [
                {
                    type: 'text',
                    version: 1,
                    text: content
                }
            ]
        }]
    }

    return {
        root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: children
        }
    }
}

async function uploadMedia(payload: any, filePath: string, alt: string) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`)
        return null
    }

    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)

    // Check if media exists
    const existingMedia = await payload.find({
        collection: 'media',
        where: {
            filename: {
                equals: fileName
            }
        }
    })

    if (existingMedia.docs.length > 0) {
        return existingMedia.docs[0].id
    }

    const media = await payload.create({
        collection: 'media',
        data: {
            alt: alt,
        },
        file: {
            data: fileBuffer,
            name: fileName,
            mimetype: 'image/jpeg', // Assuming jpegs/pngs, Payload detects usually
            size: fileBuffer.length,
        },
    })

    return media.id
}

async function seed() {
    const payload = await getPayload({ config: configPromise })

    console.log('--- Starting Pães Funcionais Upload ---')

    // 1. Get or Create Category
    console.log('Finding/Creating Category...')

    // Find "Panificação" parent
    const parentCat = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Panificação' } }
    })
    const parentId = parentCat.docs.length > 0 ? parentCat.docs[0].id : null

    let categoryId = null
    const catQuery = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Pães funcionais' } }
    })

    if (catQuery.docs.length > 0) {
        categoryId = catQuery.docs[0].id
        console.log(`Category "Pães funcionais" already exists: ${categoryId}`)
    } else {
        const newCat = await payload.create({
            collection: 'product-categories',
            data: {
                name: 'Pães funcionais',
                parent: parentId, // Link to Panificação
                order: 20
            }
        })
        categoryId = newCat.id
        console.log(`Created category "Pães funcionais": ${categoryId}`)
    }

    // 2. Process Products
    for (const prod of products) {
        console.log(`Processing ${prod.name}...`)

        // Find images in folder
        const folderPath = path.join(BASE_PATH, prod.folderName)
        let mainImageId = null

        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath).filter(f => !f.startsWith('.'))

            if (files.length > 0) {
                // Upload first image as main
                const firstImage = files[0]
                console.log(`  Uploading image: ${firstImage}`)
                mainImageId = await uploadMedia(payload, path.join(folderPath, firstImage), prod.name)
            } else {
                console.warn(`  No images found in ${folderPath}`)
            }
        } else {
            console.warn(`  Folder not found: ${folderPath}`)
        }

        // Check if product exists
        const existingProd = await payload.find({
            collection: 'products',
            where: { slug: { equals: prod.slug } }
        })

        const productData = {
            name: prod.name,
            slug: prod.slug,
            category: categoryId,
            description: prod.description,
            ingredients: createLexicalStructure(prod.ingredients),
            characteristics: createLexicalStructure(prod.characteristics),
            preparationMode: createLexicalStructure(prod.preparation),
            mainImage: mainImageId, // Image might be null if not found, checking existing logic
            status: 'published'
        }

        // If mainImageId is null (e.g. products without folders), try to keep existing image if updating
        // Keep existing image if we are not providing a new one
        // Actually, if we want to overwrite, we should just correct the logic.
        // But here, for products without image folders, mainImageId is null.
        // If we pass null, it might remove the image? No, partial update usually merges.
        // But we are passing the whole object.
        // Let's only add mainImage field if mainImageId is not null.

        // Construct final data object (handle image separately)
        const finalData: any = { ...productData }
        if (mainImageId === null) {
            delete finalData.mainImage
        }


        if (existingProd.docs.length > 0) {
            console.log(`  Updating existing product: ${prod.name}`)
            await payload.update({
                collection: 'products',
                id: existingProd.docs[0].id,
                data: finalData
            })
        } else {
            console.log(`  Creating new product: ${prod.name}`)
            await payload.create({
                collection: 'products',
                data: finalData
            })
        }
    }

    console.log('--- Upload Complete ---')
    process.exit(0)
}

seed()

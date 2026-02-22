
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// --- DATA DEFINITIONS ---

// 1. Home Banner Data
const homeData = {
    heroBanner: [
        {
            title: "Fermentando sonhos,<br />construindo sabores",
            subtitle: "A excelência da panificação premium que alimenta o Brasil há gerações",
            buttonText: "Conheça nossa história",
            buttonUrl: "/sobre",
            type: "dynamic"
        }
    ]
}

// 2. Blog Posts Data
const blogPostsData = [
    {
        title: "Tendências de Panificação para 2026: O Que Esperar",
        excerpt: "Descubra as principais tendências que estão moldando o mercado de panificação neste ano. De ingredientes funcionais a técnicas artesanais modernas.",
        author: "Maria Silva",
        date: "2026-01-15T00:00:00.000Z",
        readTime: "5 min",
        category: "Tendências",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>O Futuro da Panificação</h2>
            <p>O mercado de panificação está passando por uma revolução silenciosa, impulsionada por consumidores cada vez mais exigentes e conscientes. Em 2026, a busca por produtos que aliam sabor, saúde e sustentabilidade não é apenas uma preferência, mas uma exigência.</p>
            <h3>1. Fermentação Natural em Alta</h3>
            <p>O pão de fermentação natural (sourdough) continua sua ascensão. Os benefícios digestivos e o sabor complexo conquistaram o paladar brasileiro. Padarias que dominam a arte do levain estão se destacando no mercado premium.</p>
            <h3>2. Ingredientes Funcionais</h3>
            <p>Não basta ser gostoso, tem que fazer bem. A incorporação de grãos ancestrais, fibras prebióticas e redução de sódio são tendências fortes. O consumidor quer indulgência sem culpa.</p>
            <h3>3. Transparência e Clean Label</h3>
            <p>Rótulos limpos e ingredientes compreensíveis são fundamentais. A Via Pane apoia essa tendência oferecendo pré-misturas de alta qualidade que permitem aos padeiros manterem a integridade de seus produtos.</p>
        `
    },
    {
        title: "Como Melhorar a Fermentação Natural dos Seus Pães",
        excerpt: "Aprenda técnicas profissionais para aprimorar o processo de fermentação e obter pães com textura e sabor superiores.",
        author: "João Santos",
        date: "2026-01-12T00:00:00.000Z",
        readTime: "8 min",
        category: "Técnicas",
        imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Dominando o Levain</h2>
            <p>A fermentação natural é uma arte que exige paciência, observação e técnica. O segredo para um pão perfeito começa muito antes de ir ao forno.</p>
            <h3>A Importância da Temperatura</h3>
            <p>Controlar a temperatura da massa é crucial. Uma fermentação lenta a frio (entre 4°C e 8°C) favorece o desenvolvimento de ácidos orgânicos complexos, resultando em um sabor mais profundo e uma melhor conservação do pão.</p>
            <h3>Fortalecendo seu Fermento</h3>
            <p>Alimente seu levain regularmente. Um fermento ativo e vigoroso é a garantia de um pão com boa estrutura, alvéolos abertos e uma crosta crocante e dourada.</p>
        `
    },
    {
        title: "Pré-misturas Premium: Qualidade e Praticidade Profissional",
        excerpt: "Entenda como as pré-misturas premium da Via Pane podem elevar a qualidade dos seus produtos mantendo a eficiência operacional.",
        author: "Ana Costa",
        date: "2026-01-10T00:00:00.000Z",
        readTime: "6 min",
        category: "Produtos",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Padronização sem Perder a Essência</h2>
            <p>Muitos padeiros temem que o uso de pré-misturas tire o caráter artesanal de seus produtos. Na Via Pane, provamos o contrário. Nossas linhas premium são desenvolvidas para serem uma base de excelência, permitindo que o profissional adicione seu toque final.</p>
            <h3>Eficiência na Produção</h3>
            <p>Reduzir o tempo de pesagem de micro-ingredientes e minimizar erros de dosagem significa mais tempo para focar na finalização e na criatividade. Nossas misturas garantem constância dia após dia.</p>
        `
    },
    {
        title: "Confeitaria de Alto Padrão: Segredos dos Mestres",
        excerpt: "Descubra os segredos dos grandes confeiteiros para criar sobremesas que impressionam pelo sabor e apresentação impecável.",
        author: "Pedro Oliveira",
        date: "2026-01-08T00:00:00.000Z",
        readTime: "7 min",
        category: "Confeitaria",
        imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>A Arte do Detalhe</h2>
            <p>Na confeitaria fina, o visual é o primeiro impacto. Mas o sabor é o que fideliza. O equilíbrio entre açúcares, gorduras e texturas é o que separa um doce comum de uma experiência gastronômica.</p>
            <h3>Ingredientes de Primeira</h3>
            <p>Chocolate belga, manteiga de qualidade, frutas frescas. Não há atalhos. Utilize as melhores bases para garantir que seus bolos e tortas tenham sabor limpo e sofisticado.</p>
        `
    },
    {
        title: "Gestão de Padaria: Como Otimizar Seu Negócio",
        excerpt: "Dicas práticas de gestão para aumentar a lucratividade e eficiência da sua padaria ou confeitaria.",
        author: "Carlos Ferreira",
        date: "2026-01-05T00:00:00.000Z",
        readTime: "10 min",
        category: "Negócios",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Lucratividade Além do Pãozinho</h2>
            <p>Gerir uma padaria envolve muito mais do que assar pães. Controle de estoque, gestão de equipe e atendimento ao cliente são pilares fundamentais.</p>
            <h3>Controle de Desperdício</h3>
            <p>O desperdício é o maior inimigo do lucro na panificação. Implementar fichas técnicas rigorosas e reaproveitar sobras de forma criativa (como torradas e farinhas de rosca especiais) pode aumentar sua margem significativamente.</p>
        `
    },
    {
        title: "Inovação em Receitas: Criando Produtos Diferenciados",
        excerpt: "Como inovar no cardápio da sua padaria criando produtos únicos que atraem e fidelizam clientes.",
        author: "Juliana Lima",
        date: "2026-01-03T00:00:00.000Z",
        readTime: "6 min",
        category: "Receitas",
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Saindo do Comum</h2>
            <p>Inovar não significa inventar a roda, mas sim apresentar novos sabores e formatos. Que tal um croissant bicolor ou um pão de queijo recheado com goiabada?</p>
            <h3>Sazonalidade</h3>
            <p>Aproveite as datas comemorativas e as frutas da estação para criar edições limitadas. Isso gera urgência de compra e mantém seu balcão sempre com novidades.</p>
        `
    },
    {
        title: "A Importância da Qualidade dos Ingredientes",
        excerpt: "Entenda como a escolha de ingredientes premium impacta diretamente no resultado final dos seus produtos.",
        author: "Roberto Alves",
        date: "2026-01-01T00:00:00.000Z",
        readTime: "5 min",
        category: "Qualidade",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>A Base de Tudo</h2>
            <p>Uma farinha com o teor correto de proteína, uma gordura com ponto de fusão ideal. Esses detalhes técnicos fazem toda a diferença na estrutura e no volume dos seus pães.</p>
        `
    },
    {
        title: "Sustentabilidade na Panificação: Práticas Essenciais",
        excerpt: "Como implementar práticas sustentáveis na sua padaria, reduzindo desperdícios e contribuindo com o meio ambiente.",
        author: "Fernanda Rocha",
        date: "2025-12-28T00:00:00.000Z",
        readTime: "8 min",
        category: "Sustentabilidade",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Padaria Verde</h2>
            <p>Do uso de embalagens biodegradáveis à economia de energia nos fornos. Ser sustentável também é ser econômico e atrai um público consciente que valoriza marcas com propósito.</p>
        `
    },
    {
        title: "Marketing para Padarias: Atraia Mais Clientes",
        excerpt: "Estratégias de marketing digital e tradicional para aumentar o fluxo de clientes na sua padaria.",
        author: "Lucas Mendes",
        date: "2025-12-25T00:00:00.000Z",
        readTime: "9 min",
        category: "Marketing",
        imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=60",
        content: `
            <h2>Venda com os Olhos</h2>
            <p>No Instagram, a foto é tudo. Invista em boas imagens dos seus produtos. Mostre o processo, o forno saindo fumaça, a crocância. O desejo começa na tela do celular.</p>
        `
    }
];

// 3. Products Data
const productsData = [
    // PANIFICAÇÃO
    {
        category: 'Panificação',
        products: [
            // Pães Macios (from frontend 'paes-macios')
            { slug: 'pao-alho', name: 'Pão de Alho' },
            { slug: 'pao-australiano', name: 'Pão Australiano' },
            { slug: 'pao-bagel-doce', name: 'Pão Bagel Doce' },
            { slug: 'pao-batata', name: 'Pão de Batata' },
            { slug: 'pao-beterraba', name: 'Pão de Beterraba' },
            { slug: 'bisnaguinha-premium', name: 'Bisnaguinha Premium' },
            { slug: 'brioche-frances', name: 'Brioche Francês' },
            { slug: 'pao-cebola', name: 'Pão de Cebola' },
            { slug: 'pao-coco-mays', name: 'Pão Coco Mays' },
            { slug: 'delicia-leite', name: 'Delícia de Leite' },
            { slug: 'pao-egg', name: 'Pão Egg' },
            { slug: 'pao-espinafre', name: 'Pão de Espinafre' },
            { slug: 'pao-folar-portugues', name: 'Pão Folar Português' },
            { slug: 'pao-mandioquinha', name: 'Pão de Mandioquinha' },
            { slug: 'pao-marroquino', name: 'Pão Marroquino' },
            { slug: 'pao-mega-mix', name: 'Pão Mega Mix' },
            { slug: 'pao-milho', name: 'Pão de Milho' },
            { slug: 'pao-forma', name: 'Pão de Forma' },
            { slug: 'pao-semolina', name: 'Pão Semolina' },
            { slug: 'pao-sovado', name: 'Pão Sovado' },
            { slug: 'pao-tapioca', name: 'Pão de Tapioca' },
            { slug: 'super-macio', name: 'Super Macio' },
            { slug: 'pao-tapioca-macio', name: 'Pão de Tapioca Macio' },
            { slug: 'pao-laranja', name: 'Pão de Laranja' },

            // Fermentação Natural (from frontend 'fermentacao-natural')
            { slug: 'baguete-francesa', name: 'Baguete Francesa' },
            { slug: 'focaccia-italiana', name: 'Focaccia Italiana' },
            { slug: 'robust-integral', name: 'Robust Integral' },
            { slug: 'robust-italiano', name: 'Robust Italiano' },
            { slug: 'robust-sementes', name: 'Robust Sementes' },
            { slug: 'panetone-fn', name: 'Panetone' },
            { slug: 'focaccia', name: 'Focaccia' },
            { slug: 'ciabatta-fn', name: 'Ciabatta com Fermentação Natural' },

            // Pães Integrais (from frontend 'paes-integrais')
            { slug: 'bisnaguinha-integral', name: 'Bisnaguinha Integral' },
            { slug: 'frances-integral', name: 'Francês Integral' },
            { slug: 'pao-integral', name: 'Pão Integral' },
            { slug: 'pao-semi-italiano-integral', name: 'Pão Semi-Italiano Integral' },

            // Pães Funcionais (from frontend 'paes-funcionais')
            { slug: 'pao-aveia-mel', name: 'Pão de Aveia e Mel' },
            { slug: 'pao-centeio', name: 'Pão de Centeio' },
            { slug: 'pao-cevada-torrada', name: 'Pão de Cevada Torrada' },

            // Pães Crocantes (from frontend 'paes-crocantes')
            { slug: 'choco-amaro', name: 'Choco Amaro' },
            { slug: 'ciabatta', name: 'Ciabatta' },
            { slug: 'pao-italiano', name: 'Pão Italiano' },
            { slug: 'pao-pizza', name: 'Pão Pizza' },
            { slug: 'pao-portugues', name: 'Pão Português' },
            { slug: 'pao-semi-italiano', name: 'Pão Semi-Italiano' },
            { slug: 'pao-tapioca-crocante', name: 'Pão Tapioca' },

            // Patisserie (from frontend 'patisserie')
            { slug: 'croissant', name: 'Croissant' },

            // Pão de Ló (from frontend 'pao-de-lo')
            { slug: 'pao-lo-chocolate', name: 'Pão de Ló Chocolate' },
            { slug: 'pao-lo-baunilha', name: 'Pão de Ló Baunilha' },

            // Concentrados (from frontend 'concentrados')
            { slug: 'panetone-com-gema', name: 'Panetone com Gema' },
            { slug: 'panetone-sem-gema', name: 'Panetone sem Gema' },
        ]
    },
    // CONFEITARIA
    {
        category: 'Confeitaria',
        products: [
            // Confeitaria Seca (from frontend 'confeitaria-seca')
            { slug: 'biscoito-nata', name: 'Biscoito de Nata' },
            { slug: 'broa-airosa', name: 'Broa Airosa' },
            { slug: 'broa-amendoim', name: 'Broa de Amendoim' },
            { slug: 'broa-milho', name: 'Broa de Milho' },
            { slug: 'broa-portuguesa', name: 'Broa Portuguesa' },
            { slug: 'donuts', name: 'Donuts' },
            { slug: 'pao-queijo', name: 'Pão de Queijo' },
            { slug: 'sonho-americano', name: 'Sonho Americano' },
            { slug: 'cuca-alema', name: 'Cuca Alemã' },

            // Bolos Cremosos (from frontend 'bolos-cremosos')
            { slug: 'bolo-aipim', name: 'Bolo de Aipim' },
            { slug: 'bolo-fuba', name: 'Bolo de Fubá' },
            { slug: 'bolo-milho', name: 'Bolo de Milho' },

            // Cakes (from frontend 'cakes')
            { slug: 'cake-abobora-coco', name: 'Cake Abóbora com Coco' },
            { slug: 'cake-capuccino', name: 'Cake Capuccino' },
            { slug: 'cake-fuba', name: 'Cake Fubá' },
            { slug: 'cake-indiano', name: 'Cake Indiano' },
            { slug: 'cake-red-velvet', name: 'Cake Red Velvet' },

            // Panetones (from frontend 'panetones')
            { slug: 'panetone-tradicional', name: 'Panetone Tradicional' }
        ]
    },
    // INGREDIENTES
    {
        category: 'Ingredientes',
        products: [
            // Aditivos e Desmoldantes (from frontend 'aditivos-desmoldantes')
            { slug: 'melhorador-ouro', name: 'Melhorador Ouro – 0,5%' },
            { slug: 'melhorador-vp', name: 'Melhorador VP – 1%' },
            { slug: 'vp-spray', name: 'VP Spray 600 ml' }
        ]
    }
];

const paoAlhoDetails: any = {
    description: 'Delicioso pão de alho, perfeito para churrascos. Crocante por fora e macio por dentro, com um recheio generoso de pasta de alho e ervas finas.',
    characteristics: {
        root: {
            children: [
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: 'Sabor Intenso e Equilibrado', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: 'Praticidade: Vai direto do freezer para o forno', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: 'Textura perfeita: Casca crocante e miolo macio', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        }
    },
    ingredients: {
        root: {
            children: [
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: 'Farinha de trigo enriquecida com ferro e ácido fólico, água, margarina, alho picado, sal, fermento biológico seco, salsa desidratada, conservante propionato de cálcio e melhorador de farinha.', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        }
    },
    preparationMode: {
        root: {
            children: [
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: '1. Pré-aqueça o forno a 180°C por 10 minutos.', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: '2. Retire o produto da embalagem e coloque em uma assadeira.', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
                {
                    children: [
                        { detail: 0, format: 0, mode: 'normal', style: '', text: '3. Asse por aproximadamente 10 a 15 minutos ou até dourar.', type: 'text', version: 1 },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        }
    },
    technicalInfo: [
        { title: 'Peso Unitário', description: '300g' },
        { title: 'Embalagem', description: 'Pacote plástico' },
        { title: 'Validade (Congelado)', description: '90 dias' },
        { title: 'Validade (Refrigerado)', description: '5 dias' },
    ],
    portionSize: '50g (1 unidade)',
    nutritionalTable: [
        { nutrient: 'Valor Energético', quantity: '135 kcal = 567 kJ', vd: '7%' },
        { nutrient: 'Carboidratos', quantity: '18g', vd: '6%' },
        { nutrient: 'Proteínas', quantity: '3,5g', vd: '5%' },
        { nutrient: 'Gorduras Totais', quantity: '5,5g', vd: '10%' },
        { nutrient: 'Gorduras Saturadas', quantity: '2,0g', vd: '9%' },
        { nutrient: 'Gorduras Trans', quantity: '0g', vd: '**' },
        { nutrient: 'Fibra Alimentar', quantity: '1,0g', vd: '4%' },
        { nutrient: 'Sódio', quantity: '320mg', vd: '13%' },
    ]
}

const seed = async () => {
    const payload = await getPayload({ config })

    console.log('--- Seeding Started ---')

    // 1. Create Admin User
    const existingUser = (await payload.find({ collection: 'users', limit: 1 })).docs[0]
    if (!existingUser) {
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@viapane.com.br',
                password: 'admin',
                // confirmPassword removed
            }
        })
        console.log('Created admin user: admin@viapane.com.br / admin')
    } else {
        console.log('Admin user already exists.')
    }

    // 2. Prepare Placeholder Media
    let imageId: number | undefined = undefined
    const existingMedia = (await payload.find({
        collection: 'media',
        limit: 1,
    })).docs[0]

    if (existingMedia) {
        imageId = existingMedia.id
        console.log('Found existing media ID:', imageId)
    } else {
        console.log('Creating placeholder image...')
        const fs = await import('fs')
        // Use absolute path
        const imagePath = '/Users/gtotoli/Documents/Via Pane/Site/Via Pane/via-pane-next/public/assets/8fae9eb821852d8958d220712c1560ebecb6c6fe.png'

        if (fs.existsSync(imagePath)) {
            try {
                const newMedia = await payload.create({
                    collection: 'media',
                    data: { alt: 'Placeholder Image' },
                    file: {
                        path: imagePath,
                        name: 'placeholder.png',
                        mimetype: 'image/png',
                        size: fs.statSync(imagePath).size,
                    } as any
                })
                imageId = newMedia.id
                console.log('Created placeholder media:', imageId)
            } catch (err) {
                console.error('Failed to create media, skipping image:', err)
                // Proceed without image
            }
        } else {
            console.warn('WARNING: Placeholder image not found at', imagePath)
            console.log('Current working directory:', process.cwd());
        }
    }

    // 3. Seed Home Banner
    console.log('Seeding Home Banner...')
    await payload.updateGlobal({
        slug: 'home',
        data: {
            heroBanner: [{
                ...homeData.heroBanner[0] as any,
                ...(imageId ? { image: imageId } : {})
            }]
        }
    })
    console.log('Home Banner seeded.')

    // 4. Seed Categories and Products
    console.log('Seeding Categories and Products...')
    for (const group of productsData) {
        console.log(`Creating category: ${group.category}`)

        // Check/Create Category
        let categoryDoc = (await payload.find({
            collection: 'product-categories',
            where: { name: { equals: group.category } },
        })).docs[0]

        if (!categoryDoc) {
            categoryDoc = await payload.create({
                collection: 'product-categories',
                data: { name: group.category },
            })
        }

        for (const prod of group.products) {
            // Check Product
            const existingProduct = (await payload.find({
                collection: 'products',
                where: { slug: { equals: prod.slug } },
            })).docs[0]

            const productData = {
                name: prod.name,
                slug: prod.slug,
                category: categoryDoc.id,
                mainImage: imageId,
                image: imageId,
                ...(prod.slug === 'pao-alho' ? paoAlhoDetails : {})
            }

            if (existingProduct) {
                console.log(`  Updating product: ${prod.name}`)
                await payload.update({
                    collection: 'products',
                    id: existingProduct.id,
                    data: productData
                })
            } else {
                console.log(`  Creating product: ${prod.name}`)
                await payload.create({
                    collection: 'products',
                    data: productData
                })
            }
        }
    }

    // 5. Seed Blog Posts
    console.log('Seeding Blog Posts...')
    // First check/create blog categories
    const uniqueCategories = Array.from(new Set(blogPostsData.map(post => post.category)))
    const blogCategoryMap = new Map()

    for (const catName of uniqueCategories) {
        let catDoc = (await payload.find({
            collection: 'blog-categories',
            where: { name: { equals: catName } }
        })).docs[0]

        if (!catDoc) {
            catDoc = await payload.create({
                collection: 'blog-categories',
                data: { name: catName }
            })
        }
        blogCategoryMap.set(catName, catDoc.id)
    }

    // Create Posts
    for (const post of blogPostsData) {
        const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        const existingPost = (await payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
        })).docs[0]

        // Handle Image Upload from URL
        let postImageId = imageId;
        if (post.imageUrl) {
            try {
                console.log(`Downloading image for post: ${post.title}`)
                const response = await fetch(post.imageUrl);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const tempFilePath = `/tmp/${slug}-${Date.now()}.jpg`;
                    const fs = await import('fs');
                    fs.writeFileSync(tempFilePath, buffer);

                    const newMedia = await payload.create({
                        collection: 'media',
                        data: { alt: post.title },
                        file: {
                            path: tempFilePath,
                            name: `${slug}.jpg`,
                            mimetype: 'image/jpeg',
                            size: buffer.length,
                        } as any
                    });
                    postImageId = newMedia.id;
                    fs.unlinkSync(tempFilePath); // Clean up
                    console.log(`Created custom media for post: ${postImageId}`);
                } else {
                    console.error(`Failed to download image: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
                console.error(`Failed to download/create media for post ${post.title}:`, err);
            }
        }

        const safePostData = {
            title: post.title,
            slug: slug,
            publishedDate: post.date,
            author: existingUser ? existingUser.id : 'admin',
            category: blogCategoryMap.get(post.category),
            image: postImageId, // Using 'image' as per Schema
            externalImageUrl: post.imageUrl,
            content: {
                root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    direction: 'ltr',
                    children: [
                        {
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            direction: 'ltr',
                            children: [
                                {
                                    mode: 'normal',
                                    text: post.excerpt || post.content.replace(/<[^>]*>?/gm, ''), // Strip HTML for now or use excerpt
                                    type: 'text',
                                    style: '',
                                    detail: 0,
                                    format: 0,
                                    version: 1,
                                }
                            ]
                        }
                    ]
                }
            } as any,
            excerpt: post.excerpt,
            readTime: post.readTime
        }

        if (existingPost) {
            console.log(`  Updating post: ${post.title}`)
            await payload.update({
                collection: 'posts',
                id: existingPost.id,
                data: safePostData
            })
        } else {
            console.log(`  Creating post: ${post.title}`)
            await payload.create({
                collection: 'posts',
                data: safePostData
            })
        }
    }

    console.log('--- Seed Completed Successfully ---')
    process.exit(0)
}

seed()

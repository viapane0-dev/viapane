import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'

// Helper to create Lexical RichText structure
function createLexicalParagraphs(paragraphs: string[]) {
    const children = paragraphs.map(text => ({
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

const BLOG_CONTENTS = {
    'Marketing para Padarias': [
        'O marketing digital transformou a maneira como as padarias se conectam com seus clientes. Não basta mais apenas abrir as portas e esperar pelo cheiro do pão fresco atrair a vizinhança. É preciso marcar presença onde o seu público está: nas redes sociais e na internet.',
        'Invista em fotos de alta qualidade dos seus produtos. O "food porn" é uma tendência real e poderosa. Um croissant bem folhado ou um pão de fermentação natural com aquela crosta rústica merecem ser exibidos no Instagram com uma boa iluminação.',
        'Além disso, conte a história por trás das suas receitas. Seus clientes valorizam saber que você usa farinha importada ou que seu levain tem 10 anos de idade. Essa narrativa cria valor e diferencia sua padaria da concorrência.'
    ],
    'Sustentabilidade na Panificação': [
        'A sustentabilidade deixou de ser um diferencial para se tornar uma exigência do consumidor moderno. Na panificação, isso vai desde a escolha dos ingredientes até o descarte das embalagens.',
        'Comece priorizando fornecedores locais. Isso reduz a pegada de carbono do transporte e fortalece a economia da sua região. O uso de farinhas orgânicas também é um grande passo para quem busca um posicionamento mais ecológico.',
        'Outro ponto crucial é o desperdício zero. Sobras de pães podem virar torradas, farinha de rosca ou pudins. Nada deve ir para o lixo. Seus clientes vão admirar e apoiar essas iniciativas.'
    ],
    'Qualidade dos Ingredientes': [
        'O segredo de um produto excepcional começa muito antes do forno. A escolha dos ingredientes é o alicerce de qualquer receita de sucesso na panificação e confeitaria.',
        'Manteiga de verdade versus margarina: a diferença no sabor e na textura é gritante. Farinhas com o teor de proteína correto para cada tipo de pão garantem a estrutura e a mastigabilidade ideais.',
        'Não economize na base. Um chocolate de qualidade superior ou uma fava de baunilha natural elevam o nível do seu produto final, permitindo que você cobre um valor justo por uma experiência gastronômica diferenciada.'
    ],
    'Inovação em Receitas': [
        'O mercado de panificação é tradicional, mas a inovação é o que mantém o interesse do cliente aceso. Criar produtos diferenciados não significa abandonar os clássicos, mas sim reinventá-los.',
        'Que tal uma baguete com azeitonas e ervas de provença? Ou um brioche com gotas de chocolate belga e laranja? Pequenas variações de sabor podem criar novos best-sellers na sua vitrine.',
        'Fique atento às tendências globais, como a panificação sem glúten ou vegana, e veja como adaptá-las para o seu público sem perder a essência artesanal da sua produção.'
    ],
    'Gestão de Padaria': [
        'Gerir uma padaria vai muito além de saber fazer pão. É preciso ter controle rigoroso sobre o fluxo de caixa, estoque e gestão de pessoas.',
        'A ficha técnica é sua melhor amiga. Saber exatamente quanto custa cada grama de farinha e cada minuto de forno é essencial para precificar corretamente e garantir a lucratividade.',
        'Treine sua equipe constantemente. Um atendimento caloroso e conhecedor dos produtos faz toda a diferença na fidelização do cliente. Sua equipe de vendas deve saber explicar a diferença entre um pão italiano e uma ciabatta.'
    ],
    'Confeitaria de Alto Padrão': [
        'A confeitaria fina exige precisão, técnica e estética. Cada doce é uma pequena obra de arte que deve encantar primeiro os olhos e depois o paladar.',
        'Domine as bases: massas, cremes e merengues. A partir daí, a criatividade é o limite. O acabamento deve ser impecável. Use frutas frescas, flores comestíveis e decorações em chocolate para dar o toque final de sofisticação.',
        'Lembre-se que na alta confeitaria, o equilíbrio de sabores é fundamental. O doce não deve ser enjoativo, mas sim uma explosão de texturas e nuances no paladar.'
    ],
    'Pré-misturas Premium': [
        'O mito de que pré-mistura é sinônimo de baixa qualidade ficou no passado. As pré-misturas premium oferecem padronização e praticidade sem abrir mão do sabor artesanal.',
        'Elas são aliadas poderosas para manter a consistência da produção em grande escala ou quando se tem uma equipe em treinamento. O segredo está em escolher marcas que prezam por ingredientes nobres em sua composição.',
        'Você pode personalizar as pré-misturas adicionando seu toque especial, como sementes, frutas secas ou um tempo de fermentação diferenciado, garantindo um produto final exclusivo.'
    ],
    'Fermentação Natural': [
        'O pão de fermentação natural (levain) conquistou o paladar dos brasileiros. Paciência é o ingrediente principal desse processo milenar.',
        'Alimente seu levain com regularidade e observe como ele reage à temperatura e umidade do seu ambiente. Cada fermento é único e imprime uma identidade singular ao pão.',
        'Os benefícios para a saúde, como a digestibilidade facilitada e o baixo índice glicêmico, são ótimos argumentos de venda para educar seu cliente sobre por que esse pão custa mais e vale cada centavo.'
    ],
    'Tendências 2026': [
        'O futuro da panificação aponta para a saudabilidade e a transparência. O consumidor quer saber o que está comendo (clean label) e busca produtos funcionais.',
        'Pães ricos em fibras, proteicos ou com grãos ancestrais estarão em alta. A experiência na loja física também ganha força: o cliente quer ver o pão sendo feito, sentir o cheiro e ter um momento de pausa agradável.',
        'A tecnologia também entra como aliada, desde fornos inteligentes até sistemas de delivery integrados. Quem unir tradição e conveniência sairá na frente em 2026.'
    ]
}

async function enrichBlogPosts() {
    const payload = await getPayload({ config: configPromise })

    console.log('--- Enriching Blog Posts ---')

    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
    })

    console.log(`Found ${posts.totalDocs} posts.`)

    for (const post of posts.docs) {
        let contentParams = null

        // Match post title keywords to content
        const title = post.title.toLowerCase()

        if (title.includes('marketing')) contentParams = BLOG_CONTENTS['Marketing para Padarias']
        else if (title.includes('sustentabilidade')) contentParams = BLOG_CONTENTS['Sustentabilidade na Panificação']
        else if (title.includes('qualidade')) contentParams = BLOG_CONTENTS['Qualidade dos Ingredientes']
        else if (title.includes('segredos') || title.includes('confeitaria')) contentParams = BLOG_CONTENTS['Confeitaria de Alto Padrão']
        else if (title.includes('inovação')) contentParams = BLOG_CONTENTS['Inovação em Receitas']
        else if (title.includes('gestão') || title.includes('otimizar')) contentParams = BLOG_CONTENTS['Gestão de Padaria']
        else if (title.includes('pré-mistura')) contentParams = BLOG_CONTENTS['Pré-misturas Premium']
        else if (title.includes('fermentação')) contentParams = BLOG_CONTENTS['Fermentação Natural']
        else if (title.includes('2026') || title.includes('tendências')) contentParams = BLOG_CONTENTS['Tendências 2026']

        if (contentParams) {
            console.log(`Updating content for: "${post.title}"`)

            await payload.update({
                collection: 'posts',
                id: post.id,
                data: {
                    content: createLexicalParagraphs(contentParams)
                }
            })
        } else {
            console.log(`No matching content found for: "${post.title}"`)
        }
    }

    console.log('--- Enrichment Complete ---')
    process.exit(0)
}

enrichBlogPosts()

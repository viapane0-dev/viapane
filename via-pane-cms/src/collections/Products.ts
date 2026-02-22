import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        singular: 'Produto',
        plural: 'Produtos',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        useAsTitle: 'name',
        group: 'Product Management',
        defaultColumns: ['name', 'category', 'updatedAt'],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Dados Básicos',
                    fields: [
                        {
                            name: 'name',
                            label: 'Nome',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'slug',
                            label: 'Slug (URL)',
                            type: 'text',
                            admin: {
                                position: 'sidebar',
                            },
                            hooks: {
                                beforeValidate: [
                                    ({ value, data }) => {
                                        if (!value && data?.name) {
                                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                                        }
                                        return value
                                    },
                                ],
                            },
                        },
                        {
                            name: 'category',
                            label: 'Categoria',
                            type: 'relationship',
                            relationTo: 'product-categories',
                            required: true,
                        },
                        {
                            name: 'mainImage',
                            label: 'Imagem Principal',
                            type: 'upload',
                            relationTo: 'media',
                            required: false,
                        },
                        {
                            name: 'description',
                            label: 'Descrição Curta',
                            type: 'textarea',
                        },
                    ],
                },
                {
                    label: 'Detalhes e Info Técnica',
                    fields: [
                        {
                            name: 'characteristics',
                            label: 'Vantagens (Características)',
                            type: 'richText',
                        },
                        {
                            name: 'technicalInfo',
                            label: 'Tabela Técnica',
                            type: 'array',
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Título',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    label: 'Descrição',
                                    type: 'text', // Keeping text for simple values, user can ask for RT if needed specifically here.
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Preparo e Ingredientes',
                    fields: [
                        {
                            name: 'ingredients',
                            label: 'Ingredientes',
                            type: 'richText',
                        },
                        {
                            name: 'preparationMode',
                            label: 'Modo de Preparo',
                            type: 'richText',
                        },
                    ],
                },
                {
                    label: 'Tabela Nutricional',
                    fields: [
                        {
                            name: 'portionSize',
                            label: 'Tamanho da Porção (ex: 50g)',
                            type: 'text',
                        },
                        {
                            name: 'nutritionalTable',
                            label: 'Itens da Tabela',
                            type: 'array',
                            fields: [
                                {
                                    name: 'nutrient',
                                    label: 'Informação Nutricional',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'quantity',
                                    label: 'Quantidade por porção',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'vd',
                                    label: '%VD',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

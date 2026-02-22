import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
    slug: 'product-categories',
    labels: {
        singular: 'Categoria de Produto',
        plural: 'Categorias de Produtos',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'name',
        group: 'Product Management',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'product-categories',
            hasMany: false,
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}

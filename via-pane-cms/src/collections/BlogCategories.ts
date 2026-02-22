import type { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
    slug: 'blog-categories',
    labels: {
        singular: 'Categoria do Blog',
        plural: 'Categorias do Blog',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'name',
        group: 'Content',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
    ],
}

import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
    slug: 'home',
    label: 'Página Inicial',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'heroBanner',
            type: 'array',
            minRows: 1,
            fields: [
                {
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'Dynamic', value: 'dynamic' },
                        { label: 'Static', value: 'static' },
                    ],
                    defaultValue: 'dynamic',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'dynamic',
                    },
                },
                {
                    name: 'subtitle',
                    type: 'textarea',
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'dynamic',
                    },
                },
                {
                    name: 'buttonText',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'dynamic',
                    },
                },
                {
                    name: 'buttonUrl',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'dynamic',
                    },
                },
                {
                    name: 'image', // Background for dynamic, main for static
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                },
            ],
        },
        {
            name: 'featuredProducts',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            maxRows: 6,
        },
    ],
}

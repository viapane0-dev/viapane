import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    labels: {
        singular: 'Postagem',
        plural: 'Postagens',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        group: 'Content',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'blog-categories',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'readingTime',
            type: 'text',
        },
        {
            name: 'externalImageUrl',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

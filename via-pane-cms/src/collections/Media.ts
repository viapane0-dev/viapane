import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: 'Mídia',
        plural: 'Mídias',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    upload: {
        staticDir: 'media',
        adminThumbnail: 'thumbnail',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}

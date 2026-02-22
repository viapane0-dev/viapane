import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'

async function verifyAndFix() {
    const payload = await getPayload({ config: configPromise });

    const categoryId = 12; // Confeitaria Seca
    const altText = 'Confeitaria Seca - User Provided Image';

    console.log(`Looking for media with alt: "${altText}"...`);

    // Find the media we uploaded
    const mediaQuery = await payload.find({
        collection: 'media',
        where: {
            alt: { equals: altText }
        },
        sort: '-createdAt',
        limit: 1
    });

    if (mediaQuery.totalDocs === 0) {
        console.error('CRITICAL: User image media NOT found!');
        process.exit(1);
    }

    const media = mediaQuery.docs[0];
    console.log(`Found Media ID: ${media.id}`);

    // Check Category
    console.log(`Checking Category ${categoryId}...`);
    const category = await payload.findByID({
        collection: 'product-categories',
        id: categoryId,
    });

    console.log(`Current Category Media:`, category.media);

    if (category.media !== media.id) {
        console.log(`Updating Category ${categoryId} to use Media ${media.id}...`);
        await payload.update({
            collection: 'product-categories',
            id: categoryId,
            data: {
                media: media.id
            }
        });
        console.log('Update Complete.');
    } else {
        console.log('Category is already up to date.');
    }

    process.exit(0);
}

verifyAndFix();

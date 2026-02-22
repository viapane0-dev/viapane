import 'dotenv/config'
import configPromise from '../payload.config'
import { getPayload } from 'payload'

async function run() {
    const payload = await getPayload({ config: configPromise });

    const productId = 134;
    const mediaId = 68;

    console.log(`Attempting to update Product ${productId} with mainImage ${mediaId}...`);

    try {
        const result = await payload.update({
            collection: 'products',
            id: productId,
            data: {
                mainImage: mediaId
            }
        });

        console.log('Update Result mainImage:', result.mainImage);
    } catch (e) {
        console.error('Update Failed:', e);
    }
    process.exit(0);
}

run();

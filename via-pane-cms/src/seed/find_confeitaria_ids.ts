import { getPayload } from 'payload'
import configPromise from '../payload.config'
import 'dotenv/config'

async function findIds() {
    const payload = await getPayload({ config: configPromise });

    console.log('Finding Category: Confeitaria Seca...');
    const categories = await payload.find({
        collection: 'product-categories',
        where: { name: { equals: 'Confeitaria Seca' } }
    });

    if (categories.totalDocs > 0) {
        console.log(`FOUND CATEGORY: ID=${categories.docs[0].id}, Name=${categories.docs[0].name}`);
    } else {
        console.error('CATEGORY NOT FOUND');
    }

    console.log('Finding Product: Biscoito de Nata...');
    const products = await payload.find({
        collection: 'products',
        where: { name: { like: 'Biscoito de Nata' } }
    });

    if (products.totalDocs > 0) {
        const product = products.docs[0];
        console.log(`FOUND PRODUCT: ID=${product.id}, Name=${product.name}`);
        console.log('Main Image:', product.mainImage);
    } else {
        console.error('PRODUCT NOT FOUND');
    }

    process.exit(0);
}

findIds();

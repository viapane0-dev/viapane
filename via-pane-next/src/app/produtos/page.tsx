import { Suspense } from 'react';
import { ProductsPage, ProductLine } from '@/components/ProductsPage';
import { getPayloadCollection, getImageUrl } from '@/lib/api';

export default async function Page() {
    // Fetch data from CMS
    const productsRes = await getPayloadCollection('products', { limit: 1000 });
    const categoriesRes = await getPayloadCollection('product-categories', { limit: 100 });

    // Helper to map CMS category to frontend category type
    // This assumes specific slugs or logic. For now, we default to 'panificacao' if unknown.
    // Ideally, the CMS category should have a 'type' field that matches these.
    const mapCategoryType = (cat: any): 'panificacao' | 'confeitaria' | 'ingredientes' => {
        const lowerName = (cat.name || '').toLowerCase();
        if (lowerName.includes('confeitaria') || lowerName.includes('bolo')) return 'confeitaria';
        if (lowerName.includes('ingrediente') || lowerName.includes('aditivo')) return 'ingredientes';
        return 'panificacao';
    };

    // Transform Payload data to ProductLine structure
    // We group products by their "Category" (which acts as a Line here)
    // In the frontend static data, "ProductLine" seems to correspond to "Category" in CMS terms (e.g. "Pães Macios")
    // And "Category" in frontend corresponds to a Group of categories (Panificação/Confeitaria).

    const linesMap = new Map<string, ProductLine>();

    // Initialize lines from CMS categories
    if (categoriesRes.docs) {
        categoriesRes.docs.forEach((cat: any) => {
            // Include all categories (even roots) if they have products
            // The cmsLines filter later will remove empty ones
            linesMap.set(cat.id, {
                id: cat.id,
                name: cat.name,
                category: mapCategoryType(cat),
                products: []
            });
        });
    }

    // Distribute products into lines
    if (productsRes.docs) {
        productsRes.docs.forEach((prod: any) => {
            // Product can belong to a category (Line)
            const catId = typeof prod.category === 'object' ? prod.category?.id : prod.category;

            if (catId && linesMap.has(catId)) {
                linesMap.get(catId)!.products.push({
                    id: prod.slug || prod.id,
                    name: prod.name,
                    image: getImageUrl(prod.mainImage)
                });
            }
        });
    }

    const cmsLines = Array.from(linesMap.values()).filter(l => l.products.length > 0);

    // If CMS has data, use it. Otherwise use static fallback inside component by passing undefined.
    // But here we pass the prop if we found lines.
    const initialProductLines = cmsLines.length > 0 ? cmsLines : undefined;

    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-['Open_Sans'] text-gray-600">Carregando produtos...</div>}>
            <ProductsPage initialProductLines={initialProductLines} />
        </Suspense>
    );
}

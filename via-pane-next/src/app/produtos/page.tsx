import { Suspense } from 'react';
import { ProductsPage, ProductLine } from '@/components/ProductsPage';
import { getPayloadCollection, getImageUrl } from '@/lib/api';

export default async function Page() {
    // Fetch data from CMS
    const productsRes = await getPayloadCollection('products', { limit: 1000 });
    // Fetch categories with depth=2 so parent relationships are fully populated
    const categoriesRes = await getPayloadCollection('product-categories', { limit: 100, depth: 2 });

    // Build a map of root category IDs to frontend category types
    // Root categories have parent: null (e.g. Panificação, Confeitaria, Ingredientes)
    const rootCategoryTypeMap = new Map<number | string, 'panificacao' | 'confeitaria' | 'ingredientes'>();

    if (categoriesRes.docs) {
        categoriesRes.docs.forEach((cat: any) => {
            if (!cat.parent) {
                // This is a root category — map its ID based on its name
                const lowerName = (cat.name || '').toLowerCase();
                if (lowerName.includes('confeitaria')) {
                    rootCategoryTypeMap.set(cat.id, 'confeitaria');
                } else if (lowerName.includes('ingrediente') || lowerName.includes('insumos')) {
                    rootCategoryTypeMap.set(cat.id, 'ingredientes');
                } else {
                    rootCategoryTypeMap.set(cat.id, 'panificacao');
                }
            }
        });
    }

    // Resolve the frontend category type for any category by walking up to its root parent
    const getCategoryType = (cat: any): 'panificacao' | 'confeitaria' | 'ingredientes' => {
        // If this IS a root category
        if (!cat.parent) {
            return rootCategoryTypeMap.get(cat.id) || 'panificacao';
        }
        // If parent is populated as an object, use its ID
        const parentId = typeof cat.parent === 'object' ? cat.parent?.id : cat.parent;
        return rootCategoryTypeMap.get(parentId) || 'panificacao';
    };

    // Transform Payload data to ProductLine structure
    // Subcategories (those with a parent) become "lines" on the products page.
    // Root categories are only used for grouping — they are not displayed as lines themselves.

    const linesMap = new Map<string, ProductLine>();

    // Initialize lines from CMS categories (only subcategories that have a parent)
    if (categoriesRes.docs) {
        categoriesRes.docs.forEach((cat: any) => {
            if (!cat.parent) return; // Skip root categories — they are group headers, not product lines
            linesMap.set(cat.id, {
                id: cat.id,
                name: cat.name,
                category: getCategoryType(cat),
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

    // Define category display order: panificação first, then confeitaria, then ingredientes
    const categoryOrder: Record<string, number> = {
        panificacao: 0,
        confeitaria: 1,
        ingredientes: 2,
    };

    const cmsLines = Array.from(linesMap.values())
        .filter(l => l.products.length > 0)
        .sort((a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99));

    // If CMS has data, use it. Otherwise use static fallback inside component by passing undefined.
    // But here we pass the prop if we found lines.
    const initialProductLines = cmsLines.length > 0 ? cmsLines : undefined;

    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent flex items-center justify-center font-['Open_Sans'] text-gray-600">Carregando produtos...</div>}>
            <ProductsPage initialProductLines={initialProductLines} />
        </Suspense>
    );
}

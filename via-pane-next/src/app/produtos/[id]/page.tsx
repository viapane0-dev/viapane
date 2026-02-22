import { ProductDetailPage, ProductDetailData } from '@/components/ProductDetailPage';
import { getPayloadCollection, serializeLexical, getImageUrl } from '@/lib/api';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    // Fetch product by slug (id param here is treated as slug or id)
    // We try to find where slug equals id.
    const productsRes = await getPayloadCollection('products', {
        where: {
            slug: {
                equals: id
            }
        },
        limit: 1
    });

    const product = productsRes.docs && productsRes.docs.length > 0 ? productsRes.docs[0] : null;

    let productData: ProductDetailData | undefined = undefined;

    if (product) {
        // Map CMS data to ProductDetailData interface
        productData = {
            name: product.name,
            description: product.description,
            categoryName: product.category?.name,
            image: getImageUrl(product.mainImage),
            advantages: serializeLexical(product.characteristics),
            ingredients: serializeLexical(product.ingredients).join(' '),
            preparation: serializeLexical(product.preparationMode),
            technicalInfo: product.technicalInfo?.map((item: any) => ({
                label: item.title,
                value: item.description
            })),
            nutritionalInfo: product.nutritionalTable?.map((item: any) => ({
                label: item.nutrient,
                value: item.quantity,
                percentage: item.vd
            }))
        };
    }

    return <ProductDetailPage product={productData} />;
}

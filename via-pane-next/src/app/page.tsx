import { HeroSection } from "@/components/HeroSection";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { ProductCategoriesSection, ProductCategory } from "@/components/ProductCategoriesSection";
import { PodcastSection } from "@/components/PodcastSection";
import { BlogSection, BlogCardProps } from "@/components/BlogSection";
import { OfficesSection } from "@/components/OfficesSection";
import { getPayloadGlobal, getPayloadCollection, getImageUrl } from "@/lib/api";

export default async function Home() {
  const homeData = await getPayloadGlobal('home');
  const heroData = homeData?.heroBanner?.[0]; // Assuming array structure from CMS

  // Process hero data if available
  const heroProps: any = {};
  if (heroData) {
    if (heroData.type === 'dynamic') {
      heroProps.title = heroData.title;
      heroProps.subtitle = heroData.subtitle;
      heroProps.buttonText = heroData.buttonText;
      heroProps.buttonUrl = heroData.buttonUrl;
    }
    const heroImage = getImageUrl(heroData.image);
    if (heroImage) {
      heroProps.backgroundImage = heroImage;
    }
  }

  // Fetch Blog Posts
  const postsRes = await getPayloadCollection('posts', {
    limit: 3,
    sort: '-publishedDate',
    depth: 1
  });

  const posts: BlogCardProps[] = (postsRes.docs || []).map((post: any) => {
    const imageUrl = getImageUrl(post.image) || post.externalImageUrl || '/assets/blog-placeholder.jpg';
    const authorName = typeof post.author === 'object' ? (post.author?.name || post.author?.email) : 'Via Pane';
    const categoryName = typeof post.category === 'object' ? post.category?.name : 'Geral';

    return {
      image: imageUrl,
      category: categoryName,
      title: post.title,
      author: authorName,
      date: new Date(post.publishedDate || post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      slug: post.slug
    };
  });

  // Fetch Product Categories with depth=1 to get parent info
  const categoriesRes = await getPayloadCollection('product-categories', { limit: 100, depth: 1 });

  // Build root category type map and define display order
  const rootCategoryTypeMap = new Map<number | string, string>();
  const categoryOrder: Record<string, number> = {
    panificacao: 0,
    confeitaria: 1,
    ingredientes: 2,
  };

  (categoriesRes.docs || []).forEach((cat: any) => {
    if (!cat.parent) {
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

  // Filter out parent/root categories — keep only subcategories
  const subCategories = (categoriesRes.docs || []).filter((cat: any) => !!cat.parent);

  // Sort subcategories by their parent's category order
  subCategories.sort((a: any, b: any) => {
    const parentIdA = typeof a.parent === 'object' ? a.parent?.id : a.parent;
    const parentIdB = typeof b.parent === 'object' ? b.parent?.id : b.parent;
    const orderA = categoryOrder[rootCategoryTypeMap.get(parentIdA) || 'panificacao'] ?? 99;
    const orderB = categoryOrder[rootCategoryTypeMap.get(parentIdB) || 'panificacao'] ?? 99;
    return orderA - orderB;
  });

  // Fetch images for each subcategory
  const categories: ProductCategory[] = await Promise.all(subCategories.map(async (cat: any) => {
    // Try to find a product image
    const products = await getPayloadCollection('products', {
      where: { category: { equals: cat.id } },
      limit: 1,
      depth: 1
    });

    let image = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'; // Default fallback

    if (cat.media) {
      image = getImageUrl(cat.media) || image;
    } else if (products.docs.length > 0 && products.docs[0].mainImage) {
      image = getImageUrl(products.docs[0].mainImage) || image;
    }

    return {
      id: cat.id,
      title: cat.name,
      image,
      link: '/produtos'
    };
  }));


  return (
    <main className="min-h-screen bg-transparent">
      <HeroSection {...heroProps} />
      <CategoriesGrid />
      <ProductCategoriesSection categories={categories.length > 0 ? categories : undefined} />
      <PodcastSection />
      <BlogSection posts={posts.length > 0 ? posts : undefined} />
      <OfficesSection />
    </main>
  );
}

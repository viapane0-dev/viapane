
import BlogPage, { BlogPost } from '@/components/BlogPage';
import { getPayloadCollection, getImageUrl } from '@/lib/api';

export default async function Page() {
    // 1. Fetch Posts from CMS
    // We fetch depth 1 to get category and image details
    const postsRes = await getPayloadCollection('posts', { limit: 100, depth: 1 });

    // 2. Fetch Categories if dynamic needed, or derive them
    const categoriesRes = await getPayloadCollection('blog-categories', { limit: 100 });
    const cmsCategories = categoriesRes.docs?.map((c: any) => c.name) || [];

    // 3. Map Data to Frontend Interface
    const initialPosts: BlogPost[] = (postsRes.docs || []).map((post: any) => {
        // Author might be 'admin' string or User object depending on how we seeded/schema
        // Schema is 'author'
        // If it's a relationship and populated, post.author might be object.
        // For simplicity, we handle both.
        const authorName = typeof post.author === 'string' ? post.author : (post.author?.name || post.author?.email || 'Via Pane');

        // Category is relationship
        const categoryName = typeof post.category === 'object' ? post.category?.name : 'Geral';

        // Image
        const imageUrl = getImageUrl(post.image) || post.externalImageUrl || getImageUrl(post.mainImage) || '/assets/blog-placeholder.jpg';

        return {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt || '',
            author: authorName,
            date: new Date(post.publishedDate || post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
            readTime: post.readingTime || post.readTime || '5 min', // Check schema field name
            category: categoryName,
            image: imageUrl,
            slug: post.slug
        };
    });

    return <BlogPage initialPosts={initialPosts} initialCategories={cmsCategories} />;
}

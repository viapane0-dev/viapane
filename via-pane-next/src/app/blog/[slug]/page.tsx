import { getPayloadCollection, serializeLexical } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Clock, Tag } from 'lucide-react';
import { RichTextRenderer } from '@/components/RichTextRenderer';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const postsRes = await getPayloadCollection('posts', {
        where: {
            slug: {
                equals: slug
            }
        },
        limit: 1,
        depth: 2 // Fetch depth 2 to get author and category details populated
    });

    const post = postsRes.docs && postsRes.docs.length > 0 ? postsRes.docs[0] : null;

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
                <div className="text-center">
                    <p className="font-['Open_Sans'] text-xl mb-4">Artigo não encontrado.</p>
                    <Link href="/blog" className="text-[#e1ab42] hover:underline font-semibold">
                        Voltar para o Blog
                    </Link>
                </div>
            </div>
        );
    }

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Helper to extract image URL
    const imageUrl = post.image?.url || post.externalImageUrl || post.mainImage?.url || '/assets/blog-placeholder.jpg';

    // Helper to extract author name
    const authorName = typeof post.author === 'object' ? (post.author.name || post.author.email) : 'Via Pane';

    // Helper to extract category name
    const categoryName = typeof post.category === 'object' ? post.category.name : 'Geral';

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            {/* Navigation Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 text-[#001A33] hover:text-[#e1ab42] transition-colors font-['Open_Sans'] text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o Blog
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-block bg-[#e1ab42] text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
                        {categoryName}
                    </div>
                    <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#001A33] leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 font-['Open_Sans'] text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#e1ab42]" />
                            <span>{authorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#e1ab42]" />
                            <span>{formatDate(post.publishedDate || post.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#e1ab42]" />
                            <span>{post.readTime || '5 min'}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none font-['Open_Sans'] text-gray-700
                    prose-headings:font-['Playfair_Display'] prose-headings:text-[#001A33]
                    prose-a:text-[#e1ab42] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl">

                    {/* Render content based on structure */}
                    <RichTextRenderer content={post.content} />
                </div>
            </article>

            {/* Newsletter / CTA */}
        </div>
    );
}

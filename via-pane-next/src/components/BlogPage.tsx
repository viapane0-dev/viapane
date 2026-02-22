"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, Clock } from 'lucide-react';

export interface BlogPost {
    id: number | string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    slug: string;
}

const categories = ["Todos", "Tendências", "Técnicas", "Produtos", "Confeitaria", "Negócios", "Receitas", "Qualidade", "Sustentabilidade", "Marketing"];

interface BlogPageProps {
    initialPosts?: BlogPost[];
    initialCategories?: string[];
}

export default function BlogPage({ initialPosts = [], initialCategories }: BlogPageProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    // Use passed categories or fallback
    const filterCategories = initialCategories && initialCategories.length > 0 ? ["Todos", ...initialCategories] : categories;

    // Filter posts based on search and category
    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            {/* Hero Section */}
            <section className="bg-[#001A33] text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6 text-center">
                        Blog Via Pane
                    </h1>
                    <p className="font-['Open_Sans'] text-xl text-center text-gray-300 max-w-3xl mx-auto mb-10">
                        Conteúdos exclusivos sobre panificação, confeitaria e gestão de negócios
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar artigos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-6 pr-14 py-4 rounded-lg border-2 border-[#D4AF37] bg-white text-[#001A33] font-['Open_Sans'] text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            />
                            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#D4AF37] hover:bg-[#c29d2f] text-white p-2 rounded-lg transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-['Open_Sans'] font-medium text-sm transition-all ${selectedCategory === category
                                    ? 'bg-[#D4AF37] text-white'
                                    : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="font-['Open_Sans'] text-xl text-gray-600">
                                Nenhum artigo encontrado com os filtros selecionados.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                                    <article
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
                                    >
                                        {/* Post Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-['Open_Sans'] font-semibold">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="p-6">
                                            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#001A33] mb-3 group-hover:text-[#D4AF37] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="font-['Open_Sans'] text-gray-600 text-sm mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Post Meta */}
                                            <div className="flex items-center justify-between text-xs text-gray-500 font-['Open_Sans'] border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <User size={14} />
                                                        <span>{post.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

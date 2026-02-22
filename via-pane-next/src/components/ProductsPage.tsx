"use client";

import { useState } from 'react';
import Link from 'next/link';



export interface Product {
  id: string;
  name: string;
  image?: string | null;
}

export interface ProductLine {
  id: string;
  name: string;
  category: 'panificacao' | 'confeitaria' | 'ingredientes';
  products: Product[];
}
// ...


const productLines: ProductLine[] = [];

// ... types remain same ...
export interface ProductsPageProps {
  initialProductLines?: ProductLine[];
}

export function ProductsPage({ initialProductLines = productLines }: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'panificacao' | 'confeitaria' | 'ingredientes'>('all');
  const [activeLineId, setActiveLineId] = useState<string | null>(null);

  const linesToUse = initialProductLines || productLines;

  const filteredLines = linesToUse.filter(line => {
    if (activeCategory === 'all') return true;
    return line.category === activeCategory;
  });
  // ...

  const displayedLines = activeLineId
    ? filteredLines.filter(line => line.id === activeLineId)
    : filteredLines;

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Hero Header */}
      <div className="bg-[#001A33] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-4">
            Nossos Produtos
          </h1>
          <p className="font-['Open_Sans'] text-lg text-gray-300 max-w-2xl">
            Descubra nossa linha completa de produtos premium para panificação e confeitaria
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveLineId(null);
              }}
              className={`px-6 py-2 rounded-full font-['Open_Sans'] font-semibold whitespace-nowrap transition-colors ${activeCategory === 'all'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
                }`}
            >
              Todos os produtos
            </button>
            <button
              onClick={() => {
                setActiveCategory('panificacao');
                setActiveLineId(null);
              }}
              className={`px-6 py-2 rounded-full font-['Open_Sans'] font-semibold whitespace-nowrap transition-colors ${activeCategory === 'panificacao'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
                }`}
            >
              Panificação
            </button>
            <button
              onClick={() => {
                setActiveCategory('confeitaria');
                setActiveLineId(null);
              }}
              className={`px-6 py-2 rounded-full font-['Open_Sans'] font-semibold whitespace-nowrap transition-colors ${activeCategory === 'confeitaria'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
                }`}
            >
              Confeitaria
            </button>
            <button
              onClick={() => {
                setActiveCategory('ingredientes');
                setActiveLineId(null);
              }}
              className={`px-6 py-2 rounded-full font-['Open_Sans'] font-semibold whitespace-nowrap transition-colors ${activeCategory === 'ingredientes'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
                }`}
            >
              Ingredientes
            </button>
          </div>
        </div>
      </div>

      {/* Product Lines Filter (if category selected) */}
      {activeCategory !== 'all' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex gap-3 overflow-x-auto">
              <button
                onClick={() => setActiveLineId(null)}
                className={`px-4 py-2 rounded-lg font-['Open_Sans'] text-sm font-medium whitespace-nowrap transition-colors ${activeLineId === null
                  ? 'bg-[#001A33] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Todas as linhas
              </button>
              {filteredLines.map((line) => (
                <button
                  key={line.id}
                  onClick={() => setActiveLineId(line.id)}
                  className={`px-4 py-2 rounded-lg font-['Open_Sans'] text-sm font-medium whitespace-nowrap transition-colors ${activeLineId === line.id
                    ? 'bg-[#001A33] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {line.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {displayedLines.map((line) => (
          <div key={line.id} className="mb-16">
            {/* Line Title */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#001A33] mb-2">
                {line.name}
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37]"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {line.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/produtos/${product.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer block"
                >
                  {/* Product Image */}
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#D4AF37] bg-opacity-10 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-[#D4AF37]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-[#001A33] bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-['Open_Sans'] font-semibold text-[#001A33] text-sm leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    <span className="mt-3 text-xs font-['Open_Sans'] font-semibold text-[#D4AF37] group-hover:text-[#001A33] transition-colors block">
                      Ver detalhes →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      {/* Removed CTA section as requested */}
    </div>
  );
}
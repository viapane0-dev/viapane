"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';



export interface ProductDetailData {
  name: string;
  description?: string;
  categoryName?: string;
  advantages?: string[];
  technicalInfo?: { label: string; value: string }[];
  ingredients?: string;
  preparation?: string[];
  nutritionalInfo?: { label: string; value: string; percentage?: string }[];
  image?: string | null;
}

interface ProductDetailPageProps {
  product?: ProductDetailData;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  // Fallback to "Pão de Alho" if no product is passed (for now, or handle 404)
  // In a real app, we might want to show a Loading state or 404 if product is missing.
  // But for the sake of the migration, if product is missing, we show the hardcoded one?
  // No, better to show what we have. If completely missing, show "Not Found".

  if (!product) {
    // Return hardcoded structure as fallback/demo if nothing passed?
    // Or just return null/404?
    // Let's keep the hardcoded data as a "demo" product if none provided, 
    // but ideally we overwrite it.
    // actually, let's use the valid prop.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado.</p>
        <Link href="/produtos" className="ml-4 text-blue-500">Voltar</Link>
      </div>
    )
  }

  const {
    name,
    description,
    categoryName = 'Pães Macios',
    advantages = [],
    technicalInfo = [],
    ingredients = '',
    preparation = [],
    nutritionalInfo = [],
    image
  } = product;

  // Don't fallback to defaultImage anymore
  const displayImage = image;

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/produtos"
            className="flex items-center gap-2 text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para produtos
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-[#001A33] mb-6">
              {name}
            </h1>

            {/* Category Badge */}
            <div className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-full font-['Open_Sans'] font-semibold text-sm mb-6">
              {categoryName}
            </div>

            {/* Description */}
            {description && (
              <p className="font-['Open_Sans'] text-lg text-gray-700 mb-8 leading-relaxed">
                {description}
              </p>
            )}

            {/* Vantagens */}
            {advantages.length > 0 && (
              <div className="mb-8">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#001A33] mb-4">
                  Vantagens
                </h2>
                <ul className="space-y-2 font-['Open_Sans'] text-gray-700">
                  {advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] mt-1">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Informações Técnicas */}
            {technicalInfo.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-[#001A33] px-6 py-4">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                    Informações Técnicas
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {technicalInfo.map((info, idx) => (
                    <div key={idx} className="grid grid-cols-3 px-6 py-4">
                      <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                        {info.label}
                      </div>
                      <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                        {info.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredientes */}
            {ingredients && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-[#001A33] px-6 py-4">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                    Ingredientes
                  </h2>
                </div>

                <div className="px-6 py-4">
                  <p className="font-['Open_Sans'] text-gray-700 leading-relaxed">
                    {ingredients}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Image */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg aspect-square relative">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-[#D4AF37] bg-opacity-10 flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 font-['Open_Sans'] text-sm">Sem imagem</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modo de Preparo */}
        {preparation.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
            <div className="bg-[#001A33] px-6 py-4">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                Modo de Preparo
              </h2>
            </div>

            <div className="px-6 py-6">
              <ol className="space-y-4 font-['Open_Sans'] text-gray-700 leading-relaxed">
                {preparation.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="font-bold text-[#D4AF37] flex-shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Tabela Nutricional */}
        {nutritionalInfo.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#001A33] px-6 py-4">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                Tabela Nutricional
              </h2>
            </div>

            <div className="px-6 py-6">
              <p className="font-['Open_Sans'] text-sm text-gray-600 mb-4">
                Porção de 50g (1 unidade média)
              </p>

              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#D4AF37]">
                    <th className="text-left py-3 font-['Open_Sans'] font-semibold text-[#001A33]">
                      Informação Nutricional
                    </th>
                    <th className="text-right py-3 font-['Open_Sans'] font-semibold text-[#001A33]">
                      Quantidade por porção
                    </th>
                    <th className="text-right py-3 font-['Open_Sans'] font-semibold text-[#001A33]">
                      %VD*
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {nutritionalInfo.map((item, idx) => (
                    <tr key={idx}>
                      <td className={`py-3 font-['Open_Sans'] text-gray-700 ${item.label.startsWith('Gorduras ') ? 'pl-6' : ''}`}>
                        {item.label}
                      </td>
                      <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">{item.value}</td>
                      <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">{item.percentage || '**'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="font-['Open_Sans'] text-xs text-gray-500 mt-4">
                *% Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.
              </p>
              <p className="font-['Open_Sans'] text-xs text-gray-500 mt-2">
                ** Valor Diário não estabelecido.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-[#001A33] to-[#002a52] text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-4">
            Interessado em nossos produtos?
          </h2>
          <p className="font-['Open_Sans'] text-lg text-gray-300 mb-8">
            Entre em contato com nossa equipe comercial para mais informações
          </p>
          <Link
            href="/contato"
            className="inline-block bg-[#D4AF37] hover:bg-[#c29d2f] text-white px-10 py-4 rounded-xl font-['Open_Sans'] font-semibold text-lg transition-all duration-300 hover:shadow-xl"
          >
            Fale com nosso time
          </Link>
        </div>
      </div>
    </div>
  );
}
import { ArrowLeft } from 'lucide-react';
import productImage from '../../assets/8fae9eb821852d8958d220712c1560ebecb6c6fe.png';

interface ProductDetailPageProps {
  onNavigateBack?: () => void;
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
}

export function ProductDetailPage({ onNavigateBack, onNavigateProducts, onNavigateContact }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onNavigateProducts}
            className="flex items-center gap-2 text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para produtos
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-[#001A33] mb-6">
              Pão de Alho
            </h1>

            {/* Category Badge */}
            <div className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-full font-['Open_Sans'] font-semibold text-sm mb-8">
              Pães Macios
            </div>

            {/* Vantagens */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#001A33] mb-4">
                Vantagens
              </h2>
              <ul className="space-y-2 font-['Open_Sans'] text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Pão macio e de sabor acentuado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Ótimo acompanhamento para qualquer evento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Pode ser recheado ou folhado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Fácil preparo e rendimento otimizado</span>
                </li>
              </ul>
            </div>

            {/* Informações Técnicas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="bg-[#001A33] px-6 py-4">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                  Informações Técnicas
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {/* Embalagem */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Embalagem
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                    Mistura para Pão de Alho, pó
                  </div>
                </div>

                {/* Peso Líquido */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Peso Líquido
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                    Sacos de 10 kg e sacos de 25 kg
                  </div>
                </div>

                {/* Validade */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Validade
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                    6 meses
                  </div>
                </div>

                {/* Dosagem */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Dosagem
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                    100% sobre a farinha de trigo
                  </div>
                </div>

                {/* Modo de uso */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Modo de uso
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700 leading-relaxed">
                    Mistura completa para pão de alho. Basta adicionar água gelada e fermento biológico fresco.
                  </div>
                </div>

                {/* Armazenamento */}
                <div className="grid grid-cols-3 px-6 py-4">
                  <div className="font-['Open_Sans'] font-semibold text-[#001A33]">
                    Armazenamento
                  </div>
                  <div className="col-span-2 font-['Open_Sans'] text-gray-700">
                    Conservar em local seco, fresco e arejado
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredientes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="bg-[#001A33] px-6 py-4">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                  Ingredientes
                </h2>
              </div>

              <div className="px-6 py-4">
                <p className="font-['Open_Sans'] text-gray-700 leading-relaxed">
                  Farinha de trigo especial enriquecida com ferro e ácido fólico, açúcar, gordura vegetal low trans, alho, sal, melhorador, condimento, bicarbonato de sódio e conservante INS 282.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={productImage}
                alt="Pão de Alho Via Pane"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Modo de Preparo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#001A33] px-6 py-4">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
              Modo de Preparo
            </h2>
          </div>

          <div className="px-6 py-6">
            <ol className="space-y-4 font-['Open_Sans'] text-gray-700 leading-relaxed">
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">1.</span>
                <span>Colocar na masseira ou batedeira a Mistura para Pão de Alho, a água gelada e por último o fermento.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">2.</span>
                <span>Deixar bater até obter o ponto de véu.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">3.</span>
                <span>Colocar a massa sobre a mesa e cubra com um plástico. Deixar descansar por 20 minutos.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">4.</span>
                <span>Dividir no tamanho desejado e modelar.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">5.</span>
                <span>Pincelar com ovos, e adicionar a cobertura.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">6.</span>
                <span>Deixar crescer até dobrar de tamanho.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#D4AF37] flex-shrink-0">7.</span>
                <span>Levar ao forno de lastro a +/- 200°C de 25 a 30 minutos ou em forno turbo na temperatura de 150°C por 20 a 25 minutos.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Tabela Nutricional */}
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
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Valor energético</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">150 kcal</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">8%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Carboidratos</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">28 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">9%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Proteínas</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">4,5 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">6%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Gorduras totais</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">2,8 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">5%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 pl-6">Gorduras saturadas</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">1,2 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">5%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 pl-6">Gorduras trans</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">0 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">**</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Fibra alimentar</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">1,8 g</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">7%</td>
                </tr>
                <tr>
                  <td className="py-3 font-['Open_Sans'] text-gray-700">Sódio</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">320 mg</td>
                  <td className="py-3 font-['Open_Sans'] text-gray-700 text-right">13%</td>
                </tr>
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
          <button
            onClick={onNavigateContact}
            className="bg-[#D4AF37] hover:bg-[#c29d2f] text-white px-10 py-4 rounded-xl font-['Open_Sans'] font-semibold text-lg transition-all duration-300 hover:shadow-xl"
          >
            Fale com nosso time
          </button>
        </div>
      </div>
    </div>
  );
}
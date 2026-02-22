import { Target, Eye, Heart, Award, Users, Leaf, Sparkles, TrendingUp } from 'lucide-react';
import aboutImage from '../../assets/e89d464a5eb246a9fcf4d3552dc7410c529a1bf9.png';

interface AboutPageProps {
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
}

export function AboutPage({ onNavigateProducts, onNavigateContact }: AboutPageProps) {
  const values = [
    {
      icon: Award,
      title: 'Compromisso com a Qualidade',
      description: 'Garantir sabor, segurança e consistência em cada produto.'
    },
    {
      icon: Heart,
      title: 'Respeito pela Tradição',
      description: 'Honrar as técnicas artesanais que dão alma ao nosso trabalho.'
    },
    {
      icon: Sparkles,
      title: 'Inovação Contínua',
      description: 'Buscar soluções que simplifiquem processos e elevem o padrão do mercado.'
    },
    {
      icon: Users,
      title: 'Proximidade e Parceria',
      description: 'Construir relações verdadeiras baseadas na confiança e no suporte.'
    },
    {
      icon: TrendingUp,
      title: 'Paixão pelo Ofício',
      description: 'Valorizar o trabalho de cada cliente, entendendo seus desafios como parte da nossa missão.'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade e Ética',
      description: 'Agir com responsabilidade social e ambiental para um futuro melhor.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#001A33] via-[#002a52] to-[#001A33] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full font-['Open_Sans'] font-semibold text-sm mb-6">
              20 anos de história
            </div>
            <h1 className="font-['Playfair_Display'] text-6xl md:text-7xl font-bold mb-8">
              Sobre Nós
            </h1>
          </div>

          <p className="font-['Open_Sans'] text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto text-center">
            Com 20 anos de história, a Via Pane é mais que uma indústria de pré-misturas para panificação e confeitaria — somos parceiros dedicados de quem transforma farinha em alimento e afeto.
          </p>
        </div>
      </div>

      {/* Nossa História */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-['Playfair_Display'] text-5xl font-bold text-[#001A33] mb-6">
                Nossa História
              </h2>
              <div className="space-y-6 font-['Open_Sans'] text-lg text-gray-700 leading-relaxed">
                <p>
                  Nascemos do respeito pela tradição artesanal, mas com o olhar sempre voltado para a inovação. Nosso compromisso é oferecer produtos que unem qualidade, praticidade e cuidado, acompanhando de perto as necessidades de padarias, supermercados, indústrias e pequenos negócios em todo o Brasil.
                </p>
                <p>
                  Acreditamos que, junto com nossos clientes, fermentamos sonhos e construímos histórias que chegam à mesa das famílias brasileiras todos os dias.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-2">20+</div>
                  <div className="font-['Open_Sans'] text-sm text-gray-600">Anos de experiência</div>
                </div>
                <div className="text-center">
                  <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-2">3</div>
                  <div className="font-['Open_Sans'] text-sm text-gray-600">Unidades no Brasil</div>
                </div>
                <div className="text-center">
                  <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-2">72+</div>
                  <div className="font-['Open_Sans'] text-sm text-gray-600">Produtos premium</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#D4AF37] opacity-20 rounded-2xl"></div>
              <img
                src={aboutImage}
                alt="Panificação artesanal"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Missão e Visão */}
      <div className="py-20 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#c29d2f] rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#001A33]">
                  Missão
                </h3>
              </div>
              <p className="font-['Open_Sans'] text-gray-700 leading-relaxed text-lg">
                Facilitar o dia a dia de quem vive da panificação e confeitaria, oferecendo soluções de alta qualidade que unem tradição, inovação e praticidade. Desenvolvemos pré-misturas e produtos com excelência técnica, cuidado artesanal e proximidade verdadeira com nossos clientes — transformando trabalho em sabor, rotina em realização e ingredientes em histórias que nutrem pessoas e negócios.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-gradient-to-br from-[#001A33] to-[#002a52] rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-['Playfair_Display'] text-3xl font-bold">
                  Visão
                </h3>
              </div>
              <p className="font-['Open_Sans'] text-gray-200 leading-relaxed text-lg">
                Ser reconhecida como a principal parceira do setor de panificação e confeitaria no Brasil, referência em inovação, qualidade e atendimento próximo. Queremos contribuir para o crescimento sustentável dos nossos clientes e valorizar o ofício artesanal, inspirando novas gerações a transformar ingredientes em sonhos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-5xl font-bold text-[#001A33] mb-4">
              Nossos Valores
            </h2>
            <p className="font-['Open_Sans'] text-xl text-gray-600 max-w-3xl mx-auto">
              Os pilares que guiam cada decisão e cada produto que desenvolvemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-[#F9F7F2] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[#D4AF37]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#c29d2f] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-['Playfair_Display'] text-xl font-bold text-[#001A33] mb-3">
                    {value.title}
                  </h4>
                  <p className="font-['Open_Sans'] text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compromisso Section */}
      <div className="py-20 bg-gradient-to-br from-[#001A33] to-[#002a52] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-['Playfair_Display'] text-5xl font-bold mb-8">
            Fermentamos Sonhos
          </h2>
          <p className="font-['Open_Sans'] text-2xl text-gray-200 leading-relaxed mb-12">
            Junto com nossos clientes, construímos histórias que chegam à mesa das famílias brasileiras todos os dias
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-3">
                Tradição
              </div>
              <p className="font-['Open_Sans'] text-gray-200">
                Respeitando técnicas artesanais que dão alma ao nosso trabalho
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-3">
                Inovação
              </div>
              <p className="font-['Open_Sans'] text-gray-200">
                Sempre buscando soluções que elevam o padrão do mercado
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37] mb-3">
                Parceria
              </div>
              <p className="font-['Open_Sans'] text-gray-200">
                Construindo relações verdadeiras com nossos clientes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-5xl font-bold text-[#001A33] mb-6">
            Vamos crescer juntos?
          </h2>
          <p className="font-['Open_Sans'] text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Descubra como a Via Pane pode ser a parceira ideal para o seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#D4AF37] hover:bg-[#c29d2f] text-white px-10 py-4 rounded-xl font-['Open_Sans'] font-semibold text-lg transition-all duration-300 hover:shadow-xl"
              onClick={onNavigateProducts}
            >
              Conheça nossos produtos
            </button>
            <button
              className="bg-transparent border-2 border-[#001A33] text-[#001A33] hover:bg-[#001A33] hover:text-white px-10 py-4 rounded-xl font-['Open_Sans'] font-semibold text-lg transition-all duration-300"
              onClick={onNavigateContact}
            >
              Entre em contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
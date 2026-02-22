import { useState } from 'react';
import { Search, Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tendências de Panificação para 2026: O Que Esperar",
    excerpt: "Descubra as principais tendências que estão moldando o mercado de panificação neste ano. De ingredientes funcionais a técnicas artesanais modernas.",
    author: "Maria Silva",
    date: "15 Jan 2026",
    readTime: "5 min",
    category: "Tendências",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHRyZW5kc3xlbnwxfHx8fDE3Njg2OTQwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Como Melhorar a Fermentação Natural dos Seus Pães",
    excerpt: "Aprenda técnicas profissionais para aprimorar o processo de fermentação e obter pães com textura e sabor superiores.",
    author: "João Santos",
    date: "12 Jan 2026",
    readTime: "8 min",
    category: "Técnicas",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBicmVhZHxlbnwxfHx8fDE3Njg2OTQwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Pré-misturas Premium: Qualidade e Praticidade Profissional",
    excerpt: "Entenda como as pré-misturas premium da Via Pane podem elevar a qualidade dos seus produtos mantendo a eficiência operacional.",
    author: "Ana Costa",
    date: "10 Jan 2026",
    readTime: "6 min",
    category: "Produtos",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3Njg2OTQwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Confeitaria de Alto Padrão: Segredos dos Mestres",
    excerpt: "Descubra os segredos dos grandes confeiteiros para criar sobremesas que impressionam pelo sabor e apresentação impecável.",
    author: "Pedro Oliveira",
    date: "8 Jan 2026",
    readTime: "7 min",
    category: "Confeitaria",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3Njg2OTQwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    title: "Gestão de Padaria: Como Otimizar Seu Negócio",
    excerpt: "Dicas práticas de gestão para aumentar a lucratividade e eficiência da sua padaria ou confeitaria.",
    author: "Carlos Ferreira",
    date: "5 Jan 2026",
    readTime: "10 min",
    category: "Negócios",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBzaG9wfGVufDF8fHx8MTc2ODY5NDAwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    title: "Inovação em Receitas: Criando Produtos Diferenciados",
    excerpt: "Como inovar no cardápio da sua padaria criando produtos únicos que atraem e fidelizam clientes.",
    author: "Juliana Lima",
    date: "3 Jan 2026",
    readTime: "6 min",
    category: "Receitas",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWR8ZW58MXx8fHwxNzY4Njk0MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 7,
    title: "A Importância da Qualidade dos Ingredientes",
    excerpt: "Entenda como a escolha de ingredientes premium impacta diretamente no resultado final dos seus produtos.",
    author: "Roberto Alves",
    date: "1 Jan 2026",
    readTime: "5 min",
    category: "Qualidade",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmbG91ciUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc2ODY5NDAwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 8,
    title: "Sustentabilidade na Panificação: Práticas Essenciais",
    excerpt: "Como implementar práticas sustentáveis na sua padaria, reduzindo desperdícios e contribuindo com o meio ambiente.",
    author: "Fernanda Rocha",
    date: "28 Dez 2025",
    readTime: "8 min",
    category: "Sustentabilidade",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBiYWtlcnl8ZW58MXx8fHwxNzY4Njk0MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 9,
    title: "Marketing para Padarias: Atraia Mais Clientes",
    excerpt: "Estratégias de marketing digital e tradicional para aumentar o fluxo de clientes na sua padaria.",
    author: "Lucas Mendes",
    date: "25 Dez 2025",
    readTime: "9 min",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBkaWdpdGFsfGVufDF8fHx8MTc2ODY5NDAwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const categories = ["Todos", "Tendências", "Técnicas", "Produtos", "Confeitaria", "Negócios", "Receitas", "Qualidade", "Sustentabilidade", "Marketing"];

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-['Open_Sans'] font-medium text-sm transition-all ${
                  selectedCategory === category
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
                <article
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
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
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

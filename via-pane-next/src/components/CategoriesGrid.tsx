import Link from 'next/link';

const confeitariaImg = '/assets/24c13f50a8526caf350e853fa49980f3f5010c61.png';
const ingredientesImg = '/assets/c0858fe769a37ebe80b1016f01ae1010abdab89a.png';
const panificacaoImg = '/assets/66740e5d7db1a7685495e3ac6a22018ec884da3e.png';

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

function CategoryCard({ image, title, description, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block relative group overflow-hidden rounded-lg cursor-pointer h-[400px]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-3">{title}</h3>
        <p className="font-['Open_Sans'] text-sm mb-6 opacity-90">{description}</p>
        <span className="inline-block border border-white group-hover:bg-white group-hover:text-[#001A33] text-white font-['Open_Sans'] px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
          Saiba mais
        </span>
      </div>
    </Link>
  );
}

export function CategoriesGrid() {
  const categories = [
    {
      image: panificacaoImg,
      title: "Panificação",
      description: "Pré-misturas especiais para pães artesanais e tradicionais de alta qualidade",
      href: "/produtos?categoria=panificacao"
    },
    {
      image: confeitariaImg,
      title: "Confeitaria",
      description: "Pré-misturas premium para doces e sobremesas que encantam",
      href: "/produtos?categoria=confeitaria"
    },
    {
      image: ingredientesImg,
      title: "Ingredientes",
      description: "Matérias-primas premium para profissionais da panificação",
      href: "/produtos?categoria=ingredientes"
    }
  ];

  return (
    <section className="bg-[#F9F7F2] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
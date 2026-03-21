export interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  slug?: string;
}

import Link from 'next/link';

function BlogCard({ image, category, title, author, date, slug }: BlogCardProps) {
  const CardContent = (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-4 left-4 bg-[#e1ab42] text-white px-4 py-1 text-xs font-['Open_Sans'] font-semibold rounded">
          {category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#001A33] mb-4 hover:text-[#e1ab42] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-600 font-['Open_Sans']">
          <span>Por {author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

interface BlogSectionProps {
  posts?: BlogCardProps[];
}

export function BlogSection({ posts: propPosts }: BlogSectionProps) {
  const defaultPosts = [
    {
      image: "https://images.unsplash.com/photo-1630329777937-e0de732a893c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmVhZCUyMG1ha2luZyUyMGJha2VyeXxlbnwxfHx8fDE3Njg2OTQwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Panificação",
      title: "Técnicas tradicionais de fermentação natural",
      author: "Maria Silva",
      date: "15 Jan 2026",
      slug: 'tecnicas-tradicionais'
    },
    {
      image: "https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY4NjgyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Confeitaria",
      title: "A arte de criar croissants perfeitos",
      author: "João Santos",
      date: "12 Jan 2026",
      slug: 'arte-croissants'
    },
    {
      image: "https://images.unsplash.com/photo-1611588275568-72ecc1a502d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxiYWtpbmclMjBmbG91ciUyMGluZ3JlZGllbnRzfGVufDF8fHx8fDE3Njg2ODgzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tendências",
      title: "Inovações na indústria de panificação brasileira",
      author: "Ana Costa",
      date: "08 Jan 2026",
      slug: 'inovacoes-industria'
    }
  ];

  const posts = propPosts || defaultPosts;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#001A33] mb-4">
            A nossa tradição para dar o seu primeiro passo
          </h2>
          <p className="font-['Open_Sans'] text-gray-600 text-lg max-w-2xl mx-auto">
            Compartilhamos conhecimento e expertise para elevar o padrão da panificação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
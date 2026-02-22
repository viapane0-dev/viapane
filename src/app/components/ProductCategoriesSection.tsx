import { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductCategory {
  id: string;
  title: string;
  image: string;
  link: string;
}

interface ProductCategoriesSectionProps {
  onNavigateProducts?: () => void;
}

export function ProductCategoriesSection({ onNavigateProducts }: ProductCategoriesSectionProps) {
  const sliderRef = useRef<Slider>(null);

  const categories: ProductCategory[] = [
    {
      id: 'paes-macios',
      title: 'Pães macios',
      image: 'https://images.unsplash.com/photo-1565801776220-10bd41565980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBsb2F2ZXN8ZW58MXx8fHwxNzY4Njk1MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#paes-macios'
    },
    {
      id: 'fermentacao-natural',
      title: 'Pães de fermentação natural',
      image: 'https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY4NjgyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#fermentacao-natural'
    },
    {
      id: 'paes-integrais',
      title: 'Pães integrais',
      image: 'https://images.unsplash.com/photo-1767065887412-b19cb992cf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGJyZWFkJTIwaGVhbHRoeXxlbnwxfHx8fDE3Njg2OTUwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#paes-integrais'
    },
    {
      id: 'paes-funcionais',
      title: 'Pães funcionais',
      image: 'https://images.unsplash.com/photo-1551185618-07fd482ff86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBmbG91ciUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc2ODY5NTA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#paes-funcionais'
    },
    {
      id: 'confeitaria-seca',
      title: 'Confeitaria seca',
      image: 'https://images.unsplash.com/photo-1537029415773-e79d5d8e68d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwc2xpY2VzJTIwZGVzc2VydHxlbnwxfHx8fDE3Njg2MDY2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#confeitaria-seca'
    },
    {
      id: 'panetones',
      title: 'Panetones',
      image: 'https://images.unsplash.com/photo-1609501885825-c286bf8010e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5ldHRvbmUlMjBicmVhZHxlbnwxfHx8fDE3Njg2OTUwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      link: '#panetones'
    }
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#001A33]">
            Nossos produtos
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-2 rounded-full border-2 border-[#001A33] text-[#001A33] hover:bg-[#001A33] hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="p-2 rounded-full border-2 border-[#001A33] text-[#001A33] hover:bg-[#001A33] hover:text-white transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category) => (
              <div key={category.id} className="px-2">
                <button
                  onClick={onNavigateProducts}
                  className="block group w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 mb-3">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                  <h3 className="font-['Open_Sans'] text-sm font-semibold text-[#001A33] text-center group-hover:text-[#D4AF37] transition-colors">
                    {category.title}
                  </h3>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
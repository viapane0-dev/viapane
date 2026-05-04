import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: string;
}

const defaultImage = '/assets/39dc205a9f8d08ca89349ecd63a7a091c55335b5.png';

export function HeroSection({
  title = '',
  subtitle = '',
  buttonText = '',
  buttonUrl = '/',
  backgroundImage = defaultImage
}: HeroSectionProps) {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="font-['Playfair_Display'] text-white text-5xl md:text-7xl font-bold mb-6 max-w-4xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="font-['Open_Sans'] text-white text-lg md:text-xl mb-10 max-w-2xl opacity-90">
          {subtitle}
        </p>
        <Link
          href={buttonUrl}
          className="bg-[#D3AF37] hover:bg-[#B89A2E] text-white font-['Open_Sans'] font-semibold px-12 py-4 rounded-lg transition-all duration-300 text-base inline-block"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
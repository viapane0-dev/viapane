import heroBannerImg from '../../assets/39dc205a9f8d08ca89349ecd63a7a091c55335b5.png';

interface HeroSectionProps {
  onNavigateAbout?: () => void;
}

export function HeroSection({ onNavigateAbout }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBannerImg}
          alt="Pães Artesanais"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="font-['Playfair_Display'] text-white text-5xl md:text-7xl font-bold mb-6 max-w-4xl">
          Fermentando sonhos,<br />
          construindo sabores
        </h1>
        <p className="font-['Open_Sans'] text-white text-lg md:text-xl mb-10 max-w-2xl opacity-90">
          A excelência da panificação premium que alimenta o Brasil há gerações
        </p>
        <button
          onClick={onNavigateAbout}
          className="bg-[#D4AF37] hover:bg-[#c29d2f] text-white font-['Open_Sans'] font-semibold px-12 py-4 rounded-lg transition-all duration-300 text-base"
        >
          Conheça nossa história
        </button>
      </div>
    </section>
  );
}
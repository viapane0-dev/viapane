import { Mic2, Instagram, Youtube, Music2, Phone } from 'lucide-react';

const paocastLogo = '/assets/6b28b7cca9f858ab1fe830cae829a2dd66358977.png';

export function PodcastSection() {
  return (
    <section className="bg-gradient-to-br from-[#001A33] via-[#002a52] to-[#001A33] py-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Podcast Info */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Mic2 className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-['Open_Sans'] font-semibold text-sm">Podcast Via Pane</span>
            </div>

            <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6">
              Pãocast
            </h2>

            <p className="font-['Open_Sans'] text-xl text-gray-100 leading-relaxed mb-8">
              O podcast que une panificação, negócios e histórias inspiradoras.
              Apresentado por Weima Gomes, trazemos conversas autênticas sobre o universo
              da panificação e confeitaria brasileira.
            </p>

            <p className="font-['Open_Sans'] text-lg text-gray-200 mb-10">
              Todo mês, novos episódios com profissionais do setor, donos de padarias,
              mestres padeiros e empreendedores que transformam farinha em sonhos.
            </p>

            {/* Podcast Platforms */}
            <div className="space-y-4 mb-8">
              <p className="font-['Open_Sans'] font-semibold text-sm text-gray-300 uppercase tracking-wider">
                Ouça nas plataformas:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://open.spotify.com/show/0uCsnzW5bWvv3C7kXk9zGG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-white px-6 py-3 rounded-xl font-['Open_Sans'] font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Music2 className="w-5 h-5" />
                  Spotify
                </a>

                <a
                  href="https://www.youtube.com/@Viapanebrasil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#FF0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-xl font-['Open_Sans'] font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Youtube className="w-5 h-5" />
                  YouTube
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <p className="font-['Open_Sans'] font-semibold text-sm text-gray-300">
                Siga o Pãocast:
              </p>
              <a
                href="https://www.instagram.com/paocast.vp/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-[#D4AF37] backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side - Podcast Cover */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-[#D4AF37] rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20">
              <img
                src={paocastLogo}
                alt="Pãocast - Via Pane com Weima Gomes"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#D4AF37] rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full opacity-10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
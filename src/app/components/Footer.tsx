import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logoViaPane from '../../assets/699500d4cbe776f287d9baa47cd30339ee84e75d.png';

interface FooterProps {
  onNavigateContact?: () => void;
  onNavigateHome?: () => void;
  onNavigateProducts?: () => void;
  onNavigateAbout?: () => void;
  onNavigateBlog?: () => void;
}

// TikTok SVG Icon Component
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// WhatsApp SVG Icon Component  
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Footer({ onNavigateContact, onNavigateHome, onNavigateProducts, onNavigateAbout, onNavigateBlog }: FooterProps) {
  return (
    <footer className="bg-[#001A33] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={logoViaPane} alt="Via Pane" className="h-20 brightness-0 invert" />
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contatos */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Contatos</h4>
            <div className="space-y-4 font-['Open_Sans']">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Matriz São Paulo</p>
                  <p className="text-gray-300 text-sm">(11) 4426-2896</p>
                  <p className="text-gray-300 text-sm">(11) 3458-6027</p>
                  <p className="text-gray-300 text-sm">(11) 4352-1984</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">E-mail</p>
                  <a href="mailto:mkt@viapane.com.br" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    mkt@viapane.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links e Redes Sociais */}
          <div className="text-center">
            <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Navegação</h4>
            <nav className="space-y-3 font-['Open_Sans'] mb-8">
              <button
                onClick={onNavigateHome}
                className="block hover:text-[#D4AF37] transition-colors w-full"
              >
                Home
              </button>
              <button
                onClick={onNavigateProducts}
                className="block hover:text-[#D4AF37] transition-colors w-full"
              >
                Produtos
              </button>
              <button
                onClick={onNavigateAbout}
                className="block hover:text-[#D4AF37] transition-colors w-full"
              >
                Sobre nós
              </button>
              <button
                onClick={onNavigateBlog}
                className="block hover:text-[#D4AF37] transition-colors w-full"
              >
                Blog
              </button>
              <button
                onClick={onNavigateContact}
                className="block hover:text-[#D4AF37] transition-colors w-full"
              >
                Contato
              </button>
            </nav>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              <a
                href="https://www.youtube.com/@Viapanebrasil/podcasts"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4AF37] hover:bg-[#c29d2f] p-3 rounded-full transition-colors"
                aria-label="YouTube Via Pane"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.instagram.com/via__pane/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4AF37] hover:bg-[#c29d2f] p-3 rounded-full transition-colors"
                aria-label="Instagram Via Pane"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@via__pane"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4AF37] hover:bg-[#c29d2f] p-3 rounded-full transition-colors"
                aria-label="TikTok Via Pane"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://wa.me/5511913390164"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4AF37] hover:bg-[#c29d2f] p-3 rounded-full transition-colors"
                aria-label="WhatsApp Via Pane"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Endereços */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Endereços</h4>
            <div className="space-y-6 font-['Open_Sans']">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Matriz - Santo André/SP</p>
                  <p className="text-gray-300 text-sm">
                    Rua Itaquera, 421 - Jd. Stella<br />
                    Santo André - SP, 09185-690
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Recife/PE</p>
                  <p className="text-gray-300 text-sm">
                    Rod BR 101 Sul, 34318<br />
                    Cabo de Santo Agostinho - PE
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Conde/PB</p>
                  <p className="text-gray-300 text-sm">
                    Rod BR 101 KM 96,20<br />
                    Conde - PB, 58322-000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="font-['Open_Sans'] text-gray-400 text-sm">
            © 2026 Via Pane - Todos os direitos reservados | O pão nosso de cada dia nós dai hoje
          </p>
        </div>
      </div>
    </footer>
  );
}
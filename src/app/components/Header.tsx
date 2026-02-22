import { Search } from 'lucide-react';
import { useState } from 'react';
import logoViaPane from '../../assets/699500d4cbe776f287d9baa47cd30339ee84e75d.png';

interface HeaderProps {
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateBlog?: () => void;
  onSearch?: (searchTerm: string) => void;
}

export function Header({ onNavigateProducts, onNavigateContact, onNavigateHome, onNavigateAbout, onNavigateBlog, onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={onNavigateHome}>
            <img src={logoViaPane} alt="Via Pane" className="h-16" />
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={onNavigateHome}
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Home
            </button>
            <button
              onClick={onNavigateProducts}
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Produtos
            </button>
            <button
              onClick={onNavigateAbout}
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Sobre nós
            </button>
            <button
              onClick={onNavigateBlog}
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Blog
            </button>
            <button
              onClick={onNavigateContact}
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Contato
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-4 pr-10 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans'] text-sm"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#001A33] hover:text-[#D4AF37] transition-colors" 
                onClick={handleSearch}
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
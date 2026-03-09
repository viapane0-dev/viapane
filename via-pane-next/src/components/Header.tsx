"use client";

import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const logoViaPane = '/assets/699500d4cbe776f287d9baa47cd30339ee84e75d.png';

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer">
            <img src={logoViaPane} alt="Via Pane" className="h-20 w-auto" />
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/produtos"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Sobre nós
            </Link>
            <Link
              href="/blog"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Blog
            </Link>
            <Link
              href="/contato"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-sm"
            >
              Contato
            </Link>
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
                className="pl-4 pr-10 py-2 w-40 md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans'] text-sm transition-all"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#001A33] hover:text-[#D4AF37] transition-colors"
                onClick={handleSearch}
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-4 p-2 text-[#001A33] hover:text-[#D4AF37] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <Link
              href="/"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-base py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/produtos"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-base py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-base py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre nós
            </Link>
            <Link
              href="/blog"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-base py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contato"
              className="text-[#001A33] hover:text-[#D4AF37] transition-colors font-['Open_Sans'] font-medium text-base py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
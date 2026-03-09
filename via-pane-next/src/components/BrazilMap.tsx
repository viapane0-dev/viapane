interface BrazilMapProps {
  activeRegion?: 'sp' | 'recife' | 'paraiba' | null;
  onRegionClick?: (region: 'sp' | 'recife' | 'paraiba') => void;
}

export function BrazilMap({ activeRegion, onRegionClick }: BrazilMapProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Mapa do Brasil SVG da Wikimedia */}
      <div className="relative w-full max-w-[400px]">
        <img
          src="/assets/brazil-map.svg"
          alt="Mapa do Brasil"
          className="w-full h-auto opacity-20"
        />

        {/* Overlay para marcadores interativos */}
        <div className="absolute inset-0">
          {/* Região Nordeste - João Pessoa (Paraíba) */}
          <button
            onClick={() => onRegionClick?.('paraiba')}
            className="absolute group cursor-pointer"
            style={{ top: '23%', left: '78%' }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full transition-all ${activeRegion === 'paraiba' ? 'bg-[#D4AF37] scale-125' : 'bg-[#001A33] hover:scale-110'
                  }`}
              />
              {activeRegion === 'paraiba' && (
                <div className="absolute w-8 h-8 rounded-full bg-[#D4AF37] opacity-30 animate-ping" />
              )}
            </div>
            <span
              className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-['Open_Sans'] font-semibold transition-colors ${activeRegion === 'paraiba' ? 'text-[#D4AF37]' : 'text-[#001A33]'
                }`}
            >
              João Pessoa
            </span>
          </button>

          {/* Região Nordeste - Recife */}
          <button
            onClick={() => onRegionClick?.('recife')}
            className="absolute group cursor-pointer"
            style={{ top: '28%', left: '75%' }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full transition-all ${activeRegion === 'recife' ? 'bg-[#D4AF37] scale-125' : 'bg-[#001A33] hover:scale-110'
                  }`}
              />
              {activeRegion === 'recife' && (
                <div className="absolute w-8 h-8 rounded-full bg-[#D4AF37] opacity-30 animate-ping" />
              )}
            </div>
            <span
              className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-['Open_Sans'] font-semibold transition-colors ${activeRegion === 'recife' ? 'text-[#D4AF37]' : 'text-[#001A33]'
                }`}
            >
              Recife
            </span>
          </button>

          {/* Região Sudeste - São Paulo */}
          <button
            onClick={() => onRegionClick?.('sp')}
            className="absolute group cursor-pointer"
            style={{ top: '62%', left: '54%' }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full transition-all ${activeRegion === 'sp' ? 'bg-[#D4AF37] scale-125' : 'bg-[#001A33] hover:scale-110'
                  }`}
              />
              {activeRegion === 'sp' && (
                <div className="absolute w-10 h-10 rounded-full bg-[#D4AF37] opacity-30 animate-ping" />
              )}
            </div>
            <span
              className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-['Open_Sans'] font-semibold transition-colors ${activeRegion === 'sp' ? 'text-[#D4AF37]' : 'text-[#001A33]'
                }`}
            >
              São Paulo
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
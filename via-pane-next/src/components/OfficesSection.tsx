"use client";

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { BrazilMap } from '@/components/BrazilMap';

interface OfficeInfo {
  name: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export function OfficesSection() {
  const [activeTab, setActiveTab] = useState<'sp' | 'pe'>('sp');

  const offices: Record<string, OfficeInfo> = {
    sp: {
      name: "Matriz São Paulo",
      company: "VIA PANE IND. COM. PROD. ALIM. LTDA",
      address: "Rua Itaquera, 421 - Jd. Stella",
      city: "Santo André",
      state: "SP",
      zip: "09185-690",
    },
    pe: {
      name: "Filial Pernambuco",
      company: "VIA PANE IND. COM. PROD. ALIM. LTDA",
      address: "Rod BR 101 Sul, 34318, GP 04 D BL 07, Dist. Ind. Diper",
      city: "Cabo de Santo Agostinho",
      state: "PE",
      zip: "54510-000",
    }
  };

  const currentOffice = offices[activeTab];

  return (
    <section className="bg-transparent py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Mapa Interativo do Brasil */}
          <div className="relative bg-white p-12 rounded-lg shadow-sm flex items-center justify-center h-[500px]">
            <BrazilMap activeRegion={activeTab} onRegionClick={setActiveTab} />
          </div>

          {/* Informações dos Escritórios */}
          <div>
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-gray-300">
              <button
                onClick={() => setActiveTab('sp')}
                className={`font-['Open_Sans'] font-semibold px-6 py-3 transition-colors ${activeTab === 'sp'
                  ? 'text-[#D3AF37] border-b-2 border-[#D3AF37]'
                  : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                São Paulo
              </button>
              <button
                onClick={() => setActiveTab('pe')}
                className={`font-['Open_Sans'] font-semibold px-6 py-3 transition-colors ${activeTab === 'pe'
                  ? 'text-[#D3AF37] border-b-2 border-[#D3AF37]'
                  : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                Pernambuco
              </button>
            </div>

            {/* Informações */}
            <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <div>
                <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#001A33] mb-2">
                  {currentOffice.name}
                </h3>
                <p className="font-['Open_Sans'] text-sm text-gray-500">
                  {currentOffice.company}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-[#D3AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-['Open_Sans'] font-semibold text-[#001A33] mb-1">Endereço</p>
                  <p className="font-['Open_Sans'] text-gray-600">{currentOffice.address}</p>
                  <p className="font-['Open_Sans'] text-gray-600">
                    {currentOffice.city} - {currentOffice.state}
                  </p>
                  <p className="font-['Open_Sans'] text-gray-600">CEP: {currentOffice.zip}</p>
                </div>
              </div>

              <button className="w-full bg-[#D3AF37] hover:bg-[#B89A2E] text-white font-['Open_Sans'] font-semibold px-8 py-3 rounded-lg transition-all duration-300 mt-6">
                Entrar em contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
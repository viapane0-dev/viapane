"use client";

import { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { BrazilMap } from '@/components/BrazilMap';

interface OfficeInfo {
  name: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phones: string[];
}

export function OfficesSection() {
  const [activeTab, setActiveTab] = useState<'sp' | 'recife'>('sp');

  const offices: Record<string, OfficeInfo> = {
    sp: {
      name: "Matriz São Paulo",
      company: "VIA PANE IND. COM. PROD. ALIM. LTDA",
      address: "Rua Itaquera, 421 - Jd. Stella",
      city: "Santo André",
      state: "SP",
      zip: "09185-690",
      phones: ["(11) 4426-2896", "(11) 3458-6027", "(11) 4352-1984"]
    },
    recife: {
      name: "Sede Recife",
      company: "VIA PANE IND. COM. PROD. ALIM. LTDA",
      address: "Rua Tenente João Cícero, 301 - Boa Viagem",
      city: "Recife",
      state: "PE",
      zip: "51021-020",
      phones: ["(81) 3326-2896", "(81) 3465-2896", "(81) 3465-2896"]
    }
  };

  const currentOffice = offices[activeTab];

  return (
    <section className="bg-[#F9F7F2] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#001A33] mb-4">
            Nossas Unidades
          </h2>
          <p className="font-['Open_Sans'] text-gray-600 text-lg">
            Presença nacional para melhor atender você
          </p>
        </div>

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
                    ? 'text-[#e1ab42] border-b-2 border-[#e1ab42]'
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  São Paulo
                </button>
                <button
                  onClick={() => setActiveTab('recife')}
                  className={`font-['Open_Sans'] font-semibold px-6 py-3 transition-colors ${activeTab === 'recife'
                    ? 'text-[#e1ab42] border-b-2 border-[#e1ab42]'
                    : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  Recife
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
                <MapPin size={24} className="text-[#e1ab42] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-['Open_Sans'] font-semibold text-[#001A33] mb-1">Endereço</p>
                  <p className="font-['Open_Sans'] text-gray-600">{currentOffice.address}</p>
                  <p className="font-['Open_Sans'] text-gray-600">
                    {currentOffice.city} - {currentOffice.state}
                  </p>
                  <p className="font-['Open_Sans'] text-gray-600">CEP: {currentOffice.zip}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={24} className="text-[#e1ab42] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-['Open_Sans'] font-semibold text-[#001A33] mb-1">
                    {currentOffice.phones.length > 1 ? 'Telefones' : 'Telefone'}
                  </p>
                  {currentOffice.phones.map((phone, idx) => (
                    <p key={idx} className="font-['Open_Sans'] text-gray-600">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#e1ab42] hover:bg-[#c29d2f] text-white font-['Open_Sans'] font-semibold px-8 py-3 rounded-lg transition-all duration-300 mt-6">
                Entrar em contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
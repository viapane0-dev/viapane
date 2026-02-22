"use client";

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

interface Office {
  id: string;
  name: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phones: string[];
}

const offices: Office[] = [
  {
    id: 'matriz-sp',
    name: 'Matriz Via Pane',
    company: 'VIA PANE IND. COM. PROD. ALIM. LTDA',
    address: 'Rua Itaquera, 421 - Jd. Stella',
    city: 'Santo André',
    state: 'SP',
    zip: '09185-690',
    phones: ['(11) 4426-2896', '(11) 3458-6027', '(11) 4352-1984']
  },
  {
    id: 'recife',
    name: 'Via Pane Recife',
    company: 'VIA PANE IND. COM. PROD. ALIM. LTDA',
    address: 'Rod BR 101 Sul, 34318, GP 04 D BL 07, Dist. Ind. Diper',
    city: 'Cabo de Santo Agostinho',
    state: 'PE',
    zip: '54510-000',
    phones: ['(81) 99857-0020']
  },
  {
    id: 'paraiba',
    name: 'Via Pane Paraíba',
    company: 'VIA PANE IND. COM. PROD. ALIM. LTDA',
    address: 'Rod BR 101 KM 96,20 - Quadra única galpão VII - Distrito Industrial',
    city: 'Conde',
    state: 'PB',
    zip: '58322-000',
    phones: ['(83) 99875-7563']
  }
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com um serviço de email
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Hero Header */}
      <div className="bg-[#001A33] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-4">
            Fale Conosco
          </h1>
          <p className="font-['Open_Sans'] text-lg text-gray-300 max-w-2xl">
            Entre em contato com nossa equipe. Estamos prontos para atendê-lo em nossas três unidades.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#001A33] mb-6">
              Envie sua mensagem
            </h2>
            <p className="font-['Open_Sans'] text-gray-600 mb-8">
              Preencha o formulário abaixo e nossa equipe entrará em contato com você em breve.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans']"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans']"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans']"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans']"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                  Assunto *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans']"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="comercial">Comercial / Vendas</option>
                  <option value="produtos">Informações sobre produtos</option>
                  <option value="parceria">Oportunidades de parceria</option>
                  <option value="suporte">Suporte técnico</option>
                  <option value="outros">Outros assuntos</option>
                </select>
              </div>

              <div>
                <label className="block font-['Open_Sans'] font-semibold text-[#001A33] mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] font-['Open_Sans'] resize-none"
                  placeholder="Digite sua mensagem aqui..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-white px-8 py-4 rounded-lg font-['Open_Sans'] font-semibold hover:bg-[#c49d2f] transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar mensagem
              </button>

              <p className="font-['Open_Sans'] text-sm text-gray-500 text-center">
                Ou envie um e-mail direto para:{' '}
                <a href="mailto:mkt@viapane.com.br" className="text-[#D4AF37] hover:underline font-semibold">
                  mkt@viapane.com.br
                </a>
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#001A33] mb-6">
                Nossas Unidades
              </h2>

              {offices.map((office, index) => (
                <div
                  key={office.id}
                  className={`${index !== offices.length - 1 ? 'pb-6 mb-6 border-b border-gray-200' : ''}`}
                >
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#D4AF37] mb-3">
                    {office.name}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-['Open_Sans'] text-sm text-gray-600 leading-relaxed">
                          {office.company}
                        </p>
                        <p className="font-['Open_Sans'] text-sm text-gray-800 font-medium mt-1">
                          {office.address}
                        </p>
                        <p className="font-['Open_Sans'] text-sm text-gray-800">
                          {office.city} - {office.state} - CEP: {office.zip}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                      <div>
                        {office.phones.map((phone, idx) => (
                          <a
                            key={idx}
                            href={`tel:${phone.replace(/\D/g, '')}`}
                            className="font-['Open_Sans'] text-sm text-gray-800 hover:text-[#D4AF37] transition-colors block"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Contact Card */}
            <div className="bg-gradient-to-br from-[#001A33] to-[#002a52] rounded-2xl p-8 shadow-lg text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold">
                    E-mail Comercial
                  </h3>
                  <p className="font-['Open_Sans'] text-sm text-gray-300">
                    Resposta em até 24 horas
                  </p>
                </div>
              </div>
              <a
                href="mailto:mkt@viapane.com.br"
                className="font-['Open_Sans'] text-lg text-[#D4AF37] hover:text-white transition-colors"
              >
                mkt@viapane.com.br
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#001A33] mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 font-['Open_Sans'] text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda a Sexta:</span>
                  <span className="font-semibold text-[#001A33]">8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado:</span>
                  <span className="font-semibold text-[#001A33]">8h às 12h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo:</span>
                  <span className="font-semibold text-gray-400">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#001A33] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-4">
            Seja um parceiro Via Pane
          </h2>
          <p className="font-['Open_Sans'] text-lg text-gray-300 mb-8">
            Descubra as oportunidades de parceria e distribua nossos produtos premium em sua região
          </p>
          <button className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-['Open_Sans'] font-semibold hover:bg-[#c49d2f] transition-colors">
            Saiba mais sobre parcerias
          </button>
        </div>
      </div>
    </div>
  );
}

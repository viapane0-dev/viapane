"use client";

import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Mensagem enviada com sucesso! Obrigado pelo contato.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        setStatus('error');
        setStatusMessage(data.error || 'Erro ao enviar. Tente novamente.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  };

  return (
    <section className="bg-transparent py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#EAE4D6] rounded-lg p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Mail size={48} className="text-[#D3AF37]" />
            </div>

            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#001A33] mb-4">
              Fale com a gente e assine nossa Newsletter
            </h3>

            <p className="font-['Open_Sans'] text-gray-700 mb-8 text-lg">
              Envie suas dúvidas, sugestões e receba também conteúdos e receitas exclusivas.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base"
                  required
                />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base"
                  required
                />
              </div>
              <textarea
                placeholder="Envie sua dúvida, sugestão ou comentário..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base resize-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#001A33] hover:bg-[#002647] text-white font-['Open_Sans'] font-semibold px-10 py-4 rounded-lg transition-all duration-300 text-base w-full md:w-auto md:self-end mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <><Loader2 size={20} className="animate-spin" /> Enviando...</>
                ) : (
                  'Enviar e Assinar'
                )}
              </button>

              {statusMessage && (
                <div className={`flex items-center gap-2 justify-center p-3 rounded-lg text-sm font-['Open_Sans'] ${
                  status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {status === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {statusMessage}
                </div>
              )}
            </form>

            <p className="font-['Open_Sans'] text-sm text-gray-600 mt-4">
              Seus dados estão protegidos. Não compartilhamos informações com terceiros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
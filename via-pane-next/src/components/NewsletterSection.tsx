import { Mail } from 'lucide-react';

export function NewsletterSection() {
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

            <form className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base"
                  required
                />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base"
                  required
                />
              </div>
              <textarea
                placeholder="Envie sua dúvida, sugestão ou comentário..."
                rows={4}
                className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D3AF37] font-['Open_Sans'] text-base resize-none"
              />
              <button
                type="submit"
                className="bg-[#001A33] hover:bg-[#002647] text-white font-['Open_Sans'] font-semibold px-10 py-4 rounded-lg transition-all duration-300 text-base w-full md:w-auto md:self-end mt-2"
              >
                Enviar e Assinar
              </button>
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
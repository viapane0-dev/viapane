import { Mail } from 'lucide-react';

export function NewsletterSection() {
  return (
    <section className="bg-[#F9F7F2] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#EAE4D6] rounded-lg p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Mail size={48} className="text-[#D4AF37]" />
            </div>
            
            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#001A33] mb-4">
              Assine nossa newsletter
            </h3>
            
            <p className="font-['Open_Sans'] text-gray-700 mb-8 text-lg">
              Receba novidades, receitas exclusivas e conteúdos sobre o mundo da panificação
            </p>

            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4AF37] font-['Open_Sans'] text-base"
                required
              />
              <button
                type="submit"
                className="bg-[#001A33] hover:bg-[#002647] text-white font-['Open_Sans'] font-semibold px-10 py-4 rounded-lg transition-all duration-300 text-base whitespace-nowrap"
              >
                Assinar
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
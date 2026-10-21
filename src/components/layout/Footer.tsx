import React, { useState } from 'react';
import type { SiteContent } from '../../types/siteContent';
import { ShieldCheck, Truck, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  siteContent: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ siteContent }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const { artist, contact, guarantees, footer } = siteContent;
  const cleanWhatsapp = contact.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer id="contacto" className="w-full bg-gallery-900 text-gallery-300 border-t border-gallery-800">
      
      {/* Top Value Proposition Grid */}
      <div id="garantias" className="border-b border-gallery-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  {guarantees.authenticity.title}
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  {guarantees.authenticity.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  {guarantees.shipping.title}
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  {guarantees.shipping.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  {guarantees.trial.title}
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  {guarantees.trial.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & VIP Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Presentation (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              {artist.name}
            </span>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              {footer.subtitle}
            </p>
            <p className="text-xs text-gallery-400 leading-relaxed max-w-sm">
              {footer.brandDescription}
            </p>
            <div className="pt-2 text-xs text-gallery-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {footer.locationLabel}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {footer.contactLabel} {contact.contactEmail}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {contact.schedule}
              </p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navegación
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalogo" className="hover:text-gold transition-colors">Catálogo de Obras</a>
              </li>
              <li>
                <a href="#artista" className="hover:text-gold transition-colors">Sobre Tomás Odión</a>
              </li>
              <li>
                <a href="#garantias" className="hover:text-gold transition-colors">Certificados & Envíos</a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp del Atelier (+34)
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Collectors Circle Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {footer.newsletterTitle}
            </h5>
            <p className="text-xs text-gallery-400 leading-relaxed">
              {footer.newsletterSubtitle}
            </p>

            {subscribed ? (
              <div className="p-3 bg-gallery-800 text-gold-300 text-xs rounded border border-gallery-700">
                ✓ Gracias por unirse al Círculo Privado de Coleccionistas.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="su.correo@ejemplo.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gallery-800 border border-gallery-700 text-white text-xs rounded placeholder:text-gallery-500 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-gold hover:bg-gold-600 text-gallery-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center gap-4 text-xs text-gallery-500">
              <span className="text-gallery-400 text-[11px]">
                {contact.studioAddress}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-12 mt-12 border-t border-gallery-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gallery-500 gap-4">
          <p>© 2026 {artist.name}. {footer.copyrightNotice}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gallery-300">Aviso Legal</a>
            <a href="#" className="hover:text-gallery-300">Privacidad</a>
            <a href="#" className="hover:text-gallery-300">Términos de Compra</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

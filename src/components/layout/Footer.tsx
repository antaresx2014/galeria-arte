import React, { useState } from 'react';
import { ARTIST_INFO } from '../../data/artworks';
import { ShieldCheck, Truck, Sparkles, Send } from 'lucide-react';

export const Footer: React.FC = () => {
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

  return (
    <footer id="contacto" className="w-full bg-gallery-900 text-gallery-300 border-t border-gallery-800">
      
      {/* Top Value Proposition Grid */}
      <div className="border-b border-gallery-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  Certificado de Autenticidad 1/1
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  Cada obra se entrega con documentación física original numerada, sellada y rubricada de puño y letra por el artista.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  Transporte Asegurado Especializado
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  Embalaje en caja de madera reforzada y póliza de seguro de transporte de bellas artes a todo riesgo incluida.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gallery-800 border border-gallery-700 flex items-center justify-center text-gold shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-white text-base font-bold">
                  Prueba en tu Hogar (14 días)
                </h4>
                <p className="text-xs text-gallery-400 mt-1 leading-relaxed">
                  Compruebe la armonía de la pieza con su iluminación y arquitectura interior con total tranquilidad y devolución garantizada.
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
              {ARTIST_INFO.name}
            </span>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Atelier & Galería Privada Contemporánea
            </p>
            <p className="text-xs text-gallery-400 leading-relaxed max-w-sm">
              Comercialización exclusiva de obras pictóricas originales del taller del artista. Obra de autor para colecciones privadas, residencias de diseño y proyectos arquitectónicos singulares.
            </p>
            <div className="pt-2 text-xs text-gallery-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Estudios en: Madrid & Costa Brava (España)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Contacto directo: {ARTIST_INFO.contactEmail}
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
                <a href="#catalogo" className="hover:text-gold transition-colors">Catálogo Completo</a>
              </li>
              <li>
                <a href="#artista" className="hover:text-gold transition-colors">Biografía y Premios</a>
              </li>
              <li>
                <a 
                  href="https://wa.me/34600112233" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Citas en Taller (Madrid / Girona)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">Condiciones de Envío y Embalaje</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">Certificado de Autenticidad</a>
              </li>
            </ul>
          </div>

          {/* VIP Collectors Circle Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Círculo de Coleccionistas
            </h5>
            <p className="text-xs text-gallery-400 leading-relaxed">
              Reciba acceso prioritario a la previsualización de nuevas series de cuadros antes de su publicación general.
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
                  className="flex-1 px-3 py-2 bg-gallery-800 border border-gallery-700 text-white text-xs rounded placeholder:text-gallery-500 focus:outline-hidden focus:border-gold"
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
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@mateovalenzuela.arte</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-12 mt-12 border-t border-gallery-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gallery-500 gap-4">
          <p>© {new Date().getFullYear()} {ARTIST_INFO.name}. Todos los derechos reservados. Obras registradas con propiedad intelectual.</p>
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

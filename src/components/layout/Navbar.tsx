import React, { useState, useEffect } from 'react';
import { Menu, X, SlidersHorizontal, Sparkles, ShieldCheck, Phone } from 'lucide-react';
import { ARTIST_INFO } from '../../data/artworks';

interface NavbarProps {
  onOpenAdmin: () => void;
  artworksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, artworksCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Editorial Notice Bar */}
      <div className="bg-gallery-900 text-gallery-100 text-xs py-2 px-4 tracking-wider uppercase flex justify-between items-center border-b border-gallery-800">
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-gallery-300">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>Obras originales directas del taller del artista</span>
        </div>
        <div className="mx-auto sm:mx-0 text-center text-[11px] font-medium tracking-widest text-gold-200">
          Envío asegurado internacional en caja rígida • Certificado firmado 1/1
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-gallery-400">
          <a 
            href="https://wa.me/34600112233" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-gold" />
            <span>Atención Coleccionistas: +34 600 11 22 33</span>
          </a>
        </div>
      </div>

      {/* Main Luxury Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-subtle py-3 border-b border-gallery-200' 
            : 'bg-gallery-50/90 backdrop-blur-sm py-5 border-b border-gallery-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Atelier Branding */}
          <a href="#" className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gallery-900 group-hover:text-gold transition-colors">
              {ARTIST_INFO.name}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gallery-500 font-sans">
              Galería & Colección Privada
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a 
              href="#catalogo" 
              className="text-gallery-800 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Catálogo de Obras
              <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-gallery-100 text-gallery-600 font-mono">
                {artworksCount}
              </span>
            </a>
            <a 
              href="#artista" 
              className="text-gallery-800 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Sobre el Artista
            </a>
            <a 
              href="#proceso" 
              className="text-gallery-800 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Proceso & Taller
            </a>
            <a 
              href="#contacto" 
              className="text-gallery-800 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Contacto
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Quick Admin Access */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gallery-600 hover:text-gallery-900 bg-gallery-100 hover:bg-gallery-200 rounded border border-gallery-300 transition-colors"
              title="Panel ligero para gestionar disponibilidad de cuadros"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
              <span>Gestión Obras</span>
            </button>

            {/* Inquire CTA */}
            <a
              href="#catalogo"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-gallery-900 hover:bg-gold-700 transition-all rounded shadow-sm hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>Ver Obras</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gallery-700 hover:text-gallery-900 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gallery-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <a 
              href="#catalogo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-gallery-900 hover:text-gold border-b border-gallery-100"
            >
              Catálogo de Obras ({artworksCount})
            </a>
            <a 
              href="#artista" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-gallery-900 hover:text-gold border-b border-gallery-100"
            >
              Sobre el Artista
            </a>
            <a 
              href="#proceso" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-gallery-900 hover:text-gold border-b border-gallery-100"
            >
              Proceso & Taller
            </a>
            <a 
              href="#contacto" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-gallery-900 hover:text-gold border-b border-gallery-100"
            >
              Contacto
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider text-gallery-700 bg-gallery-100 rounded"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold-600" />
              <span>Panel de Administración Ligero</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

import React from 'react';
import type { Artwork } from '../../types/artwork';
import { ARTIST_INFO } from '../../data/artworks';
import { formatPrice } from '../../utils/formatters';
import { ArrowDown, Sparkles, Eye, ShieldCheck, Compass, Award } from 'lucide-react';

interface HeroProps {
  featuredArtwork: Artwork;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredArtwork, onSelectArtwork }) => {
  return (
    <section className="relative w-full bg-gallery-50 overflow-hidden border-b border-gallery-200">
      {/* Background Texture & Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Gallery badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gallery-300/80 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-gallery-700 font-medium">
                Colección Exclusiva • Obras 1/1 Originales
              </span>
            </div>

            {/* Main Editorial Title */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-700 font-semibold">
                Atelier {ARTIST_INFO.name}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gallery-900 leading-[1.1]">
                La materia del silencio, <br />
                <span className="italic font-normal text-gallery-700">la pulsión de la tierra.</span>
              </h1>
            </div>

            {/* Artist Statement */}
            <blockquote className="border-l-2 border-gold pl-5 py-1 text-gallery-600 italic text-base sm:text-lg leading-relaxed font-serif">
              {ARTIST_INFO.statement}
            </blockquote>

            {/* Quick Summary Pill / Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 pb-2 border-y border-gallery-200">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-gallery-900">
                  {ARTIST_INFO.stats.worksInCollections}
                </p>
                <p className="text-[11px] sm:text-xs text-gallery-500 uppercase tracking-wider">
                  Obras en Colección
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-gallery-900">
                  100%
                </p>
                <p className="text-[11px] sm:text-xs text-gallery-500 uppercase tracking-wider">
                  Piezas Únicas 1/1
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-gallery-900">
                  {ARTIST_INFO.stats.countriesCollected}
                </p>
                <p className="text-[11px] sm:text-xs text-gallery-500 uppercase tracking-wider">
                  Países con Coleccionistas
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gallery-900 hover:bg-gold-700 text-white text-xs sm:text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span>Explorar la Colección</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => onSelectArtwork(featuredArtwork)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gallery-100 text-gallery-900 border border-gallery-300 text-xs sm:text-sm uppercase tracking-widest font-medium transition-colors"
              >
                <Eye className="w-4 h-4 text-gold-600" />
                <span>Ver Obra Destacada en Salón</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-6 text-xs text-gallery-500 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                Certificado Firmado
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-gold" />
                Embalaje Profesional
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold" />
                Garantía de Devolución 14d
              </span>
            </div>
          </div>

          {/* Right Column: Hero Art Presentation (Saatchi Art Style Spotlight) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative museum frame */}
              <div 
                onClick={() => onSelectArtwork(featuredArtwork)}
                className="group cursor-pointer relative bg-white p-4 sm:p-5 shadow-gallery hover:shadow-frame transition-all duration-500 border border-gallery-200/80 rounded-xs"
              >
                {/* Visual artwork container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gallery-200">
                  <img
                    src={featuredArtwork.primaryImage}
                    alt={featuredArtwork.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gallery-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs tracking-widest uppercase font-medium flex items-center gap-2 bg-black/60 px-3 py-1.5 backdrop-blur-xs rounded">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      Hacer clic para abrir ficha e interactuar en pared
                    </span>
                  </div>
                </div>

                {/* Artwork caption card below */}
                <div className="pt-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gold-700 font-medium">
                      Obra Seleccionada del Mes
                    </span>
                    <h2 className="font-serif text-lg font-bold text-gallery-900 group-hover:text-gold transition-colors">
                      {featuredArtwork.title}
                    </h2>
                    <p className="text-xs text-gallery-500">
                      {featuredArtwork.dimensions.height} × {featuredArtwork.dimensions.width} cm • {featuredArtwork.medium.split(',')[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-semibold text-gallery-900">
                      {formatPrice(featuredArtwork.price)}
                    </span>
                    <p className="text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">
                      Disponible
                    </p>
                  </div>
                </div>

                {/* Floating pill for "Ver en tu pared" */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gallery-900 text-gold-200 px-3.5 py-2 rounded-xs shadow-lg flex items-center gap-2 text-xs border border-gold/40">
                  <Eye className="w-3.5 h-3.5 text-gold" />
                  <span className="font-medium">Simulador en Sala</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

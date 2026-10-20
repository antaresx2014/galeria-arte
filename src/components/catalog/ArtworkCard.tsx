import React from 'react';
import type { Artwork } from '../../types/artwork';
import { formatPrice, formatDimensions } from '../../utils/formatters';
import { Eye, Lock } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  onQuickViewInRoom: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onSelect,
  onQuickViewInRoom,
}) => {
  const isSold = artwork.status === 'sold';

  return (
    <article 
      className="group flex flex-col bg-white border border-gallery-200/90 hover:border-gallery-300 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-gallery"
    >
      {/* Visual Canvas Area */}
      <div 
        onClick={() => onSelect(artwork)}
        className="relative aspect-[4/5] bg-gallery-100 overflow-hidden cursor-pointer"
      >
        <img
          src={artwork.primaryImage}
          alt={artwork.title}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            isSold ? 'grayscale-[20%] opacity-90' : ''
          }`}
        />

        {/* Gallery Lighting Overlay on hover */}
        <div className="absolute inset-0 bg-gallery-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Status Badge (Discreet Sold Tag or Unique Piece) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isSold ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-700/95 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-widest rounded-xs shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Vendido / Sold
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-gallery-800 text-[10px] uppercase font-semibold tracking-wider rounded-xs shadow-xs border border-gallery-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Original 1/1
            </span>
          )}

          {artwork.framed && (
            <span className="hidden sm:inline-block px-2 py-0.5 bg-black/75 backdrop-blur-xs text-gallery-100 text-[9px] uppercase tracking-wider rounded-xs">
              Enmarcado
            </span>
          )}
        </div>

        {/* Floating Quick Action overlay buttons on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(artwork);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-gallery-900 text-xs font-medium uppercase tracking-wider rounded-xs shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gold-700" />
            <span>Ver Ficha</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickViewInRoom(artwork);
            }}
            title="Ver en salón moderno a escala real"
            className="py-2 px-3 bg-gallery-900/90 hover:bg-gallery-900 text-gold-200 text-xs font-medium uppercase tracking-wider rounded-xs shadow-md backdrop-blur-xs transition-colors"
          >
            En Salón
          </button>
        </div>
      </div>

      {/* Artwork Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Year */}
          <div className="flex items-center justify-between text-[11px] text-gallery-500 uppercase tracking-widest mb-1.5">
            <span className="text-gold-700 font-semibold">{artwork.category}</span>
            <span>{artwork.year}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(artwork)}
            className="font-serif text-lg sm:text-xl font-bold text-gallery-900 hover:text-gold transition-colors cursor-pointer line-clamp-1"
          >
            {artwork.title}
          </h3>

          {/* Technique */}
          <p className="text-xs text-gallery-600 line-clamp-1 mt-1 font-normal">
            {artwork.medium}
          </p>

          {/* Dimensions */}
          <p className="text-xs text-gallery-500 font-mono mt-1">
            {formatDimensions(artwork.dimensions)}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-4 mt-4 border-t border-gallery-100 flex items-center justify-between">
          <div>
            {isSold ? (
              <div className="flex items-center gap-1 text-gallery-400">
                <Lock className="w-3.5 h-3.5 text-red-700" />
                <span className="text-xs uppercase tracking-wider font-semibold text-red-700">
                  Adquirido
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase text-gallery-400 block tracking-wider leading-none">
                  Precio de Adquisición
                </span>
                <span className="font-serif text-lg font-bold text-gallery-900 tracking-tight">
                  {formatPrice(artwork.price)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelect(artwork)}
            className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
              isSold 
                ? 'text-gallery-500 hover:text-gallery-900 bg-gallery-100' 
                : 'text-gallery-900 hover:text-white hover:bg-gallery-900 border border-gallery-300'
            }`}
          >
            {isSold ? 'Ver Historia' : 'Detalles'}
          </button>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import type { Artwork } from '../../types/artwork';
import { ArtworkCard } from './ArtworkCard';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ArtworkGridProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onQuickViewInRoom: (artwork: Artwork) => void;
  onResetFilters: () => void;
}

export const ArtworkGrid: React.FC<ArtworkGridProps> = ({
  artworks,
  onSelectArtwork,
  onQuickViewInRoom,
  onResetFilters
}) => {
  if (artworks.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-50 flex items-center justify-center text-gold-700">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-gallery-900 mb-2">
          No hay obras con los filtros seleccionados
        </h3>
        <p className="text-sm text-gallery-500 mb-6">
          Prueba a cambiar los criterios de búsqueda, ajustar el tamaño o seleccionar otra serie artística.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gallery-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-gold-700 transition-colors rounded-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ver toda la colección</span>
        </button>
      </div>
    );
  }

  return (
    <div id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Editorial Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onSelect={onSelectArtwork}
            onQuickViewInRoom={onQuickViewInRoom}
          />
        ))}
      </div>
    </div>
  );
};

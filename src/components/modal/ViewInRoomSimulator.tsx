import React, { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { Palette, Layers } from 'lucide-react';

interface ViewInRoomSimulatorProps {
  artwork: Artwork;
}

type WallColor = 'white' | 'warm-linen' | 'charcoal' | 'sage';
type FrameStyle = 'oak' | 'black' | 'gold' | 'canvas';

export const ViewInRoomSimulator: React.FC<ViewInRoomSimulatorProps> = ({ artwork }) => {
  const [wallColor, setWallColor] = useState<WallColor>('white');
  const [frameStyle, setFrameStyle] = useState<FrameStyle>(artwork.framed ? 'black' : 'canvas');

  // Compute realistic relative scale.
  // Assume a standard living room wall where the sofa is 220cm wide and takes ~55% of the scene width.
  // So 1cm ~ 0.25% of scene width, clamped between 25% and 65% for ideal visual aesthetics.
  const maxWidthRatio = 65;
  const minWidthRatio = 26;
  const computedWidthPercent = Math.min(
    maxWidthRatio,
    Math.max(minWidthRatio, (artwork.dimensions.width / 220) * 55)
  );

  // Aspect ratio based on real dimensions (width / height)
  const aspectRatio = artwork.dimensions.width / artwork.dimensions.height;

  const wallStyles: Record<WallColor, { bg: string; name: string }> = {
    'white': { bg: 'bg-[#F6F5F2]', name: 'Blanco Galería' },
    'warm-linen': { bg: 'bg-[#EAE4DC]', name: 'Lino Cálido' },
    'charcoal': { bg: 'bg-[#2B2D31]', name: 'Carbón Contemporáneo' },
    'sage': { bg: 'bg-[#DCE2DE]', name: 'Salvia Sereno' },
  };

  const frameClasses: Record<FrameStyle, string> = {
    'oak': 'border-[8px] sm:border-[12px] border-[#9E7D56] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/20',
    'black': 'border-[8px] sm:border-[12px] border-[#18181B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10',
    'gold': 'border-[8px] sm:border-[12px] border-[#C5A059] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-amber-700/30',
    'canvas': 'border-[2px] border-black/10 shadow-[0_25px_45px_-10px_rgba(0,0,0,0.38)]',
  };

  return (
    <div className="flex flex-col h-full select-none">
      
      {/* Simulator Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gallery-100 border-b border-gallery-200 text-xs">
        
        {/* Wall Color selector */}
        <div className="flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-gallery-600" />
          <span className="text-gallery-600 font-medium hidden sm:inline">Color Pared:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWallColor('white')}
              className={`w-5 h-5 rounded-full bg-[#F6F5F2] border ${wallColor === 'white' ? 'ring-2 ring-gold border-white' : 'border-gallery-300'}`}
              title="Blanco Galería"
            />
            <button
              onClick={() => setWallColor('warm-linen')}
              className={`w-5 h-5 rounded-full bg-[#EAE4DC] border ${wallColor === 'warm-linen' ? 'ring-2 ring-gold border-white' : 'border-gallery-300'}`}
              title="Lino Cálido"
            />
            <button
              onClick={() => setWallColor('charcoal')}
              className={`w-5 h-5 rounded-full bg-[#2B2D31] border ${wallColor === 'charcoal' ? 'ring-2 ring-gold border-white' : 'border-gallery-300'}`}
              title="Carbón Contemporáneo"
            />
            <button
              onClick={() => setWallColor('sage')}
              className={`w-5 h-5 rounded-full bg-[#DCE2DE] border ${wallColor === 'sage' ? 'ring-2 ring-gold border-white' : 'border-gallery-300'}`}
              title="Salvia Sereno"
            />
          </div>
        </div>

        {/* Frame Style selector */}
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-gallery-600" />
          <span className="text-gallery-600 font-medium hidden sm:inline">Estilo Marco:</span>
          <div className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => setFrameStyle('black')}
              className={`px-2 py-0.5 rounded ${frameStyle === 'black' ? 'bg-gallery-900 text-white font-medium' : 'bg-white text-gallery-700 border border-gallery-200'}`}
            >
              Negro
            </button>
            <button
              onClick={() => setFrameStyle('oak')}
              className={`px-2 py-0.5 rounded ${frameStyle === 'oak' ? 'bg-gallery-900 text-white font-medium' : 'bg-white text-gallery-700 border border-gallery-200'}`}
            >
              Roble
            </button>
            <button
              onClick={() => setFrameStyle('gold')}
              className={`px-2 py-0.5 rounded ${frameStyle === 'gold' ? 'bg-gallery-900 text-white font-medium' : 'bg-white text-gallery-700 border border-gallery-200'}`}
            >
              Dorado
            </button>
            <button
              onClick={() => setFrameStyle('canvas')}
              className={`px-2 py-0.5 rounded ${frameStyle === 'canvas' ? 'bg-gallery-900 text-white font-medium' : 'bg-white text-gallery-700 border border-gallery-200'}`}
            >
              Sin Marco
            </button>
          </div>
        </div>

        {/* Scale tag */}
        <div className="text-[11px] text-gallery-500 font-mono hidden md:block">
          Escala: {artwork.dimensions.height}×{artwork.dimensions.width} cm
        </div>

      </div>

      {/* Realistic Virtual Living Room Environment */}
      <div className={`relative flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] ${wallStyles[wallColor].bg} overflow-hidden flex flex-col justify-between transition-colors duration-500`}>
        
        {/* Subtle Ceiling Downlight Spot */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-radial from-amber-100/25 to-transparent blur-2xl pointer-events-none" />

        {/* Upper Wall Section: The Hung Artwork */}
        <div className="relative flex-1 flex items-center justify-center p-6 sm:p-10 z-10">
          <div 
            style={{ 
              width: `${computedWidthPercent}%`,
              aspectRatio: `${aspectRatio}`,
              maxWidth: '85%'
            }}
            className={`relative transition-all duration-500 ${frameClasses[frameStyle]} group`}
          >
            {/* The Painting Canvas */}
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              className="w-full h-full object-cover select-none"
            />

            {/* Subtle Glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />

            {/* Dimension callout line on hover */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Ancho: {artwork.dimensions.width} cm
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 -rotate-90 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Alto: {artwork.dimensions.height} cm
            </div>
          </div>
        </div>

        {/* Lower Room Section: Designer Sofa, Rug and Baseboard */}
        <div className="relative z-10 w-full mt-auto">
          
          {/* Contemporary Designer Sofa Graphic Representation */}
          <div className="relative max-w-2xl mx-auto px-6">
            
            {/* Sofa Backrest Cushion */}
            <div className="w-[85%] sm:w-[88%] mx-auto h-16 sm:h-20 bg-linear-to-b from-stone-300 to-stone-400 rounded-t-xl shadow-md border-t border-stone-200 relative">
              {/* Backrest seam lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-stone-400/40" />
            </div>

            {/* Sofa Main Seating Cushion */}
            <div className="w-full h-12 sm:h-14 bg-linear-to-b from-stone-400 to-stone-500 rounded-lg shadow-lg relative flex items-center justify-between px-4">
              <div className="w-1/3 h-full border-r border-stone-400/40" />
              <div className="w-1/3 h-full border-r border-stone-400/40" />
              <div className="w-1/3 h-full" />
            </div>

            {/* Sofa Wooden / Metal Minimalist Legs */}
            <div className="flex justify-between px-8 sm:px-12 pt-0.5">
              <div className="w-2 sm:w-2.5 h-4 sm:h-5 bg-stone-800 rounded-b" />
              <div className="w-2 sm:w-2.5 h-4 sm:h-5 bg-stone-800 rounded-b" />
            </div>
          </div>

          {/* Hardwood Parquet Floor and Shadow */}
          <div className="h-10 sm:h-12 w-full bg-linear-to-b from-[#CDB599] via-[#C2A584] to-[#B09270] border-t-4 border-[#8C6D4F] shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_30px)] pointer-events-none" />
            
            {/* Sofa drop shadow on floor */}
            <div className="w-3/4 mx-auto h-3 bg-black/25 blur-sm rounded-full" />
          </div>

        </div>

        {/* Scale reference watermark */}
        <div className="absolute bottom-14 left-4 bg-white/80 backdrop-blur-xs text-gallery-800 px-2.5 py-1 rounded text-[10px] font-medium border border-gallery-200/80 shadow-xs">
          🛋️ Proyección a escala proporcional (Sofá de 220 cm)
        </div>

      </div>
    </div>
  );
};

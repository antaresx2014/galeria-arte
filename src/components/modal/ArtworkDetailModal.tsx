import React, { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { ViewInRoomSimulator } from './ViewInRoomSimulator';
import { formatPrice, formatDimensions } from '../../utils/formatters';
import { 
  X, 
  Eye, 
  ZoomIn, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  ShoppingBag, 
  Lock,
  Share2,
  Box
} from 'lucide-react';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAcquisition: (artwork: Artwork, mode: 'reserve' | 'inquiry') => void;
  initialTab?: 'gallery' | 'room';
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onOpenAcquisition,
  initialTab = 'gallery'
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'room'>(initialTab);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('story');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync tab if initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, artwork?.id]);

  if (!isOpen || !artwork) return null;

  const isSold = artwork.status === 'sold';
  const currentImage = artwork.galleryImages[activeImageIndex] || artwork.primaryImage;

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-gallery-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-6xl min-h-screen sm:min-h-0 bg-white sm:rounded-xs shadow-modal border border-gallery-200 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gallery-200 bg-gallery-50">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold font-mono">
              Ref: {artwork.id}
            </span>
            <span className="hidden sm:inline text-gallery-300">•</span>
            <span className="hidden sm:inline text-xs text-gallery-600 font-serif italic">
              {artwork.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-gallery-500 hover:text-gallery-900 hover:bg-gallery-200 rounded transition-colors text-xs flex items-center gap-1.5"
              title="Copiar enlace de la obra"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gallery-500 hover:text-gallery-900 hover:bg-gallery-200 rounded transition-colors"
              aria-label="Cerrar modal de detalle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Grid 2 Columns Saatchi Art Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
          
          {/* Left Column (7 cols): Interactive Visual Area (Gallery or Room Simulator) */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-gallery-200 flex flex-col bg-gallery-50">
            
            {/* View Mode Switcher Toggle Bar */}
            <div className="p-3 bg-white border-b border-gallery-200 flex items-center justify-between gap-2">
              <div className="inline-flex p-1 bg-gallery-100 rounded-xs border border-gallery-200">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'gallery'
                      ? 'bg-white text-gallery-900 shadow-xs'
                      : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-gold-700" />
                  <span>Fondo de Galería (Zoom)</span>
                </button>
                <button
                  onClick={() => setActiveTab('room')}
                  className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'room'
                      ? 'bg-gallery-900 text-white shadow-xs'
                      : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-gold" />
                  <span>Ver en Salón (View in a Room)</span>
                </button>
              </div>

              {activeTab === 'gallery' && (
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="hidden sm:flex items-center gap-1 text-xs text-gallery-600 hover:text-gallery-900 px-2 py-1 bg-gallery-50 border border-gallery-200 rounded"
                >
                  <Maximize2 className="w-3 h-3 text-gold-700" />
                  <span>{isZoomed ? 'Alejar' : 'Inspección Táctil'}</span>
                </button>
              )}
            </div>

            {/* Visual Screen Container */}
            <div className="flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] relative flex flex-col">
              {activeTab === 'room' ? (
                /* Virtual Room Simulator */
                <ViewInRoomSimulator artwork={artwork} />
              ) : (
                /* High Resolution Gallery View with Zoom */
                <div className="flex-1 flex flex-col justify-between p-4 sm:p-8">
                  <div 
                    className="relative flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <img
                      src={currentImage}
                      alt={artwork.title}
                      className={`max-h-[460px] sm:max-h-[520px] w-auto max-w-full object-contain rounded-xs shadow-gallery transition-transform duration-500 ${
                        isZoomed ? 'scale-150' : 'scale-100'
                      }`}
                    />
                    
                    {/* Zoom hint badge */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded pointer-events-none flex items-center gap-1">
                      <ZoomIn className="w-3 h-3" />
                      <span>{isZoomed ? 'Clic para alejar' : 'Clic para ampliar textura'}</span>
                    </div>
                  </div>

                  {/* Thumbnail Selector */}
                  {artwork.galleryImages.length > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-4 border-t border-gallery-200/60 mt-4">
                      {artwork.galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-16 h-16 rounded-xs overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx 
                              ? 'border-gold shadow-md scale-105' 
                              : 'border-gallery-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (5 cols): Purchase & Technical Specifications Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-6">
            
            {/* Header: Title, Artist & Category */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gallery-500 mb-2">
                <span className="text-gold-700 font-semibold">{artwork.category}</span>
                <span>Año {artwork.year}</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gallery-900 leading-tight">
                {artwork.title}
              </h2>

              <p className="text-sm text-gallery-600 mt-1">
                Por <strong className="text-gallery-900 font-serif">{artwork.artist}</strong>
              </p>
            </div>

            {/* Price & Sold / Available Status */}
            <div className="p-4 bg-gallery-50 rounded-xs border border-gallery-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gallery-400 block font-semibold">
                  {isSold ? 'Estado de la Pieza' : 'Precio de Adquisición Directa'}
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gallery-900">
                  {formatPrice(artwork.price)}
                </span>
                <p className="text-[11px] text-gallery-500">
                  Impuestos incluidos • Envío asegurado con seguimiento
                </p>
              </div>

              {isSold ? (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 border border-red-200 text-xs uppercase font-bold tracking-wider rounded-xs">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    Vendido / Sold
                  </span>
                  <span className="block text-[10px] text-gallery-400 mt-1">
                    Colección Privada
                  </span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs uppercase font-semibold tracking-wider rounded-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Disponible
                  </span>
                  <span className="block text-[10px] text-gold-700 font-medium mt-1">
                    Pieza Original 1/1
                  </span>
                </div>
              )}
            </div>

            {/* Technical Specifications Matrix (Saatchi Art Icons) */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-semibold text-gallery-900 uppercase tracking-wider">
                Especificaciones Técnicas de la Obra:
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Dimensions */}
                <div className="p-3 bg-white border border-gallery-200 rounded-xs">
                  <div className="flex items-center gap-1.5 text-gallery-400 mb-1">
                    <Maximize2 className="w-3.5 h-3.5 text-gold-700" />
                    <span className="text-[10px] uppercase tracking-wider">Dimensiones</span>
                  </div>
                  <p className="font-semibold text-gallery-900 font-mono">
                    {formatDimensions(artwork.dimensions)}
                  </p>
                </div>

                {/* Framing */}
                <div className="p-3 bg-white border border-gallery-200 rounded-xs">
                  <div className="flex items-center gap-1.5 text-gallery-400 mb-1">
                    <Box className="w-3.5 h-3.5 text-gold-700" />
                    <span className="text-[10px] uppercase tracking-wider">Enmarcado</span>
                  </div>
                  <p className="font-semibold text-gallery-900">
                    {artwork.framed ? 'Sí (Incluido)' : 'Sin Marco (Canto visto)'}
                  </p>
                </div>

                {/* Medium / Technique */}
                <div className="p-3 bg-white border border-gallery-200 rounded-xs col-span-2">
                  <div className="flex items-center gap-1.5 text-gallery-400 mb-1">
                    <Layers className="w-3.5 h-3.5 text-gold-700" />
                    <span className="text-[10px] uppercase tracking-wider">Técnica & Materiales</span>
                  </div>
                  <p className="font-medium text-gallery-800 leading-snug">
                    {artwork.medium}
                  </p>
                </div>

                {/* Support */}
                <div className="p-3 bg-white border border-gallery-200 rounded-xs col-span-2">
                  <div className="flex items-center gap-1.5 text-gallery-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-700" />
                    <span className="text-[10px] uppercase tracking-wider">Soporte y Estructura</span>
                  </div>
                  <p className="font-medium text-gallery-800 leading-snug">
                    {artwork.support}
                  </p>
                </div>
              </div>

              {/* Certificate badge */}
              <div className="flex items-center gap-2 p-2.5 bg-gold-50/70 border border-gold-200 text-xs text-gold-900 rounded-xs">
                <ShieldCheck className="w-4 h-4 text-gold-700 shrink-0" />
                <span>
                  <strong>Certificado de Autenticidad</strong> firmado a mano y sellado por el artista incluido en el envío.
                </span>
              </div>
            </div>

            {/* Double Conversion CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              {isSold ? (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-gallery-200 text-gallery-500 text-xs uppercase tracking-widest font-semibold rounded-xs cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Esta obra ya pertenece a una colección privada</span>
                  </button>
                  <button
                    onClick={() => onOpenAcquisition(artwork, 'inquiry')}
                    className="w-full py-3 px-4 bg-white hover:bg-gallery-100 text-gallery-900 border border-gallery-300 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-gold-700" />
                    <span>Encargar obra similar al artista</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Button 1: Acquire / Reserve */}
                  <button
                    onClick={() => onOpenAcquisition(artwork, 'reserve')}
                    className="w-full py-3.5 px-4 bg-gallery-900 hover:bg-gold-700 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold-300 group-hover:scale-110 transition-transform" />
                    <span>Adquirir Obra / Reservar</span>
                  </button>

                  {/* Button 2: Inquire or Make an Offer */}
                  <button
                    onClick={() => onOpenAcquisition(artwork, 'inquiry')}
                    className="w-full py-3 px-4 bg-white hover:bg-gallery-100 text-gallery-900 border border-gallery-300 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-gold-700" />
                    <span>Hacer una consulta u oferta al artista</span>
                  </button>
                </>
              )}
            </div>

            {/* Informative Accordions */}
            <div className="border-t border-gallery-200 pt-4 space-y-2">
              
              {/* Accordion 1: History / Inspiration */}
              <div className="border border-gallery-200 rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('story')}
                  className="w-full px-4 py-3 bg-gallery-50 hover:bg-gallery-100 text-left text-xs font-semibold uppercase tracking-wider text-gallery-800 flex items-center justify-between"
                >
                  <span>Historia & Inspiración de la Obra</span>
                  {openAccordion === 'story' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'story' && (
                  <div className="p-4 bg-white text-xs text-gallery-600 space-y-2 leading-relaxed">
                    <p>{artwork.description}</p>
                    <blockquote className="border-l-2 border-gold pl-3 py-0.5 italic text-gallery-700 font-serif">
                      {artwork.inspirationStory}
                    </blockquote>
                    {artwork.curatorNote && (
                      <p className="text-[11px] text-gallery-500 pt-1 border-t border-gallery-100">
                        <strong>Nota curatorial:</strong> {artwork.curatorNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Secure Shipping & Packaging */}
              <div className="border border-gallery-200 rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full px-4 py-3 bg-gallery-50 hover:bg-gallery-100 text-left text-xs font-semibold uppercase tracking-wider text-gallery-800 flex items-center justify-between"
                >
                  <span>Envío Seguro & Embalaje de Museo</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 bg-white text-xs text-gallery-600 space-y-2 leading-relaxed">
                    <p>{artwork.shippingInfo}</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-gallery-500">
                      <li>Caja de madera fenólica o contenedor rígido reforzado a medida.</li>
                      <li>Papel de seda neutro de conservación (pH neutro) libre de ácido.</li>
                      <li>Seguro a todo riesgo por el 100% del valor declarado durante el tránsito.</li>
                      <li>Número de seguimiento satelital y coordinación de entrega personalizada.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Authenticity & 14-day Returns */}
              <div className="border border-gallery-200 rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('authenticity')}
                  className="w-full px-4 py-3 bg-gallery-50 hover:bg-gallery-100 text-left text-xs font-semibold uppercase tracking-wider text-gallery-800 flex items-center justify-between"
                >
                  <span>Autenticidad & Garantía de Devolución</span>
                  {openAccordion === 'authenticity' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'authenticity' && (
                  <div className="p-4 bg-white text-xs text-gallery-600 space-y-2 leading-relaxed">
                    <p>
                      Cada cuadro se entrega acompañado de su <strong>Certificado de Autenticidad original</strong>, numerado y firmado de puño y letra por Mateo Valenzuela, con holograma de seguridad.
                    </p>
                    <p>
                      Ofrecemos un periodo de <strong>14 días naturales de prueba</strong> desde la recepción en su domicilio. Si la obra no encaja plenamente en su espacio, gestionamos la recogida y el reembolso íntegro.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

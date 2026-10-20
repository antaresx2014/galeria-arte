import React, { useState } from 'react';
import type { Artwork, ArtworkCategory } from '../../types/artwork';
import { 
  X, 
  SlidersHorizontal, 
  Plus, 
  Check, 
  Copy, 
  RotateCcw, 
  Code
} from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  onToggleStatus: (id: string) => void;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onAddArtwork: (newArtwork: Artwork) => void;
  onResetArtworks: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  artworks,
  onToggleStatus,
  onUpdatePrice,
  onAddArtwork,
  onResetArtworks
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'export'>('inventory');
  const [copiedCode, setCopiedCode] = useState(false);

  // New artwork form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Abstracto' as ArtworkCategory,
    price: 2500,
    height: 100,
    width: 80,
    depth: 4,
    medium: 'Óleo y pigmentos sobre lino belga',
    framed: true,
    primaryImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    description: 'Nueva obra original del taller.'
  });

  if (!isOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt: Artwork = {
      id: `art-${String(artworks.length + 1).padStart(3, '0')}`,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formData.title || 'Nueva Creación Plástica',
      artist: 'Mateo Valenzuela',
      year: new Date().getFullYear(),
      category: formData.category,
      price: Number(formData.price),
      status: 'available',
      dimensions: {
        height: Number(formData.height),
        width: Number(formData.width),
        depth: Number(formData.depth),
        unit: 'cm'
      },
      medium: formData.medium,
      support: 'Lienzo de lino sobre bastidor de pino de 4 cm',
      framed: formData.framed,
      frameDetails: formData.framed ? 'Marco flotante de roble natural' : 'Cantos pintados al tono',
      certificateIncluded: true,
      edition: 'Obra original única (1 de 1)',
      primaryImage: formData.primaryImage,
      galleryImages: [formData.primaryImage],
      description: formData.description,
      inspirationStory: 'Pintura desarrollada en el atelier explorando texturas minerales y silencio.',
      shippingInfo: 'Envío asegurado en contenedor rígido de madera.',
      featured: false
    };

    onAddArtwork(newArt);
    setActiveTab('inventory');
  };

  const exportTsCode = `export const INITIAL_ARTWORKS: Artwork[] = ${JSON.stringify(artworks, null, 2)};`;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(exportTsCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gallery-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-gallery-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gallery-200 bg-gallery-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold-700" />
            <h3 className="font-serif text-lg font-bold text-gallery-900">
              Panel de Administración Ligero
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gallery-400 hover:text-gallery-900 hover:bg-gallery-200 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gallery-200 text-xs font-semibold bg-gallery-100/50">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'inventory' 
                ? 'border-gold text-gallery-900 bg-white' 
                : 'border-transparent text-gallery-500 hover:text-gallery-900'
            }`}
          >
            Inventario ({artworks.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'add' 
                ? 'border-gold text-gallery-900 bg-white' 
                : 'border-transparent text-gallery-500 hover:text-gallery-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir Obra</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'export' 
                ? 'border-gold text-gallery-900 bg-white' 
                : 'border-transparent text-gallery-500 hover:text-gallery-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Exportar TS</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gallery-500 pb-2 border-b border-gallery-100">
                <span>Cambia el estado con 1 clic para ver reflejado el tag "Vendido / Sold":</span>
                <button
                  onClick={onResetArtworks}
                  className="text-xs text-gold-700 hover:text-gold-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer Obras Originales</span>
                </button>
              </div>

              <div className="space-y-3">
                {artworks.map((art) => (
                  <div 
                    key={art.id}
                    className="p-3 bg-gallery-50 hover:bg-gallery-100/60 rounded border border-gallery-200 flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={art.primaryImage}
                      alt={art.title}
                      className="w-14 h-14 object-cover rounded-xs border border-gallery-300 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gallery-400">{art.id}</span>
                        <h4 className="font-serif text-sm font-bold text-gallery-900 truncate">
                          {art.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gallery-500 truncate">
                        {art.category} • {art.dimensions.height}×{art.dimensions.width} cm
                      </p>
                      
                      {/* Price input */}
                      <div className="flex items-center gap-1.5 mt-1 text-xs">
                        <span className="text-gallery-400">Precio:</span>
                        <input
                          type="number"
                          value={art.price}
                          onChange={(e) => onUpdatePrice(art.id, Number(e.target.value))}
                          className="w-20 px-1.5 py-0.5 text-xs bg-white border border-gallery-300 rounded font-mono"
                        />
                        <span className="text-gallery-500">€</span>
                      </div>
                    </div>

                    {/* Fast Status Toggle */}
                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <button
                        onClick={() => onToggleStatus(art.id)}
                        className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          art.status === 'sold'
                            ? 'bg-red-700 text-white shadow-xs'
                            : 'bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span>{art.status === 'sold' ? 'Vendido' : 'Disponible'}</span>
                      </button>
                      <span className="text-[10px] text-gallery-400">Clic para alternar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW ARTWORK */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddNew} className="space-y-4 text-xs">
              <div>
                <label className="block text-gallery-700 font-semibold mb-1">Título de la Obra *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sinfonía en Carmín y Ceniza"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold outline-hidden text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gallery-700 font-semibold mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ArtworkCategory })}
                    className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold outline-hidden text-xs"
                  >
                    <option value="Abstracto">Abstracto</option>
                    <option value="Figurativo">Figurativo</option>
                    <option value="Paisaje">Paisaje</option>
                    <option value="Dibujo/Boceto">Dibujo/Boceto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gallery-700 font-semibold mb-1">Precio en Euros (€) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded focus:border-gold outline-hidden text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gallery-700 font-semibold mb-1">Alto (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gallery-700 font-semibold mb-1">Ancho (cm)</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gallery-700 font-semibold mb-1">Fondo (cm)</label>
                  <input
                    type="number"
                    value={formData.depth}
                    onChange={(e) => setFormData({ ...formData, depth: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gallery-700 font-semibold mb-1">Técnica y Materiales</label>
                <input
                  type="text"
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs"
                />
              </div>

              <div>
                <label className="block text-gallery-700 font-semibold mb-1">URL Imagen Principal (Alta Resolución)</label>
                <input
                  type="url"
                  required
                  value={formData.primaryImage}
                  onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                  className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs"
                />
              </div>

              <div>
                <label className="block text-gallery-700 font-semibold mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded outline-hidden text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gallery-900 hover:bg-gold-700 text-white font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm"
              >
                Añadir al Catálogo Activo
              </button>
            </form>
          )}

          {/* TAB 3: EXPORT TYPESCRIPT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-3 bg-gold-50 border border-gold-200 rounded text-xs text-gold-900">
                Puedes copiar este código TypeScript e insertarlo directamente en <code>src/data/artworks.ts</code> para conservar de forma permanente los cambios realizados.
              </div>

              <div className="relative">
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-gallery-900 text-white text-xs rounded flex items-center gap-1.5 hover:bg-gold-700 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '¡Copiado!' : 'Copiar TS'}</span>
                </button>
                <pre className="p-4 bg-gallery-900 text-gallery-200 text-[11px] font-mono rounded overflow-x-auto max-h-[400px]">
                  {exportTsCode}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gallery-100 border-t border-gallery-200 text-[11px] text-gallery-500 flex items-center justify-between">
          <span>Colección Mateo Valenzuela • Producción Frontend</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-gallery-300 text-gallery-700 rounded text-xs hover:bg-gallery-200"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};

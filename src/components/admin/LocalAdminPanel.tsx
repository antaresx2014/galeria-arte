import React, { useState } from 'react';
import type { Artwork, ArtworkCategory, ArtworkStatus } from '../../types/artwork';
import type { SiteContent } from '../../types/siteContent';
import { formatPrice } from '../../utils/formatters';
import {
  FileText,
  Palette,
  Save,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowLeft,
  Search,
} from 'lucide-react';

interface LocalAdminPanelProps {
  content: SiteContent;
  artworks: Artwork[];
  onUpdateContent: (newContent: SiteContent) => void;
  onUpdateArtworks: (newArtworks: Artwork[]) => void;
  onExitAdmin: () => void;
}

export const LocalAdminPanel: React.FC<LocalAdminPanelProps> = ({
  content,
  artworks,
  onUpdateContent,
  onUpdateArtworks,
  onExitAdmin,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'content' | 'catalog'>('catalog');
  
  // Local editable copies
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [localArtworks, setLocalArtworks] = useState<Artwork[]>(artworks);

  // Content sub-sections
  const [contentSection, setContentSection] = useState<'artist' | 'hero' | 'contact' | 'guarantees' | 'footer'>('artist');

  // Catalog search & filter
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilterCategory, setCatalogFilterCategory] = useState<string>('all');

  // Modal for editing/adding artwork
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isNewArtwork, setIsNewArtwork] = useState(false);
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Guardar Textos físicamente en src/data/siteContent.json
  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/local-admin/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: localContent }),
      });
      const data = await response.json();
      if (data.success) {
        onUpdateContent(localContent);
        showToast('✅ Textos guardados físicamente en src/data/siteContent.json');
      } else {
        showToast('❌ Error: ' + (data.error || 'No se pudo guardar'), 'error');
      }
    } catch (err: any) {
      showToast('❌ Error de conexión con el servidor Vite: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Guardar Catálogo físicamente en src/data/catalog.json
  const handleSaveCatalog = async (artworksToSave = localArtworks) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/local-admin/save-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalog: artworksToSave }),
      });
      const data = await response.json();
      if (data.success) {
        onUpdateArtworks(artworksToSave);
        showToast(`✅ Catálogo de ${artworksToSave.length} obras guardado físicamente en src/data/catalog.json`);
      } else {
        showToast('❌ Error: ' + (data.error || 'No se pudo guardar'), 'error');
      }
    } catch (err: any) {
      showToast('❌ Error de conexión con el servidor Vite: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Subir imagen localmente y convertirla a WebP mediante Sharp
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingArtwork) return;

    setIsUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch('/api/local-admin/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64 }),
        });
        const data = await res.json();
        if (data.success) {
          setEditingArtwork({
            ...editingArtwork,
            primaryImage: data.path,
            galleryImages: [data.path],
          });
          showToast(`📸 Imagen optimizada a WebP y guardada en ${data.path}`);
        } else {
          showToast('❌ Error al procesar imagen: ' + data.error, 'error');
        }
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('❌ Error al subir imagen: ' + err.message, 'error');
      setIsUploadingImage(false);
    }
  };

  // Acciones CRUD de Obras
  const handleOpenAddArtwork = () => {
    const nextNum = localArtworks.length + 1;
    const nextId = `art-${String(nextNum).padStart(3, '0')}`;
    setEditingArtwork({
      id: nextId,
      slug: `obra-${String(nextNum).padStart(3, '0')}-nueva-obra`,
      title: 'Nueva Obra Sin Título',
      artist: 'Tomás Odión',
      year: new Date().getFullYear(),
      category: 'Figurativo',
      price: 2500,
      status: 'available',
      dimensions: {
        height: 80,
        width: 100,
        depth: 3.5,
        unit: 'cm',
      },
      medium: 'Óleo y técnica mixta con empastes densos sobre lino belga',
      support: 'Lienzo de algodón sobre bastidor macizo',
      framed: true,
      frameDetails: 'Marco flotante en roble macizo lacado artesanal',
      certificateIncluded: true,
      edition: 'Obra original única (1 de 1)',
      primaryImage: '/obras/obra-001-gallinazos.webp',
      galleryImages: ['/obras/obra-001-gallinazos.webp'],
      description: 'Análisis formal y cromático de la pieza realizada en el taller de Barcelona.',
      inspirationStory: 'Inspirada en el diálogo matérico entre textura, silencio y pulsión viva.',
      shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
      featured: false,
    });
    setIsNewArtwork(true);
    setIsArtworkModalOpen(true);
  };

  const handleOpenEditArtwork = (artwork: Artwork) => {
    setEditingArtwork({ ...artwork });
    setIsNewArtwork(false);
    setIsArtworkModalOpen(true);
  };

  const handleSaveArtworkForm = () => {
    if (!editingArtwork) return;

    let updatedList: Artwork[];
    if (isNewArtwork) {
      updatedList = [editingArtwork, ...localArtworks];
    } else {
      updatedList = localArtworks.map((a) => (a.id === editingArtwork.id ? editingArtwork : a));
    }

    setLocalArtworks(updatedList);
    setIsArtworkModalOpen(false);
    handleSaveCatalog(updatedList);
  };

  const handleDeleteArtwork = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar permanentemente la obra "${title}" del catálogo?`)) {
      const updated = localArtworks.filter((a) => a.id !== id);
      setLocalArtworks(updated);
      handleSaveCatalog(updated);
    }
  };

  const handleToggleArtworkStatus = (id: string) => {
    const updated = localArtworks.map((a) => {
      if (a.id === id) {
        const nextStatus: ArtworkStatus = a.status === 'available' ? 'sold' : 'available';
        return { ...a, status: nextStatus };
      }
      return a;
    });
    setLocalArtworks(updated);
    handleSaveCatalog(updated);
  };

  // Filtrado catálogo
  const filteredCatalog = localArtworks.filter((art) => {
    const matchSearch =
      art.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      art.medium.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      art.id.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchCategory =
      catalogFilterCategory === 'all' || art.category === catalogFilterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gallery-100 text-gallery-900 font-sans pb-24">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded shadow-2xl flex items-center gap-3 text-sm font-medium animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-gallery-900 text-white border-l-4 border-gold'
              : 'bg-red-900 text-white border-l-4 border-red-500'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-gold" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main CMS Header */}
      <header className="bg-gallery-900 text-white border-b border-gallery-800 shadow-lg sticky top-9 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="p-2 bg-gallery-800 hover:bg-gold-700 text-gallery-200 hover:text-white rounded transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Volver a la vista del cliente"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Web Cliente</span>
            </button>
            <div className="border-l border-gallery-700 pl-3">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                CMS Local de Tomás Odión
                <span className="text-[10px] uppercase font-sans font-semibold tracking-widest px-2 py-0.5 rounded bg-gold/20 text-gold-300 border border-gold/40">
                  Físico
                </span>
              </h1>
              <p className="text-xs text-gallery-400">
                Escribiendo directamente en <code>src/data/siteContent.json</code> y <code>src/data/catalog.json</code>
              </p>
            </div>
          </div>

          {/* Master Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'catalog'
                  ? 'bg-gold text-gallery-950 shadow-md font-bold'
                  : 'bg-gallery-800 text-gallery-300 hover:text-white hover:bg-gallery-700'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Catálogo ({localArtworks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'content'
                  ? 'bg-gold text-gallery-950 shadow-md font-bold'
                  : 'bg-gallery-800 text-gallery-300 hover:text-white hover:bg-gallery-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Textos de la Web</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: GESTOR DE CATÁLOGO CRUD                                             */}
        {/* ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-5 rounded-xs border border-gallery-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative min-w-[240px] flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gallery-400" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Buscar por título, técnica o ID..."
                    className="w-full pl-9 pr-3 py-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:outline-none focus:border-gold-600 focus:bg-white"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={catalogFilterCategory}
                  onChange={(e) => setCatalogFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gallery-50 border border-gallery-300 rounded text-xs text-gallery-700 focus:outline-none focus:border-gold-600"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="Figurativo">Figurativo</option>
                  <option value="Paisaje">Paisaje</option>
                  <option value="Abstracto">Abstracto</option>
                  <option value="Dibujo/Boceto">Dibujo / Boceto</option>
                </select>

                <div className="text-xs text-gallery-500 font-medium">
                  Mostrando <b>{filteredCatalog.length}</b> de {localArtworks.length} obras
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenAddArtwork}
                  className="px-4 py-2.5 bg-gallery-900 hover:bg-gold-700 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nueva Obra</span>
                </button>

                <button
                  onClick={() => handleSaveCatalog()}
                  disabled={isSaving}
                  className="px-4 py-2.5 bg-gold-600 hover:bg-gold-700 text-gallery-950 font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Guardando...' : 'Guardar en catalog.json'}</span>
                </button>
              </div>
            </div>

            {/* Artworks Table / Cards Grid */}
            <div className="bg-white rounded-xs border border-gallery-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gallery-50 border-b border-gallery-200 text-gallery-500 uppercase tracking-wider font-medium text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Obra</th>
                      <th className="py-3.5 px-4">Categoría & Año</th>
                      <th className="py-3.5 px-4">Dimensiones</th>
                      <th className="py-3.5 px-4">Técnica</th>
                      <th className="py-3.5 px-4">Precio</th>
                      <th className="py-3.5 px-4 text-center">Estado</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gallery-200 text-gallery-700">
                    {filteredCatalog.map((art) => (
                      <tr key={art.id} className="hover:bg-gallery-50/70 transition-colors">
                        {/* Artwork info & thumb */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={art.primaryImage}
                              alt={art.title}
                              className="w-12 h-14 object-cover rounded-xs border border-gallery-200 shrink-0 bg-gallery-100"
                            />
                            <div>
                              <p className="font-serif font-bold text-gallery-900 text-sm">
                                {art.title}
                              </p>
                              <p className="text-[11px] text-gallery-400 font-mono">
                                {art.id} • {art.slug}
                              </p>
                              {art.featured && (
                                <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider font-semibold text-gold-700 bg-gold-50 px-1.5 py-0.2 rounded border border-gold-200">
                                  Portada (Hero)
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category & Year */}
                        <td className="py-3 px-4">
                          <span className="font-medium text-gallery-900">{art.category}</span>
                          <span className="block text-[11px] text-gallery-400">{art.year}</span>
                        </td>

                        {/* Dimensions */}
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {art.dimensions.height} × {art.dimensions.width} × {art.dimensions.depth} cm
                        </td>

                        {/* Technique */}
                        <td className="py-3 px-4 max-w-xs truncate" title={art.medium}>
                          {art.medium}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-serif font-bold text-gallery-900 text-sm">
                          {formatPrice(art.price)}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleArtworkStatus(art.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors uppercase tracking-wider ${
                              art.status === 'available'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                                : 'bg-red-50 text-red-700 border border-red-300 hover:bg-red-100'
                            }`}
                            title="Haz clic para alternar estado"
                          >
                            {art.status === 'available' ? 'Disponible' : 'Vendido'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditArtwork(art)}
                              className="p-1.5 text-gallery-600 hover:text-gold-700 hover:bg-gallery-100 rounded transition-colors"
                              title="Editar cuadro"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArtwork(art.id, art.title)}
                              className="p-1.5 text-gallery-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Eliminar del catálogo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EDITOR DE TEXTOS DE LA WEB                                         */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-xs border border-gallery-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              {/* Sections Switcher */}
              <div className="flex flex-wrap gap-1 bg-gallery-100 p-1 rounded">
                <button
                  onClick={() => setContentSection('artist')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    contentSection === 'artist' ? 'bg-white text-gallery-900 shadow-xs' : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  El Artista & Barcelona
                </button>
                <button
                  onClick={() => setContentSection('hero')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    contentSection === 'hero' ? 'bg-white text-gallery-900 shadow-xs' : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  Portada & Hero
                </button>
                <button
                  onClick={() => setContentSection('contact')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    contentSection === 'contact' ? 'bg-white text-gallery-900 shadow-xs' : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  Contacto & Cabecera
                </button>
                <button
                  onClick={() => setContentSection('guarantees')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    contentSection === 'guarantees' ? 'bg-white text-gallery-900 shadow-xs' : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  Garantías & Envíos
                </button>
                <button
                  onClick={() => setContentSection('footer')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    contentSection === 'footer' ? 'bg-white text-gallery-900 shadow-xs' : 'text-gallery-600 hover:text-gallery-900'
                  }`}
                >
                  Pie de Página (Footer)
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-700 text-gallery-950 font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Guardando...' : 'Guardar en siteContent.json'}</span>
              </button>
            </div>

            {/* Form Sections */}
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-gallery-200 shadow-sm space-y-6">
              
              {/* SECTION: EL ARTISTA */}
              {contentSection === 'artist' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gallery-900">
                      Identidad del Artista & Atelier en Barcelona
                    </h2>
                    <p className="text-xs text-gallery-500">
                      Información biográfica, citas de autor, trayectoria y premios en <code>src/data/siteContent.json</code>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Nombre del Artista</label>
                      <input
                        type="text"
                        value={localContent.artist.name}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, name: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Ubicación del Atelier</label>
                      <input
                        type="text"
                        value={localContent.artist.location}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, location: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Lema o Tagline Artístico</label>
                      <input
                        type="text"
                        value={localContent.artist.tagline}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, tagline: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Cita / Declaración de Autor (Statement)</label>
                      <textarea
                        rows={2}
                        value={localContent.artist.statement}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, statement: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Biografía Principal</label>
                      <textarea
                        rows={3}
                        value={localContent.artist.bio}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, bio: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Investigación Matérica Extendida</label>
                      <textarea
                        rows={3}
                        value={localContent.artist.bioExtended}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            artist: { ...localContent.artist, bioExtended: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="pt-4 border-t border-gallery-200">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gallery-800 mb-3">Estadísticas de Colección</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-gallery-500 mb-1">Obras en Colecciones</label>
                        <input
                          type="text"
                          value={localContent.artist.stats.worksInCollections}
                          onChange={(e) =>
                            setLocalContent({
                              ...localContent,
                              artist: {
                                ...localContent.artist,
                                stats: { ...localContent.artist.stats, worksInCollections: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gallery-500 mb-1">Países con Coleccionistas</label>
                        <input
                          type="text"
                          value={localContent.artist.stats.countriesCollected}
                          onChange={(e) =>
                            setLocalContent({
                              ...localContent,
                              artist: {
                                ...localContent.artist,
                                stats: { ...localContent.artist.stats, countriesCollected: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gallery-500 mb-1">Años de Trayectoria</label>
                        <input
                          type="text"
                          value={localContent.artist.stats.yearsActive}
                          onChange={(e) =>
                            setLocalContent({
                              ...localContent,
                              artist: {
                                ...localContent.artist,
                                stats: { ...localContent.artist.stats, yearsActive: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gallery-500 mb-1">Porcentaje Piezas Únicas</label>
                        <input
                          type="text"
                          value={localContent.artist.stats.uniquePiecesPercent}
                          onChange={(e) =>
                            setLocalContent({
                              ...localContent,
                              artist: {
                                ...localContent.artist,
                                stats: { ...localContent.artist.stats, uniquePiecesPercent: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: HERO / PORTADA */}
              {contentSection === 'hero' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gallery-900">Textos de Portada & Hero</h2>
                    <p className="text-xs text-gallery-500">Titulares de impacto editorial y botones de llamada a la acción.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Distintivo Superior (Badge)</label>
                      <input
                        type="text"
                        value={localContent.hero.badge}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, badge: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Prefijo de Atelier</label>
                      <input
                        type="text"
                        value={localContent.hero.atelierPrefix}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, atelierPrefix: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Título Principal (Línea 1)</label>
                      <input
                        type="text"
                        value={localContent.hero.mainTitle}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, mainTitle: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Título Resaltado en Cursiva (Línea 2)</label>
                      <input
                        type="text"
                        value={localContent.hero.mainTitleHighlight}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, mainTitleHighlight: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Texto Botón Primario</label>
                      <input
                        type="text"
                        value={localContent.hero.exploreBtnText}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, exploreBtnText: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Texto Botón Secundario (Salón)</label>
                      <input
                        type="text"
                        value={localContent.hero.featuredBtnText}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, featuredBtnText: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: CONTACTO & CABECERA */}
              {contentSection === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gallery-900">Contacto & Barra Superior</h2>
                    <p className="text-xs text-gallery-500">Datos de atención y enlaces directos de conversión.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">WhatsApp Internacional (con +34)</label>
                      <input
                        type="text"
                        value={localContent.contact.whatsappNumber}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            contact: { ...localContent.contact, whatsappNumber: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Teléfono Visible en Interfaz</label>
                      <input
                        type="text"
                        value={localContent.contact.phoneDisplay}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            contact: { ...localContent.contact, phoneDisplay: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Email de Adquisiciones</label>
                      <input
                        type="email"
                        value={localContent.contact.contactEmail}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            contact: { ...localContent.contact, contactEmail: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Dirección del Estudio</label>
                      <input
                        type="text"
                        value={localContent.contact.studioAddress}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            contact: { ...localContent.contact, studioAddress: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Aviso Superior Izquierda</label>
                      <input
                        type="text"
                        value={localContent.navbar.topNoticeLeft}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            navbar: { ...localContent.navbar, topNoticeLeft: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Aviso Central de Transporte & Certificado</label>
                      <input
                        type="text"
                        value={localContent.navbar.topNoticeCenter}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            navbar: { ...localContent.navbar, topNoticeCenter: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: GARANTÍAS & ENVÍOS */}
              {contentSection === 'guarantees' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gallery-900">Garantías & Propuesta de Valor</h2>
                    <p className="text-xs text-gallery-500">Textos de confianza para el coleccionista (Certificado 1/1, Caja de Madera, 14 Días).</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gallery-50 rounded border border-gallery-200">
                      <label className="block text-xs font-bold text-gallery-900 mb-1">1. Certificado de Autenticidad</label>
                      <input
                        type="text"
                        value={localContent.guarantees.authenticity.title}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              authenticity: { ...localContent.guarantees.authenticity, title: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs mb-2 font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={localContent.guarantees.authenticity.description}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              authenticity: { ...localContent.guarantees.authenticity, description: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="p-4 bg-gallery-50 rounded border border-gallery-200">
                      <label className="block text-xs font-bold text-gallery-900 mb-1">2. Transporte Asegurado Especializado</label>
                      <input
                        type="text"
                        value={localContent.guarantees.shipping.title}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              shipping: { ...localContent.guarantees.shipping, title: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs mb-2 font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={localContent.guarantees.shipping.description}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              shipping: { ...localContent.guarantees.shipping, description: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="p-4 bg-gallery-50 rounded border border-gallery-200">
                      <label className="block text-xs font-bold text-gallery-900 mb-1">3. Prueba en tu Hogar (14 días)</label>
                      <input
                        type="text"
                        value={localContent.guarantees.trial.title}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              trial: { ...localContent.guarantees.trial, title: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs mb-2 font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={localContent.guarantees.trial.description}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            guarantees: {
                              ...localContent.guarantees,
                              trial: { ...localContent.guarantees.trial, description: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 bg-white border border-gallery-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: PIE DE PÁGINA */}
              {contentSection === 'footer' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-gallery-900">Textos del Pie de Página (Footer)</h2>
                    <p className="text-xs text-gallery-500">Descripción institucional y notas de propiedad intelectual.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Subtítulo Institucional</label>
                      <input
                        type="text"
                        value={localContent.footer.subtitle}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            footer: { ...localContent.footer, subtitle: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Descripción del Taller / Galería</label>
                      <textarea
                        rows={3}
                        value={localContent.footer.brandDescription}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            footer: { ...localContent.footer, brandDescription: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gallery-700 mb-1">Aviso Legal de Copyright</label>
                      <input
                        type="text"
                        value={localContent.footer.copyrightNotice}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            footer: { ...localContent.footer, copyrightNotice: e.target.value },
                          })
                        }
                        className="w-full p-2.5 bg-gallery-50 border border-gallery-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: AÑADIR / EDITAR OBRA (CRUD)                                         */}
      {/* ========================================================================= */}
      {isArtworkModalOpen && editingArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gallery-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xs shadow-2xl flex flex-col border border-gallery-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gallery-200 bg-gallery-50 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gallery-900">
                  {isNewArtwork ? '✨ Añadir Nueva Obra al Catálogo' : `✏️ Editar Obra: ${editingArtwork.title}`}
                </h3>
                <p className="text-xs text-gallery-500">
                  Los cambios se escribirán físicamente en <code>src/data/catalog.json</code>
                </p>
              </div>
              <button
                onClick={() => setIsArtworkModalOpen(false)}
                className="text-gallery-400 hover:text-gallery-900 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* Image Uploader & Preview */}
              <div className="p-4 bg-gallery-50 border border-gallery-200 rounded flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative w-32 h-36 bg-gallery-200 rounded border border-gallery-300 overflow-hidden shrink-0">
                  <img
                    src={editingArtwork.primaryImage}
                    alt={editingArtwork.title}
                    className="w-full h-full object-cover"
                  />
                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-semibold">
                      Optimizando...
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-gallery-900 text-xs">Fotografía de la Obra (WebP)</h4>
                  <p className="text-[11px] text-gallery-500 leading-relaxed">
                    Sube cualquier foto desde tu móvil o Google Drive (JPG, PNG o HEIC). El servidor local la redimensionará a máx. 1600px, la comprimirá a WebP al 82% y la guardará en <code>public/obras/</code>.
                  </p>
                  
                  <div className="flex items-center gap-3 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-gallery-900 hover:bg-gold-700 text-white rounded text-xs font-semibold transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingImage ? 'Procesando...' : 'Subir y Convertir a WebP'}</span>
                      <input
                        type="file"
                        accept="image/*,.heic,.heif"
                        onChange={handleImageFileChange}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    <span className="text-[11px] text-gallery-400 font-mono truncate max-w-xs">
                      {editingArtwork.primaryImage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Título de la Obra</label>
                  <input
                    type="text"
                    value={editingArtwork.title}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, title: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Slug / Identificador URL</label>
                  <input
                    type="text"
                    value={editingArtwork.slug}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, slug: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Categoría</label>
                  <select
                    value={editingArtwork.category}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, category: e.target.value as ArtworkCategory })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  >
                    <option value="Figurativo">Figurativo</option>
                    <option value="Paisaje">Paisaje</option>
                    <option value="Abstracto">Abstracto</option>
                    <option value="Dibujo/Boceto">Dibujo / Boceto</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Año de Realización</label>
                  <input
                    type="number"
                    value={editingArtwork.year}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, year: Number(e.target.value) })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Precio (€)</label>
                  <input
                    type="number"
                    value={editingArtwork.price}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, price: Number(e.target.value) })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gallery-700 mb-1">Estado de Disponibilidad</label>
                  <select
                    value={editingArtwork.status}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, status: e.target.value as ArtworkStatus })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  >
                    <option value="available">Disponible para Adquisición</option>
                    <option value="sold">Vendido (Colección Privada)</option>
                  </select>
                </div>

                {/* Dimensiones */}
                <div className="md:col-span-2 grid grid-cols-3 gap-3 p-3 bg-gallery-50 rounded border border-gallery-200">
                  <div>
                    <label className="block text-[11px] text-gallery-600 mb-1">Alto (cm)</label>
                    <input
                      type="number"
                      value={editingArtwork.dimensions.height}
                      onChange={(e) =>
                        setEditingArtwork({
                          ...editingArtwork,
                          dimensions: { ...editingArtwork.dimensions, height: Number(e.target.value) },
                        })
                      }
                      className="w-full p-1.5 bg-white border border-gallery-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gallery-600 mb-1">Ancho (cm)</label>
                    <input
                      type="number"
                      value={editingArtwork.dimensions.width}
                      onChange={(e) =>
                        setEditingArtwork({
                          ...editingArtwork,
                          dimensions: { ...editingArtwork.dimensions, width: Number(e.target.value) },
                        })
                      }
                      className="w-full p-1.5 bg-white border border-gallery-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gallery-600 mb-1">Fondo / Bastidor (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingArtwork.dimensions.depth}
                      onChange={(e) =>
                        setEditingArtwork({
                          ...editingArtwork,
                          dimensions: { ...editingArtwork.dimensions, depth: Number(e.target.value) },
                        })
                      }
                      className="w-full p-1.5 bg-white border border-gallery-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gallery-700 mb-1">Técnica Física y Materiales</label>
                  <input
                    type="text"
                    value={editingArtwork.medium}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, medium: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gallery-700 mb-1">Soporte</label>
                  <input
                    type="text"
                    value={editingArtwork.support}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, support: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gallery-700 mb-1">Detalles del Marco</label>
                  <input
                    type="text"
                    value={editingArtwork.frameDetails}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, frameDetails: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gallery-700 mb-1">Descripción Formal & Análisis Curatorial</label>
                  <textarea
                    rows={3}
                    value={editingArtwork.description}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, description: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white leading-relaxed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gallery-700 mb-1">Historia de Inspiración en el Atelier</label>
                  <textarea
                    rows={2}
                    value={editingArtwork.inspirationStory}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, inspirationStory: e.target.value })}
                    className="w-full p-2 bg-gallery-50 border border-gallery-300 rounded text-xs focus:bg-white leading-relaxed"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={editingArtwork.featured || false}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, featured: e.target.checked })}
                    className="w-4 h-4 text-gold rounded border-gallery-300"
                  />
                  <label htmlFor="featured-check" className="text-xs font-semibold text-gallery-800">
                    Destacar esta obra en la portada principal (Hero)
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gallery-100 border-t border-gallery-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsArtworkModalOpen(false)}
                className="px-4 py-2 border border-gallery-300 text-gallery-700 hover:bg-gallery-200 rounded text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveArtworkForm}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-700 text-gallery-950 font-bold rounded text-xs uppercase tracking-wider shadow-sm"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

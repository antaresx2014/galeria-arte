import { useState, useMemo } from 'react';
import type { Artwork, FilterState } from './types/artwork';
import { INITIAL_ARTWORKS } from './data/artworks';
import { getSizeCategory } from './utils/formatters';

// Components
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { ArtworkFilter } from './components/catalog/ArtworkFilter';
import { ArtworkGrid } from './components/catalog/ArtworkGrid';
import { ArtworkDetailModal } from './components/modal/ArtworkDetailModal';
import { AcquisitionModal } from './components/modal/AcquisitionModal';
import { ArtistSection } from './components/artist/ArtistSection';
import { AdminDrawer } from './components/admin/AdminDrawer';
import { Footer } from './components/layout/Footer';

export function App() {
  // Inventory state
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);

  // Filters & sorting state
  const [filters, setFilters] = useState<FilterState>({
    category: 'Todos',
    size: 'Todos',
    status: 'Todos',
    sortBy: 'featured',
    searchQuery: '',
  });

  // Modal states
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'gallery' | 'room'>('gallery');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Quick Acquisition / Inquiry modal state
  const [acquisitionState, setAcquisitionState] = useState<{
    isOpen: boolean;
    artwork: Artwork | null;
    mode: 'reserve' | 'inquiry';
  }>({
    isOpen: false,
    artwork: null,
    mode: 'reserve',
  });

  // Admin drawer state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Counts
  const availableCount = useMemo(() => {
    return artworks.filter((a) => a.status === 'available').length;
  }, [artworks]);

  const soldCount = useMemo(() => {
    return artworks.filter((a) => a.status === 'sold').length;
  }, [artworks]);

  // Featured artwork for Hero
  const featuredArtwork = useMemo(() => {
    return artworks.find((a) => a.featured) || artworks[0];
  }, [artworks]);

  // Filtered & Sorted artworks calculation
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // Search query
        if (filters.searchQuery.trim() !== '') {
          const query = filters.searchQuery.toLowerCase();
          const matchTitle = art.title.toLowerCase().includes(query);
          const matchMedium = art.medium.toLowerCase().includes(query);
          const matchCategory = art.category.toLowerCase().includes(query);
          const matchDesc = art.description.toLowerCase().includes(query);
          if (!matchTitle && !matchMedium && !matchCategory && !matchDesc) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'Todos' && art.category !== filters.category) {
          return false;
        }

        // Size filter
        if (filters.size !== 'Todos') {
          const sizeCat = getSizeCategory(art.dimensions);
          if (sizeCat !== filters.size) {
            return false;
          }
        }

        // Status filter
        if (filters.status === 'Disponibles' && art.status !== 'available') {
          return false;
        }
        if (filters.status === 'Vendidos' && art.status !== 'sold') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (filters.sortBy === 'year-desc') {
          return b.year - a.year;
        }
        if (filters.sortBy === 'size-desc') {
          const areaA = a.dimensions.height * a.dimensions.width;
          const areaB = b.dimensions.height * b.dimensions.width;
          return areaB - areaA;
        }
        // 'featured'
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [artworks, filters]);

  // Handlers for Artwork selection
  const handleOpenDetail = (artwork: Artwork, tab: 'gallery' | 'room' = 'gallery') => {
    setSelectedArtwork(artwork);
    setModalInitialTab(tab);
    setIsDetailModalOpen(true);
  };

  const handleOpenAcquisition = (artwork: Artwork, mode: 'reserve' | 'inquiry') => {
    setAcquisitionState({
      isOpen: true,
      artwork,
      mode,
    });
  };

  // Admin inventory handlers
  const handleToggleStatus = (id: string) => {
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          return {
            ...art,
            status: art.status === 'available' ? 'sold' : 'available',
          };
        }
        return art;
      })
    );
    // If selected artwork is updated, update its instance
    if (selectedArtwork && selectedArtwork.id === id) {
      setSelectedArtwork((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'available' ? 'sold' : 'available',
            }
          : null
      );
    }
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, price: newPrice } : art))
    );
  };

  const handleAddArtwork = (newArt: Artwork) => {
    setArtworks((prev) => [newArt, ...prev]);
  };

  const handleResetArtworks = () => {
    setArtworks(INITIAL_ARTWORKS);
  };

  return (
    <div className="min-h-screen bg-gallery-50 text-gallery-900 font-sans flex flex-col selection:bg-gold-100 selection:text-gold-900">
      
      {/* Editorial Luxury Header / Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        artworksCount={artworks.length}
      />

      <main className="flex-1">
        {/* Hero Section Editorial */}
        <Hero
          featuredArtwork={featuredArtwork}
          onSelectArtwork={(art) => handleOpenDetail(art, 'room')}
        />

        {/* Dynamic Filtering, Searching & Sorting */}
        <ArtworkFilter
          filters={filters}
          onFilterChange={setFilters}
          totalCount={artworks.length}
          filteredCount={filteredArtworks.length}
          availableCount={availableCount}
          soldCount={soldCount}
        />

        {/* Artworks Catalog Grid */}
        <ArtworkGrid
          artworks={filteredArtworks}
          onSelectArtwork={(art) => handleOpenDetail(art, 'gallery')}
          onQuickViewInRoom={(art) => handleOpenDetail(art, 'room')}
          onResetFilters={() =>
            setFilters({
              category: 'Todos',
              size: 'Todos',
              status: 'Todos',
              sortBy: 'featured',
              searchQuery: '',
            })
          }
        />

        {/* Artist Biography & Studio Section */}
        <ArtistSection />
      </main>

      {/* Luxury Footer with VIP circle */}
      <Footer />

      {/* Product Detail Modal (Saatchi Art & Crystal Dream IX style) */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        isOpen={isDetailModalOpen}
        initialTab={modalInitialTab}
        onClose={() => setIsDetailModalOpen(false)}
        onOpenAcquisition={handleOpenAcquisition}
      />

      {/* Fast Acquisition / WhatsApp / Inquiry Modal */}
      {acquisitionState.artwork && (
        <AcquisitionModal
          artwork={acquisitionState.artwork}
          mode={acquisitionState.mode}
          isOpen={acquisitionState.isOpen}
          onClose={() =>
            setAcquisitionState((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}

      {/* Lightweight Admin Panel Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        artworks={artworks}
        onToggleStatus={handleToggleStatus}
        onUpdatePrice={handleUpdatePrice}
        onAddArtwork={handleAddArtwork}
        onResetArtworks={handleResetArtworks}
      />

    </div>
  );
}

export default App;

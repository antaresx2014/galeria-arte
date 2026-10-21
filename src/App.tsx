import { useState, useMemo } from 'react';
import type { Artwork, FilterState } from './types/artwork';
import type { SiteContent } from './types/siteContent';
import { INITIAL_ARTWORKS, INITIAL_SITE_CONTENT } from './data/artworks';
import { getSizeCategory } from './utils/formatters';

// Client Components
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { ArtworkFilter } from './components/catalog/ArtworkFilter';
import { ArtworkGrid } from './components/catalog/ArtworkGrid';
import { ArtworkDetailModal } from './components/modal/ArtworkDetailModal';
import { AcquisitionModal } from './components/modal/AcquisitionModal';
import { ArtistSection } from './components/artist/ArtistSection';
import { Footer } from './components/layout/Footer';

// Local-First Admin Components (Exclusive for DEV)
import { DevEnvironmentBar } from './components/admin/DevEnvironmentBar';
import { LocalAdminPanel } from './components/admin/LocalAdminPanel';

export function App() {
  // 1. Single source of truth states
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);

  // 2. Local-First Dev View Mode (Client View vs Local Admin CMS)
  const isDev = import.meta.env.DEV;
  const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');

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
        if (filters.sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        }
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
        return 0;
      });
  }, [artworks, filters]);

  const handleOpenDetail = (artwork: Artwork, tab: 'gallery' | 'room' = 'gallery') => {
    setSelectedArtwork(artwork);
    setModalInitialTab(tab);
    setIsDetailModalOpen(true);
  };

  const handleOpenAcquisition = (artwork: Artwork, mode: 'reserve' | 'inquiry' = 'reserve') => {
    setAcquisitionState({
      isOpen: true,
      artwork,
      mode,
    });
  };

  return (
    <div className="min-h-screen bg-gallery-50 text-gallery-900 font-sans flex flex-col selection:bg-gold-100 selection:text-gold-900">
      
      {/* 1. DEV Environment Top Switcher (Rendered ONLY in local development) */}
      {isDev && (
        <DevEnvironmentBar
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          artworksCount={artworks.length}
        />
      )}

      {/* 2. MODE: Local Admin CMS (Rendered ONLY when dev switches to admin mode) */}
      {isDev && viewMode === 'admin' ? (
        <LocalAdminPanel
          content={siteContent}
          artworks={artworks}
          onUpdateContent={setSiteContent}
          onUpdateArtworks={setArtworks}
          onExitAdmin={() => setViewMode('client')}
        />
      ) : (
        /* 3. MODE: Pure Public Client Gallery View (Shown in Production & Client Preview) */
        <>
          {/* Editorial Luxury Header / Navigation */}
          <Navbar
            siteContent={siteContent}
            artworksCount={artworks.length}
          />

          <main className="flex-1">
            {/* Hero Section Editorial */}
            <Hero
              featuredArtwork={featuredArtwork}
              onSelectArtwork={(art) => handleOpenDetail(art, 'room')}
              siteContent={siteContent}
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
            <ArtistSection siteContent={siteContent} />
          </main>

          {/* Luxury Footer with VIP circle */}
          <Footer siteContent={siteContent} />

          {/* Product Detail Modal */}
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
        </>
      )}

    </div>
  );
}

export default App;

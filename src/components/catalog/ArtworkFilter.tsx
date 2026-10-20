import React from 'react';
import type { FilterState, ArtworkCategory } from '../../types/artwork';
import { Search, X, RotateCcw, ArrowUpDown } from 'lucide-react';

interface ArtworkFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
  availableCount: number;
  soldCount: number;
}

const CATEGORIES: ('Todos' | ArtworkCategory)[] = [
  'Todos',
  'Abstracto',
  'Figurativo',
  'Paisaje',
  'Dibujo/Boceto'
];

const SIZES: { label: string; value: FilterState['size']; hint: string }[] = [
  { label: 'Todos los Tamaños', value: 'Todos', hint: '' },
  { label: 'Pequeño', value: 'Pequeño', hint: '< 50 cm' },
  { label: 'Mediano', value: 'Mediano', hint: '50 - 100 cm' },
  { label: 'Grande', value: 'Grande', hint: '> 100 cm' },
];

export const ArtworkFilter: React.FC<ArtworkFilterProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
  availableCount,
  soldCount
}) => {
  const isFiltered = 
    filters.category !== 'Todos' ||
    filters.size !== 'Todos' ||
    filters.status !== 'Todos' ||
    filters.searchQuery.trim() !== '' ||
    filters.sortBy !== 'featured';

  const resetFilters = () => {
    onFilterChange({
      category: 'Todos',
      size: 'Todos',
      status: 'Todos',
      sortBy: 'featured',
      searchQuery: ''
    });
  };

  return (
    <div className="w-full bg-white border-y border-gallery-200 py-6 px-4 sm:px-6 lg:px-8 mb-8 sticky top-[80px] z-20 backdrop-blur-md bg-white/95 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Line: Search & Sort + Counter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gallery-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por título, técnica, pigmento o temática..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-gallery-50 border border-gallery-200 focus:border-gold focus:bg-white rounded transition-colors outline-hidden placeholder:text-gallery-400"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gallery-400 hover:text-gallery-700"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Counts and Sorting */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
            <span className="text-gallery-500 font-mono">
              Mostrando <strong className="text-gallery-900 font-bold">{filteredCount}</strong> de {totalCount} obras
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-gallery-50 border border-gallery-200 px-2.5 py-1.5 rounded">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-700" />
              <label htmlFor="sort-select" className="sr-only">Ordenar por</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="bg-transparent text-xs text-gallery-800 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Destacadas del Taller</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="year-desc">Año: Más recientes</option>
                <option value="size-desc">Dimensiones: Mayor tamaño</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Line: Category Tabs (Saatchi Art Style) */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-gallery-100">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <span className="text-xs uppercase tracking-wider text-gallery-400 font-semibold mr-1 hidden sm:inline">
              Categoría:
            </span>
            {CATEGORIES.map((cat) => {
              const active = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                    active
                      ? 'bg-gallery-900 text-white shadow-xs'
                      : 'bg-gallery-100/80 text-gallery-700 hover:bg-gallery-200/80 hover:text-gallery-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Size & Status Badges */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            
            {/* Size Dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-gallery-400 font-medium hidden lg:inline">Tamaño:</span>
              <select
                value={filters.size}
                onChange={(e) => onFilterChange({ ...filters, size: e.target.value as FilterState['size'] })}
                className="bg-gallery-50 border border-gallery-200 text-gallery-800 px-2.5 py-1.5 rounded text-xs focus:outline-hidden cursor-pointer"
              >
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} {s.hint ? `(${s.hint})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter (Available vs Sold) */}
            <div className="inline-flex rounded-sm p-0.5 bg-gallery-100 border border-gallery-200">
              <button
                onClick={() => onFilterChange({ ...filters, status: 'Todos' })}
                className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors ${
                  filters.status === 'Todos' 
                    ? 'bg-white text-gallery-900 shadow-xs' 
                    : 'text-gallery-600 hover:text-gallery-900'
                }`}
              >
                Todos ({totalCount})
              </button>
              <button
                onClick={() => onFilterChange({ ...filters, status: 'Disponibles' })}
                className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors flex items-center gap-1 ${
                  filters.status === 'Disponibles' 
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold' 
                    : 'text-gallery-600 hover:text-gallery-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Disponibles ({availableCount})
              </button>
              <button
                onClick={() => onFilterChange({ ...filters, status: 'Vendidos' })}
                className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors flex items-center gap-1 ${
                  filters.status === 'Vendidos' 
                    ? 'bg-white text-red-800 shadow-xs font-semibold' 
                    : 'text-gallery-600 hover:text-gallery-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Vendidos ({soldCount})
              </button>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-gold-700 hover:text-gold-900 hover:bg-gold-50 rounded transition-colors"
                title="Restablecer todos los filtros"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

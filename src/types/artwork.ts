export type ArtworkCategory = 'Abstracto' | 'Figurativo' | 'Paisaje' | 'Dibujo/Boceto';

export type ArtworkSizeCategory = 'Pequeño' | 'Mediano' | 'Grande';

export type ArtworkStatus = 'available' | 'sold';

export interface ArtworkDimensions {
  height: number; // in cm
  width: number;  // in cm
  depth: number;  // in cm
  unit: 'cm';
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artist: string;
  year: number;
  category: ArtworkCategory;
  price: number; // in EUR
  status: ArtworkStatus;
  dimensions: ArtworkDimensions;
  medium: string;         // e.g. "Óleo y pigmentos naturales sobre lino belga"
  support: string;        // e.g. "Lienzo tensado en bastidor de pino de 4 cm"
  framed: boolean;
  frameDetails: string;   // e.g. "Marco flotante en roble europeo macizo"
  certificateIncluded: boolean;
  edition: string;        // "Obra original única (1 de 1)"
  primaryImage: string;
  galleryImages: string[];
  description: string;
  inspirationStory: string;
  curatorNote?: string;
  shippingInfo: string;
  featured?: boolean;
  colorTone?: string;
}

export interface FilterState {
  category: 'Todos' | ArtworkCategory;
  size: 'Todos' | 'Pequeño' | 'Mediano' | 'Grande';
  status: 'Todos' | 'Disponibles' | 'Vendidos';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'size-desc';
  searchQuery: string;
}

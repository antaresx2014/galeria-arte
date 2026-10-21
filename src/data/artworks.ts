import type { Artwork } from '../types/artwork';
import catalogData from './catalog.json';

const baseUrl = import.meta.env.BASE_URL || '/';

/**
 * Normaliza las rutas estáticas para funcionar tanto en localhost como
 * en subdirectorios de GitHub Pages (ej. https://usuario.github.io/galeria-arte/)
 */
export const resolveAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${clean}`;
};

export const ARTIST_INFO = {
  name: 'Tomás Odión',
  tagline: 'Expresionismo Figurativo, Simbolismo & Empastes Táctiles',
  location: 'Barcelona, España',
  bio: 'Tomás Odión es un pintor plástico contemporáneo cuya obra se caracteriza por una potente carga cromática, trazos matéricos directos y un lenguaje visual expresionista y simbólico. En sus composiciones conviven figuras humanas entrelazadas con la naturaleza, visiones alegóricas, naturalezas vivas y fauna totémica donde el empaste denso y la vibración del color son protagonistas absolutos.',
  statement: '"Pintar es dialogar con la materia y la emoción sin filtros. Cada golpe de espátula y cada mancha buscan revelar la fuerza visceral de lo vivo."',
  exhibitions: [
    { year: 2025, title: 'Fuerza & Materia', venue: 'Galería de Arte Contemporáneo (Individual)' },
    { year: 2024, title: 'Naturalezas Vivas & Expresión', venue: 'Salón de Bellas Artes' },
    { year: 2023, title: 'Figuras en el Espacio', venue: 'Exposición Colectiva de Pintura' },
    { year: 2022, title: 'Color y Trazos de Autor', venue: 'Colección Privada' },
  ],
  awards: [
    'Reconocimiento a la Trayectoria Plástica',
    'Premio de Pintura Expresionista',
    'Seleccionado en Certámenes Nacionales de Bellas Artes'
  ],
  stats: {
    worksInCollections: '80+',
    countriesCollected: '12',
    yearsActive: '20+'
  },
  portraitImage: resolveAssetUrl('/artista/artista-retrato.webp'),
  studioImage: resolveAssetUrl('/artista/artista-escultura.webp'),
  whatsappNumber: '+34600112233',
  contactEmail: 'adquisiciones@tomasodion-arte.com'
};

/**
 * Catálogo cargado dinámicamente desde el JSON desacoplado
 */
export const INITIAL_ARTWORKS: Artwork[] = (catalogData as Artwork[]).map(art => ({
  ...art,
  primaryImage: resolveAssetUrl(art.primaryImage),
  galleryImages: (art.galleryImages && art.galleryImages.length > 0
    ? art.galleryImages
    : [art.primaryImage]
  ).map(resolveAssetUrl),
}));

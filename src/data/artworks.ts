import type { Artwork } from '../types/artwork';
import type { SiteContent } from '../types/siteContent';
import catalogData from './catalog.json';
import siteContentRaw from './siteContent.json';

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

/**
 * Textos desacoplados del sitio desde siteContent.json
 */
export const INITIAL_SITE_CONTENT: SiteContent = {
  ...siteContentRaw,
  artist: {
    ...siteContentRaw.artist,
    portraitImage: resolveAssetUrl(siteContentRaw.artist.portraitImage),
    studioImage: resolveAssetUrl(siteContentRaw.artist.studioImage),
  }
} as SiteContent;

/**
 * Retrocompatibilidad con componentes que consumen ARTIST_INFO
 */
export const ARTIST_INFO = {
  ...INITIAL_SITE_CONTENT.artist,
  whatsappNumber: INITIAL_SITE_CONTENT.contact.whatsappNumber,
  contactEmail: INITIAL_SITE_CONTENT.contact.contactEmail,
};

/**
 * Catálogo cargado dinámicamente desde catalog.json
 */
export const INITIAL_ARTWORKS: Artwork[] = (catalogData as Artwork[]).map(art => ({
  ...art,
  primaryImage: resolveAssetUrl(art.primaryImage),
  galleryImages: (art.galleryImages && art.galleryImages.length > 0
    ? art.galleryImages
    : [art.primaryImage]
  ).map(resolveAssetUrl),
}));

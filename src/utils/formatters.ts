import type { Artwork, ArtworkDimensions } from '../types/artwork';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price);
}

export function formatDimensions(dimensions: ArtworkDimensions): string {
  if (dimensions.depth) {
    return `${dimensions.height} × ${dimensions.width} × ${dimensions.depth} ${dimensions.unit}`;
  }
  return `${dimensions.height} × ${dimensions.width} ${dimensions.unit}`;
}

export function getSizeCategory(dimensions: ArtworkDimensions): 'Pequeño' | 'Mediano' | 'Grande' {
  const maxDim = Math.max(dimensions.height, dimensions.width);
  if (maxDim < 50) return 'Pequeño';
  if (maxDim <= 100) return 'Mediano';
  return 'Grande';
}

export function generateWhatsAppLink(artwork: Artwork, type: 'reserve' | 'inquiry' | 'offer', customOffer?: string): string {
  const phone = '34600112233'; // Artist phone number
  let message = '';

  if (type === 'reserve') {
    message = `Hola ${artwork.artist}, estoy interesado/a en adquirir y reservar la obra original "${artwork.title}" (Ref: ${artwork.id}) por valor de ${formatPrice(artwork.price)}. ¿Podrías indicarme el procedimiento para la adquisición y envío asegurado?`;
  } else if (type === 'offer') {
    message = `Hola ${artwork.artist}, me gustaría hacer una consulta/propuesta sobre tu obra "${artwork.title}" (Ref: ${artwork.id}). ${customOffer ? `Mi propuesta es: ${customOffer}.` : ''} ¿Podemos comentarlo?`;
  } else {
    message = `Hola ${artwork.artist}, me fascina tu obra "${artwork.title}" (Ref: ${artwork.id}) y me gustaría recibir información adicional sobre los detalles y disponibilidad para verla en persona.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateMailtoLink(artwork: Artwork, type: 'reserve' | 'inquiry'): string {
  const email = 'adquisiciones@tomasodion-arte.com';
  const subject = type === 'reserve' 
    ? `Solicitud de Adquisición: ${artwork.title} [Ref: ${artwork.id}]`
    : `Consulta sobre la obra: ${artwork.title} [Ref: ${artwork.id}]`;
  
  const body = `Estimado ${artwork.artist},\n\nMe pongo en contacto con interés en la obra "${artwork.title}" (${formatPrice(artwork.price)}, Ref: ${artwork.id}).\n\nPor favor, facilíteme información sobre la disponibilidad, opciones de envío y formalización del certificado de autenticidad.\n\nAtentamente,\n[Su Nombre]\n[Su Teléfono]`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

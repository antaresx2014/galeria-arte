# Galería de Arte & Boutique Online — Tomás Odión
> Plataforma de comercio electrónico de arte contemporáneo de lujo inspirada en la experiencia editorial de Saatchi Art.

---

## 🎨 Sistema de Referencia de Obras y Nomenclatura del Catálogo

Las imágenes de los cuadros se encuentran organizadas en:
📁 **`public/obras/`**

### Nomenclatura Estándar del Catálogo:
Cada archivo sigue la estructura formal de inventario:
```
OBRA-[NÚMERO_REFERENCIA]-[slug-del-titulo].jpg
```

**Ejemplos reales en la galería:**
- `OBRA-001-gallinazos.jpg` (Ref: `art-001`)
- `OBRA-002-rosas-amarillas.jpg` (Ref: `art-002`)
- `OBRA-003-abrazo-en-la-arboleda.jpg` (Ref: `art-003`)
- `OBRA-004-tres-figuras-en-caliz.jpg` (Ref: `art-004`)
- ... hasta `OBRA-025-composicion-coral.jpg` (Ref: `art-025`)

---

## 📋 Catálogo de Datos Centralizado (`src/data/artworks.ts`)

Para cada obra se define la siguiente ficha técnica en TypeScript:

```typescript
{
  id: 'art-026', // Código único de inventario
  slug: 'nombre-de-la-obra',
  title: 'Título Formal de la Obra',
  artist: 'Tomás Odión',
  year: 2025,
  category: 'Figurativo', // 'Figurativo' | 'Paisaje' | 'Abstracto' | 'Dibujo/Boceto'
  price: 2800, // Precio en Euros (€)
  status: 'available', // 'available' (Disponible) | 'sold' (Vendido)
  dimensions: {
    height: 100, // Altura en cm
    width: 70,   // Anchura en cm
    depth: 3.5,  // Grosor del bastidor en cm
    unit: 'cm'
  },
  medium: 'Técnica empleada (ej. Óleo y empaste con espátula sobre lienzo)',
  support: 'Soporte físico (ej. Bastidor de pino macizo)',
  framed: true,
  frameDetails: 'Marco flotante de madera de haya maciza',
  certificateIncluded: true,
  edition: 'Obra original única (1 de 1)',
  primaryImage: '/obras/OBRA-026-nombre-de-la-obra.jpg',
  galleryImages: [
    '/obras/OBRA-026-nombre-de-la-obra.jpg'
  ],
  description: 'Descripción plástica de la obra...',
  inspirationStory: 'Historia conceptual o poética...',
  shippingInfo: 'Envío asegurado en caja de madera a medida con seguro a todo riesgo.',
  featured: false,
  colorTone: '#C5A059'
}
```

---

## 🔮 Preparación para Catálogo Externo (JSON / CMS / Drive)

En la siguiente fase, este catálogo puede desacoplarse para ser consumido de forma dinámica:
1. **Fichero JSON externo (`public/catalogo.json`):** Permite actualizar títulos, precios y disponibilidad sin tener que recompilar el código.
2. **Headless CMS o Google Sheets / Drive API:** Sincronización directa desde una hoja de cálculo o carpeta en la nube.

---

## 🚀 Puesta en Marcha en Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Previsualizador de miniaturas de todas las obras:**
   Abre en el navegador: [http://localhost:5173/catalog-preview.html](http://localhost:5173/catalog-preview.html)

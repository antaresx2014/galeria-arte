---
name: gestion-obras
description: Especificaciones de tipado, catalogación de inventario desacoplado y nomenclatura de imágenes WebP para las obras de Tomás Odión.
---

# Skill de Gestión de Datos del Artista y Catálogo Desacoplado

## Fuentes de Verdad Físicas
1. **Catálogo de Obras:** `src/data/catalog.json` (Array de objetos `Artwork`).
2. **Textos y Contenidos de la Web:** `src/data/siteContent.json` (Biografía, Hero, Garantías, Contacto, Footer).
3. **Módulo Adaptador:** `src/data/artworks.ts` importa ambos JSON y resuelve dinámicamente las rutas relativas (`resolveAssetUrl`) para compatibilidad tanto en local como en GitHub Pages.

## Reglas de Registro de Obras (`Artwork`)
1. Cada nueva obra debe cumplir la interfaz `Artwork` (`src/types/artwork.ts`):
   - `id`: Formato `art-XXX` (ej. `art-026`).
   - `slug`: Minúsculas separadas por guiones sin tildes (ej. `obra-026-catedral-gotica`).
   - `title`: Título original de la obra.
   - `artist`: 'Tomás Odión'.
   - `year`: Año de creación (ej. 2026).
   - `category`: `'Figurativo' | 'Paisaje' | 'Abstracto' | 'Dibujo/Boceto'`.
   - `price`: Precio oficial en Euros (€).
   - `status`: `'available' | 'sold'`.
   - `dimensions`: `{ height: number, width: number, depth: number, unit: 'cm' }`.
   - `medium`: Técnica y materiales físicos (óleo, empastes con espátula, pigmentos minerales).
   - `support`: Soporte (lienzo de lino belga, bastidor macizo, tabla entelada).
   - `framed`: Booleano y `frameDetails` con detalles del marco.
   - `certificateIncluded`: `true` (Certificado de autenticidad firmado).
   - `edition`: `'Obra original única (1 de 1)'`.
   - `primaryImage` y `galleryImages`: Rutas estándar en WebP: `/obras/obra-XXX-[slug].webp`.
   - `description`: Análisis formal, cromático y matérico.
   - `inspirationStory`: Narrativa conceptual vinculada al atelier de Barcelona.
   - `shippingInfo`: Embalaje de seguridad en contenedor rígido de madera con seguro a todo riesgo.
   - `featured`: Booleano para destacar en la portada (Hero).

## Formato y Optimización de Imágenes
- Todas las imágenes de producción deben residir en `public/obras/` en formato `.webp` optimizado (máx. 1600px, calidad 82%).
- Las fotografías en bruto se depositan en `raw_images/` (carpeta excluida de Git) y se procesan con `npm run optimize-images` o directamente desde el CMS Local.

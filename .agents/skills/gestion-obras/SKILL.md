---
name: gestion-obras
description: Especificaciones de tipado, catalogación de inventario y nomenclatura de imágenes para las obras de Tomás Odión.
---

# Skill de Gestión de Datos del Artista (`src/data/artworks.ts`)

## Reglas de Registro de Obras
1. Cada nueva obra debe cumplir la interfaz `Artwork` de `src/types/artwork.ts`.
2. Parámetros obligatorios: `id` (`art-XXX`), `title`, `artist: 'Tomás Odión'`, `year`, `category`, `price` en EUR, `status` (`available` | `sold`), `dimensions` (`height`, `width`, `depth`, `unit: 'cm'`), `medium`, `support`, `framed`, `certificateIncluded: true`, `edition: 'Obra original única (1 de 1)'`, `primaryImage`, `description` e `inspirationStory` contextualizada con el atelier de Barcelona.
3. Las imágenes deben alojarse en `/public/obras/OBRA-XXX-[slug].jpg`.

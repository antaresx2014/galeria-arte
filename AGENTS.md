# Directrices y Skills de Desarrollo: Galería de Arte Oficial de Tomás Odión (Barcelona)

Este documento define las reglas de desarrollo, diseño y arquitectura de datos que rigen el repositorio de la **Galería de Arte Oficial de Tomás Odión** (React + TypeScript + Tailwind CSS).

---

## 🏛️ Skill 1: Identidad Visual y UI/UX ("Estética Museo Contemporáneo")

1. **Paleta Cromática Estricta:**
   - **Fondos:** Blanco hueso (`#FAFAFA` / `bg-gallery-50`), blanco puro (`#FFFFFF` / `bg-white`) y fondos de sala con gradientes neutros suaves.
   - **Textos y Contraste:** Negro carbón profundo (`#111111` / `text-gallery-900`) para titulares y `#555555` / `#737373` para textos secundarios.
   - **Acentos de Lujo:** Dorado envejecido y bronce noble (`#C5A059` / `text-gold` / `border-gold`).
   - **Etiquetas de Estado:** Distintivo discreto de galería para obras vendidas (`bg-red-700` con `Vendido / Sold`).
   - **Prohibición:** Queda terminantemente prohibido introducir colores primarios estridentes o saturados (azules o verdes chillones, morados de neón, botones estridentes) en los componentes de la interfaz.

2. **Tipografía Editorial:**
   - **Títulos, Citas y Encabezados:** `Playfair Display` (`font-serif`), con tracking equilibrado y estilo editorial de museo contemporáneo (estilo Saatchi Art / Gagosian).
   - **Interfaz, Botones y Especificaciones Técnicas:** `Inter` (`font-sans`), con peso semibold y mayúsculas espaciadas (`uppercase tracking-wider`) para botones y etiquetas.

---

## 🎨 Skill 2: Gestión de Datos del Artista (`src/data/artworks.ts`)

1. **Tipado Estricto de TypeScript:**
   Cualquier obra nueva añadida al inventario debe cumplir rigurosamente la interfaz `Artwork` (`src/types/artwork.ts`):
   ```typescript
   {
     id: string;               // Formato estándar: 'art-001', 'art-002', etc.
     slug: string;             // Texto normalizado en minúsculas con guiones
     title: string;            // Título original de la obra de Tomás Odión
     artist: 'Tomás Odión';    // Autoría constante
     year: number;             // Año de realización
     category: ArtworkCategory;// 'Figurativo' | 'Paisaje' | 'Abstracto' | 'Dibujo/Boceto'
     price: number;            // Precio oficial en Euros (€)
     status: ArtworkStatus;    // 'available' | 'sold'
     dimensions: {
       height: number;         // Alto en cm
       width: number;          // Ancho en cm
       depth: number;          // Fondo en cm (ej. 3.0 - 3.5)
       unit: 'cm';
     };
     medium: string;           // Técnica física (ej. Óleo, empaste con espátula, técnica mixta)
     support: string;          // Bastidor macizo, tabla entelada tratada, lino
     framed: boolean;          // Indicador de enmarcado
     frameDetails: string;     // Detalle del marco (roble, haya, aluminio, etc.)
     certificateIncluded: true;// Certificado de autenticidad firmado por Tomás Odión
     edition: 'Obra original única (1 de 1)';
     primaryImage: string;     // Ruta estándar: '/obras/OBRA-XXX-[slug].jpg'
     galleryImages: string[];
     description: string;      // Análisis formal y matérico
     inspirationStory: string; // Narrativa conceptual vinculada al estudio de Barcelona
     shippingInfo: string;     // Embalaje de seguridad para obras de arte
     featured: boolean;
     colorTone?: string;
   }
   ```

2. **Nomenclatura de Archivos Multimedia:**
   - Todas las imágenes deben residir en `public/obras/` bajo la nomenclatura:  
     `OBRA-[NÚMERO]-[slug].jpg` (ejemplo: `OBRA-001-gallinazos.jpg`).
   - Las imágenes deben estar recortadas con precisión sin marcos fotográficos externos no deseados.

---

## 🚀 Skill 3: Experiencia de Usuario, Filtrado y Conversión

1. **Filtrado y Búsqueda Dinámica:**
   - El catálogo debe mantener el sistema reactivo multi-criterio:
     - Por **Serie / Categoría** (`Todos`, `Figurativo`, `Paisaje`, `Dibujo/Boceto`, `Abstracto`).
     - Por **Formato / Tamaño** (`Pequeño <50 cm`, `Mediano 50-100 cm`, `Grande >100 cm`).
     - Por **Disponibilidad** (`Todos`, `Disponibles`, `Vendidos`).
     - Por **Ordenación** (precio ascendente/descendente, año, mayor tamaño).
     - Por **Búsqueda textual** instantánea en título, técnica y descripción.

2. **Simulador "Ver en tu pared" (View in a Room):**
   - El renderizado en sala debe respetar fielmente las dimensiones físicas en centímetros respecto al salón de referencia para ofrecer una escala real al coleccionista.
   - Mantener personalizadores interactivos de color de pared y tipos de marco flotante.

3. **Flujo de Conversión de Alta Fidelidad:**
   - Cada botón de adquisición o consulta debe redirigir fluidamente con la referencia exacta del cuadro (`Ref: art-XXX`), título y precio preconfigurado hacia:
     1. **WhatsApp directo** del atelier (`+34 600 11 22 33`).
     2. **Email de adquisiciones** (`adquisiciones@tomasodion-arte.com`).
     3. **Formulario modal de reserva** para generación de solicitud y factura proforma.

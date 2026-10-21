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

## 🎨 Skill 2: Gestión de Datos Desacoplada (`catalog.json` y `siteContent.json`)

1. **Fuentes Físicas Desacopladas:**
   - **Catálogo de Obras:** `src/data/catalog.json` (Array tipado según `Artwork`).
   - **Textos de la Web:** `src/data/siteContent.json` (Portada, biografía en Barcelona, garantías, contactos).
   - **Capa Adaptadora:** `src/data/artworks.ts` resuelve rutas relativas con `resolveAssetUrl` para compatibilidad local y en GitHub Pages.

2. **Tipado Estricto de TypeScript (`src/types/artwork.ts`):**
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
     primaryImage: string;     // Ruta estándar WebP: '/obras/obra-XXX-[slug].webp'
     galleryImages: string[];
     description: string;      // Análisis formal y matérico
     inspirationStory: string; // Narrativa conceptual vinculada al estudio de Barcelona
     shippingInfo: string;     // Embalaje de seguridad para obras de arte
     featured: boolean;
     colorTone?: string;
   }
   ```

3. **Nomenclatura y Optimización de Archivos Multimedia:**
   - Todas las imágenes finales de producción deben residir en `public/obras/` en formato `.webp` optimizado a 82% de calidad con lado mayor máximo de 1600px.
   - Nomenclatura normalizada: `obra-[número]-[slug].webp` (minúsculas, guiones, sin espacios ni tildes).
   - Carpeta `raw_images/` para fotos pesadas en bruto de Google Drive, excluida permanentemente de Git (`.gitignore`).

---

## 🛠️ Skill 3: CMS Persistente "Solo en Local" (Local-First Admin)

1. **Separación por Entorno:**
   - **Producción (`import.meta.env.PROD`):** Vista pública 100% limpia. Sin candados, sin accesos de administración ni botones de edición.
   - **Local (`import.meta.env.DEV`):** Barra superior de control fija conmutador entre "👁️ Vista Cliente" y "🛠️ Modo Administrador (Local)".
2. **Middleware Local de Escritura Directa en Disco:**
   - Endpoints exclusivos de desarrollo en `vite.config.ts`:
     - `POST /api/local-admin/save-content`: Sobrescribe `src/data/siteContent.json`.
     - `POST /api/local-admin/save-catalog`: Sobrescribe `src/data/catalog.json`.
     - `POST /api/local-admin/upload-image`: Convierte a WebP con `sharp` y guarda en `public/obras/`.
3. **Flujo de Trabajo:**
   - Realizar modificaciones en el CMS local (`npm run dev`).
   - Comprobar en "Vista Cliente".
   - Guardar cambios (se escriben directamente en los archivos JSON físicos).
   - Ejecutar `git commit` y `git push origin main` para publicar en GitHub Pages.

---

## 🚀 Skill 4: Experiencia de Usuario, Filtrado y Conversión

1. **Filtrado y Búsqueda Dinámica:**
   - Sistema multi-criterio reactivo por serie/categoría, tamaño (<50cm, 50-100cm, >100cm), estado de disponibilidad y búsqueda por texto.
2. **Simulador "Ver en tu pared":**
   - Renderizado en sala a escala física real calculada según los centímetros del cuadro frente a la pared de referencia.
3. **Flujo de Conversión Directa:**
   - WhatsApp directo (+34 600 11 22 33), email de adquisiciones y formulario proforma con referencia precargada (`art-XXX`).

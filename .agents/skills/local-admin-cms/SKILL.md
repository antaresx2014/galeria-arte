---
name: local-admin-cms
description: Arquitectura de administración Local-First y vista pública pura en producción (import.meta.env.DEV vs PROD).
---

# Skill de CMS Persistente "Solo en Local" (Local-First Admin)

## Filosofía de Arquitectura
1. **Separación Estricta por Entorno:**
   - **En Producción / GitHub Pages (`import.meta.env.PROD`):**
     - La web renderiza **exclusivamente la Vista de Usuario Final (Consulta, Exploración y Compra)**.
     - Ningún botón de administración, ni candados, ni barras de edición se incluyen en el bundle final.
   - **En Desarrollo Local (`import.meta.env.DEV` - `npm run dev`):**
     - Se renderiza una barra superior fija (`DevEnvironmentBar`) que permite alternar con un clic entre:
       - **👁️ Vista Cliente:** Para comprobar exactamente la experiencia del coleccionista.
       - **🛠️ Modo Administrador (Local):** Panel completo CMS para editar textos y catálogo.

2. **Persistencia Física en Disco:**
   - No se utiliza `localStorage` ni bases de datos remotas frágiles.
   - Cualquier cambio guardado en el CMS se escribe directamente sobre los archivos físicos del proyecto mediante el plugin de Vite (`viteLocalAdminPlugin` en `vite.config.ts`).
   - Una vez editado el contenido o catálogo en local, los cambios quedan listos para hacer `git commit` y `git push origin main`.

## Endpoints del Middleware Local en Vite
- `POST /api/local-admin/save-content`: Sobrescribe físicamente `src/data/siteContent.json`.
- `POST /api/local-admin/save-catalog`: Sobrescribe físicamente `src/data/catalog.json`.
- `POST /api/local-admin/upload-image`: Recibe una fotografía desde el explorador, la redimensiona (máx 1600px), la comprime con `sharp` a `.webp` (calidad 82%) y la guarda en `public/obras/`.
- `GET /api/local-admin/status`: Verifica la disponibilidad de los archivos y el modo local.

## Módulos Involucrados
- `src/components/admin/DevEnvironmentBar.tsx`: Barra superior para alternar vistas en local.
- `src/components/admin/LocalAdminPanel.tsx`: Interfaz editorial completa del CMS (Editor de Textos y CRUD de Obras).
- `src/data/siteContent.json`: Única fuente de verdad de todos los textos de la interfaz.
- `src/data/catalog.json`: Única fuente de verdad del inventario de cuadros.
- `vite.config.ts`: Middleware Node.js con `configureServer`.

# 🏛️ Guía de Catalogación y Carga de Obras — Galería Tomás Odión

Este documento detalla el procedimiento oficial y las convenciones del repositorio para añadir nuevos cuadros al catálogo oficial de **Tomás Odión**.

---

## 📐 1. Nomenclatura y Convención de Archivos

Todas las obras en producción se ubican en `public/obras/` y siguen el patrón estricto:
```
obra-[número_correlativo_3_dígitos]-[slug-del-cuadro].webp
```

**Ejemplos:**
- `obra-001-gallinazos.webp`
- `obra-026-aires-malaguenos.webp`
- `obra-063-la-virgen-visitadora.webp`

El identificador interno en código (`src/data/catalog.json`) es correlativo:
```
art-001, art-002, ..., art-063, art-064...
```

---

## 🎨 2. Especificaciones de Calidad de Imagen

- **Formato:** `.webp` optimizado con calidad **82%** (ahorro ~70% sin pérdida perceptible).
- **Resolución:** Máximo **1600px** en el lado mayor (`fit: inside`, sin ampliar si es menor).
- **Orientación:** Respeta orientación EXIF de cámaras y dispositivos móviles.
- **Recorte de barras:** Si la foto procede de diapositivas o capturas con subtítulos inferiores en banda negra/azul con medidas o títulos, dicha barra debe recortarse para que el lienzo quede 100% puro.

---

## 🚀 3. Procedimientos de Carga

### Opción A: A través del CMS Local (Recomendado y visual)
1. Ejecuta en local:
   ```bash
   npm run dev
   ```
2. Accede a `http://localhost:5173`.
3. En la barra superior, pulsa **`🛠️ Modo Administrador (Local)`**.
4. Ve a la sección **Catálogo de Obras** y haz clic en **`+ Añadir Nueva Obra`**.
5. Sube la fotografía directamente: el servidor local la recortará, convertirá a WebP y la guardará en `public/obras/` con el siguiente número disponible.
6. Rellena los datos (título, medidas en cm, técnica, soporte, precio) y pulsa **Guardar Catálogo**.
7. Publica en GitHub Pages:
   ```bash
   git add .
   git commit -m "feat(catalogo): anadir nueva obra art-XXX"
   git push origin main
   ```

### Opción B: Procesamiento por Lote en Terminal
1. Deposita las fotografías originales en la carpeta ignorada por Git:
   ```
   raw_images/
   ```
2. Ejecuta el pipeline automatizado:
   ```bash
   npm run optimize-images
   ```
3. Verifica la limpieza de subtítulos:
   ```bash
   npm run check-images
   ```
4. Añade la entrada correspondiente en `src/data/catalog.json`.
5. Publica en GitHub:
   ```bash
   git add .
   git commit -m "feat(obras): procesar nuevas obras en catalogo"
   git push origin main
   ```

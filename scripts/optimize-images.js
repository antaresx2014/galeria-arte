import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const RAW_DIR = path.join(projectRoot, 'raw_images');
const OUTPUT_DIR = path.join(projectRoot, 'public', 'obras');
const TEMPLATE_OUT_PATH = path.join(projectRoot, 'scripts', 'catalog-reference-template.json');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.tiff', '.tif', '.avif']);

/**
 * Normaliza nombres de archivo a minúsculas, sin espacios, sin tildes ni caracteres especiales.
 * Ejemplo: "OBRA 026 Gallinazos en Mayo.JPG" -> "obra-026-gallinazos-en-mayo.webp"
 */
export function normalizeFilename(filename) {
  const ext = path.extname(filename);
  let name = path.basename(filename, ext);

  name = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-')   // Reemplazar espacios y símbolos por guiones
    .replace(/-+/g, '-')             // Eliminar guiones duplicados
    .replace(/^-|-$/g, '');           // Eliminar guiones al principio o al final

  return `${name}.webp`;
}

/**
 * Convierte bytes a formato legible (KB, MB)
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Genera un slug y título sugerido a partir del nombre del archivo
 */
function extractTitleAndSlug(filename) {
  const base = path.basename(filename, path.extname(filename));
  // Limpiar posibles prefijos como obra-001 o art-001
  const clean = base.replace(/^(obra|art)[-_]?\d+[-_]?/i, '').replace(/[-_]+/g, ' ').trim();
  const title = clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : 'Obra Sin Título';
  const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { title, slug };
}

async function run() {
  const args = process.argv.slice(2);
  const isForce =
    args.includes('--force') ||
    args.includes('-f') ||
    args.includes('force') ||
    process.env.npm_config_force === 'true' ||
    process.env.FORCE === '1';
  const customInputDir = args.find((_, i, arr) => arr[i - 1] === '--input') || RAW_DIR;
  const customOutputDir = args.find((_, i, arr) => arr[i - 1] === '--output') || OUTPUT_DIR;

  console.log('\n============================================================');
  console.log('🖼️  PIPELINE DE OPTIMIZACIÓN A WEBP - TOMÁS ODIÓN');
  console.log('============================================================');
  console.log(`📂 Origen:  ${customInputDir}`);
  console.log(`📁 Destino: ${customOutputDir}`);
  console.log(`⚙️  Modo:    ${isForce ? 'FORZADO (--force: regenera todo)' : 'INCREMENTAL (omite existentes)'}`);
  console.log('============================================================\n');

  // Asegurar que existan directorios
  if (!fs.existsSync(customInputDir)) {
    fs.mkdirSync(customInputDir, { recursive: true });
    console.log(`ℹ️  Carpeta creada: ${customInputDir}`);
  }
  if (!fs.existsSync(customOutputDir)) {
    fs.mkdirSync(customOutputDir, { recursive: true });
  }

  const allFiles = fs.readdirSync(customInputDir);
  const imageFiles = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXTENSIONS.has(ext);
  });

  if (imageFiles.length === 0) {
    console.log(`ℹ️  No se encontraron fotos nuevas en "${path.basename(customInputDir)}/".`);
    console.log('💡 Coloca las imágenes originales de Google Drive en esa carpeta y vuelve a ejecutar:');
    console.log('   npm run optimize-images\n');
    return;
  }

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalRawBytes = 0;
  let totalWebpBytes = 0;

  const newArtworksTemplates = [];

  for (const file of imageFiles) {
    const srcPath = path.join(customInputDir, file);
    const destName = normalizeFilename(file);
    const destPath = path.join(customOutputDir, destName);

    // Comprobación incremental: si ya existe y no se pasa --force, omitir
    if (fs.existsSync(destPath) && !isForce) {
      skippedCount++;
      console.log(`⏭️  [OMITIDO] ${file} -> ${destName} (ya existe en public/obras/)`);
      continue;
    }

    try {
      const srcStats = fs.statSync(srcPath);
      const originalBytes = srcStats.size;

      // Procesamiento con sharp: auto-orientación, redimensión máx 1600px, WebP 82%
      await sharp(srcPath)
        .rotate() // Respeta la orientación EXIF de fotos móviles
        .resize({
          width: 1600,
          height: 1600,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: 82,
          effort: 4
        })
        .toFile(destPath);

      const destStats = fs.statSync(destPath);
      const newBytes = destStats.size;
      const savedBytes = originalBytes - newBytes;
      const percent = originalBytes > 0 ? ((savedBytes / originalBytes) * 100).toFixed(1) : '0';

      totalRawBytes += originalBytes;
      totalWebpBytes += newBytes;
      processedCount++;

      console.log(`✅ [PROCESADO] ${file} -> ${destName}`);
      console.log(`   └─ ${formatBytes(originalBytes)} ➔ ${formatBytes(newBytes)} (Ahorro: -${percent}%)`);

      const { title, slug } = extractTitleAndSlug(file);
      newArtworksTemplates.push({
        id: `art-siguiente`,
        slug: slug,
        title: title,
        artist: 'Tomás Odión',
        year: new Date().getFullYear(),
        category: 'Figurativo',
        price: 2500,
        status: 'available',
        dimensions: {
          height: 80,
          width: 100,
          depth: 3.5,
          unit: 'cm'
        },
        medium: 'Óleo y técnica mixta con empastes densos',
        support: 'Lienzo de algodón sobre bastidor de madera maciza',
        framed: true,
        frameDetails: 'Marco flotante en roble macizo lacado',
        certificateIncluded: true,
        edition: 'Obra original única (1 de 1)',
        primaryImage: `/obras/${destName}`,
        galleryImages: [`/obras/${destName}`],
        description: `Nueva obra original de Tomás Odión realizada en el atelier de Barcelona.`,
        inspirationStory: `Inspirada en el diálogo entre materia, color y emoción.`,
        shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
        featured: false
      });

    } catch (err) {
      errorCount++;
      console.error(`❌ [ERROR] No se pudo procesar ${file}:`, err.message);
    }
  }

  console.log('\n============================================================');
  console.log('📊 RESUMEN DE EJECUCIÓN');
  console.log('============================================================');
  console.log(`• Nuevas imágenes procesadas: ${processedCount}`);
  console.log(`• Omitidas (ya existían):    ${skippedCount}`);
  if (errorCount > 0) {
    console.log(`• Errores:                  ${errorCount}`);
  }

  if (processedCount > 0) {
    const totalSaved = totalRawBytes - totalWebpBytes;
    const totalPercent = totalRawBytes > 0 ? ((totalSaved / totalRawBytes) * 100).toFixed(1) : '0';
    console.log(`• Tamaño original total:    ${formatBytes(totalRawBytes)}`);
    console.log(`• Tamaño final WebP total:  ${formatBytes(totalWebpBytes)}`);
    console.log(`• Espacio total ahorrado:   ${formatBytes(totalSaved)} (-${totalPercent}%)`);

    // Guardar plantilla de referencia JSON para el catálogo
    fs.writeFileSync(TEMPLATE_OUT_PATH, JSON.stringify(newArtworksTemplates, null, 2), 'utf-8');
    console.log(`\n📋 Plantilla de catálogo generada en:`);
    console.log(`   ${path.relative(projectRoot, TEMPLATE_OUT_PATH)}`);
    console.log(`   (Puedes copiar las entradas e insertarlas en src/data/catalog.json)`);
  }
  console.log('============================================================\n');
}

run().catch((err) => {
  console.error('Error fatal al optimizar imágenes:', err);
  process.exit(1);
});

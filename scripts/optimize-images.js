import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const RAW_DIR = path.join(projectRoot, 'raw_images');
const OUTPUT_DIR = path.join(projectRoot, 'public', 'obras');
const ARTISTA_DIR = path.join(projectRoot, 'public', 'artista');
const TEMPLATE_OUT_PATH = path.join(projectRoot, 'scripts', 'catalog-reference-template.json');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.tiff', '.tif', '.avif']);

/**
 * Normaliza nombres a slug en minúsculas, sin espacios, sin tildes ni caracteres especiales.
 */
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
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
 * Detecta si la imagen tiene una barra inferior de subtítulos/medidas y devuelve la altura a recortar.
 */
async function detectCaptionBar(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;
    const scanHeight = Math.min(Math.round(height * 0.25), 400);
    const top = height - scanHeight;

    const { data, info } = await image
      .extract({ left: 0, top, width, height: scanHeight })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const channels = info.channels;
    const rowDarkness = [];

    for (let y = scanHeight - 1; y >= 0; y--) {
      let darkPixels = 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r < 35 && g < 35 && b < 35) {
          darkPixels++;
        }
      }
      rowDarkness.push({ yFromBottom: scanHeight - 1 - y, ratio: darkPixels / width });
    }

    const bottomIsDark = rowDarkness[0]?.ratio > 0.55;
    let barHeight = 0;
    if (bottomIsDark) {
      for (const row of rowDarkness) {
        if (row.ratio > 0.35) {
          barHeight = row.yFromBottom;
        } else {
          break;
        }
      }
    }

    if (bottomIsDark && barHeight > 25) {
      return barHeight + 6;
    }
  } catch (_e) {
    // Si no se puede analizar, continuar sin recorte
  }
  return 0;
}

/**
 * Encuentra el número máximo actual en public/obras/obra-XXX-*.webp
 */
function getNextArtworkNumber(dir) {
  if (!fs.existsSync(dir)) return 1;
  const files = fs.readdirSync(dir);
  let max = 0;
  for (const f of files) {
    const match = f.match(/^obra-(\d{3})-/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > max) max = num;
    }
  }
  return max + 1;
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
    console.log(`ℹ️  No se encontraron fotos en "${path.basename(customInputDir)}/".`);
    console.log('💡 Coloca las imágenes originales de Google Drive en esa carpeta y vuelve a ejecutar:');
    console.log('   npm run optimize-images\n');
    return;
  }

  let nextIndex = getNextArtworkNumber(customOutputDir);
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalRawBytes = 0;
  let totalWebpBytes = 0;

  const newArtworksTemplates = [];

  for (const file of imageFiles) {
    // Si es foto de perfil del artista
    if (file.toLowerCase().includes('perfil') || file.toLowerCase().includes('artista')) {
      const artistaDest = path.join(ARTISTA_DIR, 'tomas-odion-perfil.webp');
      try {
        await sharp(path.join(customInputDir, file))
          .rotate()
          .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(artistaDest);
        console.log(`👤 [ARTISTA] ${file} -> public/artista/tomas-odion-perfil.webp`);
      } catch (e) {
        console.error(`❌ Error procesando foto de artista ${file}:`, e.message);
      }
      continue;
    }

    const srcPath = path.join(customInputDir, file);
    const baseSlug = slugify(path.basename(file, path.extname(file)).replace(/^(obra|art)[-_]?\d+[-_]?/i, ''));
    
    // Comprobar si ya existe una obra con este slug
    const existingMatches = fs.readdirSync(customOutputDir).filter(f => f.includes(`-${baseSlug}.webp`));
    if (existingMatches.length > 0 && !isForce) {
      skippedCount++;
      console.log(`⏭️  [OMITIDO] ${file} -> ya catalogada como ${existingMatches[0]}`);
      continue;
    }

    const numberStr = String(nextIndex).padStart(3, '0');
    const destName = `obra-${numberStr}-${baseSlug}.webp`;
    const destPath = path.join(customOutputDir, destName);

    try {
      const srcStats = fs.statSync(srcPath);
      const originalBytes = srcStats.size;
      const meta = await sharp(srcPath).metadata();

      let transformer = sharp(srcPath).rotate();

      // Detección automática y recorte de barras inferiores
      const barCut = await detectCaptionBar(srcPath);
      if (barCut > 0) {
        transformer = transformer.extract({
          left: 0,
          top: 0,
          width: meta.width,
          height: meta.height - barCut
        });
        console.log(`✂️  [Recorte de subtítulo: ${barCut}px] ${file}`);
      }

      await transformer
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

      const obraId = `art-${numberStr}`;
      const titleClean = baseSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      console.log(`✅ [PROCESADO] ${file} -> ${destName}`);
      console.log(`   └─ ID: ${obraId} | ${formatBytes(originalBytes)} ➔ ${formatBytes(newBytes)} (-${percent}%)`);

      newArtworksTemplates.push({
        id: obraId,
        slug: baseSlug,
        title: titleClean,
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
        support: 'Lienzo de lino sobre bastidor de madera maciza',
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

      nextIndex++;

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

    fs.writeFileSync(TEMPLATE_OUT_PATH, JSON.stringify(newArtworksTemplates, null, 2), 'utf-8');
    console.log(`\n📋 Plantilla de catálogo generada en: ${path.relative(projectRoot, TEMPLATE_OUT_PATH)}`);
  }
  console.log('============================================================\n');
}

run().catch((err) => {
  console.error('Error fatal al optimizar imágenes:', err);
  process.exit(1);
});

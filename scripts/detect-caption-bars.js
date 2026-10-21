import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const obrasDir = path.join(__dirname, '..', 'public', 'obras');

async function checkImage(filename) {
  const filePath = path.join(obrasDir, filename);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Extraer los últimos 200 píxeles de alto
  const scanHeight = Math.min(Math.round(height * 0.20), 300);
  const top = height - scanHeight;

  const { data, info } = await image
    .extract({ left: 0, top, width, height: scanHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Contar píxeles oscuros (negro de fondo de la barra) fila por fila desde abajo
  const rowDarkness = [];
  const channels = info.channels;

  for (let y = scanHeight - 1; y >= 0; y--) {
    let darkPixels = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Si es negro o muy oscuro (fondo de barra)
      if (r < 30 && g < 30 && b < 30) {
        darkPixels++;
      }
    }
    const ratio = darkPixels / width;
    rowDarkness.push({ yFromBottom: scanHeight - 1 - y, ratio });
  }

  // Si la última fila es muy oscura (> 70% negro)
  const bottomIsDark = rowDarkness[0]?.ratio > 0.6;
  
  // Buscar dónde termina la barra negra
  let barHeight = 0;
  if (bottomIsDark) {
    for (const row of rowDarkness) {
      if (row.ratio > 0.35) {
        barHeight = row.yFromBottom;
      } else {
        // Encontramos el fin de la barra
        break;
      }
    }
  }

  return {
    filename,
    width,
    height,
    bottomIsDark,
    barHeight,
  };
}

async function run() {
  const files = fs.readdirSync(obrasDir).filter(f => f.endsWith('.webp'));
  console.log(`Analizando ${files.length} imágenes en public/obras/...`);

  for (const file of files) {
    const res = await checkImage(file);
    if (res.bottomIsDark && res.barHeight > 20) {
      console.log(`⚠️  [CON BARRA DE TEXTO] ${res.filename} | Tamaño: ${res.width}x${res.height} | Altura estimada barra inferior: ~${res.barHeight}px`);
    } else {
      console.log(`✅ [LIMPIA] ${res.filename} | Tamaño: ${res.width}x${res.height}`);
    }
  }
}

run();

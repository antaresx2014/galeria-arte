import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const obrasDir = path.join(__dirname, '..', 'public', 'obras');

// Mapping of current files to new standard catalog files
const mapping = [
  // 1
  { src: 'gallinazos.jpg', target: 'OBRA-001-gallinazos.jpg', title: 'Gallinazos', category: 'Figurativo', h: 70, w: 100, price: 3200 },
  // 2
  { src: 'rosas-amarillas.jpg', target: 'OBRA-002-rosas-amarillas.jpg', title: 'Rosas Amarillas', category: 'Figurativo', h: 70, w: 50, price: 1850 },
  // 3
  { src: 'pareja-en-el-arbol.jpg', target: 'OBRA-003-abrazo-en-la-arboleda.jpg', title: 'Abrazo en la Arboleda', category: 'Figurativo', h: 100, w: 70, price: 3600 },
  // 4
  { src: 'tres-figuras-en-caliz.jpg', target: 'OBRA-004-tres-figuras-en-caliz.jpg', title: 'Las Tres Figuras en el Cáliz Azul', category: 'Figurativo', h: 80, w: 60, price: 2400 },
  // 5
  { src: 'WhatsApp Image 2026-04-15 at 04.28.10.jpeg', target: 'OBRA-005-lilith-la-bella.jpg', title: 'Lilith, la Bella', category: 'Figurativo', h: 100, w: 70, price: 2900 },
  // 6
  { src: 'WhatsApp Image 2026-04-15 at 05.39.21.jpeg', target: 'OBRA-006-la-pescaderia.jpg', title: 'La Pescadería', category: 'Figurativo', h: 100, w: 70, price: 3100 },
  // 7
  { src: 'WhatsApp Image 2026-04-18 at 23.10.30.jpeg', target: 'OBRA-007-las-infantas.jpg', title: 'Las Infantas', category: 'Figurativo', h: 90, w: 60, price: 2750 },
  // 8
  { src: 'WhatsApp Image 2026-04-20 at 09.25.55.jpeg', target: 'OBRA-008-pequeno-temerario.jpg', title: 'Pequeño Temerario', category: 'Paisaje', h: 70, w: 90, price: 2200 },
  // 9
  { src: 'WhatsApp Image 2026-04-20 at 22.56.19.jpeg', target: 'OBRA-009-maria-goretti.jpg', title: 'María Goretti', category: 'Figurativo', h: 100, w: 65, price: 2800 },
  // 10
  { src: 'WhatsApp Image 2026-04-21 at 11.16.35.jpeg', target: 'OBRA-010-casa-de-livia.jpg', title: 'Casa de Livia', category: 'Figurativo', h: 75, w: 90, price: 2600 },
  // 11
  { src: 'WhatsApp Image 2026-04-24 at 23.10.55.jpeg', target: 'OBRA-011-retrato-infantil.jpg', title: 'Retrato Infantil en Interior', category: 'Figurativo', h: 90, w: 70, price: 2300 },
  // 12
  { src: 'WhatsApp Image 2026-04-27 at 22.20.08.jpeg', target: 'OBRA-012-estudio-arquitectonico.jpg', title: 'Estudio de Interior Arquitectónico', category: 'Dibujo/Boceto', h: 100, w: 70, price: 1950 },
  // 13
  { src: 'WhatsApp Image 2026-04-28 at 13.43.45.jpeg', target: 'OBRA-013-la-floresta-5.jpg', title: 'La Floresta 5', category: 'Paisaje', h: 110, w: 70, price: 3400 },
  // 14
  { src: 'WhatsApp Image 2026-05-12 at 11.24.25.jpeg', target: 'OBRA-014-atardecer.jpg', title: 'Atardecer en el Bosque', category: 'Paisaje', h: 100, w: 65, price: 2700 },
  // 15
  { src: 'WhatsApp Image 2026-05-17 at 11.54.14.jpeg', target: 'OBRA-015-selvatico-animal.jpg', title: 'Selvático Animal', category: 'Figurativo', h: 100, w: 65, price: 2950 },
  // 16
  { src: 'WhatsApp Image 2026-05-22 at 10.26.04.jpeg', target: 'OBRA-016-la-reina-descalza.jpg', title: 'La Reina Descalza', category: 'Figurativo', h: 95, w: 60, price: 2850 },
  // 17
  { src: 'WhatsApp Image 2026-05-25 at 11.21.09.jpeg', target: 'OBRA-017-un-baile-nupcial.jpg', title: 'Un Baile Nupcial', category: 'Figurativo', h: 70, w: 85, price: 2500 },
  // 18
  { src: 'WhatsApp Image 2026-05-27 at 16.19.47.jpeg', target: 'OBRA-018-jerusalem.jpg', title: 'Jerusalem', category: 'Paisaje', h: 80, w: 90, price: 3100 },
  // 19
  { src: 'WhatsApp Image 2026-05-29 at 07.33.19.jpeg', target: 'OBRA-019-sendero-de-la-intuicion.jpg', title: 'Sendero de la Intuición', category: 'Paisaje', h: 105, w: 65, price: 2900 },
  // 20
  { src: 'WhatsApp Image 2026-05-29 at 09.58.55.jpeg', target: 'OBRA-020-flores-de-la-ira.jpg', title: 'Flores de la Ira', category: 'Figurativo', h: 100, w: 65, price: 2600 },
  // 21
  { src: 'WhatsApp Image 2026-05-29 at 10.47.36.jpeg', target: 'OBRA-021-la-malaguena.jpg', title: 'La Malagueña', category: 'Figurativo', h: 70, w: 85, price: 2750 },
  // 22
  { src: 'WhatsApp Image 2026-05-30 at 13.47.09.jpeg', target: 'OBRA-022-canonigo-decimononico.jpg', title: 'Canónigo Decimonónico', category: 'Figurativo', h: 70, w: 85, price: 2400 },
  // 23
  { src: 'WhatsApp Image 2026-05-31 at 11.50.44.jpeg', target: 'OBRA-023-padre-calzones.jpg', title: 'Padre Calzones', category: 'Figurativo', h: 95, w: 65, price: 2300 },
  // 24
  { src: 'WhatsApp Image 2026-06-06 at 22.37.24.jpeg', target: 'OBRA-024-pueblo-de-aragon.jpg', title: 'Pueblo de Aragón', category: 'Paisaje', h: 100, w: 65, price: 2850 },
  // 25
  { src: 'WhatsApp Image 2026-06-11 at 17.32.53.jpeg', target: 'OBRA-025-composicion-coral.jpg', title: 'Composición Coral de Figuras', category: 'Figurativo', h: 100, w: 75, price: 3500 },
];

// Files to remove (duplicates)
const filesToRemove = [
  'media_1792518314205.jpg',
  'media_1792518314379.jpg',
  'Screenshot_20261020_105535_Gallery.jpg'
];

filesToRemove.forEach(f => {
  const p = path.join(obrasDir, f);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('Removed duplicate/screenshot:', f);
  }
});

// Rename / Copy files
mapping.forEach(m => {
  const srcPath = path.join(obrasDir, m.src);
  const targetPath = path.join(obrasDir, m.target);
  if (fs.existsSync(srcPath)) {
    if (srcPath !== targetPath) {
      fs.copyFileSync(srcPath, targetPath);
      // Remove old file if it wasn't one of the base targets
      if (!m.src.startsWith('OBRA-')) {
        fs.unlinkSync(srcPath);
      }
    }
    console.log(`Organized: ${m.src} -> ${m.target}`);
  } else {
    console.warn(`Source not found: ${m.src}`);
  }
});

console.log('Finished organizing all 25 artworks into OBRA-XXX format.');

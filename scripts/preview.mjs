import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '..', 'public', 'obras');
const files = fs.readdirSync(dir);

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Preview Obras</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #121212; color: #eee; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .card { background: #1f1f1f; border-radius: 8px; overflow: hidden; border: 1px solid #333; }
  .img-box { height: 260px; background: #000; display: flex; align-items: center; justify-content: center; }
  img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .info { padding: 12px; }
  .num { font-size: 11px; color: #C5A059; font-weight: bold; }
  .name { font-size: 12px; word-break: break-all; margin-top: 4px; color: #bbb; }
</style>
</head>
<body>
<h1>Catálogo de Imágenes en /public/obras/ (${files.length} archivos)</h1>
<div class="grid">
`;

files.forEach((f, idx) => {
  html += `
  <div class="card">
    <div class="img-box">
      <img src="/obras/${encodeURIComponent(f)}" alt="${f}" loading="lazy" />
    </div>
    <div class="info">
      <span class="num">#${idx + 1}</span>
      <div class="name">${f}</div>
    </div>
  </div>`;
});

html += `
</div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'catalog-preview.html'), html);
console.log('Successfully written catalog-preview.html with', files.length, 'images');

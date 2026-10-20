import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '..', 'public', 'obras');
const files = fs.readdirSync(dir);
const hashes = {};

files.forEach(f => {
  const buf = fs.readFileSync(path.join(dir, f));
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (!hashes[hash]) hashes[hash] = [];
  hashes[hash].push(f);
});

console.log('Duplicates by exact MD5:');
let hasDups = false;
Object.entries(hashes).forEach(([h, arr]) => {
  if (arr.length > 1) {
    console.log(arr);
    hasDups = true;
  }
});
if (!hasDups) console.log('No exact MD5 duplicates.');

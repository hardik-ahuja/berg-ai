import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { embed } from './services/embedderService.js';
import { insert} from './services/vectorService.js';

// Handle __dirname manually in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function bootstrap() {
  const filePath = path.join(__dirname, 'documents.json');

  if (!fs.existsSync(filePath)) {
    console.warn('No documents.json found. Skipping preload.');
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const docs = JSON.parse(raw);

  if (!Array.isArray(docs) || docs.length === 0) {
    console.warn('documents.json is empty or invalid.');
    return;
  }

  try {
    const texts = docs.map(d => d.data);
    const vectors = await embed(texts);
    const payload = docs.map((doc, i) => ({
      id: doc.id || v4(),
      text: doc.data,
      embedding: vectors[i]
    }));

    const result = await insert(payload);
    console.log(`Preloaded ${result.count} documents into vector DB.`);
  } catch (err) {
    console.error('Failed to preload documents:', err.message);
  }
}

import { pipeline } from '@xenova/transformers';

let embedder = null;

export async function embed(text) {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const input = Array.isArray(text) ? text : [text];
  const embeddings = await Promise.all(
    input.map(t => embedder(t, { pooling: 'mean', normalize: true }))
  );
  return embeddings.map(r => Array.from(r.data));
}
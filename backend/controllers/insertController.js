import { v4 } from 'uuid';
import { insert } from '../services/vectorService.js';
import { embed } from '../services/embedderService.js';

export async function insertController(req, res) {
  const docs = req.body.documents;
  if (!docs || !Array.isArray(docs)) {
    return res.status(400).json({ error: 'Documents must be an array' });
  }

  try {
    const texts = docs.map(d => d.text);
    const vectors = await embed(texts);

    // Attach embeddings to metadata
    const payload = docs.map((meta, idx) => ({
      id: meta.id || v4(),
      text: meta.text,
      embedding: vectors[idx]
    }));

    const result = await insert(payload);
    res.json({
      message: `Successfully inserted ${result.count} documents`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
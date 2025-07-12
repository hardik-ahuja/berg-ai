import { Router } from 'express';
import { insert, search } from './services/vectorService.js';
import { embed } from './services/embedderService.js'; 
import { generate } from './services/generatorService.js';
import { requireApiKey } from './utils/auth.js';

const router = Router();

router.post('/insert', requireApiKey, async (req, res) => {
  const docs = req.body.documents;
  if (!docs || !Array.isArray(docs)) {
    return res.status(400).json({ error: 'Documents must be an array' });
  }

  try {
    const texts = docs.map(d => d.text);
    const vectors = await embed(texts);

    // Attach embeddings to metadata
    const payload = docs.map((meta, idx) => ({
      ...meta,
      embedding: vectors[idx]
    }));

    const result = await insert(payload);
    res.json(result.count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/search', requireApiKey, async (req, res) => {
  const { query, topK } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }
  try {
    const queryVec = await embed(query);
    const result = await search(queryVec, topK || 3);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

router.post('/query', requireApiKey, async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'query required' });

  try {
    const queryVec = await embed(query);
    const results = await search(queryVec, 1);
    const context = results[0][0].data;
    const prompt =  `You are a helpful assistant. Use the context to answer the question concisely. Context: ${context} Question: ${query} Answer:`;
    
    let response = await generate(prompt);
    const match = response.match(/Answer:(.*?)(?=Question:|Answer:|$)/s);

    if (match) {
      if (match[1]) {
        response= match[1].trim();
      } else {
        // fallback: everything before the start of match[0]
        const index = text.indexOf(match[0]);
        if (index > 0) {
          response = text.slice(0, index).trim();
        }
      }
    }

    res.json({ 'text': response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

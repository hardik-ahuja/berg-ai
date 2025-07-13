import { embed } from '../services/embedderService.js';
import { search } from '../services/vectorService.js';

export async function searchController (req, res) {
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
}; 
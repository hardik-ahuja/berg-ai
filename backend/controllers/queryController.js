import { embed } from '../services/embedderService.js';
import { generate } from '../services/generatorService.js';
import { search } from '../services/vectorService.js';

export async function queryController (req, res) {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'query required' });

  try {
    const queryVec = await embed(query);
    const results = await search(queryVec, 3);
    const context = results.map(r => r.text).join(' ');
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
};
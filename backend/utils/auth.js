import { VALID_API_KEYS } from '../config.js';

export function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

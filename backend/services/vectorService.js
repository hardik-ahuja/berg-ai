const BASE_URL = 'http://localhost:5001';

/**
 * Inserts documents into the Python vector DB.
 * @param {Array} docs }
 * @returns {Promise<{ count: number }>}
 */
export async function insert(docs) {
  const response = await fetch(`${BASE_URL}/insert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docs),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Insert failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Searches the vector DB with a query vector.
 * @param {Array<number>} vector
 * @param {number} topK 
 * @returns {Promise<Array<{ score: number, text: string }>>}
 */
export async function search(vector, topK = 3) {
  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vector, top_k: topK }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Search failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

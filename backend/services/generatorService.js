import { pipeline } from '@xenova/transformers';

let gpt2 = null;

async function loadGenerator() {
  if (!gpt2) {
    gpt2 = await pipeline('text-generation', 'Xenova/gpt2');
  }
}

export async function generate(prompt, maxTokens = 50) {
  if (!gpt2) await loadGenerator();
  const output = await gpt2(prompt, { max_new_tokens: maxTokens });
  return output[0].generated_text;
}


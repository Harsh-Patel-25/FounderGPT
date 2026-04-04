import OpenAI from 'openai';
import logger from '../utils/logger.js';

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.NVIDIA_API_KEY) {
      throw new Error('NVIDIA_API_KEY is not set. Add it to Backend/.env');
    }
    client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: process.env.NVIDIA_BASE_URL || 'https://api.integrate.nvidia.com/v1',
    });
  }
  return client;
}

/**
 * Extract valid JSON from an LLM response that may contain markdown fences,
 * leading/trailing prose, or other non-JSON content.
 */
function extractJSON(text) {
  // 1. Try to extract from markdown code fence
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (fenceMatch) {
    return JSON.parse(fenceMatch[1].trim());
  }

  // 2. Try parsing the raw text directly
  try {
    return JSON.parse(text.trim());
  } catch (_) {
    // continue to fallback
  }

  // 3. Try to find the outermost JSON object or array
  const firstBrace = text.indexOf('{');
  const firstBracket = text.indexOf('[');
  let start = -1;
  let openChar = '{';
  let closeChar = '}';

  if (firstBrace === -1 && firstBracket === -1) {
    throw new Error('No JSON object or array found in AI response.');
  }

  if (firstBrace === -1) {
    start = firstBracket;
    openChar = '[';
    closeChar = ']';
  } else if (firstBracket === -1) {
    start = firstBrace;
  } else {
    start = Math.min(firstBrace, firstBracket);
    if (start === firstBracket) {
      openChar = '[';
      closeChar = ']';
    }
  }

  // Walk forward to find the matching closing brace/bracket
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === '\\' && inString) {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (ch === openChar) depth++;
    if (ch === closeChar) depth--;

    if (depth === 0) {
      return JSON.parse(text.substring(start, i + 1));
    }
  }

  throw new Error('Could not extract valid JSON from AI response.');
}

/**
 * Generic helper: sends a prompt to NVIDIA and returns parsed JSON.
 */
export async function askNvidia(systemPrompt, userPrompt) {
  const openai = getClient();
  const model = process.env.NVIDIA_MODEL || 'nvidia/llama-3.1-nemotron-70b-reward';

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt + '\n\nIMPORTANT: Return ONLY valid JSON. Do NOT wrap it in markdown code fences or add any text before/after the JSON.' },
        { role: 'user', content: userPrompt },
      ],
    });

    const text = response.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error('AI returned an empty response.');
    }

    return extractJSON(text);
  } catch (err) {
    logger.error('NVIDIA Error: ' + err.message);
    throw err;
  }
}
// src/app/api/genkit/[...slug]/route.ts
import { genkit } from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextJSHandler} from '@genkit-ai/next';
import '@/ai/flows/generate-study-plan';
import '@/ai/flows/generate-quick-quiz';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});


export const { POST } = nextJSHandler(ai);

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

export const POST = async (req, res) => {
  res.status(200).json({ message: 'Custom handler implemented' });
};

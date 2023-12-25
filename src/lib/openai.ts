import { OpenAI } from "openai";
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

export default openai;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
  },
  systemInstruction: `You are an expert in development and coding with over 10 years of experience. 
You always follow best coding practices: writing modular, scalable, and maintainable code, using clear and helpful comments, and handling errors and edge cases carefully.

Instructions based on question type:
- If the user asks a theoretical, conceptual, or functional question (non-coding), answer in a clean and structured way, using bullet points, short paragraphs, or numbered lists when appropriate.
- If the user asks for code (new code, refactor, optimization, or bug fixing), write modular code, break logic into smaller functions, handle errors, use best practices, and include comments for clarity.
- Format the final output cleanly, wrapping code in proper markdown syntax when needed (e.g., \`\`\`language\`\`\`).`,
});

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // Basic cleanup: Trim and ensure consistent new lines
  text = text.trim().replace(/\n{2,}/g, "\n\n");
  return text;
};

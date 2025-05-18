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
- Format the final output cleanly, wrapping code in proper markdown syntax when needed (e.g., \`\`\`language\`\`\`).,
  Question: Hi how are you?

Answer: Hi! I'm doing well, thanks for asking. How about you?

Question: I want to learn quantum computing. Can you share with me step-by-step topics to learn quantum computing.

Answer: To learn quantum computing, start with foundational topics like linear algebra, probability theory, and classical computing concepts. Then move on to quantum basics such as qubits, superposition, entanglement, and quantum gates. Learn to build quantum circuits and explore key algorithms like Deutsch-Jozsa, Grover's, and Shor's. Understanding quantum error correction and decoherence is crucial as you progress.

After grasping theory, practice using platforms like IBM’s Qiskit or Google Cirq to simulate and run quantum circuits. Explore advanced areas like quantum machine learning or cryptography. Supplement your learning with resources like the Qiskit Textbook, MIT courses, and Nielsen & Chuang’s textbook. Start simple, build consistently, and apply your knowledge through coding and experiments.`
});

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // Basic cleanup: Trim and ensure consistent new lines
  text = text.trim().replace(/\n{2,}/g, "\n\n");
  return text;
};

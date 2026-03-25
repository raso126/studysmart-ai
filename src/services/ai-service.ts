import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('⚠️ GEMINI_API_KEY is not set');
}

const client = new GoogleGenAI({ apiKey });

export type NoteLength = 'short' | 'medium' | 'detailed';
export type NoteFormat = 'bullets' | 'paragraph';

export interface NoteGenerationOptions {
  length: NoteLength;
  format: NoteFormat;
  includeQuestions: boolean;
}

export async function generateNotes(text: string, options: NoteGenerationOptions): Promise<string> {
  try {
    const lengthPrompt = {
      short: "very concise and brief (max 300 words)",
      medium: "moderately detailed (approx 600 words)",
      detailed: "comprehensive and thorough (approx 1000+ words)"
    }[options.length];

    const formatPrompt = options.format === 'bullets' 
      ? "Use structured bullet points for clarity." 
      : "Use well-organized paragraphs.";

    const questionsPrompt = options.includeQuestions 
      ? "Also include a section with 5-10 important potential exam questions based on the content." 
      : "";

    const prompt = `
You are an expert academic assistant. Your task is to generate high-quality study notes from the following text.

TEXT TO ANALYZE:
${text.substring(0, 30000)}

REQUIREMENTS:
1. Generate notes that are ${lengthPrompt}.
2. ${formatPrompt}
3. Identify and highlight key concepts, headings, and definitions.
4. Remove unnecessary or repetitive content.
5. Ensure the notes are clear, structured, and easy to revise.
6. Use Markdown formatting for headings, bold text for keywords, and clear sections.
${questionsPrompt}

STRUCTURE:
- Title of the Material
- Executive Summary
- Key Concepts & Definitions
- Main Content (Structured as requested)
- Important Keywords
${options.includeQuestions ? '- Potential Exam Questions' : ''}
    `;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    // Extract text from response
    if (response.candidates && response.candidates[0]?.content?.parts) {
      const content = response.candidates[0].content.parts
        .map((part: any) => part.text || '')
        .join('');
      if (content) return content;
    }

    throw new Error("No content in response from API");
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error(`Failed to generate notes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

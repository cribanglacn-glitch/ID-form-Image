import { GoogleGenAI } from "@google/genai";

// Initialize the client. API_KEY is guaranteed to be in process.env per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates an edited version of the uploaded image based on a text prompt.
 * Uses gemini-2.5-flash-image (Nano Banana).
 */
export const generateImageEdit = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Ensure base64 string doesn't have the data prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/png', // Assuming PNG for simplicity, usually safe for inputs
            },
          },
        ],
      },
    });

    // Iterate through parts to find the image part
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    // Fallback if no image found but text exists (unlikely for this specific request but good for debugging)
    const textPart = parts.find(p => p.text);
    if (textPart) {
      throw new Error(`Model returned text instead of image: ${textPart.text}`);
    }

    throw new Error("No image data found in response");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load env vars

const GEMINI_API_KEY = process.env.GEMINI_TOKEN;

if (!GEMINI_API_KEY) {
  throw new Error("Bro, you forgot to set HF_API_KEY in your .env file.");
}

interface Message {
  role: "user" | "ai";
  content: string;
}

async function getAIResponse(query: string): Promise<void> {


  try {
    console.log(query)
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: "query"}
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parts = response.data.candidates
      .flatMap((candidate: { content: { parts: any; }; }) => candidate.content.parts)
      .map((part: { text: any; }) => part.text)
      .join("\n");

    console.log("Gemini says:\n", parts);
    return parts;     
  } catch (err: any) {
    console.error("Error calling HuggingFace API:", err.response?.data || err.message);
  }
}

export default getAIResponse;

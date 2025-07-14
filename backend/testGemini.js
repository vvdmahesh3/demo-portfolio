import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-pro",
});

(async () => {
  try {
    const res = await model.invoke("Tell me a joke.");
    console.log("✅ Gemini replied:", res.content);
  } catch (err) {
    console.error("❌ Gemini test failed:", err);
  }
})();

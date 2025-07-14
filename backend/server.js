import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let resumeText = "";

// 🔍 PDF extraction logic
async function extractTextFromPDF(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    fullText += text + "\n";
  }
  return fullText;
}

// 🚀 Load resume
(async () => {
  try {
    resumeText = await extractTextFromPDF("./VVD_Mahesh(Resume).pdf");
    console.log("✅ Resume loaded successfully.");
  } catch (err) {
    console.error("❌ Resume load error:", err.message);
  }
})();

// 🎯 Setup Gemini (official way)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// 💬 API route
app.post("/api/resume-chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Message is required" });

  try {
    const prompt = `
You are ResumeBot. Based on the following resume, answer the user's question.

Resume:
${resumeText}

Question:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini error:", err.message);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

// 📡 Start server
app.listen(5000, () => {
  console.log("🚀 ResumeBot API running at http://localhost:5000");
});

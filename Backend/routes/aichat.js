import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(
  process.env.GCP_API_KEY
);

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    res.json({
      reply: reply
    });

  } catch (error) {
    console.log("GEMINI ERROR:", error);

    res.status(500).json({
      error: "AI failed"
    });
  }
});

export default router;
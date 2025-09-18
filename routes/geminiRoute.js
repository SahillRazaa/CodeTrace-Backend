const router = require("express").Router();
const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiLimiter } = require("../middleware/rateLimiter");
const { getOptimizationPrompt } = require("../prompts/optimizerPrompts");
const { getDryRunPrompt } = require("../prompts/dryRunPrompts");
const { getRealLifeAnalogyPrompt } = require("../prompts/realLifeAnalogyPrompts");
const { getBuggyCodePrompt, getEvaluationPrompt } = require("../prompts/bugFixerPrompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const callGemini = async (prompt, res) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.status(200).json({ success: true, data: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ success: false, error: "Failed to get response from AI" });
  }
};

router.post("/optimize", geminiLimiter, async (req, res) => {
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }
  const prompt = getOptimizationPrompt(code, language);
  await callGemini(prompt, res);
});

router.post("/dry-run", geminiLimiter, async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }
  const prompt = getDryRunPrompt(code);
  await callGemini(prompt, res);
});

router.post("/real-life-analogy", geminiLimiter, async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }
  const prompt = getRealLifeAnalogyPrompt(code);
  await callGemini(prompt, res);
});

router.post("/bug-fixer/generate", geminiLimiter, async (req, res) => {
  const { difficulty, language, category } = req.body;
  if (!difficulty || !language || !category) {
    return res.status(400).json({ error: "Difficulty, language, and category are required" });
  }
  const prompt = getBuggyCodePrompt(difficulty, language, category);
  await callGemini(prompt, res);
});

router.post("/bug-fixer/evaluate", geminiLimiter, async (req, res) => {
  const { buggyCode, userSolution } = req.body;
  if (!buggyCode || !userSolution) {
    return res.status(400).json({ error: "Buggy code and user solution are required" });
  }
  const prompt = getEvaluationPrompt(buggyCode, userSolution);
  await callGemini(prompt, res);
});

module.exports = router;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Debug: check key loaded or not
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in backend/.env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const otpStore = {};

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Send OTP
app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`);
  res.json({ message: "OTP sent successfully" });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});

// Gemini Chat Route
app.post("/chat", async (req, res) => {
  try {
    console.log("✅ /chat route hit");

    const { message } = req.body;
    console.log("User Message:", message);

    if (!message || message.trim() === "") {
      return res.status(400).json({ reply: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are the official AI assistant of Ammanttra Organics.

About Ammanttra:
- Natural and organic brand
- Focus on herbal, wellness, and plant-based products

Products:
- Moringa Powder (nutrition & energy)
- Carrot Powder (skin & health)
- Beetroot Powder (blood & wellness)

Instructions:
- Reply in Hinglish + English mix
- Keep answers short and helpful
- Suggest natural/organic solutions
- Recommend Ammanttra products if relevant
- Do not give medical claims

User: ${message}
`;

    console.log("📤 Sending prompt to Gemini...");

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    console.log("✅ Gemini replied successfully");

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini Full Error:", error);

    res.status(500).json({
      reply: "AI error occurred",
      error: error.message,
    });
  }
});
// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
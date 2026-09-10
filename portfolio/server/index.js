import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory, root directory, or environment
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Registered Admin Email (from personalInfo.email)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "rangadaschakravarthy02@gmail.com";

// Initialize Groq SDK if GROQ_API_KEY is available
const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

// In-memory OTP Store for Admin Authentication
// Map<email, { otp: string, expiresAt: number, attempts: number }>
const otpStore = new Map();

// Helper to generate a random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to create Nodemailer Transporter on-demand
function createTransporter() {
  const smtpUser = process.env.SMTP_USER || ADMIN_EMAIL;
  const smtpPass = process.env.SMTP_PASS || "";
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

// Helper function to dispatch OTP email via Nodemailer
async function sendOtpEmail(targetEmail, otpCode) {
  const smtpUser = process.env.SMTP_USER || ADMIN_EMAIL;
  const smtpPass = process.env.SMTP_PASS || "";

  const mailOptions = {
    from: `"Rangadas Portfolio Security" <${smtpUser}>`,
    to: targetEmail,
    subject: `🔐 Admin Login OTP Code: ${otpCode}`,
    text: `Your Admin Portal OTP is ${otpCode}. Code expires in 5 minutes.`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050816; padding: 35px; color: #ffffff; border-radius: 20px; max-width: 480px; margin: 0 auto; border: 1px solid #1e293b; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #38bdf8; font-size: 22px; font-weight: 800; margin: 0; font-family: monospace;">ADMIN PORTAL SECURITY</h2>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 6px; font-weight: 600;">Multi-Factor Authentication Code</p>
        </div>

        <div style="background: #0f172a; padding: 24px; text-align: center; border-radius: 16px; border: 1px solid #334155; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #38bdf8; font-family: monospace;">${otpCode}</span>
        </div>

        <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6; text-align: center;">
          Enter this 6-digit One-Time Password to authorize login to the Admin Control Center. This code expires in <strong style="color: #38bdf8;">5 minutes</strong>.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b;">
          <p style="margin: 0;">Sent to registered admin: <strong>${targetEmail}</strong></p>
          <p style="margin-top: 4px;">If you did not initiate this request, please secure your portfolio credentials immediately.</p>
        </div>
      </div>
    `,
  };

  if (smtpPass) {
    try {
      const transporter = createTransporter();
      const info = await transporter.sendMail(mailOptions);
      console.log(`[NODEMAILER SUCCESS] Sent OTP ${otpCode} to ${targetEmail} (Message ID: ${info.messageId})`);
    } catch (err) {
      console.error("[NODEMAILER SMTP ERROR] Could not send email via SMTP:", err.message);
      console.log(`[FALLBACK OTP FOR LOGS]: ${otpCode}`);
    }
  } else {
    console.log(`\n======================================================`);
    console.log(`[NODEMAILER DISPATCH (NO SMTP PASS)] Target: ${targetEmail}`);
    console.log(`[GENERATED OTP CODE]: ${otpCode}`);
    console.log(`[EXPIRATION]: 5 minutes`);
    console.log(`======================================================\n`);
  }
}

// -------------------------------------------------------------
// PHONETIC & STT INTENT DEDUCTOR
// Deduces user intents even when STT mishears words (e.g. flight mode -> light mode)
// -------------------------------------------------------------
function deduceIntents(msg) {
  if (!msg) return null;
  const text = msg.toLowerCase().trim();

  // Wake keywords: "hi alan", "hey alan", "hello alan", "hi allen", "wake alan"
  if (
    text.includes("hi alan") ||
    text.includes("hey alan") ||
    text.includes("hello alan") ||
    text.includes("hi allen") ||
    text.includes("high alan") ||
    text.includes("hi alain") ||
    text.includes("wake alan") ||
    text === "alan"
  ) {
    return {
      action: { type: "WAKE" },
      reply: "Hello! I am ALAN, Rangadas's AI portfolio assistant. How can I help you today?"
    };
  }

  // Sleep keywords: "thanks alan", "thank you alan", "thanks allen", "bye alan", "sleep alan"
  if (
    text.includes("thanks alan") ||
    text.includes("thank you alan") ||
    text.includes("thanks allen") ||
    text.includes("thank alan") ||
    text.includes("bye alan") ||
    text.includes("sleep alan") ||
    text.includes("good night alan") ||
    text.includes("goodnight alan")
  ) {
    return {
      action: { type: "SLEEP" },
      reply: "You're welcome! Going to sleep mode now. Say 'Hi Alan' anytime to wake me up!"
    };
  }

  // Theme Keywords (including STT phonetic mishearings):
  // Light mode: "flight mode", "lite mode", "bright mode", "white theme", "light mode"
  if (
    text.includes("light mode") ||
    text.includes("light theme") ||
    text.includes("flight mode") ||
    text.includes("lite mode") ||
    text.includes("bright mode") ||
    text.includes("white mode") ||
    text.includes("white theme")
  ) {
    return {
      action: { type: "THEME", value: "light" },
      reply: "Switching to light theme as requested!"
    };
  }

  // Dark mode: "duck mode", "bark mode", "dark mode", "dark theme", "night mode"
  if (
    text.includes("dark mode") ||
    text.includes("dark theme") ||
    text.includes("duck mode") ||
    text.includes("bark mode") ||
    text.includes("night mode") ||
    text.includes("black theme")
  ) {
    return {
      action: { type: "THEME", value: "dark" },
      reply: "Switching to dark theme mode!"
    };
  }

  if (
    text.includes("toggle theme") ||
    text.includes("change theme") ||
    text.includes("switch theme") ||
    text.includes("toggle mode")
  ) {
    return {
      action: { type: "THEME", value: "toggle" },
      reply: "Toggling theme mode!"
    };
  }

  // Navigation Keywords (including STT mishearings):
  if (
    text.includes("project") ||
    text.includes("pro ject") ||
    text.includes("projection") ||
    text.includes("work")
  ) {
    return {
      action: { type: "NAVIGATE", section: "projects" },
      reply: "Navigating to Projects! Rangadas has built 8+ high-impact full-stack & AI software systems."
    };
  }

  if (
    text.includes("skill") ||
    text.includes("skull") ||
    text.includes("scale") ||
    text.includes("technology") ||
    text.includes("tech stack")
  ) {
    return {
      action: { type: "NAVIGATE", section: "skills" },
      reply: "Scrolling to Skills matrix! Rangadas masters 18 core technologies including Python, React, Java, TypeScript, and Node.js."
    };
  }

  if (
    text.includes("education") ||
    text.includes("eduation") ||
    text.includes("degree") ||
    text.includes("college") ||
    text.includes("university") ||
    text.includes("school")
  ) {
    return {
      action: { type: "NAVIGATE", section: "education" },
      reply: "Navigating to Education timeline! Rangadas holds a B.Tech in CSE from Anurag University with CGPA 9.26."
    };
  }

  if (
    text.includes("achievement") ||
    text.includes("award") ||
    text.includes("hackathon") ||
    text.includes("winner")
  ) {
    return {
      action: { type: "NAVIGATE", section: "achievements" },
      reply: "Showing Achievements wall! Rangadas won 1st place in the Department Hackathon and Hackattack 2024."
    };
  }

  if (
    text.includes("certif") ||
    text.includes("credential")
  ) {
    return {
      action: { type: "NAVIGATE", section: "certifications" },
      reply: "Navigating to Certifications! Rangadas holds 8 verified industry credentials including AWS, NPTEL Java, and HackerRank."
    };
  }

  if (
    text.includes("contact") ||
    text.includes("connect") ||
    text.includes("contract") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("reach")
  ) {
    return {
      action: { type: "NAVIGATE", section: "contact" },
      reply: "Opening Contact section! You can reach Rangadas at rangadaschakravarthy02@gmail.com or send a direct message."
    };
  }

  if (
    text.includes("top") ||
    text.includes("home") ||
    text.includes("start") ||
    text.includes("hero")
  ) {
    return {
      action: { type: "NAVIGATE", section: "hero" },
      reply: "Navigating to top Hero section!"
    };
  }

  return null;
}

// -------------------------------------------------------------
// 1. ALAN AI CHAT ENDPOINT
// -------------------------------------------------------------
app.post("/api/alan/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Check phonetic rules first for high accuracy & zero latency
    const deduced = deduceIntents(message);

    if (!groq) {
      if (deduced) {
        return res.json(deduced);
      }
      return res.json({
        reply: `ALAN Response: ${message}. Rangadas is a Software Engineer (Anurag Univ, CGPA 9.26) skilled in Full Stack, AI, and Data Analysis.`,
        action: { type: "NONE" }
      });
    }

    // Use Groq LLM to intelligently deduce fuzzy speech inputs & generate responses
    const systemPrompt = `You are ALAN, the AI Assistant for Rangadas Chakravarthy's software engineering portfolio.
The user input may come from speech-to-text and contain phonetic mishearings.
Phonetic STT intent examples:
- "flight mode" -> Light theme mode (action: { type: "THEME", value: "light" })
- "duck mode" / "night mode" -> Dark theme mode (action: { type: "THEME", value: "dark" })
- "projections" / "pro jects" -> Projects section (action: { type: "NAVIGATE", section: "projects" })
- "skulls" / "scales" -> Skills section (action: { type: "NAVIGATE", section: "skills" })
- "eduation" / "location degree" -> Education section (action: { type: "NAVIGATE", section: "education" })
- "hi allen" / "high alan" / "hi alan" -> Wake command (action: { type: "WAKE" })
- "thanks allen" / "thanks alan" -> Sleep command (action: { type: "SLEEP" })

Respond ONLY in valid JSON format:
{
  "reply": "Friendly response string to speak to user",
  "action": {
    "type": "WAKE" | "SLEEP" | "NAVIGATE" | "THEME" | "NONE",
    "section": "projects" | "skills" | "education" | "achievements" | "certifications" | "contact" | "hero",
    "value": "light" | "dark" | "toggle"
  }
}

Portfolio Data Context:
${context || ""}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 350,
      response_format: { type: "json_object" }
    });

    const rawJson = completion.choices[0]?.message?.content;
    if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson);
        return res.json(parsed);
      } catch (err) {
        // Fallback to deduced
      }
    }

    if (deduced) return res.json(deduced);

    return res.json({
      reply: "I am ALAN, Rangadas's AI assistant. Ask me to show projects, skills, education, or change theme mode!",
      action: { type: "NONE" }
    });

  } catch (error) {
    console.error("Alan AI API Error:", error);
    const deduced = deduceIntents(req.body.message);
    if (deduced) return res.json(deduced);
    return res.status(500).json({ error: "Failed to generate AI response." });
  }
});

app.post("/api/admin/request-otp", async (req, res) => {
  const { isResend } = req.body || {};
  const adminEmail = ADMIN_EMAIL.toLowerCase();
  const existingRecord = otpStore.get(adminEmail);

  // Deduplication guard: if an active OTP was issued less than 30s ago and it's not an explicit resend click, reuse existing OTP
  if (!isResend && existingRecord && (Date.now() - existingRecord.createdAt < 30 * 1000) && Date.now() < existingRecord.expiresAt) {
    console.log(`[DEDUPLICATION GUARD] Reusing active OTP for ${adminEmail} (issued ${Math.round((Date.now() - existingRecord.createdAt)/1000)}s ago)`);
    return res.json({
      success: true,
      email: ADMIN_EMAIL,
      message: `OTP code sent via Nodemailer to ${ADMIN_EMAIL}. Code expires in 5 minutes.`
    });
  }

  const otp = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minute expiry

  otpStore.set(adminEmail, {
    otp,
    createdAt: Date.now(),
    expiresAt,
    attempts: 0
  });

  // Dispatch OTP email via Nodemailer
  await sendOtpEmail(adminEmail, otp);

  return res.json({
    success: true,
    email: ADMIN_EMAIL,
    message: `OTP code sent via Nodemailer to ${ADMIN_EMAIL}. Code expires in 5 minutes.`
  });
});

// -------------------------------------------------------------
// 3. ADMIN VERIFY OTP ENDPOINT
// -------------------------------------------------------------
app.post("/api/admin/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({ error: "OTP code is required." });
  }

  const adminEmail = ADMIN_EMAIL.toLowerCase();
  const record = otpStore.get(adminEmail);

  if (!record) {
    return res.status(400).json({ error: "No active OTP request found. Please click 'Resend OTP'." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(adminEmail);
    return res.status(400).json({ error: "OTP has expired. Please request a new code." });
  }

  if (record.attempts >= 5) {
    otpStore.delete(adminEmail);
    return res.status(400).json({ error: "Maximum OTP verification attempts exceeded. Request a new code." });
  }

  // STRICT COMPARISON ONLY — DEMO LOGINS & BYPASSES REMOVED
  if (record.otp !== otp.trim()) {
    record.attempts += 1;
    const remaining = 5 - record.attempts;
    return res.status(400).json({ error: `Invalid OTP code. ${remaining} attempts remaining.` });
  }

  // OTP verified cleanly
  otpStore.delete(adminEmail);
  const token = `admin_session_${Date.now()}_${Math.random().toString(36).substring(2)}`;

  return res.json({
    success: true,
    token,
    message: "Admin authentication successful."
  });
});

// -------------------------------------------------------------
// 4. CONTACT FORM ENDPOINT
// -------------------------------------------------------------
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  console.log(`[CONTACT MESSAGE RECEIVED] From: ${name} <${email}>: ${message}`);
  return res.json({ success: true, message: "Message received." });
});

app.listen(PORT, () => {
  console.log(`Portfolio Express API Server running on port ${PORT}`);
  console.log(`Admin Notifications Target: ${ADMIN_EMAIL}`);
});

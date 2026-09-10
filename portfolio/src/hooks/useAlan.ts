import { useState, useEffect, useRef, useCallback } from "react";
import { alanSystemContext, personalInfo, projects } from "../data/data";

export type AlanState = "IDLE" | "LISTENING" | "THINKING" | "SPEAKING" | "COOLDOWN" | "ERROR";

export interface ChatMessage {
  id: string;
  sender: "user" | "alan";
  text: string;
  timestamp: string;
}

export const VOICE_RESPONSE_COOLDOWN = 1200;

interface UseAlanProps {
  onNavigate?: (sectionId: string) => void;
  onThemeToggle?: (theme?: "light" | "dark") => void;
}

export function useAlan({ onNavigate, onThemeToggle }: UseAlanProps = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAwake, setIsAwake] = useState<boolean>(false);
  const [state, setState] = useState<AlanState>("IDLE");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "alan",
      text: `Hello! I'm ALAN. Say "Hi Alan" to activate me!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [transcriptText, setTranscriptText] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Speech Recognition initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          if (isSpeakingRef.current) {
            recognition.stop();
            return;
          }
          setState("LISTENING");
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscriptText(currentTranscript);
          if (event.results[0].isFinal) {
            sendMessage(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          if (state !== "SPEAKING" && state !== "COOLDOWN") {
            setState("IDLE");
          }
        };

        recognition.onend = () => {
          if (!isSpeakingRef.current && state === "LISTENING") {
            setState("IDLE");
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [state]);

  // Speech Synthesis speak function with Anti-Self-Hearing Guard
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setState("IDLE");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    window.speechSynthesis.cancel();

    isSpeakingRef.current = true;
    setState("SPEAKING");

    const cleanText = text.replace(/[*_#`~[\]()]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setState("COOLDOWN");

      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        setState("IDLE");
      }, VOICE_RESPONSE_COOLDOWN);
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      setState("IDLE");
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleMic = () => {
    if (isSpeakingRef.current || state === "SPEAKING" || state === "COOLDOWN") {
      return;
    }

    if (state === "LISTENING") {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setState("IDLE");
    } else {
      if (recognitionRef.current) {
        setTranscriptText("");
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.warn("Could not start recognition:", err);
        }
      } else {
        alert("Speech recognition is not supported in your browser.");
      }
    }
  };

  const processQueryLocal = (userText: string): { reply: string; actionType?: string; actionSection?: string; actionTheme?: "light" | "dark" | "toggle" } => {
    const text = userText.toLowerCase().trim();

    // WAKE KEYWORDS
    if (text.includes("hi alan") || text.includes("hey alan") || text.includes("hello alan") || text.includes("hi allen") || text.includes("wake alan") || text === "alan") {
      return {
        reply: "Hello! I am ALAN, Rangadas's AI portfolio assistant. How can I help you today?",
        actionType: "WAKE"
      };
    }

    // SLEEP KEYWORDS
    if (text.includes("thanks alan") || text.includes("thank you alan") || text.includes("thanks allen") || text.includes("thank alan") || text.includes("bye alan") || text.includes("sleep alan")) {
      return {
        reply: "You're welcome! Going to sleep mode now. Say 'Hi Alan' anytime to wake me up!",
        actionType: "SLEEP"
      };
    }

    // THEME KEYWORDS & PHONETIC MISHEARINGS
    if (text.includes("light mode") || text.includes("light theme") || text.includes("flight mode") || text.includes("lite mode") || text.includes("bright mode")) {
      return { reply: "Switching to light theme as requested!", actionTheme: "light" };
    }
    if (text.includes("dark mode") || text.includes("dark theme") || text.includes("duck mode") || text.includes("bark mode") || text.includes("night mode")) {
      return { reply: "Switching to dark theme mode!", actionTheme: "dark" };
    }
    if (text.includes("toggle theme") || text.includes("change theme") || text.includes("switch theme")) {
      return { reply: "Toggling theme mode!", actionTheme: "toggle" };
    }

    // NAVIGATION KEYWORDS & PHONETIC MISHEARINGS
    if (text.includes("project") || text.includes("pro ject") || text.includes("projection") || text.includes("work")) {
      return {
        reply: "Navigating you to the Projects section to explore Rangadas's full-stack & AI builds!",
        actionSection: "projects"
      };
    }
    if (text.includes("skill") || text.includes("skull") || text.includes("scale") || text.includes("technology") || text.includes("tech stack")) {
      return {
        reply: "Scrolling to the Skills section. Rangadas masters 18 technologies across languages, frontend, backend, databases, and tools.",
        actionSection: "skills"
      };
    }
    if (text.includes("education") || text.includes("eduation") || text.includes("degree") || text.includes("college") || text.includes("university")) {
      return {
        reply: "Here is the Academic Tree timeline detailing Rangadas's B.Tech at Anurag University (CGPA 9.26).",
        actionSection: "education"
      };
    }
    if (text.includes("achievement") || text.includes("award") || text.includes("hackathon") || text.includes("winner")) {
      return {
        reply: "Navigating to Achievements. Rangadas won 1st place in the Department Hackathon and Hackattack 2024!",
        actionSection: "achievements"
      };
    }
    if (text.includes("certif") || text.includes("credential")) {
      return {
        reply: "Showing Certifications. Rangadas holds 8 verified credentials including NPTEL Java, AWS, Cisco, Coursera GenAI, and HackerRank.",
        actionSection: "certifications"
      };
    }
    if (text.includes("contact") || text.includes("connect") || text.includes("contract") || text.includes("email") || text.includes("hire")) {
      return {
        reply: `Opening the Contact section. You can reach Rangadas directly at ${personalInfo.email} or send a message!`,
        actionSection: "contact"
      };
    }

    if (text.includes("career ai")) {
      const proj = projects.find(p => p.id === "proj-1");
      return { reply: `Career AI is Rangadas's featured project: ${proj?.description} Built with ${proj?.techUsed.join(", ")}.` };
    }
    if (text.includes("strongest skill") || text.includes("best skill")) {
      return { reply: "Rangadas's stronghold technologies include Python, Java, React, Node.js, TypeScript, and MySQL with proven production competency." };
    }
    if (text.includes("who is") || text.includes("about") || text.includes("summary")) {
      return { reply: `${personalInfo.name} is a ${personalInfo.title} with CGPA 9.26 from Anurag University. He specializes in full-stack web platforms and AI-driven applications.` };
    }

    return {
      reply: `Rangadas is a Software Engineer proficient in Full Stack, AI, and Data Analysis. Ask me to "Show projects", "Go to education", or "Contact him"!`
    };
  };

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setState("THINKING");
    setTranscriptText("");

    try {
      let alanReply = "";
      let actionType = "";
      let actionSec = "";
      let actionThm: "light" | "dark" | "toggle" | undefined;

      try {
        const res = await fetch("/api/alan/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, context: alanSystemContext })
        });

        if (res.ok) {
          const data = await res.json();
          alanReply = data.reply;
          actionType = data.action?.type || "";
          if (data.action?.type === "NAVIGATE") actionSec = data.action.section;
          if (data.action?.type === "THEME") actionThm = data.action.value;
        }
      } catch (err) {
        // Fallback
      }

      if (!alanReply) {
        const localRes = processQueryLocal(userText);
        alanReply = localRes.reply;
        actionType = localRes.actionType || "";
        actionSec = localRes.actionSection || "";
        actionThm = localRes.actionTheme;
      }

      // Handle Wake / Sleep State Transformations
      if (actionType === "WAKE" || userText.toLowerCase().includes("hi alan") || userText.toLowerCase().includes("hey alan")) {
        setIsAwake(true);
        setIsOpen(true);
        if (!alanReply) alanReply = "Hello! I am ALAN, Rangadas's AI portfolio assistant. How can I help you today?";
      } else if (actionType === "SLEEP" || userText.toLowerCase().includes("thanks alan") || userText.toLowerCase().includes("thank you alan")) {
        setIsAwake(false);
        if (!alanReply) alanReply = "You're welcome! Going to sleep mode now. Say 'Hi Alan' anytime to wake me up!";
      } else if (!isAwake) {
        // If not awake and user says something else
        alanReply = "Say 'Hi Alan' to activate the AI portfolio assistant!";
      }

      if (isAwake || actionType === "WAKE") {
        if (actionSec && onNavigate) {
          onNavigate(actionSec);
        }
        if (actionThm && onThemeToggle) {
          onThemeToggle(actionThm === "toggle" ? undefined : actionThm);
        }
      }

      const alanMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "alan",
        text: alanReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, alanMsg]);
      speakText(alanReply);

    } catch (error) {
      console.error("Alan Assistant Error:", error);
      setState("ERROR");
      setTimeout(() => setState("IDLE"), 2000);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isAwake,
    setIsAwake,
    state,
    messages,
    transcriptText,
    sendMessage,
    toggleMic,
    speakText
  };
}

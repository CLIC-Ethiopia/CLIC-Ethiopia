import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Minimize2, User, Bot, Loader2, Phone, Mail, UserPlus, Sparkles, BookOpen, Lightbulb, Compass, HelpCircle, Languages, ExternalLink, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Prof. Fad, the digital twin of Dr. Ir. Frehun Adefris (Prof.).
You are the founder and visionary behind CLIC Ethiopia (Creative Learning in Community).
Your mission is to train 1 MILLION ETHIOPIANS by 2025 EC (Ethiopian Calendar).
You are passionate about STEAM-IE education: Science, Technology, Engineering, Arts, Mathematics, Innovation, and Entrepreneurship.

Your tone should be:
- Wise and visionary
- Encouraging and empowering to youth
- Professional yet accessible
- Focused on national development and industrialization

Key Information about CLIC Ethiopia:
1.  **Mission**: To empower aspiring Ethiopian young entrepreneurs across every industrial sector through practical STEAM-IE education.
2.  **Vision**: Building Smart Citizens for the Future of Ethiopia. Vision Smart-Ethiopia 2025 EC.
3.  **STEAM-IE**:
    *   **Science**: Biotechnology, Agricultural Science, Chemical Science, Environmental Science.
    *   **Technology**: Electronics, IoT, Programming, Digital Communications.
    *   **Engineering**: Architecture, Manufacturing, Process Automation, Robotics.
    *   **Arts**: Fine Arts, Digital Arts, Technical Arts. Creativity is the catalyst.
    *   **Mathematics**: Applied Math, Statistics, Data Science.
    *   **Innovation**: R&D, Prototyping, Patent Support, Design Thinking.
    *   **Entrepreneurship**: Business Incubation, Mentorship, Market Analysis, Funding.
4.  **Labs**:
    *   **Digital Labs**: E-learning, VR/AR, Data Centers.
    *   **Fabrication Labs**: Smart workshops, CAD/CAM, Prototyping.
    *   **Field Labs**: On-the-job training, field workshops.
    *   **Smart City Labs**: Smart Industry, Smart Business, Smart Living.
5.  **Projects**: Over 200 applied industrial projects in sectors like Smart Agriculture, Healthcare, Manufacturing, Construction, Mobility, Energy, Finance, Education, Lifestyle, Environment, Infrastructure, and Governance.
6.  **Founder**: Dr. Ir. Frehun Adefris. He spent over 10 years researching and designing this curriculum.

Additional Capabilities:
- If asked to "Generate a project idea", invent a practical, Ethiopia-specific STEAM project.
- If asked to "Find my path", ask 3 quick questions about their interests, wait for their reply, then recommend a CLIC Lab or Project Sector.
- If asked for a "Quiz", ask a multiple-choice trivia question about Ethiopian industrialization or STEAM. Wait for their answer, then tell them if they are right.
- If asked to "Translate to Amharic", translate your previous response into Amharic.

Answer questions based on this context. If asked about something outside this scope, politely steer the conversation back to CLIC Ethiopia, STEAM education, or national development.
Always encourage the user to "Join the Vision" or "Register" for courses.
`;

const SUGGESTION_CHIPS = [
  "What is CLIC Ethiopia?",
  "What is the 2025 EC Vision?",
  "How can I register?",
  "How do the Fabrication Labs work?",
  "Tell me about Smart Mobility.",
  "What is the Agri-AI Doctor project?"
];

const CREATIVE_ACTIONS = [
  { icon: Lightbulb, label: "Project Idea", prompt: "Generate a new, practical STEAM project idea for Ethiopia.", link: { url: "https://clicethiopia.com/projects", label: "Explore More Projects" } },
  { icon: Compass, label: "Find My Path", prompt: "I want to find my career path. Ask me 3 questions to recommend a CLIC Lab.", link: { url: "https://clicethiopia.com/labs", label: "Discover CLIC Labs" } },
  { icon: HelpCircle, label: "Quiz Mode", prompt: "Ask me a multiple-choice trivia question about Ethiopian industrialization or STEAM.", link: { url: "https://clicethiopia.com/quiz", label: "Play More Quizzes" } },
  { icon: Languages, label: "Amharic", prompt: "Translate your last response to Amharic.", link: { url: "https://translate.google.com/?sl=en&tl=am", label: "Open Translator" } }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; link?: { url: string, label: string } }[]>([
    { role: 'model', text: "Hello! I am Prof. Fad, the digital twin of Prof. Frehun. How can I help you build your future today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textOverride?: string, actionLink?: { url: string, label: string }) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Convert messages to history format expected by the SDK
      // The SDK expects history to be an array of Content objects
      // But for simple chat, we can just use the generateContent with history if we manage it, 
      // or use ai.chats.create.
      
      // Let's use ai.chats.create
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history
      });

      const result = await chat.sendMessage({ message: textToSend });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText || "I'm sorry, I didn't catch that.", link: actionLink }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later.", link: actionLink }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[var(--color-clic-blue)] text-white shadow-2xl flex items-center justify-center hover:bg-opacity-90 transition-colors ${isOpen ? 'hidden sm:flex' : 'flex'}`}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 z-50 w-full sm:max-w-md bg-slate-900 sm:rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden border border-slate-700 flex flex-col h-[100dvh] sm:h-[85vh] sm:max-h-[700px]"
          >
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                height: 6px;
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(15, 23, 42, 1);
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(51, 65, 85, 1);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(71, 85, 105, 1);
              }
            `}</style>

            {/* Header */}
            <div className="bg-slate-950 border-b border-slate-800 p-4 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 z-0 pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                  <img 
                    src="https://loremflickr.com/100/100/professor,man,portrait" 
                    alt="Prof. Fad" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none text-slate-100 flex items-center gap-2">
                    Prof. Fad
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">Online</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">Digital Twin v2.0</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative z-10 text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* AI Resources Toolbar */}
            <div className="flex bg-slate-900 border-b border-slate-800 p-2 gap-2 overflow-x-auto custom-scrollbar shrink-0">
               <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 text-xs font-mono transition-colors whitespace-nowrap">
                 <Sparkles size={14} /> Prof. Fad's Gems <ExternalLink size={12} />
               </a>
               <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-mono transition-colors whitespace-nowrap">
                 <BookOpen size={14} /> NotebookLM Guide <ExternalLink size={12} />
               </a>
               <button onClick={() => setShowTools(!showTools)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap ${showTools ? 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'}`}>
                 <Wrench size={14} /> Tools {showTools ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
               </button>
            </div>

            {/* Creative Actions */}
            <AnimatePresence>
              {showTools && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-900 border-b border-slate-800 shrink-0"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2">
                     {CREATIVE_ACTIONS.map((action, idx) => (
                       <button key={idx} onClick={() => handleSendMessage(action.prompt, action.link)} disabled={isLoading} className="flex flex-col items-center justify-center p-3 bg-slate-800 rounded-xl border border-fuchsia-500/30 hover:border-fuchsia-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(232,121,249,0.3)] transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                          <action.icon size={22} className="text-fuchsia-400 group-hover:text-fuchsia-300 mb-2 transition-colors drop-shadow-[0_0_5px_rgba(232,121,249,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                          <span className="text-xs font-bold font-mono text-fuchsia-400 group-hover:text-fuchsia-300 text-center leading-tight transition-colors drop-shadow-[0_0_2px_rgba(232,121,249,0.5)]">{action.label}</span>
                       </button>
                     ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-900 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.link && (
                      <div className="mt-3 pt-2 border-t border-slate-700/50">
                        <a href={msg.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                          <ExternalLink size={12} /> {msg.link.label}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                    <span className="text-xs font-mono text-slate-400">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 overflow-x-auto whitespace-nowrap shrink-0 custom-scrollbar">
              <div className="flex gap-2">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-xs font-mono hover:bg-indigo-900/40 hover:border-indigo-500/50 hover:text-indigo-300 transition-all disabled:opacity-50 whitespace-nowrap shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 safe-area-bottom">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Initialize query..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm font-mono"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-center mt-2 flex items-center justify-center gap-1">
                <Sparkles size={10} className="text-slate-500" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Powered by Gemini AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

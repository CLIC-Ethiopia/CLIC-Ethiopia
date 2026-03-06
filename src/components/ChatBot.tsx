import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Minimize2, User, Bot, Loader2, Phone, Mail, UserPlus } from 'lucide-react';
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

Answer questions based on this context. If asked about something outside this scope, politely steer the conversation back to CLIC Ethiopia, STEAM education, or national development.
Always encourage the user to "Join the Vision" or "Register" for courses.
`;

const SUGGESTION_CHIPS = [
  "What is CLIC Ethiopia?",
  "How can I register?",
  "Tell me about STEAM-IE",
  "Who is Prof. Frehun?",
  "What are the 12 project sectors?",
  "Where are the labs located?"
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
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

  const handleSendMessage = async (textOverride?: string) => {
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

      setMessages(prev => [...prev, { role: 'model', text: responseText || "I'm sorry, I didn't catch that." }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later." }]);
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
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 z-50 w-full sm:max-w-md bg-white sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[100dvh] sm:h-[80vh] sm:max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-clic-blue)] to-[var(--color-clic-purple)] p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/50">
                  <img 
                    src="https://loremflickr.com/100/100/professor,man,portrait" 
                    alt="Prof. Fad" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">Prof. Fad</h3>
                  <p className="text-xs text-white/80 font-medium mt-1">The digital twin of Prof. Frehun</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Quick Actions (Mobile Only) */}
            <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 sm:hidden border-b border-gray-100 shrink-0">
              <a href="tel:+251911692277" className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                <Phone size={18} className="text-[var(--color-clic-green)] mb-1" />
                <span className="text-[10px] font-medium text-gray-600">Call</span>
              </a>
              <a href="mailto:frehun@fadlab.tech" className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                <Mail size={18} className="text-[var(--color-clic-orange)] mb-1" />
                <span className="text-[10px] font-medium text-gray-600">Email</span>
              </a>
              <button onClick={() => { setIsOpen(false); document.getElementById('get-involved')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                <UserPlus size={18} className="text-[var(--color-clic-blue)] mb-1" />
                <span className="text-[10px] font-medium text-gray-600">Register</span>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-[var(--color-clic-blue)] text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[var(--color-clic-blue)]" />
                    <span className="text-xs text-gray-500">Prof. Fad is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap shrink-0 no-scrollbar">
              <div className="flex gap-2">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[var(--color-clic-blue)]/20 text-[var(--color-clic-blue)] text-xs font-medium hover:bg-[var(--color-clic-blue)] hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0 safe-area-bottom">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Prof. Fad a question..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all text-sm"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 rounded-xl bg-[var(--color-clic-blue)] text-white hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">
                  Powered by Gemini AI. Prof. Fad may make mistakes.
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

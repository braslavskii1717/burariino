import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Салют! 🪵\nЯ на связи. Мои датчики показывают, что ты готов изменить мир.\n\nЧто будем делать? Писать код, считать бюджет или придумывать сказку?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMsgId,
      role: 'model',
      content: '',
      timestamp: new Date()
    }]);

    try {
      const stream = streamGeminiResponse('gemini-2.5-flash', userMsg.content, history);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, content: fullText } : msg
        ));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
        
        {/* TOP HUD */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between px-6 pointer-events-none">
            <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-neon-cyan/50 rounded-full"></div>)}
            </div>
            <div className="text-neon-cyan/30 font-mono text-xs tracking-[0.5em] uppercase">Neural Link Established</div>
            <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-neon-cyan/50 rounded-full"></div>)}
            </div>
        </div>

        {/* CHAT MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth texture-hologram">
            {messages.map((msg, idx) => (
            <div 
                key={msg.id} 
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
                <div className={`flex max-w-[85%] lg:max-w-[70%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* AVATAR */}
                    <div className="shrink-0 pt-2 relative">
                        {msg.role === 'model' ? (
                            <div className="w-14 h-14 rounded-full border-2 border-wood-light bg-[#3E2723] shadow-lg flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-50"></div>
                                <span className="text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300">🤥</span>
                                <div className="absolute -bottom-1 w-full h-1 bg-neon-gold blur-[2px]"></div>
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-neon-cyan/50 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                                <span className="text-neon-cyan text-xs font-bold">U</span>
                            </div>
                        )}
                    </div>

                    {/* MESSAGE BUBBLE */}
                    <div className="flex flex-col">
                        <div className={`relative px-6 py-4 rounded-2xl backdrop-blur-md shadow-2xl ${
                            msg.role === 'user' 
                                ? 'bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-tr-sm' 
                                : 'texture-wood border border-wood-light/30 text-white rounded-tl-sm'
                        }`}>
                            {msg.role === 'model' && (
                                <div className="absolute -top-3 left-0 bg-wood-dark border border-wood-light/50 px-2 py-0.5 rounded text-[10px] font-bold text-wood-light tracking-wider shadow-md">
                                    БУРАТИИНО AI
                                </div>
                            )}
                            
                            <div className={`whitespace-pre-wrap leading-7 text-[15px] ${msg.role === 'model' ? 'font-serif' : 'font-sans font-medium'}`}>
                                {msg.content || (
                                    <div className="flex gap-1.5 items-center h-6">
                                        <span className="w-1.5 h-1.5 bg-wood-light rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-wood-light rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-wood-light rounded-full animate-bounce delay-200"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Timestamp or Footer */}
                        <span className={`text-[10px] mt-1 opacity-40 font-mono ${msg.role === 'user' ? 'text-right text-neon-cyan' : 'text-left text-wood-light'}`}>
                            {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                </div>
            </div>
            ))}
            <div ref={messagesEndRef} className="h-12" />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent sticky bottom-0 z-20">
            <div className="max-w-4xl mx-auto relative">
                
                {/* Golden Glow Effect behind input */}
                <div className="absolute -inset-[2px] bg-gold-gradient rounded-full blur-md opacity-20"></div>

                <div className="relative flex items-center bg-[#1a1512] border border-wood-light/30 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden h-16 group focus-within:border-wood-light transition-colors">
                    
                    {/* Icon Left */}
                    <div className="pl-6 text-2xl opacity-50 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all">
                        🪵
                    </div>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Напиши что-нибудь, и я найду ключик..."
                        className="w-full bg-transparent text-white placeholder-wood-light/30 px-4 outline-none font-serif text-lg h-full"
                    />
                    
                    {/* Action Button */}
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue}
                        className="mr-2 w-12 h-12 rounded-full texture-gold flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-xl">➤</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};

export default ChatInterface;
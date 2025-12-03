import React from 'react';
import { PROJECT_MODULES } from '../constants';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isChatActive: boolean;
  setIsChatActive: (val: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  isChatActive, 
  setIsChatActive 
}) => {
  return (
    <div className="flex flex-col h-full lg:pr-2">
      
      {/* BRAND HEADER */}
      <div className="h-24 flex items-center gap-4 px-6 mb-4 relative">
        {/* Logo Container with Golden Ring */}
        <div className="relative w-16 h-16 rounded-full texture-gold shadow-lg flex items-center justify-center p-[3px]">
            <div className="w-full h-full bg-wood-dark rounded-full overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-3xl z-10">🤥</div>
               {/* Cap Stripes */}
               <div className="absolute top-0 w-full h-1/2 bg-red-500 opacity-20 rotate-12"></div>
            </div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="font-display text-2xl text-wood-light drop-shadow-md tracking-wider">
            БУРАТИИНО
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className="flex-1 rounded-[25px] bg-[#3E2723]/40 shadow-inner-wood border border-white/5 p-3 overflow-y-auto space-y-4">
        
        <div className="text-[10px] font-bold text-wood-light/50 uppercase tracking-[0.2em] px-4 py-2 text-center border-b border-white/5">
          Модуль Связи
        </div>

        {/* CHAT BUTTON - HERO */}
        <button
          onClick={() => setIsChatActive(true)}
          className={`group relative w-full h-20 rounded-2xl transition-all duration-300 flex items-center px-4 overflow-hidden border-2 ${
            isChatActive 
              ? 'border-neon-gold bg-gradient-to-r from-wood-medium to-wood-dark shadow-neon-gold' 
              : 'border-transparent hover:bg-white/5 hover:border-white/10'
          }`}
        >
           {/* Background Active Glow */}
           {isChatActive && <div className="absolute inset-0 bg-gold-gradient opacity-10"></div>}

           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 transition-transform group-hover:scale-110 shadow-lg ${
             isChatActive ? 'texture-gold text-black' : 'bg-slate-800 text-gray-400'
           }`}>
             🔑
           </div>
           
           <div className="flex flex-col items-start">
             <span className={`font-serif font-bold text-lg ${isChatActive ? 'text-wood-light' : 'text-slate-400'}`}>
               Чат с Другом
             </span>
             <span className="text-[10px] font-mono text-white/40">AI-Link: Active</span>
           </div>
        </button>

        <div className="text-[10px] font-bold text-wood-light/50 uppercase tracking-[0.2em] px-4 py-2 text-center border-b border-white/5 mt-6">
          База Знаний
        </div>

        {/* DOC MODULES */}
        <div className="space-y-2">
          {PROJECT_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setIsChatActive(false);
                setActiveTab(module.id);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between group transition-all duration-200 border ${
                !isChatActive && activeTab === module.id
                  ? 'bg-wood-dark border-wood-light/50 shadow-lg'
                  : 'border-transparent hover:bg-[#3E2723] hover:border-white/5'
              }`}
            >
              <span className={`font-sans text-sm font-medium ${
                 !isChatActive && activeTab === module.id ? 'text-white' : 'text-slate-400'
              }`}>
                {module.title}
              </span>
              
              {/* Indicator Dot */}
              <div className={`w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] ${
                 !isChatActive && activeTab === module.id ? 'bg-neon-cyan' : 'bg-slate-700'
              }`}></div>
            </button>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-4 p-4 rounded-2xl bg-black/20 border border-white/5">
        <div className="flex justify-between items-center text-[10px] text-wood-light/60 font-mono">
            <span>Ver: 2.0.4 (RU)</span>
            <span>🔋 100%</span>
        </div>
      </div>

    </div>
  );
};

export default Navigation;
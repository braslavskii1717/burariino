import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ChatInterface from './components/ChatInterface';
import ProjectDocs from './components/ProjectDocs';
import { PROJECT_MODULES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PROJECT_MODULES[0].id);
  const [isChatActive, setIsChatActive] = useState<boolean>(true);

  const activeModule = PROJECT_MODULES.find(m => m.id === activeTab) || PROJECT_MODULES[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans selection:bg-neon-gold selection:text-black">
      
      {/* --- ATMOSPHERE LAYERS (Background) --- */}
      
      {/* Layer 1: The Dark Forest (Base) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] to-[#050505] z-0"></div>

      {/* Layer 2: Cyber Grid (Floor) */}
      <div className="absolute bottom-0 w-full h-[60%] bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)] opacity-20 pointer-events-none z-0"></div>

      {/* Layer 3: Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-wood-light opacity-10 blur-[150px] rounded-full z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-neon-purple opacity-10 blur-[150px] rounded-full z-0"></div>

      {/* Layer 4: Floating Dust/Spores */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-0 animate-float"></div>


      {/* --- MAIN DEVICE FRAME --- */}
      <div className="relative z-10 flex w-full h-full items-center justify-center p-4 lg:p-8">
        
        {/* The "Wooden Tablet" Container */}
        <div className="w-full max-w-[1600px] h-full texture-wood rounded-[40px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_2px_10px_rgba(255,255,255,0.2)] border border-wood-dark/50 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Metal rim effect around the device */}
          <div className="absolute inset-0 rounded-[35px] border-[2px] border-wood-light/20 pointer-events-none z-50"></div>

          {/* SIDEBAR (Left Panel) */}
          <div className="w-full lg:w-80 h-auto lg:h-full flex-shrink-0 relative z-20">
            <Navigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              isChatActive={isChatActive}
              setIsChatActive={setIsChatActive}
            />
          </div>

          {/* MAIN SCREEN (Right Panel) */}
          <div className="flex-1 h-full lg:pl-4 pt-4 lg:pt-0 relative z-10">
            {/* The "Screen" itself - Black glass set into the wood */}
            <div className="w-full h-full bg-[#0B0E14] rounded-[30px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] border-[4px] border-[#1a1a1a] relative flex flex-col">
              
              {/* Screen Glare Reflection */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-white/5 to-transparent rounded-bl-[100px] pointer-events-none z-50"></div>

              {isChatActive ? (
                <ChatInterface />
              ) : (
                <ProjectDocs module={activeModule} />
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
import React from 'react';
import { ProjectModule } from '../types';

interface ProjectDocsProps {
  module: ProjectModule;
}

const ProjectDocs: React.FC<ProjectDocsProps> = ({ module }) => {
  return (
    <div className="h-full overflow-y-auto bg-[#e8e4dc] text-slate-800 relative scroll-smooth">
      {/* Paper Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none fixed z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-8 sm:p-16">
        
        {/* Header Block */}
        <header className="mb-16 text-center relative border-b-2 border-wood-dark/10 pb-8">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-wood-dark/5 border border-wood-dark/10 text-xs font-mono uppercase tracking-widest text-wood-medium">
                Official Document
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-black text-[#2c241b] mb-4 uppercase tracking-tight">
                {module.title}
            </h1>
            <div className="flex justify-center gap-2 text-wood-medium/40 text-sm font-serif italic">
                <span>Created by Papa Carlo Inc.</span>
                <span>•</span>
                <span>Top Secret</span>
            </div>
        </header>

        <div className="space-y-16">
          {module.sections.map((section) => (
            <section key={section.id} className="relative">
              
              {/* Section Decoration */}
              <div className="absolute -left-12 top-0 text-6xl opacity-5 font-serif select-none hidden xl:block">§</div>

              <h2 className="text-3xl font-serif font-bold text-[#3E2723] mb-8 flex items-center gap-4">
                <span className="w-8 h-1 bg-hat-red block rounded-full"></span>
                {section.title}
              </h2>
              
              <div className="prose prose-lg prose-slate max-w-none font-serif leading-loose text-[#4a4036]">
                {section.type === 'code' ? (
                  <div className="not-prose rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border-4 border-[#2d2d2d] my-6">
                    <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333]">
                        <span className="font-mono text-xs text-gray-500 uppercase">{section.language}</span>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                    </div>
                    <pre className="p-6 overflow-x-auto text-sm font-mono text-blue-200">
                      <code>{section.content.trim()}</code>
                    </pre>
                  </div>
                ) : section.type === 'financials' ? (
                    <div className="not-prose my-8 overflow-hidden rounded-xl border border-wood-medium/20 shadow-xl bg-white/50">
                        <div className="p-1 bg-wood-gradient"></div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="font-mono text-sm whitespace-pre text-[#3E2723]">{section.content}</pre>
                        </div>
                        <div className="bg-wood-light/10 p-3 text-center text-xs font-bold text-wood-dark uppercase">
                            * Прогноз может меняться
                        </div>
                    </div>
                ) : (
                  <div className="whitespace-pre-wrap">
                    {section.content}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
        
        {/* Footer Signature */}
        <div className="mt-24 pt-12 border-t-2 border-dashed border-wood-dark/20 text-center">
            <div className="font-script text-4xl text-wood-medium mb-2 opacity-60 font-serif italic">Буратиино</div>
            <p className="text-xs font-mono uppercase text-gray-400">Digital Sovereign Assistant</p>
        </div>

      </div>
    </div>
  );
};

export default ProjectDocs;
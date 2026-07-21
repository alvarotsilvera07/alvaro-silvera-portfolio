'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('proyectos');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex justify-center pb-8 pt-4 bg-black">
      <button 
        onClick={scrollToProjects}
        className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer focus:outline-none"
        aria-label="Descubrí mis proyectos"
      >
        <span className="text-xs uppercase tracking-[0.25em] font-medium group-hover:tracking-[0.3em] transition-all">
          Descubrí mis proyectos
        </span>
        <div className="p-2 rounded-full border border-zinc-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all animate-bounce">
          <ChevronDown size={20} className="text-orange-500" />
        </div>
      </button>
    </div>
  );
}

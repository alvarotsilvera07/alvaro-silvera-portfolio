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
    <div className="w-full flex justify-center pb-8 pt-4 bg-cinema-bg">
      <button 
        onClick={scrollToProjects}
        className="group flex flex-col items-center gap-2 text-stone-400 hover:text-cinema-gold transition-colors cursor-pointer focus:outline-none"
        aria-label="Descubrí mis proyectos"
      >
        <span className="text-xs uppercase tracking-[0.25em] font-medium group-hover:tracking-[0.3em] transition-all">
          Descubrí mis proyectos
        </span>
        <div className="p-2 rounded-full border border-stone-800 group-hover:border-cinema-gold/50 group-hover:bg-cinema-gold/10 transition-all animate-bounce">
          <ChevronDown size={20} className="text-cinema-gold" />
        </div>
      </button>
    </div>
  );
}

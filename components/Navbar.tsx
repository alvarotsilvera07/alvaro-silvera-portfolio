'use client';
import React, { useState, useEffect } from 'react';
import Timecode from './Timecode';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-famicom-body/95 border-b-2 border-famicom-body-dark/50 py-3 shadow-md' 
        : 'bg-transparent py-5'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO / INITIALS + POWER LED */}
        <div className="flex items-center gap-5 select-none">
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
            className={`text-2xl font-black tracking-wider transition-colors duration-300 ${
              scrolled ? 'text-stone-900' : 'text-white'
            }`}
          >
            AS<span className={scrolled ? 'text-famicom-red' : 'text-famicom-gold'}>.</span>
          </a>
          
          <span className={`text-lg ${scrolled ? 'text-famicom-body-dark' : 'text-stone-700'}`}>|</span>

          {/* POWER LED INDICATOR */}
          <div className="flex items-center gap-2">
            <span 
              className={`w-3 h-3 rounded-full transition-all duration-500 border border-black/35 ${
                scrolled 
                  ? 'bg-famicom-green shadow-[0_0_8px_#4CAF50]' 
                  : 'bg-famicom-power-red shadow-[0_0_8px_#D03A3A]'
              }`} 
              aria-hidden="true"
            />
            <span className={`font-mono text-[9px] tracking-wider font-bold flex items-center gap-1 ${
              scrolled ? 'text-stone-600' : 'text-stone-400'
            }`}>
              <span>POWER</span>
              <span className="text-[7px] opacity-60">パワー</span>
            </span>
          </div>
        </div>

        {/* CONTROLS / NAV LINKS */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => scrollToSection('inicio')}
            className={`px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-y-0.5 shadow-sm ${
              scrolled 
                ? 'bg-famicom-body-dark/15 border-famicom-body-dark/60 text-famicom-red hover:bg-famicom-body-dark/30 hover:text-famicom-red-light shadow-inner' 
                : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-850 hover:text-white'
            }`}
          >
            INICIO
          </button>
          
          <button 
            onClick={() => scrollToSection('proyectos')}
            className={`px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-y-0.5 shadow-sm ${
              scrolled 
                ? 'bg-famicom-body-dark/15 border-famicom-body-dark/60 text-famicom-red hover:bg-famicom-body-dark/30 hover:text-famicom-red-light shadow-inner' 
                : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-850 hover:text-white'
            }`}
          >
            PROYECTOS
          </button>

          <button 
            onClick={() => scrollToSection('contacto')}
            className={`px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-y-0.5 shadow-sm ${
              scrolled 
                ? 'bg-famicom-body-dark/15 border-famicom-body-dark/60 text-famicom-red hover:bg-famicom-body-dark/30 hover:text-famicom-red-light shadow-inner' 
                : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-850 hover:text-white'
            }`}
          >
            CONTACTO
          </button>
        </div>
      </nav>
    </header>
  );
}


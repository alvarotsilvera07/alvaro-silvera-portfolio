'use client';
import React, { useState, useEffect } from 'react';
import Timecode from './Timecode';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        ? 'bg-cinema-bg/80 backdrop-blur-md border-b border-stone-900/80 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO / INITIALS + TIMECODE */}
        <div className="flex items-center gap-4">
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
            className="text-2xl font-black tracking-wider text-cinema-fg hover:opacity-80 transition-opacity"
          >
            AS<span className="text-cinema-gold">.</span>
          </a>
          <span className="hidden sm:inline text-stone-850">|</span>
          <div className="hidden sm:flex items-center gap-1.5 opacity-60 bg-stone-950/40 border border-stone-900/50 px-2 py-0.5 rounded font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-pulse shadow-[0_0_6px_rgba(139,46,46,0.6)]" />
            <Timecode />
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 md:gap-10">
          <button 
            onClick={() => scrollToSection('inicio')}
            className="text-sm md:text-base text-stone-300 hover:text-cinema-gold font-medium transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection('proyectos')}
            className="text-sm md:text-base text-stone-300 hover:text-cinema-gold font-medium transition-colors cursor-pointer"
          >
            Proyectos
          </button>
          <button 
            onClick={() => scrollToSection('contacto')}
            className="text-sm md:text-base text-stone-300 hover:text-cinema-gold font-medium transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </div>
      </nav>
    </header>
  );
}

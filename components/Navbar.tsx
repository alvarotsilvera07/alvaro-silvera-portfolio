'use client';
import React, { useState, useEffect } from 'react';

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
        ? 'bg-black/70 backdrop-blur-md border-b border-zinc-800/60 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO / INITIALS */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
          className="text-2xl font-black tracking-wider text-white hover:opacity-80 transition-opacity"
        >
          AS<span className="text-orange-500">.</span>
        </a>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 md:gap-10">
          <button 
            onClick={() => scrollToSection('inicio')}
            className="text-sm md:text-base text-zinc-300 hover:text-orange-500 font-medium transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection('proyectos')}
            className="text-sm md:text-base text-zinc-300 hover:text-orange-500 font-medium transition-colors cursor-pointer"
          >
            Proyectos
          </button>
          <button 
            onClick={() => scrollToSection('contacto')}
            className="text-sm md:text-base text-zinc-300 hover:text-orange-500 font-medium transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </div>
      </nav>
    </header>
  );
}

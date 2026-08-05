'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';
import { ChevronLeft, ChevronRight, Play, Code } from 'lucide-react';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const projects = [
  {
    title: "A la pelotita!",
    description: "Sistema SaaS para la reserva y gestión de turnos deportivos en tiempo real. Optimiza la administración de canchas y mejora la experiencia de reserva.",
    image: "/assets/alapelotita.png",
    tags: ["JavaScript", "Python", "PostgreSQL", "Docker"],
    link: "https://app.alapelotita.com.ar/",
    classification: "M · GESTIÓN DEPORTIVA",
    objectPosition: "35% center",
    badge: "ESTRENO 2026",
    isLive: true,
  },
  {
    title: "Plataforma de Sistemas Web",
    description: "Desarrollo de infraestructura digital de alto rendimiento. Enfoque en soluciones escalables y modernas.",
    image: "/assets/web.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://prism-systems.vercel.app/",
    classification: "M · SISTEMAS WEB",
    badge: "SELECCIÓN OFICIAL",
  },
  {
    title: "Voto Electrónico",
    description: "Sistema robusto en Java siguiendo el patrón Modelo-Vista-Controlador. Integridad de datos y arquitectura modular.",
    image: "/assets/voto.png",
    tags: ["Java", "MVC", "Security"],
    link: "https://github.com/alvarotsilvera07/VotoElectronico-Unvime",
    classification: "R · SEGURIDAD & MVC",
    badge: "SELECCIÓN OFICIAL",
    objectPosition: "right center",
  },
  {
    title: "Gestor de Tareas CLI",
    description: "Herramienta funcional de línea de comandos para administración eficiente de tareas y persistencia de archivos.",
    image: "/assets/gestor.png",
    tags: ["TypeScript", "POO", "Modularización"],
    link: "https://github.com/alvarotsilvera07/Gestor-de-Tareas-",
    classification: "G · HERRAMIENTAS CLI",
    badge: "SELECCIÓN OFICIAL",
  }
];

export default function ProjectGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingState, setAnimatingState] = useState<'idle' | 'ejecting' | 'inserting'>('idle');
  const [displayIndex, setDisplayIndex] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll container arrows
  const checkArrows = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const handleScrollClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const step = 312; // Cartridge width (280px) + gap (32px)
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - step 
      : container.scrollLeft + step;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Give smooth scroll some time before verifying arrow state
    setTimeout(checkArrows, 300);
  };

  const selectProject = (index: number) => {
    if (index === displayIndex || animatingState !== 'idle') return;
    
    // Smoothly scroll container to center the active cartridge
    const container = scrollContainerRef.current;
    if (container) {
      const step = 312;
      const scrollPosition = index * step - (container.clientWidth / 2) + 140; // 140 is half cartridge width
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setTimeout(checkArrows, 300);
    }

    setAnimatingState('ejecting');
    
    // Phase 1: Eject cartridge out of slot (200ms)
    setTimeout(() => {
      setDisplayIndex(index);
      setAnimatingState('inserting');
      
      // Phase 2: Insert new cartridge (250ms)
      setTimeout(() => {
        setAnimatingState('idle');
      }, 250);
    }, 200);
  };

  const currentProject = projects[displayIndex];

  // Drag-to-scroll implementation
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    scrollContainerRef.current.style.cursor = 'grabbing';
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMoveContainer = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    checkArrows();
  };

  return (
    <section className="py-24 max-w-full overflow-hidden bg-famicom-bg relative">
      <div id="proyectos" className="scroll-mt-28" />

      {/* Main Console Interface Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 flex flex-col items-center select-none">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] bg-famicom-red text-famicom-body px-3 py-1 rounded-sm mb-4 font-bold shadow-md flex items-center gap-1.5">
            <span>PROJECT DECK SELECTOR</span>
            <span className="text-[8px] opacity-60 font-normal">デッキ</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas text-white uppercase tracking-widest leading-tight">
            Proyectos Realizados
          </h2>
        </div>

        {/* 1. THE CONSOLE MONITOR (Selected Project Detail Panel) */}
        <div className="famicom-matte-texture border-4 border-stone-400/40 p-4 sm:p-8 rounded-3xl shadow-2xl flex flex-col border-b-[8px] border-r-[6px] mb-12 relative">
          
          {/* Decorative Console Label */}
          <div className="absolute top-3 left-6 hidden sm:flex items-center gap-1.5 opacity-35 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-famicom-red-light" />
            <span className="font-mono text-[8px] font-bold text-stone-700 tracking-wider">VIDEO OUTPUT 01</span>
          </div>

          <div className="famicom-crt-screen p-5 sm:p-8 border-[6px] sm:border-8 border-stone-850 rounded-2xl flex flex-col lg:flex-row gap-8 items-stretch relative min-h-[320px]">
            
            {/* Screen Info (Left / Main Panel) */}
            <div className="w-full lg:w-2/3 flex flex-col justify-between z-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3 text-[10px] font-mono text-famicom-gold/80 tracking-widest uppercase border-b border-stone-900 pb-2 select-none">
                  <span className="flex items-center gap-1">
                    <span>PROJECT DETAILS</span>
                    <span className="text-[7px] opacity-60 font-normal">プロジェクト詳細</span>
                  </span>
                  <span>&bull;</span>
                  <span>{currentProject.badge}</span>
                  {currentProject.isLive && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-famicom-green font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-famicom-green shadow-[0_0_4px_#4CAF50]" />
                        ONLINE
                      </span>
                    </>
                  )}
                </div>

                <h3 className={`${bebasNeue.className} text-4xl sm:text-5xl text-white tracking-wider leading-none mb-4`}>
                  {currentProject.title}
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {currentProject.description}
                </p>
              </div>

              {/* Specs & Actions Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-stone-900">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest select-none">Classification</span>
                  <span className="text-[10px] font-mono tracking-widest text-famicom-gold border border-famicom-gold/20 px-2 py-0.5 rounded uppercase bg-famicom-red/10 self-start select-none">
                    {currentProject.classification}
                  </span>
                </div>

                {/* Tech specifications styled as game code spec labels */}
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono tracking-wider text-stone-400 border border-stone-850 px-2 py-0.5 rounded bg-stone-950/50 select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Screen Action / Visual Cartridge State (Right Panel) */}
            <div className="w-full lg:w-1/3 flex flex-col justify-between items-center bg-stone-950/40 rounded-xl p-4 sm:p-6 border border-stone-900 z-10 relative">
              
              {/* Eject / Insert slot visualization */}
              <div className="w-full text-center mb-4 select-none">
                <span className="font-mono text-[9px] text-stone-500 font-bold block mb-1 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <span>CONSOLE DECK STATE</span>
                  <span className="text-[7px] opacity-60 font-normal">デッキ状態</span>
                </span>
                
                {/* Physical Slot Hole representation */}
                <div className="famicom-cartridge-slot w-full h-20 max-w-[200px] mx-auto relative overflow-hidden flex items-end justify-center">
                  
                  {/* Cartridge sliding element inside console */}
                  <div 
                    className={`w-[85%] bg-stone-500 border border-stone-600 rounded-t-md border-b-0 shadow-lg px-2 pt-1 flex flex-col justify-between select-none ${
                      animatingState === 'ejecting' 
                        ? 'transform -translate-y-full opacity-0 transition-all duration-200 ease-in' 
                        : animatingState === 'inserting'
                        ? 'transform -translate-y-full opacity-0' 
                        : 'transform translate-y-[20%] opacity-100 transition-all duration-[250ms] ease-out'
                    }`}
                    style={{ height: '80%' }}
                  >
                    <div className="w-full bg-famicom-red text-[6px] font-mono py-0.5 text-center text-white rounded-t-sm font-bold uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                      {currentProject.title}
                    </div>
                    <div className="bg-stone-650 h-5 w-full rounded-sm opacity-50 flex items-center justify-center">
                      <span className="w-8 h-0.5 bg-stone-800 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons styled as Game Controllers */}
              <div className="w-full flex flex-col gap-3 font-mono">
                {currentProject.link.includes('github.com') ? (
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="famicom-tactile-btn-red w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#C0392B] hover:bg-[#D94F3F] text-white text-xs font-bold rounded-xl text-center select-none"
                  >
                    <Code size={14} />
                    <span className="flex items-center gap-1.5">
                      <span>SELECT: VIEW REPO</span>
                      <span className="text-[7px] opacity-60">セレクト</span>
                    </span>
                  </a>
                ) : (
                  <>
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="famicom-tactile-btn-red w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#C0392B] hover:bg-[#D94F3F] text-white text-xs font-bold rounded-xl text-center select-none"
                    >
                      <Play size={12} fill="white" />
                      <span className="flex items-center gap-1.5">
                        <span>START: LAUNCH DEMO</span>
                        <span className="text-[7px] opacity-60">スタート</span>
                      </span>
                    </a>
                    
                    <a
                      href="https://github.com/alvarotsilvera07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="famicom-tactile-btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-400 text-stone-800 text-xs font-bold rounded-xl text-center select-none border border-stone-500"
                    >
                      <Code size={14} className="text-stone-750" />
                      <span className="flex items-center gap-1.5">
                        <span>SELECT: GITHUB DECK</span>
                        <span className="text-[7px] opacity-65">セレクト</span>
                      </span>
                    </a>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 2. THE CARTRIDGE DECK RACK (Horizontal Scroller) */}
        <div className="relative w-full group/track mt-8 select-none">
          <span className="font-mono text-[9px] text-stone-500 font-bold tracking-widest mb-4 uppercase text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5 select-none">
            <span>CARTRIDGE RACK (SCROLL OR DRAG TO EXPLORE)</span>
            <span className="text-[7px] opacity-60 font-normal">カートリッジラック</span>
          </span>

          {/* Left Arrow button - Always visible but styled when disabled */}
          <button
            onClick={() => handleScrollClick('left')}
            disabled={!showLeftArrow}
            className={`absolute left-0 lg:-left-12 z-30 top-[50%] -translate-y-1/2 bg-stone-900 border border-stone-800 p-2 md:p-3 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center ${
              showLeftArrow 
                ? 'opacity-100 hover:bg-famicom-red-light hover:border-famicom-red-light text-white cursor-pointer' 
                : 'opacity-20 cursor-not-allowed pointer-events-none text-stone-600'
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow button - Always visible but styled when disabled */}
          <button
            onClick={() => handleScrollClick('right')}
            disabled={!showRightArrow}
            className={`absolute right-0 lg:-right-12 z-30 top-[50%] -translate-y-1/2 bg-stone-900 border border-stone-800 p-2 md:p-3 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center ${
              showRightArrow 
                ? 'opacity-100 hover:bg-famicom-red-light hover:border-famicom-red-light text-white cursor-pointer' 
                : 'opacity-20 cursor-not-allowed pointer-events-none text-stone-600'
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrolleable Container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMoveContainer}
            className="flex overflow-x-auto gap-8 py-6 scrollbar-none snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing focus:outline-none px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projects.map((project, index) => {
              const isSelected = displayIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => selectProject(index)}
                  className={`w-[280px] flex-shrink-0 snap-center transition-all duration-300 transform active:scale-95 cursor-pointer cartridge-hover ${
                    isSelected ? '-translate-y-2 cartridge-active' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Visual Cartridge Body */}
                  <div className={`w-full bg-[#484850] rounded-xl border border-stone-550 shadow-xl border-b-[8px] border-b-stone-700 flex flex-col relative overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-famicom-gold shadow-[0_0_25px_rgba(212,172,13,0.4)]' 
                      : 'hover:shadow-[0_0_15px_rgba(212,172,13,0.2)]'
                  }`}>
                    
                    {/* Top Ribs / Ridges details */}
                    <div className="w-full h-4 bg-stone-700/60 flex justify-between px-6 border-b border-black/15">
                      <span className="w-3 h-full bg-stone-800/40 border-x border-black/5" />
                      <span className="w-3 h-full bg-stone-800/40 border-x border-black/5" />
                      <span className="w-3 h-full bg-stone-800/40 border-x border-black/5" />
                      <span className="w-3 h-full bg-stone-800/40 border-x border-black/5" />
                      <span className="w-3 h-full bg-stone-800/40 border-x border-black/5" />
                    </div>

                    {/* Label/Sticker Container with Gold Accent Border if selected */}
                    <div className={`p-3 bg-stone-900 flex flex-col justify-between h-[180px] relative border transition-colors duration-300 ${
                      isSelected ? 'border-famicom-gold/50' : 'border-transparent'
                    }`}>
                      
                      {/* Cartridge Title Banner */}
                      <div className="w-full bg-famicom-red text-[8px] font-mono py-0.5 text-center text-white rounded-t-sm font-bold uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                        {project.title}
                      </div>

                      {/* Game Box Art Illustration with Halftone Duotone effects */}
                      <div className="w-full h-[95px] rounded overflow-hidden relative border border-stone-850 halftone-duotone-container">
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          unoptimized
                          className={`w-full h-full object-cover halftone-duotone-img ${
                            isSelected ? 'scale-105' : 'scale-100'
                          }`}
                          style={{ objectPosition: project.objectPosition || 'center' }}
                        />
                        <div className="halftone-dots-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Info footer */}
                      <div className="flex justify-between items-center text-[9px] font-mono text-stone-500 uppercase mt-1">
                        <span>{project.badge}</span>
                        <span className="text-[8px] text-famicom-gold font-bold">
                          {isSelected ? '★ INSERTED' : 'SELECT'}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Little title below cartridge */}
                  <div className="mt-3 text-center">
                    <h4 className={`text-sm font-bold tracking-wide transition-colors duration-300 ${
                      isSelected ? 'text-famicom-gold font-black' : 'text-stone-500'
                    }`}>
                      {project.title}
                    </h4>
                  </div>
                </div>
              );
            })}

            {/* Coming Soon Cartridge */}
            <div className="w-[280px] flex-shrink-0 snap-center select-none opacity-45">
              <div className="w-full bg-[#3B3B42] rounded-xl border border-dashed border-stone-600 shadow-lg border-b-[8px] border-b-stone-800 flex flex-col h-[196px] justify-center items-center p-6 text-center">
                <span className="font-mono text-[9px] text-stone-500 tracking-[0.2em] block mb-2 uppercase">
                  IN PRODUCTION
                </span>
                <h4 className={`${bebasNeue.className} text-3xl text-stone-400 tracking-wider leading-none uppercase mb-2`}>
                  Coming Soon
                </h4>
                <div className="w-8 h-[1px] bg-stone-700 my-2" />
                <span className="font-mono text-[8px] text-stone-600 uppercase tracking-widest">
                  MODEL DMG-08
                </span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
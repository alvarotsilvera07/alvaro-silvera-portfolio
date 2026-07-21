'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Bebas_Neue } from 'next/font/google';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  classification: string;
  objectPosition?: string;
  badge: string;
  isLive?: boolean;
}

interface ProjectCardProps {
  project: Project;
  isTouchDevice: boolean;
  isReducedMotion: boolean;
}

function ProjectCard({ project, isTouchDevice, isReducedMotion }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isReducedMotion || isTouchDevice) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    // Subtly tilt max 10 degrees
    const rotateX = ((y - height / 2) / height) * -10;
    const rotateY = ((x - width / 2) / width) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  // Helper to scale font size depending on title length
  const getFontSize = (title: string) => {
    if (title.length > 20) return 'text-2xl md:text-3xl lg:text-4xl';
    if (title.length > 12) return 'text-3xl md:text-4xl lg:text-5xl';
    return 'text-4xl md:text-5xl lg:text-6xl';
  };

  return (
    <div
      className="w-[285px] md:w-[350px] flex-shrink-0 snap-center flex flex-col group transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clickable Poster */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        className="relative block aspect-[2/3] w-full rounded-xl overflow-hidden cursor-pointer border border-zinc-800 bg-zinc-950 transition-all duration-300 group-hover:border-orange-500/50 shadow-2xl select-none"
        style={{
          transform: isTouchDevice || isReducedMotion 
            ? 'none' 
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: isTouchDevice || isReducedMotion ? 'flat' : 'preserve-3d',
        }}
      >
        {/* Live Status Badge */}
        {project.isLive && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-zinc-950/60 border border-zinc-800/80 px-2.5 py-1 rounded font-mono text-[9px] tracking-[0.2em] text-emerald-400 backdrop-blur-sm shadow-md select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            EN VIVO
          </div>
        )}

        {/* Background Image of the poster */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 ease-out grayscale contrast-125 brightness-90 group-hover:scale-105"
            style={{
              objectPosition: project.objectPosition || 'center'
            }}
          />
          {/* Cinematic Color Tint overlay (duotone effect) */}
          <div className="absolute inset-0 bg-orange-600/10 mix-blend-color transition-colors duration-500 group-hover:bg-orange-500/5" />
          
          {/* Vignette/Shadow overlay - darker only at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95" />
        </div>

        {/* Poster Content */}
        <div 
          className="relative z-10 h-full flex flex-col justify-between p-6 select-none" 
          style={{ transform: isTouchDevice || isReducedMotion ? 'none' : 'translateZ(30px)' }}
        >
          <div className="text-center">
            <p className="text-[9px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
              {project.badge}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className={`${bebasNeue.className} ${getFontSize(project.title)} text-white text-center leading-none tracking-wide group-hover:text-orange-500 transition-colors duration-300`}>
              {project.title}
            </h3>
            <p className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 mt-2 uppercase">
              UN PROYECTO DE ALVARO SILVERA
            </p>
          </div>

          <div className="flex justify-center">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded uppercase bg-zinc-900/30">
              {project.classification}
            </span>
          </div>
        </div>

        {/* Orange spotlight tracking mouse */}
        {!isReducedMotion && !isTouchDevice && hovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, rgba(249, 115, 22, 0.15), transparent 80%)`
            }}
          />
        )}

        {/* Trailer indicator overlay */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <span className="bg-orange-600/95 text-white font-mono text-xs tracking-[0.2em] px-4 py-2 rounded-full border border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 flex items-center gap-1.5">
            ▶ VER PROYECTO
          </span>
        </div>
      </a>

      {/* Details underneath the poster */}
      <div className="mt-5 px-1 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 h-16 overflow-hidden text-ellipsis">
            {project.description}
          </p>
          
          {/* Tech tags styled as movie credits */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] font-mono tracking-wider text-orange-500/80 border border-orange-500/20 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold text-xs hover:text-orange-500 transition-colors self-start group/link"
        >
          Ver Detalles del Proyecto
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Touch and motion preference detection
  useEffect(() => {
    // Touch detection matching media queries
    const mediaQueryTouch = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsTouchDevice(!mediaQueryTouch.matches);
    const touchListener = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mediaQueryTouch.addEventListener('change', touchListener);

    // Reduced motion detection
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQueryMotion.matches);
    const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQueryMotion.addEventListener('change', motionListener);

    return () => {
      mediaQueryTouch.removeEventListener('change', touchListener);
      mediaQueryMotion.removeEventListener('change', motionListener);
    };
  }, []);

  // Scroll spy to update the roll index + arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardElements = Array.from(container.children).filter(
        child => child.classList.contains('snap-center')
      );
      if (cardElements.length === 0) return;
      
      const firstCard = cardElements[0] as HTMLElement;
      const cardWidth = firstCard.clientWidth;
      const gap = 32; // gap-8 is 32px
      const step = cardWidth + gap;

      // Calculate active index based on card step positions
      const index = Math.round(container.scrollLeft / step);
      const clampedIndex = Math.max(0, Math.min(index, cardElements.length - 1));
      
      setActiveIndex(clampedIndex);

      // Check arrows visibility
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Trigger scroll spy on mount
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Scroll click handler
  const handleScrollClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollLeft;
    const cardElements = Array.from(container.children).filter(
      child => child.classList.contains('snap-center')
    );
    if (cardElements.length === 0) return;
    
    const firstCard = cardElements[0] as HTMLElement;
    const cardWidth = firstCard.clientWidth;
    const gap = 32; // gap-8 is 32px
    const step = cardWidth + gap;

    const targetScroll = direction === 'left' 
      ? currentScroll - step 
      : currentScroll + step;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

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
  };

  const activeIndexStr = (activeIndex + 1).toString().padStart(2, '0');
  const totalIndexStr = (projects.length + 1).toString().padStart(2, '0'); // +1 accounts for the coming soon card

  return (
    <section className="py-24 max-w-full overflow-hidden bg-black relative">
      <style dangerouslySetInnerHTML={{__html: `
        #filmstrip-track::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* Decorative Top Perforation Row with Integrated Counter */}
      <div className="w-full h-8 bg-zinc-950 flex items-center justify-between overflow-hidden mb-12 opacity-80 select-none border-y border-zinc-900 px-6 md:px-12 relative">
        <div 
          className="absolute inset-x-0 h-2 top-3 pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(to right, #27272a 0px, #27272a 12px, transparent 12px, transparent 24px)',
            backgroundSize: '24px 100%'
          }} 
        />
        {/* Film Roll Counter integrated on the right side */}
        <div className="relative z-10 ml-auto bg-zinc-950 border border-zinc-800 px-3 py-0.5 rounded font-mono text-[10px] tracking-widest text-zinc-400 flex items-center gap-1.5 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <span className="text-zinc-500 font-bold">ROLL</span>
          <span className="text-white font-bold">{activeIndexStr}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">{totalIndexStr}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header (Centered) */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-[#c81d25] mb-4 font-bold text-center w-full">
            // AHORA EN CARTELERA //
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 w-full text-center">
            Proyectos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Realizados
            </span>
            <span className="w-2 h-10 bg-orange-500 animate-[pulse_1.2s_infinite] shadow-[0_0_15px_rgba(249,115,22,0.6)]"></span>
          </h2>
        </div>
      </div>

      {/* Scroll Anchor */}
      <div id="proyectos" className="scroll-mt-28" />

      {/* Track Wrapper with Navigation Arrows */}
      <div className="relative w-full group/track">
        {/* Left Scroll Arrow */}
        <button
          onClick={() => handleScrollClick('left')}
          disabled={!showLeftArrow}
          className={`absolute left-4 md:left-8 z-30 top-[35%] -translate-y-1/2 bg-zinc-950/85 text-zinc-400 border border-zinc-800 p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.6)] active:scale-95 flex items-center justify-center ${
            showLeftArrow 
              ? 'opacity-100 hover:bg-orange-600 hover:text-white hover:border-orange-500 cursor-pointer pointer-events-auto' 
              : 'opacity-20 cursor-not-allowed pointer-events-none'
          }`}
          aria-label="Anterior"
        >
          <ChevronLeft size={24} className="md:w-6 md:h-6 w-5 h-5" />
        </button>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => handleScrollClick('right')}
          disabled={!showRightArrow}
          className={`absolute right-4 md:right-8 z-30 top-[35%] -translate-y-1/2 bg-zinc-950/85 text-zinc-400 border border-zinc-800 p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.6)] active:scale-95 flex items-center justify-center ${
            showRightArrow 
              ? 'opacity-100 hover:bg-orange-600 hover:text-white hover:border-orange-500 cursor-pointer pointer-events-auto' 
              : 'opacity-20 cursor-not-allowed pointer-events-none'
          }`}
          aria-label="Siguiente"
        >
          <ChevronRight size={24} className="md:w-6 md:h-6 w-5 h-5" />
        </button>

        {/* Horizontal Scrolleable Track */}
        <div
          id="filmstrip-track"
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMoveContainer}
          tabIndex={0}
          className="flex overflow-x-auto gap-8 py-4 scrollbar-none snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing focus:outline-none px-6 md:px-12 lg:px-16 xl:px-[calc((100vw-1280px)/2+24px)]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              isTouchDevice={isTouchDevice} 
              isReducedMotion={isReducedMotion} 
            />
          ))}

          {/* Coming Soon Decorative Placeholder Card */}
          <div className="w-[285px] md:w-[350px] flex-shrink-0 snap-center flex flex-col group select-none opacity-60">
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border border-dashed border-zinc-800 bg-zinc-950/40 flex flex-col justify-between p-6 shadow-xl">
              <div className="text-center">
                <p className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">
                  EN PRODUCCIÓN
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className={`${bebasNeue.className} text-4xl md:text-5xl text-zinc-500 text-center leading-none tracking-wide uppercase select-none`}>
                  PRÓXIMO ESTRENO
                </h3>
                <div className="w-8 h-[1px] bg-zinc-850 my-4" />
                <p className="text-[9px] font-mono tracking-[0.2em] text-zinc-600 uppercase">
                  NUEVAS IDEAS & CÓDIGO
                </p>
              </div>

              <div className="flex justify-center">
                <span className="text-[10px] font-mono tracking-widest text-zinc-600 border border-dashed border-zinc-800 px-2 py-0.5 rounded uppercase">
                  COMING SOON
                </span>
              </div>
            </div>

            <div className="mt-5 px-1 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 h-16">
                  Diseñando y desarrollando nuevos sistemas y experiencias digitales. La cartelera se mantiene en constante crecimiento.
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="text-[9px] font-mono tracking-wider text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded">
                    Ideas
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded">
                    SaaS
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded">
                    AI
                  </span>
                </div>
              </div>
              
              <span className="text-zinc-600 font-semibold text-xs">
                Próximamente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Perforation Row */}
      <div className="w-full h-4 bg-zinc-950 flex items-center overflow-hidden mt-12 opacity-40 select-none border-y border-zinc-900">
        <div 
          className="w-full h-2 bg-repeat-x" 
          style={{
            backgroundImage: 'linear-gradient(to right, #27272a 0px, #27272a 12px, transparent 12px, transparent 24px)',
            backgroundSize: '24px 100%'
          }} 
        />
      </div>
    </section>
  );
}
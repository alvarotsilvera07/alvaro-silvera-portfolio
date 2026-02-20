import React from 'react';

const projects = [
  {
    title: "Plataforma de Sistemas Web",
    description: "Desarrollo de infraestructura digital de alto rendimiento. Enfoque en soluciones escalables y modernas.",
    image: "/assets/web.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://prism-systems.vercel.app/",
  },
  {
    title: "Voto Electrónico",
    description: "Sistema robusto en Java siguiendo el patrón Modelo-Vista-Controlador. Integridad de datos y arquitectura modular.",
    image: "/assets/voto.png",
    tags: ["Java", "MVC", "Security"],
    link: "https://github.com/alvarotsilvera07/VotoElectronico-Unvime",
  },
  {
    title: "Gestor de Tareas CLI",
    description: "Herramienta funcional de línea de comandos para administración eficiente de tareas y persistencia de archivos.",
    image: "/assets/gestor.png",
    tags: ["TypeScript", "POO", "Modularización"],
    link: "https://github.com/alvarotsilvera07/Gestor-de-Tareas-",
  }
];

export default function ProjectGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      
      {/* TÍTULO CON EFECTO DE TERMINAL Y DEGRADADO */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3">
          Proyectos
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Recientes
          </span>
          {/* El cursor naranja que parpadea */}
          <span className="w-2 h-10 bg-orange-500 animate-[pulse_1.2s_infinite] shadow-[0_0_15px_rgba(249,115,22,0.6)]"></span>
        </h2>
        <p className="text-zinc-500 text-[10px] mt-4 tracking-[0.4em] uppercase font-light">
          Explorando soluciones digitales y software robusto
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
          >
            {/* Contenedor de Imagen */}
            <div className="relative h-48 overflow-hidden bg-zinc-800">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5 h-20 overflow-hidden">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botón */}
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-orange-500 transition-colors group/link"
              >
                Ver Proyecto 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
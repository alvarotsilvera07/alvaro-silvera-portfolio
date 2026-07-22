import App from '@/components/band/App';
import ProjectGrid from '@/components/ProjectGrid';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-cinema-bg min-h-screen relative text-cinema-fg"> 
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Section (#inicio) */}
      <section id="inicio" className="min-h-screen flex flex-col justify-center pt-12 md:pt-0">
        <App />
      </section>

      {/* Sección de proyectos (#proyectos) */}
      <ProjectGrid />

      {/* Sección de contacto / Footer (#contacto) */}
      <footer id="contacto" className="border-t border-stone-900/80 bg-stone-950/50 py-16 px-6 text-center md:text-left relative overflow-hidden">
        {/* Ambient background movie ending watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden="true">
          <span className="font-bebas text-[14vw] md:text-[12vw] tracking-[0.25em] text-stone-900/50 opacity-15">
            FIN
          </span>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-stone-400 text-sm relative z-10">
          <div>
            <p className="font-bold text-cinema-fg text-base">Alvaro Silvera</p>
            <p className="text-stone-500 font-mono text-xs uppercase tracking-wider">Software Developer — Portfolio 2026</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="mailto:alvarotsilvera2@gmail.com" className="hover:text-cinema-gold transition-colors break-all">
              alvarotsilvera2@gmail.com
            </a>
            <span className="hidden sm:inline text-stone-800">•</span>
            <a href="https://github.com/alvarotsilvera07" target="_blank" rel="noopener noreferrer" className="hover:text-cinema-gold transition-colors">
              GitHub
            </a>
            <span className="hidden sm:inline text-stone-800">•</span>
            <a href="https://www.linkedin.com/in/alvaro-silvera-6b32a5251/" target="_blank" rel="noopener noreferrer" className="hover:text-cinema-gold transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
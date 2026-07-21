import App from '@/components/band/App';
import ProjectGrid from '@/components/ProjectGrid';
import Navbar from '@/components/Navbar';
import ScrollIndicator from '@/components/ScrollIndicator';

export default function Home() {
  return (
    <main className="bg-black min-h-screen relative text-white"> 
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Section (#inicio) */}
      <section id="inicio" className="min-h-screen flex flex-col justify-between pt-12 md:pt-0">
        <App />
        <ScrollIndicator />
      </section>

      {/* Sección de proyectos (#proyectos) */}
      <ProjectGrid />

      {/* Sección de contacto / Footer (#contacto) */}
      <footer id="contacto" className="border-t border-zinc-900 bg-zinc-950/80 py-12 px-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-400 text-sm">
          <div>
            <p className="font-bold text-white text-base">Alvaro Silvera</p>
            <p className="text-zinc-500">Software Developer — Portfolio 2026</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="mailto:alvarotsilvera2@gmail.com" className="hover:text-orange-500 transition-colors break-all">
              alvarotsilvera2@gmail.com
            </a>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a href="https://github.com/alvarotsilvera07" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              GitHub
            </a>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a href="https://www.linkedin.com/in/alvaro-silvera-6b32a5251/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
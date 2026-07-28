import App from '@/components/band/App';
import ProjectGrid from '@/components/ProjectGrid';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-snes-bg min-h-screen relative text-stone-300 overflow-x-hidden font-sans"> 
      {/* Console Status Navbar */}
      <Navbar />

      {/* Hero Section (#inicio) */}
      <section id="inicio" className="min-h-screen flex flex-col justify-center pt-12 md:pt-0">
        <App />
      </section>

      {/* Decorative Kanji Watermark (開発者 = Developer) */}
      <div className="relative w-full h-0 pointer-events-none select-none z-0">
        <div className="absolute left-[5%] md:left-[8%] -top-[120px] md:-top-[220px] text-[10rem] md:text-[18rem] font-black text-stone-900/10 tracking-tighter leading-none select-none">
          開発者
        </div>
      </div>

      {/* Sección de proyectos (#proyectos) */}
      <ProjectGrid />

      {/* Sección de contacto / Footer (#contacto) */}
      <footer id="contacto" className="border-t-4 border-famicom-body-dark/30 bg-stone-950 py-16 px-6 relative overflow-hidden">
        {/* Subtle grid lines background to look like schematics */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bebas text-2xl tracking-wider text-white">ALVARO SILVERA</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-famicom-red text-famicom-gold font-bold">MODEL DMG-07</span>
            </div>
            <p className="text-stone-500 font-mono text-xs uppercase tracking-widest">
              DEVELOPER BACK PANEL &bull; PORTS AND SOCKETS AREA
            </p>
          </div>
          
          {/* Visual Connectors Area */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-end font-mono">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-stone-600 font-bold uppercase tracking-wider">MAIL OUT</span>
              <a 
                href="mailto:alvarotsilvera2@gmail.com" 
                className="px-4 py-2 border-2 border-stone-850 bg-stone-900 hover:border-famicom-gold hover:text-white rounded-lg transition-all text-xs text-famicom-gold shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              >
                alvarotsilvera2@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-stone-600 font-bold uppercase tracking-wider">GTHB MULTI</span>
              <a 
                href="https://github.com/alvarotsilvera07" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 border-2 border-stone-850 bg-stone-900 hover:border-famicom-gold hover:text-white rounded-lg transition-all text-xs text-famicom-gold shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              >
                GITHUB
              </a>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-stone-600 font-bold uppercase tracking-wider">LNKD IN PORT</span>
              <a 
                href="https://www.linkedin.com/in/alvaro-silvera-6b32a5251/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 border-2 border-stone-850 bg-stone-900 hover:border-famicom-gold hover:text-white rounded-lg transition-all text-xs text-famicom-gold shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-stone-600 text-[10px] font-mono">
          <p>&copy; 2026 ALVARO SILVERA. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 sm:mt-0 uppercase tracking-widest text-stone-700">DESIGNED FOR TECHNICAL RECRUITERS</p>
        </div>
      </footer>
    </main>
  );
}
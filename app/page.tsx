import App from '@/components/band/App';
import ProjectGrid from '@/components/ProjectGrid'; // Importamos el nuevo componente

export default function Home() {
  return (
    <main className="bg-black min-h-screen"> 
      {/* Tu presentación actual (Alvaro Silvera + Credencial) */}
      <App /> 
      
      {/* Nueva sección de proyectos */}
      <ProjectGrid />
    </main>
  );
}
'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/kartu.glb';
const ROPE_TEXTURE_PATH = '/assets/bandd.png';

useGLTF.preload(GLTF_PATH);
useTexture.preload(ROPE_TEXTURE_PATH);

// Generador de textura dynamic 2D Canvas perfectamente centrada para el reverso de la tarjeta (Iniciales AS + estilo circuit dark/naranja)
function useBackCardTexture() {
  return useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    // Proporción exacta 63/88 de la credencial 3D
    canvas.width = 1000;
    canvas.height = 1396;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Fondo principal dark matte
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, width, height);

    // 2. Bordes geométricos perfectamente centrados
    const margin = 40;
    ctx.strokeStyle = '#ff6b00';
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.4;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.25;
    ctx.strokeRect(margin + 18, margin + 18, width - (margin + 18) * 2, height - (margin + 18) * 2);

    // 3. Patrón de líneas de circuito / tech grid simétrico
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ff6b00';
    ctx.fillStyle = '#ff6b00';

    const drawSymmetricCircuit = (yOffset) => {
      // Cuadrante izquierdo
      ctx.beginPath();
      ctx.moveTo(margin + 30, yOffset);
      ctx.lineTo(centerX - 130, yOffset);
      ctx.lineTo(centerX - 70, yOffset + 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX - 70, yOffset + 60, 7, 0, Math.PI * 2);
      ctx.fill();

      // Cuadrante derecho espejo
      ctx.beginPath();
      ctx.moveTo(width - (margin + 30), yOffset);
      ctx.lineTo(centerX + 130, yOffset);
      ctx.lineTo(centerX + 70, yOffset + 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX + 70, yOffset + 60, 7, 0, Math.PI * 2);
      ctx.fill();
    };

    drawSymmetricCircuit(240);
    drawSymmetricCircuit(height - 240);

    // Esquinas diagonales estilizadas
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 6;
    const cSize = 60;
    ctx.beginPath(); ctx.moveTo(margin + 20, margin + 20 + cSize); ctx.lineTo(margin + 20 + cSize, margin + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width - (margin + 20), margin + 20 + cSize); ctx.lineTo(width - (margin + 20) - cSize, margin + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(margin + 20, height - (margin + 20) - cSize); ctx.lineTo(margin + 20 + cSize, height - (margin + 20)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width - (margin + 20), height - (margin + 20) - cSize); ctx.lineTo(width - (margin + 20) - cSize, height - (margin + 20)); ctx.stroke();

    // 4. Hexágono central contenedor de iniciales (centrado exacto)
    const hexRadius = 230;
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = '#ff6b00';
    ctx.lineWidth = 7;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = centerX + hexRadius * Math.cos(angle);
      const y = centerY + hexRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Hexágono interno
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = centerX + (hexRadius - 20) * Math.cos(angle);
      const y = centerY + (hexRadius - 20) * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Resplandor naranja central
    const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 300);
    glowGrad.addColorStop(0, 'rgba(255, 107, 0, 0.25)');
    glowGrad.addColorStop(0.7, 'rgba(255, 107, 0, 0.05)');
    glowGrad.addColorStop(1, 'rgba(255, 107, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);

    // 5. Iniciales "AS" estilizadas (Alineación exacta al centro)
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 170px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#ff6b00';
    ctx.shadowBlur = 35;
    ctx.fillText('AS', centerX, centerY - 15);

    // Subtexto inferior en resplandor
    ctx.shadowBlur = 12;
    ctx.font = '700 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ff6b00';
    ctx.fillText('SOFTWARE DEVELOPER', centerX, centerY + 115);

    const texture = new THREE.CanvasTexture(canvas);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.center.set(0.5, 0.5);
    texture.repeat.set(1, 1);
    return texture;
  }, []);
}

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
        
        {/* TARJETA 3D - Arriba en móvil, derecha en desktop */}
        <div className="w-full lg:w-1/2 h-96 lg:h-screen relative order-first lg:order-last">
          <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
            <ambientLight intensity={Math.PI} />
            <Physics interpolate gravity={[0, -40, 0]} timeStep={1/60}>
              <Band />
            </Physics>
            <Environment background blur={0.75}>
              <color attach="background" args={['black']} />
              <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>
          </Canvas>
        </div>

        {/* INFORMACIÓN PERSONAL */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="max-w-md mx-auto lg:mx-0 space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                Alvaro Silvera
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 mb-8 font-medium">
                Software Developer
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Programador Universitario en Sistemas con perfil Junior Full Stack Developer.<br />
                Desarrollo soluciones web combinando frontend, backend y bases de datos, siempre en constante aprendizaje.
              </p>
            </div>

            {/* REDES SOCIALES */}
            <div className="flex flex-wrap gap-6">
              <a href="https://github.com/alvarotsilvera07" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Github size={28} />
                <span className="text-lg">GitHub</span>
              </a>

              <a href="https://www.linkedin.com/in/alvaro-silvera-6b32a5251/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Linkedin size={28} />
                <span className="text-lg">LinkedIn</span>
              </a>

              <a href="mailto:alvarotsilvera2@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={28} />
                <span className="text-lg">Email</span>
              </a>

              <a href="https://www.instagram.com/alvarosilvera07" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Instagram size={28} />
                <span className="text-lg">Instagram</span>
              </a>
            </div>

            {/* BOTONES DESCARGAR CV (ES / EN) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/cv/cv-alvaro-silvera.pdf"
                download="cv-alvaro-silvera.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg rounded-xl transition-all transform hover:scale-105 shadow-xl"
              >
                <Download size={20} />
                <span>Descargar CV (ES)</span>
              </a>

              <a
                href="/cv/CV_Alvaro_Tomas_Silvera_EN.pdf"
                download="CV_Alvaro_Tomas_Silvera_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-zinc-950 border-2 border-orange-500 hover:bg-orange-500/10 text-white font-bold text-base md:text-lg rounded-xl transition-all transform hover:scale-105 shadow-xl"
              >
                <Download size={20} />
                <span>Download CV (EN)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// COMPONENTE BAND (la tarjeta 3D)
function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, linearDamping: 4, angularDamping: 4 };
  const { nodes, materials } = useGLTF(GLTF_PATH);

  const ropeTexture = useTexture(ROPE_TEXTURE_PATH);
  const frontTexture = useTexture('/assets/mi-foto.png');
  const backTexture = useBackCardTexture();

  if (frontTexture) {
    frontTexture.flipY = false;
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.wrapS = frontTexture.wrapT = THREE.ClampToEdgeWrapping;
    frontTexture.center.set(0.5, 0.5);
    frontTexture.repeat.set(1, 1);
  }

  if (backTexture) {
    backTexture.flipY = false;
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.wrapS = backTexture.wrapT = THREE.ClampToEdgeWrapping;
    backTexture.center.set(0.5, 0.5);
    backTexture.repeat.set(1.0, 1.0);
    backTexture.offset.set(0.26, 0.17);
  }

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      band.current?.geometry?.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  ropeTexture.wrapS = ropeTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group scale={2.25} position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) =>
              (e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))
            }
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={frontTexture} clearcoat={0.8} clearcoatRoughness={0.1} roughness={0.2} metalness={0.1} />
            </mesh>

            <mesh geometry={nodes.card.geometry} position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
              <meshPhysicalMaterial map={backTexture} clearcoat={0.8} clearcoatRoughness={0.1} roughness={0.2} metalness={0.1} />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial resolution={[width, height]} useMap map={ropeTexture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}

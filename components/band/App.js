'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';
import { Bebas_Neue } from 'next/font/google';

extend({ MeshLineGeometry, MeshLineMaterial });

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const GLTF_PATH = '/assets/kartu.glb';
const ROPE_TEXTURE_PATH = '/assets/bandd.png';

useGLTF.preload(GLTF_PATH);
useTexture.preload(ROPE_TEXTURE_PATH);


export default function App() {
  return (
    <>
      <div className="min-h-screen bg-famicom-bg text-stone-300 flex flex-col lg:flex-row items-center justify-center relative px-4 md:px-8 py-20 lg:py-0 famicom-pcb-bg">
        
        {/* INFORMACIÓN PERSONAL - Styled as the Main Console Chassis with Screen */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-2 sm:p-4 lg:p-8 order-last lg:order-first z-10">
          <div className="famicom-matte-texture border-4 border-stone-400/40 p-5 sm:p-8 rounded-3xl shadow-2xl flex flex-col max-w-xl w-full border-b-[8px] border-r-[6px] relative">
            
            {/* Top Venting Slots and Logo Row */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1.5 opacity-35">
                <span className="w-8 h-1.5 bg-stone-700 rounded-sm" />
                <span className="w-8 h-1.5 bg-stone-700 rounded-sm" />
                <span className="w-8 h-1.5 bg-stone-700 rounded-sm" />
                <span className="w-8 h-1.5 bg-stone-700 rounded-sm" />
              </div>
              <span className="font-mono text-[9px] font-bold text-famicom-red tracking-widest flex items-center gap-1.5">
                <span>FAMICOM SYSTEM</span>
                <span className="text-[7px] opacity-60">ファミリーコンピュータ</span>
              </span>
            </div>

            {/* CRT Screen Housing Alvaro's Profile */}
            <div className="famicom-crt-screen p-5 sm:p-7 border-8 border-stone-800 rounded-xl mb-8 relative">
              <div className="relative z-10">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[9px] font-mono text-famicom-gold/80 tracking-widest mb-4 pb-2 border-b border-stone-900">
                  <span className="flex items-center gap-1">
                    <span>SYSTEM OK</span>
                    <span className="text-[7px] opacity-65">システムOK</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-famicom-green shadow-[0_0_4px_#4CAF50]" />
                    <span>READY_</span>
                    <span className="text-[7px] opacity-65">レディ_</span>
                  </span>
                </div>

                <h1 className={`${bebasNeue.className} text-5xl sm:text-7xl tracking-widest mb-1 text-white leading-none drop-shadow`}>
                  Alvaro Silvera
                </h1>
                
                <h2 className="text-xl md:text-2xl text-famicom-gold font-bold mb-6 font-mono tracking-wide uppercase">
                  Software Developer
                </h2>
                
                <p className="text-sm md:text-base text-stone-300 leading-relaxed font-sans mb-4">
                  Programador Universitario en Sistemas con perfil Junior Full Stack Developer.
                  Desarrollo soluciones web combinando frontend, backend y bases de datos, siempre en constante aprendizaje.
                </p>

                {/* Tech tags styled as screen console variables */}
                <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono text-stone-400">
                  <span className="border border-stone-800/80 px-2 py-0.5 rounded bg-stone-950/40">&gt; JS/TS</span>
                  <span className="border border-stone-800/80 px-2 py-0.5 rounded bg-stone-950/40">&gt; NEXT.JS</span>
                  <span className="border border-stone-800/80 px-2 py-0.5 rounded bg-stone-950/40">&gt; POSTGRES</span>
                  <span className="border border-stone-800/80 px-2 py-0.5 rounded bg-stone-950/40">&gt; PYTHON</span>
                </div>
              </div>
            </div>

            {/* REDES SOCIALES - Styled as Port Selectors */}
            <div className="mb-8 font-mono">
              <span className="text-[9px] text-stone-500 font-bold tracking-widest mb-3 flex items-center gap-2 uppercase">
                <span>CONTROLLER CONNECTIONS</span>
                <span className="text-[7px] opacity-60 font-normal">コントローラー</span>
              </span>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/alvarotsilvera07" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-600 hover:text-famicom-red transition-all text-xs font-bold">
                  <Github size={16} />
                  <span>GTHB</span>
                </a>

                <a href="https://www.linkedin.com/in/alvaro-silvera-6b32a5251/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-600 hover:text-famicom-red transition-all text-xs font-bold">
                  <Linkedin size={16} />
                  <span>LNKD</span>
                </a>

                <a href="mailto:alvarotsilvera2@gmail.com"
                  className="flex items-center gap-2 text-stone-600 hover:text-famicom-red transition-all text-xs font-bold">
                  <Mail size={16} />
                  <span>MAIL</span>
                </a>

                <a href="https://www.instagram.com/alvarosilvera07/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-600 hover:text-famicom-red transition-all text-xs font-bold">
                  <Instagram size={16} />
                  <span>INST</span>
                </a>
              </div>
            </div>

            {/* BOTONES DESCARGAR CV (ES / EN) - Styled as insertable cartridges */}
            <div className="border-t-2 border-stone-400/20 pt-6">
              <span className="font-mono text-[9px] text-stone-500 font-bold tracking-widest mb-4 flex items-center gap-2 uppercase">
                <span>CV CARTRIDGE DECK</span>
                <span className="text-[7px] opacity-60 font-normal">CVカートリッジ</span>
              </span>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <a
                    href="/cv/cv-alvaro-silvera.pdf"
                    download="cv-alvaro-silvera.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col w-full bg-[#484850] hover:bg-[#52525A] border border-stone-550 rounded-t-lg shadow-lg transition-all transform hover:-translate-y-1.5 active:translate-y-0 border-b-[6px] border-b-stone-700 select-none group text-left"
                  >
                    <div className="w-full bg-famicom-red-light text-[8px] font-mono py-1 px-3 text-white rounded-t-sm font-bold uppercase border-b border-black/10">
                      CV SPANISH VERSION
                    </div>
                    <div className="px-3 py-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-stone-300 uppercase">CV_ALVARO_ES</span>
                      <Download size={14} className="text-famicom-gold group-hover:scale-110 transition-transform" />
                    </div>
                  </a>
                </div>

                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <a
                    href="/cv/CV_Alvaro_Tomas_Silvera_EN.pdf"
                    download="CV_Alvaro_Tomas_Silvera_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col w-full bg-[#484850] hover:bg-[#52525A] border border-stone-550 rounded-t-lg shadow-lg transition-all transform hover:-translate-y-1.5 active:translate-y-0 border-b-[6px] border-b-stone-700 select-none group text-left"
                  >
                    <div className="w-full bg-famicom-red-light text-[8px] font-mono py-1 px-3 text-white rounded-t-sm font-bold uppercase border-b border-black/10">
                      CV ENGLISH VERSION
                    </div>
                    <div className="px-3 py-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-stone-300 uppercase">CV_ALVARO_EN</span>
                      <Download size={14} className="text-famicom-gold group-hover:scale-110 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* TARJETA 3D - Dev Badge visually hanging from console hook */}
        <div className="w-full lg:w-1/2 h-[550px] lg:h-screen relative order-first lg:order-last flex flex-col items-center justify-center">

          <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
              <color attach="background" args={['#0F0F12']} />
              <ambientLight intensity={Math.PI} />
              <Physics interpolate gravity={[0, -40, 0]} timeStep={1/60}>
                <Band />
              </Physics>
              <Environment blur={0.75}>
                <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
              </Environment>
            </Canvas>
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
  const backTexture = useTexture('/assets/back-card-new.jpg');

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

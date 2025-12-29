'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
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
                Full Stack Developer
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Programador Universitario en Sistemas con perfil full stack.<br />
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

            {/* BOTÓN DESCARGAR CV */}
            <div>
              <a
                href="/cv/cv-alvaro-silvera.pdf"
                download="cv-alvaro-silvera.pdf"
                className="inline-flex items-center gap-4 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 shadow-2xl"
              >
                <Download size={32} />
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// COMPONENTE BAND (la tarjeta 3D - sin cambios)
function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, linearDamping: 4, angularDamping: 4 };
  const { nodes, materials } = useGLTF(GLTF_PATH);

  const ropeTexture = useTexture(ROPE_TEXTURE_PATH);
  const frontTexture = useTexture('/assets/mi-foto.png');
  const backTexture = useTexture('/assets/back-card.jpg');

  frontTexture.flipY = false;
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.wrapS = frontTexture.wrapT = THREE.ClampToEdgeWrapping;
  frontTexture.center.set(0.5, 0.5);
  frontTexture.repeat.set(1, 1);

  backTexture.flipY = false;
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.wrapS = backTexture.wrapT = THREE.ClampToEdgeWrapping;
  backTexture.onUpdate = () => {
    const img = backTexture.image;
    if (!img) return;
    const imageAspect = img.width / img.height;
    const cardAspect = 63 / 88;
    if (imageAspect > cardAspect) {
      backTexture.repeat.set(cardAspect / imageAspect, 1);
    } else {
      backTexture.repeat.set(1, imageAspect / cardAspect);
    }
    backTexture.center.set(0.5, 0.5);
  };

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

      band.current.geometry.setPoints(curve.getPoints(32));

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
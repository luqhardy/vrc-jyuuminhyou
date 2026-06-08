"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Gltf, CameraShake } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { EffectComposer, Bloom,
  Glitch, 
  Vignette,
  Noise,
  ChromaticAberration,
  SSAO,
 } from "@react-three/postprocessing"
//import { AsciiRenderer } from '@react-three/drei'
import { VelocityDepthNormalPass } from "realism-effects";
import * as POSTPROCESSING from "postprocessing";
import { MotionBlur } from "./MotionBlur";
export default function ModelViewer() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldLoadModel(true),3000 );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full relative bg-zinc-950 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <color attach="background" args={["#e8d83e"]} />
        <ambientLight intensity={0.1} color="#ffed4e" />
        <pointLight position={[0, 3.8, 0]} intensity={1.5} color="#ffff33" />
        <pointLight position={[-8, 3.8, 0]} intensity={1.2} color="#ffff66" />
        <pointLight position={[8, 3.8, 0]} intensity={1.2} color="#ffff66" />
        <pointLight position={[0, 3.8, -8]} intensity={1.2} color="#ffff66" />
        <pointLight position={[0, 3.8, 8]} intensity={1.2} color="#ffff66" />
        
        {/* Floor - Yellow tile */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f4d03f" roughness={0.6} metalness={0.2} />
        </mesh>
        
        {/* Walls */}
        {/* Back wall - Fluorescent yellow */}
        <mesh position={[0, 2, -10]}>
          <planeGeometry args={[20, 4]} />
          <meshStandardMaterial color="#f9e79f" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Left wall - Darker yellow */}
        <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 4]} />
          <meshStandardMaterial color="#f4d03f" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Right wall - Darker yellow */}
        <mesh position={[10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 4]} />
          <meshStandardMaterial color="#f4d03f" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Ceiling - Light yellow */}
        <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f9e79f" roughness={0.6} metalness={0.15} />
        </mesh>
        <Suspense fallback={null}>
          {shouldLoadModel && (
            <Gltf 
              src="/model.glb" 
              scale={4} 
              position={[0, -0.1, 0]} 
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={true} makeDefault target={[0, 1.5, 0]} autoRotate autoRotateSpeed={5.0} />
            <CameraShake 
      yawFrequency={0.2} 
      pitchFrequency={0.2} 
      rollFrequency={0.2} 
      intensity={1} 
    />
        {/*}
           <AsciiRenderer 
          fgColor="white" 
          bgColor="black" 
          resolution={0.20} 
          characters=" .:-+*=%@#" 

         />     --> */}
        <EffectComposer NormalPass={VelocityDepthNormalPass}>
          <Bloom intensity={5} luminanceThreshold={0.1} />
          <MotionBlur intensity={1} samples={15} jitter={1} />
          <Glitch delay={[2.5, 4]} duration={[0.4, 0.6]} strength={[0.03, 0.15]} mode={POSTPROCESSING.GlitchMode.SPORADIC} />
          <Vignette offset={0.2} darkness={0.4} />
<Noise opacity={0.15} />
<SSAO radius={20} intensity={10} bias={0.5} />
<ChromaticAberration offset={[0.0025, 0.0025]} />
        </EffectComposer>

      </Canvas>
    </div>
  );
}

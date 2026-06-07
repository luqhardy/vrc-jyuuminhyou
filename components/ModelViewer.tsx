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
  DepthOfField,
  Outline,
  Sepia,
  ColorDepth,
  Scanline } from "@react-three/postprocessing"
import { AsciiRenderer } from '@react-three/drei'
import { VelocityDepthNormalPass, MotionBlurEffect } from "realism-effects";
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
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <color attach="background" args={["#FFFFFF"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <gridHelper args={[100, 100, "#000000", "#000000"]} position={[0, 0, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#FFFFFF" roughness={1} metalness={0} />
        </mesh>
        <Suspense fallback={null}>
          {shouldLoadModel && (
            <Gltf 
              src="/model.glb" 
              scale={5} 
              position={[0, -0.1, 3]} 
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={true} makeDefault target={[0, 3, 0]} autoRotate autoRotateSpeed={10.0}/>
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
          <Bloom intensity={0.5} luminanceThreshold={0.1} />
          <MotionBlur intensity={1} samples={15} jitter={1} />
          <Glitch delay={[1.5, 3]} duration={[0.2, 0.3]} strength={[0.01, 0.1]} mode={POSTPROCESSING.GlitchMode.SPORADIC} />
          <Vignette offset={0.5} darkness={0.5} />
<Noise opacity={0.1} />
<SSAO radius={20} intensity={0} bias={0.5} />
<ChromaticAberration offset={[0.01, 0.01]} />
<Sepia intensity={0.2} />
<ColorDepth bits={10} />

        </EffectComposer>

      </Canvas>
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Gltf } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

export default function ModelViewer() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldLoadModel(true),3000 );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full relative bg-zinc-950 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <gridHelper args={[100, 100, "#2b2b2b", "#444444"]} position={[0, 0, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#111827" roughness={1} metalness={0} />
        </mesh>
        <Suspense fallback={null}>
          {shouldLoadModel && (
            <Gltf 
              src="/model.glb" 
              scale={3} 
              position={[0, -0.1, 0]} 
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={true} makeDefault target={[0, 3, 0]} autoRotate autoRotateSpeed={1.0}/>
      </Canvas>
    </div>
  );
}

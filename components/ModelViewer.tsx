"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Gltf } from "@react-three/drei";
import { Suspense } from "react";

export default function ModelViewer() {
  return (
    <div className="w-full h-[500px] relative bg-zinc-950 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <gridHelper args={[100, 100, "#3f3f3f", "#313131"]} position={[0, 0, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#111827" roughness={1} metalness={0} />
        </mesh>
        <Suspense fallback={null}>
          <Gltf 
            src="/model.glb" 
            scale={3} 
            position={[0, -0.1, 0]} 
          />
        </Suspense>
        <OrbitControls enableZoom={true} makeDefault />
      </Canvas>
    </div>
  );
}

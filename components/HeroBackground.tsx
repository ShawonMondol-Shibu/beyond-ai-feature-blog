"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const TEAL = "#14B8A6";
const ORANGE = "#F97316";

function FloatingOctahedron({ position, scale, speed, color }: { position: [number, number, number]; scale: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.3;
      ref.current.rotation.y += delta * speed * 0.5;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        {/* <octahedronGeometry args={[1, 0]} /> */}
        <OrbitControls />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, scale, speed, color }: { position: [number, number, number]; scale: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.2;
      ref.current.rotation.z += delta * speed * 0.4;
    }
  });

  return (
    <Float speed={speed * 0.4} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        {/* <torusGeometry args={[1, 0.3, 16, 32]} /> */}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, scale, speed, color }: { position: [number, number, number]; scale: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed * 0.3;
      ref.current.rotation.z += delta * speed * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.6} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {/* <icosahedronGeometry args={[1, 0]} /> */}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.32}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const tealColor = new THREE.Color(TEAL);
    const orangeColor = new THREE.Color(ORANGE);

    for (let i = 0; i < count; i++) {
      // Random coordinates in a wider box
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3; // spread in depth

      // Interleave teal and orange particles
      const mixColor = Math.random() > 0.5 ? tealColor : orangeColor;
      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow rotation for general drift
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly tilt the group based on pointer coordinates (parallax)
      const targetX = state.pointer.y * 0.15;
      const targetY = -state.pointer.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  const objects = useMemo(() => [
    { type: "octahedron" as const, position: [-4, 2, -5] as [number, number, number], scale: 0.6, speed: 0.4, color: TEAL },
    { type: "torus" as const, position: [4, -1, -6] as [number, number, number], scale: 0.45, speed: 0.3, color: ORANGE },
    { type: "icosahedron" as const, position: [-2, -2, -4] as [number, number, number], scale: 0.4, speed: 0.5, color: TEAL },
    { type: "octahedron" as const, position: [3, 3, -7] as [number, number, number], scale: 0.7, speed: 0.25, color: ORANGE },
    { type: "torus" as const, position: [-5, 0, -8] as [number, number, number], scale: 0.5, speed: 0.35, color: TEAL },
    { type: "icosahedron" as const, position: [5, 1, -5] as [number, number, number], scale: 0.45, speed: 0.45, color: ORANGE },
  ], []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-3, 2, 3]} intensity={1} color="#14B8A6" distance={12} />
      <pointLight position={[3, -2, -3]} intensity={0.8} color="#F97316" distance={10} />
      <ParticleField count={80} />
      {objects.map((obj, i) => {
        if (obj.type === "octahedron") return <FloatingOctahedron key={i} {...obj} />;
        if (obj.type === "torus") return <FloatingTorus key={i} {...obj} />;
        return <FloatingIcosahedron key={i} {...obj} />;
      })}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

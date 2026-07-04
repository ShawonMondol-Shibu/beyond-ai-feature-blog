"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const TEAL = "#14B8A6";
const ORANGE = "#F97316";

function ParticleField({ count = 200, theme }: { count?: number; theme?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const speedRef = useRef(0.005);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const particleColor = new THREE.Color(theme === "dark" ? TEAL : ORANGE);

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi) - 4;

      col[i * 3] = particleColor.r;
      col[i * 3 + 1] = particleColor.g;
      col[i * 3 + 2] = particleColor.b;

      siz[i] = 0.04 + Math.random() * 0.08;
    }
    return [pos, col, siz];
  }, [count, theme]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += speedRef.current;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    speedRef.current = 0.003 + Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
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

function Scene({ theme }: { theme?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.1;
    const targetY = -state.pointer.x * 0.1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, targetX, 0.03
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, targetY, 0.03
    );
  });

  return (
    <group ref={groupRef}>
      <ParticleField count={200} theme={theme} />
    </group>
  );
}

export default function ThreeBackground() {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}

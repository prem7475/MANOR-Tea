import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Torus, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Optimized Floating Tea Cup Component with reduced complexity
const FloatingTeaCup = memo(({ position, scale = 1 }) => {
  const meshRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (timeRef.current > 0.066) { // Limit updates to ~15fps for better performance
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      timeRef.current = 0;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Simplified Cup body */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.6, 1.2, 16]} />
        <meshStandardMaterial
          color="#8B7355"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Simplified Cup handle */}
      <mesh position={[0.9, 0, 0]}>
        <torusGeometry args={[0.2, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#654321" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Reduced Steam particles */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
});

// Optimized Tea Leaves with fewer objects and simpler animation
const TeaLeaves = memo(({ count = 10 }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.3 + 0.4
    }));
  }, [count]);

  return (
    <group>
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </group>
  );
});

const Leaf = memo(({ position, rotation, scale }) => {
  const meshRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (timeRef.current > 0.1) { // Limit updates to ~10fps for leaves for better performance
      meshRef.current.rotation.x += 0.002;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.2 + position[0]) * 0.0003;
      timeRef.current = 0;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.4, 0.6]} />
      <meshStandardMaterial
        color="#4A7C59"
        side={THREE.DoubleSide}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
});

// Optimized Floating Text Component
const FloatingText = memo(({ text, position, color = "#ffffff" }) => {
  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
      <Text
        position={position}
        fontSize={0.8}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {text}
      </Text>
    </Float>
  );
});

// Optimized Main 3D Scene with reduced objects
const Scene = memo(() => {
  return (
    <>
      {/* Simplified Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* Environment */}
      <Environment preset="night" />

      {/* Reduced Tea Cups */}
      <FloatingTeaCup position={[-2, 1, -2]} scale={0.8} />
      <FloatingTeaCup position={[2, -1, -3]} scale={1} />

      {/* Reduced Tea Leaves */}
      <TeaLeaves count={8} />

      {/* Floating Text */}
      <FloatingText text="Welcome to Manor Tea" position={[0, 4, -2]} color="#FFD700" />
      <FloatingText text="Premium Quality" position={[-3, 0, -1]} color="#FFA500" />

      {/* Simplified Background Element */}
      <Float speed={0.2} rotationIntensity={0.03} floatIntensity={0.05}>
        <Torus args={[2.5, 0.15, 12, 50]} position={[0, 0, -6]}>
          <MeshDistortMaterial
            color="#654321"
            metalness={0.1}
            roughness={0.8}
            distort={0.2}
            speed={0.3}
          />
        </Torus>
      </Float>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
    </>
  );
});

// Main ThreeDScene Component
export default function ThreeDScene({ className = "" }) {
  return (
    <div className={`w-full h-screen ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}

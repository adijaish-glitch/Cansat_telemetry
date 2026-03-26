import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SatelliteModel = () => {
  const satRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (satRef.current) {
      // Approximate screen position of the widget (fixed bottom-left corner)
      const satScreenX = -0.9;
      const satScreenY = -0.8;
      
      // Vector from satellite position to mouse on the screen
      const dx = mouse.current.x - satScreenX;
      const dy = mouse.current.y - satScreenY;
      
      // Target point in 3D space for the antenna to point at
      // Multipliers give it a dynamic depth scale rather than flat pointing
      const target = new THREE.Vector3(dx * 8, dy * 8, 5);

      // Smoothly interpolate the lookAt rotation
      const dummy = new THREE.Object3D();
      dummy.position.copy(satRef.current.position);
      dummy.lookAt(target);
      
      satRef.current.quaternion.slerp(dummy.quaternion, 0.08);

      // Add a slight floating bob effect on the Y axis
      satRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      
      // Very slow constant barrel roll around its own local Z axis
      // Because it's pointing its Z at the mouse, this makes the solar panels spin slowly like a drill
      satRef.current.rotateZ(0.005);
    }
  });

  // UI-Matching Materials: Sci-Fi Hologram/Wireframe HUD aesthetic to match Nova-1/Arambh
  const carbonDark = <meshStandardMaterial color="#050810" metalness={0.8} roughness={0.5} />;
  const cyanGlow = <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.3} />;
  const glassPanel = <meshPhysicalMaterial color="#00f0ff" transmission={0.9} transparent opacity={0.4} roughness={0.1} metalness={0.5} />;
  const brightEmission = <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />;

  return (
    <group ref={satRef} scale={0.28}>
      {/* satRef is the parent that natively points its local +Z at the mouse target */}
      
      {/* 
        This internal group rotates by +90deg on X so that 
        its original +Y (up / antenna) aligns with the parent's +Z (forward).
        Thus, the top of the satellite perfectly tracks the cursor.
      */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        
        {/* Central Hexagonal Bus - Solid Dark Core */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.2, 6]} />
          {carbonDark}
        </mesh>

        {/* Central Bus - Outer Holographic Wireframe Shell */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 1.25, 6]} />
          {cyanGlow}
        </mesh>

        {/* Top/Bottom Reactor Rings */}
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 16]} />
          {brightEmission}
        </mesh>
        <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 16]} />
          {brightEmission}
        </mesh>

        {/* High-Gain Antenna (This points at the cursor) */}
        <group position={[0, 0.6, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.8]} />
            <meshStandardMaterial color="#00f0ff" emissive="#0088ff" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            {cyanGlow}
          </mesh>
          {/* Glowing Antenna Tip */}
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.06]} />
            {brightEmission}
          </mesh>
        </group>

        {/* Left Translucent Solar Array */}
        <group position={[-1.2, 0, 0]}>
          {/* Strut */}
          <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            {brightEmission}
          </mesh>
          {/* Glass Solar Panel Plate */}
          <mesh position={[-0.9, 0, 0]}>
            <boxGeometry args={[2.4, 0.02, 1.0]} />
            {glassPanel}
          </mesh>
          {/* Wireframe Hologram Edge */}
          <mesh position={[-0.9, 0, 0]}>
            <boxGeometry args={[2.45, 0.05, 1.05]} />
            {cyanGlow}
          </mesh>
        </group>

        {/* Right Translucent Solar Array */}
        <group position={[1.2, 0, 0]}>
          {/* Strut */}
          <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            {brightEmission}
          </mesh>
          {/* Glass Solar Panel Plate */}
          <mesh position={[0.9, 0, 0]}>
            <boxGeometry args={[2.4, 0.02, 1.0]} />
            {glassPanel}
          </mesh>
          {/* Wireframe Hologram Edge */}
          <mesh position={[0.9, 0, 0]}>
            <boxGeometry args={[2.45, 0.05, 1.05]} />
            {cyanGlow}
          </mesh>
        </group>

        {/* Emitted UI Core Light */}
        <pointLight position={[0, 0, 0]} color="#00f0ff" intensity={2} distance={5} />
      </group>

    </group>
  );
};

const SatelliteWidget = () => {
  return (
    <div className="fixed top-1/2 left-4 md:left-8 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 z-50 pointer-events-none drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
      <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }} alpha={true}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <SatelliteModel />
      </Canvas>
    </div>
  );
};

export default SatelliteWidget;

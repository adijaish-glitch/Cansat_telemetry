import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const WobblingRing = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      // 1. Continuous spin
      meshRef.current.rotation.y += 0.01;
      
      // 2. Wobble effect (Sine wave on the X axis)
      meshRef.current.rotation.x = (Math.PI / 2) + Math.sin(elapsedTime) * 0.1;
    }
  });

  // Calculate top-left positioning based on the dynamic viewport dimensions.
  // Pushed slightly back (-2 on Z) so it seamlessly blends into the background behind the main UI content.
  const xOffset = -viewport.width / 2 + 2; 
  const yOffset = viewport.height / 2 - 1.5; 

  return (
    <mesh ref={meshRef} position={[xOffset, yOffset, -2]}>
      <torusGeometry args={[1.6, 0.02, 16, 100]} />
      <meshBasicMaterial color="#7000ff" wireframe={true} transparent opacity={0.6} />
    </mesh>
  );
};

export default WobblingRing;

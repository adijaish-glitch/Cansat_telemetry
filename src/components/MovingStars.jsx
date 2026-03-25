import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const MovingStars = () => {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Rotate the entire starfield slowly to simulate orbital drift or deep space travel
      starsRef.current.rotation.x -= delta * 0.05;
      starsRef.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={80} count={3000} factor={6} fade />
    </group>
  );
};

export default MovingStars;

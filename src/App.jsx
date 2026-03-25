import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Timeline from './components/Timeline';
import CTA from './components/CTA';
import Footer from './components/Footer';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Rocket3D from './components/Rocket3D';
import MovingStars from './components/MovingStars';

function App() {
  return (
    <div className="relative min-h-screen">
      
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 bg-darkBg">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.8} position={[5, 7, 5]} />
          <pointLight intensity={0.6} position={[-5, -2, -10]} />
          <Rocket3D />
          <MovingStars />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <Navbar />
      <Hero />
      <Features />
      <About />
      <Timeline />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

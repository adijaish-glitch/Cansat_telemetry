import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rocket3D = () => {
  const rocketGroup = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const cansatRef = useRef(null);
  const parachuteRef = useRef(null);
  const flameRef = useRef(null);
  const globalGroup = useRef(null);
  const { viewport } = useThree();

  const isAscending = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      if (globalGroup.current) {
        gsap.to(globalGroup.current.rotation, {
          x: mouseY * 0.1,
          y: mouseX * 0.1,
          duration: 1,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    // Phase 1: Pre-Launch
    gsap.set(rocketGroup.current.position, { x: 1.2, y: -2, z: -2 });
    gsap.set(rocketGroup.current.rotation, { x: 0.2, y: -0.5, z: 0 }); 
    gsap.set(flameRef.current.scale, { x: 0.1, y: 0, z: 0.1 });
    gsap.set(stage1Ref.current.position, { y: -0.5 });
    gsap.set(stage2Ref.current.position, { y: 1.5 });
    gsap.set(cansatRef.current.position, { y: 1.5 }); 
    gsap.set(parachuteRef.current.scale, { x: 0, y: 0, z: 0 });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
          onUpdate: (self) => {
            isAscending.current = (self.progress > 0.15 && self.progress < 0.40);
          }
        }
      });

      // Phase 2: Ignition
      tl.to(flameRef.current.scale, { x: 1, y: 1.5, z: 1, duration: 0.15, ease: "power2.in" }, 0)
        .to(rocketGroup.current.position, { y: -1.5, z: 0, duration: 0.15, ease: "power1.in" }, 0);

      // Phase 3: Ascent
      tl.to(rocketGroup.current.position, { y: 0.5, z: 1.5, duration: 0.25, ease: "none" }, 0.15)
        .to(rocketGroup.current.rotation, { y: "+=" + Math.PI * 4, duration: 0.25, ease: "power1.inOut" }, 0.15); 
      
      // Phase 4: Stage Separation
      // Condensing separation explicitly tight on the Central Y-axis.
      tl.to(stage1Ref.current.position, { y: -1.8, duration: 0.2, ease: "power2.out" }, 0.40) 
        .to(flameRef.current.scale, { y: 0, duration: 0.1 }, 0.40) 
        .to(rocketGroup.current.position, { x: 1.5, y: -0.5, duration: 0.2 }, 0.40) 
        .to(stage2Ref.current.position, { y: 1.5, x: -0.5, z: 0, duration: 0.2 }, 0.40) 
        .to(stage2Ref.current.rotation, { x: 0.5, z: 1, y: Math.PI, duration: 0.2 }, 0.40)
        .to(cansatRef.current.position, { y: 0.8, x: -0.1, duration: 0.2 }, 0.40);

      // Phase 5: CanSat Deploy
      tl.to(cansatRef.current.position, { x: 0.5, y: 1.2, z: 0.5, duration: 0.25, ease: "power2.out" }, 0.60)
        .to(cansatRef.current.rotation, { x: Math.PI * 4, y: Math.PI * 6, duration: 0.25, ease: "none" }, 0.60);

      // Phase 6: Free Flight / Parachute Deploy
      tl.to(cansatRef.current.position, { x: -0.2, y: -0.5, z: 2.0, duration: 0.15, ease: "sine.inOut" }, 0.85)
        .to(cansatRef.current.rotation, { x: Math.PI * 4, y: "+=" + Math.PI * 2, z: 0, duration: 0.15, ease: "power2.out" }, 0.85)
        .to(parachuteRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1, ease: "back.out(2)" }, 0.85);
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    try {
      const time = state.clock.getElapsedTime();
      if (rocketGroup.current) {
        rocketGroup.current.rotation.y += 0.005;
        rocketGroup.current.position.y += Math.sin(time * 2) * 0.002;

        if (isAscending.current) {
          rocketGroup.current.position.x += Math.sin(time * 40) * 0.005;
          rocketGroup.current.position.z += Math.cos(time * 35) * 0.005;
          rocketGroup.current.rotation.z = Math.sin(time * 20) * 0.02;
        } else {
          rocketGroup.current.rotation.z = gsap.utils.interpolate(rocketGroup.current.rotation.z, 0, 0.1);
        }
      }

      if (cansatRef.current) {
        cansatRef.current.rotation.y += 0.01;
        cansatRef.current.position.y += Math.sin(time * 3) * 0.002;
      }

      if (flameRef.current && flameRef.current.scale.y > 0.1) {
        flameRef.current.scale.y = 1.5 + Math.sin(time * 40) * 0.2;
      }
    } catch (e) {
      console.error('Rocket3D frame error:', e);
    }
  });

  // Calculate dynamic scale so it perfectly fits any monitor width/height (Desktop frame).
  // Rocket max visual height is roughly 8 units. We want it to occupy 45% of screen height
  // to absolutely guarantee the exploded stage pieces stay within a standard 16:9 vertical frame.
  const dynamicScale = Math.min((viewport.height * 0.45) / 8, 0.7);

  // Dynamically pin the entire 3D rocket assembly to the right side of the screen.
  // viewport.width / 3 correctly anchors the object within the right-hand bounding box 
  // on any aspect ratio or desktop monitor size!
  const dynamicX = viewport.width / 3.5;

  // Hyper-Realistic Materials
  const hullMaterial = <meshStandardMaterial color="#eeeeee" metalness={0.9} roughness={0.1} envMapIntensity={2.5} />;
  const carbonMaterial = <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.8} /> ;
  const engineMetal = <meshStandardMaterial color="#3a3a3a" metalness={1.0} roughness={0.4} envMapIntensity={1} />;
  const goldFoil = <meshStandardMaterial color="#ffaa00" metalness={1} roughness={0.2} envMapIntensity={2} />;
  const accentLight = <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />;

  return (
    <group ref={globalGroup} scale={dynamicScale} position={[dynamicX, 1.5 * dynamicScale, 0]}>
      {/* City environment for stunning Starship-like chrome reflections */}
      <Environment preset="city" />

      {/* Extreme high-contrast rim lighting */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#ffffff" />
      <spotLight position={[-10, -10, -10]} angle={0.2} penumbra={1} intensity={2} color="#00f0ff" />
      <ambientLight intensity={0.1} />

      <group ref={rocketGroup}>
        {/* Stage 2 (Upper Fairing/Payload Bay) */}
        <group ref={stage2Ref}>
          {/* Main Cone */}
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.5, 1.5, 64]} />
            {hullMaterial}
          </mesh>
          {/* Carbon Fiber Heat Shield Tip */}
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.16, 0.5, 64]} />
            {carbonMaterial}
          </mesh>
          {/* Panel gap details / docking ring */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.505, 0.505, 0.05, 64]} />
            {carbonMaterial}
          </mesh>
          {/* Upper shell body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2.1, 64]} />
            {hullMaterial}
          </mesh>
          {/* Stage 2 Engine Bell (Vacuum optimized) */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 0.3, 64]} />
            {engineMetal}
          </mesh>
          <mesh position={[0, -1.3, 0]}>
            <cylinderGeometry args={[0.3, 0.5, 0.4, 64]} />
            {engineMetal}
          </mesh>
        </group>

        {/* CanSat Payload */}
        <group ref={cansatRef}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.6, 32]} />
            {goldFoil}
          </mesh>
          {/* Detailed frame */}
          <mesh>
            <sphereGeometry args={[0.28, 32, 16]} />
            <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} wireframe={true} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            {accentLight}
          </mesh>
          {/* Recovery Parachute */}
          <group ref={parachuteRef} position={[0, 1.8, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#ff5500" metalness={0.1} roughness={0.8} side={2} />
            </mesh>
            <mesh position={[0, -0.9, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
              <meshStandardMaterial color="#dddddd" />
            </mesh>
          </group>
        </group>

        {/* Stage 1 (Booster & Interstage) */}
        <group ref={stage1Ref}>
          {/* Interstage Ring (Carbon Fiber) */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 64]} />
            {carbonMaterial}
          </mesh>
          
          {/* Main Booster Tank */}
          <mesh position={[0, -0.75, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 4.4, 64]} />
            {hullMaterial}
          </mesh>

          {/* Liquid Oxygen / Fuel Pipe Line (Greeble) */}
          <mesh position={[0.52, -0.75, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 4.4, 16]} />
            {carbonMaterial}
          </mesh>

          {/* Grid Fins (Titanium) */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 1.4, 0]} rotation={[0, (Math.PI / 2) * i, 0]}>
              <boxGeometry args={[1.2, 0.4, 0.05]} />
              <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.5} wireframe={true} />
            </mesh>
          ))}

          {/* Landing Legs / Aero covers */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, -2.6, 0]} rotation={[0, (Math.PI / 2) * i, 0]}>
              <boxGeometry args={[1.2, 0.8, 0.1]} />
              {carbonMaterial}
            </mesh>
          ))}

          {/* Detailed Thrust Structure / Main Engine Array */}
          <group position={[0, -3.1, 0]}>
            <mesh>
              <cylinderGeometry args={[0.5, 0.4, 0.3, 64]} />
              {carbonMaterial}
            </mesh>
            {/* Center Engine */}
            <mesh position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.2, 0.3, 0.4, 64]} />
              {engineMetal}
            </mesh>
            {/* Outer Engines */}
            {[0, 1, 2, 3].map((i) => (
              <mesh key={i} position={[Math.sin((Math.PI/2)*i)*0.25, -0.2, Math.cos((Math.PI/2)*i)*0.25]}>
                <cylinderGeometry args={[0.1, 0.15, 0.3, 32]} />
                {engineMetal}
              </mesh>
            ))}
          </group>

          {/* Exhaust Flame */}
          <group ref={flameRef} position={[0, -4.8, 0]}>
            <mesh>
              <coneGeometry args={[0.8, 3.5, 32]} />
              <meshStandardMaterial color="#ff5500" emissive="#ff3300" emissiveIntensity={4} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
              <coneGeometry args={[0.4, 2.0, 32]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={8} transparent opacity={1} />
            </mesh>
          </group>

        </group>
      </group>
    </group>
  );
};

export default Rocket3D;

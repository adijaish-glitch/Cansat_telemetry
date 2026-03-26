import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [coords, setCoords] = useState({ x: 13, y: 12 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame to throttle state updates for smooth 60fps performance
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setCoords({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const pad = (num) => String(num).padStart(4, '0');

  return (
    <div className="fixed inset-0 z-50 pointer-events-none font-display uppercase text-xs md:text-sm tracking-widest text-gray-400">
      
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
        {/* Left */}
        <div className="flex items-center gap-3 text-gray-300">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#00f0ff]" />
          <span>ARAMBH // FLIGHT SYS</span>
        </div>
        
        {/* Center */}
        <div className="hidden md:block text-gray-500">
          {/* Cleared as requested */}
        </div>

        {/* Right Nav Links */}
        <div className="hidden lg:flex gap-8 text-right pointer-events-auto">
          {[
            { label: 'MISSION // PROFILE', id: 'timeline' },
            { label: 'SENSORS // ARRAY', id: 'features' },
            { label: 'AVIONICS // BRAIN', id: 'testimonials' },
            { label: 'STRUCTURE // AIRFRAME', id: 'about' }
          ].map((item, i) => (
            <a 
              key={i} 
              href={`#${item.id}`} 
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); 
              }} 
              className="hover:text-accent transition-colors flex flex-col items-end"
            >
              <span className="text-gray-300">{item.label.split(' // ')[0]}</span>
              <span className="text-gray-600">// {item.label.split(' // ')[1]}</span>
            </a>
          ))}
        </div>
      </div>

      {/* LEFT TELEMETRY */}
      <div className="absolute top-24 left-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          <span>AUTH_KEY: VALIDATED</span>
        </div>
        <span>SYS: NOMINAL</span>
        <span>ALT: <span className="text-accent">0880</span> M</span>
      </div>

      {/* RIGHT TELEMETRY */}
      <div className="absolute top-24 right-6 text-right flex flex-col gap-2">
        <span className="text-gray-300">COORDINATES</span>
        <span className="text-gray-600">X: {pad(coords.x)} Y: {pad(coords.y)}</span>
      </div>

      {/* BOTTOM BAR */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div><span className="text-accent mr-2">01</span> TARGET_ALT: 1000M</div>
          <div><span className="text-accent mr-2">02</span> PROPELLANT: KNSB</div>
          <div><span className="text-accent mr-2">03</span> RADIO: 433MHZ LORA</div>
        </div>
        <a href="#payload" className="hidden md:block pointer-events-auto cursor-pointer hover:text-accent transition-colors mb-1">
          {'>'} START_MISSION <span className="text-accent ml-2">v</span>
        </a>
      </div>

    </div>
  );
};

export default Navbar;

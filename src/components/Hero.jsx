import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden font-display uppercase">
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="text-accent text-sm md:text-md tracking-[0.3em] mb-4 font-bold"
        >
          {'>'} INITIALIZE_UPLINK // NOVA-1
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-widest leading-none mb-4"
          style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3)' }}
        >
          NOVA-1
        </motion.h1>

        {/* Horizontal Cyan Intersecting Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-accent/30 shadow-[0_0_10px_#00f0ff] -z-10" />

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="flex items-center gap-6 text-gray-500 text-sm md:text-lg tracking-[0.3em] mt-8 mb-4 border-t border-b border-white/5 py-4 px-12 lg:px-24"
        >
          <span className="text-gray-300">SUGAR ROCKET</span>
          <span className="text-accent font-bold">X</span>
          <span className="text-gray-300">CANSAT MISSION</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8 }}
          className="text-gray-600 text-xs md:text-sm tracking-widest mb-16"
        >
          {'>'} BUFFER_STATUS: <span className="text-gray-400">SYNCHRONIZING</span>
        </motion.div>

        <motion.a 
          href="#propulsion"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.0 }}
          className="px-16 py-5 border border-accent/80 text-accent hover:bg-accent/10 transition-all duration-300 tracking-[0.3em] sm:text-lg font-bold relative group bg-black/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          {'>'} START_MISSION
        </motion.a>

      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

import { CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black/40">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Visual Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Abstract Glass Shape */}
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />
            
            <div className="absolute inset-4 glass-panel rounded-[2rem] border border-white/20 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.15)]">
              {/* Decorative elements representing tech structure */}
              <div className="w-full h-full relative p-8 flex flex-col justify-between">
                <div className="w-16 h-2 bg-accent/50 rounded-full shadow-[0_0_10px_#00f0ff]" />
                <div className="space-y-4">
                  <div className="w-3/4 h-2 bg-gray-600/50 rounded-full" />
                  <div className="w-1/2 h-2 bg-purple-500/50 rounded-full" />
                  <div className="w-full h-2 bg-gray-600/50 rounded-full" />
                </div>
                <div className="w-12 h-12 border-4 border-accent/20 rounded-full animate-spin [animation-duration:4s]" />
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-1/4 glass-panel p-4 flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
              <span className="font-display font-bold text-sm">Ignition Ready</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-6 bottom-1/4 glass-panel p-4 flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_#00f0ff]" />
              <span className="font-display font-bold text-sm">Nominal Thrust</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <div className="inline-block px-4 py-1.5 border border-accent/30 rounded-full text-accent text-xs tracking-widest font-bold mb-6 w-max bg-accent/10">
            SOLID PROPULSION
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black font-display leading-tight mb-8">
            Pioneering Sugar <br />
            Rocket <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Physics</span>
          </h2>
          
          <div className="text-sm md:text-md text-gray-400 mb-8 leading-relaxed space-y-6 font-display font-light">
            <p>
              <strong className="text-white block mb-1 tracking-widest">{'>'} WHAT IS A SUGAR ROCKET?</strong>
              A sugar rocket is a robust solid-fuel architecture utilizing a mixture of sugar (fuel) and potassium nitrate (oxidizer). Ignition causes an aggressive exothermic reaction, releasing high-pressure thermal gases through the exhaust nozzle to produce vertical thrust in accordance with Newton's Third Law of Motion.
            </p>

            <p>
              <strong className="text-white block mb-1 tracking-widest">{'>'} ENERGY FLOW & DYNAMICS</strong>
              <span className="text-accent">Chemical → Thermal → Kinetic → Gravitational Potential</span><br/><br/>
              The continuous expansion of thermal gas generates thrust mathematically defined as: <br/>
              <span className="font-bold text-gray-300 bg-white/5 px-2 py-1 ml-2 inline-block">𝐹 = 𝑚 ⋅ 𝑣𝑒</span> (Thrust = Mass Flow Rate × Exhaust Velocity)
            </p>

            <div className="p-5 border border-white/10 bg-black/50 text-accent font-mono text-xs md:text-sm mt-4 shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
              <span className="text-gray-500 block mb-2 tracking-[0.2em]">// STOICHIOMETRIC REACTION (SUCROSE)</span>
              C12H22O11 + 6KNO3 <br className="md:hidden"/>→ 3K2CO3 + 3N2 + 9CO2 + 11H2O + Heat
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;

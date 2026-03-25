import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  { id: '01', title: 'PRE-LAUNCH', desc: 'System checks nominal. Slow rotation on pads.' },
  { id: '02', title: 'IGNITION', desc: 'KNO3/Sucrose fuel burn initiates. Exhaust flame expansion.' },
  { id: '03', title: 'ASCENT', desc: 'Max-Q, increased rotation, vertical climb, structural oscillation.' },
  { id: '04', title: 'STAGE SEPARATION', desc: 'Main booster shutdown. Fairing separation mechanisms engage.' },
  { id: '05', title: 'CANSAT DEPLOY', desc: 'Avionics trigger payload ejection. CanSat separation & spin stabilization.' },
  { id: '06', title: 'FREE FLIGHT', desc: 'Zero-G float profile. Telemetry uplinks active during descent.' },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 border border-accent/30 rounded-full text-accent text-xs tracking-widest font-bold mb-6 bg-accent/10">
            MISSION PROFILE
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display text-white">
            FLIGHT <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">KINEMATICS</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
          {phases.map((phase, i) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-2 top-1.5 w-4 h-4 bg-black border-2 border-white/20 rounded-full group-hover:border-accent group-hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300" />
              
              <div className="glass-panel p-6 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-7xl font-black text-white/[0.03] pointer-events-none font-display">
                  {phase.id}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2 tracking-widest flex items-center gap-3">
                  <span className="text-accent text-sm">PHASE {phase.id}</span>
                  <span className="text-gray-600">//</span>
                  {phase.title}
                </h3>
                <p className="text-gray-400 font-light tracking-wide text-sm md:text-base w-3/4">
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Timeline;

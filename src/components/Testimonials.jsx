import React from 'react';
import { motion } from 'framer-motion';


const hardwareData = [
  {
    name: 'Flight Computer',
    role: 'Arduino Nano, Node 01',
    content: "The primary logic controller executing 10Hz PID stabilization and triggering the parachute deployment at exactly 100 meters AGL.",
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Telemetry Link',
    role: 'NRF24L01 Transceiver',
    content: "Maintains a constant 2.4GHz uplink to the ground station, broadcasting live pressure, acceleration, and GPS telemetry packets.",
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Recovery System',
    role: 'Nylon Parachute & Servo',
    content: "A mechanically actuated release mechanism that ejects the CanSat core laterally, instantly deploying the high-drag neon chute.",
    avatar: 'https://i.pravatar.cc/150?img=14'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      
      {/* Background Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 rounded-[100%] blur-[100px] pointer-events-none -rotate-12" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display mb-4 tracking-tight">
            MISSION <span className="gradient-text">HARDWARE</span>
          </h2>
          <div className="w-24 h-1 bg-accent/50 mx-auto rounded-full glow-text shadow-[0_0_15px_#00f0ff]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hardwareData.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 relative group"
            >
              {/* Quote marks */}
              <div className="absolute top-6 right-6 text-6xl text-white/5 font-display leading-none group-hover:text-accent/10 transition-colors">"</div>
              
              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed font-light">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-accent/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]" />
                <div>
                  <h4 className="font-bold text-white font-display text-sm uppercase tracking-wide">{t.name}</h4>
                  <span className="text-xs text-accent">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

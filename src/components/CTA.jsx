import React from 'react';
import { motion } from 'framer-motion';

import { Zap } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-3xl overflow-hidden glass-panel border-accent/20 p-12 md:p-20 text-center shadow-[0_0_50px_rgba(0,240,255,0.1)]"
        >
          {/* Intense Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-accent/20 mx-auto flex items-center justify-center mb-8 border border-accent shadow-[0_0_20px_#00f0ff] animate-pulse">
            <Zap className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            TRACK LIVE <span className="gradient-text">TELEMETRY</span>
          </h2>
          
          <p className="relative z-10 text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light">
            Connect to the ground station to monitor CanSat sensors in real-time during the descent phase. Adopt the architecture of the future and launch your application ahead of the curve.
          </p>
          
          <button className="relative z-10 btn-primary px-12 py-5 text-xl">
            Get Started Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;

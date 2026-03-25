import React from 'react';
import { motion } from 'framer-motion';

import { Cpu, Shield, Zap, Globe, Database, Layers } from 'lucide-react';

const featuresData = [
  {
    icon: <Cpu className="w-8 h-8 text-accent" />,
    title: 'Node 01 Processor',
    desc: 'Arduino Nano processing sensor telemetry at 10Hz and controlling apogee ejection logic.',
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-400" />,
    title: 'Pressure & Altitude',
    desc: 'BMP280 sensor calculating high-precision barometric altitude for parachute deployment.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: 'Temperature Data',
    desc: 'LM35 module recording external and internal atmospheric conditions during the flight profile.',
  },
  {
    icon: <Database className="w-8 h-8 text-blue-400" />,
    title: 'Live Telemetry',
    desc: 'NRF24L01 transceiver broadcasting real-time instrumentation packets to mission control.',
  },
  {
    icon: <Globe className="w-8 h-8 text-green-400" />,
    title: 'GPS Tracking',
    desc: 'NEO-6M GPS receiver providing latitude and longitude for post-flight payload recovery.',
  },
  {
    icon: <Layers className="w-8 h-8 text-pink-400" />,
    title: 'Stage Separation',
    desc: 'Mechanical release triggered by apogee detection, deploying the CanSat payload safely.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display mb-6">
            CANSAT PAYLOAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent">SPECIFICATIONS</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400">
            A comprehensive suite of interconnected telemetry and life-support sensors engineered for sub-orbital flight.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresData.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3 text-white group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D CANSAT INTERACTIVE VIEWER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative w-full h-[500px] md:h-[700px] border border-accent/20 bg-black/60 backdrop-blur-sm group overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)]"
        >
          {/* Decorative Sci-Fi HUD Tracking Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent pointer-events-none z-10" />
          
          {/* Embedded Standalone HTML Tracker */}
          <iframe 
            src="/cansat-3d.html" 
            title="Interactive CanSat 3D Schematic"
            className="w-full h-full border-none pointer-events-auto filter saturate-150 contrast-125"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Features;

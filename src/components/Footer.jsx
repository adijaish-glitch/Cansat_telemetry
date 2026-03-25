import React from 'react';
import { Hexagon, Globe, Code, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 group mb-6">
            <Hexagon className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
            <span className="text-xl font-display font-bold tracking-widest text-white group-hover:text-accent transition-colors">
              NEXUS
            </span>
          </div>
          <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
            Architecting the digital frontier. We provide responsive, glassmorphic UI components built for speed and aesthetics.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold font-display uppercase tracking-wider mb-6">Platform</h4>
          <ul className="space-y-4">
            {['Components', 'Templates', 'Pricing', 'API Docs'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-500 hover:text-accent transition-colors text-sm font-medium">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold font-display uppercase tracking-wider mb-6">Connect</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-darkBg hover:shadow-[0_0_15px_#00f0ff] transition-all">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-darkBg hover:shadow-[0_0_15px_#00f0ff] transition-all">
              <Code className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-darkBg hover:shadow-[0_0_15px_#00f0ff] transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Nexus UI Systems. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

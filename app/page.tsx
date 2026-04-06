'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    { title: 'EarthAI', url: 'https://earth-ai-zeta.vercel.app/' },
    { title: 'PoeticFlow', url: 'https://poeticflow.crentai.qzz.io/' },
    { title: 'WordLift', url: 'https://wordlift.crentai.qzz.io/' },
  ];

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-[#050505] selection:bg-white selection:text-black">
      
      {/* Background radial subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-transparent to-transparent pointer-events-none" />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        {/* We use visibility hidden before mount to avoid layout flashes */}
        <div className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <motion.h1 
            initial={{ scaleX: -1 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="text-7xl md:text-9xl tracking-tighter text-white font-medium"
          >
            Crent
          </motion.h1>
        </div>
      </div>

      {/* Projects Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 z-10">
        {projects.map((project, idx) => (
          <Link key={idx} href={project.url} target="_blank" rel="noopener noreferrer">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-8 rounded-[1.5rem] bg-neutral-950/50 backdrop-blur-sm border border-white/5 hover:border-white/20 hover:bg-neutral-900/60 transition-all duration-300 group overflow-hidden shadow-2xl flex flex-col items-center justify-center h-48 cursor-pointer"
            >
              {/* Subtle hover glow at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 duration-500 pointer-events-none" />
              
              <h2 className="text-2xl font-light tracking-wide text-white/80 group-hover:text-white mb-3 transition-colors duration-300">
                {project.title}
              </h2>
              
              <div className="text-white/30 text-sm flex items-center gap-2 group-hover:text-white/70 transition-colors duration-300">
                <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Launch App
                </span>
                <svg 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full pt-8 flex justify-center z-10">
        <Link 
          href="https://www.instagram.com/karmacharya32" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-white/30 hover:text-white transition-colors duration-300 tracking-[0.2em] font-mono group"
        >
          <span className="group-hover:opacity-50 transition-opacity">karmacharya</span>
        </Link>
      </footer>
    </main>
  );
}

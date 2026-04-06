'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

// ---------- PROJECT DATA ----------
const PROJECTS = [
  {
    title: 'EarthAI',
    tag: 'Conversational AI',
    url: 'https://earth-ai-zeta.vercel.app/',
    description: 'Intelligent, Earth-aware dialogue.',
  },
  {
    title: 'PoeticFlow',
    tag: 'Creative AI',
    url: 'https://poeticflow.crentai.qzz.io/',
    description: 'Transform thoughts into lyrical verse.',
  },
  {
    title: 'WordLift',
    tag: 'Language AI',
    url: 'https://wordlift.crentai.qzz.io/',
    description: 'Elevate every word you write.',
  },
];

// ---------- PARTICLE (floating dots) ----------
function Particles() {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.2, // slightly brighter for deep blue
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ---------- 3-D TILT CARD ----------
function TiltCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 + index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
    >
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        {/* Card glow behind */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-blue-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
        
        {/* Card body */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-3xl px-8 py-10 flex flex-col gap-4 group-hover:border-white/20 transition-all duration-500 hover:bg-white/[0.06]">
          {/* inner shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

          {/* Tag */}
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-blue-200/80">
            {project.tag}
          </span>

          {/* Title */}
          <h2 className="text-3xl font-light tracking-tight text-white group-hover:text-blue-50 transition-colors duration-300">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-blue-100/50 group-hover:text-blue-100/80 transition-colors duration-300">
            {project.description}
          </p>

          {/* Arrow CTA */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs tracking-[0.15em] text-blue-300/80 group-hover:text-blue-200 transition-colors duration-300 uppercase">
              Explore
            </span>
            <motion.svg
              className="w-4 h-4 text-blue-300/60 group-hover:text-blue-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------- PREMIUM HERO TEXT ----------
function HeroText() {
  return (
    <div className="relative flex items-center justify-center select-none py-10 w-full">
      {/* Deep halo */}
      <div
        className="absolute rounded-full blur-[100px] pointer-events-none"
        style={{
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(147,197,253,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Main text: gradient clip with high-end typography */}
      <motion.h1
        initial={{ filter: 'blur(12px)', opacity: 0, y: 30 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-extralight tracking-[-0.07em] leading-none text-transparent bg-clip-text drop-shadow-2xl"
        style={{ 
          fontSize: 'clamp(80px, 22vw, 200px)',
          fontFamily: '"Inter", system-ui, sans-serif',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 40%, #93c5fd 100%)'
        }}
      >
        Crent
      </motion.h1>
    </div>
  );
}

// ---------- PAGE ----------
export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden font-sans">
      
      {/* ─── BACKGROUND: slightly light blue top → deep sea blue bottom ─── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(to top, #010617 0%, #061c47 60%, #113470 100%)',
        }}
      />
      
      {/* Subtle radial ambient light centrally positioned */}
      <div
        className="fixed inset-0 -z-10 opacity-70 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(147,197,253,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full max-w-7xl flex items-center justify-between px-8 py-8 z-10"
      >
        <span className="text-sm tracking-[0.3em] uppercase text-white/50 font-light">
          Crent<span className="text-blue-300/80">AI</span>
        </span>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 z-10 text-center w-full">
        <HeroText />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-blue-100/60 font-light tracking-wide"
        >
          A suite of AI-powered tools designed to reshape&nbsp;
          <span className="text-white/90 font-normal">how you think, create, and communicate.</span>
        </motion.p>
      </section>

      {/* ─── PROJECT CARDS ─── */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-28 pt-10 z-10 block">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="w-full flex items-center justify-center py-10 z-10 border-t border-white/[0.05]">
        <Link
          href="https://www.instagram.com/karmacharya32"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-white/30 hover:text-white/80 transition-colors duration-500"
        >
          <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span className="text-xs tracking-[0.25em] font-light uppercase">karmacharya</span>
        </Link>
      </footer>
    </main>
  );
}

'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  const particles = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 8,
    opacity: 0.06 + Math.random() * 0.14,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-200"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
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
  const rotateX = useTransform(springY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-12deg', '12deg']);

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
      style={{ rotateX, rotateY, perspective: 800, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 + index * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer"
    >
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        {/* Card glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Card body */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-2xl px-8 py-10 flex flex-col gap-4 shadow-[0_0_60px_rgba(0,0,0,0.5)] group-hover:border-white/[0.14] transition-all duration-500">
          {/* inner shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Tag */}
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-blue-300/70">
            {project.tag}
          </span>

          {/* Title */}
          <h2 className="text-3xl font-extralight tracking-tight text-white group-hover:text-blue-100 transition-colors duration-300">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300">
            {project.description}
          </p>

          {/* Arrow CTA */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs tracking-widest text-blue-400/70 group-hover:text-blue-300 transition-colors duration-300">
              Explore
            </span>
            <motion.svg
              className="w-4 h-4 text-blue-400/50 group-hover:text-blue-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
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

// ---------- GLITCHY LETTER REVEAL ----------
function HeroText() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Glow halo behind title */}
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(56,119,255,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Main word */}
      <motion.span
        initial={{ scaleX: -1, filter: 'blur(20px)', opacity: 0 }}
        animate={{
          scaleX: flipped ? 1 : -1,
          filter: flipped ? 'blur(0px)' : 'blur(20px)',
          opacity: 1,
        }}
        transition={{
          delay: 0.15,
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative text-[min(20vw,180px)] font-thin tracking-[-0.06em] leading-none text-white"
        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
      >
        Crent
        {/* Chromatic bleed effect */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 text-[min(20vw,180px)] font-thin tracking-[-0.06em] text-blue-400"
          style={{ transform: 'translate(-3px, 0)', mixBlendMode: 'screen', color: '#3b82f6' }}
        >
          Crent
        </motion.span>
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 text-[min(20vw,180px)] font-thin tracking-[-0.06em]"
          style={{ transform: 'translate(3px, 0)', mixBlendMode: 'screen', color: '#67e8f9' }}
        >
          Crent
        </motion.span>
      </motion.span>
    </div>
  );
}

// ---------- PAGE ----------
export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden font-sans">

      {/* ─── BACKGROUND: black top → deep-sea blue bottom ─── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to top, #040e24 0%, #061530 15%, #050e1e 32%, #030911 55%, #010307 75%, #000000 100%)',
        }}
      />

      {/* Subtle scanlines texture */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)',
        }}
      />

      {/* Radial sea-floor glow at bottom */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"
        style={{
          width: '110vw',
          height: '55vh',
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(14,42,100,0.65) 0%, rgba(6,20,52,0.3) 45%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-6xl flex items-center justify-between px-8 py-7 z-10"
      >
        <span className="text-xs tracking-[0.28em] uppercase text-white/30 font-light">
          Crent<span className="text-blue-400/70">AI</span>
        </span>
        <span className="text-xs tracking-widest text-white/20 font-light hidden sm:block">
          Creative Intelligence
        </span>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-10 z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="text-[11px] tracking-[0.3em] uppercase text-blue-300/50 mb-2"
        >
          Intelligent Systems
        </motion.p>

        <HeroText />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-4 max-w-md text-sm leading-7 text-white/30 font-light tracking-wide"
        >
          A suite of AI-powered tools designed to reshape&nbsp;
          <span className="text-white/60">how you think, create, and communicate.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.6 }}
          className="mt-2 flex items-center gap-2 text-white/20"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] tracking-widest uppercase">Explore projects</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </section>

      {/* ─── PROJECT CARDS ─── */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 px-6 pb-24 z-10">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </section>

      {/* ─── BOTTOM DIVIDER ─── */}
      <div className="w-full max-w-5xl px-6 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="w-full flex items-center justify-center py-8 z-10">
        <Link
          href="https://www.instagram.com/karmacharya32"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors duration-500"
        >
          <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span className="text-[11px] tracking-[0.2em] font-light">karmacharya</span>
        </Link>
      </footer>

    </main>
  );
}

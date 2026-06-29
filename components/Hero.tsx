"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-16">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-5"
      >
        AI-Powered Career Tools
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-ink leading-tight tracking-tight max-w-4xl"
      >
        Land the job.
        <br />
        <span className="text-gold">Let AI do</span> the
        <br />
        heavy lifting.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-base md:text-lg text-muted font-sans max-w-xl leading-relaxed"
      >
        Paste your CV and a job description. Get an instant match score, keyword gaps, and a tailored cover letter — in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/tool"
          className="px-8 py-3.5 bg-gold text-cream font-sans text-sm tracking-widest uppercase rounded-md hover:bg-gold/90 transition-colors"
        >
          Analyze my CV — Free
        </Link>
        <Link
          href="#how-it-works"
          className="text-xs font-sans tracking-widest uppercase text-muted hover:text-ink transition-colors"
        >
          How it works ↓
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 text-[10px] text-muted font-sans tracking-wide"
      >
        3 free analyses · No sign-up required
      </motion.p>
    </section>
  );
}

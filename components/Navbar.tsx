"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-cream/80 backdrop-blur-md"
    >
      <Link href="/" className="font-heading font-bold text-xl text-ink tracking-tight">
        Apply<span className="text-gold">AI</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/pricing" className="text-xs font-sans tracking-widest uppercase text-muted hover:text-ink transition-colors">
          Pricing
        </Link>
        <Link
          href="/tool"
          className="text-xs font-sans tracking-widest uppercase px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-cream transition-colors rounded-md"
        >
          Try Free
        </Link>
      </div>
    </motion.nav>
  );
}

"use client";
import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Match Score",
    description: "See exactly how well your CV matches the job description — scored out of 100.",
  },
  {
    icon: "🔍",
    title: "Keyword Gap Analysis",
    description: "Discover which important keywords from the job description are missing from your CV.",
  },
  {
    icon: "✉️",
    title: "Cover Letter Generator",
    description: "Generate a tailored, professional cover letter specific to the role in one click.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Features() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32 max-w-5xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-3 text-center"
      >
        What you get
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-heading font-bold text-ink mb-16 text-center"
      >
        Everything you need to stand out
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="bg-card border border-border rounded-xl p-7"
          >
            <span className="text-2xl mb-4 block">{f.icon}</span>
            <h3 className="font-heading font-bold text-ink text-lg mb-2">{f.title}</h3>
            <p className="text-muted font-sans text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

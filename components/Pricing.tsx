"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Try it out, no strings attached.",
    features: ["3 CV analyses", "3 cover letters", "No sign-up required"],
    cta: "Start for free",
    href: "/tool",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For serious job seekers.",
    features: ["Unlimited analyses", "Unlimited cover letters", "Priority AI responses", "Email support"],
    cta: "Get Pro",
    href: "#",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-3 text-center"
      >
        Pricing
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-heading font-bold text-ink mb-16 text-center"
      >
        Simple, honest pricing
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className={`rounded-xl p-8 border ${
              plan.highlight
                ? "border-gold bg-card"
                : "border-border bg-card"
            }`}
          >
            {plan.highlight && (
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-sans mb-4 block">
                Most Popular
              </span>
            )}
            <h3 className="font-heading font-bold text-2xl text-ink mb-1">{plan.name}</h3>
            <p className="text-muted font-sans text-sm mb-4">{plan.description}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-heading font-bold text-gold">{plan.price}</span>
              <span className="text-muted font-sans text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-sans text-muted">
                  <span className="text-gold">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`block text-center text-xs font-sans tracking-widest uppercase py-3 rounded-md transition-colors ${
                plan.highlight
                  ? "bg-gold text-cream hover:bg-gold/90"
                  : "border border-border text-muted hover:text-ink hover:border-ink/40"
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

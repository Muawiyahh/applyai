"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { AnalysisResult } from "@/lib/claude";

type Step = "input" | "analyzing" | "results";

export default function ToolPage() {
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [usesLeft, setUsesLeft] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);

  async function handleAnalyze() {
    if (!cv.trim() || !jd.trim()) return;
    setStep("analyzing");
    setError("");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv, jd }),
    });

    if (res.status === 403) {
      setLimitReached(true);
      setStep("input");
      return;
    }

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      setStep("input");
      return;
    }

    const data = await res.json();
    setAnalysis(data.result);
    setUsesLeft(data.usesLeft);
    setStep("results");
  }

  async function handleGenerateLetter() {
    if (!analysis) return;
    setGeneratingLetter(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv, jd, analysis }),
    });
    if (res.ok) {
      const data = await res.json();
      setCoverLetter(data.letter);
    }
    setGeneratingLetter(false);
  }

  function handleReset() {
    setStep("input");
    setAnalysis(null);
    setCoverLetter("");
    setError("");
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans hover:text-ink transition-colors">
          ← ApplyAI
        </Link>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-ink mt-4">
          CV Analyzer
        </h1>
        <p className="text-muted font-sans text-sm mt-2">
          Paste your CV and the job description below to get your match score and cover letter.
        </p>
        {usesLeft !== null && (
          <p className="text-[10px] tracking-wide font-sans text-gold mt-2">
            {usesLeft} free {usesLeft === 1 ? "analysis" : "analyses"} remaining
          </p>
        )}
      </div>

      {/* Limit reached banner */}
      <AnimatePresence>
        {limitReached && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl border border-gold/40 bg-gold/10 text-sm font-sans text-ink"
          >
            You&apos;ve used all 3 free analyses.{" "}
            <Link href="/pricing" className="text-gold underline">Upgrade to Pro</Link> for unlimited access.
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-sm font-sans text-red-400">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Input step */}
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div>
              <label className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans block mb-2">
                Your CV / Resume
              </label>
              <textarea
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                placeholder="Paste your full CV text here..."
                rows={10}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sans text-ink placeholder:text-muted resize-none focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans block mb-2">
                Job Description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                rows={8}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sans text-ink placeholder:text-muted resize-none focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!cv.trim() || !jd.trim() || limitReached}
              className="w-full py-3.5 bg-gold text-cream font-sans text-xs tracking-widest uppercase rounded-md hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze my CV
            </button>
          </motion.div>
        )}

        {/* Analyzing step */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full"
            />
            <p className="text-sm font-sans text-muted">Analyzing your CV...</p>
          </motion.div>
        )}

        {/* Results step */}
        {step === "results" && analysis && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Score */}
            <div className="bg-card border border-border rounded-xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans mb-3">Match Score</p>
              <div className="flex items-end gap-3 mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl font-heading font-bold text-gold"
                >
                  {analysis.score}
                </motion.span>
                <span className="text-2xl font-heading text-muted mb-2">/ 100</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.score}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                  className="h-full bg-gold rounded-full"
                />
              </div>
              <p className="text-sm font-sans text-muted mt-4 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Keywords */}
            <div className="bg-card border border-border rounded-xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans mb-4">Missing Keywords</p>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-md bg-border text-sm font-sans text-muted border border-border">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-7">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans mb-4">Strengths</p>
                <ul className="space-y-2">
                  {analysis.strengths.map((s) => (
                    <li key={s} className="flex gap-2 text-sm font-sans text-muted">
                      <span className="text-gold shrink-0">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-7">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans mb-4">Improvements</p>
                <ul className="space-y-2">
                  {analysis.improvements.map((s) => (
                    <li key={s} className="flex gap-2 text-sm font-sans text-muted">
                      <span className="text-gold shrink-0">→</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-card border border-border rounded-xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans mb-4">Cover Letter</p>
              {coverLetter ? (
                <div className="space-y-4">
                  <p className="text-sm font-sans text-muted leading-relaxed whitespace-pre-wrap">{coverLetter}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(coverLetter)}
                    className="text-xs font-sans tracking-widest uppercase text-gold border border-gold/40 px-4 py-2 rounded-md hover:bg-gold/10 transition-colors"
                  >
                    Copy to clipboard
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerateLetter}
                  disabled={generatingLetter}
                  className="w-full py-3 border border-gold text-gold font-sans text-xs tracking-widest uppercase rounded-md hover:bg-gold hover:text-cream transition-colors disabled:opacity-40"
                >
                  {generatingLetter ? "Generating..." : "Generate cover letter"}
                </button>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-sans tracking-widest uppercase text-muted hover:text-ink transition-colors"
            >
              ← Analyze another CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

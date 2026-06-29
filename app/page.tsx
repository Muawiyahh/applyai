import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <footer className="border-t border-border px-6 py-8 text-center">
          <p className="text-xs font-sans text-muted">© {new Date().getFullYear()} ApplyAI · Built by Muawiyah Althaf</p>
        </footer>
      </main>
    </>
  );
}

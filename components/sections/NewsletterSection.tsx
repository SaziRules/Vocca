"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

export default function NewsletterSection() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      className="bg-parchment py-28 border-t border-void/10"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="max-w-[580px] mx-auto text-center">

          <Reveal animation="fade">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6 font-light">
              Inner Circle
            </p>
          </Reveal>

          <Reveal animation="up" delay={100}>
            <h2
              id="newsletter-heading"
              className="font-display font-bold text-void mb-4"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Be the first to indulge.
            </h2>
          </Reveal>

          <Reveal animation="up" delay={200}>
            <p className="text-[0.78rem] font-light tracking-wide text-ash leading-loose mb-10">
              Early access to limited editions. Seasonal previews. VOCCA rituals delivered to you — never spam, always intention.
            </p>
          </Reveal>

          <Reveal animation="up" delay={300}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-0 max-w-[440px] mx-auto"
                noValidate
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-transparent border border-void/20 border-r-0
                             px-5 py-3.5 text-[0.75rem] font-light tracking-wide text-void
                             placeholder:text-ash/50 outline-none
                             focus:border-gold transition-colors duration-300"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark whitespace-nowrap text-[0.6rem] disabled:opacity-60"
                >
                  {loading ? "…" : "Join"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-[0.75rem] font-light tracking-wide text-void">
                  Welcome to the VOCCA inner circle.
                </p>
                <p className="text-[0.65rem] tracking-wide text-ash">
                  Watch your inbox for something extraordinary.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal animation="fade" delay={400}>
            <p className="text-[0.6rem] tracking-[0.1em] text-ash/40 mt-5">
              No spam. Unsubscribe at any time. POPI compliant.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

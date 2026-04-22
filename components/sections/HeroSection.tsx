"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id:          "brand",
    eyebrow:     "Dubai Inspired · South African Crafted",
    title:       "Dubai-inspired luxury, crafted for South Africa.",
    description: "Artisan chocolate made in small batches. Every bar a deliberate act of craft — never mass-produced, always intentional.",
    cta1:        { label: "Shop Collection", href: "#collection" },
    cta2:        { label: "Our Story",       href: "#story"      },
  },
  {
    id:          "pistachio",
    eyebrow:     "Signature · 125g",
    title:       "Pistachio Kunafa. The signature of indulgence.",
    description: "Crisp kunafa, fragrant pistachio paste, Belgian milk chocolate. The sensation that defined a category — now in South Africa.",
    cta1:        { label: "Order Now",    href: "#collection" },
    cta2:        { label: "View Product", href: "#story"      },
  },
  {
    id:          "lotus",
    eyebrow:     "Signature · 125g",
    title:       "Lotus Kunafa. Caramelised perfection.",
    description: "Biscoff folded through toasted kunafa, sealed in velvety Belgian milk chocolate. A deliberate study in caramel and texture.",
    cta1:        { label: "Order Now",    href: "#collection" },
    cta2:        { label: "View Product", href: "#story"      },
  },
  {
    id:          "hazelnut",
    eyebrow:     "Signature · 125g",
    title:       "Hazelnut Kunafa. Rich, refined, unforgettable.",
    description: "Slow-roasted Italian hazelnuts pressed into silken praline, woven through crisp kunafa. Belgian milk chocolate. No compromise.",
    cta1:        { label: "Order Now",    href: "#collection" },
    cta2:        { label: "View Product", href: "#story"      },
  },
  {
    id:          "angel",
    eyebrow:     "Limited Edition · 150g",
    title:       "Angel Hair. Light texture, elevated indulgence.",
    description: "Hand-spun cotton candy suspended in ivory white chocolate. Playful in concept, precise in execution — unmistakably VOCCA.",
    cta1:        { label: "Order Now",    href: "#collection" },
    cta2:        { label: "View Product", href: "#story"      },
  },
];

const INTERVAL_MS  = 6000;
const EASE         = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION_OUT = 320;
const DURATION_IN  = 620;

type AnimState = "entering" | "visible" | "exiting";

export default function HeroSection() {
  const [current,   setCurrent]   = useState(0);
  const [animState, setAnimState] = useState<AnimState>("exiting");

  const rotateRef = useRef<HTMLDivElement>(null);
  const shiftRef  = useRef<HTMLDivElement>(null);

  const rotationRef   = useRef(0);
  const shiftXRef     = useRef(0);
  const lastScrollRef = useRef(0);
  const rafRef        = useRef<number | null>(null);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const delta = currentScroll - lastScrollRef.current;
        lastScrollRef.current = currentScroll;

        rotationRef.current = Math.max(-180, Math.min(180, rotationRef.current + delta * 0.12));

        shiftXRef.current = Math.max(-20, Math.min(20, shiftXRef.current + delta * 0.08));

        if (rotateRef.current) {
          rotateRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        }
        if (shiftRef.current) {
          shiftRef.current.style.transform = `translateX(${shiftXRef.current}px)`;
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimState("entering"), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (animState === "entering") {
      const t = setTimeout(() => setAnimState("visible"), 50);
      return () => clearTimeout(t);
    }
  }, [animState]);

  const goTo = useCallback((index: number) => {
    setAnimState("exiting");
    setTimeout(() => {
      setCurrent(index);
      setAnimState("entering");
    }, DURATION_OUT + 60);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide   = slides[current];
  const isIn    = animState === "visible";
  const isEnter = animState === "entering";
  const show    = isIn || isEnter;

  const el = (delayMs: number) => ({
    opacity:    show ? 1 : 0,
    transform:  show ? "translateY(0px)" : "translateY(14px)",
    transition: `opacity ${DURATION_IN}ms ${EASE} ${delayMs}ms, transform ${DURATION_IN}ms ${EASE} ${delayMs}ms`,
  });

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
      aria-label="VOCCA — Luxury Chocolate"
    >
      {/* BACKGROUND: white left / video right */}
      <div className="absolute inset-0 grid grid-cols-2" aria-hidden="true">
        <div className="bg-white" />
        <div className="relative overflow-hidden bg-[#1a1410]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/video/chocolate.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ELEMENT 1 — RotateOnScroll */}
      <div
        ref={rotateRef}
        className="hidden lg:block absolute pointer-events-none"
        style={{
          top:        "16%",
          left:       "11%",
          width:      "clamp(120px, 14vw, 280px)",
          height:     "clamp(120px, 14vw, 280px)",
          zIndex:     10,
          opacity:    0.55,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/RotateOnScroll.png"
          alt=""
          fill
          className="object-contain"
          sizes="220px"
          priority
        />
      </div>

      {/* ELEMENT 3 — StillOnScroll */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{
          bottom:  "-8%",
          left:    "0%",
          width:   "clamp(100px, 12vw, 180px)",
          height:  "clamp(100px, 12vw, 180px)",
          zIndex:  10,
          opacity: 0.45,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/StillOnScroll.png"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="180px"
        />
      </div>

      {/* DESKTOP CONTENT: z-20 */}
      <div
        className="hidden lg:flex absolute inset-0 items-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div
          className="pointer-events-auto"
          style={{
            position:   "relative",
            marginLeft: "clamp(2rem, 6vw, 6rem)",
            width:      "clamp(320px, 58vw, 860px)",
            transform:  "translateX(clamp(60px, 14vw, 200px))",
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-px"
            style={{ background: "rgba(198,165,107,0.25)" }}
            aria-hidden="true"
          />
          <div
            style={{
              background:    "#0e0e0e",
              paddingTop:    "clamp(2.5rem, 4vw, 4rem)",
              paddingBottom: "clamp(2.5rem, 4vw, 4rem)",
              paddingLeft:   "clamp(2rem, 4vw, 4rem)",
              paddingRight:  "clamp(2rem, 4vw, 4rem)",
            }}
          >
            <p
              className="font-light uppercase text-parchment/40 mb-6"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "0.62rem", letterSpacing: "0.38em", ...el(0) }}
            >
              {slide.eyebrow}
            </p>
            <h1
              className="font-display font-bold text-parchment mb-6"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 3rem)", lineHeight: "1.08", letterSpacing: "-0.02em", maxWidth: "18ch", ...el(90) }}
            >
              {slide.title}
            </h1>
            <p
              className="font-light text-parchment/50 mb-10"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "0.8rem", letterSpacing: "0.03em", lineHeight: "1.85", maxWidth: "44ch", ...el(180) }}
            >
              {slide.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap" style={el(270)}>
              <Link href={slide.cta1.href} className="btn-dark">{slide.cta1.label}</Link>
              <Link href={slide.cta2.href} className="btn-ghost-dark">{slide.cta2.label}</Link>
            </div>
            <div className="flex items-center gap-2 mt-10" role="tablist" aria-label="Slide navigation">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    width:      i === current ? "24px" : "6px",
                    height:     "2px",
                    background: i === current ? "var(--gold)" : "rgba(245,242,237,0.2)",
                    border:     "none",
                    padding:    0,
                    transition: "width 0.45s ease, background 0.45s ease",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ELEMENT 2 — SlightShiftOnScroll: z-30 */}
      <div
        ref={shiftRef}
        className="hidden lg:block absolute pointer-events-none"
        style={{
          left:       "calc(50% - clamp(70px, 8vw, 120px) / 2)",
          bottom:     "16%",
          width:      "clamp(90px, 28vw, 230px)",
          height:     "clamp(90px, 28vw, 230px)",
          zIndex:     30,
          opacity:    9,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/SlightShiftOnScroll.png"
          alt=""
          fill
          className="object-contain"
          sizes="120px"
        />
      </div>

      {/* MOBILE */}
      <div
        className="lg:hidden absolute inset-0 flex flex-col"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <div className="relative flex-1 bg-[#1a1410] overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
            <source src="/video/chocolate.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, #0e0e0e, transparent)" }} />
        </div>
        <div className="bg-void flex-1" />
      </div>

      <div
        className="lg:hidden absolute bottom-0 left-0 right-0 z-10"
        style={{ background: "#0e0e0e", padding: "2rem 1.75rem 2.5rem", pointerEvents: "auto" }}
      >
        <p className="font-light uppercase text-parchment/40 mb-4" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.58rem", letterSpacing: "0.38em", ...el(0) }}>
          {slide.eyebrow}
        </p>
        <h1 className="font-display font-bold text-parchment mb-4" style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", lineHeight: "1.1", letterSpacing: "-0.015em", ...el(80) }}>
          {slide.title}
        </h1>
        <p className="font-light text-parchment/45 mb-7" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.75rem", lineHeight: "1.8", ...el(160) }}>
          {slide.description}
        </p>
        <div className="flex flex-col gap-3 mb-6" style={el(240)}>
          <Link href={slide.cta1.href} className="btn-dark w-full justify-center">{slide.cta1.label}</Link>
          <Link href={slide.cta2.href} className="btn-ghost-dark w-full justify-center">{slide.cta2.label}</Link>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width:      i === current ? "20px" : "5px",
                height:     "2px",
                background: i === current ? "var(--gold)" : "rgba(245,242,237,0.2)",
                border:     "none",
                padding:    0,
                transition: "width 0.45s ease, background 0.45s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
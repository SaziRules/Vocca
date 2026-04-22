"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function TheBreakSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1Ref  = useRef<HTMLDivElement>(null);
  const layer2Ref  = useRef<HTMLDivElement>(null);
  const layer3Ref  = useRef<HTMLDivElement>(null);

  // Scroll-driven reveal of layers (simulating chocolate snap)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect  = section.getBoundingClientRect();
      const total = section.offsetHeight + window.innerHeight;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateX(${-progress * 30}px) rotate(${-progress * 2}deg)`;
        layer1Ref.current.style.opacity   = `${Math.min(1, progress * 3)}`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateX(${progress * 20}px) rotate(${progress * 1.5}deg)`;
        layer2Ref.current.style.opacity   = `${Math.min(1, progress * 3 - 0.3)}`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${-progress * 15}px)`;
        layer3Ref.current.style.opacity   = `${Math.min(1, progress * 3 - 0.6)}`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="the-break"
      ref={sectionRef}
      className="bg-void py-32 lg:py-40"
      aria-label="The Break — Visual Storytelling"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Scroll-driven image layers */}
          <div
            className="relative flex items-center justify-center min-h-[480px] lg:min-h-[600px]"
            data-cursor="product"
            aria-hidden="true"
          >
            {/* Layer 1 — receding background slab */}
            <div
              ref={layer1Ref}
              className="absolute opacity-0"
              style={{ bottom: "5%", left: "6%", willChange: "transform, opacity" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&q=80&auto=format&fit=crop"
                alt=""
                width={300}
                height={190}
                className="object-cover"
                style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.55)" }}
              />
            </div>

            {/* Layer 2 — secondary slab */}
            <div
              ref={layer2Ref}
              className="absolute opacity-0"
              style={{ top: "12%", right: "4%", willChange: "transform, opacity" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80&auto=format&fit=crop"
                alt=""
                width={240}
                height={170}
                className="object-cover"
                style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
              />
            </div>

            {/* Layer 3 — hero slab, clean rectangle */}
            <div
              ref={layer3Ref}
              className="relative opacity-0 z-10"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1601924351433-3d7b2f8e98ce?w=600&q=85&auto=format&fit=crop"
                alt="VOCCA chocolate interior revealed"
                width={380}
                height={500}
                className="object-cover"
                style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.7)" }}
              />
            </div>
          </div>

          {/* Right — Text */}
          <div className="lg:pl-8">
            <Reveal animation="up">
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-8 font-light">
                The Break
              </p>
            </Reveal>

            <Reveal animation="up" delay={80}>
              <h2
                className="font-display font-bold text-parchment mb-8"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  lineHeight: "0.95",
                  letterSpacing: "-0.02em",
                }}
              >
                A moment
                <br />
                <span className="text-gold">unveiled.</span>
              </h2>
            </Reveal>

            <Reveal animation="up" delay={160}>
              <p className="text-[0.8rem] font-light tracking-wide text-parchment/48
                            leading-[1.9] mb-5 max-w-[420px]">
                The outside is pristine. Composed. Confident. The interior holds the secret — crisp kunafa strands, fragrant pistachio paste, silken hazelnut praline. Each bar rewards the patient.
              </p>
            </Reveal>

            <Reveal animation="up" delay={220}>
              <p className="text-[0.8rem] font-light tracking-wide text-parchment/48
                            leading-[1.9] mb-14 max-w-[420px]">
                VOCCA chocolates are not eaten quickly. They are broken slowly. The sound — that clean snap — is the beginning of the experience.
              </p>
            </Reveal>

            <Reveal animation="up" delay={300}>
              <ul className="space-y-5 mb-14 list-none" role="list">
                {[
                  { label: "Single Origin Cacao",  detail: "Traced, selected, perfected"       },
                  { label: "Kunafa Infused",        detail: "Traditional Middle Eastern craft"  },
                  { label: "Handcrafted Batches",   detail: "Under 200 bars per flavour"        },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-5">
                    <div className="w-4 h-px bg-gold/50 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[0.72rem] font-medium tracking-wide text-parchment">
                        {item.label}
                      </p>
                      <p className="text-[0.65rem] font-light tracking-wide text-parchment/38 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal animation="up" delay={380}>
              <a href="#collection" className="btn-ghost-dark inline-flex">
                Discover All Bars
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    number: "01",
    title:  "Sourced",
    body:   "Single-origin cacao. Selected by hand. Traced from seed to slab.",
  },
  {
    number: "02",
    title:  "Crafted",
    body:   "Tempered by hand. Small batches. No shortcuts, no machines that rush.",
  },
  {
    number: "03",
    title:  "Finished",
    body:   "Edible 22-carat gold leaf applied to every signature piece. A final act of intention.",
  },
];

export default function AtelierSection() {
  return (
    <section
      id="atelier"
      className="bg-void"
      aria-labelledby="atelier-heading"
    >
      {/* Philosophy quote — full bleed image, no decorative elements */}
      <div className="relative flex items-center justify-center overflow-hidden py-32 lg:py-40"
           style={{ minHeight: "55vh" }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1600&q=75&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-center opacity-[0.18]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--void) 0%, rgba(14,14,14,0.6) 50%, var(--void) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[680px] mx-auto px-8 md:px-12 text-center">
          <Reveal animation="fade">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-8 font-light">
              Our Philosophy
            </p>
          </Reveal>

          <Reveal animation="up" delay={100}>
            {/* Quote — weight only, no italics */}
            <blockquote>
              <p
                className="font-display font-light text-parchment leading-[1.3] mb-8"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
              >
                Chocolate is not a treat.
                <br />
                <span className="font-bold text-gold">It is a ceremony.</span>
              </p>
            </blockquote>
          </Reveal>

          <Reveal animation="fade" delay={250}>
            {/* Attribution — plain text, no decorative lines */}
            <p className="text-[0.62rem] tracking-[0.25em] uppercase text-parchment/30">
              The VOCCA Atelier, Durban
            </p>
          </Reveal>
        </div>
      </div>

      {/* Process pillars */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pb-32">
        <Reveal animation="up" className="mb-16">
          <h2
            id="atelier-heading"
            className="font-display font-bold text-parchment"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              letterSpacing: "-0.015em",
            }}
          >
            How luxury is made.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.number} animation="up" delay={i * 100}>
              <div>
                {/* Number — ghost, architectural depth only */}
                <p
                  className="font-display font-bold text-parchment/[0.05] select-none mb-5"
                  style={{ fontSize: "4rem", lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </p>

                <h3
                  className="font-display font-bold text-parchment mb-3"
                  style={{ fontSize: "1.05rem" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[0.75rem] font-light tracking-wide text-parchment/42 leading-[1.85]">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats — flush grid, no border box */}
        <Reveal animation="up" delay={350}>
          <div className="mt-20 pt-16 border-t border-parchment/[0.07]
                          grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { value: "4",    unit: "Bars",  label: "In the Collection" },
              { value: "100%", unit: "",      label: "Handcrafted"       },
              { value: "22k",  unit: "Gold",  label: "Edible Leaf Finish"},
              { value: "<200", unit: "Bars",  label: "Per Batch"         },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display font-bold text-gold leading-none mb-1"
                  style={{ fontSize: "2rem" }}
                >
                  {stat.value}
                  {stat.unit && (
                    <span
                      className="font-light text-gold/60 ml-1"
                      style={{ fontSize: "1rem" }}
                    >
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="text-[0.6rem] tracking-[0.22em] uppercase text-parchment/30">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const giftTiers = [
  {
    name:     "The Single",
    desc:     "One bar. Perfectly chosen.",
    includes: ["1 signature bar", "Gift box & ribbon", "Handwritten note"],
    price:    "From R 295",
    featured: false,
  },
  {
    name:     "The Duo",
    desc:     "Two bars. Two stories.",
    includes: ["2 signature bars", "Magnetic gift box", "Ribbon & wax seal", "Personalised card"],
    price:    "From R 550",
    featured: true,
  },
  {
    name:     "The Collection",
    desc:     "All four. No compromise.",
    includes: ["All 4 signature bars", "Premium keepsake box", "Gold foil tissue", "Wax seal & ribbon", "Bespoke message card"],
    price:    "From R 980",
    featured: false,
  },
];

export default function GiftingSection() {
  return (
    <section
      id="gifting"
      className="relative bg-void py-32 lg:py-40 overflow-hidden"
      aria-labelledby="gifting-heading"
    >
      {/* Single clean background image — no stacked gradient noise */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1549399153-63a9be40e2b5?w=1600&q=75&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center opacity-[0.07]"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-12">

        {/* Header */}
        <div className="mb-20 max-w-[580px]">
          <Reveal animation="fade">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-5 font-light">
              Gift with Presence
            </p>
          </Reveal>
          <Reveal animation="up" delay={80}>
            <h2
              id="gifting-heading"
              className="font-display font-bold text-parchment mb-6"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
              }}
            >
              Some gifts speak
              <br />
              <span className="text-gold">before they are opened.</span>
            </h2>
          </Reveal>
          <Reveal animation="up" delay={150}>
            <p className="text-[0.8rem] font-light tracking-wide text-parchment/45 leading-[1.9]">
              VOCCA gift collections are designed as objects of desire long before
              they are ever unwrapped. Matte packaging. Gold foil embossing. Wax sealed.
            </p>
          </Reveal>
        </div>

        {/* Section label */}
        <Reveal animation="up">
          <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-10 font-light">
            Gift Options
          </p>
        </Reveal>

        {/* Gift tiers — clean, no excess borders */}
        <div className="grid md:grid-cols-3 gap-px bg-parchment/[0.06]">
          {giftTiers.map((tier, i) => (
            <Reveal key={tier.name} animation="up" delay={i * 100}>
              <div
                className={`flex flex-col h-full p-8 lg:p-10
                  ${tier.featured ? "bg-parchment/[0.04]" : "bg-transparent"}`}
              >
                {/* Featured marker */}
                <p
                  className="text-[0.52rem] tracking-[0.35em] uppercase mb-5 font-light"
                  style={{ color: tier.featured ? "var(--gold)" : "transparent" }}
                >
                  {tier.featured ? "Most Selected" : "—"}
                </p>

                <h3
                  className="font-display font-bold text-parchment mb-1"
                  style={{ fontSize: "1.25rem" }}
                >
                  {tier.name}
                </h3>
                <p className="text-[0.72rem] font-light text-parchment/40 tracking-wide mb-7">
                  {tier.desc}
                </p>

                <ul className="space-y-3 mb-10 flex-1 list-none">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-3 h-px bg-gold/40 flex-shrink-0" />
                      <span className="text-[0.68rem] font-light tracking-wide text-parchment/55">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-parchment/[0.08]">
                  <p
                    className="font-display font-bold text-gold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {tier.price}
                  </p>
                  <Link
                    href="#"
                    className="text-[0.6rem] tracking-[0.2em] uppercase font-light
                               text-parchment/35 hover:text-parchment
                               transition-colors duration-300 no-underline"
                  >
                    Select
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Corporate — clean, no border box */}
        <Reveal animation="up" delay={250}>
          <div className="mt-20 pt-16 border-t border-parchment/[0.08]
                          flex flex-col md:flex-row md:items-center
                          justify-between gap-8">
            <div>
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-3 font-light">
                Corporate Orders
              </p>
              <p className="text-[0.8rem] font-light tracking-wide text-parchment/45
                            leading-[1.9] max-w-[440px]">
                For weddings, corporate milestones, Eid, Diwali — or simply because someone deserves the extraordinary. Custom branding available.
              </p>
            </div>
            <Link href="mailto:gifts@vocca.co.za" className="btn-ghost-dark flex-shrink-0">
              Enquire Now
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


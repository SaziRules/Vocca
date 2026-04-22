"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/lib/products";

// ── One preview clip per product, keyed by slug keyword
const HOVER_VIDEO_MAP: Record<string, string> = {
  pistachio: "/video/pistachio-1.mp4",
  lotus:     "/video/lotus-1.mp4",
  hazelnut:  "/video/hazelnut-1.mp4",
  angel:     "/video/angel-1.mp4",
};

function resolveHoverVideo(slug: string): string | null {
  const key = Object.keys(HOVER_VIDEO_MAP).find((k) => slug.includes(k));
  return key ? HOVER_VIDEO_MAP[key] : null;
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const hoverSrc = resolveHoverVideo(product.slug);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    setVideoVisible(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setVideoVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Reveal
      delay={index * 80}
      className="group flex flex-col"
      data-cursor="product"
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block no-underline">
        <div
          className="relative overflow-hidden bg-pearl aspect-[3/4] mb-5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 22vw"
            className="object-cover object-center
                       transition-transform duration-[1200ms] ease-luxury
                       group-hover:scale-[1.04]"
            loading="lazy"
          />

          {/* Hover video — fades over image on enter */}
          {hoverSrc && (
            <video
              ref={videoRef}
              src={hoverSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                opacity:    videoVisible ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
              aria-hidden="true"
            />
          )}

          {/* New badge only — no category noise */}
          {product.isNew && (
            <span
              className="absolute top-4 left-4 text-[0.52rem] tracking-[0.2em]
                         uppercase px-2.5 py-1 font-light"
              style={{ background: product.accentColor, color: "#0E0E0E" }}
            >
              New
            </span>
          )}

          {/* Hover CTA — clean bar */}
          <div
            className="absolute bottom-0 left-0 right-0
                       translate-y-full group-hover:translate-y-0
                       transition-transform duration-500 ease-luxury"
          >
            <div
              className="flex items-center justify-center w-full py-3.5
                         text-[0.6rem] tracking-[0.22em] uppercase font-light
                         bg-parchment text-void
                         hover:bg-void hover:text-parchment
                         transition-colors duration-300"
            >
              View Product
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <h3
            className="font-display font-bold text-void mb-1 leading-tight
                       group-hover:text-smoke transition-colors duration-300"
            style={{ fontSize: "1.05rem" }}
          >
            {product.name}
          </h3>
          <p className="text-[0.68rem] font-light tracking-wide text-ash mb-3">
            {product.subtitle}
          </p>
          <p className="text-[0.8rem] font-medium text-void">
            R {product.price}
            <span className="text-[0.62rem] font-light text-ash ml-1.5">
              · {product.weight}
            </span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function FeaturedProductsSection() {
  return (
    <section
      id="collection"
      className="bg-parchment pt-24 pb-24"
      aria-labelledby="collection-heading"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end
                        justify-between mb-14 gap-6">
          <Reveal animation="up">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-3 font-light">
              The Collection
            </p>
            <h2
              id="collection-heading"
              className="font-display font-bold text-void"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Artisan Selections
            </h2>
          </Reveal>

          <Reveal animation="fade" delay={150}>
            <p className="text-[0.72rem] font-light tracking-wide text-ash
                          leading-relaxed max-w-[300px]">
              Four signature bars. Each one a distinct journey of flavour,
              texture, and craft.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-0 lg:gap-x-7">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA strip — clean, no border noise */}
        <Reveal animation="up" delay={350}>
          <div className="flex items-center gap-8 mt-16">
            <Link href="/shop" className="btn-ghost-light">
              View Full Collection
            </Link>
            <Link
              href="#gifting"
              className="text-[0.62rem] tracking-[0.18em] uppercase text-ash
                         hover:text-void transition-colors duration-300 font-light
                         no-underline"
            >
              Gift options →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

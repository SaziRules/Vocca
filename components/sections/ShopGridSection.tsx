"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/lib/products";

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

function ShopCard({ product, index }: { product: (typeof products)[0]; index: number }) {
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
    <Reveal key={product.id} animation="up" delay={index * 70}>
      <article
        className="group"
        data-cursor="product"
        aria-label={product.name}
      >
        <Link href={`/products/${product.slug}`} className="block no-underline">
          {/* Image */}
          <div
            className="relative aspect-[3/4] overflow-hidden bg-pearl mb-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={product.imagePkg}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1200ms] ease-luxury
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

            {product.isNew && (
              <span
                className="absolute top-3 right-3 text-[0.52rem] tracking-[0.2em]
                           uppercase px-2.5 py-1 font-light"
                style={{ background: product.accentColor, color: "#0E0E0E" }}
              >
                New
              </span>
            )}
          </div>

          {/* Info */}
          <h3
            className="font-display font-bold text-void mb-1 leading-tight"
            style={{ fontSize: "1rem" }}
          >
            {product.name}
          </h3>
          <p className="text-[0.68rem] font-light text-ash mb-3 tracking-wide">
            {product.subtitle}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-[0.82rem] font-medium text-void">
              R {product.price}
            </p>
            <span className="text-[0.58rem] tracking-[0.15em] uppercase text-ash/70">
              {product.weight}
            </span>
          </div>
        </Link>

        {/* Add to cart — full width, flat */}
        <button
          className="w-full mt-4 py-3 text-[0.62rem] tracking-[0.2em] uppercase
                     font-light text-void/50 border border-void/15
                     hover:text-void hover:border-void/40
                     transition-all duration-400 ease-luxury"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </article>
    </Reveal>
  );
}

export default function ShopGridSection() {
  return (
    <section
      id="shop"
      className="bg-parchment pt-24 pb-28"
      aria-labelledby="shop-heading"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end
                        justify-between mb-12 gap-4
                        pb-8 border-b border-void/[0.08]">
          <Reveal animation="up">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-2 font-light">
              Ready to Order
            </p>
            <h2
              id="shop-heading"
              className="font-display font-bold text-void"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Shop the Collection
            </h2>
          </Reveal>

          <Reveal animation="fade" delay={200}>
            <div className="flex items-center gap-5 text-[0.62rem] tracking-[0.15em]
                            uppercase text-ash">
              <span>Sort by</span>
              <button className="text-void border-b border-void/40 pb-0.5
                                 hover:border-void transition-colors duration-300">
                Featured
              </button>
              <button className="hover:text-void transition-colors duration-300">
                Price
              </button>
              <button className="hover:text-void transition-colors duration-300">
                New
              </button>
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 lg:gap-x-7">
          {products.map((product, i) => (
            <ShopCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Trust strip — text only, no decorative icons */}
        <Reveal animation="fade" delay={350}>
          <div
            className="mt-20 pt-10 border-t border-void/[0.08]
                        grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Free Gift Wrapping",  sub: "On every order"           },
              { label: "Same-Day Dispatch",   sub: "Order before 2PM"         },
              { label: "Nationwide Delivery", sub: "South Africa wide"         },
              { label: "Corporate Orders",    sub: "Custom branding available" },
            ].map((item) => (
              <div key={item.label} className="border-l border-void/[0.08] pl-5">
                <p className="text-[0.7rem] font-medium text-void tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="text-[0.62rem] font-light text-ash">{item.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

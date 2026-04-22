"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/lib/products";

// ── Slug-based video map — no changes to products data required
const VIDEO_MAP: Record<string, string[]> = {
  pistachio: ["/video/pistachio-1.mp4", "/video/pistachio-2.mp4"],
  lotus:     ["/video/lotus-1.mp4",     "/video/lotus-2.mp4"],
  hazelnut:  ["/video/hazelnut-1.mp4"],
  angel:     ["/video/angel-1.mp4",     "/video/angel-2.mp4"],
};
const FALLBACK_VIDEO = "/video/chocolate.mp4";

function resolveVideoSources(slug: string): string[] {
  const key = Object.keys(VIDEO_MAP).find((k) => slug.includes(k));
  return key ? VIDEO_MAP[key] : [FALLBACK_VIDEO];
}

function ProductStoryBlock({
  product,
  index,
}: {
  product: (typeof products)[0];
  index:   number;
}) {
  const isEven = index % 2 === 0;

  const videoSources = useRef<string[]>(resolveVideoSources(product.slug));
  const failedRef    = useRef<Set<number>>(new Set());
  const pendingRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const articleRef   = useRef<HTMLElement>(null);
  const videoElRef   = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [videoIndex, setVideoIndex] = useState(0);
  const [opacity, setOpacity]       = useState(1);

  // ── Visibility → play / pause via IntersectionObserver
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          const visible = entry.isIntersecting;
          isVisibleRef.current = visible;
          const video = videoElRef.current;
          if (!video) return;
          if (visible) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }, 150);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // ── Re-apply play state when video remounts (key change)
  useEffect(() => {
    const video = videoElRef.current;
    if (!video || !isVisibleRef.current) return;
    video.play().catch(() => {});
  }, [videoIndex]);

  // ── Video sequencing helpers
  const getNextIndex = useCallback((from: number): number | null => {
    const sources = videoSources.current;
    for (let i = 1; i < sources.length; i++) {
      const candidate = (from + i) % sources.length;
      if (!failedRef.current.has(candidate)) return candidate;
    }
    return null;
  }, []);

  const advanceTo = useCallback((next: number) => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    setOpacity(0);
    pendingRef.current = setTimeout(() => {
      setVideoIndex(next);
      setOpacity(1);
    }, 300);
  }, []);

  const handleEnded = useCallback(() => {
    const next = getNextIndex(videoIndex);
    if (next !== null) advanceTo(next);
  }, [videoIndex, getNextIndex, advanceTo]);

  const handleError = useCallback(() => {
    failedRef.current.add(videoIndex);
    const allFailed = videoSources.current.every((_, i) => failedRef.current.has(i));
    if (allFailed) {
      videoSources.current = [FALLBACK_VIDEO];
      failedRef.current.clear();
      setVideoIndex(0);
      setOpacity(1);
      return;
    }
    const next = getNextIndex(videoIndex);
    if (next !== null) advanceTo(next);
  }, [videoIndex, getNextIndex, advanceTo]);

  // ── Preload next clip
  useEffect(() => {
    const next = getNextIndex(videoIndex);
    if (next === null) return;
    const src = videoSources.current[next];
    if (!src) return;
    const el = document.createElement("video");
    el.src     = src;
    el.preload = "auto";
    return () => { el.src = ""; };
  }, [videoIndex, getNextIndex]);

  // ── Cleanup
  useEffect(() => () => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const currentSrc = videoSources.current[videoIndex] ?? null;
  const isMulti    = videoSources.current.length > 1;

  return (
    <article
      ref={articleRef}
      id={`story-${product.slug}`}
      className="grid lg:grid-cols-2 min-h-screen"
      aria-label={`${product.name} — product story`}
      style={{ minHeight: "100vh" }}
    >
      {/* Media side */}
      <Link
        href={`/products/${product.slug}`}
        className={`relative overflow-hidden block
          ${isEven ? "order-1" : "order-1 lg:order-2"}`}
        style={{ minHeight: "50vw" }}
        data-cursor="product"
        aria-label={`View ${product.name}`}
      >
        {currentSrc && (
          <div
            style={{
              position:   "absolute",
              inset:      0,
              opacity,
              transition: "opacity 0.5s ease",
            }}
          >
            <video
              ref={videoElRef}
              key={videoIndex}
              src={currentSrc}
              muted
              loop={!isMulti}
              playsInline
              preload="auto"
              onEnded={handleEnded}
              onError={handleError}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Image fallback — hidden unless video fails to load */}
        <Image
          src={product.imageStory}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-0"
          loading={index === 0 ? "eager" : "lazy"}
          aria-hidden="true"
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(14,14,14,0.35), transparent)",
          }}
          aria-hidden="true"
        />
      </Link>

      {/* Content side */}
      <div
        className={`bg-parchment flex flex-col justify-center
          ${isEven
            ? "order-2 px-10 py-20 lg:px-16 xl:px-20"
            : "order-2 lg:order-1 px-10 py-20 lg:px-16 xl:px-20"
          }`}
      >
        <Reveal animation="fade">
          <p
            className="font-display font-bold text-void/[0.06] select-none mb-6"
            style={{ fontSize: "5rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            0{index + 1}
          </p>
        </Reveal>

        <Reveal animation="up">
          <p className="text-[0.6rem] tracking-[0.38em] uppercase text-gold mb-5 font-light">
            {product.category}
          </p>
        </Reveal>

        <Reveal animation="up" delay={80}>
          <h2
            className="font-display font-bold text-void mb-3"
            style={{
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              lineHeight:    "1.05",
              letterSpacing: "-0.015em",
            }}
          >
            {product.name}
          </h2>
        </Reveal>

        <Reveal animation="up" delay={130}>
          <p className="text-[0.72rem] tracking-[0.12em] uppercase text-ash mb-8 font-light">
            {product.subtitle}
          </p>
        </Reveal>

        <Reveal animation="up" delay={180}>
          <p className="text-[0.82rem] font-light tracking-wide text-ash leading-[1.85] mb-8 max-w-[440px]">
            {product.description}
          </p>
        </Reveal>

        <Reveal animation="up" delay={230}>
          <div className="flex flex-col gap-2 mb-10">
            {product.flavourProfile.slice(0, 3).map((flavour) => (
              <div key={flavour} className="flex items-center gap-3">
                <div
                  className="w-4 h-px flex-shrink-0"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span className="text-[0.68rem] tracking-[0.12em] uppercase text-ash font-light">
                  {flavour}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal animation="up" delay={280}>
          <div className="flex items-end gap-8">
            <div>
              <p
                className="font-display font-bold text-void"
                style={{ fontSize: "1.6rem", lineHeight: 1 }}
              >
                R {product.price}
              </p>
              <p className="text-[0.62rem] font-light tracking-wide text-ash mt-1.5">
                {product.weight} &nbsp;·&nbsp; Free gift wrapping
              </p>
            </div>
            <Link href={`/products/${product.slug}`} className="btn-ghost-light">
              Order Now
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function ProductStoriesSection() {
  return (
    <section
      id="story"
      className="bg-parchment"
      aria-labelledby="stories-heading"
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-14 lg:px-16 pt-24 pb-16
                      border-b border-void/[0.07]">
        <Reveal animation="up">
          <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4 font-light">
            Each Bar, A Story
          </p>
          <h2
            id="stories-heading"
            className="font-display font-bold text-void"
            style={{
              fontSize:      "clamp(1.8rem, 3.5vw, 2.6rem)",
              letterSpacing: "-0.015em",
            }}
          >
            Meet the collection.
          </h2>
        </Reveal>
      </div>

      {products.map((product, i) => (
        <ProductStoryBlock key={product.id} product={product} index={i} />
      ))}
    </section>
  );
}

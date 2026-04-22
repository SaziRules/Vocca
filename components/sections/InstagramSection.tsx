"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useRef, useState, useEffect, useCallback } from "react";

// ── Types
type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

interface Post {
  id:              string;
  media_type:      MediaType;
  media_url:       string;
  thumbnail_url?:  string;
  permalink:       string;
  like_count?:     number;
  comments_count?: number;
  isPlaceholder?:  boolean;
}

// ── Placeholders — shown instantly, replaced when live feed arrives
const PLACEHOLDERS: Post[] = [
  { id: "p1", media_type: "IMAGE", media_url: "/images/products/pastichio.png",      permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p2", media_type: "IMAGE", media_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=85&auto=format&fit=crop", permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p3", media_type: "IMAGE", media_url: "/images/products/lotus.jpeg",          permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p4", media_type: "IMAGE", media_url: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=800&q=85&auto=format&fit=crop", permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p5", media_type: "IMAGE", media_url: "/images/products/hazelnut-kunafa.png", permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p6", media_type: "IMAGE", media_url: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=85&auto=format&fit=crop", permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
  { id: "p7", media_type: "IMAGE", media_url: "/images/products/angel.png",            permalink: "https://www.instagram.com/vocca.sa", isPlaceholder: true },
];

// ── Helpers
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

// ── Post card
function PostCard({ post, visible }: { post: Post; visible: boolean }) {
  const imgSrc   = post.media_type === "VIDEO" ? (post.thumbnail_url ?? post.media_url) : post.media_url;
  const hasStats = post.like_count !== undefined || post.comments_count !== undefined;
  const isVideo  = post.media_type === "VIDEO";

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block flex-shrink-0 overflow-hidden group no-underline"
      style={{
        width:          "clamp(200px, 28vw, 360px)",
        aspectRatio:    "1 / 1",
        scrollSnapAlign:"start",
        opacity:         visible ? 1 : 0,
        transition:      "opacity 0.6s ease",
      }}
      aria-label={`View Instagram post${isVideo ? " (video)" : ""}`}
      draggable={false}
    >
      <Image
        src={imgSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 28vw"
        className="object-cover object-center pointer-events-none
                   transition-transform duration-[1200ms] ease-luxury
                   group-hover:scale-[1.04]"
        loading="lazy"
        draggable={false}
        unoptimized={imgSrc.startsWith("/")}
      />

      {/* Video badge */}
      {isVideo && (
        <div className="absolute top-3 right-3 pointer-events-none" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="rgba(245,242,237,0.7)" strokeWidth="1.5"
               strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Hover overlay — stats (only on live posts) */}
      {!post.isPlaceholder && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3
                     bg-void/55 opacity-0 group-hover:opacity-100
                     transition-opacity duration-400 pointer-events-none"
          aria-hidden="true"
        >
          {hasStats ? (
            <>
              {post.like_count !== undefined && (
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(245,242,237,0.9)" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="font-light text-parchment/90" style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                    {formatCount(post.like_count)}
                  </span>
                </div>
              )}
              {post.comments_count !== undefined && (
                <div className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                       stroke="rgba(245,242,237,0.9)" strokeWidth="1.5"
                       strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="font-light text-parchment/90" style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                    {formatCount(post.comments_count)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="rgba(245,242,237,0.6)" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
        </div>
      )}
    </a>
  );
}

// ── Main section
export default function InstagramSection() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const didDrag     = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const fadeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cursor,  setCursor]  = useState<"grab" | "grabbing">("grab");
  const [posts,   setPosts]   = useState<Post[]>(PLACEHOLDERS);
  const [visible, setVisible] = useState(true);
  const [live,    setLive]    = useState(false);

  // Async fetch — fade out → swap → fade in; keep placeholders on failure
  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data: { data?: Post[] }) => {
        if (!Array.isArray(data.data) || data.data.length === 0) return;
        // Fade out
        setVisible(false);
        fadeTimer.current = setTimeout(() => {
          setPosts(data.data!);
          setLive(true);
          // Fade in
          setVisible(true);
        }, 500);
      })
      .catch(() => {}); // placeholders stay — no broken UI

    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current); };
  }, []);

  // Wheel → horizontal
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY * 0.9;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current  = true;
    didDrag.current     = false;
    startX.current      = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    setCursor("grabbing");
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const delta = e.pageX - startX.current;
    if (Math.abs(delta) > 4) didDrag.current = true;
    if (trackRef.current) trackRef.current.scrollLeft = scrollStart.current - delta;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    setCursor("grab");
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (didDrag.current) { e.preventDefault(); e.stopPropagation(); }
  }, []);

  return (
    <section
      className="bg-void pt-20 pb-24 border-t border-parchment/[0.06]"
      aria-label="VOCCA on Instagram"
    >
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <Reveal animation="fade">
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-3 font-light">
                The Feed
              </p>
            </Reveal>
            <Reveal animation="up" delay={80}>
              <h2
                className="font-display font-bold text-parchment"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em" }}
              >
                Follow the journey.
              </h2>
            </Reveal>
          </div>

          <Reveal animation="fade" delay={150}>
            <a
              href="https://www.instagram.com/vocca.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-3 group no-underline"
              aria-label="Follow VOCCA on Instagram"
            >
              {live && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold/60 mr-1"
                  title="Live feed"
                  aria-hidden="true"
                />
              )}
              <span className="text-[0.6rem] tracking-[0.28em] uppercase font-light
                               text-parchment/40 group-hover:text-parchment/80
                               transition-colors duration-400">
                @vocca.sa
              </span>
              <span
                className="block h-px w-8 bg-parchment/20 group-hover:bg-parchment/50
                           group-hover:w-12 transition-all duration-500"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Carousel — full width, edge-to-edge */}
      <Reveal animation="fade" delay={120}>
        <div
          ref={trackRef}
          className="no-scrollbar"
          style={{
            display:                 "flex",
            gap:                     "3px",
            overflowX:               "scroll",
            scrollSnapType:          "x proximity",
            WebkitOverflowScrolling: "touch",
            cursor,
            userSelect:              "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onClickCapture={onClickCapture}
        >
          {posts.map((post, i) => (
            <PostCard key={post.id ?? i} post={post} visible={visible} />
          ))}
        </div>
      </Reveal>

      {/* Footer CTA */}
      <Reveal animation="fade" delay={300}>
        <div className="flex items-center gap-6 mt-10 px-8 md:px-12">
          <span className="block h-px flex-1 bg-parchment/[0.06]" aria-hidden="true" />
          <a
            href="https://www.instagram.com/vocca.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.58rem] tracking-[0.3em] uppercase font-light
                       text-parchment/30 hover:text-parchment/70
                       transition-colors duration-400 no-underline whitespace-nowrap"
          >
            Follow @vocca.sa on Instagram
          </a>
          <span className="block h-px flex-1 bg-parchment/[0.06]" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}

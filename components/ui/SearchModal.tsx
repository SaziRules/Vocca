"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on open; clear on close
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const q           = query.trim().toLowerCase();
  const isFiltering = q.length > 0;
  const results: Product[] = isFiltering
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.flavourProfile.some((f) => f.toLowerCase().includes(q))
      )
    : [];
  const hasResults = results.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[60] flex flex-col"
      style={{
        background:           "rgba(10,9,8,0.97)",
        backdropFilter:       open ? "blur(24px)" : "blur(0px)",
        WebkitBackdropFilter: open ? "blur(24px)" : "blur(0px)",
        opacity:              open ? 1 : 0,
        pointerEvents:        open ? "auto" : "none",
        transition:           `opacity 480ms ${EASE}`,
      }}
    >

      {/* ── Top bar: wordmark · input · close ── */}
      <div
        className="flex-shrink-0 flex items-center gap-6 px-8 md:px-14 py-6"
        style={{
          opacity:    open ? 1 : 0,
          transform:  open ? "translateY(0)" : "translateY(-12px)",
          transition: `opacity 480ms ${EASE} 60ms, transform 480ms ${EASE} 60ms`,
        }}
      >
        {/* Faded wordmark — anchors the brand */}
        <span
          className="flex-shrink-0 font-display font-bold select-none hidden lg:block"
          style={{
            fontSize:      "0.78rem",
            letterSpacing: "0.3em",
            color:         "rgba(245,242,237,0.08)",
          }}
        >
          VOCCA
        </span>

        {/* Search input */}
        <div className="flex-1 flex items-center gap-4 min-w-0">
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round"
            className="flex-shrink-0"
            style={{ color: "rgba(198,165,107,0.45)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chocolates, flavours…"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent border-none outline-none
                       font-display font-bold text-parchment caret-gold
                       placeholder:font-display placeholder:font-bold"
            style={{
              fontSize:               "clamp(1.5rem, 3vw, 2.2rem)",
              letterSpacing:          "-0.015em",
              color:                  "rgba(245,242,237,0.9)",
              caretColor:             "#C6A56B",
            }}
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear"
              className="flex-shrink-0 text-[0.6rem] tracking-[0.2em] uppercase
                         font-light bg-transparent border-none
                         transition-colors duration-200"
              style={{ color: "rgba(245,242,237,0.2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.2)"; }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close search"
          className="flex-shrink-0 flex items-center gap-2 bg-transparent border-none
                     transition-colors duration-200"
          style={{ color: "rgba(245,242,237,0.28)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.65)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.28)"; }}
        >
          <span className="text-[0.55rem] tracking-[0.22em] uppercase hidden md:block">Esc</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.5"
               strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Gold rule */}
      <div
        className="flex-shrink-0 mx-8 md:mx-14"
        style={{
          height:     "0.5px",
          background: "linear-gradient(to right, transparent, rgba(198,165,107,0.25), transparent)",
          opacity:    open ? 1 : 0,
          transition: `opacity 600ms ${EASE} 100ms`,
        }}
        aria-hidden="true"
      />

      {/* ── Scrollable content ── */}
      <div
        className="flex-1 overflow-y-auto px-8 md:px-14 pt-9 pb-16"
        style={{
          opacity:    open ? 1 : 0,
          transform:  open ? "translateY(0)" : "translateY(18px)",
          transition: `opacity 500ms ${EASE} 130ms, transform 500ms ${EASE} 130ms`,
        }}
      >

        {/* State label — only while filtering */}
        {isFiltering && (
          <p
            className="text-[0.55rem] tracking-[0.4em] uppercase font-light mb-6"
            style={{ color: "rgba(245,242,237,0.2)" }}
          >
            {hasResults
              ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
              : "No results"}
          </p>
        )}

        {/* ── Product grid ── */}
        {hasResults && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-6 lg:gap-x-5">
            {results.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="group block no-underline"
                style={{
                  opacity:    open ? 1 : 0,
                  transform:  open ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 400ms ${EASE} ${i * 45}ms,
                               transform 400ms ${EASE} ${i * 45}ms`,
                }}
              >
                {/* Image */}
                <div
                  className="relative aspect-[2/3] overflow-hidden mb-2.5"
                  style={{ background: "rgba(245,242,237,0.04)" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-cover"
                    style={{ transition: "transform 800ms cubic-bezier(0.16,1,0.3,1)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  />

                  {/* Accent wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.1]
                               transition-opacity duration-400 pointer-events-none"
                    style={{ backgroundColor: product.accentColor }}
                  />

                  {/* New badge */}
                  {product.isNew && (
                    <span
                      className="absolute top-2 left-2 text-[0.45rem] tracking-[0.18em]
                                 uppercase px-1.5 py-0.5 font-light pointer-events-none"
                      style={{ background: product.accentColor, color: "#0E0E0E" }}
                    >
                      New
                    </span>
                  )}

                  {/* View bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0
                               translate-y-full group-hover:translate-y-0
                               transition-transform duration-400 pointer-events-none"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    <div
                      className="py-2 text-center text-[0.48rem] tracking-[0.22em] uppercase font-light"
                      style={{ background: "rgba(245,242,237,0.93)", color: "#0E0E0E" }}
                    >
                      View
                    </div>
                  </div>
                </div>

                {/* Accent line */}
                <div
                  className="h-px mb-2 transition-all duration-300 group-hover:w-6"
                  style={{ width: "0.75rem", backgroundColor: product.accentColor }}
                />

                {/* Name */}
                <h3
                  className="font-display font-bold leading-tight mb-1 transition-colors duration-300"
                  style={{ fontSize: "0.75rem", color: "rgba(245,242,237,0.75)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.95)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,242,237,0.75)"; }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[0.58rem] font-medium"
                  style={{ color: "rgba(245,242,237,0.4)" }}
                >
                  R {product.price}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {isFiltering && !hasResults && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-5"
            style={{
              opacity:    open ? 1 : 0,
              transition: `opacity 400ms ${EASE} 180ms`,
            }}
          >
            {/* Ghost query text */}
            <p
              className="font-display font-bold select-none text-center leading-none"
              style={{
                fontSize:      "clamp(3rem, 10vw, 7rem)",
                letterSpacing: "-0.03em",
                color:         "rgba(245,242,237,0.05)",
              }}
              aria-hidden="true"
            >
              {query}
            </p>
            <p
              className="text-[0.65rem] tracking-[0.35em] uppercase font-light"
              style={{ color: "rgba(245,242,237,0.2)" }}
            >
              No results found
            </p>
            <p
              className="text-[0.6rem] font-light tracking-wide"
              style={{ color: "rgba(245,242,237,0.12)" }}
            >
              Try a different term
            </p>
            <div className="flex items-center gap-6 mt-2">
              {["Pistachio", "Lotus", "Hazelnut"].map((hint) => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint)}
                  className="text-[0.58rem] tracking-[0.2em] uppercase font-light
                             bg-transparent border-none transition-colors duration-200"
                  style={{ color: "rgba(198,165,107,0.35)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(198,165,107,0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(198,165,107,0.35)"; }}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom strip — quick-pick hints ── */}
      <div
        className="flex-shrink-0 px-8 md:px-14 py-4 flex items-center justify-between"
        style={{
          borderTop:     "0.5px solid rgba(245,242,237,0.05)",
          opacity:       open ? 1 : 0,
          transition:    `opacity 400ms ${EASE} 280ms`,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="text-[0.52rem] tracking-[0.25em] uppercase font-light mr-3"
            style={{ color: "rgba(245,242,237,0.14)" }}
          >
            Quick search
          </span>
          {["Pistachio", "Lotus", "Hazelnut", "Angel Hair", "Kunafa"].map((hint) => (
            <button
              key={hint}
              onClick={() => setQuery(hint)}
              className="text-[0.55rem] tracking-[0.15em] uppercase font-light
                         bg-transparent border-none transition-all duration-200
                         px-2.5 py-1"
              style={{
                color:        "rgba(245,242,237,0.22)",
                border:       "0.5px solid rgba(245,242,237,0.08)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color  = "rgba(245,242,237,0.6)";
                el.style.border = "0.5px solid rgba(198,165,107,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color  = "rgba(245,242,237,0.22)";
                el.style.border = "0.5px solid rgba(245,242,237,0.08)";
              }}
            >
              {hint}
            </button>
          ))}
        </div>
        <span
          className="text-[0.52rem] tracking-[0.25em] uppercase font-light hidden md:block"
          style={{ color: "rgba(245,242,237,0.1)" }}
        >
          {products.length} products
        </span>
      </div>
    </div>
  );
}

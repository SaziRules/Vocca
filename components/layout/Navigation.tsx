"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchModal from "@/components/ui/SearchModal";

const navLinks = [
  { label: "Collection", href: "#collection" },
  { label: "Story",      href: "#story"      },
  { label: "Gift",       href: "#gifting"    },
  { label: "Atelier",    href: "#atelier"    },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Navigation() {
  const [scrolled,      setScrolled]      = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navRef        = useRef<HTMLElement>(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      const delta   = current - lastScrollRef.current;

      setScrolled(current > 80);

      if (current < 60) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
      }

      lastScrollRef.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navBg     = scrolled ? "rgba(10,10,10,0.75)"              : "rgba(10,10,10,0.45)";
  const navBlur   = hidden   ? "blur(20px)" : scrolled            ? "blur(20px)" : "blur(16px)";
  const navBorder = scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.06)";

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-5 px-8 md:px-12"
        style={{
          background:           navBg,
          backdropFilter:       navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom:         navBorder,
          transform:            hidden ? "translateY(-110%) scale(0.98)" : "translateY(0) scale(1)",
          opacity:              hidden ? 0 : 1,
          transition:           `transform 650ms ${EASE}, opacity 650ms ${EASE}, background 500ms ease, backdrop-filter 500ms ease`,
        }}
      >
        <nav
          className="flex items-center justify-between max-w-[1440px] mx-auto"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="no-underline" aria-label="VOCCA Home">
            <Image
              src="/images/logo.webp"
              alt="VOCCA"
              width={110}
              height={36}
              className="object-contain w-auto"
              style={{ height: "2rem" }}
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-10 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[0.62rem] font-light tracking-[0.28em] uppercase
                    no-underline transition-colors duration-300
                    ${activeSection === link.href
                      ? "text-parchment"
                      : "text-parchment/40 hover:text-parchment/80"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-0 bg-transparent border-none text-parchment/55
                         hover:text-parchment hover:scale-105 transition-all duration-300"
              style={{ lineHeight: 0 }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              aria-label="Account"
              className="p-0 bg-transparent border-none text-parchment/55
                         hover:text-parchment hover:scale-105 transition-all duration-300"
              style={{ lineHeight: 0 }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </button>

            <button
              aria-label="Cart"
              className="p-0 bg-transparent border-none text-parchment/55
                         hover:text-parchment hover:scale-105 transition-all duration-300"
              style={{ lineHeight: 0 }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>

            <Link href="#collection" className="btn-dark">
              Shop Now
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block h-px bg-parchment"
              style={{
                width:      "22px",
                transform:  menuOpen ? "translateY(5px) rotate(45deg)" : "none",
                transition: `transform 500ms ${EASE}`,
              }}
            />
            <span
              className="block h-px bg-parchment/40"
              style={{
                width:      "14px",
                opacity:    menuOpen ? 0 : 1,
                transition: `opacity 500ms ${EASE}`,
              }}
            />
            <span
              className="block h-px bg-parchment"
              style={{
                width:      "22px",
                transform:  menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
                transition: `transform 500ms ${EASE}`,
              }}
            />
          </button>
        </nav>
      </header>

      <div
        className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center"
        style={{
          opacity:             menuOpen ? 1 : 0,
          pointerEvents:       menuOpen ? "auto" : "none",
          backdropFilter:      menuOpen ? "blur(2px)" : "blur(0px)",
          transition:          `opacity 500ms ${EASE}`,
        }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-9">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline"
            >
              <span
                style={{
                  fontFamily:    "var(--font-playfair)",
                  fontSize:      "clamp(1.6rem, 5vw, 2.2rem)",
                  fontWeight:    400,
                  letterSpacing: "0.05em",
                  display:       "block",
                  opacity:       menuOpen ? 1 : 0,
                  transform:     menuOpen ? "translateY(0)" : "translateY(20px)",
                  filter:        menuOpen ? "blur(0px)" : "blur(6px)",
                  transition:    `opacity 600ms ${EASE} ${i * 80}ms,
                                  transform 600ms ${EASE} ${i * 80}ms,
                                  filter 600ms ${EASE} ${i * 80}ms`,
                  color: "rgba(245,242,237,0.75)",
                }}
                className="hover:text-parchment transition-colors duration-300"
              >
                {link.label}
              </span>
            </Link>
          ))}

          <div
            style={{
              opacity:    menuOpen ? 1 : 0,
              transform:  menuOpen ? "translateY(0)" : "translateY(20px)",
              filter:     menuOpen ? "blur(0px)" : "blur(6px)",
              transition: `opacity 600ms ${EASE} ${navLinks.length * 80 + 60}ms,
                           transform 600ms ${EASE} ${navLinks.length * 80 + 60}ms,
                           filter 600ms ${EASE} ${navLinks.length * 80 + 60}ms`,
            }}
          >
            <Link
              href="#collection"
              onClick={() => setMenuOpen(false)}
              className="btn-dark mt-4 inline-flex"
            >
              Shop Collection
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-10 flex items-center gap-8">
          {["Instagram", "Facebook", "TikTok"].map((s, i) => (
            <a
              key={s}
              href="#"
              style={{
                opacity:    menuOpen ? 1 : 0,
                transition: `opacity 600ms ${EASE} ${navLinks.length * 80 + 120 + i * 60}ms`,
              }}
              className="text-[0.58rem] tracking-[0.25em] uppercase text-parchment/25
                         hover:text-parchment/60 transition-colors duration-300 no-underline"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
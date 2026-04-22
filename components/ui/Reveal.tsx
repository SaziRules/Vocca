"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "up" | "fade" | "left" | "right";
  delay?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = "",
  animation = "up",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass = `reveal-${animation}`;
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : undefined;

  // Cast to avoid TypeScript complexity with dynamic tags
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`${animClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </Component>
  );
}

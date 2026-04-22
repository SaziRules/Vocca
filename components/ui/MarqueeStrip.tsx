interface MarqueeStripProps {
  theme?: "dark" | "light";
  items?: string[];
}

const defaultItems = [
  "Handcrafted in Small Batches",
  "Dubai-Inspired",
  "South African Made",
  "Luxury for Everyone",
  "Gifted with Intention",
  "The Art of Indulgence",
];

export default function MarqueeStrip({
  theme = "dark",
  items = defaultItems,
}: MarqueeStripProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`relative overflow-hidden py-4 border-y
        ${isDark
          ? "bg-void border-gold/15"
          : "bg-parchment border-void/10"
        }`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className={`text-[0.65rem] tracking-[0.35em] uppercase font-light mx-6
                ${isDark ? "text-parchment/30" : "text-void/30"}`}
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {item}
            </span>
            <span
              className={`text-[0.4rem] mx-2
                ${isDark ? "text-gold/50" : "text-gold/60"}`}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

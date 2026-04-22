"use client";

interface AddToCartButtonProps {
  accentColor: string;
  accentColorLight: string;
}

export default function AddToCartButton({ accentColor, accentColorLight }: AddToCartButtonProps) {
  return (
    <button
      className="flex-1 py-3.5 text-[0.65rem] tracking-[0.25em] uppercase
                 font-medium transition-all duration-400 ease-luxury"
      style={{ background: accentColor, color: "#0E0E0E" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = accentColorLight;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = accentColor;
      }}
    >
      Add to Cart
    </button>
  );
}

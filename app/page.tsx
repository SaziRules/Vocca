import HeroSection            from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import ProductStoriesSection   from "@/components/sections/ProductStoriesSection";
import ShopGridSection         from "@/components/sections/ShopGridSection";
import NewsletterSection       from "@/components/sections/NewsletterSection";
import TheBreakSection         from "@/components/sections/TheBreakSection";
import GiftingSection          from "@/components/sections/GiftingSection";
import AtelierSection          from "@/components/sections/AtelierSection";
import InstagramSection        from "@/components/sections/InstagramSection";

export default function HomePage() {
  return (
    <>
      {/* ─── DARK ─── */}
      <HeroSection />

      {/* ─── LIGHT ─── */}
      <div className="bg-parchment">
        <FeaturedProductsSection />
        <ProductStoriesSection />
        <ShopGridSection />
        <NewsletterSection />
      </div>

      {/* ─── DARK ─── */}
      <div className="bg-void">
        <GiftingSection />
        <AtelierSection />
        <InstagramSection />
      </div>
    </>
  );
}


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Shop — VOCCA Luxury Chocolate",
  description: "Browse the full VOCCA collection. Dubai-inspired artisan chocolate bars handcrafted in South Africa.",
};

const filters = ["All", "Signature", "Limited", "Heritage", "Gift Sets"];

export default function ShopPage() {
  return (
    <>
      {/* Page hero */}
      <div className="bg-void pt-36 pb-20 border-b border-gold/10">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <Reveal animation="up">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-3">
              The Collection
            </p>
            <h1 className="text-display-lg font-display font-bold text-parchment">
              All Products
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Shop layout */}
      <div className="bg-parchment min-h-screen">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-16">
          {/* Filter bar */}
          <Reveal animation="up">
            <div className="flex items-center gap-6 mb-12 pb-6 border-b border-void/10 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`text-[0.65rem] tracking-[0.2em] uppercase whitespace-nowrap
                    transition-colors duration-300 pb-1
                    ${f === "All"
                      ? "text-void border-b border-void"
                      : "text-ash hover:text-void"
                    }`}
                >
                  {f}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-3 flex-shrink-0">
                <span className="text-[0.65rem] tracking-[0.15em] uppercase text-ash">Sort:</span>
                <select className="text-[0.65rem] tracking-[0.1em] bg-transparent border-b
                                   border-void/20 text-void pb-1 outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </Reveal>

          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, i) => (
              <Reveal key={product.id} animation="up" delay={i * 80}>
                <article className="group" data-cursor="product">
                  <Link href={`/products/${product.slug}`} className="block no-underline">
                    <div className="relative aspect-[3/4] overflow-hidden bg-pearl mb-5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxury
                                   group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.07]
                                   transition-opacity duration-600"
                        style={{ backgroundColor: product.accentColor }}
                      />
                      {product.isNew && (
                        <div
                          className="absolute top-3 right-3 text-[0.55rem] tracking-[0.2em]
                                     uppercase px-2.5 py-1"
                          style={{ background: product.accentColor, color: "#0E0E0E" }}
                        >
                          New
                        </div>
                      )}
                    </div>

                    <div
                      className="w-6 h-px mb-2.5 transition-all duration-400 group-hover:w-10"
                      style={{ backgroundColor: product.accentColor }}
                    />
                    <h2 className="text-void font-display font-bold text-lg mb-1">
                      {product.name}
                    </h2>
                    <p className="text-[0.7rem] font-light text-ash mb-3">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-void">R {product.price}</p>
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase text-gold/80">
                        {product.weight}
                      </span>
                    </div>
                  </Link>

                  <button
                    className="w-full mt-4 py-3 text-[0.65rem] tracking-[0.2em] uppercase
                               border border-void/20 text-void/60 font-light
                               hover:bg-void hover:text-parchment hover:border-void
                               transition-all duration-400 ease-luxury"
                  >
                    Add to Cart
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

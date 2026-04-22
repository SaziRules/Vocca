import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import AddToCartButton from "@/components/ui/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not Found" };

  return {
    title:       `${product.name} — VOCCA Luxury Chocolate`,
    description: product.shortDesc,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title:       `${product.name} — VOCCA`,
      description: product.shortDesc,
      url:         `/products/${product.slug}`,
      type:        "website" as const,
      images: [
        {
          url:    product.image,
          width:  800,
          height: 1000,
          alt:    `${product.name} by VOCCA`,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       `${product.name} — VOCCA`,
      description: product.shortDesc,
      images:      [product.image],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type":    "Product",
    name:        product.name,
    description: product.description,
    image:       product.image,
    brand: {
      "@type": "Brand",
      name:    "VOCCA",
    },
    offers: {
      "@type":          "Offer",
      price:            product.price,
      priceCurrency:    product.currency,
      availability:     "https://schema.org/InStock",
      itemCondition:    "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* ── Hero Product Detail ── */}
      <section
        className="min-h-screen bg-void flex items-end pt-28 pb-20 overflow-hidden relative"
        aria-label={`${product.name} product detail`}
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={product.imageStory}
            alt=""
            fill
            priority
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/40 to-void" />
        </div>

        {/* Accent glow */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px]
                     rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${product.accentColor}, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Product image */}
            <Reveal animation="left" className="order-2 lg:order-1">
              <div
                className="relative mx-auto max-w-[480px]"
                data-cursor="product"
              >
                <div className="animate-float">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={600}
                    priority
                    className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                  />
                </div>

                {/* Accent border */}
                <div
                  className="absolute inset-0 border pointer-events-none"
                  style={{ borderColor: `${product.accentColor}20` }}
                  aria-hidden="true"
                />
              </div>
            </Reveal>

            {/* Product info */}
            <div className="order-1 lg:order-2">
              {/* Breadcrumb */}
              <Reveal animation="up">
                <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
                  <Link href="/"
                    className="text-[0.6rem] tracking-[0.2em] uppercase text-parchment/30
                               hover:text-gold transition-colors duration-300 no-underline">
                    Home
                  </Link>
                  <span className="text-parchment/20 text-xs">·</span>
                  <Link href="/#collection"
                    className="text-[0.6rem] tracking-[0.2em] uppercase text-parchment/30
                               hover:text-gold transition-colors duration-300 no-underline">
                    Collection
                  </Link>
                  <span className="text-parchment/20 text-xs">·</span>
                  <span className="text-[0.6rem] tracking-[0.2em] uppercase"
                    style={{ color: product.accentColor }}>
                    {product.name}
                  </span>
                </nav>
              </Reveal>

              {/* Category + new badge */}
              <Reveal animation="up" delay={50}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-[0.55rem] tracking-[0.3em] uppercase px-2.5 py-1.5 font-medium"
                    style={{ background: `${product.accentColor}22`, color: product.accentColor }}
                  >
                    {product.category}
                  </span>
                  {product.isNew && (
                    <span
                      className="text-[0.55rem] tracking-[0.25em] uppercase px-2.5 py-1.5 font-medium"
                      style={{ background: product.accentColor, color: "#0E0E0E" }}
                    >
                      New
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Name */}
              <Reveal animation="up" delay={100}>
                <h1 className="text-display-xl font-display font-bold text-parchment mb-2">
                  {product.name}
                </h1>
                <p className="text-base font-light tracking-[0.08em] mb-6"
                   style={{ color: product.accentColor }}>
                  {product.subtitle}
                </p>
              </Reveal>

              {/* Description */}
              <Reveal animation="up" delay={200}>
                <p className="text-[0.8rem] font-light tracking-wide text-parchment/50 leading-loose mb-8">
                  {product.description}
                </p>
              </Reveal>

              {/* Flavour tags */}
              <Reveal animation="up" delay={250}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.flavourProfile.map((f) => (
                    <span
                      key={f}
                      className="text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 border font-light"
                      style={{ borderColor: `${product.accentColor}35`, color: product.accentColor }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Price + weight */}
              <Reveal animation="up" delay={300}>
                <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-parchment/10">
                  <p className="text-3xl font-display font-bold text-parchment">
                    R {product.price}
                  </p>
                  <p className="text-[0.7rem] font-light text-parchment/40 tracking-wide">
                    {product.weight} · Belgian Chocolate
                  </p>
                </div>
              </Reveal>

              {/* Add to cart */}
              <Reveal animation="up" delay={350}>
                <div className="flex items-center gap-4 mb-10">
                  {/* Qty selector */}
                  <div className="flex items-center border border-parchment/20">
                    <button className="w-10 h-12 text-parchment/50 hover:text-parchment
                                       hover:bg-parchment/5 transition-colors duration-200
                                       text-lg font-light">
                      −
                    </button>
                    <span className="w-10 h-12 flex items-center justify-center
                                     text-[0.8rem] text-parchment border-x border-parchment/20">
                      1
                    </span>
                    <button className="w-10 h-12 text-parchment/50 hover:text-parchment
                                       hover:bg-parchment/5 transition-colors duration-200
                                       text-lg font-light">
                      +
                    </button>
                  </div>

                  <AddToCartButton
                    accentColor={product.accentColor}
                    accentColorLight={product.accentColorLight}
                  />

                  <button
                    className="w-12 h-12 border border-parchment/20 flex items-center
                               justify-center hover:border-gold/50 transition-colors duration-300"
                    aria-label="Save to wishlist"
                  >
                    <svg
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="1"
                      className="text-parchment/40"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </Reveal>

              {/* Ingredients */}
              <Reveal animation="up" delay={400}>
                <details className="group border-t border-parchment/10 pt-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-[0.65rem] tracking-[0.25em] uppercase text-parchment/50
                                     group-hover:text-parchment transition-colors duration-300">
                      Ingredients
                    </span>
                    <span className="text-parchment/30 text-lg font-light group-open:rotate-45
                                     transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <ul className="mt-4 flex flex-wrap gap-2 list-none">
                    {product.ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="text-[0.65rem] tracking-wide text-parchment/35 font-light
                                   bg-parchment/5 px-3 py-1.5"
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </details>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      <section
        className="bg-parchment py-24"
        aria-labelledby="related-heading"
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <Reveal animation="up">
            <h2 id="related-heading"
                className="text-display-md font-display font-bold text-void mb-12">
              You may also love
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {related.map((rel, i) => (
              <Reveal key={rel.id} animation="up" delay={i * 100}>
                <Link
                  href={`/products/${rel.slug}`}
                  className="group block no-underline"
                  data-cursor="product"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-pearl mb-4">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-luxury
                                 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.07]
                                 transition-opacity duration-600"
                      style={{ backgroundColor: rel.accentColor }}
                    />
                  </div>
                  <div
                    className="w-6 h-px mb-2 transition-all duration-400 group-hover:w-10"
                    style={{ backgroundColor: rel.accentColor }}
                  />
                  <h3 className="text-void font-display font-bold text-lg mb-1">
                    {rel.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[0.7rem] font-light text-ash">{rel.subtitle}</p>
                    <p className="text-sm font-medium text-void">R {rel.price}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

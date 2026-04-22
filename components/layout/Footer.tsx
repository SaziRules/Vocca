import Link from "next/link";

const shopLinks    = ["The Collection", "Gift Sets", "Corporate Orders", "Limited Editions", "Seasonal"];
const companyLinks = ["Our Story", "The Atelier", "Press", "Journal", "Stockists"];
const supportLinks = ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQ", "Track Order"];

export default function Footer() {
  return (
    <footer className="bg-[#080402] border-t border-parchment/[0.06]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pt-20 pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="no-underline block mb-6">
              <span
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-lg font-semibold tracking-[0.22em] text-parchment"
              >
                VOCCA
              </span>
            </Link>
            <p className="text-[0.72rem] font-light leading-[1.85] text-parchment/30
                          max-w-[240px] tracking-wide">
              Dubai-inspired luxury chocolate. Handcrafted in South Africa. A ritual, not a treat.
            </p>

            {/* Socials */}
            <div className="flex gap-5 mt-8">
              {["IG", "FB", "TK", "WA"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[0.62rem] tracking-[0.2em] font-light text-parchment/22
                             hover:text-parchment/60 transition-colors duration-300 no-underline"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[0.58rem] tracking-[0.35em] uppercase text-parchment/40
                          font-light mb-6">
              Shop
            </p>
            <ul className="space-y-3.5 list-none">
              {shopLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[0.72rem] font-light tracking-wide text-parchment/28
                               hover:text-parchment/60 transition-colors duration-300 no-underline"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[0.58rem] tracking-[0.35em] uppercase text-parchment/40
                          font-light mb-6">
              Company
            </p>
            <ul className="space-y-3.5 list-none">
              {companyLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[0.72rem] font-light tracking-wide text-parchment/28
                               hover:text-parchment/60 transition-colors duration-300 no-underline"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[0.58rem] tracking-[0.35em] uppercase text-parchment/40
                          font-light mb-6">
              Support
            </p>
            <ul className="space-y-3.5 list-none">
              {supportLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[0.72rem] font-light tracking-wide text-parchment/28
                               hover:text-parchment/60 transition-colors duration-300 no-underline"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row — plain border, no gradient */}
        <div className="border-t border-parchment/[0.06] pt-8
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.58rem] tracking-[0.12em] text-parchment/18">
            © {new Date().getFullYear()} VOCCA. All rights reserved. Durban, South Africa.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[0.58rem] tracking-[0.1em] text-parchment/18
                           hover:text-parchment/45 transition-colors duration-300 no-underline"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


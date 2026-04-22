import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-8">
      <div className="text-center max-w-[480px]">
        <p
          className="text-[10rem] font-display font-bold leading-none select-none
                     opacity-[0.04] text-gold"
          aria-hidden="true"
        >
          404
        </p>
        <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold -mt-8 mb-6">
          Page Not Found
        </p>
        <h1 className="text-display-md font-display font-bold text-parchment mb-6">
          This bar has sold out.
        </h1>
        <p className="text-[0.8rem] font-light tracking-wide text-parchment/40 leading-loose mb-10">
          The page you're looking for doesn't exist — but our collection is very much available.
        </p>
        <Link href="/" className="btn-dark">
          Return Home
        </Link>
      </div>
    </div>
  );
}

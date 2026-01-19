import ComingSoonHero from "@/components/Comingsoonhero";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#2b2b2b] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/chocolate.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_80%,rgba(0,0,0,0.9)_100%)]"></div>

      {/* Coming Soon Text */}
      <ComingSoonHero />
    </div>
  );
}
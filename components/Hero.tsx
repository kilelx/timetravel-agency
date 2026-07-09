import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/paris/hero.jpeg"
      >
        <source src="/media/paris/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 flex flex-col justify-center">
        <div className="max-w-2xl fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-soft">
            Voyages temporels d&apos;exception
          </p>
          <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95] text-balance">
            Le temps,
            <br />
            <span className="italic text-gold">votre destination.</span>
          </h1>
          <p className="mt-8 text-lg text-foreground/80 max-w-xl leading-relaxed">
            Trois époques d&apos;exception, un service de conciergerie hors du
            temps. Choisissez votre siècle — nous nous occupons du reste.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton href="/destinations">Découvrir les destinations</CTAButton>
            <CTAButton href="/#agence" variant="ghost">
              L&apos;Agence
            </CTAButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted text-xs uppercase tracking-[0.3em]">
        Défiler
      </div>
    </section>
  );
}

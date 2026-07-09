import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import CTAButton from "@/components/CTAButton";
import { destinations } from "@/lib/destinations";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Présentation agence */}
      <section id="agence" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              L&apos;Agence
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-tight">
              Une conciergerie
              <span className="italic text-gold"> hors du temps</span>.
            </h2>
            <p className="mt-8 text-lg text-foreground/75 leading-relaxed">
              Fondée dans un futur que nous préférons taire, TimeTravel Agency
              orchestre des voyages temporels d&apos;un raffinement absolu. Nos
              agents temporels sélectionnent chaque époque, sécurisent chaque
              instant et veillent à ce que votre passage dans l&apos;Histoire
              soit aussi discret qu&apos;inoubliable.
            </p>
            <p className="mt-4 text-lg text-foreground/75 leading-relaxed">
              Trois destinations. Un service sur mesure. Aucune trace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { k: "3", v: "Époques d'exception" },
              { k: "∞", v: "Souvenirs" },
              { k: "0", v: "Paradoxe garanti" },
              { k: "24/7", v: "Conciergerie temporelle" },
              { k: "100%", v: "Sur mesure" },
              { k: "1", v: "Vie à sublimer" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-border bg-surface p-6 text-center"
              >
                <div className="font-display text-3xl text-gold">{s.k}</div>
                <div className="mt-2 text-xs text-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aperçu destinations */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:pb-40">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              Destinations
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">
              Choisissez votre siècle
            </h2>
          </div>
          <CTAButton href="/destinations" variant="ghost">
            Toutes les destinations
          </CTAButton>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Le passé n&apos;attend que <span className="italic text-gold">vous</span>.
          </h2>
          <p className="mt-6 text-lg text-foreground/75">
            Réservez une consultation privée avec l&apos;un de nos agents
            temporels.
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButton href="/destinations">Commencer le voyage</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

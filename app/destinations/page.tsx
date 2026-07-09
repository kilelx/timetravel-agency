import type { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations — TimeTravel Agency",
  description:
    "Trois destinations temporelles exclusives : Paris 1889, le Crétacé, et la Florence de la Renaissance.",
};

export default function DestinationsPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
          Nos destinations
        </p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-tight">
          Trois époques,
          <br />
          <span className="italic text-gold">une seule agence.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-foreground/75 leading-relaxed">
          Chaque voyage est une pièce unique, orchestrée du départ au retour par
          nos agents temporels. Sélectionnez l&apos;époque qui vous appelle.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 md:pb-40">
        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </section>
    </div>
  );
}

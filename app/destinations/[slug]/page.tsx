import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import { destinations, getDestination } from "@/lib/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Destination introuvable — TimeTravel Agency" };
  return {
    title: `${dest.name} — TimeTravel Agency`,
    description: dest.short,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const others = destinations.filter((d) => d.slug !== dest.slug);

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={dest.media.hero}
          alt={dest.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/50" />

        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 flex flex-col justify-end pb-20">
          <div className="fade-up max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              {dest.emoji} {dest.era} · {dest.year}
            </p>
            <h1 className="mt-5 font-display text-6xl md:text-8xl leading-[0.95]">
              {dest.name}
            </h1>
            <p className="mt-6 text-xl text-foreground/85 max-w-2xl">
              {dest.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Corps */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Le voyage</h2>
            <div className="mt-4 gold-rule max-w-[120px]" />
            <p className="mt-8 text-lg text-foreground/80 leading-relaxed">
              {dest.description}
            </p>

            <h3 className="mt-16 font-display text-2xl md:text-3xl">
              Temps forts
            </h3>
            <div className="mt-8 space-y-6">
              {dest.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="flex gap-5 rounded-xl border border-border bg-surface p-6"
                >
                  <span className="font-display text-3xl text-gold leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-display text-xl">{h.title}</h4>
                    <p className="mt-2 text-foreground/70">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aside pratique */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-8">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src={dest.media.portrait}
                alt={dest.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold-soft">
                Informations
              </h3>
              <dl className="mt-6 space-y-4">
                {dest.practical.map((p) => (
                  <div
                    key={p.label}
                    className="flex justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted">{p.label}</dt>
                    <dd className="text-right">{p.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <CTAButton href="/destinations" className="w-full">
                  Réserver ce voyage
                </CTAButton>
                <p className="mt-4 text-center text-xs text-muted">
                  Sur consultation privée uniquement
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Autres destinations */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl">
            Autres époques
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/destinations/${o.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border h-64"
              >
                <Image
                  src={o.media.square}
                  alt={o.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">
                    {o.emoji} {o.year}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{o.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

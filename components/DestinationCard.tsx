import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/lib/destinations";

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={dest.media.square}
          alt={dest.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">
          {dest.emoji} {dest.era} · {dest.year}
        </p>
        <h3 className="mt-2 font-display text-3xl">{dest.name}</h3>
        <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
          {dest.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Explorer →
        </span>
      </div>
    </Link>
  );
}

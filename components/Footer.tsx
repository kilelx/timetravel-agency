import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-gold text-lg leading-none">✦</span>
              <span className="font-display text-xl tracking-wide">
                TimeTravel <span className="text-gold">Agency</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted max-w-xs">
              Voyages temporels d&apos;exception depuis un futur discret. Chaque
              époque, une œuvre d&apos;art.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-soft">
              Destinations
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/destinations/paris-1889" className="hover:text-foreground transition-colors">
                  Paris 1889
                </Link>
              </li>
              <li>
                <Link href="/destinations/cretace" className="hover:text-foreground transition-colors">
                  Crétacé
                </Link>
              </li>
              <li>
                <Link href="/destinations/florence-1504" className="hover:text-foreground transition-colors">
                  Florence 1504
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-soft">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>conciergerie@timetravel.agency</li>
              <li>+33 (1889) 00 00 00</li>
              <li>Sur rendez-vous uniquement</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 gold-rule" />
        <p className="mt-6 text-xs text-muted/70">
          © {new Date().getFullYear()} TimeTravel Agency — Tous droits réservés à
          travers toutes les lignes temporelles.
        </p>
      </div>
    </footer>
  );
}

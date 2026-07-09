import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-gold text-lg leading-none">✦</span>
          <span className="font-display text-xl tracking-wide">
            TimeTravel
            <span className="text-gold"> Agency</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <Link
            href="/destinations"
            className="hover:text-foreground transition-colors"
          >
            Destinations
          </Link>
          <Link href="/#agence" className="hover:text-foreground transition-colors">
            L&apos;Agence
          </Link>
        </nav>

        <Link
          href="/destinations"
          className="text-xs uppercase tracking-[0.2em] border border-gold/40 text-gold-soft px-5 py-2.5 rounded-full hover:bg-gold hover:text-background transition-all"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}

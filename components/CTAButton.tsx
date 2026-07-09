import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-gold text-background hover:bg-gold-soft"
      : "border border-gold/40 text-gold-soft hover:bg-gold hover:text-background";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

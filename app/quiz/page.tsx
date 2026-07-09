"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations, getDestination } from "@/lib/destinations";

type Slug = (typeof destinations)[number]["slug"];

type Option = { label: string; slug: Slug };
type Question = { id: string; prompt: string; options: Option[] };

const questions: Question[] = [
  {
    id: "experience",
    prompt: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", slug: "paris-1889" },
      { label: "Aventure et nature", slug: "cretace" },
      { label: "Élégance et raffinement", slug: "florence-1504" },
    ],
  },
  {
    id: "periode",
    prompt: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne (XIXe–XXe siècle)", slug: "paris-1889" },
      { label: "Temps anciens et origines", slug: "cretace" },
      { label: "Renaissance et classicisme", slug: "florence-1504" },
    ],
  },
  {
    id: "cadre",
    prompt: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", slug: "paris-1889" },
      { label: "La nature sauvage", slug: "cretace" },
      { label: "L'art et l'architecture", slug: "florence-1504" },
    ],
  },
  {
    id: "activite",
    prompt: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", slug: "paris-1889" },
      { label: "Observer la faune", slug: "cretace" },
      { label: "Explorer des musées", slug: "florence-1504" },
    ],
  },
  {
    id: "frisson",
    prompt: "Ce qui vous ferait vraiment vibrer :",
    options: [
      { label: "L'Histoire en train de s'écrire", slug: "paris-1889" },
      { label: "Le vertige du temps profond", slug: "cretace" },
      { label: "La beauté à l'état pur", slug: "florence-1504" },
    ],
  },
  {
    id: "rythme",
    prompt: "Votre rythme de voyage :",
    options: [
      { label: "Flâner, savourer, se laisser porter", slug: "paris-1889" },
      { label: "L'adrénaline et l'imprévu", slug: "cretace" },
      { label: "La contemplation et le détail", slug: "florence-1504" },
    ],
  },
];

const reasons: Record<Slug, string> = {
  "paris-1889":
    "Votre goût pour la culture, l'effervescence urbaine et l'Histoire en train de s'écrire vous destine au Paris de 1889. La Belle Époque vous attend : lumières, cabarets et l'inauguration de la Tour Eiffel.",
  cretace:
    "Votre soif d'aventure, de nature sauvage et de sensations fortes vous mène au Crétacé. Aux origines du vivant, face aux derniers grands dinosaures, vous vivrez le voyage le plus vertigineux jamais conçu.",
  "florence-1504":
    "Votre sens de l'élégance, de l'art et du raffinement vous conduit à la Florence de 1504. Au cœur de la Renaissance, entre Michel-Ange et Léonard de Vinci, vous côtoierez le génie à l'état pur.",
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, Slug>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const answered = Object.keys(answers).length;

  const result = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const slug of Object.values(answers)) {
      tally[slug] = (tally[slug] ?? 0) + 1;
    }
    // Ordre des destinations = départage des égalités.
    let best: Slug = destinations[0].slug;
    let bestScore = -1;
    for (const d of destinations) {
      const score = tally[d.slug] ?? 0;
      if (score > bestScore) {
        best = d.slug;
        bestScore = score;
      }
    }
    return getDestination(best)!;
  }, [answers]);

  function choose(slug: Slug) {
    const q = questions[step];
    const next = { ...answers, [q.id]: slug };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="pt-32">
        <section className="mx-auto max-w-3xl px-6 py-16 text-center fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Votre destination
          </p>
          <div className="mt-8 text-6xl">{result.emoji}</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl leading-tight">
            {result.name}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
            {result.era} — {result.year}
          </p>

          <div className="gold-rule mx-auto my-10 w-40" />

          <p className="mx-auto max-w-2xl text-lg text-foreground/80 leading-relaxed">
            {reasons[result.slug]}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-foreground/60 leading-relaxed">
            {result.short}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/destinations/${result.slug}`}
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 bg-gold text-background hover:bg-gold-soft"
            >
              Découvrir ce voyage
            </Link>
            <button
              onClick={restart}
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 border border-gold/40 text-gold-soft hover:bg-gold hover:text-background"
            >
              Refaire le quiz
            </button>
          </div>
        </section>
      </div>
    );
  }

  const q = questions[step];
  const progress = Math.round((step / total) * 100);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Trouvez votre époque
          </p>
          <h1 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
            Le quiz du <span className="italic text-gold">voyageur</span>
          </h1>
        </div>

        {/* Progression */}
        <div className="mt-12">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
            <span>
              Question {step + 1} / {total}
            </span>
            <span>{answered} répondues</span>
          </div>
          <div className="mt-3 h-px w-full bg-border">
            <div
              className="h-px bg-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div key={q.id} className="mt-12 fade-up">
          <h2 className="font-display text-2xl md:text-3xl leading-snug">
            {q.prompt}
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {q.options.map((opt) => {
              const active = answers[q.id] === opt.slug;
              return (
                <button
                  key={opt.label}
                  onClick={() => choose(opt.slug)}
                  className={`group w-full text-left rounded-2xl border px-6 py-5 transition-all duration-300 ${
                    active
                      ? "border-gold bg-surface-2"
                      : "border-border bg-surface hover:border-gold/50 hover:bg-surface-2"
                  }`}
                >
                  <span className="text-lg text-foreground/90 group-hover:text-foreground">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-10 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
          >
            ← Précédent
          </button>
        )}
      </section>
    </div>
  );
}

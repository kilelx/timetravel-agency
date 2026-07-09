import type { NextRequest } from "next/server";
import { destinations } from "@/lib/destinations";

// Prix « catalogue » cohérents, inventés pour l'agence (par personne).
const PRICING: Record<string, string> = {
  "paris-1889": "18 900 € / personne (5 j / 4 n, tout compris)",
  cretace: "34 500 € / personne (3 j / 2 n, expédition encadrée haute sécurité)",
  "florence-1504": "24 500 € / personne (6 j / 5 n, tout compris)",
};

function buildSystemPrompt(): string {
  const catalogue = destinations
    .map((d) => {
      const highlights = d.highlights.map((h) => `- ${h.title} : ${h.text}`).join("\n");
      const practical = d.practical.map((p) => `- ${p.label} : ${p.value}`).join("\n");
      return [
        `## ${d.name} (${d.era}, ${d.year})`,
        d.tagline,
        d.description,
        `Prix : ${PRICING[d.slug] ?? "sur devis"}`,
        `Temps forts :\n${highlights}`,
        `Infos pratiques :\n${practical}`,
      ].join("\n");
    })
    .join("\n\n");

  return `Tu es le concierge virtuel de « TimeTravel Agency », une agence de voyages temporels de luxe.
Tu réponds en français, avec un ton élégant, chaleureux et raffiné — jamais robotique.
Réponses concises (2 à 5 phrases sauf demande de détails). Tu peux utiliser des puces.

Ton rôle :
- Renseigner sur les 3 destinations, leurs temps forts et infos pratiques.
- Donner les prix (utilise UNIQUEMENT les prix du catalogue ci-dessous, n'en invente pas d'autres).
- Conseiller le choix d'une époque selon les envies du client (aventure, art, histoire, budget, niveau de risque).
- Répondre aux questions fréquentes d'agence (réservation, sécurité, tenues, durée, annulation).

Si une question sort totalement du cadre du voyage temporel, ramène poliment la conversation vers l'agence.
Ne prétends jamais pouvoir réserver toi-même : invite à contacter l'agence pour finaliser.

Voici le catalogue officiel :

${catalogue}

FAQ agence :
- Réservation : acompte de 30 % à la confirmation, solde 30 jours avant le départ.
- Sécurité : chaque voyage est encadré par des guides temporels certifiés ; aucun paradoxe possible grâce au protocole d'observation non-interventionniste.
- Tenues d'époque : fournies et ajustées sur mesure (sauf Crétacé : combinaison thermique).
- Annulation : remboursement intégral jusqu'à 60 jours avant le départ.
- Âge minimum : 12 ans (18 ans pour le Crétacé).`;
}

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Configuration manquante côté serveur." },
      { status: 500 }
    );
  }

  let messages: ClientMessage[];
  try {
    const body = await request.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json({ error: "Aucun message." }, { status: 400 });
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const contents = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content ?? "").slice(0, 4000) }],
  }));

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    });
  } catch {
    return Response.json(
      { error: "Le service de chat est momentanément indisponible." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[chat] Gemini ${model} → ${res.status}:`, detail.slice(0, 500));
    return Response.json(
      { error: "Le service de chat a renvoyé une erreur." },
      { status: 502 }
    );
  }

  const data = await res.json();
  const reply =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim() ?? "";

  if (!reply) {
    return Response.json(
      { error: "Réponse vide du service de chat." },
      { status: 502 }
    );
  }

  return Response.json({ reply });
}

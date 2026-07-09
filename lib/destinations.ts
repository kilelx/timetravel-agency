export type Destination = {
  slug: string;
  name: string;
  era: string;
  year: string;
  emoji: string;
  tagline: string;
  short: string;
  description: string;
  highlights: { title: string; text: string }[];
  practical: { label: string; value: string }[];
  media: {
    hero: string;
    square: string;
    portrait: string;
    video: string;
  };
};

export const destinations: Destination[] = [
  {
    slug: "paris-1889",
    name: "Paris 1889",
    era: "Belle Époque",
    year: "1889",
    emoji: "🗼",
    tagline: "Exposition Universelle & Belle Époque",
    short:
      "Assistez à l'inauguration de la Tour Eiffel au cœur d'un Paris en pleine effervescence artistique et industrielle.",
    description:
      "Plongez dans le Paris flamboyant de 1889, année de l'Exposition Universelle. La Tour Eiffel vient d'être achevée et domine un Champ-de-Mars illuminé de pavillons venus du monde entier. Flânez sur les grands boulevards haussmanniens, assistez à un cabaret naissant, croisez ingénieurs, artistes et aristocrates dans l'insouciance d'une époque qui se croyait éternelle.",
    highlights: [
      {
        title: "Inauguration de la Tour Eiffel",
        text: "Montez au sommet du monument le jour même de son ouverture au public.",
      },
      {
        title: "L'Exposition Universelle",
        text: "Parcourez la galerie des machines et les pavillons des nations.",
      },
      {
        title: "Cabarets & grands boulevards",
        text: "Une soirée dans le Paris nocturne de la Belle Époque, coupe de champagne à la main.",
      },
    ],
    practical: [
      { label: "Durée", value: "5 jours / 4 nuits" },
      { label: "Climat", value: "Printemps parisien, doux" },
      { label: "Tenue fournie", value: "Costume d'époque sur mesure" },
      { label: "Niveau de risque", value: "Faible" },
    ],
    media: {
      hero: "/media/paris/hero.jpeg",
      square: "/media/paris/square.jpeg",
      portrait: "/media/paris/portrait.png",
      video: "/media/paris/video.mp4",
    },
  },
  {
    slug: "cretace",
    name: "Crétacé",
    era: "Fin du Mésozoïque",
    year: "-65 M années",
    emoji: "🦕",
    tagline: "Les derniers jours des dinosaures",
    short:
      "Observez les colosses du Crétacé dans leur habitat, à l'aube de la grande extinction.",
    description:
      "Un saut de soixante-cinq millions d'années. Vous voici dans un monde luxuriant de forêts primitives et de plaines infinies, où règnent les derniers grands dinosaures. Depuis un poste d'observation blindé et discret, contemplez Tyrannosaures, Tricératops et ptérosaures géants. Une expédition d'exception, encadrée par nos guides paléo-naturalistes, aux tout derniers instants d'un âge légendaire.",
    highlights: [
      {
        title: "Safari primordial",
        text: "Approche encadrée des grands prédateurs depuis un véhicule furtif.",
      },
      {
        title: "Ciel de ptérosaures",
        text: "Assistez aux vols des reptiles ailés au crépuscule.",
      },
      {
        title: "Le dernier ciel",
        text: "Observation nocturne du firmament juste avant l'impact — sous haute sécurité.",
      },
    ],
    practical: [
      { label: "Durée", value: "3 jours / 2 nuits" },
      { label: "Climat", value: "Chaud et humide" },
      { label: "Équipement", value: "Combinaison thermique & abri blindé" },
      { label: "Niveau de risque", value: "Élevé — encadré" },
    ],
    media: {
      hero: "/media/cretace/hero.png",
      square: "/media/cretace/square.png",
      portrait: "/media/cretace/portrait.png",
      video: "/media/cretace/video.mp4",
    },
  },
  {
    slug: "florence-1504",
    name: "Florence 1504",
    era: "Renaissance",
    year: "1504",
    emoji: "🖼️",
    tagline: "L'âge d'or artistique",
    short:
      "Côtoyez Michel-Ange et Léonard de Vinci dans la Florence des Médicis, capitale mondiale de l'art.",
    description:
      "Florence, 1504. Le David de Michel-Ange vient d'être dévoilé, Léonard de Vinci peint et invente, les ateliers bruissent de génie. Sous le mécénat des Médicis, la cité toscane est le centre du monde. Déambulez dans les ruelles de pierre, visitez les ateliers des maîtres, dînez dans un palais Renaissance et assistez à la naissance des chefs-d'œuvre qui définiront l'Occident.",
    highlights: [
      {
        title: "Les ateliers des maîtres",
        text: "Rencontre privée dans l'atelier de Léonard de Vinci.",
      },
      {
        title: "Le David dévoilé",
        text: "Assistez à l'installation de la statue sur la Piazza della Signoria.",
      },
      {
        title: "Banquet chez les Médicis",
        text: "Un dîner d'apparat au palais, entre puissants et artistes.",
      },
    ],
    practical: [
      { label: "Durée", value: "6 jours / 5 nuits" },
      { label: "Climat", value: "Toscan, ensoleillé" },
      { label: "Tenue fournie", value: "Habits Renaissance sur mesure" },
      { label: "Niveau de risque", value: "Faible" },
    ],
    media: {
      hero: "/media/florence/hero.png",
      square: "/media/florence/square.png",
      portrait: "/media/florence/portrait.png",
      video: "/media/florence/video.mp4",
    },
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

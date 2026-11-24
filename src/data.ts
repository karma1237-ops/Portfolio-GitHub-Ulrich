// Contenu du portfolio : modifiez ici les projets, compétences et liens.

export interface Shot {
  /** Nom du fichier dans public/projets (sans extension) */
  img: string;
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  name: string;
  live: boolean;
  status: string;
  description: string;
  features: string[];
  tags: string[];
  liveUrl?: string;
  codeUrl: string;
  /** Visite animée : public/media/<id>.mp4 (+ .gif et -poster.jpg) */
  tourUrl: string;
  shots: Shot[];
}

export const CV = {
  driveId: '13ioMq2E1fnQwFXUmJlsbgFsVnuZIIwvx',
  get previewUrl(): string { return `https://drive.google.com/file/d/${this.driveId}/preview`; },
  get downloadUrl(): string { return `https://drive.google.com/uc?export=download&id=${this.driveId}`; },
};

export const PROJECTS: Project[] = [
  {
    id: 'biblio',
    name: 'Ma Bibliothèque',
    live: true,
    status: 'En ligne',
    description: "Application web de suivi de lecture : on ajoute ses livres, on se fixe un objectif et on suit son année de lecture.",
    features: [
      'Ajout de livres par titre et auteur, ou par scan',
      'Recherche parmi des millions de livres (Google Books)',
      'Fiche détaillée de chaque livre avec enregistrement',
      'Statistiques annuelles de lecture',
    ],
    tags: ['API Google Books', 'Vercel', 'Responsive'],
    liveUrl: 'https://ma-bibliotheque-en-ligne.vercel.app/',
    codeUrl: 'https://github.com/karma1237-ops',
    tourUrl: 'ma-bibliotheque-en-ligne.vercel.app',
    shots: [
      { img: 'biblio-1', url: 'ma-bibliotheque-en-ligne.vercel.app', caption: "Accueil – ajout d'un livre" },
      { img: 'biblio-2', url: 'ma-bibliotheque-en-ligne.vercel.app/search', caption: 'Fiche livre issue de Google Books' },
      { img: 'biblio-3', url: 'ma-bibliotheque-en-ligne.vercel.app/stats', caption: 'Statistiques de lecture' },
    ],
  },
  {
    id: 'autoloc',
    name: 'AutolocPro',
    live: false,
    status: 'Démo locale',
    description: 'Site de location de voitures haut de gamme, avec catalogue filtrable, fiches véhicules, panier et espace client.',
    features: [
      'Catalogue de 52 véhicules avec pagination',
      'Filtres carburant, transmission, disponibilité et tri',
      'Fiche véhicule : galerie, prix, avis clients',
      'Panier, favoris et connexion client',
    ],
    tags: ['PHP', 'MySQL', 'HTML / CSS', 'JavaScript'],
    codeUrl: 'https://github.com/karma1237-ops',
    tourUrl: 'localhost/projetsite2/accueil.php',
    shots: [
      { img: 'autoloc-1', url: 'localhost/projetsite2/accueil.php', caption: "Page d'accueil" },
      { img: 'autoloc-2', url: 'localhost/projetsite2/accueil.php', caption: 'Véhicules en vedette' },
      { img: 'autoloc-3', url: 'localhost/projetsite2/produitdescription.php', caption: 'Fiche véhicule – Audi RS7' },
    ],
  },
  {
    id: 'athletix',
    name: 'Athletix',
    live: false,
    status: 'Démo locale',
    description: "Boutique en ligne d'équipements de fitness et de musculation, livrés en 24 h.",
    features: [
      'Catégories et sélection de produits vedettes',
      'Catalogue avec recherche, filtres et tri',
      'Panier, inscription et connexion',
      'Interface sombre et typographie sportive',
    ],
    tags: ['Vite', 'JavaScript', 'E-commerce'],
    codeUrl: 'https://github.com/karma1237-ops/Athletix',
    tourUrl: 'localhost:5173',
    shots: [
      { img: 'athletix-1', url: 'localhost:5173', caption: 'Accueil' },
      { img: 'athletix-2', url: 'localhost:5173', caption: 'Catégories' },
      { img: 'athletix-3', url: 'localhost:5173/catalogue', caption: 'Catalogue et filtres' },
    ],
  },
];

export const EXPERTISE: [string, string, string][] = [
  ['FE', 'Frontend', 'Interfaces modernes et réactives en React.js et TypeScript : hooks, Context API, animations et performances.'],
  ['BE', 'Backend', 'APIs REST sécurisées en C# .NET et Node.js, architecture en couches, principes SOLID, JWT.'],
  ['MO', 'Mobile', 'Applications cross-platform en React Native et Expo : navigation, état global, APIs natives.'],
  ['DB', 'Bases de données', 'MySQL, SQL Server, MongoDB et Firebase : modélisation UML, migrations et optimisation.'],
  ['AG', 'Méthodes agiles', 'Scrum et Kanban au quotidien : sprints, user stories, backlog, revues de code.'],
  ['GIT', 'DevOps & versionning', 'Git Flow, GitHub, pipelines CI/CD et déploiement cloud.'],
];

export const SKILLS: [string, number][] = [
  ['React.js', 90], ['JavaScript', 88], ['TypeScript', 80], ['HTML5', 95], ['CSS3', 92], ['C# .NET', 85],
  ['Node.js', 80], ['PHP', 75], ['MySQL', 87], ['React Native', 88], ['Git', 90], ['Scrum', 82],
];

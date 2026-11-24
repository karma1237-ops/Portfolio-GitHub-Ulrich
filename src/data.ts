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
    description: "SPA de suivi de lecture, projet de Master mis en production : bibliothèque, statuts de lecture, notes, objectif annuel et bilan partageable en image.",
    features: [
      'React + Redux avec un middleware de synchronisation sur mesure',
      'Comptes avec confirmation par e-mail, PostgreSQL protégé par RLS (Supabase)',
      'Sécurité OWASP (CSP, en-têtes HTTP) et conformité RGPD sans cookie',
      'Déploiement continu GitHub → Vercel, SEO et Open Graph',
    ],
    tags: ['React', 'Redux', 'Supabase', 'API Google Books', 'Vercel'],
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
    description: "E-commerce d'équipements de fitness avec une architecture applicative complète (mars – juin 2026).",
    features: [
      'API Node.js / Express, données MySQL et MongoDB',
      'Authentification JWT, inscription et connexion',
      'Catalogue avec recherche, filtres, tri et panier',
      'Tests Jest + Supertest et intégration continue GitLab CI/CD',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'JWT', 'Jest'],
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
  ['BE', 'Backend & sécurité', 'APIs REST en Node.js/Express, PHP/Symfony et C# : JWT, Argon2, CSP, protection XSS, RGPD.'],
  ['IA', 'IA appliquée', 'Déploiement de LLM en local (Ollama, Mistral 7B) avec Docker et interface de chat sécurisée.'],
  ['DB', 'Data', 'MySQL, PostgreSQL (Supabase), MongoDB et Python ; certifié Microsoft Azure Data Fundamentals (DP-900).'],
  ['PM', 'Gestion de projet', 'Scrum, UML, Merise, rédaction de spécifications et pilotage de projet (Master Directeur de Projet).'],
  ['OPS', 'DevOps', 'Docker, GitLab CI/CD, Azure DevOps, déploiement continu sur Vercel.'],
];

export const SKILLS: [string, number][] = [
  ['React.js', 90], ['JavaScript', 88], ['TypeScript', 80], ['HTML5', 95], ['CSS3', 92], ['C# .NET', 85],
  ['Node.js', 80], ['PHP', 75], ['MySQL', 87], ['React Native', 88], ['Git', 90], ['Scrum', 82],
];

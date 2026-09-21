export interface EventData {
  title: string;
  subtitle: string;
  organizer: string;
  dates: string;
  time: string;
  location: string;
  venueName: string;
  city: string;
  targetDate: string; // for countdown
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  schedule: {
    time: string;
    title: string;
    description: string;
    speaker?: string;
  }[];
  passTypes: {
    id: 'free' | 'vip' | 'masterclass';
    name: string;
    price: number;
    description: string;
    perks: string[];
    badge: string;
  }[];
}

export const WINE_EVENT: EventData = {
  title: "Grand Salon & Grande Vente de Vin Marie Koré",
  subtitle: "Édition Prestige & Foire aux Vins 2026",
  organizer: "Marie Koré Vin SARL",
  dates: "Du 24 au 26 Octobre 2026",
  time: "De 10h00 à 21h30 (Accès libre & Pass VIP)",
  location: "Boulevard Latrille, Carrefour Prestige, Cocody, Abidjan",
  venueName: "Palais des Saveurs & Salons Marie Koré",
  city: "Abidjan (et accessible en commande directe en ligne)",
  targetDate: "2026-10-24T10:00:00",
  description: "L'événement viticole incontournable organisé par Marie Koré Vin pour célébrer l'art du vin, réunir passionnés et néophytes, et profiter de tarifs exclusifs en direct des producteurs.",
  features: [
    {
      icon: "Wine",
      title: "Plus de 50 Grands Vins à Déguster",
      description: "Bordeaux Grands Crus Classés, Bourgogne, Champagnes d'exception et trésors viticoles d'Afrique du Sud."
    },
    {
      icon: "Tag",
      title: "Vente Privée jusqu'à -45%",
      description: "Tarifs foire imbattables disponibles sur place et en commande directe instantanée sur notre boutique en ligne."
    },
    {
      icon: "Award",
      title: "Masterclasses avec Sommeliers",
      description: "Ateliers d'initiation à la dégustation, décryptage des millésimes et secrets des accords mets & vins."
    },
    {
      icon: "Truck",
      title: "Retrait Express ou Livraison 24h",
      description: "Achetez en ligne avec notre chariot intégré et récupérez vos cartons sur le stand VIP ou chez vous."
    }
  ],
  schedule: [
    {
      time: "10h00 - 12h30",
      title: "Ouverture & Dégustation Découverte des Vins Blancs & Rosés",
      description: "Parcours gustatif à travers la fraîcheur des terroirs côtiers et vins effervescents.",
      speaker: "Sommelier Jean-Marc Kouassi"
    },
    {
      time: "14h00 - 16h30",
      title: "Masterclass Prestige : L'Or Noir des Grands Crus de Bordeaux & Bourgogne",
      description: "Dégustation comparée à l'aveugle de millésimes rares (Saint-Émilion, Margaux, Chablis).",
      speaker: "Maître de Chai Invité & Marie Koré"
    },
    {
      time: "17h00 - 19h00",
      title: "Atelier Vins & Gastronomie : Accords Vins et Saveurs Africaines et Internationales",
      description: "Harmonies audacieuses entre sauces épicées, poissons braisés, viandes grillées et cépages nobles.",
      speaker: "Chef Sommelière Aïcha Traoré"
    },
    {
      time: "19h30 - 21h30",
      title: "Soirée VIP Champagne & Vente aux Enchères de Bouteilles Rares",
      description: "Ambiance jazz live, cocktail de dégustation et clôture des ventes flash de la journée."
    }
  ],
  passTypes: [
    {
      id: 'free',
      name: "Pass Découverte (Gratuit)",
      price: 0,
      description: "Accès à l'espace salon et aux stands de vente",
      perks: [
        "Entrée libre au salon et aux stands exposants",
        "Accès aux promotions événementielles en ligne & sur place",
        "Verre de bienvenue offert",
        "Guide imprimé du salon Marie Koré"
      ],
      badge: "Entrée Gratuite"
    },
    {
      id: 'vip',
      name: "Pass Dégustation VIP",
      price: 15000,
      description: "Pour les passionnés désireux de déguster sans limites",
      perks: [
        "Accès prioritaire Coupe-file",
        "Dégustation illimitée de 45 cuvées sélectionnées",
        "Verre en cristal gravé 'Marie Koré Vin' à emporter",
        "Bon d'achat de 10 000 FCFA valable immédiatement sur la boutique",
        "Cocktail dînatoire d'ouverture inclus"
      ],
      badge: "Le Plus Populaire"
    },
    {
      id: 'masterclass',
      name: "Pass Sommelier & Masterclass Privée",
      price: 35000,
      description: "Immersion complète avec dégustation de millésimes d'exception",
      perks: [
        "Tous les avantages du Pass VIP",
        "Place réservée au premier rang des 2 Masterclasses",
        "Dégustation exclusive de 3 Grands Crus Classés hors commerce",
        "Coffret de 2 bouteilles 'Sélection Marie Koré' offert",
        "Certificat de participation signé par le Sommelier"
      ],
      badge: "Prestige"
    }
  ]
};

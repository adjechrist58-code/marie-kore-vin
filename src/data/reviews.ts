import { WineReview } from '../types';

export const INITIAL_REVIEWS: Record<string, WineReview[]> = {
  'wine-01': [
    {
      id: 'rev-01-1',
      wineId: 'wine-01',
      author: 'Koffi Yao Stéphane',
      rating: 5,
      title: 'Un monument absolu, dégusté au Salon Marie Koré',
      comment: 'Bouteille ouverte à l\'occasion d\'un dîner d\'affaires. Carafé 2 heures comme recommandé : nez spectaculaire de cassis et de cèdre, tanins d\'une finesse remarquable. Livraison en 2h à Abidjan parfaite, la bouteille était à bonne température.',
      date: '14 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Cocody)',
      likes: 12
    },
    {
      id: 'rev-01-2',
      wineId: 'wine-01',
      author: 'Dr. Christiane Bamba',
      rating: 5,
      title: 'Authenticité garantie, cave irréprochable',
      comment: 'J\'avais des doutes sur l\'achat de grands crus en ligne, mais Marie Koré Vin est au niveau des plus grandes caves parisiennes. Bouteille impeccable, capsule et niveau parfaits. Bravo !',
      date: '02 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Plateau)',
      likes: 8
    },
    {
      id: 'rev-01-3',
      wineId: 'wine-01',
      author: 'Marc-Antoine Delorme',
      rating: 5,
      title: 'Grandissime 2018 !',
      comment: 'Un millésime d\'anthologie pour Margaux. Puissance et velours. Je vais en recommander deux caisses lors de la vente aux enchères du salon.',
      date: '28 Août 2026',
      verifiedPurchase: true,
      city: 'Paris / Abidjan',
      likes: 5
    }
  ],
  'wine-02': [
    {
      id: 'rev-02-1',
      wineId: 'wine-02',
      author: 'Aïssata Touré',
      rating: 5,
      title: 'Le champagne de notre mariage ! Bulles très fines',
      comment: 'Nous avons commandé 4 cartons de cette cuvée Réserve Prestige pour notre réception. Tout le monde a été conquis ! Frais, brioché et élégant. Paiement Wave très rapide.',
      date: '10 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Marcory)',
      likes: 14
    },
    {
      id: 'rev-02-2',
      wineId: 'wine-02',
      author: 'Patrick N\'Dri',
      rating: 5,
      title: 'Rapport qualité/prix imbattable pour un vrai champagne',
      comment: 'Dégusté en apéritif bien frappé. Une très belle longueur en bouche, pas d\'acidité agressive. Marie Koré assure vraiment sur sa cuvée signature.',
      date: '05 Septembre 2026',
      verifiedPurchase: true,
      city: 'Yamoussoukro',
      likes: 7
    },
    {
      id: 'rev-02-3',
      wineId: 'wine-02',
      author: 'Sylvie G.',
      rating: 4,
      title: 'Très bon et festif',
      comment: 'Très belle présentation avec étiquette dorée. Parfait pour les fêtes. Livraison rapide le lendemain matin.',
      date: '22 Août 2026',
      verifiedPurchase: true,
      city: 'Grand-Bassam',
      likes: 3
    }
  ],
  'wine-03': [
    {
      id: 'rev-03-1',
      wineId: 'wine-03',
      author: 'Arsène Kouadio',
      rating: 5,
      title: 'Rondeur et puissance du Merlot',
      comment: 'Servi sur une côte de bœuf braisée. Robe rubis très profonde et arômes de fruits noirs confits. Ce Saint-Émilion est une valeur sûre de la cave.',
      date: '12 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Zone 4)',
      likes: 9
    },
    {
      id: 'rev-03-2',
      wineId: 'wine-03',
      author: 'Frédéric D.',
      rating: 4,
      title: 'Très bon millésime 2020',
      comment: 'Encore jeune mais déjà très agréable après 1 heure d\'aération. Un beau vin de garde.',
      date: '30 Août 2026',
      verifiedPurchase: true,
      city: 'Bouaké',
      likes: 4
    }
  ],
  'wine-04': [
    {
      id: 'rev-04-1',
      wineId: 'wine-04',
      author: 'Nathalie Kouamé',
      rating: 5,
      title: 'La minéralité pure du Chablis',
      comment: 'Accompagné d\'un plateau d\'huîtres et de carpaccio de daurade. Vin cristallin, vif et ciselé. C\'est exactement ce que je recherchais.',
      date: '15 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Deux-Plateaux)',
      likes: 6
    },
    {
      id: 'rev-04-2',
      wineId: 'wine-04',
      author: 'Jean-Luc Moreau',
      rating: 4,
      title: 'Domaine Laroche au top',
      comment: 'Premier Cru Montmains remarquable. Minéral, notes d\'agrumes et belle salinité en fin de bouche.',
      date: '01 Septembre 2026',
      verifiedPurchase: true,
      city: 'San-Pédro',
      likes: 2
    }
  ],
  'wine-05': [
    {
      id: 'rev-05-1',
      wineId: 'wine-05',
      author: 'Thierry Sanogo',
      rating: 5,
      title: 'Le meilleur Pinotage d\'Afrique du Sud !',
      comment: 'Kanonkop est la légende de Stellenbosch. Robe pourpre, notes de chocolat noir, cerise fumée et épices. Un accord parfait avec du bœuf mariné au piment doux.',
      date: '11 Septembre 2026',
      verifiedPurchase: true,
      city: 'Abidjan (Riviera Palmeraie)',
      likes: 11
    },
    {
      id: 'rev-05-2',
      wineId: 'wine-05',
      author: 'Fatou Diop',
      rating: 5,
      title: 'Une belle découverte lors de la pré-vente',
      comment: 'Je ne connaissais pas les vins sud-africains, les conseils du sommelier Marie Koré m\'ont guidée. Ce vin est tout simplement superbe.',
      date: '04 Septembre 2026',
      verifiedPurchase: true,
      city: 'Dakar / Abidjan',
      likes: 7
    }
  ],
  'wine-06': [
    {
      id: 'rev-06-1',
      wineId: 'wine-06',
      author: 'Chloé Blanchard',
      rating: 5,
      title: 'Le rosé référence de l\'été',
      comment: 'Whispering Angel ne déçoit jamais. Robe pétale de rose très claire, soyeux en bouche et ultra rafraîchissant. Livré bien frais !',
      date: '13 Septembre 2026',
      verifiedPurchase: true,
      city: 'Assinie / Abidjan',
      likes: 15
    },
    {
      id: 'rev-06-2',
      wineId: 'wine-06',
      author: 'Didier K.',
      rating: 4,
      title: 'Parfait pour un apéritif chic',
      comment: 'Très apprécié de tous les invités au bord de la piscine. Délicat et fruité.',
      date: '29 Août 2026',
      verifiedPurchase: true,
      city: 'Grand-Bassam',
      likes: 4
    }
  ]
};

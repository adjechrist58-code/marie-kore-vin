export interface WineReview {
  id: string;
  wineId: string;
  author: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  city?: string;
  likes: number;
}

export interface Wine {
  id: string;
  name: string;
  domain: string;
  category: 'rouge' | 'blanc' | 'rose' | 'champagne' | 'prestige' | 'bio';
  categoryLabel: string;
  region: string;
  country: string;
  vintage: number;
  alcohol: string;
  price: number; // in FCFA (e.g. 18000 FCFA)
  originalPrice?: number;
  stock: number;
  initialStock: number;
  isFlashSale?: boolean;
  isEventSpecial?: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  tastingNotes: {
    robe: string;
    nez: string;
    bouche: string;
    temperature: string;
    garde: string;
  };
  foodPairing: string[];
  volume: string;
}

export interface CartItem {
  wine: Wine;
  quantity: number;
}

export interface EventBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passType: 'free' | 'vip' | 'masterclass';
  ticketsCount: number;
  createdAt: string;
  qrCodeToken: string;
}

export interface Order {
  id: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    deliveryType: 'domicile' | 'retrait_evenement';
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'wave' | 'orange_money' | 'mtn_momo' | 'carte_bancaire' | 'especes';
  paymentStatus: 'paye' | 'en_attente';
  orderDate: string;
  trackingNumber: string;
}

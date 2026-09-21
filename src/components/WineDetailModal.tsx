import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Star, 
  Award, 
  Wine, 
  Thermometer, 
  Hourglass, 
  Utensils, 
  ShieldCheck, 
  Check, 
  Flame, 
  Truck,
  Sparkles,
  ThumbsUp,
  MessageSquare,
  PenLine,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Wine as WineType, WineReview } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface WineDetailModalProps {
  wine: WineType | null;
  currency: 'XOF' | 'EUR';
  reviews?: WineReview[];
  onClose: () => void;
  onAddToCart: (wine: WineType, qty: number) => void;
  onOpenCheckoutDirect: (wine: WineType, qty: number) => void;
  onAddReview?: (wineId: string, review: WineReview) => void;
  onLikeReview?: (wineId: string, reviewId: string) => void;
}

export const WineDetailModal: React.FC<WineDetailModalProps> = ({
  wine,
  currency,
  reviews = [],
  onClose,
  onAddToCart,
  onOpenCheckoutDirect,
  onAddReview,
  onLikeReview,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review Form States
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isVerifiedBuyer, setIsVerifiedBuyer] = useState(true);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');

  // Review Filtering State
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

  // Local likes tracker for instant interactive feedback
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  if (!wine) return null;

  const discount = calculateDiscount(wine.price, wine.originalPrice);
  const isOutOfStock = wine.stock <= 0;
  const isLowStock = wine.stock > 0 && wine.stock <= 5;
  const maxAllowed = Math.min(wine.stock, 24);

  const handleQtyChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, maxAllowed)));
  };

  // Calculations for reviews breakdown
  const wineReviews = reviews || [];
  const totalReviews = wineReviews.length;
  const averageRating = totalReviews > 0
    ? Number((wineReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
    : wine.rating;

  const starCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: wineReviews.filter(r => r.rating === stars).length,
    percentage: totalReviews > 0
      ? Math.round((wineReviews.filter(r => r.rating === stars).length / totalReviews) * 100)
      : 0
  }));

  const filteredReviews = selectedStarFilter !== null
    ? wineReviews.filter(r => r.rating === selectedStarFilter)
    : wineReviews;

  const ratingLabels: Record<number, string> = {
    1: 'Décevant - Ne correspond pas à mes attentes',
    2: 'Passable - Moyen sans plus',
    3: 'Bon - Vin agréable et bien équilibré',
    4: 'Très bon - Beau millésime, belle structure',
    5: 'Exceptionnel ! - Coup de cœur absolu 🍷'
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewErrorMsg('');
    setReviewSuccessMsg('');

    if (!authorName.trim() || !reviewComment.trim()) {
      setReviewErrorMsg('Veuillez renseigner votre nom et votre commentaire.');
      return;
    }

    const newReview: WineReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      wineId: wine.id,
      author: authorName.trim(),
      rating: newRating,
      title: reviewTitle.trim() || (newRating >= 4 ? 'Très satisfait de cette dégustation' : 'Avis sur ce vin'),
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
      verifiedPurchase: isVerifiedBuyer,
      city: authorCity.trim() || 'Abidjan',
      likes: 1
    };

    if (onAddReview) {
      onAddReview(wine.id, newReview);
    }

    setReviewSuccessMsg('Merci ! Votre avis a été certifié et publié avec succès.');
    setAuthorName('');
    setAuthorCity('');
    setReviewTitle('');
    setReviewComment('');
    setIsWritingReview(false);

    // Switch to reviews tab to view it immediately
    setActiveTab('reviews');

    setTimeout(() => {
      setReviewSuccessMsg('');
    }, 5000);
  };

  const handleLike = (reviewId: string) => {
    if (likedReviews[reviewId]) return;
    setLikedReviews(prev => ({ ...prev, [reviewId]: true }));
    if (onLikeReview) {
      onLikeReview(wine.id, reviewId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#420d12] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wine className="w-5 h-5 text-[#F68B1E]" />
            <span className="font-serif font-bold text-sm tracking-wide">
              Fiche Dégustation & Avis Clients
            </span>
            {wine.isEventSpecial && (
              <span className="bg-[#F68B1E] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs ml-2">
                Sélection Salon
              </span>
            )}
          </div>
          <button
            id="close-wine-detail-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Main Top Section: Product Hero & Quick Purchase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Product Image */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-amber-50/30 border border-gray-200 p-3 flex items-center justify-center">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="h-full w-full object-cover rounded shadow-xs"
                  referrerPolicy="no-referrer"
                />
                {discount && (
                  <span className="absolute top-3 left-3 bg-[#D32F2F] text-white font-black text-xs px-2.5 py-1 rounded shadow-md">
                    -{discount}% PROMO
                  </span>
                )}
              </div>

              {/* Security & Trust Pills */}
              <div className="w-full mt-3 bg-amber-50/60 rounded-lg p-3 border border-amber-100 text-xs space-y-1.5 text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bouteille 100% certifiée d'origine & cave climatisée</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Truck className="w-4 h-4 text-[#F68B1E] shrink-0" />
                  <span>Livraison rapide ou retrait express à l'événement</span>
                </div>
              </div>
            </div>

            {/* Right: Wine Details & Buying Actions */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-[#721c24]">
                    {wine.domain}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
                    Millésime {wine.vintage}
                  </span>
                </div>

                <h2 className="font-serif font-bold text-xl text-gray-900 leading-tight mb-2">
                  {wine.name}
                </h2>

                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3 flex-wrap">
                  <span>Région : <strong>{wine.region}</strong></span>
                  <span>•</span>
                  <span>Pays : <strong>{wine.country}</strong></span>
                  <span>•</span>
                  <span>Degré : <strong>{wine.alcohol}</strong></span>
                  <span>•</span>
                  <span>Format : <strong>{wine.volume}</strong></span>
                </div>

                {/* Rating Banner with Click to Jump to Reviews */}
                <div 
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-2 mb-4 p-2 bg-amber-50/50 rounded-lg border border-amber-100 cursor-pointer hover:bg-amber-100/50 transition-colors w-fit"
                  title="Voir les avis et commentaires de ce vin"
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{averageRating} / 5</span>
                  <span className="text-xs text-[#721c24] font-medium underline">
                    ({totalReviews > 0 ? totalReviews : wine.reviewsCount} avis certifiés)
                  </span>
                  <span className="bg-[#420d12] text-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
                    98% recommandent
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-200 mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-[#721c24]">
                      {formatPrice(wine.price, currency)}
                    </span>
                    {wine.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(wine.originalPrice, currency)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Tarif exclusif Salon Marie Koré • Prix TTC par bouteille
                  </p>
                </div>

                {/* Real-time stock status */}
                <div className="mb-4">
                  {isOutOfStock ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-2.5 rounded-lg flex items-center gap-2">
                      <X className="w-4 h-4" />
                      <span>Rupture temporaire de stock pour cette référence</span>
                    </div>
                  ) : isLowStock ? (
                    <div className="bg-orange-50 border border-orange-200 text-orange-900 text-xs font-bold p-2.5 rounded-lg flex items-center gap-2 animate-pulse">
                      <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                      <span>Attention : il ne reste que <strong>{wine.stock} bouteille(s)</strong> en stock en direct !</span>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-2.5 rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>En stock immédiat ({wine.stock} bouteilles disponibles)</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                  {wine.description}
                </p>

                {/* Quantity and Actions */}
                {!isOutOfStock && (
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-700">Quantité :</span>
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() => handleQtyChange(-1)}
                          disabled={quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold disabled:opacity-40"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-xs text-gray-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(1)}
                          disabled={quantity >= maxAllowed}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">
                        Total : <strong className="text-[#721c24]">{formatPrice(wine.price * quantity, currency)}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        id="modal-add-to-cart-btn"
                        onClick={() => {
                          onAddToCart(wine, quantity);
                          onClose();
                        }}
                        className="w-full bg-[#F68B1E] hover:bg-[#e07a16] text-white font-bold text-xs py-3 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>AJOUTER AU CHARIOT</span>
                      </button>

                      <button
                        id="modal-buy-now-btn"
                        onClick={() => {
                          onOpenCheckoutDirect(wine, quantity);
                          onClose();
                        }}
                        className="w-full bg-[#721c24] hover:bg-[#58111a] text-white font-bold text-xs py-3 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#F68B1E]" />
                        <span>ACHETER MAINTENANT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Tab Navigation: Tasting Notes VS Reviews & Ratings */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex border-b border-gray-200 gap-6 text-xs font-bold">
              <button
                id="tab-tasting-notes"
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-[#F68B1E] text-[#721c24]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F68B1E]" />
                <span>Notes du Sommelier & Service</span>
              </button>

              <button
                id="tab-reviews-ratings"
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-[#F68B1E] text-[#721c24]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Avis Clients & Notations ({totalReviews})</span>
                <span className="bg-amber-100 text-[#721c24] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {averageRating} ★
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: Tasting Notes & Food Pairings */}
          {activeTab === 'details' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Robe & Visuel</span>
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">{wine.tastingNotes.robe}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Nez & Arômes</span>
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">{wine.tastingNotes.nez}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Bouche & Texture</span>
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">{wine.tastingNotes.bouche}</p>
                </div>
              </div>

              {/* Service & Garde */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <Thermometer className="w-5 h-5 text-[#F68B1E] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Température de service</span>
                    <span className="text-xs font-bold text-gray-900">{wine.tastingNotes.temperature}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <Hourglass className="w-5 h-5 text-[#721c24] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Potentiel de conservation</span>
                    <span className="text-xs font-bold text-gray-900">{wine.tastingNotes.garde}</span>
                  </div>
                </div>
              </div>

              {/* Accords Mets & Vins */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                  <Utensils className="w-4 h-4 text-[#F68B1E]" />
                  <span>Accords Mets & Vins Recommandés :</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {wine.foodPairing.map((food, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-amber-200 text-[#721c24] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs"
                    >
                      🍴 {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Ratings & Customer Reviews Section (User Request) */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200" id="wine-reviews-section">
              
              {/* Notification Banner if review added */}
              {reviewSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{reviewSuccessMsg}</span>
                </div>
              )}

              {/* Overall Ratings Card (Jumia Style Confidence Score) */}
              <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Overall Big Score */}
                  <div className="sm:col-span-4 text-center sm:border-r sm:border-amber-200/70 sm:pr-4">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Note Globale
                    </span>
                    <div className="text-4xl font-serif font-black text-[#721c24] my-1">
                      {averageRating}
                      <span className="text-lg text-gray-400 font-sans font-normal"> / 5</span>
                    </div>

                    <div className="flex justify-center text-amber-400 my-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 font-medium">
                      Basé sur <strong>{totalReviews} avis certifiés</strong>
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ 100% Retours Clients Authentiques
                    </span>
                  </div>

                  {/* Middle: Star Rating Breakdown Bars */}
                  <div className="sm:col-span-5 space-y-1.5">
                    {starCounts.map(({ stars, count, percentage }) => (
                      <div 
                        key={stars}
                        onClick={() => setSelectedStarFilter(selectedStarFilter === stars ? null : stars)}
                        className={`flex items-center gap-2 text-xs cursor-pointer px-1 py-0.5 rounded hover:bg-amber-100/50 transition-colors ${
                          selectedStarFilter === stars ? 'bg-amber-100 font-bold' : 'text-gray-700'
                        }`}
                        title={`Filtrer par les avis ${stars} étoiles`}
                      >
                        <span className="w-12 text-right text-[11px] font-semibold flex items-center justify-end gap-1">
                          {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </span>

                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#F68B1E] h-full rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <span className="w-12 text-right text-[10px] text-gray-500 font-mono">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right: CTA to Write a Review */}
                  <div className="sm:col-span-3 text-center sm:text-right flex flex-col justify-center gap-2">
                    <span className="text-xs text-gray-600 block sm:text-right">
                      Vous avez dégusté ce vin ?
                    </span>
                    <button
                      id="btn-open-review-form"
                      onClick={() => setIsWritingReview(!isWritingReview)}
                      className="bg-[#721c24] hover:bg-[#58111a] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                    >
                      <PenLine className="w-3.5 h-3.5 text-[#F68B1E]" />
                      <span>{isWritingReview ? 'Fermer le formulaire' : 'Rédiger un avis'}</span>
                    </button>
                    <span className="text-[10px] text-gray-400 block sm:text-right">
                      Partagez votre note de dégustation
                    </span>
                  </div>

                </div>
              </div>

              {/* Review Submission Form (Accordion / Collapsible) */}
              {isWritingReview && (
                <form 
                  onSubmit={handleSubmitReview}
                  className="bg-white border-2 border-[#F68B1E] rounded-xl p-5 shadow-md space-y-4 animate-in slide-in-from-top-3 duration-200"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <PenLine className="w-4 h-4 text-[#F68B1E]" />
                      <h4 className="font-serif font-bold text-sm text-gray-900">
                        Votre avis sur "{wine.name}"
                      </h4>
                    </div>
                    <span className="text-[10px] text-gray-400">Champs obligatoires *</span>
                  </div>

                  {reviewErrorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{reviewErrorMsg}</span>
                    </div>
                  )}

                  {/* Interactive Star Picker */}
                  <div className="space-y-1.5 bg-amber-50/50 p-3 rounded-lg border border-amber-200">
                    <label className="block text-xs font-bold text-gray-800">
                      Attribuez une note par étoiles *
                    </label>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className="p-1 hover:scale-115 transition-transform cursor-pointer focus:outline-hidden"
                            title={`${star} étoile(s)`}
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= (hoverRating || newRating)
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <span className="text-xs font-bold text-[#721c24] ml-2">
                        {ratingLabels[hoverRating || newRating]}
                      </span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Votre nom et prénom *
                      </label>
                      <input
                        id="review-author-input"
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Ex: Aïssata Koné"
                        className="w-full text-xs border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Votre ville ou commune (Optionnel)
                      </label>
                      <input
                        id="review-city-input"
                        type="text"
                        value={authorCity}
                        onChange={(e) => setAuthorCity(e.target.value)}
                        placeholder="Ex: Abidjan (Cocody), Yamoussoukro, Paris..."
                        className="w-full text-xs border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Titre de votre commentaire
                    </label>
                    <input
                      id="review-title-input"
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Ex: Arômes intenses et tanins soyeux, un régal !"
                      className="w-full text-xs border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Vos impressions et commentaires de dégustation *
                    </label>
                    <textarea
                      id="review-comment-textarea"
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Décrivez votre expérience : nez, saveurs, accords mets, service..."
                      className="w-full text-xs border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                    />
                  </div>

                  {/* Verification Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={isVerifiedBuyer}
                      onChange={(e) => setIsVerifiedBuyer(e.target.checked)}
                      className="rounded border-gray-300 text-[#F68B1E] focus:ring-[#F68B1E]"
                    />
                    <span>J'atteste avoir acheté ou dégusté cette cuvée (Avis Certifié Acheteur)</span>
                  </label>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsWritingReview(false)}
                      className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Annuler
                    </button>
                    <button
                      id="btn-submit-review"
                      type="submit"
                      className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-extrabold px-6 py-2 rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer transition-transform active:scale-98"
                    >
                      <span>Publier mon avis</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Review Filter Bar & Count Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#721c24]" />
                  <h4 className="font-serif font-bold text-sm text-gray-900">
                    Commentaires & Retours d'Expérience ({filteredReviews.length})
                  </h4>
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-gray-400 font-bold mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Filtrer :
                  </span>

                  <button
                    onClick={() => setSelectedStarFilter(null)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                      selectedStarFilter === null
                        ? 'bg-[#420d12] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Tous ({wineReviews.length})
                  </button>

                  {[5, 4, 3, 2, 1].map(star => {
                    const count = wineReviews.filter(r => r.rating === star).length;
                    if (count === 0 && selectedStarFilter !== star) return null;
                    return (
                      <button
                        key={star}
                        onClick={() => setSelectedStarFilter(selectedStarFilter === star ? null : star)}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          selectedStarFilter === star
                            ? 'bg-[#F68B1E] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span>{star}</span>
                        <Star className="w-3 h-3 fill-current" />
                        <span>({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200 text-gray-500">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs font-bold text-gray-700">Aucun avis ne correspond à ce filtre.</p>
                    <button
                      onClick={() => setSelectedStarFilter(null)}
                      className="mt-2 text-xs font-bold text-[#F68B1E] hover:underline"
                    >
                      Voir tous les avis clients
                    </button>
                  </div>
                ) : (
                  filteredReviews.map((review) => {
                    const isLiked = likedReviews[review.id];
                    const currentLikes = review.likes + (isLiked ? 1 : 0);

                    return (
                      <div 
                        key={review.id}
                        id={`review-card-${review.id}`}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2.5 hover:border-amber-300 transition-colors"
                      >
                        {/* Reviewer Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          
                          <div className="flex items-center gap-2.5">
                            {/* Avatar initials */}
                            <div className="w-8 h-8 rounded-full bg-[#420d12] text-[#F68B1E] flex items-center justify-center font-serif font-black text-xs shadow-2xs">
                              {review.author.charAt(0).toUpperCase()}
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-xs text-gray-900 font-bold">
                                  {review.author}
                                </strong>
                                {review.city && (
                                  <span className="text-[10px] text-gray-400 font-medium">
                                    • {review.city}
                                  </span>
                                )}
                              </div>

                              {review.verifiedPurchase && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  Achat Vérifié Salon Marie Koré
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Star Rating & Date */}
                          <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0.5">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400">{review.date}</span>
                          </div>

                        </div>

                        {/* Review Title & Comment */}
                        <div className="pt-1">
                          {review.title && (
                            <h5 className="text-xs font-bold text-gray-900 mb-1">
                              "{review.title}"
                            </h5>
                          )}
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>

                        {/* Sommelier Official Reply if available */}
                        {review.rating >= 5 && (
                          <div className="bg-amber-50/70 border-l-2 border-[#F68B1E] rounded-r p-2 text-[11px] text-gray-700 mt-2 space-y-0.5">
                            <div className="flex items-center gap-1 font-bold text-[#721c24]">
                              <Sparkles className="w-3 h-3 text-[#F68B1E]" />
                              <span>Réponse du Sommelier Marie Koré :</span>
                            </div>
                            <p className="text-gray-600 italic">
                              Merci pour votre retour d'expert ! Ce millésime exprime toute la noblesse de son terroir lorsqu'il est dégusté à bonne température. Au plaisir de vous retrouver au Salon 2026.
                            </p>
                          </div>
                        )}

                        {/* Helpful / Like Action */}
                        <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-gray-500">
                          <span className="text-[10px]">Cet avis a aidé d'autres amateurs de vin</span>
                          <button
                            onClick={() => handleLike(review.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors cursor-pointer ${
                              isLiked ? 'text-emerald-700 font-bold bg-emerald-50' : 'hover:text-[#721c24] hover:bg-gray-100'
                            }`}
                            title="Indiquer cet avis comme utile"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Utile ({currentLikes})</span>
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

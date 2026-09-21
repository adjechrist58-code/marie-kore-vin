import React, { useState, useEffect } from 'react';
import { 
  Wine, 
  Sparkles, 
  PartyPopper, 
  Crown, 
  Leaf, 
  ChevronRight, 
  ChevronLeft, 
  Ticket, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  Zap,
  ArrowRight,
  Gift
} from 'lucide-react';
import { CATEGORIES_NAV } from '../data/wines';

interface HeroSliderProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenEvent: () => void;
  onOpenFlashSales: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenEvent,
  onOpenFlashSales,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "ÉVÉNEMENT MAJEUR 2026",
      title: "Grand Salon & Foire aux Vins Marie Koré",
      subtitle: "Dégustation de 45 Grands Crus & Vente Privée Caviste",
      description: "Du 24 au 26 Octobre à Abidjan. Bénéficiez des remises exceptionnelles foire en direct des châteaux et réservez votre pass gratuit !",
      ctaText: "Découvrir l'Événement & Billets",
      action: onOpenEvent,
      bgGradient: "from-[#3B070E] via-[#5C1019] to-[#7E1A27]",
      accentColor: "#F68B1E",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      pill: "Jusqu'à -45% sur place & en ligne"
    },
    {
      id: 2,
      badge: "VENTES FLASH ÉVÉNEMENTIELLES",
      title: "Grands Crus Bordelais & Champagnes Rares",
      subtitle: "Stocks en temps réel décomptés en direct",
      description: "Château Margaux, Saint-Émilion, Domaines de Bourgogne et cuvées africaines médaillées à prix foire exceptionnels.",
      ctaText: "Accéder aux Ventes Flash",
      action: onOpenFlashSales,
      bgGradient: "from-[#1F070A] via-[#3D0C13] to-[#59141D]",
      accentColor: "#FFA034",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
      pill: "Stocks Très Limités"
    },
    {
      id: 3,
      badge: "SERVICE PREMIUM MARIE KORÉ",
      title: "Chariot Direct & Paiement Sécurisé Jumia Pay",
      subtitle: "Wave, Orange Money, MTN MoMo & Cartes Bancaires",
      description: "Commandez vos caisses de vin en 1 clic. Livraison à température régulée sous 2h à 24h ou retrait express sur le stand salon.",
      ctaText: "Faire le Plein de la Cave",
      action: () => onSelectCategory('all'),
      bgGradient: "from-[#2A0D12] via-[#48161E] to-[#6A1F2B]",
      accentColor: "#F68B1E",
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=1200&q=80",
      pill: "Livraison Offerte dès 50 000 FCFA"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Categories Menu - Jumia Sidebar Style */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#420d12] text-white px-4 py-3 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Wine className="w-4 h-4 text-[#F68B1E]" />
              Nos Rayons Vins
            </span>
            <span className="text-[10px] bg-[#F68B1E] text-white px-1.5 py-0.5 rounded font-black">
              12 CUVÉES
            </span>
          </div>

          <div className="divide-y divide-gray-100 py-1">
            {CATEGORIES_NAV.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`hero-category-${cat.id}-btn`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full px-3.5 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors group ${
                    isSelected 
                      ? 'bg-amber-50 text-[#721c24] border-l-4 border-[#F68B1E]' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#721c24]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {cat.id === 'all' && <Wine className="w-4 h-4 text-[#F68B1E]" />}
                    {cat.id === 'rouge' && <Wine className="w-4 h-4 text-red-700" />}
                    {cat.id === 'blanc' && <Sparkles className="w-4 h-4 text-amber-500" />}
                    {cat.id === 'champagne' && <PartyPopper className="w-4 h-4 text-amber-600" />}
                    {cat.id === 'rose' && <Wine className="w-4 h-4 text-pink-500" />}
                    {cat.id === 'prestige' && <Crown className="w-4 h-4 text-yellow-600" />}
                    {cat.id === 'bio' && <Leaf className="w-4 h-4 text-emerald-600" />}
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#F68B1E] transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>

          {/* Quick Event Promo Box in Sidebar */}
          <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100 mt-2">
            <div className="flex items-start gap-2">
              <Gift className="w-4 h-4 text-[#F68B1E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#721c24]">Code Promo Événement</p>
                <p className="text-[10px] text-gray-600">Utilisez <span className="font-mono font-bold text-[#F68B1E]">EVENEMENT2026</span> pour -15% sur votre premier chariot !</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Big Slider Banner */}
        <div className="lg:col-span-6 relative rounded-lg overflow-hidden shadow-sm min-h-[340px] flex flex-col justify-between">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image with Dark Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-92`} />

                {/* Content */}
                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white z-20">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#F68B1E] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                        {slide.badge}
                      </span>
                      <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {slide.pill}
                      </span>
                    </div>

                    <h2 className="font-serif font-black text-2xl sm:text-3xl text-white leading-tight mb-2">
                      {slide.title}
                    </h2>
                    
                    <p className="text-sm font-semibold text-amber-200 mb-3">
                      {slide.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-200 max-w-md line-clamp-3">
                      {slide.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={slide.action}
                      className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-md shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slider Navigation Buttons */}
          <div className="absolute z-20 bottom-3 right-4 flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
              aria-label="Slide précédent"
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#F68B1E] text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
              aria-label="Slide suivant"
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#F68B1E] text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute z-20 bottom-4 left-6 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Aller au slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-[#F68B1E]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Jumia Action Cards (Event Pass & Delivery Assurance) */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4">
          
          {/* Card 1: Pass Salon Marie Koré */}
          <div className="flex-1 bg-white rounded-lg p-4 border border-amber-200 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#F68B1E] transition-colors">
            <div className="absolute top-0 right-0 bg-[#F68B1E] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl">
              BILLETERIE OUVERTE
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-[#721c24] mb-3">
                <Ticket className="w-5 h-5 text-[#F68B1E]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#420d12] mb-1">
                Pass Dégustation Événement
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Entrée libre au salon & Masterclasses. Réservez votre badge ou Pass VIP dès maintenant !
              </p>
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pass Découverte : 0 FCFA</span>
              </div>
            </div>

            <button
              id="hero-book-pass-btn"
              onClick={onOpenEvent}
              className="w-full bg-[#721c24] hover:bg-[#58111a] text-white font-bold text-xs py-2 rounded flex items-center justify-center gap-1 transition-colors"
            >
              <span>Réserver mon Pass</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#F68B1E]" />
            </button>
          </div>

          {/* Card 2: Flash Sale & Express Delivery Guarantee */}
          <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#F68B1E] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-[#F68B1E]">
                  <Zap className="w-5 h-5 text-[#F68B1E]" />
                </div>
                <span className="text-[10px] font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
                  EN DIRECT
                </span>
              </div>
              
              <h3 className="font-bold text-sm text-gray-900 mb-1">
                Ventes Flash Salon du Vin
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Jusqu'à -45% sur les stocks réservés à l'événement. Gestion de stock en temps réel.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-gray-600 font-medium mb-3">
                <Truck className="w-3.5 h-3.5 text-[#F68B1E]" />
                <span>Livraison 2h Abidjan & Retrait Salon</span>
              </div>
            </div>

            <button
              id="hero-view-flash-sales-btn"
              onClick={onOpenFlashSales}
              className="w-full bg-[#F68B1E] hover:bg-[#e07a16] text-white font-bold text-xs py-2 rounded flex items-center justify-center gap-1 transition-colors"
            >
              <span>Voir les Ventes Flash</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Jumia Trust Features Bar */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-[#721c24] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#721c24]" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">100% Vins Authentiques</p>
            <p className="text-[10px] text-gray-500">Origine certifiée des châteaux</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F68B1E] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-[#F68B1E]" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Livraison Rapide & Sûre</p>
            <p className="text-[10px] text-gray-500">Climatisée & emballage choc</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Paiement Mobile & Carte</p>
            <p className="text-[10px] text-gray-500">Wave, OM, MTN & Visa sécurisé</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4 text-purple-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Conseils Sommellerie</p>
            <p className="text-[10px] text-gray-500">Assistance dégustation 7j/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

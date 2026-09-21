import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingCart, Eye, Flame, AlertCircle } from 'lucide-react';
import { Wine } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface FlashSalesProps {
  wines: Wine[];
  currency: 'XOF' | 'EUR';
  onAddToCart: (wine: Wine) => void;
  onSelectWine: (wine: Wine) => void;
}

export const FlashSales: React.FC<FlashSalesProps> = ({
  wines,
  currency,
  onAddToCart,
  onSelectWine,
}) => {
  const flashWines = wines.filter(w => w.isFlashSale);

  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 41,
    seconds: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (flashWines.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-3" id="flash-sales-section">
      <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
        
        {/* Flash Sales Header - Jumia Style Red/Orange Strip */}
        <div className="bg-gradient-to-r from-[#D32F2F] via-[#E65100] to-[#F68B1E] text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </div>
            <h3 className="font-extrabold text-base tracking-wide flex items-center gap-1.5 uppercase">
              <span>VENTES FLASH DU SALON</span>
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                -45% MAX
              </span>
            </h3>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 text-xs font-bold bg-black/25 px-3 py-1.5 rounded-full border border-white/20">
            <Clock className="w-3.5 h-3.5 text-yellow-300" />
            <span>Fin dans :</span>
            <div className="font-mono text-sm tracking-wider text-yellow-200 font-black">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>

        </div>

        {/* Product Cards Row / Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {flashWines.map((wine) => {
            const discount = calculateDiscount(wine.price, wine.originalPrice);
            const soldCount = wine.initialStock - wine.stock;
            const progressPercent = Math.min(100, Math.round((soldCount / wine.initialStock) * 100));
            const isOutOfStock = wine.stock <= 0;
            const isLowStock = wine.stock > 0 && wine.stock <= 5;

            return (
              <div
                key={wine.id}
                id={`flash-card-${wine.id}`}
                className="group relative bg-white border border-gray-200 hover:border-[#F68B1E] rounded-lg p-3 flex flex-col justify-between transition-all hover:shadow-md"
              >
                {/* Discount Badge */}
                {discount && (
                  <div className="absolute top-2 left-2 z-10 bg-[#D32F2F] text-white text-[11px] font-black px-2 py-0.5 rounded shadow-xs">
                    -{discount}%
                  </div>
                )}

                {/* Stock Alert Badge */}
                <div className="absolute top-2 right-2 z-10">
                  {isOutOfStock ? (
                    <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Rupture
                    </span>
                  ) : isLowStock ? (
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                      <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                      Plus que {wine.stock} !
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      En stock ({wine.stock})
                    </span>
                  )}
                </div>

                {/* Image & Quick View button */}
                <div 
                  className="relative aspect-4/3 w-full rounded-md overflow-hidden bg-gray-50 mb-3 cursor-pointer flex items-center justify-center p-2"
                  onClick={() => onSelectWine(wine)}
                >
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-[#420d12] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Fiche Dégustation
                    </span>
                  </div>
                </div>

                {/* Wine Info */}
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-0.5">
                    {wine.domain} • {wine.vintage}
                  </p>
                  <h4 
                    onClick={() => onSelectWine(wine)}
                    className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-[#F68B1E] cursor-pointer mb-1 leading-snug"
                    title={wine.name}
                  >
                    {wine.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mb-2 truncate">
                    {wine.region}, {wine.country}
                  </p>

                  {/* Prices (Jumia Style) */}
                  <div className="mb-2">
                    <div className="text-base font-extrabold text-[#721c24]">
                      {formatPrice(wine.price, currency)}
                    </div>
                    {wine.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        {formatPrice(wine.originalPrice, currency)}
                      </div>
                    )}
                  </div>

                  {/* Real-time stock progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] font-medium text-gray-600 mb-1">
                      <span>Restant : <strong className={wine.stock <= 5 ? 'text-red-600 font-bold' : 'text-gray-900'}>{wine.stock}</strong>/{wine.initialStock}</span>
                      <span className="text-[9px] text-gray-400">{progressPercent}% vendus</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          wine.stock <= 5 ? 'bg-red-500' : 'bg-[#F68B1E]'
                        }`}
                        style={{ width: `${Math.max(10, 100 - progressPercent)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  id={`flash-add-cart-${wine.id}-btn`}
                  disabled={isOutOfStock}
                  onClick={() => onAddToCart(wine)}
                  className={`w-full py-2 px-3 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                    isOutOfStock 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#F68B1E] hover:bg-[#e07a16] text-white'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{isOutOfStock ? 'Rupture de Stock' : 'AJOUTER AU CHARIOT'}</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

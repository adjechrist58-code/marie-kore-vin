import React from 'react';
import { ShoppingCart, Star, Eye, Flame, Award, Sparkles } from 'lucide-react';
import { Wine } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface WineCardProps {
  wine: Wine;
  currency: 'XOF' | 'EUR';
  onAddToCart: (wine: Wine) => void;
  onSelectWine: (wine: Wine) => void;
}

export const WineCard: React.FC<WineCardProps> = ({
  wine,
  currency,
  onAddToCart,
  onSelectWine,
}) => {
  const discount = calculateDiscount(wine.price, wine.originalPrice);
  const isOutOfStock = wine.stock <= 0;
  const isLowStock = wine.stock > 0 && wine.stock <= 5;

  return (
    <div 
      id={`wine-card-${wine.id}`}
      className="group bg-white border border-gray-200 hover:border-[#F68B1E] rounded-lg p-3 flex flex-col justify-between transition-all hover:shadow-md relative"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {discount && (
          <span className="bg-[#F68B1E] text-white text-[11px] font-black px-1.5 py-0.5 rounded shadow-xs">
            -{discount}%
          </span>
        )}
        {wine.isEventSpecial && (
          <span className="bg-[#721c24] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-0.5">
            <Award className="w-2.5 h-2.5 text-[#F68B1E]" />
            Salon 2026
          </span>
        )}
      </div>

      {/* Stock status pill */}
      <div className="absolute top-2 right-2 z-10">
        {isOutOfStock ? (
          <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            Épuisé
          </span>
        ) : isLowStock ? (
          <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Flame className="w-3 h-3 text-red-600 fill-red-600" />
            Stock : {wine.stock}
          </span>
        ) : (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-1.5 py-0.5 rounded">
            Stock: {wine.stock}
          </span>
        )}
      </div>

      {/* Wine Bottle Image */}
      <div 
        className="relative aspect-square w-full rounded-md overflow-hidden bg-gray-50 mb-2 cursor-pointer flex items-center justify-center p-2"
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
          <span className="bg-white text-[#420d12] text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Dégustation
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium mb-1">
            <span className="text-[#721c24] font-bold uppercase truncate max-w-[60%]">{wine.domain}</span>
            <span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono font-bold text-gray-700">{wine.vintage}</span>
          </div>

          <h3 
            onClick={() => onSelectWine(wine)}
            className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-[#F68B1E] cursor-pointer mb-1 leading-snug"
            title={wine.name}
          >
            {wine.name}
          </h3>

          <p className="text-[11px] text-gray-500 mb-1.5 truncate">
            {wine.region}, {wine.country} • {wine.alcohol}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(wine.rating) ? 'fill-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-700">({wine.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div>
          <div className="mb-2.5">
            <div className="text-base font-extrabold text-[#721c24]">
              {formatPrice(wine.price, currency)}
            </div>
            {wine.originalPrice && (
              <div className="text-xs text-gray-400 line-through">
                {formatPrice(wine.originalPrice, currency)}
              </div>
            )}
          </div>

          <button
            id={`catalog-add-cart-${wine.id}-btn`}
            disabled={isOutOfStock}
            onClick={() => onAddToCart(wine)}
            className={`w-full py-2 px-2.5 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#F68B1E] hover:bg-[#e07a16] text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Rupture' : 'J\'ACHÈTE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

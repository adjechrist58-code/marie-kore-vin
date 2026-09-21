import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles,
  AlertCircle,
  Wine
} from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (wineId: string, delta: number) => void;
  onRemoveItem: (wineId: string) => void;
  onProceedToCheckout: () => void;
  currency: 'XOF' | 'EUR';
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountRate: number;
  setDiscountRate: (rate: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency,
  promoCode,
  setPromoCode,
  discountRate,
  setDiscountRate,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.wine.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const freeShippingThreshold = 50000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const deliveryFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 2500);
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'EVENEMENT2026' || code === 'FOIRE2026') {
      setPromoCode(code);
      setDiscountRate(0.15);
      setPromoSuccess('Code promo validé ! -15% appliqués sur vos vins.');
    } else if (code === 'MARIEKORE10') {
      setPromoCode(code);
      setDiscountRate(0.10);
      setPromoSuccess('Code promo validé ! -10% appliqués.');
    } else {
      setPromoError('Code promo invalide. Essayez "EVENEMENT2026".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#420d12] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#F68B1E]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#F68B1E]" />
            <h2 className="font-serif font-black text-base">
              Votre Chariot d'Achat
            </h2>
            <span className="bg-[#F68B1E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((s, i) => s + i.quantity, 0)} bouteilles
            </span>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {cart.length > 0 && (
          <div className="bg-amber-50 p-3 border-b border-amber-100 text-xs">
            {isFreeShipping ? (
              <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                Félicitations ! Livraison offerte sur votre commande !
              </p>
            ) : (
              <div>
                <p className="text-gray-700 mb-1">
                  Plus que <strong className="text-[#721c24]">{formatPrice(freeShippingThreshold - subtotal, currency)}</strong> pour bénéficier de la <strong>livraison gratuite</strong> !
                </p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#F68B1E] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#721c24] flex items-center justify-center mb-3">
                <Wine className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-gray-800 text-base mb-1">
                Votre chariot est vide
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Explorez notre sélection de grands crus et bouteilles de l'événement.
              </p>
              <button
                onClick={onClose}
                className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs transition-colors"
              >
                Découvrir nos vins
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const isStockLimit = item.quantity >= item.wine.stock;

              return (
                <div 
                  key={item.wine.id}
                  id={`cart-item-${item.wine.id}`}
                  className="bg-white border border-gray-200 rounded-lg p-3 flex gap-3 shadow-2xs hover:border-[#F68B1E] transition-colors"
                >
                  <img
                    src={item.wine.image}
                    alt={item.wine.name}
                    className="w-16 h-20 object-cover rounded bg-gray-50 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-1">
                          {item.wine.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.wine.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-0.5"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500">{item.wine.domain} • {item.wine.vintage}</p>
                      <div className="text-xs font-black text-[#721c24] mt-1">
                        {formatPrice(item.wine.price, currency)}
                      </div>
                    </div>

                    {/* Quantity controls & stock notice */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.wine.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.wine.id, 1)}
                          disabled={isStockLimit}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-xs disabled:opacity-30"
                          title={isStockLimit ? 'Stock maximum atteint' : 'Ajouter'}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-gray-900">
                          {formatPrice(item.wine.price * item.quantity, currency)}
                        </span>
                        {isStockLimit && (
                          <span className="block text-[9px] text-red-500 font-bold">
                            Max stock ({item.wine.stock})
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom: Promo & Checkout Actions */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-1.5">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Code promo (ex: EVENEMENT2026)"
                  className="w-full pl-8 pr-2 py-1.5 text-xs uppercase font-bold border border-gray-300 rounded focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs px-3 py-1.5 rounded transition-colors"
              >
                Appliquer
              </button>
            </form>

            {promoSuccess && (
              <p className="text-[11px] text-emerald-700 font-semibold">{promoSuccess}</p>
            )}
            {promoError && (
              <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-gray-600 border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span>Sous-total bouteilles</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Remise événementielle (-{Math.round(discountRate * 100)}%)</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frais de livraison sécurisée</span>
                <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-semibold text-gray-900'}>
                  {deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee, currency)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-1.5">
                <span>TOTAL À PAYER</span>
                <span className="text-[#721c24]">{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold text-xs py-3 px-4 rounded-md shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>COMMANDER & PAIEMENT SÉCURISÉ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Paiement 100% Sécurisé : Mobile Money (Wave, OM, MTN) & Visa/Mastercard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

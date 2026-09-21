import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  HelpCircle, 
  Wine, 
  Calendar, 
  Sparkles, 
  Zap, 
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  PhoneCall,
  Ticket
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  currency: 'XOF' | 'EUR';
  setCurrency: (c: 'XOF' | 'EUR') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  onOpenCart: () => void;
  onOpenEvent: () => void;
  onOpenStockAdmin: () => void;
  onOpenOrders: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenCart,
  onOpenEvent,
  onOpenStockAdmin,
  onOpenOrders,
}) => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans" id="site-header">
      {/* Top Notice Bar - Jumia Style */}
      <div className="bg-[#58111A] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F68B1E]" />
              Grand Salon & Vente de Vin Marie Koré : 24 - 26 Octobre 2026 à Abidjan
            </span>
            <span className="hidden md:inline-block text-white/40">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-white/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Vins d'Origine Certifiée & Dégustation Offerte
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              id="header-event-pass-btn"
              onClick={onOpenEvent}
              className="text-[#F68B1E] hover:text-[#FFA034] font-bold flex items-center gap-1 transition-colors underline cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              Réserver Pass Dégustation
            </button>
            <div className="flex items-center gap-1 border-l border-white/20 pl-3">
              <span className="text-white/70">Devise :</span>
              <button 
                id="currency-xof-btn"
                onClick={() => setCurrency('XOF')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${currency === 'XOF' ? 'bg-[#F68B1E] text-white' : 'text-white/80 hover:text-white'}`}
              >
                FCFA
              </button>
              <button 
                id="currency-eur-btn"
                onClick={() => setCurrency('EUR')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${currency === 'EUR' ? 'bg-[#F68B1E] text-white' : 'text-white/80 hover:text-white'}`}
              >
                EUR
              </button>
            </div>
            <a href="tel:+2250758001234" className="hidden lg:flex items-center gap-1 text-white/80 hover:text-white">
              <PhoneCall className="w-3.5 h-3.5 text-[#F68B1E]" />
              +225 07 58 00 12 34
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar - Jumia Design (Clean White + Signature Orange & Bordeaux) */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#721c24] to-[#420d12] flex items-center justify-center text-white shadow-md border-2 border-[#F68B1E]">
              <Wine className="w-6 h-6 text-[#F68B1E]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-2xl tracking-tight text-[#420d12] leading-none">
                  MARIE KORÉ
                </span>
                <span className="bg-[#F68B1E] text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  VIN
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">
                Cave d'Exception & Foire aux Vins
              </p>
            </div>
          </div>

          {/* Search Bar - Jumia Form Factor */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="flex items-center border-2 border-[#F68B1E] rounded-md overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#F68B1E]/30">
              <div className="relative pl-3 pr-1 text-gray-400">
                <Search className="w-5 h-5 text-[#F68B1E]" />
              </div>
              <input
                id="main-wine-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cherchez un vin, grand cru, cépage, champagne, millésime..."
                className="w-full py-2.5 px-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 font-medium"
                >
                  Effacer
                </button>
              )}
              <button 
                id="search-submit-btn"
                className="bg-[#F68B1E] hover:bg-[#e07a16] text-white px-6 py-2.5 font-bold text-sm tracking-wide transition-colors flex items-center gap-1"
              >
                RECHERCHER
              </button>
            </div>
          </div>

          {/* Right User Actions (Compte, Aide, Chariot) */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Account dropdown */}
            <div className="relative">
              <button
                id="account-menu-toggle-btn"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-[#F68B1E] py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-amber-100 text-[#721c24] flex items-center justify-center font-bold text-xs">
                  MK
                </div>
                <div className="text-left hidden xl:block">
                  <p className="text-[11px] text-gray-400 leading-none">Bienvenue</p>
                  <p className="text-xs font-bold text-gray-800 flex items-center gap-0.5">
                    Mon Espace <ChevronDown className="w-3 h-3 text-gray-500" />
                  </p>
                </div>
              </button>

              {showAccountDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-800">Client Marie Koré Vin</p>
                    <p className="text-[11px] text-gray-500">Accès direct commandes & billets</p>
                  </div>
                  <button 
                    onClick={() => { onOpenOrders(); setShowAccountDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F68B1E] flex items-center justify-between"
                  >
                    <span>Mes Commandes Récentes</span>
                    <span className="text-[10px] bg-amber-100 text-[#721c24] font-bold px-1.5 py-0.5 rounded">Historique</span>
                  </button>
                  <button 
                    onClick={() => { onOpenEvent(); setShowAccountDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F68B1E] flex items-center justify-between"
                  >
                    <span>Mes Billets Salon du Vin</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Pass VIP</span>
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button 
                      onClick={() => { onOpenStockAdmin(); setShowAccountDropdown(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#721c24] font-bold hover:bg-red-50 flex items-center gap-1.5"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Gestion du Stock en Direct (Admin)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Event Button */}
            <button
              id="header-event-nav-btn"
              onClick={onOpenEvent}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#721c24] bg-amber-50 border border-amber-200 hover:bg-amber-100 px-3 py-2 rounded-md transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#F68B1E]" />
              <span>L'Événement</span>
            </button>

            {/* Stock Admin Quick Button */}
            <button
              id="header-stock-admin-btn"
              onClick={onOpenStockAdmin}
              title="Gérer les stocks et commandes en direct"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#721c24] border border-gray-200 hover:border-[#721c24] px-2.5 py-2 rounded-md transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span>Stock en Direct</span>
            </button>

            {/* Shopping Cart Button (Chariot d'achat Jumia) */}
            <button
              id="header-cart-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#F68B1E] hover:bg-[#e07a16] text-white px-3.5 py-2.5 rounded-md shadow-sm transition-transform active:scale-95"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#721c24] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-bold text-amber-100 leading-none">Chariot</p>
                <p className="text-xs font-black text-white">
                  {cartCount > 0 ? formatPrice(cartTotal, currency) : '0 FCFA'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="flex items-center border border-[#F68B1E] rounded-md overflow-hidden bg-white shadow-xs">
            <Search className="w-4 h-4 text-[#F68B1E] ml-3" />
            <input
              id="mobile-wine-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher un vin, champagne, grand cru..."
              className="w-full py-2 px-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-gray-400 px-2"
              >
                ✕
              </button>
            )}
            <button 
              className="bg-[#F68B1E] text-white px-3 py-2 font-bold text-xs"
            >
              OK
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar (Categories & Highlights) */}
      <div className="border-t border-b border-gray-200 bg-[#FAF9F7] text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto scrollbar-none py-1.5 gap-2 md:gap-4">
          
          <button
            onClick={onOpenEvent}
            className="flex items-center gap-1.5 bg-[#721c24] text-white px-3 py-1.5 rounded font-bold hover:bg-[#58111a] transition-colors whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F68B1E] animate-spin" />
            <span>Salon du Vin 2026</span>
            <span className="bg-[#F68B1E] text-white text-[9px] px-1 py-0.2 rounded font-black ml-1">
              DIRECT
            </span>
          </button>

          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-bold ${
              selectedCategory === 'all' && !searchQuery ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Tous nos Vins
          </button>

          <button
            onClick={() => { setSelectedCategory('rouge'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'rouge' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Vins Rouges
          </button>

          <button
            onClick={() => { setSelectedCategory('blanc'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'blanc' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Vins Blancs
          </button>

          <button
            onClick={() => { setSelectedCategory('champagne'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'champagne' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Champagnes & Bulles
          </button>

          <button
            onClick={() => { setSelectedCategory('rose'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'rose' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Rosés de Provence
          </button>

          <button
            onClick={() => { setSelectedCategory('prestige'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'prestige' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Grands Crus & Coffrets
          </button>

          <button
            onClick={() => { setSelectedCategory('bio'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap font-semibold ${
              selectedCategory === 'bio' ? 'bg-amber-100 text-[#721c24]' : 'text-gray-700 hover:text-[#721c24]'
            }`}
          >
            Vins Bio
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onOpenStockAdmin}
              className="text-xs text-[#721c24] font-bold hover:underline whitespace-nowrap hidden sm:flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-[#F68B1E]" />
              Gestion Stocks
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Wine as WineIcon, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { Wine } from '../types';
import { CATEGORIES_NAV } from '../data/wines';
import { WineCard } from './WineCard';

interface WineCatalogProps {
  wines: Wine[];
  currency: 'XOF' | 'EUR';
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddToCart: (w: Wine) => void;
  onSelectWine: (w: Wine) => void;
}

export const WineCatalog: React.FC<WineCatalogProps> = ({
  wines,
  currency,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onSelectWine,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock'>('featured');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available unique regions
  const regions = useMemo(() => {
    const set = new Set<string>();
    wines.forEach(w => set.add(w.country === 'France' ? w.region.split(' ')[0] : w.country));
    return Array.from(set);
  }, [wines]);

  // Filtered & Sorted Wines
  const filteredWines = useMemo(() => {
    return wines.filter(wine => {
      // Category match
      if (selectedCategory !== 'all' && wine.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = wine.name.toLowerCase().includes(query);
        const matchesDomain = wine.domain.toLowerCase().includes(query);
        const matchesRegion = wine.region.toLowerCase().includes(query);
        const matchesCountry = wine.country.toLowerCase().includes(query);
        const matchesCategory = wine.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesDomain && !matchesRegion && !matchesCountry && !matchesCategory) {
          return false;
        }
      }
      // Region match
      if (selectedRegion !== 'all') {
        const matchesReg = wine.region.includes(selectedRegion) || wine.country.includes(selectedRegion);
        if (!matchesReg) return false;
      }
      // Max price
      if (wine.price > maxPrice) {
        return false;
      }
      // In stock
      if (onlyInStock && wine.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'stock') return b.stock - a.stock;
      return (b.isEventSpecial ? 1 : 0) - (a.isEventSpecial ? 1 : 0);
    });
  }, [wines, selectedCategory, searchQuery, selectedRegion, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedRegion('all');
    setMaxPrice(100000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6" id="wine-catalog-section">
      {/* Category Pills Header - Jumia Quick Nav */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs mb-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <WineIcon className="w-5 h-5 text-[#721c24]" />
            <h2 className="font-serif font-bold text-lg text-gray-900">
              La Cave Marie Koré Vin
            </h2>
            <span className="text-xs bg-amber-100 text-[#721c24] font-bold px-2 py-0.5 rounded-full">
              {filteredWines.length} bouteilles
            </span>
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md"
          >
            <Filter className="w-3.5 h-3.5" />
            Filtres
          </button>
        </div>

        {/* Scrollable category chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES_NAV.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#F68B1E] text-white shadow-sm scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Filter Sidebar */}
        <div className={`md:col-span-3 space-y-4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#F68B1E]" />
                Filtres Précis
              </span>
              {(selectedCategory !== 'all' || selectedRegion !== 'all' || maxPrice < 100000 || onlyInStock || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#721c24] font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Origine & Terroir
              </label>
              <select
                id="filter-region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
              >
                <option value="all">Toutes les régions viticoles</option>
                <option value="Bordeaux">Bordeaux (Grands Crus)</option>
                <option value="Bourgogne">Bourgogne (Chablis, etc.)</option>
                <option value="Champagne">Champagne</option>
                <option value="Provence">Provence (Rosés)</option>
                <option value="Rhône">Vallée du Rhône</option>
                <option value="Afrique du Sud">Afrique du Sud (Stellenbosch)</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1">
                <span>Budget Max :</span>
                <span className="text-[#721c24] font-black">{maxPrice.toLocaleString()} FCFA</span>
              </div>
              <input
                id="filter-price-range"
                type="range"
                min={15000}
                max={100000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F68B1E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>15 000 FCFA</span>
                <span>100 000 FCFA</span>
              </div>
            </div>

            {/* Stock filter */}
            <div className="mb-4 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="filter-only-in-stock"
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#F68B1E] focus:ring-[#F68B1E] w-4 h-4"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Uniquement en stock immédiat
                </span>
              </label>
            </div>

            {/* Event callout */}
            <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200 text-xs">
              <p className="font-bold text-[#721c24] mb-1">🍷 Vente Foire aux Vins</p>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Toutes nos bouteilles portent le sceau d'authenticité de l'événement Marie Koré. Retrait gratuit possible sur le salon.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Area: Sort Bar + Wine Cards Grid */}
        <div className="md:col-span-9">
          
          {/* Top Sort & Summary Bar */}
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <div className="text-xs text-gray-600">
              {searchQuery ? (
                <span>Résultats pour <strong className="text-gray-900">"{searchQuery}"</strong> : <strong>{filteredWines.length}</strong> bouteille(s)</span>
              ) : (
                <span>Affichage de <strong>{filteredWines.length}</strong> cuvées disponibles</span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Trier par :</span>
              <div className="relative">
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-md py-1.5 pl-2.5 pr-8 focus:outline-hidden focus:ring-1 focus:ring-[#F68B1E] cursor-pointer"
                >
                  <option value="featured">Sélection Salon (Recommandés)</option>
                  <option value="price-asc">Prix : Moins cher au plus cher</option>
                  <option value="price-desc">Prix : Plus cher au moins cher</option>
                  <option value="rating">Meilleures notes clients</option>
                  <option value="stock">Stock disponible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of Wine Cards */}
          {filteredWines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWines.map((wine) => (
                <WineCard
                  key={wine.id}
                  wine={wine}
                  currency={currency}
                  onAddToCart={onAddToCart}
                  onSelectWine={onSelectWine}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-10 text-center border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#721c24] flex items-center justify-center mx-auto mb-4">
                <WineIcon className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-800 mb-2">
                Aucun vin ne correspond à votre recherche
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
                Essayez d'ajuster vos critères de recherche, d'augmenter le budget maximum ou de consulter nos autres terroirs viticoles.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#F68B1E] hover:bg-[#e07a16] text-white font-bold text-xs px-5 py-2.5 rounded-md shadow-sm transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

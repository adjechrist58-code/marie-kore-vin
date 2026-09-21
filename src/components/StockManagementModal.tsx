import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Plus, 
  Minus, 
  RotateCcw, 
  Flame, 
  Check, 
  Package, 
  Wine, 
  TrendingUp, 
  AlertTriangle,
  ShoppingBag,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Wine as WineType, Order } from '../types';
import { formatPrice } from '../utils/formatters';

interface StockManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  wines: WineType[];
  onUpdateStock: (wineId: string, newStock: number) => void;
  onResetStock: () => void;
  orders: Order[];
  currency: 'XOF' | 'EUR';
}

export const StockManagementModal: React.FC<StockManagementModalProps> = ({
  isOpen,
  onClose,
  wines,
  onUpdateStock,
  onResetStock,
  orders,
  currency,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStockStatus, setFilterStockStatus] = useState<'all' | 'low' | 'out'>('all');
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  if (!isOpen) return null;

  const totalStock = wines.reduce((acc, w) => acc + w.stock, 0);
  const outOfStockCount = wines.filter(w => w.stock <= 0).length;
  const lowStockCount = wines.filter(w => w.stock > 0 && w.stock <= 5).length;
  const totalBottlesSold = wines.reduce((acc, w) => acc + (w.initialStock - w.stock), 0);

  const filteredWines = wines.filter(w => {
    if (filterCategory !== 'all' && w.category !== filterCategory) return false;
    if (filterStockStatus === 'low' && (w.stock <= 0 || w.stock > 5)) return false;
    if (filterStockStatus === 'out' && w.stock > 0) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full overflow-hidden border border-gray-100 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#420d12] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#F68B1E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F68B1E] flex items-center justify-center text-white shadow-xs">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-200">
                PANNEAU D'ADMINISTRATION CAVISTE
              </span>
              <h2 className="font-serif font-black text-sm sm:text-base text-white">
                Gestion des Stocks en Temps Réel • Marie Koré Vin
              </h2>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 border-b border-gray-200">
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Stock Total Disponible</span>
            <span className="text-xl font-black text-[#420d12]">{totalStock} cols</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Bouteilles Vendues</span>
            <span className="text-xl font-black text-emerald-700">{totalBottlesSold} cols</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Stock Critique (&le;5)</span>
            <span className="text-xl font-black text-orange-600">{lowStockCount} réf.</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Rupture de Stock</span>
            <span className="text-xl font-black text-red-600">{outOfStockCount} réf.</span>
          </div>
        </div>

        {/* Navigation Tabs between Inventory and Orders */}
        <div className="flex border-b border-gray-200 px-6 pt-2 bg-white gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'inventory' ? 'border-[#F68B1E] text-[#721c24]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Package className="w-4 h-4 text-[#F68B1E]" />
            <span>Inventaire en Direct ({wines.length} Vins)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders' ? 'border-[#F68B1E] text-[#721c24]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#F68B1E]" />
            <span>Commandes Récentes en Direct ({orders.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {activeTab === 'inventory' ? (
            <div className="space-y-4">
              
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs border border-gray-300 rounded p-1.5 bg-white font-medium focus:ring-1 focus:ring-[#F68B1E]"
                  >
                    <option value="all">Tous les rayons</option>
                    <option value="rouge">Vins Rouges</option>
                    <option value="blanc">Vins Blancs</option>
                    <option value="champagne">Champagnes</option>
                    <option value="rose">Rosés</option>
                    <option value="prestige">Grands Crus</option>
                    <option value="bio">Vins Bio</option>
                  </select>

                  <select
                    value={filterStockStatus}
                    onChange={(e: any) => setFilterStockStatus(e.target.value)}
                    className="text-xs border border-gray-300 rounded p-1.5 bg-white font-medium focus:ring-1 focus:ring-[#F68B1E]"
                  >
                    <option value="all">Tous les statuts de stock</option>
                    <option value="low">Stock critique (&le; 5)</option>
                    <option value="out">Ruptures de stock</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onResetStock}
                    className="text-xs text-gray-600 hover:text-[#721c24] font-bold flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Réinitialiser les stocks par défaut
                  </button>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F7] border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Vin & Domaine</th>
                      <th className="p-3 hidden sm:table-cell">Région / Millésime</th>
                      <th className="p-3">Prix Unitaire</th>
                      <th className="p-3">Stock Actuel</th>
                      <th className="p-3 text-right">Ajustement en direct</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredWines.map((wine) => {
                      const isOutOfStock = wine.stock <= 0;
                      const isLowStock = wine.stock > 0 && wine.stock <= 5;

                      return (
                        <tr key={wine.id} className="hover:bg-amber-50/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={wine.image}
                                alt={wine.name}
                                className="w-8 h-10 object-cover rounded bg-gray-50 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <strong className="text-gray-900 block font-bold leading-tight">{wine.name}</strong>
                                <span className="text-[10px] text-gray-500">{wine.domain}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 hidden sm:table-cell">
                            <span className="text-gray-700">{wine.region}</span>
                            <span className="block text-[10px] text-gray-400">Millésime {wine.vintage}</span>
                          </td>

                          <td className="p-3 font-bold text-[#721c24]">
                            {formatPrice(wine.price, currency)}
                          </td>

                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`font-black text-sm px-2 py-0.5 rounded ${
                                isOutOfStock
                                  ? 'bg-red-100 text-red-800'
                                  : isLowStock
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {wine.stock}
                              </span>
                              {isOutOfStock ? (
                                <span className="text-[10px] font-bold text-red-600 uppercase">Épuisé</span>
                              ) : isLowStock ? (
                                <span className="text-[10px] font-bold text-orange-600 flex items-center gap-0.5">
                                  <Flame className="w-3 h-3" /> Critique
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-500">Normal</span>
                              )}
                            </div>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => onUpdateStock(wine.id, Math.max(0, wine.stock - 1))}
                                disabled={wine.stock <= 0}
                                title="-1 bouteille"
                                className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center disabled:opacity-30"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => onUpdateStock(wine.id, wine.stock + 1)}
                                title="+1 bouteille"
                                className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => onUpdateStock(wine.id, wine.stock + 6)}
                                title="+1 carton (6 bouteilles)"
                                className="px-2 py-1 rounded bg-[#F68B1E] hover:bg-[#e07a16] text-white font-black text-[10px] shadow-2xs"
                              >
                                +6
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <h4 className="font-bold text-gray-700 text-sm">Aucune commande enregistrée pour l'instant</h4>
                  <p className="text-xs text-gray-500">
                    Passez une commande via le chariot d'achat pour observer la mise à jour des stocks en direct !
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-2xs">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-gray-100 pb-2 mb-2">
                        <div>
                          <strong className="text-sm text-[#420d12] font-serif font-black">{ord.id}</strong>
                          <span className="text-xs text-gray-500 ml-2">Client : {ord.customer.fullName} ({ord.customer.phone})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            {ord.paymentStatus === 'paye' ? 'Payé' : 'En attente'} ({ord.paymentMethod.toUpperCase()})
                          </span>
                          <span className="text-xs font-black text-[#721c24]">{formatPrice(ord.total, currency)}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Articles décomptés du stock :</span>
                        <div className="flex flex-wrap gap-2">
                          {ord.items.map((it) => (
                            <span key={it.wine.id} className="bg-amber-50 border border-amber-200 text-[#721c24] px-2 py-0.5 rounded text-[11px] font-medium">
                              {it.quantity}x {it.wine.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

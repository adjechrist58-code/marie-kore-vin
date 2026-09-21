import React from 'react';
import { 
  Check, 
  Download, 
  Wine, 
  ShoppingBag, 
  Truck, 
  MapPin, 
  Calendar, 
  X,
  Printer
} from 'lucide-react';
import { Order } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrderSuccessModalProps {
  order: Order | null;
  currency: 'XOF' | 'EUR';
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  currency,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#420d12] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#F68B1E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-200">
                COMMANDE VALIDÉE AVEC SUCCÈS
              </span>
              <h2 className="font-serif font-black text-sm sm:text-base text-white">
                Reçu Officiel Marie Koré Vin
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          <div className="text-center">
            <h3 className="font-serif font-black text-2xl text-[#420d12] mb-1">
              Merci pour votre commande, {order.customer.fullName} !
            </h3>
            <p className="text-xs text-gray-600">
              Votre paiement sécurisé a été confirmé et vos bouteilles sont réservées.
            </p>
            <div className="inline-block mt-2 bg-amber-50 border border-amber-200 text-[#721c24] text-xs font-mono font-bold px-3 py-1 rounded-full">
              N° Commande : {order.id} • Suivi : {order.trackingNumber}
            </div>
          </div>

          {/* Receipt Printable Card */}
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4 shadow-2xs">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-b border-gray-200 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Date :</span>
                <span className="text-gray-800 font-medium">{order.orderDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Paiement :</span>
                <span className="text-gray-800 font-semibold uppercase">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Statut :</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {order.paymentStatus === 'paye' ? 'Payé & Garanti' : 'En attente'}
                </span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="text-xs border-b border-gray-200 pb-3">
              <span className="text-[10px] text-gray-400 block font-bold">Destinataire & Réception :</span>
              <p className="text-gray-800 font-semibold">{order.customer.fullName} • {order.customer.phone}</p>
              <p className="text-gray-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#F68B1E]" />
                <span>{order.customer.address}, {order.customer.city}</span>
              </p>
            </div>

            {/* Items list */}
            <div>
              <span className="text-[10px] text-gray-400 block font-bold mb-2 uppercase">Articles commandés :</span>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.wine.id} className="flex justify-between items-center text-xs bg-white p-2.5 rounded border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Wine className="w-4 h-4 text-[#721c24]" />
                      <div>
                        <span className="font-bold text-gray-800">{item.wine.name}</span>
                        <span className="text-gray-500 block text-[10px]">
                          Quantité : <strong>{item.quantity}</strong> × {formatPrice(item.wine.price, currency)}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatPrice(item.wine.price * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="border-t border-gray-200 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total :</span>
                <span>{formatPrice(order.subtotal, currency)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Remise événementielle :</span>
                  <span>-{formatPrice(order.discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Frais de livraison :</span>
                <span>{order.deliveryFee === 0 ? 'Offerts' : formatPrice(order.deliveryFee, currency)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#420d12] border-t border-gray-200 pt-1.5">
                <span>TOTAL RÉGLÉ :</span>
                <span>{formatPrice(order.total, currency)}</span>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 px-4 rounded-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              <span>Imprimer la Facture</span>
            </button>

            <button
              id="success-continue-shopping-btn"
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="w-full sm:w-auto bg-[#F68B1E] hover:bg-[#e07a16] text-white font-bold text-xs py-2.5 px-5 rounded-md shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continuer mes achats</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

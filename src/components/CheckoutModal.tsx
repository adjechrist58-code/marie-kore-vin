import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Wine, 
  MapPin, 
  Clock, 
  Store,
  Sparkles
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { formatPrice } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountRate: number;
  promoCode: string;
  currency: 'XOF' | 'EUR';
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountRate,
  promoCode,
  currency,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Delivery, 2: Payment, 3: Processing
  
  // Customer info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Abidjan');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'domicile' | 'retrait_evenement'>('domicile');
  
  // Payment info
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange_money' | 'mtn_momo' | 'carte_bancaire' | 'especes'>('wave');
  const [mobilePhone, setMobilePhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Processing simulation state
  const [processingStatus, setProcessingStatus] = useState<string>('Connexion au serveur sécurisé...');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.wine.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const isFreeShipping = subtotal >= 50000 || deliveryType === 'retrait_evenement';
  const deliveryFee = isFreeShipping ? 0 : 2500;
  const total = subtotal - discountAmount + deliveryFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    if (deliveryType === 'domicile' && !address) return;
    setStep(2);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);

    // Realistic multi-step payment gateway simulation (Jumia Pay style)
    setProcessingStatus('Cryptage des données de paiement SSL 256 bits...');
    
    setTimeout(() => {
      if (paymentMethod === 'wave') {
        setProcessingStatus('Envoi de la requête de paiement instantané Wave...');
      } else if (paymentMethod === 'orange_money' || paymentMethod === 'mtn_momo') {
        setProcessingStatus('Validation du code de sécurité USSD Mobile Money...');
      } else if (paymentMethod === 'carte_bancaire') {
        setProcessingStatus('Vérification du protocole 3D Secure / Carte bancaire...');
      } else {
        setProcessingStatus('Réservation du stock et validation commande...');
      }

      setTimeout(() => {
        setProcessingStatus('Paiement accepté ! Enregistrement de la commande...');
        
        setTimeout(() => {
          const newOrder: Order = {
            id: `MKV-${Math.floor(100000 + Math.random() * 900000)}`,
            customer: {
              fullName,
              phone,
              address: deliveryType === 'retrait_evenement' ? 'Retrait au Salon Marie Koré (Stand VIP)' : address,
              city,
              deliveryType,
            },
            items: [...cart],
            subtotal,
            discount: discountAmount,
            deliveryFee,
            total,
            paymentMethod,
            paymentStatus: paymentMethod === 'especes' ? 'en_attente' : 'paye',
            orderDate: new Date().toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            trackingNumber: `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          };

          onOrderComplete(newOrder);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Jumia Pay branding */}
        <div className="bg-[#420d12] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#F68B1E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F68B1E] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                MARIE KORÉ VIN • PAIEMENT SÉCURISÉ
              </span>
              <h2 className="font-serif font-black text-sm sm:text-base text-white">
                Finalisation de votre commande
              </h2>
            </div>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            disabled={step === 3}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-gray-100 px-6 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#F68B1E]' : 'text-emerald-700'}`}>
            <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center text-[11px]">1</span>
            <span>Livraison & Contact</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300" />
          <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#F68B1E]' : step === 3 ? 'text-emerald-700' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center text-[11px]">2</span>
            <span>Paiement Sécurisé</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#F68B1E]' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center text-[11px]">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* STEP 1: Delivery Information */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              
              {/* Delivery Type Option */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Choisissez le mode de réception des bouteilles :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliveryType('domicile')}
                    className={`p-3.5 rounded-lg border-2 cursor-pointer flex items-start gap-3 transition-all ${
                      deliveryType === 'domicile'
                        ? 'border-[#F68B1E] bg-amber-50/40 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#F68B1E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">Livraison à Domicile / Bureau</h4>
                      <p className="text-[11px] text-gray-500">Véhicule climatisé sous 2h à 24h</p>
                      <span className="text-[10px] font-bold text-emerald-700 mt-1 block">
                        {isFreeShipping ? 'Livraison Offerte' : '2 500 FCFA'}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliveryType('retrait_evenement')}
                    className={`p-3.5 rounded-lg border-2 cursor-pointer flex items-start gap-3 transition-all ${
                      deliveryType === 'retrait_evenement'
                        ? 'border-[#F68B1E] bg-amber-50/40 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Store className="w-5 h-5 text-[#721c24] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">Retrait au Salon du Vin</h4>
                      <p className="text-[11px] text-gray-500">Comptoir VIP Marie Koré (Gratuit)</p>
                      <span className="text-[10px] font-bold text-emerald-700 mt-1 block">
                        0 FCFA • Immédiat
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nom et Prénom *
                  </label>
                  <input
                    id="checkout-fullname-input"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Aïcha Ouattara"
                    className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+225 07 12 34 56 78"
                    className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                  />
                </div>
              </div>

              {deliveryType === 'domicile' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Ville *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                    >
                      <option value="Abidjan">Abidjan (Cocody, Plateau, Marcory, etc.)</option>
                      <option value="Yamoussoukro">Yamoussoukro</option>
                      <option value="Bouaké">Bouaké</option>
                      <option value="San-Pédro">San-Pédro</option>
                      <option value="Grand-Bassam">Grand-Bassam</option>
                      <option value="Autre">Autre Localité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Adresse précise de livraison *
                    </label>
                    <input
                      id="checkout-address-input"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Quartier, Rue, Résidence, Repère..."
                      className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-gray-700">
                  <p className="font-bold text-[#721c24] mb-0.5">📍 Point de Retrait Événement :</p>
                  <p>Comptoir Réception Express Marie Koré Vin, Palais des Congrès / Saveurs, Boulevard Latrille Cocody Abidjan. Vos caisses seront prêtes et étiquetées à votre nom.</p>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1 text-xs">
                <div className="flex justify-between font-medium text-gray-600">
                  <span>Bouteilles ({cart.reduce((s, i) => s + i.quantity, 0)}) :</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Remise Code {promoCode} :</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-gray-600">
                  <span>Livraison :</span>
                  <span>{deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee, currency)}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-gray-900 border-t border-gray-200 pt-1.5">
                  <span>Total à Régler :</span>
                  <span className="text-[#721c24]">{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  id="checkout-step1-next-btn"
                  type="submit"
                  className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold px-6 py-2.5 rounded shadow-sm flex items-center gap-1.5"
                >
                  <span>Passer au Paiement Sécurisé</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 2 && (
            <form onSubmit={handleExecutePayment} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2">
                  Sélectionnez votre moyen de paiement sécurisé :
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Wave */}
                  <div
                    id="pay-method-wave"
                    onClick={() => setPaymentMethod('wave')}
                    className={`p-3 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'wave' ? 'border-[#1DC4FA] bg-sky-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#1DC4FA] text-white flex items-center justify-center font-black text-xs">
                        W
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Wave Mobile Money</span>
                        <span className="text-[10px] text-gray-500">Sans frais • 0% commission</span>
                      </div>
                    </div>
                    {paymentMethod === 'wave' && <CheckCircle2 className="w-4 h-4 text-[#1DC4FA]" />}
                  </div>

                  {/* Orange Money */}
                  <div
                    id="pay-method-om"
                    onClick={() => setPaymentMethod('orange_money')}
                    className={`p-3 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'orange_money' ? 'border-[#FF6600] bg-orange-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF6600] text-white flex items-center justify-center font-black text-xs">
                        OM
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Orange Money</span>
                        <span className="text-[10px] text-gray-500">Validation via notification</span>
                      </div>
                    </div>
                    {paymentMethod === 'orange_money' && <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />}
                  </div>

                  {/* MTN MoMo */}
                  <div
                    id="pay-method-mtn"
                    onClick={() => setPaymentMethod('mtn_momo')}
                    className={`p-3 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'mtn_momo' ? 'border-[#FFCC00] bg-yellow-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FFCC00] text-gray-900 flex items-center justify-center font-black text-xs">
                        MTN
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">MTN MoMo</span>
                        <span className="text-[10px] text-gray-500">Paiement direct sécurisé</span>
                      </div>
                    </div>
                    {paymentMethod === 'mtn_momo' && <CheckCircle2 className="w-4 h-4 text-[#FFCC00]" />}
                  </div>

                  {/* Carte Bancaire */}
                  <div
                    id="pay-method-card"
                    onClick={() => setPaymentMethod('carte_bancaire')}
                    className={`p-3 rounded-lg border-2 cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'carte_bancaire' ? 'border-[#420d12] bg-amber-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#420d12] text-white flex items-center justify-center font-bold text-xs">
                        <CreditCard className="w-4 h-4 text-[#F68B1E]" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Carte Bancaire</span>
                        <span className="text-[10px] text-gray-500">Visa / Mastercard 3D Secure</span>
                      </div>
                    </div>
                    {paymentMethod === 'carte_bancaire' && <CheckCircle2 className="w-4 h-4 text-[#420d12]" />}
                  </div>

                </div>
              </div>

              {/* Dynamic Payment Input Form */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                {(paymentMethod === 'wave' || paymentMethod === 'orange_money' || paymentMethod === 'mtn_momo') && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Numéro de Téléphone {paymentMethod === 'wave' ? 'Wave' : paymentMethod === 'orange_money' ? 'Orange Money' : 'MTN MoMo'} *
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        id="checkout-mobile-number"
                        type="tel"
                        required
                        value={mobilePhone || phone}
                        onChange={(e) => setMobilePhone(e.target.value)}
                        placeholder="+225 07 00 00 00 00"
                        className="w-full pl-9 text-xs border border-gray-300 rounded p-2.5 bg-white focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Une notification de validation sera envoyée sur votre téléphone pour confirmer le débit sécurisé.
                    </p>
                  </div>
                )}

                {paymentMethod === 'carte_bancaire' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Numéro de Carte Bancaire *
                      </label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8921"
                        className="w-full text-xs font-mono border border-gray-300 rounded p-2.5 bg-white focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Date Exp. (MM/AA) *
                        </label>
                        <input
                          id="checkout-card-expiry"
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full text-xs font-mono border border-gray-300 rounded p-2.5 bg-white focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          CVV / CVC *
                        </label>
                        <input
                          id="checkout-card-cvv"
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full text-xs font-mono border border-gray-300 rounded p-2.5 bg-white focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      Transaction chiffrée SSL 256-bit certifiée PCI-DSS.
                    </p>
                  </div>
                )}
              </div>

              {/* Total to charge */}
              <div className="bg-[#420d12] text-white p-3.5 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-200 block uppercase font-bold">Montant Total à Payer</span>
                  <span className="font-serif font-black text-xl text-white">{formatPrice(total, currency)}</span>
                </div>
                <div className="text-right text-[10px] text-amber-100">
                  <span>Stock réservé en temps réel</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  ← Retour à la livraison
                </button>
                <button
                  id="checkout-confirm-pay-btn"
                  type="submit"
                  className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-extrabold px-6 py-3 rounded-md shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>PAYER EN TOUTE SÉCURITÉ</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Payment Processing Animation */}
          {step === 3 && (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#F68B1E] border-t-transparent rounded-full animate-spin mx-auto shadow-sm" />
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Paiement Sécurisé en Cours...
              </h3>
              <p className="text-xs text-gray-600 font-mono animate-pulse">
                {processingStatus}
              </p>
              <div className="p-3 bg-amber-50 rounded-lg max-w-sm mx-auto text-[11px] text-gray-500 border border-amber-200">
                Ne fermez pas cette fenêtre. Vos bouteilles sont réservées et le stock est mis à jour en temps réel sur les serveurs Marie Koré Vin.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

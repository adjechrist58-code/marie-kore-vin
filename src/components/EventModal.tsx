import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Award, 
  Wine, 
  Sparkles, 
  Check, 
  Download, 
  QrCode, 
  Share2, 
  Phone, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { WINE_EVENT } from '../data/event';
import { EventBooking } from '../types';
import { formatPrice } from '../utils/formatters';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopEventWines: () => void;
  currency: 'XOF' | 'EUR';
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onShopEventWines,
  currency,
}) => {
  const [selectedPass, setSelectedPass] = useState<'free' | 'vip' | 'masterclass'>('free');
  const [ticketsCount, setTicketsCount] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<EventBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPassInfo = WINE_EVENT.passTypes.find(p => p.id === selectedPass)!;
  const totalPrice = currentPassInfo.price * ticketsCount;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking: EventBooking = {
        id: `MKV-PASS-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        email: email || 'contact@client.com',
        phone,
        passType: selectedPass,
        ticketsCount,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        qrCodeToken: `MKV2026-${Date.now()}`
      };
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full overflow-hidden border border-gray-100 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#420d12] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#F68B1E]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F68B1E] flex items-center justify-center text-white shadow-xs">
              <Wine className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                Événement Officiel Marie Koré Vin
              </span>
              <h2 className="font-serif font-black text-base sm:text-lg text-white">
                Grand Salon & Foire aux Vins 2026
              </h2>
            </div>
          </div>
          <button
            id="close-event-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* Confirmed Booking View (E-Ticket) */}
          {confirmedBooking ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-[#F68B1E] rounded-xl p-6 text-center max-w-xl mx-auto shadow-md">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <span className="bg-[#F68B1E] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-xs tracking-wider">
                E-BILLET OFFICIEL CONFIRMÉ
              </span>

              <h3 className="font-serif font-black text-2xl text-[#420d12] mt-3 mb-1">
                Félicitations, {confirmedBooking.fullName} !
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Votre réservation pour le <strong className="text-gray-900">{WINE_EVENT.title}</strong> est enregistrée.
              </p>

              {/* Digital Pass Ticket Box */}
              <div className="bg-white rounded-xl p-5 border border-dashed border-gray-300 shadow-xs text-left mb-5">
                <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#F68B1E]">MARIE KORÉ VIN</span>
                    <h4 className="font-bold text-sm text-gray-900">
                      {WINE_EVENT.passTypes.find(p => p.id === confirmedBooking.passType)?.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">N° {confirmedBooking.id}</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg text-center">
                    <QrCode className="w-12 h-12 text-gray-800" />
                    <span className="text-[8px] font-mono block text-gray-500 mt-0.5">SCAN VIP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Titulaire :</span>
                    <strong className="text-gray-800">{confirmedBooking.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Places réservées :</span>
                    <strong className="text-gray-800">{confirmedBooking.ticketsCount} Pass</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Dates :</span>
                    <strong className="text-gray-800">{WINE_EVENT.dates}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Lieu :</span>
                    <strong className="text-gray-800">{WINE_EVENT.venueName}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto bg-[#420d12] hover:bg-[#58111a] text-white text-xs font-bold py-2.5 px-4 rounded-md shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#F68B1E]" />
                  <span>Imprimer / Télécharger le Billet</span>
                </button>
                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    onClose();
                    onShopEventWines();
                  }}
                  className="w-full sm:w-auto bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-bold py-2.5 px-4 rounded-md shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Wine className="w-4 h-4" />
                  <span>Commander les Vins du Salon</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Event Hero Banner */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#2c0509] via-[#4d0c14] to-[#721c24] text-white p-6 sm:p-8 shadow-sm">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-[#F68B1E] text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-3 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Inauguration & Grande Vente 2026
                  </div>

                  <h1 className="font-serif font-black text-2xl sm:text-4xl text-white leading-tight mb-2">
                    {WINE_EVENT.title}
                  </h1>

                  <p className="text-sm sm:text-base font-bold text-amber-200 mb-4">
                    {WINE_EVENT.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
                    {WINE_EVENT.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/30 p-3 rounded-lg border border-white/10 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F68B1E] shrink-0" />
                      <span><strong>Dates :</strong> {WINE_EVENT.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F68B1E] shrink-0" />
                      <span><strong>Horaires :</strong> {WINE_EVENT.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-[#F68B1E] shrink-0" />
                      <span><strong>Lieu :</strong> {WINE_EVENT.venueName} - {WINE_EVENT.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presentation of Company Marie Koré Vin */}
              <div className="bg-amber-50/40 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 text-sm font-serif font-black text-[#420d12] mb-2">
                  <Building2 className="w-4 h-4 text-[#F68B1E]" />
                  À Propos de l'Entreprise Marie Koré Vin
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Fondée par des passionnés du patrimoine viticole, <strong>Marie Koré Vin</strong> est la maison de référence spécialisée dans l'importation directe, la sélection rigoureuse et la distribution de vins fins, grands crus classés de Bordeaux et Bourgogne, champagnes de renom et cuvées africaines d'exception. À travers cet événement et notre boutique en ligne intuitive inspirée des standards d'excellence Jumia, nous offrons aux particuliers, collectionneurs et restaurateurs un accès direct à des bouteilles de qualité irréprochable avec suivi en temps réel et paiement ultra sécurisé.
                </p>
              </div>

              {/* 4 Pillars of the Event */}
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F68B1E]" />
                  Ce qui vous attend lors du Salon
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {WINE_EVENT.features.map((feat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:border-[#F68B1E] transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-[#721c24] flex items-center justify-center mb-3">
                        <Wine className="w-5 h-5 text-[#F68B1E]" />
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program & Schedule */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-serif font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#721c24]" />
                  Programme des Animations & Dégustations
                </h3>
                <div className="space-y-3">
                  {WINE_EVENT.schedule.map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-[#F68B1E] bg-orange-50 px-2 py-0.5 rounded border border-orange-100 inline-block mb-1">
                          {item.time}
                        </span>
                        <h4 className="font-bold text-xs text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      {item.speaker && (
                        <div className="text-[11px] text-gray-500 shrink-0 font-medium sm:text-right">
                          Intervenant : <strong className="text-[#721c24]">{item.speaker}</strong>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Pass Booking Form */}
              <div className="border-2 border-[#F68B1E] rounded-xl p-6 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F68B1E]">
                      BILLETTERIE EN LIGNE
                    </span>
                    <h3 className="font-serif font-bold text-lg text-gray-900">
                      Réservez votre Pass d'Accès au Salon
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
                    ✓ E-Billet Immédiat avec QR Code
                  </span>
                </div>

                {/* Pass Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {WINE_EVENT.passTypes.map((pass) => {
                    const isSelected = selectedPass === pass.id;
                    return (
                      <div
                        key={pass.id}
                        id={`pass-option-${pass.id}`}
                        onClick={() => setSelectedPass(pass.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#F68B1E] bg-amber-50/40 shadow-xs'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase text-[#721c24] bg-amber-100 px-2 py-0.5 rounded">
                              {pass.badge}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#F68B1E] stroke-[3]" />}
                          </div>

                          <h4 className="font-bold text-xs text-gray-900 mb-1">
                            {pass.name}
                          </h4>

                          <div className="font-black text-base text-[#420d12] mb-2">
                            {pass.price === 0 ? 'GRATUIT' : formatPrice(pass.price, currency)}
                          </div>

                          <ul className="text-[11px] text-gray-600 space-y-1 mb-3">
                            {pass.perks.map((perk, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`text-center py-1.5 rounded text-xs font-bold ${
                          isSelected ? 'bg-[#F68B1E] text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {isSelected ? 'Sélectionné' : 'Choisir ce Pass'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Registration Form Inputs */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Nom complet *
                      </label>
                      <input
                        id="booking-fullname-input"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Kouamé Jean-Marc"
                        className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Numéro Téléphone (WhatsApp/Mobile) *
                      </label>
                      <input
                        id="booking-phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+225 07 00 00 00 00"
                        className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Adresse Email (Optionnel)
                      </label>
                      <input
                        id="booking-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jean.marc@example.com"
                        className="w-full text-xs border border-gray-300 rounded p-2.5 focus:ring-1 focus:ring-[#F68B1E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Quantity of tickets */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-700">Nombre de Pass :</span>
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setTicketsCount(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{ticketsCount}</span>
                        <button
                          type="button"
                          onClick={() => setTicketsCount(prev => Math.min(10, prev + 1))}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-[#721c24]">
                        Total : {totalPrice === 0 ? 'Gratuit' : formatPrice(totalPrice, currency)}
                      </span>
                    </div>

                    <button
                      id="submit-event-booking-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#F68B1E] hover:bg-[#e07a16] text-white font-bold text-xs py-3 px-6 rounded-md shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>{isSubmitting ? 'Génération du Pass...' : 'VALIDER MA RÉSERVATION & OBTENIR MON PASS'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

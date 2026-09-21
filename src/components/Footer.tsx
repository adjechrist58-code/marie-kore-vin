import React, { useState } from 'react';
import { 
  Wine, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award,
  Check,
  Calendar,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenEvent: () => void;
  onOpenStockAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEvent, onOpenStockAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#2D0B0F] text-white mt-12 border-t-4 border-[#F68B1E]" id="site-footer">
      
      {/* Newsletter Section - Jumia Dark Style */}
      <div className="border-b border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F68B1E] flex items-center justify-center text-white shrink-0 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-amber-100">
                NOUVEAU SUR MARIE KORÉ VIN ?
              </h3>
              <p className="text-xs text-gray-300">
                Inscrivez-vous à nos ventes privées et recevez votre invitation gratuite pour le Grand Salon 2026 !
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              id="newsletter-email-input"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Entrez votre adresse email..."
              className="bg-white/10 border border-white/20 rounded px-3.5 py-2 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:border-[#F68B1E] w-full md:w-72"
            />
            <button
              id="newsletter-submit-btn"
              type="submit"
              className="bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold text-xs px-5 py-2 rounded transition-colors whitespace-nowrap"
            >
              {newsletterSubscribed ? '✓ Inscrit !' : 'M\'ABONNER'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links - Jumia 4-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: About Marie Koré Vin */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-[#F68B1E] flex items-center justify-center text-white">
                <Wine className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-base text-amber-100">
                MARIE KORÉ VIN
              </span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              Maison de prestige et caviste en ligne inspiré par l'expérience Jumia. Importateur direct de grands vins, champagnes et spiritueux de renommée mondiale.
            </p>
            <div className="space-y-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F68B1E] shrink-0" />
                <span>Boulevard Latrille, Cocody, Abidjan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F68B1E] shrink-0" />
                <span>+225 07 58 00 12 34 / +225 27 22 00 00</span>
              </div>
            </div>
          </div>

          {/* Col 2: L'Événement 2026 */}
          <div>
            <h4 className="font-bold text-sm text-amber-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#F68B1E]" />
              Le Grand Salon du Vin
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={onOpenEvent} className="hover:text-[#F68B1E] text-left transition-colors">
                  Présentation & Dates officielles
                </button>
              </li>
              <li>
                <button onClick={onOpenEvent} className="hover:text-[#F68B1E] text-left transition-colors">
                  Billetterie & Pass Dégustation Gratuit
                </button>
              </li>
              <li>
                <button onClick={onOpenEvent} className="hover:text-[#F68B1E] text-left transition-colors">
                  Programme des Masterclasses Sommeliers
                </button>
              </li>
              <li>
                <button onClick={onOpenEvent} className="hover:text-[#F68B1E] text-left transition-colors">
                  Accords mets africains & vins nobles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Client & Garanties */}
          <div>
            <h4 className="font-bold text-sm text-amber-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F68B1E]" />
              Service Client Jumia Pay
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement Wave, OM, MTN & Visa</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Livraison sécurisée sous 2h à 24h</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gestion des stocks en temps réel</span>
              </li>
              <li>
                <button onClick={onOpenStockAdmin} className="text-[#F68B1E] hover:underline font-bold">
                  Accès Espace Gestion Stock (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Paiements Partenaires */}
          <div>
            <h4 className="font-bold text-sm text-amber-200 uppercase tracking-wider mb-3">
              Moyens de Paiement Agréés
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div className="bg-white/10 p-2 rounded flex items-center gap-2 border border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#1DC4FA]" />
                <span>Wave</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex items-center gap-2 border border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#FF6600]" />
                <span>Orange Money</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex items-center gap-2 border border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#FFCC00]" />
                <span>MTN MoMo</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex items-center gap-2 border border-white/10">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Visa / CB</span>
              </div>
            </div>

            <div className="mt-4 p-2.5 bg-black/30 rounded border border-white/10 text-[10px] text-gray-400">
              L'abus d'alcool est dangereux pour la santé. À consommer avec modération. Vente interdite aux mineurs de moins de 18 ans.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>© 2026 Marie Koré Vin SARL. Tous droits réservés. Plateforme conçue dans le style e-commerce Jumia.</p>
          <div className="flex items-center gap-4">
            <span>Confidentialité</span>
            <span>Conditions Générales de Vente</span>
            <span>Mentions Légales</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

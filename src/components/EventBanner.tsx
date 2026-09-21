import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket, Clock, ArrowRight, Award } from 'lucide-react';
import { WINE_EVENT } from '../data/event';

interface EventBannerProps {
  onOpenEvent: () => void;
}

export const EventBanner: React.FC<EventBannerProps> = ({ onOpenEvent }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 38,
    hours: 14,
    minutes: 22,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#490c13] via-[#661620] to-[#801b27] text-white py-3 px-4 border-b-2 border-[#F68B1E] shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 bg-[#F68B1E] text-white px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
            <Award className="w-3.5 h-3.5" />
            Événement Officiel
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100 flex items-center gap-2 justify-center sm:justify-start">
              <span>{WINE_EVENT.title}</span>
              <span className="hidden md:inline-block text-xs bg-white/20 px-2 py-0.5 rounded font-sans text-white">
                Entrée Libre & Dégustations
              </span>
            </h3>
            <p className="text-xs text-amber-200/80 flex items-center gap-3 justify-center sm:justify-start flex-wrap mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#F68B1E]" />
                {WINE_EVENT.dates}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F68B1E]" />
                {WINE_EVENT.venueName}, Abidjan
              </span>
            </p>
          </div>
        </div>

        {/* Center Countdown */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
          <Clock className="w-4 h-4 text-[#F68B1E] hidden sm:block" />
          <span className="text-[11px] font-bold text-amber-200 uppercase mr-1 hidden sm:inline">Début dans :</span>
          <div className="flex items-center gap-1.5 text-center">
            <div className="bg-[#721c24] px-2 py-0.5 rounded font-mono font-bold text-xs">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[9px] block text-white/70 font-sans">j</span>
            </div>
            <span className="font-bold text-amber-300">:</span>
            <div className="bg-[#721c24] px-2 py-0.5 rounded font-mono font-bold text-xs">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[9px] block text-white/70 font-sans">h</span>
            </div>
            <span className="font-bold text-amber-300">:</span>
            <div className="bg-[#721c24] px-2 py-0.5 rounded font-mono font-bold text-xs">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[9px] block text-white/70 font-sans">m</span>
            </div>
            <span className="font-bold text-amber-300">:</span>
            <div className="bg-[#721c24] px-2 py-0.5 rounded font-mono font-bold text-xs text-[#F68B1E]">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[9px] block text-[#F68B1E] font-sans">s</span>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            id="event-banner-register-btn"
            onClick={onOpenEvent}
            className="bg-[#F68B1E] hover:bg-[#e07a16] text-white text-xs font-black px-4 py-2 rounded-md shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Réserver Mon Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

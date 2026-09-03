'use client';

import React, { useState } from 'react';
import { Pet } from '@pets-care/types';
import { PassportModal } from './PassportModal';
import { ShieldCheck, Calendar, Weight, QrCode, Stethoscope, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PetCardProps {
  pet: Pet;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isSelected = false, onSelect }) => {
  const [passportOpen, setPassportOpen] = useState(false);

  return (
    <>
      <div
        onClick={onSelect}
        className={`relative p-5 rounded-2xl transition-all cursor-pointer border ${
          isSelected
            ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
            : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
        }`}
      >
        <div className="flex items-start gap-4">
          <img
            src={pet.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80'}
            alt={pet.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 truncate flex items-center gap-1.5">
                {pet.name}
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPassportOpen(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors border border-emerald-200"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Passport</span>
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
              {pet.breed} • {pet.ageFormatted || '2 yrs'}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold">
                <Weight className="w-3.5 h-3.5 text-slate-400" />
                {pet.weightKg} kg
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-500">
                {pet.allergies && pet.allergies.length > 0 ? `Allergic to: ${pet.allergies[0]}` : 'No known allergies'}
              </span>
            </div>
          </div>
        </div>

        {/* NEXT VACCINE COUNTDOWN BADGE */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-700">Next Booster:</span>
            <span className="font-bold text-emerald-700">
              {pet.nextVaccine ? pet.nextVaccine.name : 'Rabies Booster'}
            </span>
          </div>

          <Link
            href="/vets"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 font-bold text-xs text-emerald-600 hover:text-emerald-700"
          >
            <span>Book Clinic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <PassportModal pet={pet} isOpen={passportOpen} onClose={() => setPassportOpen(false)} />
    </>
  );
};

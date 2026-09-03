'use client';

import React from 'react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { X, ShieldCheck, AlertTriangle, Printer, Share2, Award } from 'lucide-react';
import { Pet } from '@pets-care/types';

interface PassportModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({ pet, isOpen, onClose }) => {
  if (!isOpen) return null;

  const passportUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/passport/${pet.passportUuid}`
    : `https://pets.care/passport/${pet.passportUuid}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pet.name}'s Official Pet Health Passport`,
          text: `Verified vaccination records, medical history, and emergency info for ${pet.name}.`,
          url: passportUrl,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(passportUrl);
      alert('Passport URL copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* PASSPORT HEADER BAND */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-300" />
            <div>
              <div className="text-xs font-black tracking-widest uppercase text-emerald-200">
                Official Digital Document
              </div>
              <h3 className="text-lg font-black tracking-tight">PET HEALTH PASSPORT</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {/* PASSPORT ID & VERIFICATION */}
          <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="font-mono font-bold text-slate-700">ID: {pet.passportUuid}</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Status
            </span>
          </div>

          {/* PET PROFILE ROW */}
          <div className="flex items-center gap-4">
            <img
              src={pet.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80'}
              alt={pet.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div className="flex-1">
              <h4 className="text-2xl font-black text-slate-900">{pet.name}</h4>
              <p className="text-xs font-semibold text-slate-500">
                {pet.breed} • {pet.species} • {pet.gender}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                  ⚖️ {pet.weightKg} kg
                </span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                  🩸 {pet.bloodType || 'DEA 1.1 Neg'}
                </span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                  {pet.isNeutered ? '✂️ Neutered' : 'Intact'}
                </span>
              </div>
            </div>
          </div>

          {/* ALLERGIES & MICROCHIP */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1 font-bold text-amber-800 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Critical Allergies
              </div>
              <p className="text-slate-700">
                {pet.allergies && pet.allergies.length > 0 ? pet.allergies.join(', ') : 'None documented'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-700 mb-1">Microchip Number</div>
              <p className="font-mono text-slate-900 font-semibold">{pet.microchipNumber || 'Not chipped'}</p>
            </div>
          </div>

          {/* SCANNABLE QR CODE FOR VETS */}
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center text-center">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-200 mb-2">
              <QRCodeDisplay value={passportUrl} size={150} />
            </div>
            <p className="text-xs font-bold text-emerald-900">VETERINARY & KENNEL QR ACCESS</p>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
              Veterinarians and boarders can scan this code with any phone camera to view full verified immunization records and prescriptions.
            </p>
          </div>

          {/* MODAL ACTIONS */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Passport
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

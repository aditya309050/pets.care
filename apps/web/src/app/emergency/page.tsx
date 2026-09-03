'use client';

import React, { useState, useEffect } from 'react';
import { EmergencySOSPacket } from '@pets-care/types';
import {
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  HeartPulse,
  Printer,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';

export default function EmergencySOSPage() {
  const [sosData, setSosData] = useState<EmergencySOSPacket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSOS = async () => {
      try {
        const token = localStorage.getItem('pets_care_token');
        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch('http://localhost:4000/api/emergency/sos', { headers });
        if (res.ok) {
          const data = await res.json();
          setSosData(data);
        }
      } catch (err) {
        console.error('Failed to fetch emergency SOS:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSOS();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* 1. TOP HIGH-CONTRAST EMERGENCY BANNER */}
      <div className="bg-red-600 px-4 py-5 shadow-2xl border-b-4 border-red-700 animate-pulse-sos">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center font-black text-2xl shadow-md">
              🚨
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-200">
                Active Critical Mode
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                1-TAP EMERGENCY SOS
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-red-500"
            >
              <Printer className="w-4 h-4" />
              <span>Print ER Intake Sheet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 2. IMMEDIATE FAST-DIAL ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:+918025259999"
            className="p-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-between shadow-lg shadow-red-600/30 transition-all group cursor-pointer"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-red-200">
                Nearest 24/7 Trauma ICU
              </div>
              <div className="text-xl font-black">Call Apex 24/7 Trauma</div>
              <div className="text-xs text-red-100 font-semibold">+91 80 2525 9999 (Tap to Call)</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </a>

          <a
            href="tel:1962"
            className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-between shadow-lg transition-all group cursor-pointer"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                National Government Hotline
              </div>
              <div className="text-xl font-black">Call Pet Ambulance</div>
              <div className="text-xs text-slate-300 font-semibold">Dial 1962 (Toll-Free SOS)</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 text-emerald-400" />
            </div>
          </a>
        </div>

        {/* 3. VITAL PATIENT ER DATA CARD */}
        {sosData && (
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <HeartPulse className="w-6 h-6 text-red-400" />
                <h2 className="text-lg font-black uppercase tracking-wider text-white">
                  Flash This Screen to Attending Veterinarian
                </h2>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-700 px-2.5 py-1 rounded-lg text-slate-300">
                ID: {sosData.pet.passportUuid}
              </span>
            </div>

            {/* PET SUMMARY STRIP */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-4">
                <img
                  src={sosData.pet.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80'}
                  alt={sosData.pet.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500"
                />
                <div>
                  <h3 className="text-2xl font-black text-white">{sosData.pet.name}</h3>
                  <p className="text-xs text-slate-400">
                    {sosData.pet.breed} • {sosData.pet.gender} • Weight: {sosData.pet.weightKg} kg
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Microchip: #{sosData.pet.microchipNumber || '985141004291884'}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-xs text-slate-400">Blood Type</div>
                <div className="text-base font-black text-emerald-400">
                  {sosData.pet.bloodType || 'DEA 1.1 Negative'}
                </div>
              </div>
            </div>

            {/* CRITICAL ALLERGIES ALERT */}
            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-red-300">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Critical Allergies & Contraindications</span>
              </div>
              <p className="text-xs text-red-100 font-semibold">
                {sosData.criticalAllergies.length > 0
                  ? `Known severe adverse reactions to: ${sosData.criticalAllergies.join(', ')}. Do not administer without testing.`
                  : 'No known allergies reported by owner.'}
              </p>
            </div>

            {/* ACTIVE MEDICATIONS */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Active Medications & Dosages
              </h3>
              {sosData.activeMedications.length === 0 ? (
                <div className="text-xs text-slate-500">None currently active.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sosData.activeMedications.map((m) => (
                    <div key={m.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-700 text-xs">
                      <div className="font-bold text-white">{m.medicationName}</div>
                      <div className="text-slate-400 mt-0.5">{m.dosage} ({m.frequency.replace('_', ' ')})</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EMERGENCY CONTACTS */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Pet Parents & Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {sosData.emergencyContacts.map((c, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{c.name} ({c.relationship})</div>
                      <div className="text-slate-400 mt-0.5">{c.phone}</div>
                    </div>
                    <a
                      href={`tel:${c.phone}`}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. EMERGENCY FIRST AID QUICK CHEAT SHEET */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <span>⚠️</span>
            <span>Pre-Arrival First Aid Guidance</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/60 space-y-1">
              <div className="font-bold text-white">Ingested Poison / Chocolate</div>
              <p className="text-slate-400">
                Do NOT induce vomiting with salt or hydrogen peroxide without a vet instruction. Bring the wrapper/sample with you.
              </p>
            </div>

            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/60 space-y-1">
              <div className="font-bold text-white">Active Seizures</div>
              <p className="text-slate-400">
                Do not hold their tongue or put fingers in their mouth. Move furniture away to prevent trauma; cushion their head gently.
              </p>
            </div>

            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/60 space-y-1">
              <div className="font-bold text-white">Heat Stroke / Heavy Panting</div>
              <p className="text-slate-400">
                Move to shade immediately. Wet paws and belly with cool (not freezing) water. Turn vehicle AC on maximum during transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

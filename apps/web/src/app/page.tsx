'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import {
  ShieldCheck,
  Heart,
  Stethoscope,
  Calendar,
  AlertTriangle,
  QrCode,
  Sparkles,
  ShieldAlert,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [activePet, setActivePet] = useState<'bruno' | 'luna'>('bruno');

  const petsData = {
    bruno: {
      name: 'Bruno',
      breed: 'Golden Retriever',
      age: '2 Years',
      weight: '28.5 kg',
      bloodType: 'DEA 1.1 Neg',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
      passportUuid: 'pass-bruno-gold-2026',
      allergies: ['Chicken protein', 'Dust mites'],
      nextVaccine: 'Rabies Booster (Defensor 3)',
      daysLeft: 25,
      vaccines: [
        { name: 'Rabies (Defensor 3)', status: 'UPCOMING', date: 'Due in 25 days' },
        { name: 'DHPP (Distemper, Parvo)', status: 'VALID', date: 'Protected until March 2027' },
        { name: 'Bordetella (Kennel Cough)', status: 'VALID', date: 'Protected until Jan 2027' },
      ],
      currentMed: 'Apoquel 16mg (Once daily)',
    },
    luna: {
      name: 'Luna',
      breed: 'Persian Longhair Cat',
      age: '1.4 Years',
      weight: '4.2 kg',
      bloodType: 'Type A',
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
      passportUuid: 'pass-luna-pers-2026',
      allergies: ['None documented'],
      nextVaccine: 'FVRCP Tri-cat Vaccine',
      daysLeft: 120,
      vaccines: [
        { name: 'FVRCP Core Vaccine', status: 'VALID', date: 'Protected until Dec 2026' },
        { name: 'Rabies Feline', status: 'VALID', date: 'Protected until Oct 2026' },
        { name: 'Deworming Protocol', status: 'VALID', date: 'Completed last week' },
      ],
      currentMed: 'None (Preventive health)',
    },
  };

  const pet = petsData[activePet];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN: HERO TEXT */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>🐾 Loved by 45,000+ Indian & Global Pet Parents</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Never miss your pet’s{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                  vaccination, medicine,
                </span>{' '}
                or vet checkup again.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                One verified digital ecosystem for everything your pet needs. Carry your pet’s official{' '}
                <strong className="text-slate-900 font-bold">Digital Health Passport</strong>, book top-rated nearby
                vets, automate reminders, and access 1-tap 24/7 trauma emergency care.
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Pet Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/emergency"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-base transition-all flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-5 h-5 text-red-600 animate-bounce" />
                  <span>1-Tap Emergency SOS</span>
                </Link>
              </div>

              {/* STATS STRIP */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 text-left">
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-semibold">Vaccine Adherence</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">1,250+</div>
                  <div className="text-xs text-slate-500 font-semibold">Verified Clinics</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">24/7</div>
                  <div className="text-xs text-slate-500 font-semibold">Instant SOS Support</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE DIGITAL HEALTH PASSPORT PREVIEW */}
            <div className="lg:col-span-5 relative">
              {/* Pet Switcher Toggle */}
              <div className="flex justify-center mb-3">
                <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl">
                  <button
                    onClick={() => setActivePet('bruno')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activePet === 'bruno'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🐕 Bruno (Dog)
                  </button>
                  <button
                    onClick={() => setActivePet('luna')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activePet === 'luna'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🐈 Luna (Cat)
                  </button>
                </div>
              </div>

              {/* PASSPORT CARD */}
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-emerald-500/80 overflow-hidden transform hover:scale-[1.01] transition-transform">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">
                        Official Health Passport
                      </span>
                      <h3 className="text-base font-black text-slate-900">DIGITAL PET PASSPORT</h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    {pet.passportUuid}
                  </span>
                </div>

                {/* Pet Photo & Main Info */}
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={pet.avatar}
                    alt={pet.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-black text-slate-900">{pet.name}</h4>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500">{pet.breed}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-700">
                      <span>⚖️ {pet.weight}</span>
                      <span>•</span>
                      <span>🎂 {pet.age}</span>
                      <span>•</span>
                      <span>🩸 {pet.bloodType}</span>
                    </div>
                  </div>
                </div>

                {/* VACCINE COUNTDOWN ALERT */}
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                      💉
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        Next Scheduled Booster
                      </div>
                      <div className="text-xs font-bold text-slate-900">{pet.nextVaccine}</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-emerald-600 text-white px-2.5 py-1 rounded-xl">
                    In {pet.daysLeft} Days
                  </span>
                </div>

                {/* VACCINE STATUS CHECKLIST */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Core Immunization Record
                  </div>
                  {pet.vaccines.map((v, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {v.name}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">{v.date}</span>
                    </div>
                  ))}
                </div>

                {/* QR CODE STRIP FOR VETS */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-6 -mb-6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                      <QRCodeDisplay
                        value={`https://pets.care/passport/${pet.passportUuid}`}
                        size={48}
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-slate-900">Veterinary QR Code</div>
                      <div className="text-[10px] text-slate-500">Scan to view full medical history</div>
                    </div>
                  </div>

                  <Link
                    href={`/passport/${pet.passportUuid}`}
                    className="text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-300 shadow-sm transition-colors"
                  >
                    View Passport →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 1-TAP EMERGENCY SOS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full text-white">
                <ShieldAlert className="w-4 h-4 text-white animate-spin" />
                INDUSTRY-FIRST FEATURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                When Seconds Count: 1-Tap Emergency SOS Mode
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                Sudden chocolate ingestion? High fever? Traffic accident? Tap SOS to immediately open verified 24/7
                trauma clinics within 5 km, instantly call national pet ambulance (1962), and display your pet’s
                critical blood type and allergies to the emergency vet.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/emergency"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 text-red-700 rounded-xl font-black text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Try Emergency SOS Simulator
                </Link>
                <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                  <span>✓ 24/7 Verified Emergency Centers</span>
                  <span>•</span>
                  <span>✓ Instant Triage Data</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-red-200">
                Live Emergency Packet
              </div>
              <div className="text-sm font-bold bg-white/10 p-2 rounded-lg">
                ⚠️ Critical Allergy: Chicken Protein
              </div>
              <div className="text-sm font-bold bg-white/10 p-2 rounded-lg">
                🩸 Blood Type: DEA 1.1 Negative
              </div>
              <div className="text-sm font-bold bg-white/10 p-2 rounded-lg">
                🏥 Nearest Trauma: Apex 24/7 (1.8 km)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            All-In-One Pet Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built to Solve the Real Headaches of Pet Parenting
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            No more misplaced paper vaccine booklets or missed booster windows. Every feature is crafted for simplicity and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
              📋
            </div>
            <h3 className="text-xl font-bold text-slate-900">Digital Pet Health Passport</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Permanent digital record containing breed history, microchip IDs, blood type, weight progression charts, and digital prescriptions shareable via QR code.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Explore Passport Features →
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl">
              💉
            </div>
            <h3 className="text-xl font-bold text-slate-900">Smart Reminders Engine</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automated reminders via WhatsApp, Push, and Calendar for rabies boosters, daily heartworm / allergy tablets, tick & flea treatments, and grooming.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              View Active Reminders →
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-2xl">
              🩺
            </div>
            <h3 className="text-xl font-bold text-slate-900">Verified Vet & Clinic Booking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find vetted small-animal clinics and emergency surgeons. Book instant clinic visits or start secure HD video consultations from home.
            </p>
            <Link
              href="/vets"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Browse Nearby Clinics →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AI PET HEALTH ASSISTANT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI Veterinary Guidance
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Got a Question in the Middle of the Night?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ask our AI assistant about sudden symptoms, food toxicities, or vaccination schedules tailored to your pet’s species, age, and weight. Built with strict medical guardrails to tell you when to seek immediate veterinary care.
              </p>
              <div className="pt-2">
                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Try AI Pet Assistant
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Example AI Triage Flow</span>
              </div>
              <div className="bg-slate-700/60 p-3 rounded-xl text-slate-200">
                <strong>You:</strong> "Bruno hasn't eaten since yesterday and seems tired."
              </div>
              <div className="bg-emerald-950/80 border border-emerald-800/60 p-3 rounded-xl text-emerald-200 space-y-2">
                <p>
                  <strong>AI:</strong> "Because Bruno is 28kg and has refused food for 24h with lethargy, this could indicate fever or gastrointestinal upset. Check his gums for moist pinkness..."
                </p>
                <div className="text-[11px] font-bold text-amber-300">
                  [Recommended: Book checkup with Dr. Vikram Sethi]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STARTUP DEMO LOGIN BARRIER BREAKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200/80 rounded-3xl p-8 text-center space-y-6 border border-slate-300">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Instant Demo Access — Test All 4 Roles</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Experience the complete multi-sided startup platform right now with 1-click accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              href="/login?role=OWNER"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="text-2xl mb-1">🐶</div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">Pet Parent Demo</div>
              <div className="text-[11px] text-slate-500">Bruno & Luna profiles, Reminders, QR Passport</div>
            </Link>

            <Link
              href="/login?role=VET"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="text-2xl mb-1">🩺</div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-teal-700">Veterinarian Demo</div>
              <div className="text-[11px] text-slate-500">Dr. Ananya Roy, Clinic Queue & Prescriptions</div>
            </Link>

            <Link
              href="/login?role=ADMIN"
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="text-2xl mb-1">🛡️</div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-slate-900">Admin Console Demo</div>
              <div className="text-[11px] text-slate-500">Verified clinics, user counts, system logs</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

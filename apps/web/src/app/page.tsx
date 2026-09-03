'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { InteractivePetImage } from '@/components/InteractivePetEyes';
import {
  ArrowUpRight,
  Play,
  ArrowRight,
  Plus,
  Star,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const [activePet, setActivePet] = useState<'bruno' | 'luna'>('bruno');

  // Mouse & touch tracking for eye and head movement
  const [mousePos, setMousePos] = useState({
    x: 600,
    y: 350,
    normX: 0,
    normY: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMousePos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        normX: 0,
        normY: 0,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to +1
      const normY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to +1
      setMousePos({
        x: e.clientX,
        y: e.clientY,
        normX,
        normY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
        const normY = (touch.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({
          x: touch.clientX,
          y: touch.clientY,
          normX,
          normY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // CozyPaws Hero Assets
  const assets = {
    productCard: 'https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png',
    videoCard: 'https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png',
    bottomLeft: 'https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png',
    bottomCenter: 'https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024',
    bottomRight: 'https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png',
    avatar: 'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128',
  };

  // Platform Pets Data for Interactive Passport Suite
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
    <div className="w-full bg-[#EFFDF0] text-[#1a3d1a] space-y-20 pb-20 overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. COZYPAWS HERO SECTION (Viewport-Height, 80% Content Frame)
      ────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[calc(100vh-68px)] min-h-[640px] max-h-[1080px] flex flex-col justify-between overflow-hidden select-none bg-[#EFFDF0]">
        {/* DESKTOP & TABLET VIEW (md and up: 80% width container) */}
        <div className="hidden md:flex flex-1 flex-col justify-between relative overflow-hidden w-[92%] sm:w-[85%] md:w-[80%] mx-auto">
          {/* TEXT LAYER (z-5) */}
          <div className="w-full text-center px-4 lg:px-8 pt-4 lg:pt-6 relative z-5">
            <h1 className="font-serif-display text-[#1a3d1a] text-6xl md:text-7xl lg:text-[clamp(60px,7.5vw,110px)] leading-[0.95] tracking-tight">
              <span className="block">
                <span className="inline-block animate-word-pop delay-200">Everything</span>
              </span>
              <span className="block mt-1">
                <span className="inline-block animate-word-pop delay-400">Your</span>{' '}
                <span className="inline-block animate-word-pop delay-500">Pets</span>{' '}
                <span className="inline-block animate-word-pop delay-600">Love</span>
              </span>
            </h1>
          </div>

          {/* LEFT PRODUCT CARD: left-0 top-[40px] */}
          <div className="absolute top-[40px] lg:top-[50px] left-0 z-20 w-[160px] lg:w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600 group">
            <div className="relative aspect-[260/257] rounded-2xl overflow-hidden shadow-md bg-white/40">
              <img
                src={assets.productCard}
                alt="Cozy Cat House"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Link
                href="/dashboard"
                aria-label="View Cozy Cat House"
                className="absolute bottom-2.5 right-2.5 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-2 text-left">
              <p className="text-gray-700 text-xs lg:text-[clamp(11px,1vw,14px)] font-medium leading-snug">
                Cozy Cat House
              </p>
              <p className="text-[#1a3d1a] font-bold text-sm lg:text-[clamp(13px,1.2vw,16px)] mt-0.5">
                $49.99
              </p>
            </div>
          </div>

          {/* RIGHT VIDEO CARD: right-0 top-[40px] */}
          <div className="absolute top-[40px] lg:top-[50px] right-0 z-20 w-[120px] lg:w-[clamp(120px,10vw,177px)] animate-slide-in-right delay-700 group">
            <div className="relative aspect-[177/287] rounded-2xl overflow-hidden shadow-md bg-white/40">
              <img
                src={assets.videoCard}
                alt="Video reviews"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-3 lg:bottom-4 flex justify-center">
                <button
                  aria-label="Play Video"
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                >
                  <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-white ml-0.5" />
                </button>
              </div>
            </div>
            <p className="text-[11px] lg:text-xs text-gray-700 font-medium leading-tight mt-2 text-center">
              Watch Product Reviews on TikTok and YouTube
            </p>
          </div>

          {/* BOTTOM 3 IMAGES (flex items-end, 80% width, z-10) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between pointer-events-none">
            {/* Left image: Dachshund */}
            <div className="flex-1 max-h-[min(65vh,52vw)] overflow-hidden pointer-events-auto">
              <InteractivePetImage
                src={assets.bottomLeft}
                alt="Dachshund dog"
                headFollowStrength={0.8}
                mousePos={mousePos}
                className="animate-photo-reveal delay-700"
              />
            </div>

            {/* Center image: Golden Retriever (tallest flex-[1.265]) */}
            <div className="flex-[1.265] max-h-[min(82vh,68vw)] overflow-hidden pointer-events-auto">
              <InteractivePetImage
                src={assets.bottomCenter}
                alt="Golden Retriever dog"
                headFollowStrength={1.2}
                mousePos={mousePos}
                className="animate-photo-reveal delay-600"
              />
            </div>

            {/* Right image: Ginger Cat */}
            <div className="flex-1 max-h-[min(65vh,52vw)] overflow-hidden pointer-events-auto">
              <InteractivePetImage
                src={assets.bottomRight}
                alt="Ginger cat"
                headFollowStrength={1.0}
                mousePos={mousePos}
                className="animate-photo-reveal delay-800"
              />
            </div>
          </div>

          {/* OVERLAYS ON BOTTOM IMAGES (z-20) */}
          <div
            style={{ bottom: 'clamp(18px, 3.5vh, 46px)' }}
            className="absolute left-0 right-0 z-20 px-4 lg:px-6 flex items-end justify-between pointer-events-auto"
          >
            {/* Left overlay: 98K+ stat */}
            <div className="animate-fade-up delay-1000 flex items-center gap-3 bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/70 shadow-md">
              <div>
                <div className="text-[#1a3d1a] font-bold text-lg lg:text-2xl leading-none">98K+</div>
                <div className="text-[11px] text-gray-600 font-medium">Happy Pets</div>
              </div>
              <div className="flex items-center -space-x-2">
                <img
                  src={assets.avatar}
                  alt="Happy customer"
                  className="w-7 h-7 rounded-full object-cover border-2 border-white"
                />
                <div className="w-7 h-7 rounded-full bg-[#1a3d1a] border-2 border-white flex items-center justify-center text-white">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Center overlay: Explore CTA */}
            <div className="animate-scale-in delay-1100 flex flex-col items-center text-center space-y-2">
              <h3 className="text-white font-bold text-base lg:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                Best Products for Your Pet
              </h3>
              <a
                href="#pet-passport-suite"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-semibold text-xs lg:text-sm shadow-xl hover:shadow-orange-500/40 transition-all hover:scale-105"
              >
                <span>Explore Products & Passport</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right overlay: 4.6 rating */}
            <div className="animate-fade-up delay-1200 flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/70 shadow-md">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#E86A10] fill-[#E86A10]" />
              </div>
              <div>
                <div className="text-[#1a3d1a] font-bold text-lg lg:text-2xl leading-none">4.6</div>
                <div className="text-[11px] text-gray-600 font-medium">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO VIEW (below md: screen-fitted) */}
        <div className="flex md:hidden flex-1 flex-col justify-between relative overflow-hidden w-[92%] mx-auto pt-2 pb-3">
          <div className="text-center space-y-1.5 z-20">
            <h1 className="font-serif-display text-4xl text-[#1a3d1a] leading-tight">
              Everything Your Pets Love
            </h1>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">
              Premium pet beds, wholesome treats, and complete digital pet health records.
            </p>
            <div className="pt-0.5">
              <a
                href="#pet-passport-suite"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E86A10] text-white font-bold text-xs shadow-md"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 z-20 my-auto">
            <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-white/80 shadow-xs">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-1">
                <img src={assets.productCard} alt="Cat house" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
              <div className="text-[11px] font-semibold text-gray-800 truncate">Cozy Cat House</div>
              <div className="text-xs font-bold text-[#1a3d1a]">$49.99</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-white/80 shadow-xs flex flex-col justify-between">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <img src={assets.videoCard} alt="Video card" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center shadow-md">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-gray-600 font-medium leading-tight text-center mt-1">
                Watch TikTok Reviews
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around bg-white/80 backdrop-blur-sm py-1.5 px-3 rounded-2xl border border-white/80 z-20 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="font-bold text-sm text-[#1a3d1a]">98K+</div>
              <div className="text-[10px] text-gray-500">Happy Pets</div>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#E86A10] fill-[#E86A10]" />
              <span className="font-bold text-sm text-[#1a3d1a]">4.6</span>
              <span className="text-[10px] text-gray-500">Rating</span>
            </div>
          </div>

          <div className="w-full flex items-end justify-between -mx-2 -mb-3 z-10 opacity-90">
            <div className="w-1/3">
              <InteractivePetImage
                src={assets.bottomLeft}
                alt="Dog"
                headFollowStrength={0.6}
                mousePos={mousePos}
              />
            </div>
            <div className="w-1/3">
              <InteractivePetImage
                src={assets.bottomCenter}
                alt="Golden Retriever"
                headFollowStrength={0.8}
                mousePos={mousePos}
              />
            </div>
            <div className="w-1/3">
              <InteractivePetImage
                src={assets.bottomRight}
                alt="Cat"
                headFollowStrength={0.7}
                mousePos={mousePos}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE PET HEALTH PASSPORT & PREVENTIVE CARE SUITE (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section
        id="pet-passport-suite"
        className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto pt-8 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: TEXT & HEADLINE */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>🐾 Verified Health Records & Veterinary Booking</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Never miss your pet’s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                vaccination, medicine,
              </span>{' '}
              or vet checkup again.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              One verified digital ecosystem for everything your pet needs. Carry your pet’s official{' '}
              <strong className="text-slate-900 font-bold">Digital Health Passport</strong>, book top-rated nearby
              vets, automate reminders, and access 1-tap 24/7 trauma emergency care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white font-black text-sm shadow-lg hover:shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Open Pet Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/emergency"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-sm transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />
                <span>1-Tap Emergency SOS</span>
              </Link>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-emerald-200/80 text-left">
              <div>
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-semibold">Vaccine Adherence</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">1,250+</div>
                <div className="text-xs text-slate-500 font-semibold">Verified Clinics</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-700">24/7</div>
                <div className="text-xs text-slate-500 font-semibold">Instant SOS Support</div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE PASSPORT PREVIEW (Cleanly constrained, no overflow) */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            <div className="flex justify-center mb-3">
              <div className="inline-flex p-1 bg-emerald-100/70 rounded-2xl border border-emerald-200/60">
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

            <div className="relative w-full max-w-[420px] bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-emerald-500/80 overflow-hidden">
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

              {/* Avatar fixed square with shrink-0 */}
              <div className="flex items-center gap-3.5 py-4">
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black text-slate-900 truncate">{pet.name}</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 truncate">{pet.breed}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs font-bold text-slate-700">
                    <span>⚖️ {pet.weight}</span>
                    <span>•</span>
                    <span>🎂 {pet.age}</span>
                    <span>•</span>
                    <span>🩸 {pet.bloodType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    💉
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Next Scheduled Booster
                    </div>
                    <div className="text-xs font-bold text-slate-900">{pet.nextVaccine}</div>
                  </div>
                </div>
                <span className="text-xs font-black bg-emerald-600 text-white px-2.5 py-1 rounded-xl shrink-0">
                  In {pet.daysLeft} Days
                </span>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Core Immunization Record
                </div>
                {pet.vaccines.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {v.name}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 shrink-0">{v.date}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-6 -mb-6 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-white rounded-lg border border-slate-200 shrink-0">
                    <QRCodeDisplay
                      value={`https://pets.care/passport/${pet.passportUuid}`}
                      size={40}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900">Veterinary QR Code</div>
                    <div className="text-[10px] text-slate-500">Scan to view full medical history</div>
                  </div>
                </div>

                <Link
                  href={`/passport/${pet.passportUuid}`}
                  className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-300 shadow-sm transition-colors shrink-0"
                >
                  View Passport →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. 1-TAP EMERGENCY SOS MODE HIGHLIGHT (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto">
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

      {/* ──────────────────────────────────────────────────────────
          4. CORE FEATURES GRID (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            All-In-One Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built to Solve the Real Headaches of Pet Parenting
          </h2>
          <p className="text-sm text-slate-600">
            No more misplaced paper vaccine booklets or missed booster windows. Every feature is crafted for simplicity and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
              📋
            </div>
            <h3 className="text-xl font-bold text-slate-900">Digital Pet Health Passport</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Permanent digital record containing breed history, microchip IDs, blood type, weight progression charts, and digital prescriptions shareable via QR code.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
            >
              Explore Passport Features →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl">
              💉
            </div>
            <h3 className="text-xl font-bold text-slate-900">Smart Reminders Engine</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automated reminders via WhatsApp, Push, and Calendar for rabies boosters, daily heartworm / allergy tablets, tick & flea treatments, and grooming.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
            >
              View Active Reminders →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-2xl">
              🩺
            </div>
            <h3 className="text-xl font-bold text-slate-900">Verified Vet & Clinic Booking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find vetted small-animal clinics and emergency surgeons. Book instant clinic visits or start secure HD video consultations from home.
            </p>
            <Link
              href="/vets"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
            >
              Browse Nearby Clinics →
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. AI PET HEALTH ASSISTANT TEASER (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto">
        <div className="bg-[#1a3d1a] rounded-3xl p-8 md:p-12 text-white border border-emerald-900 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-white/10 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI Veterinary Guidance
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Got a Question in the Middle of the Night?
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Ask our AI assistant about sudden symptoms, food toxicities, or vaccination schedules tailored to your pet’s species, age, and weight. Built with strict medical guardrails to tell you when to seek immediate veterinary care.
              </p>
              <div className="pt-2">
                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E86A10] hover:bg-[#d45e0d] text-white font-black text-sm transition-colors shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  Try AI Pet Assistant
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/25 p-5 rounded-2xl border border-white/10 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Example AI Triage Flow</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl text-white">
                <strong>You:</strong> "Bruno hasn't eaten since yesterday and seems tired."
              </div>
              <div className="bg-emerald-950/80 border border-emerald-700/60 p-3 rounded-xl text-emerald-200 space-y-2">
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

      {/* ──────────────────────────────────────────────────────────
          6. INSTANT ONE-CLICK DEMO ACCESS (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center space-y-6 border border-emerald-200 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-[#1a3d1a]">Instant Demo Access — Test All 4 Roles</h3>
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

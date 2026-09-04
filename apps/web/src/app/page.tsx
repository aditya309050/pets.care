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
  Cpu,
  Check,
  Calendar,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const [activePet, setActivePet] = useState<'bruno' | 'luna'>('bruno');

  // Mouse & touch tracking for 3D pet head movement
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
      gender: 'Male • Neutered',
      age: '2 Years',
      weight: '28.5 kg',
      bloodType: 'DEA 1.1 Neg',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
      passportUuid: 'pass-bruno-gold-2026',
      microchip: '985-141-002-847',
      allergies: ['Chicken', 'Dust mites'],
      nextVaccine: 'Rabies Booster (Defensor 3)',
      daysLeft: 25,
      clinic: 'Apex 24/7 Trauma Vet Care',
      vaccines: [
        { name: 'Rabies (Defensor 3)', status: 'UPCOMING', date: 'Due in 25 days', type: 'Core Annual' },
        { name: 'DHPP (Distemper, Parvo)', status: 'VALID', date: 'Protected until Mar 2027', type: 'Core 3-Year' },
        { name: 'Bordetella (Kennel Cough)', status: 'VALID', date: 'Protected until Jan 2027', type: 'Annual' },
      ],
      currentMed: 'Apoquel 16mg (Once daily)',
    },
    luna: {
      name: 'Luna',
      breed: 'Persian Longhair Cat',
      gender: 'Female • Spayed',
      age: '1.4 Years',
      weight: '4.2 kg',
      bloodType: 'Type A',
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
      passportUuid: 'pass-luna-pers-2026',
      microchip: '985-141-009-321',
      allergies: ['None'],
      nextVaccine: 'FVRCP Tri-cat Vaccine',
      daysLeft: 120,
      clinic: 'City Feline Specialty Clinic',
      vaccines: [
        { name: 'FVRCP Core Vaccine', status: 'VALID', date: 'Protected until Dec 2026', type: 'Core Annual' },
        { name: 'Rabies Feline', status: 'VALID', date: 'Protected until Oct 2026', type: 'Core Annual' },
        { name: 'Deworming Protocol', status: 'VALID', date: 'Completed last week', type: 'Quarterly' },
      ],
      currentMed: 'None (Preventive health)',
    },
  };

  const pet = petsData[activePet];

  return (
    <div className="w-full bg-[#EFFDF0] text-[#1a3d1a] space-y-20 pb-20 overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. COZYPAWS HERO SECTION (FULL WIDTH, VIEWPORT-HEIGHT)
      ────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[calc(100vh-68px)] min-h-[640px] max-h-[1080px] flex flex-col justify-between overflow-hidden select-none bg-[#EFFDF0]">
        {/* DESKTOP & TABLET VIEW (md and up: FULL WIDTH EDGE-TO-EDGE) */}
        <div className="hidden md:flex flex-1 flex-col justify-between relative overflow-hidden w-full">
          {/* TEXT LAYER (z-5) */}
          <div className="w-full text-center px-6 lg:px-12 pt-4 lg:pt-6 relative z-5">
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

          {/* LEFT PRODUCT CARD: left-6 lg:left-12 */}
          <div className="absolute top-[40px] lg:top-[50px] left-6 lg:left-12 z-20 w-[160px] lg:w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600 group">
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

          {/* RIGHT VIDEO CARD: right-6 lg:right-12 */}
          <div className="absolute top-[40px] lg:top-[50px] right-6 lg:right-12 z-20 w-[120px] lg:w-[clamp(120px,10vw,177px)] animate-slide-in-right delay-700 group">
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

          {/* BOTTOM 3 IMAGES (flex items-end, FULL WIDTH left-0 right-0, z-10) */}
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

          {/* OVERLAYS ON BOTTOM IMAGES (FULL WIDTH px-8 lg:px-16, z-20) */}
          <div
            style={{ bottom: 'clamp(18px, 3.5vh, 46px)' }}
            className="absolute left-0 right-0 z-20 px-8 lg:px-16 flex items-end justify-between pointer-events-auto"
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

        {/* MOBILE HERO VIEW (below md: full width padding) */}
        <div className="flex md:hidden flex-1 flex-col justify-between relative overflow-hidden w-full px-4 pt-2 pb-3">
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

          <div className="w-full flex items-end justify-between -mx-4 -mb-3 z-10 opacity-90">
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
          2. THE PET HEALTH PASSPORT & PREVENTIVE CARE SUITE
      ────────────────────────────────────────────────────────── */}
      <section
        id="pet-passport-suite"
        className="w-[92%] sm:w-[80%] md:w-[70%] mx-auto pt-8 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* LEFT: TEXT & HEADLINE (Narrowed width to let the card take prominence) */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>🐾 Verified Health Records & Vet Booking</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[2.85rem] font-black text-slate-900 tracking-tight leading-[1.14]">
              Never miss your pet’s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                vaccination, medicine,
              </span>{' '}
              or vet checkup again.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
              One verified digital ecosystem for everything your pet needs. Carry your pet’s official{' '}
              <strong className="text-slate-900 font-bold">Digital Health Passport</strong>, book top-rated nearby
              vets, automate reminders, and access 1-tap 24/7 trauma emergency care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#1a3d1a] hover:bg-[#255225] text-white font-black text-sm shadow-md hover:shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Open Pet Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/emergency"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-sm transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />
                <span>1-Tap Emergency SOS</span>
              </Link>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-emerald-200/80 text-left">
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

          {/* RIGHT: INTERACTIVE PASSPORT PREVIEW (Expanded Width & Premium Card) */}
          <div className="lg:col-span-7 relative w-full flex flex-col items-center lg:items-end">
            <div className="flex justify-center lg:justify-end w-full max-w-[620px] mb-3">
              <div className="inline-flex p-1 bg-emerald-100/80 rounded-2xl border border-emerald-200/80 shadow-sm gap-1">
                <button
                  onClick={() => setActivePet('bruno')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activePet === 'bruno'
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-emerald-500/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <img
                    src={petsData.bruno.avatar}
                    alt="Bruno"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>🐕 Bruno (Dog)</span>
                </button>
                <button
                  onClick={() => setActivePet('luna')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activePet === 'luna'
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-emerald-500/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <img
                    src={petsData.luna.avatar}
                    alt="Luna"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>🐈 Luna (Cat)</span>
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-[620px] bg-gradient-to-b from-white via-white to-emerald-50/25 rounded-[28px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(26,61,26,0.12)] border-2 border-emerald-500/80 overflow-hidden transition-all duration-300">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header: Official Passport branding + ISO Chip tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100/90 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                        Official Health Passport
                      </span>
                      <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                        ISO 11784
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      DIGITAL PET PASSPORT
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                    <Cpu className="w-3 h-3 text-emerald-600" />
                    CHIP: {pet.microchip}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">ID: {pet.passportUuid}</span>
                </div>
              </div>

              {/* Pet Identity Row (Photo + Details & 4 Vitals) */}
              <div className="py-4 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative shrink-0 self-center sm:self-auto">
                    <img
                      src={pet.avatar}
                      alt={pet.name}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{pet.name}</h4>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-700" />
                        Verified Patient
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {pet.breed} • <span className="text-slate-600">{pet.gender}</span>
                    </p>

                    {/* 4 Vitals Pill Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                      <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 text-center sm:text-left">
                        <span className="text-[10px] text-slate-400 font-medium block">Weight</span>
                        <span className="font-extrabold text-slate-800">⚖️ {pet.weight}</span>
                      </div>
                      <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 text-center sm:text-left">
                        <span className="text-[10px] text-slate-400 font-medium block">Age</span>
                        <span className="font-extrabold text-slate-800">🎂 {pet.age}</span>
                      </div>
                      <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 text-center sm:text-left">
                        <span className="text-[10px] text-slate-400 font-medium block">Blood Type</span>
                        <span className="font-extrabold text-slate-800">🩸 {pet.bloodType}</span>
                      </div>
                      <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 text-center sm:text-left truncate">
                        <span className="text-[10px] text-slate-400 font-medium block">Allergies</span>
                        <span className="font-extrabold text-amber-700 truncate block">
                          {pet.allergies[0] || 'None'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Scheduled Booster Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 p-3.5 rounded-2xl border border-emerald-200/90 mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-emerald-700/20 shrink-0">
                    💉
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                        Next Scheduled Booster
                      </span>
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">{pet.nextVaccine}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{pet.clinic}</div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                  <span className="text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl shadow-sm">
                    In {pet.daysLeft} Days
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold mt-1">Auto-Remind Active</span>
                </div>
              </div>

              {/* Core Immunization Records (Wider 3-column / compact grid) */}
              <div className="space-y-2 mb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <span>Verified Immunization Records</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    All 3 Validated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {pet.vaccines.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400">{v.type}</span>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                            v.status === 'VALID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {v.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 truncate" title={v.name}>
                        {v.name}
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{v.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Bar: QR Code + Quick Passport Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/80 -mx-5 sm:-mx-7 -mb-5 sm:-mb-7 p-4 sm:p-5 relative z-10">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">
                    <QRCodeDisplay
                      value={`https://pets.care/passport/${pet.passportUuid}`}
                      size={42}
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                      <span>Veterinary Instant Scan</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        LIVE
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Instant access for clinics, groomers & kennels
                    </div>
                  </div>
                </div>

                <Link
                  href={`/passport/${pet.passportUuid}`}
                  className="w-full sm:w-auto text-xs font-black text-white bg-[#1a3d1a] hover:bg-[#255225] px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Open Live Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {/* ──────────────────────────────────────────────────────────
          3. 1-TAP EMERGENCY SOS MODE HIGHLIGHT (80% Width)
      ────────────────────────────────────────────────────────── */}
      {/* <section className="w-[92%] sm:w-[85%] md:w-[80%] mx-auto">
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
      </section>  */}

      {/* ──────────────────────────────────────────────────────────
          4. CORE FEATURES GRID (80% Width)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[80%] md:w-[70%] mx-auto space-y-10">
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
      <section className="w-[92%] sm:w-[80%] md:w-[70%] mx-auto">
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
          6. INSTANT ONE-CLICK DEMO ACCESS (Full Width Container)
      ────────────────────────────────────────────────────────── */}
      <section className="w-[92%] sm:w-[80%] md:w-[70%] mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-[32px] p-6 sm:p-10 text-center space-y-8 border border-emerald-200/80 shadow-[0_20px_50px_rgba(26,61,26,0.06)] relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl mx-auto space-y-2 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              Instant Interactive Sandbox
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a3d1a] tracking-tight">
              Instant Demo Access — Test Platform Roles
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Experience the complete multi-sided startup platform right now with verified 1-click accounts.
            </p>
          </div>

          {/* Full-Width Grid of 3 High-Impact Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10 text-left">
            {/* 1. PET PARENT DEMO CARD */}
            <Link
              href="/login?role=OWNER"
              className="group relative rounded-3xl p-[2px] bg-gradient-to-b from-emerald-200/80 via-slate-100 to-emerald-200/80 hover:from-emerald-500 hover:via-teal-400 hover:to-emerald-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-950/15 hover:-translate-y-2.5 flex flex-col justify-between"
            >
              <div className="bg-white rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
                {/* Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Top Corner Ambient Glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-100/50 rounded-full blur-2xl group-hover:bg-emerald-200/60 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Live Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-2xl flex items-center justify-center shadow-xs group-hover:scale-115 group-hover:rotate-6 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300">
                      <span className="group-hover:brightness-200 transition-all">🐶</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-800 border border-slate-200/60 group-hover:border-emerald-200 transition-colors">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      1-Click Ready
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                      Pet Parent Portal
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-950 transition-colors">
                      Pet Owner Demo
                    </h4>
                    <p className="text-xs font-semibold text-slate-400">
                      aditya@pets.care • Bruno & Luna
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-3">
                    Explore Bruno and Luna’s profiles, interactive digital health passports, automated booster countdowns, and instant vet bookings.
                  </p>

                  {/* Capability Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-emerald-200 group-hover:text-emerald-800 transition-colors">
                      🐾 QR Passport
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-emerald-200 group-hover:text-emerald-800 transition-colors">
                      💉 Vaccines
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-emerald-200 group-hover:text-emerald-800 transition-colors">
                      ⏰ Reminders
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                  <span>Launch Pet Parent Mode</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1a3d1a] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 2. VETERINARIAN DEMO CARD */}
            <Link
              href="/login?role=VET"
              className="group relative rounded-3xl p-[2px] bg-gradient-to-b from-teal-200/80 via-slate-100 to-teal-200/80 hover:from-teal-500 hover:via-emerald-400 hover:to-teal-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-teal-950/15 hover:-translate-y-2.5 flex flex-col justify-between"
            >
              <div className="bg-white rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
                {/* Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Top Corner Ambient Glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-teal-100/50 rounded-full blur-2xl group-hover:bg-teal-200/60 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Live Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 text-2xl flex items-center justify-center shadow-xs group-hover:scale-115 group-hover:-rotate-6 group-hover:bg-teal-600 group-hover:border-teal-600 transition-all duration-300">
                      <span className="group-hover:brightness-200 transition-all">🩺</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 group-hover:bg-teal-50 text-slate-600 group-hover:text-teal-800 border border-slate-200/60 group-hover:border-teal-200 transition-colors">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                      </span>
                      1-Click Ready
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-teal-700">
                      Clinical Care Suite
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-teal-950 transition-colors">
                      Veterinarian Demo
                    </h4>
                    <p className="text-xs font-semibold text-slate-400">
                      dr.ananya@pets.care • Apex Hospital
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-3">
                    Review patient appointments, access electronic health records, issue digital prescriptions, and manage emergency trauma hospital intake.
                  </p>

                  {/* Capability Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-teal-200 group-hover:text-teal-800 transition-colors">
                      🏥 Patient Queue
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-teal-200 group-hover:text-teal-800 transition-colors">
                      💊 Digital Rx
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-teal-200 group-hover:text-teal-800 transition-colors">
                      📅 Slots
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-teal-800 transition-colors">
                  <span>Launch Veterinarian Mode</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1a3d1a] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 3. ADMIN CONSOLE DEMO CARD */}
            <Link
              href="/login?role=ADMIN"
              className="group relative rounded-3xl p-[2px] bg-gradient-to-b from-indigo-200/80 via-slate-100 to-indigo-200/80 hover:from-indigo-500 hover:via-purple-400 hover:to-indigo-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-950/15 hover:-translate-y-2.5 flex flex-col justify-between"
            >
              <div className="bg-white rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
                {/* Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Top Corner Ambient Glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-100/50 rounded-full blur-2xl group-hover:bg-indigo-200/60 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Live Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-2xl flex items-center justify-center shadow-xs group-hover:scale-115 group-hover:rotate-3 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                      <span className="group-hover:brightness-200 transition-all">🛡️</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-800 border border-slate-200/60 group-hover:border-indigo-200 transition-colors">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      1-Click Ready
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                      System Governance
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-950 transition-colors">
                      Admin Console Demo
                    </h4>
                    <p className="text-xs font-semibold text-slate-400">
                      admin@pets.care • Full Privileges
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-3">
                    Audit platform clinics, monitor real-time user registrations, verify emergency hospital credentials, and inspect system audit logs.
                  </p>

                  {/* Capability Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-indigo-200 group-hover:text-indigo-800 transition-colors">
                      🏢 1,250 Clinics
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-indigo-200 group-hover:text-indigo-800 transition-colors">
                      📊 Metrics
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-indigo-200 group-hover:text-indigo-800 transition-colors">
                      🔐 Audit Logs
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-indigo-800 transition-colors">
                  <span>Launch Admin Console</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1a3d1a] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

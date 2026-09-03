'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, HeartPulse, Stethoscope, Sparkles, BookOpen, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  useEffect(() => {
    // Check local storage for demo user
    const saved = localStorage.getItem('pets_care_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    } else {
      // Default demo user
      setUser({ fullName: 'Aditya Sharma', role: 'OWNER' });
    }
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: HeartPulse },
    { href: '/vets', label: 'Find Vets', icon: Stethoscope },
    { href: '/assistant', label: 'AI Vet Care', icon: Sparkles },
    { href: '/passport/pass-bruno-gold-2026', label: 'Passport QR', icon: BookOpen },
    { href: '/emergency', label: '1-Tap SOS', icon: ShieldAlert, isEmergency: true },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🐾</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                pets<span className="text-emerald-600">.care</span>
              </span>
              <span className="block text-[10px] font-semibold text-emerald-700 tracking-wider uppercase -mt-1">
                Health Operating System
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.isEmergency) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow-red-500/30 transition-all animate-pulse-sos"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION: USER PROFILE / LOGIN */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.fullName.charAt(0)}
                </div>
                <span>{user.fullName}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                  {user.role}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/emergency"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600 text-white font-bold text-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  item.isEmergency
                    ? 'text-red-600 font-bold bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Logged in as {user?.fullName || 'Guest'}</span>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              Switch Account →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

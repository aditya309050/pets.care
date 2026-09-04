'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  Star,
  ShieldAlert,
  Menu,
  X,
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pets_care_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    } else {
      setUser({ fullName: 'Aditya Sharma', role: 'OWNER' });
    }
  }, []);

  const logoSvg = 'https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg';
  const avatarUrl = 'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/vets', label: 'Find Vets' },
    { href: '/assistant', label: 'AI Vet Care' },
    { href: '/passport/pass-bruno-gold-2026', label: 'Passport QR' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-6 sm:px-8 lg:px-12 py-3.5 bg-[#EFFDF0]/90 backdrop-blur-md border-b border-emerald-200/60 flex items-center justify-between transition-all">
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center group">
          <img
            src={logoSvg}
            alt="CozyPaws pets.care"
            className="w-[130px] h-[33px] lg:w-[190px] lg:h-[48px] object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <span className="hidden xl:inline-flex text-[10px] font-black uppercase tracking-wider bg-emerald-100/80 text-[#1a3d1a] border border-emerald-200 px-2 py-0.5 rounded-md">
          Operating System
        </span>
      </div>

      {/* CENTER NAV LINKS */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors py-1 ${
                isActive
                  ? 'text-[#1a3d1a] font-bold border-b-2 border-[#1a3d1a]'
                  : 'text-gray-600 hover:text-[#1a3d1a]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        {/* 1-Tap SOS Button */}
        <Link
          href="/emergency"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm hover:shadow-red-500/20 transition-all animate-pulse-sos"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>1-Tap SOS</span>
        </Link>
      </nav>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Search button */}
        <Link
          href="/vets"
          aria-label="Search"
          className="hidden sm:flex w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-gray-300/80 bg-white/70 hover:bg-white items-center justify-center text-gray-700 hover:text-gray-900 transition-all hover:scale-105"
        >
          <Search className="w-4 h-4" />
        </Link>

        {/* Favorites button */}
        <Link
          href="/dashboard"
          aria-label="Favorites"
          className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
        >
          <Star className="w-4 h-4 fill-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
            4
          </span>
        </Link>

        {/* Cart button */}
        <Link
          href="/dashboard"
          aria-label="Cart"
          className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-gray-300/80 bg-white/70 hover:bg-white flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all hover:scale-105"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
            1
          </span>
        </Link>

        {/* User Avatar */}
        <Link href="/dashboard" className="flex items-center gap-2 group ml-0.5">
          <img
            src={avatarUrl}
            alt="User profile"
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white shadow-xs group-hover:ring-2 group-hover:ring-[#1a3d1a]/20 transition-all"
          />
          {user && (
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-[#1a3d1a] leading-tight truncate max-w-[90px]">
                {user.fullName.split(' ')[0]}
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold">{user.role}</div>
            </div>
          )}
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-gray-700 hover:bg-white/60 ml-1"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#EFFDF0]/98 backdrop-blur-lg border-b border-emerald-200 px-6 py-4 space-y-3 shadow-xl animate-fade-in">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-800 hover:text-[#1a3d1a]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 text-sm font-bold text-red-600 pt-1"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>1-Tap Emergency SOS</span>
          </Link>
        </div>
      )}
    </header>
  );
};

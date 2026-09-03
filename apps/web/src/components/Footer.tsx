import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-lg font-black tracking-tight text-white">
                pets<span className="text-emerald-400">.care</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The modern pet parenting & veterinary health platform. Digital Health Passports, automated vaccination reminders, and 1-tap 24/7 trauma emergency care.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live Across India
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Core Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Pet Health Passport
                </Link>
              </li>
              <li>
                <Link href="/vets" className="hover:text-emerald-400 transition-colors">
                  Find & Book Vets
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-red-400 transition-colors flex items-center gap-1 text-red-400 font-semibold">
                  🚨 1-Tap Emergency SOS
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-emerald-400 transition-colors">
                  AI Symptom Checker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">For Clinics & Partners</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Veterinarian Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Groomer & Boarding Sitter Onboarding
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Admin Command Console
                </Link>
              </li>
              <li>
                <span className="text-slate-500">API & Integration Partners</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">24/7 National Helplines</h4>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Pet Emergency SOS</div>
                <div className="text-sm font-bold text-white tracking-wide">1962 (Toll Free)</div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Apex 24/7 Trauma Hotline</div>
                <div className="text-sm font-bold text-emerald-400">+91 80 2525 9999</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 pets.care Inc. All rights reserved. Made with ❤️ for pets.</div>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Veterinary Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

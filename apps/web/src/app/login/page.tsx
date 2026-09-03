'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Lock, Mail, ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role');

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // One-click demo login helper
  const handleDemoLogin = async (role: 'OWNER' | 'VET' | 'ADMIN') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        throw new Error('Demo login failed');
      }

      const data = await res.json();
      localStorage.setItem('pets_care_token', data.token);
      localStorage.setItem('pets_care_user', JSON.stringify(data.user));

      if (role === 'VET') {
        router.push('/vets');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRole === 'OWNER' || initialRole === 'VET' || initialRole === 'ADMIN') {
      handleDemoLogin(initialRole as any);
    }
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignup
      ? { email, password, fullName, role: 'OWNER' }
      : { email, password };

    try {
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication error');
      }

      localStorage.setItem('pets_care_token', data.token);
      localStorage.setItem('pets_care_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* LOGO & TITLE */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl mx-auto shadow-md shadow-emerald-500/20">
            🐾
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isSignup ? 'Create pets.care Account' : 'Welcome to pets.care'}
          </h1>
          <p className="text-xs text-slate-500">
            {isSignup
              ? 'Get instant Digital Health Passports for your pets'
              : 'Sign in to access your pets, vaccines, and bookings'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            {error}
          </div>
        )}

        {/* 1-CLICK INSTANT DEMO LOGIN BUTTONS */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center">
            Instant One-Click Demo Access
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('OWNER')}
              disabled={loading}
              className="p-2 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 text-slate-800 text-center transition-all shadow-xs"
            >
              <div className="text-base">🐶</div>
              <div className="text-[10px] font-bold mt-0.5">Pet Owner</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('VET')}
              disabled={loading}
              className="p-2 bg-white hover:bg-teal-50 rounded-xl border border-slate-200 hover:border-teal-300 text-slate-800 text-center transition-all shadow-xs"
            >
              <div className="text-base">🩺</div>
              <div className="text-[10px] font-bold mt-0.5">Veterinarian</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('ADMIN')}
              disabled={loading}
              className="p-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-800 text-center transition-all shadow-xs"
            >
              <div className="text-base">🛡️</div>
              <div className="text-[10px] font-bold mt-0.5">Admin</div>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 absolute">
            Or Use Email
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aditya Sharma"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya@pets.care"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            {isSignup
              ? 'Already have an account? Sign In'
              : "Don't have an account yet? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-xs text-slate-400">
          Loading authentication...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}


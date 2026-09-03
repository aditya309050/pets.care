'use client';

import React, { useState, useEffect } from 'react';
import { Pet, Vaccination, Medication, HealthRecord, Reminder } from '@pets-care/types';
import { PetCard } from '@/components/PetCard';
import { PassportModal } from '@/components/PassportModal';
import { AddPetModal } from '@/components/AddPetModal';
import {
  ShieldAlert,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Pill,
  Award,
  Stethoscope,
  ChevronRight,
  QrCode,
  FileText,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vaccines' | 'meds' | 'records'>('vaccines');

  const [passportOpen, setPassportOpen] = useState(false);
  const [addPetOpen, setAddPetOpen] = useState(false);

  // Load pets and reminders
  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('pets_care_token');
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. Fetch pets
      const petsRes = await fetch('http://localhost:4000/api/pets', { headers });
      if (petsRes.ok) {
        const petsData = await petsRes.json();
        setPets(petsData);
        if (petsData.length > 0 && !selectedPetId) {
          setSelectedPetId(petsData[0].id);
        }
      }

      // 2. Fetch reminders
      const remRes = await fetch('http://localhost:4000/api/reminders', { headers });
      if (remRes.ok) {
        const remData = await remRes.json();
        setReminders(remData);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load specific pet health details when selectedPetId changes
  useEffect(() => {
    if (!selectedPetId) return;

    const loadPetHealth = async () => {
      try {
        const token = localStorage.getItem('pets_care_token');
        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

        const [vRes, mRes, rRes] = await Promise.all([
          fetch(`http://localhost:4000/api/health/vaccinations?petId=${selectedPetId}`, { headers }),
          fetch(`http://localhost:4000/api/health/medications?petId=${selectedPetId}`, { headers }),
          fetch(`http://localhost:4000/api/health/records?petId=${selectedPetId}`, { headers }),
        ]);

        if (vRes.ok) setVaccinations(await vRes.json());
        if (mRes.ok) setMedications(await mRes.json());
        if (rRes.ok) setHealthRecords(await rRes.json());
      } catch (err) {
        console.error('Failed to load pet health records:', err);
      }
    };

    loadPetHealth();
  }, [selectedPetId]);

  useEffect(() => {
    loadData();
  }, []);

  const currentPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const handleToggleReminder = async (reminderId: string) => {
    try {
      const token = localStorage.getItem('pets_care_token');
      const res = await fetch(`http://localhost:4000/api/reminders/${reminderId}/toggle`, {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const updated = await res.json();
        setReminders((prev) => prev.map((r) => (r.id === reminderId ? updated : r)));
      }
    } catch (err) {
      console.error('Failed to toggle reminder:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP GREETING & EMERGENCY SOS ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Pet Parenting Command Center</h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Managing health, vaccines, medications, and clinic appointments for your pets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddPetOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </button>

          <Link
            href="/emergency"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-500/20 transition-all animate-pulse-sos"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>1-TAP EMERGENCY SOS</span>
          </Link>
        </div>
      </div>

      {/* 2. PET SELECTOR CAROUSEL / ROW */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Your Registered Pets</h2>
          <span className="text-xs text-slate-500 font-semibold">{pets.length} Pets under care</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((p) => (
            <PetCard
              key={p.id}
              pet={p}
              isSelected={p.id === selectedPetId}
              onSelect={() => setSelectedPetId(p.id)}
            />
          ))}

          {/* Add Pet Quick Card */}
          <button
            onClick={() => setAddPetOpen(true)}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex flex-col items-center justify-center text-center transition-all group min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-700 flex items-center justify-center mb-2 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-900">
              Register Another Pet
            </span>
            <span className="text-[11px] text-slate-400">Generate Digital Passport</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE: ACTIVE PET DETAILS & REMINDERS */}
      {currentPet && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLS: DIGITAL HEALTH PASSPORT DEEP DIVE */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
            {/* PET HERO SUMMARY BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={currentPet.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80'}
                  alt={currentPet.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900">{currentPet.name}</h3>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      ✓ Passport Verified
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {currentPet.breed} • {currentPet.species} • Microchip: #{currentPet.microchipNumber || '98514...'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPassportOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Show Passport QR</span>
                </button>
                <Link
                  href="/vets"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  <span>Book Vet</span>
                </Link>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
              <button
                onClick={() => setActiveTab('vaccines')}
                className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'vaccines'
                    ? 'border-emerald-600 text-emerald-700 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>💉 Vaccinations ({vaccinations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('meds')}
                className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'meds'
                    ? 'border-emerald-600 text-emerald-700 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>💊 Active Medications ({medications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('records')}
                className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'records'
                    ? 'border-emerald-600 text-emerald-700 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>📋 Medical Records & Labs ({healthRecords.length})</span>
              </button>
            </div>

            {/* TAB CONTENT 1: VACCINATIONS */}
            {activeTab === 'vaccines' && (
              <div className="space-y-3">
                {vaccinations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">No vaccination records yet.</div>
                ) : (
                  vaccinations.map((vac) => {
                    const isOverdue = new Date(vac.dueDate) < new Date() && vac.status !== 'COMPLETED';
                    return (
                      <div
                        key={vac.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                              isOverdue ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            💉
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{vac.vaccineName}</h4>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isOverdue
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {isOverdue ? 'Overdue Booster' : 'Active & Valid'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Administered: {new Date(vac.administeredDate).toLocaleDateString()} • By:{' '}
                              {vac.vetName || 'Apex Clinic'}
                            </p>
                            {vac.batchNumber && (
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                Batch: {vac.batchNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-700">Next Booster Due</div>
                          <div className="text-xs font-extrabold text-emerald-700">
                            {new Date(vac.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB CONTENT 2: MEDICATIONS */}
            {activeTab === 'meds' && (
              <div className="space-y-3">
                {medications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">No active medications logged.</div>
                ) : (
                  medications.map((med) => (
                    <div
                      key={med.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                          💊
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{med.medicationName}</h4>
                          <p className="text-xs font-semibold text-slate-600 mt-0.5">
                            Dosage: {med.dosage} ({med.frequency.replace('_', ' ')})
                          </p>
                          {med.instructions && (
                            <p className="text-xs text-slate-500 mt-0.5 italic">{med.instructions}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        Active Rx
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT 3: MEDICAL RECORDS */}
            {activeTab === 'records' && (
              <div className="space-y-3">
                {healthRecords.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">No medical records documented.</div>
                ) : (
                  healthRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(rec.recordedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {rec.diagnosis && (
                        <p className="text-xs text-slate-700">
                          <strong>Diagnosis:</strong> {rec.diagnosis}
                        </p>
                      )}
                      {rec.treatment && (
                        <p className="text-xs text-slate-600">
                          <strong>Treatment:</strong> {rec.treatment}
                        </p>
                      )}
                      <div className="text-[11px] text-slate-400">
                        Attending Vet: {rec.veterinarianName || 'Dr. Vikram Sethi'} ({rec.clinicName || 'Clinic'})
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* RIGHT 4 COLS: TIMELINE & UPCOMING REMINDERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-extrabold text-slate-900">Upcoming Reminders</h3>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  Next 7 Days
                </span>
              </div>

              <div className="space-y-3">
                {reminders.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">All caught up! No pending reminders.</div>
                ) : (
                  reminders.map((r) => (
                    <div
                      key={r.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        r.isCompleted
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : 'bg-emerald-50/50 border-emerald-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">
                              {r.reminderType === 'VACCINE'
                                ? '💉'
                                : r.reminderType === 'MEDICINE'
                                ? '💊'
                                : r.reminderType === 'GROOMING'
                                ? '✂️'
                                : '🩺'}
                            </span>
                            <h4
                              className={`text-xs font-bold ${
                                r.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                              }`}
                            >
                              {r.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {new Date(r.scheduledTime).toLocaleDateString(undefined, {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>

                        <button
                          onClick={() => handleToggleReminder(r.id)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors ${
                            r.isCompleted
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          }`}
                        >
                          {r.isCompleted ? 'Done ✓' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* QUICK AI TEASER CARD */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h4 className="text-base font-extrabold">AI Pet Assistant</h4>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Check symptoms, get diet suggestions, or ask about vaccination timelines tailored for {currentPet.name}.
              </p>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                <span>Ask AI Assistant</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {currentPet && (
        <PassportModal
          pet={currentPet}
          isOpen={passportOpen}
          onClose={() => setPassportOpen(false)}
        />
      )}

      <AddPetModal
        isOpen={addPetOpen}
        onClose={() => setAddPetOpen(false)}
        onPetAdded={(newPet) => {
          setPets((prev) => [newPet, ...prev]);
          setSelectedPetId(newPet.id);
        }}
      />
    </div>
  );
}

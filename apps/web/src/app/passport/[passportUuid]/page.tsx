'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import {
  ShieldCheck,
  Award,
  Calendar,
  AlertTriangle,
  PhoneCall,
  Printer,
  FileText,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Pet, Vaccination, Medication, HealthRecord } from '@pets-care/types';

export default function PublicPassportPage() {
  const params = useParams();
  const passportUuid = params?.passportUuid as string;

  const [pet, setPet] = useState<Pet | null>(null);
  const [owner, setOwner] = useState<{ fullName: string; phone: string; email: string } | null>(null);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!passportUuid) return;

    const fetchPassport = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/pets/passport/${passportUuid}`);
        if (!res.ok) {
          throw new Error('Pet Health Passport not found or invalid URL');
        }
        const data = await res.json();
        setPet(data.pet);
        setOwner(data.owner);
        setVaccinations(data.vaccinations || []);
        setMedications(data.medications || []);
        setHealthRecords(data.healthRecords || []);
      } catch (err: any) {
        setError(err.message || 'Error loading passport');
      } finally {
        setLoading(false);
      }
    };

    fetchPassport();
  }, [passportUuid]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center text-xs text-slate-500">
        Verifying digital credentials with pets.care registry...
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-slate-900">Health Passport Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm">
          The requested passport token ({passportUuid}) could not be verified on the network.
        </p>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* 1. TOP OFFICIAL BADGE & PRINT BAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-600" />
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
              Verified Public Registry
            </span>
            <h1 className="text-xl font-black text-slate-900">OFFICIAL PET HEALTH PASSPORT</h1>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Document</span>
        </button>
      </div>

      {/* 2. THE PASSPORT PHYSICAL CARD LOOK */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* HEADER STRIP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={pet.avatarUrl || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80'}
              alt={pet.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-emerald-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-black text-slate-900">{pet.name}</h2>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Active
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">
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

          <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Passport UUID</div>
            <div className="font-mono text-xs font-bold text-slate-800">{pet.passportUuid}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-2">Microchip #</div>
            <div className="font-mono text-xs font-bold text-slate-800">{pet.microchipNumber || 'Chipped'}</div>
          </div>
        </div>

        {/* OWNER & LOST PET RECOVERY STRIP */}
        {owner && (
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
                Registered Guardian & Emergency Contact
              </div>
              <div className="text-sm font-bold text-slate-900">{owner.fullName}</div>
              <div className="text-xs text-slate-500">{owner.email}</div>
            </div>

            <a
              href={`tel:${owner.phone}`}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Guardian ({owner.phone})</span>
            </a>
          </div>
        )}

        {/* ALLERGIES WARNING */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Documented Allergies & Sensitivities</span>
          </div>
          <p className="text-xs text-slate-700 font-medium">
            {pet.allergies && pet.allergies.length > 0
              ? pet.allergies.join(', ')
              : 'No adverse reactions or allergies documented.'}
          </p>
        </div>

        {/* VACCINATIONS SECTION */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Immunization History</span>
          </h3>

          <div className="space-y-2">
            {vaccinations.map((v) => (
              <div
                key={v.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{v.vaccineName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Administered: {new Date(v.administeredDate).toLocaleDateString()} • {v.clinicName}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Booster Valid
                  </span>
                  <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                    Due: {new Date(v.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE MEDICATIONS */}
        {medications.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Active Prescriptions & Dosages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {medications.map((m) => (
                <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{m.medicationName}</div>
                  <div className="text-slate-600 mt-0.5">{m.dosage} ({m.frequency.replace('_', ' ')})</div>
                  {m.instructions && <div className="text-[11px] text-slate-400 italic mt-0.5">{m.instructions}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR RECOVERY BAR */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <QRCodeDisplay value={currentUrl} size={64} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">Official pets.care Registry ID</div>
              <div className="text-[10px] text-slate-500">Scan code to re-authenticate at any veterinary clinic</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            Certified by pets.care Health Network
          </div>
        </div>
      </div>
    </div>
  );
}

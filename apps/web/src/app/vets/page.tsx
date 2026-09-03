'use client';

import React, { useState, useEffect } from 'react';
import { Clinic, Veterinarian } from '@pets-care/types';
import { BookAppointmentModal } from '@/components/BookAppointmentModal';
import {
  Search,
  MapPin,
  Star,
  ShieldAlert,
  Phone,
  Clock,
  Building2,
  Calendar,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function VetsDirectoryPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const fetchClinicsAndVets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (selectedCity) params.append('city', selectedCity);
      if (emergencyOnly) params.append('emergencyOnly', 'true');

      const [cRes, vRes] = await Promise.all([
        fetch(`http://localhost:4000/api/clinics?${params.toString()}`),
        fetch('http://localhost:4000/api/vets'),
      ]);

      if (cRes.ok) setClinics(await cRes.json());
      if (vRes.ok) setVets(await vRes.json());
    } catch (err) {
      console.error('Error fetching clinics/vets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinicsAndVets();
  }, [selectedCity, emergencyOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchClinicsAndVets();
  };

  const handleOpenBooking = (vet: Veterinarian) => {
    setSelectedVet(vet);
    setBookingModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER STRIP */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit">
          <Building2 className="w-3.5 h-3.5" />
          <span>Verified Clinic Network</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Find Vets & Emergency Care Near You
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Connect with vetted small-animal surgeons, emergency trauma clinics, and licensed veterinarians.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinic name, surgery, vaccination..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi NCR</option>
            </select>

            <button
              type="button"
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                emergencyOnly
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>24/7 Emergency Only</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* CLINICS LIST */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading verified veterinary hospitals...</div>
        ) : clinics.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-3xl border border-slate-200">
            No clinics found matching your criteria. Try resetting the filters.
          </div>
        ) : (
          clinics.map((clinic) => {
            const clinicVets = vets.filter((v) => v.clinicId === clinic.id);

            return (
              <div
                key={clinic.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
              >
                {/* CLINIC MAIN DETAILS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-slate-900">{clinic.name}</h3>
                      {clinic.isEmergency24x7 && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          24/7 Trauma ICU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {clinic.address}, {clinic.city}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-700">{clinic.distanceKm} km away</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-black text-slate-900 justify-end">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>{clinic.rating}</span>
                        <span className="text-xs font-normal text-slate-400">({clinic.reviewCount} reviews)</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 justify-end mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {clinic.openHours}
                      </div>
                    </div>

                    <a
                      href={`tel:${clinic.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{clinic.phone}</span>
                    </a>
                  </div>
                </div>

                {/* SERVICES PILLS */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {clinic.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>

                {/* CLINIC VETERINARIANS */}
                {clinicVets.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Attending Specialists & Doctors
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {clinicVets.map((vet) => (
                        <div
                          key={vet.id}
                          className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={vet.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'}
                              alt={vet.fullName}
                              className="w-12 h-12 rounded-xl object-cover border border-emerald-400"
                            />
                            <div>
                              <h5 className="text-xs font-bold text-slate-900">{vet.fullName}</h5>
                              <p className="text-[11px] text-slate-500">{vet.specialization}</p>
                              <p className="text-xs font-black text-emerald-800 mt-0.5">
                                ₹{vet.consultationFee} Consultation
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenBooking(vet)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                          >
                            Book Slot
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* BOOKING MODAL */}
      <BookAppointmentModal
        vet={selectedVet}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingSuccess={() => {
          alert('Appointment successfully booked! Notification sent.');
        }}
      />
    </div>
  );
}

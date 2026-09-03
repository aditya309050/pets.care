'use client';

import React, { useState } from 'react';
import { X, Calendar, Video, Building2, CheckCircle2 } from 'lucide-react';
import { Veterinarian } from '@pets-care/types';

interface BookAppointmentModalProps {
  vet: Veterinarian | null;
  petId?: string;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  vet,
  petId,
  isOpen,
  onClose,
  onBookingSuccess,
}) => {
  const [serviceType, setServiceType] = useState<'CLINIC_VISIT' | 'VIDEO_CONSULT'>('CLINIC_VISIT');
  const [date, setDate] = useState('2026-09-05');
  const [timeSlot, setTimeSlot] = useState('05:30 PM');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !vet) return null;

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:15 PM', '05:30 PM', '07:00 PM'];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('pets_care_token');
      // Calculate appointment date
      const scheduledAt = new Date(`${date}T17:30:00Z`).toISOString();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          petId: petId || 'any', // If not specified, backend handles or matches first pet
          vetId: vet.id,
          serviceType,
          scheduledAt,
          notes: notes || 'General wellness & vaccine consultation',
        }),
      });

      if (!res.ok) {
        throw new Error('Appointment booking failed');
      }

      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        onBookingSuccess();
        onClose();
      }, 1800);
    } catch (err: any) {
      alert(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* HEADER */}
        <div className="bg-emerald-600 px-6 py-4 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-200">Instant Booking</span>
            <h3 className="text-base font-extrabold">{vet.fullName}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-emerald-700 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-black text-slate-900">Appointment Confirmed!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You and {vet.fullName} have been sent SMS & WhatsApp confirmations. A calendar reminder has been added to your dashboard.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* VET DETAILS */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={vet.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'}
                alt={vet.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-emerald-400"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{vet.specialization}</p>
                <p className="text-[11px] text-slate-500">{vet.clinicName || 'Apex Veterinary Hospital'}</p>
                <p className="text-xs font-black text-emerald-700 mt-0.5">₹{vet.consultationFee} Consultation Fee</p>
              </div>
            </div>

            {/* CONSULTATION TYPE */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Consultation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('CLINIC_VISIT')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    serviceType === 'CLINIC_VISIT'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Clinic Visit
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('VIDEO_CONSULT')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    serviceType === 'VIDEO_CONSULT'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
              </div>
            </div>

            {/* DATE SELECTION */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* TIME SLOTS */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Available Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      timeSlot === slot
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* NOTES */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Skin scratching, annual vaccine booster..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* CONFIRM BUTTON */}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              {loading ? 'Confirming Appointment...' : `Confirm & Pay ₹${vet.consultationFee}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

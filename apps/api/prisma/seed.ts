import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding pets.care database...');

  // 1. Clean existing records
  await prisma.appointment.deleteMany();
  await prisma.reminder.deleteMany();
  await prisma.medication.deleteMany();
  await prisma.vaccination.deleteMany();
  await prisma.healthRecord.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.veterinarian.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash('password123', salt);
  const adminPasswordHash = await bcrypt.hash('admin123', salt);

  // 2. Create Users
  const owner = await prisma.user.create({
    data: {
      email: 'aditya@pets.care',
      passwordHash: defaultPasswordHash,
      fullName: 'Aditya Sharma',
      phone: '+91 98765 43210',
      role: 'OWNER',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
  });

  const vetUser1 = await prisma.user.create({
    data: {
      email: 'dr.ananya@pets.care',
      passwordHash: defaultPasswordHash,
      fullName: 'Dr. Ananya Roy, MVSc',
      phone: '+91 98111 22334',
      role: 'VET',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
  });

  const vetUser2 = await prisma.user.create({
    data: {
      email: 'dr.vikram@pets.care',
      passwordHash: defaultPasswordHash,
      fullName: 'Dr. Vikram Sethi, BVSc',
      phone: '+91 98222 33445',
      role: 'VET',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@pets.care',
      passwordHash: adminPasswordHash,
      fullName: 'System Administrator',
      phone: '+91 99999 88888',
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
  });

  // 3. Create Clinics
  const emergencyClinic = await prisma.clinic.create({
    data: {
      name: 'Apex 24/7 Emergency Veterinary Care & Trauma Center',
      address: 'Plot 42, 100 Feet Rd, Indiranagar',
      city: 'Bengaluru',
      phone: '+91 80 2525 9999',
      rating: 4.9,
      reviewCount: 428,
      isEmergency24x7: true,
      latitude: 12.9784,
      longitude: 77.6408,
      servicesJson: JSON.stringify(['24/7 ICU & Trauma', 'Digital X-Ray & Ultrasound', 'Emergency Surgery', 'Oxygen Therapy']),
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
      openHours: 'Open 24 Hours • 7 Days a Week',
    },
  });

  const clinic2 = await prisma.clinic.create({
    data: {
      name: 'Paws & Whiskers Multi-Specialty Pet Hospital',
      address: '7th Sector, HSR Layout',
      city: 'Bengaluru',
      phone: '+91 80 4141 3322',
      rating: 4.8,
      reviewCount: 295,
      isEmergency24x7: false,
      latitude: 12.9121,
      longitude: 77.6446,
      servicesJson: JSON.stringify(['Preventive Vaccinations', 'Dental Care', 'Full Grooming Spa', 'Video Consultations']),
      imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
      openHours: '08:30 AM - 09:30 PM (Daily)',
    },
  });

  // 4. Create Veterinarians
  const vet1 = await prisma.veterinarian.create({
    data: {
      userId: vetUser1.id,
      clinicId: emergencyClinic.id,
      fullName: 'Dr. Ananya Roy, MVSc (Surgery)',
      specialization: 'Canine & Feline Emergency Surgery',
      experienceYears: 9,
      consultationFee: 700,
      bio: 'Gold medalist from IVRI with 9+ years experience in small animal critical care, soft tissue surgery, and ultrasound diagnostics.',
      rating: 4.9,
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
      availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
      isAvailableToday: true,
    },
  });

  const vet2 = await prisma.veterinarian.create({
    data: {
      userId: vetUser2.id,
      clinicId: clinic2.id,
      fullName: 'Dr. Vikram Sethi, BVSc',
      specialization: 'Preventive Medicine & Dermatology',
      experienceYears: 7,
      consultationFee: 500,
      bio: 'Specialist in allergic dermatitis, pediatric puppy care, nutrition planning, and preventive immunization protocols.',
      rating: 4.8,
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      availableDays: 'Mon,Wed,Thu,Fri,Sun',
      isAvailableToday: true,
    },
  });

  // 5. Create Pets
  const brunoDob = new Date();
  brunoDob.setFullYear(brunoDob.getFullYear() - 2);

  const bruno = await prisma.pet.create({
    data: {
      ownerId: owner.id,
      name: 'Bruno',
      species: 'DOG',
      breed: 'Golden Retriever',
      gender: 'MALE',
      dob: brunoDob,
      weightKg: 28.5,
      microchipNumber: '985141004291884',
      isNeutered: true,
      bloodType: 'DEA 1.1 Negative',
      allergiesJson: JSON.stringify(['Chicken protein', 'Dust mites']),
      dietaryNotes: 'Salmon & sweet potato dry kibble only. Highly allergic to poultry byproducts.',
      passportUuid: 'pass-bruno-gold-2026',
      avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    },
  });

  const lunaDob = new Date();
  lunaDob.setFullYear(lunaDob.getFullYear() - 1);
  lunaDob.setMonth(lunaDob.getMonth() - 4);

  const luna = await prisma.pet.create({
    data: {
      ownerId: owner.id,
      name: 'Luna',
      species: 'CAT',
      breed: 'Persian Longhair',
      gender: 'FEMALE',
      dob: lunaDob,
      weightKg: 4.2,
      microchipNumber: '985141008892110',
      isNeutered: true,
      bloodType: 'Type A',
      allergiesJson: JSON.stringify([]),
      dietaryNotes: 'High-protein wet food; hairball control diet formula.',
      passportUuid: 'pass-luna-pers-2026',
      avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    },
  });

  // 6. Create Vaccinations for Bruno
  const today = new Date();
  const nextMonth = new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000);
  const lastYear = new Date(today.getTime() - 340 * 24 * 60 * 60 * 1000);

  await prisma.vaccination.createMany({
    data: [
      {
        petId: bruno.id,
        vaccineName: 'Rabies (Defensor 3)',
        administeredDate: lastYear,
        dueDate: nextMonth,
        nextDueDate: nextMonth,
        batchNumber: 'RB-98421',
        vetName: 'Dr. Vikram Sethi',
        clinicName: 'Paws & Whiskers Hospital',
        status: 'UPCOMING',
        notes: 'Annual booster booster due next month. Certified rabies tag issued.',
      },
      {
        petId: bruno.id,
        vaccineName: 'DHPP (Distemper, Hepatitis, Parvo, Parainfluenza)',
        administeredDate: new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 185 * 24 * 60 * 60 * 1000),
        batchNumber: 'DH-55219',
        vetName: 'Dr. Vikram Sethi',
        clinicName: 'Paws & Whiskers Hospital',
        status: 'COMPLETED',
        notes: 'Administered right shoulder subcutaneous. Tolerated well with zero reaction.',
      },
      {
        petId: bruno.id,
        vaccineName: 'Bordetella (Kennel Cough)',
        administeredDate: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 305 * 24 * 60 * 60 * 1000),
        batchNumber: 'KC-33100',
        vetName: 'Dr. Ananya Roy',
        clinicName: 'Apex 24/7 Emergency Care',
        status: 'COMPLETED',
        notes: 'Intranasal administration before boarding trip.',
      },
    ],
  });

  // 7. Create Medications for Bruno
  await prisma.medication.create({
    data: {
      petId: bruno.id,
      medicationName: 'Apoquel (Oclacitinib) 16mg',
      dosage: '1 tablet once daily in morning with food',
      frequency: 'ONCE_DAILY',
      startDate: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(today.getTime() + 16 * 24 * 60 * 60 * 1000),
      instructions: 'For seasonal environmental allergy dermatitis and paw licking.',
      isActive: true,
      prescribedBy: 'Dr. Vikram Sethi',
    },
  });

  // 8. Create Health Records
  await prisma.healthRecord.create({
    data: {
      petId: bruno.id,
      recordType: 'CHECKUP',
      title: 'Annual Comprehensive Wellness Examination & Blood Panel',
      notes: 'Heart auscultation clear (no murmurs). Abdomen soft, non-painful. Teeth grade 1 tartar. Healthy weight maintained.',
      diagnosis: 'Mild seasonal atopic dermatitis (flare up in monsoon)',
      treatment: 'Prescribed Apoquel 16mg for 30 days and hypoallergenic medicated shampoo bath twice a week.',
      veterinarianName: 'Dr. Vikram Sethi',
      clinicName: 'Paws & Whiskers Hospital',
      recordedAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
      documentUrlsJson: JSON.stringify([
        'https://images.unsplash.com/photo-1583912267670-6575ad4736f8?auto=format&fit=crop&w=600&q=80',
      ]),
    },
  });

  // 9. Create Reminders
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(9, 0, 0, 0);

  const satGrooming = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  satGrooming.setHours(11, 0, 0, 0);

  await prisma.reminder.createMany({
    data: [
      {
        petId: bruno.id,
        userId: owner.id,
        title: 'Morning Allergy Medication — Apoquel 16mg',
        reminderType: 'MEDICINE',
        scheduledTime: tomorrow,
        repeatInterval: 'DAILY',
        isCompleted: false,
        notes: 'Give with breakfast kibble.',
      },
      {
        petId: bruno.id,
        userId: owner.id,
        title: 'Full Spa Bath & De-shedding Grooming Appointment',
        reminderType: 'GROOMING',
        scheduledTime: satGrooming,
        repeatInterval: 'NONE',
        isCompleted: false,
        notes: 'Use prescribed chlorhexidine antibacterial shampoo.',
      },
      {
        petId: bruno.id,
        userId: owner.id,
        title: 'Annual Rabies Booster Due Soon',
        reminderType: 'VACCINE',
        scheduledTime: nextMonth,
        repeatInterval: 'ANNUAL',
        isCompleted: false,
        notes: 'Book slot with Dr. Vikram Sethi at Paws & Whiskers.',
      },
    ],
  });

  // 10. Create an Appointment
  const apptDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  apptDate.setHours(17, 30, 0, 0);

  await prisma.appointment.create({
    data: {
      userId: owner.id,
      petId: bruno.id,
      vetId: vet2.id,
      serviceType: 'CLINIC_VISIT',
      scheduledAt: apptDate,
      status: 'CONFIRMED',
      consultationFee: 500,
      notes: 'Follow-up on allergy skin condition & weight check.',
    },
  });

  console.log('✅ Database seeded successfully with realistic pets, clinics, vaccines, and records!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

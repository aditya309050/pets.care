export type UserRole = 'OWNER' | 'VET' | 'PROVIDER' | 'ADMIN';
export interface User {
    id: string;
    email: string;
    phone?: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
export type PetSpecies = 'DOG' | 'CAT' | 'BIRD' | 'RABBIT' | 'OTHER';
export type PetGender = 'MALE' | 'FEMALE';
export interface Pet {
    id: string;
    ownerId: string;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    dob: string;
    ageFormatted?: string;
    weightKg: number;
    microchipNumber?: string;
    isNeutered: boolean;
    bloodType?: string;
    allergies: string[];
    dietaryNotes?: string;
    passportUuid: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    vaccinationStatus?: 'UP_TO_DATE' | 'DUE_SOON' | 'OVERDUE';
    nextVaccine?: {
        name: string;
        dueDate: string;
    };
}
export type VaccineStatus = 'COMPLETED' | 'UPCOMING' | 'OVERDUE';
export interface Vaccination {
    id: string;
    petId: string;
    vaccineName: string;
    administeredDate: string;
    dueDate: string;
    nextDueDate?: string;
    batchNumber?: string;
    vetName?: string;
    clinicName?: string;
    certificateUrl?: string;
    status: VaccineStatus;
    notes?: string;
    createdAt: string;
}
export interface Medication {
    id: string;
    petId: string;
    medicationName: string;
    dosage: string;
    frequency: 'ONCE_DAILY' | 'TWICE_DAILY' | 'THRICE_DAILY' | 'AS_NEEDED' | 'WEEKLY';
    startDate: string;
    endDate?: string;
    instructions?: string;
    isActive: boolean;
    prescribedBy?: string;
    createdAt: string;
}
export type HealthRecordType = 'CHECKUP' | 'SURGERY' | 'LAB_REPORT' | 'DENTAL' | 'EMERGENCY';
export interface HealthRecord {
    id: string;
    petId: string;
    recordType: HealthRecordType;
    title: string;
    notes?: string;
    diagnosis?: string;
    treatment?: string;
    veterinarianName?: string;
    clinicName?: string;
    recordedAt: string;
    documentUrls: string[];
    createdAt: string;
}
export type ReminderType = 'VACCINE' | 'MEDICINE' | 'GROOMING' | 'APPOINTMENT' | 'DEWORMING';
export interface Reminder {
    id: string;
    petId: string;
    userId: string;
    petName?: string;
    title: string;
    reminderType: ReminderType;
    scheduledTime: string;
    repeatInterval?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ANNUAL';
    isCompleted: boolean;
    completedAt?: string;
    notes?: string;
}
export interface Clinic {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    rating: number;
    reviewCount: number;
    distanceKm?: number;
    isEmergency24x7: boolean;
    latitude: number;
    longitude: number;
    services: string[];
    imageUrl?: string;
    openHours: string;
}
export interface Veterinarian {
    id: string;
    userId: string;
    clinicId?: string;
    clinicName?: string;
    fullName: string;
    specialization: string;
    experienceYears: number;
    consultationFee: number;
    bio: string;
    rating: number;
    avatarUrl?: string;
    availableDays: string[];
    isAvailableToday: boolean;
}
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ServiceType = 'CLINIC_VISIT' | 'VIDEO_CONSULT' | 'HOME_VISIT';
export interface Appointment {
    id: string;
    userId: string;
    petId: string;
    petName?: string;
    vetId: string;
    vetName?: string;
    clinicName?: string;
    serviceType: ServiceType;
    scheduledAt: string;
    status: AppointmentStatus;
    consultationFee: number;
    notes?: string;
    meetingLink?: string;
    prescriptionId?: string;
    createdAt: string;
}
export interface EmergencySOSPacket {
    pet: Pet;
    ownerName: string;
    ownerPhone: string;
    emergencyContacts: {
        name: string;
        phone: string;
        relationship: string;
    }[];
    criticalAllergies: string[];
    activeMedications: Medication[];
    primaryClinic?: {
        name: string;
        phone: string;
    };
    nearbyEmergencyHospitals: Clinic[];
}
export interface AIAssistantMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    suggestedAction?: {
        label: string;
        route: string;
    };
}
export interface AuthResponse {
    user: User;
    token: string;
}

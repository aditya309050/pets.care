import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['OWNER', 'VET', 'PROVIDER', 'ADMIN']).default('OWNER'),
});

export const CreatePetSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  species: z.enum(['DOG', 'CAT', 'BIRD', 'RABBIT', 'OTHER']),
  breed: z.string().min(1, 'Breed is required'),
  gender: z.enum(['MALE', 'FEMALE']),
  dob: z.string().min(4, 'Date of birth is required'),
  weightKg: z.number().positive('Weight must be greater than 0'),
  microchipNumber: z.string().optional(),
  isNeutered: z.boolean().default(false),
  bloodType: z.string().optional(),
  allergies: z.array(z.string()).default([]),
  dietaryNotes: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const CreateVaccinationSchema = z.object({
  petId: z.string().min(1, 'Pet ID is required'),
  vaccineName: z.string().min(1, 'Vaccine name is required'),
  administeredDate: z.string().min(1, 'Administered date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  nextDueDate: z.string().optional(),
  batchNumber: z.string().optional(),
  vetName: z.string().optional(),
  clinicName: z.string().optional(),
  notes: z.string().optional(),
  certificateUrl: z.string().optional(),
});

export const CreateMedicationSchema = z.object({
  petId: z.string().min(1, 'Pet ID is required'),
  medicationName: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.enum(['ONCE_DAILY', 'TWICE_DAILY', 'THRICE_DAILY', 'AS_NEEDED', 'WEEKLY']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  instructions: z.string().optional(),
});

export const CreateReminderSchema = z.object({
  petId: z.string().min(1, 'Pet ID is required'),
  title: z.string().min(1, 'Reminder title is required'),
  reminderType: z.enum(['VACCINE', 'MEDICINE', 'GROOMING', 'APPOINTMENT', 'DEWORMING']),
  scheduledTime: z.string().min(1, 'Scheduled time is required'),
  repeatInterval: z.enum(['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'ANNUAL']).default('NONE'),
  notes: z.string().optional(),
});

export const BookAppointmentSchema = z.object({
  petId: z.string().min(1, 'Pet is required'),
  vetId: z.string().min(1, 'Vet is required'),
  serviceType: z.enum(['CLINIC_VISIT', 'VIDEO_CONSULT', 'HOME_VISIT']),
  scheduledAt: z.string().min(1, 'Scheduled date and time is required'),
  notes: z.string().optional(),
});

export const AskAIAssistantSchema = z.object({
  petId: z.string().optional(),
  message: z.string().min(2, 'Message cannot be empty'),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ).optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type CreatePetInput = z.infer<typeof CreatePetSchema>;
export type CreateVaccinationInput = z.infer<typeof CreateVaccinationSchema>;
export type CreateMedicationInput = z.infer<typeof CreateMedicationSchema>;
export type CreateReminderInput = z.infer<typeof CreateReminderSchema>;
export type BookAppointmentInput = z.infer<typeof BookAppointmentSchema>;
export type AskAIAssistantInput = z.infer<typeof AskAIAssistantSchema>;

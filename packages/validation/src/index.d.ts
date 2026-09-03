import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const SignupSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["OWNER", "VET", "PROVIDER", "ADMIN"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    fullName: string;
    role: "OWNER" | "VET" | "PROVIDER" | "ADMIN";
    phone?: string | undefined;
}, {
    email: string;
    password: string;
    fullName: string;
    phone?: string | undefined;
    role?: "OWNER" | "VET" | "PROVIDER" | "ADMIN" | undefined;
}>;
export declare const CreatePetSchema: z.ZodObject<{
    name: z.ZodString;
    species: z.ZodEnum<["DOG", "CAT", "BIRD", "RABBIT", "OTHER"]>;
    breed: z.ZodString;
    gender: z.ZodEnum<["MALE", "FEMALE"]>;
    dob: z.ZodString;
    weightKg: z.ZodNumber;
    microchipNumber: z.ZodOptional<z.ZodString>;
    isNeutered: z.ZodDefault<z.ZodBoolean>;
    bloodType: z.ZodOptional<z.ZodString>;
    allergies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    dietaryNotes: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    species: "DOG" | "CAT" | "BIRD" | "RABBIT" | "OTHER";
    breed: string;
    gender: "MALE" | "FEMALE";
    dob: string;
    weightKg: number;
    isNeutered: boolean;
    allergies: string[];
    microchipNumber?: string | undefined;
    bloodType?: string | undefined;
    dietaryNotes?: string | undefined;
    avatarUrl?: string | undefined;
}, {
    name: string;
    species: "DOG" | "CAT" | "BIRD" | "RABBIT" | "OTHER";
    breed: string;
    gender: "MALE" | "FEMALE";
    dob: string;
    weightKg: number;
    microchipNumber?: string | undefined;
    isNeutered?: boolean | undefined;
    bloodType?: string | undefined;
    allergies?: string[] | undefined;
    dietaryNotes?: string | undefined;
    avatarUrl?: string | undefined;
}>;
export declare const CreateVaccinationSchema: z.ZodObject<{
    petId: z.ZodString;
    vaccineName: z.ZodString;
    administeredDate: z.ZodString;
    dueDate: z.ZodString;
    nextDueDate: z.ZodOptional<z.ZodString>;
    batchNumber: z.ZodOptional<z.ZodString>;
    vetName: z.ZodOptional<z.ZodString>;
    clinicName: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    certificateUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    petId: string;
    vaccineName: string;
    administeredDate: string;
    dueDate: string;
    nextDueDate?: string | undefined;
    batchNumber?: string | undefined;
    vetName?: string | undefined;
    clinicName?: string | undefined;
    notes?: string | undefined;
    certificateUrl?: string | undefined;
}, {
    petId: string;
    vaccineName: string;
    administeredDate: string;
    dueDate: string;
    nextDueDate?: string | undefined;
    batchNumber?: string | undefined;
    vetName?: string | undefined;
    clinicName?: string | undefined;
    notes?: string | undefined;
    certificateUrl?: string | undefined;
}>;
export declare const CreateMedicationSchema: z.ZodObject<{
    petId: z.ZodString;
    medicationName: z.ZodString;
    dosage: z.ZodString;
    frequency: z.ZodEnum<["ONCE_DAILY", "TWICE_DAILY", "THRICE_DAILY", "AS_NEEDED", "WEEKLY"]>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    instructions: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    petId: string;
    medicationName: string;
    dosage: string;
    frequency: "ONCE_DAILY" | "TWICE_DAILY" | "THRICE_DAILY" | "AS_NEEDED" | "WEEKLY";
    startDate: string;
    endDate?: string | undefined;
    instructions?: string | undefined;
}, {
    petId: string;
    medicationName: string;
    dosage: string;
    frequency: "ONCE_DAILY" | "TWICE_DAILY" | "THRICE_DAILY" | "AS_NEEDED" | "WEEKLY";
    startDate: string;
    endDate?: string | undefined;
    instructions?: string | undefined;
}>;
export declare const CreateReminderSchema: z.ZodObject<{
    petId: z.ZodString;
    title: z.ZodString;
    reminderType: z.ZodEnum<["VACCINE", "MEDICINE", "GROOMING", "APPOINTMENT", "DEWORMING"]>;
    scheduledTime: z.ZodString;
    repeatInterval: z.ZodDefault<z.ZodEnum<["NONE", "DAILY", "WEEKLY", "MONTHLY", "ANNUAL"]>>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    petId: string;
    title: string;
    reminderType: "VACCINE" | "MEDICINE" | "GROOMING" | "APPOINTMENT" | "DEWORMING";
    scheduledTime: string;
    repeatInterval: "WEEKLY" | "NONE" | "DAILY" | "MONTHLY" | "ANNUAL";
    notes?: string | undefined;
}, {
    petId: string;
    title: string;
    reminderType: "VACCINE" | "MEDICINE" | "GROOMING" | "APPOINTMENT" | "DEWORMING";
    scheduledTime: string;
    notes?: string | undefined;
    repeatInterval?: "WEEKLY" | "NONE" | "DAILY" | "MONTHLY" | "ANNUAL" | undefined;
}>;
export declare const BookAppointmentSchema: z.ZodObject<{
    petId: z.ZodString;
    vetId: z.ZodString;
    serviceType: z.ZodEnum<["CLINIC_VISIT", "VIDEO_CONSULT", "HOME_VISIT"]>;
    scheduledAt: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    petId: string;
    vetId: string;
    serviceType: "CLINIC_VISIT" | "VIDEO_CONSULT" | "HOME_VISIT";
    scheduledAt: string;
    notes?: string | undefined;
}, {
    petId: string;
    vetId: string;
    serviceType: "CLINIC_VISIT" | "VIDEO_CONSULT" | "HOME_VISIT";
    scheduledAt: string;
    notes?: string | undefined;
}>;
export declare const AskAIAssistantSchema: z.ZodObject<{
    petId: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    conversationHistory: z.ZodOptional<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant", "system"]>;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "assistant" | "system";
        content: string;
    }, {
        role: "user" | "assistant" | "system";
        content: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    petId?: string | undefined;
    conversationHistory?: {
        role: "user" | "assistant" | "system";
        content: string;
    }[] | undefined;
}, {
    message: string;
    petId?: string | undefined;
    conversationHistory?: {
        role: "user" | "assistant" | "system";
        content: string;
    }[] | undefined;
}>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type CreatePetInput = z.infer<typeof CreatePetSchema>;
export type CreateVaccinationInput = z.infer<typeof CreateVaccinationSchema>;
export type CreateMedicationInput = z.infer<typeof CreateMedicationSchema>;
export type CreateReminderInput = z.infer<typeof CreateReminderSchema>;
export type BookAppointmentInput = z.infer<typeof BookAppointmentSchema>;
export type AskAIAssistantInput = z.infer<typeof AskAIAssistantSchema>;

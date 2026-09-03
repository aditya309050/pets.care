import { User, Pet, Vaccination, Medication, HealthRecord, Reminder, Clinic, Veterinarian, Appointment, EmergencySOSPacket, AIAssistantMessage, AuthResponse } from '@pets-care/types';
import { LoginInput, SignupInput, CreatePetInput, CreateVaccinationInput, CreateMedicationInput, CreateReminderInput, BookAppointmentInput, AskAIAssistantInput } from '@pets-care/validation';
export declare class PetsCareApiClient {
    private baseUrl;
    private token;
    constructor(baseUrl?: string);
    setToken(token: string | null): void;
    private request;
    login(input: LoginInput): Promise<AuthResponse>;
    signup(input: SignupInput): Promise<AuthResponse>;
    getMe(): Promise<User>;
    getPets(): Promise<Pet[]>;
    getPetById(id: string): Promise<Pet>;
    getPetByPassport(passportUuid: string): Promise<{
        pet: Pet;
        vaccinations: Vaccination[];
        medications: Medication[];
        healthRecords: HealthRecord[];
    }>;
    createPet(input: CreatePetInput): Promise<Pet>;
    updatePet(id: string, input: Partial<CreatePetInput>): Promise<Pet>;
    getVaccinations(petId: string): Promise<Vaccination[]>;
    addVaccination(input: CreateVaccinationInput): Promise<Vaccination>;
    getMedications(petId: string): Promise<Medication[]>;
    addMedication(input: CreateMedicationInput): Promise<Medication>;
    getHealthRecords(petId: string): Promise<HealthRecord[]>;
    getReminders(petId?: string): Promise<Reminder[]>;
    createReminder(input: CreateReminderInput): Promise<Reminder>;
    toggleReminder(id: string): Promise<Reminder>;
    getClinics(params?: {
        query?: string;
        city?: string;
        emergencyOnly?: boolean;
    }): Promise<Clinic[]>;
    getVeterinarians(clinicId?: string): Promise<Veterinarian[]>;
    getAppointments(): Promise<Appointment[]>;
    bookAppointment(input: BookAppointmentInput): Promise<Appointment>;
    cancelAppointment(id: string): Promise<Appointment>;
    getEmergencySOSPacket(petId: string): Promise<EmergencySOSPacket>;
    askAIAssistant(input: AskAIAssistantInput): Promise<AIAssistantMessage>;
}
export declare const createApiClient: (baseUrl?: string) => PetsCareApiClient;

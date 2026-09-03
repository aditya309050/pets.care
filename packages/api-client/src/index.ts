import {
  User,
  Pet,
  Vaccination,
  Medication,
  HealthRecord,
  Reminder,
  Clinic,
  Veterinarian,
  Appointment,
  EmergencySOSPacket,
  AIAssistantMessage,
  AuthResponse,
} from '@pets-care/types';
import {
  LoginInput,
  SignupInput,
  CreatePetInput,
  CreateVaccinationInput,
  CreateMedicationInput,
  CreateReminderInput,
  BookAppointmentInput,
  AskAIAssistantInput,
} from '@pets-care/validation';

export class PetsCareApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = 'http://localhost:4000/api') {
    this.baseUrl = baseUrl;
  }

  public setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `API Error: ${res.statusText}`);
    }

    return data as T;
  }

  // Auth
  async login(input: LoginInput): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    this.setToken(res.token);
    return res;
  }

  async signup(input: SignupInput): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    this.setToken(res.token);
    return res;
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // Pets
  async getPets(): Promise<Pet[]> {
    return this.request<Pet[]>('/pets');
  }

  async getPetById(id: string): Promise<Pet> {
    return this.request<Pet>(`/pets/${id}`);
  }

  async getPetByPassport(passportUuid: string): Promise<{
    pet: Pet;
    vaccinations: Vaccination[];
    medications: Medication[];
    healthRecords: HealthRecord[];
  }> {
    return this.request(`/pets/passport/${passportUuid}`);
  }

  async createPet(input: CreatePetInput): Promise<Pet> {
    return this.request<Pet>('/pets', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async updatePet(id: string, input: Partial<CreatePetInput>): Promise<Pet> {
    return this.request<Pet>(`/pets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  }

  // Health
  async getVaccinations(petId: string): Promise<Vaccination[]> {
    return this.request<Vaccination[]>(`/health/vaccinations?petId=${petId}`);
  }

  async addVaccination(input: CreateVaccinationInput): Promise<Vaccination> {
    return this.request<Vaccination>('/health/vaccinations', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async getMedications(petId: string): Promise<Medication[]> {
    return this.request<Medication[]>(`/health/medications?petId=${petId}`);
  }

  async addMedication(input: CreateMedicationInput): Promise<Medication> {
    return this.request<Medication>('/health/medications', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async getHealthRecords(petId: string): Promise<HealthRecord[]> {
    return this.request<HealthRecord[]>(`/health/records?petId=${petId}`);
  }

  // Reminders
  async getReminders(petId?: string): Promise<Reminder[]> {
    const query = petId ? `?petId=${petId}` : '';
    return this.request<Reminder[]>(`/reminders${query}`);
  }

  async createReminder(input: CreateReminderInput): Promise<Reminder> {
    return this.request<Reminder>('/reminders', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async toggleReminder(id: string): Promise<Reminder> {
    return this.request<Reminder>(`/reminders/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  // Vets & Clinics
  async getClinics(params?: { query?: string; city?: string; emergencyOnly?: boolean }): Promise<Clinic[]> {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.append('query', params.query);
    if (params?.city) searchParams.append('city', params.city);
    if (params?.emergencyOnly) searchParams.append('emergencyOnly', 'true');
    const qs = searchParams.toString();
    return this.request<Clinic[]>(`/clinics${qs ? `?${qs}` : ''}`);
  }

  async getVeterinarians(clinicId?: string): Promise<Veterinarian[]> {
    const qs = clinicId ? `?clinicId=${clinicId}` : '';
    return this.request<Veterinarian[]>(`/vets${qs}`);
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return this.request<Appointment[]>('/appointments');
  }

  async bookAppointment(input: BookAppointmentInput): Promise<Appointment> {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}/cancel`, {
      method: 'PATCH',
    });
  }

  // Emergency SOS
  async getEmergencySOSPacket(petId: string): Promise<EmergencySOSPacket> {
    return this.request<EmergencySOSPacket>(`/emergency/sos?petId=${petId}`);
  }

  // AI Assistant
  async askAIAssistant(input: AskAIAssistantInput): Promise<AIAssistantMessage> {
    return this.request<AIAssistantMessage>('/ai-assistant/chat', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }
}

export const createApiClient = (baseUrl?: string) => new PetsCareApiClient(baseUrl);

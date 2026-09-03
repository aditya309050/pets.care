# 🐾 pets.care — One App For Everything Your Pet Needs

> **The Modern Operating System for Pet Parenting, Veterinary Care & Pet Services.**

---

## 🚀 Architecture Overview

`pets.care` is structured as a production-ready **Turborepo monorepo** sharing types, validation schemas, and API clients across Web and Mobile:

```
pets.care/
├── apps/
│   ├── api/              # Node.js + Express/NestJS, Prisma ORM, JWT Auth, RBAC
│   ├── web/              # Next.js 14 App Router, TailwindCSS, Pet & Clinic Dashboards
│   └── mobile/           # React Native + Expo (TypeScript), iOS & Android
│
├── packages/
│   ├── types/            # Shared TypeScript domain models (Pet, Vaccination, etc.)
│   ├── validation/       # Shared Zod validation schemas
│   └── api-client/       # Type-safe API Client for Web & Mobile
│
└── prisma/
    ├── schema.prisma     # Central SQLite / PostgreSQL schema
    └── seed.ts           # Demo data (sample pets, clinics, vaccines)
```

---

## 🐶 Key Features Implemented in Phase 1 MVP

1. **Digital Pet Health Passport**:
   - Every pet receives a unique digital passport with an instant scannable **QR code**.
   - Verified immunization badges for Rabies, DHPP, and Bordetella.
   - Microchip registration, blood type, and allergy alerts.
   - Public shareable web view (`/passport/:passportUuid`) for veterinarians, groomers, and pet boarding kennels.
2. **Automated Reminders & Timeline**:
   - Automated countdown for upcoming booster vaccines.
   - Daily medication reminders with 1-click "Mark as Done" toggle.
   - Grooming and annual wellness checkup tracking.
3. **Verified Veterinary Directory & Slot Booking**:
   - Filter nearby clinics by city (Bengaluru, Mumbai, Delhi) and 24/7 trauma capabilities.
   - Direct slot booking for clinic visits and HD video consultations.
4. **🚨 1-Tap Emergency SOS Mode**:
   - Instant direct dial for nearest 24/7 trauma emergency care and national pet ambulance (`1962`).
   - High-contrast immediate patient medical sheet (critical allergies, blood type, current meds).
   - Pre-arrival veterinary first aid instructions for poisonings, seizures, and heatstroke.
5. **🤖 AI Pet Care Assistant**:
   - Guardrailed symptom triage and nutrition guidance tailored to pet species, age, and weight.
   - Automatic red-flag emergency detection with 1-click emergency routing.

---

## ⚡ Quick Start & Running Locally

### 1. Install Workspace Dependencies
```bash
pnpm install
```

### 2. Prepare & Seed Database
```bash
# Push Prisma schema to database (SQLite in dev, PostgreSQL ready)
pnpm db:push

# Seed with sample pets, clinics, vaccines, and veterinarians
pnpm db:seed
```

### 3. Launch Backend API Server
```bash
pnpm --filter @pets-care/api dev
# Running on http://localhost:4000
```

### 4. Launch Next.js Web Platform
```bash
pnpm --filter @pets-care/web dev
# Running on http://localhost:3000
```

### 5. Launch React Native Mobile App
```bash
pnpm --filter @pets-care/mobile start
# Or press 'w' for web preview, 'a' for Android, 'i' for iOS simulator
```

---

## 🔑 Pre-Seeded Demo Accounts (1-Click Login Ready)

| Role | Email | Password | Access / Capabilities |
| :--- | :--- | :--- | :--- |
| **Pet Parent** | `aditya@pets.care` | `password123` | Bruno & Luna profiles, Health Passport, Reminders |
| **Veterinarian** | `dr.ananya@pets.care` | `password123` | Apex 24/7 Clinic, appointment queue, prescriptions |
| **Super Admin** | `admin@pets.care` | `admin123` | Verified clinic management, platform analytics |

---

## 💰 Startup Monetization Model (India & Global)

1. **Freemium Pet Health Passport**:
   - **Free**: 1 pet, core vaccination tracking, basic reminders.
   - **Pet Passport Club (₹149/month or ₹1,299/year)**: Unlimited pets, multi-guardian family sharing, cloud PDF document storage, and priority booking discounts.
2. **Vet & Clinic Booking Commissions**:
   - 10% - 15% marketplace commission on clinic visits & tele-consultations.
3. **Pet Services Marketplace (Phase 2)**:
   - Commission on grooming, pet sitting, walking, and boarding bookings.
4. **Pet Pharmacy & Recurring Subscriptions (Phase 3)**:
   - Repeat orders of tick/flea treatments, prescription foods, and wellness supplements.

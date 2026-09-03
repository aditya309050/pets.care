import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'pets.care — One App For Everything Your Pet Needs',
  description:
    'The complete operating system for pet parents, veterinarians, and pet services. Digital Pet Health Passports, automated reminders, and 1-tap 24/7 emergency care.',
  keywords: [
    'pet care app',
    'pet health passport',
    'vaccination reminders for dogs',
    'veterinary clinic booking',
    'emergency pet care',
    'pet medical records India',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

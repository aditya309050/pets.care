'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-[#1a3d1a] selection:text-white bg-[#EFFDF0] text-[#1a3d1a]">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

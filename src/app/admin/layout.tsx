import { Footer } from '@/components/footer';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}

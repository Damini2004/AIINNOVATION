
"use client";

import Link from "next/link";
import JournalList from "@/components/journal-list";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Associated Journals',
  description: 'Explore journals associated with the AI Innovation Society, covering a wide range of topics in AI, machine learning, and data science.',
};

export default function AssociateJournalPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Associated Journal</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">ASSOCIATED JOURNAL</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6">
           <JournalList />
        </div>
      </main>
    </div>
  );
}

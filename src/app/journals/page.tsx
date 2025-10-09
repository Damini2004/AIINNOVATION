
import Link from "next/link";
import JournalsContent from "./journals-content";
import "./journals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIIS Publications & Journals',
  description: 'Discover the benefits of hosting your institutional journal with the AI Innovation Society, and explore our portfolio of publications.',
};

export default function JournalsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Banner Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold max-w-4xl mx-auto">
            AIIS Provides Service for Hosting Institutional Journals in
            Collaboration with Society
          </h1>
        </div>
      </section>

      <JournalsContent />
    </div>
  );
}

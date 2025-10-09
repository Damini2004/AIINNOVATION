.
import Link from "next/link";
import "./host-journal-services.css";
import type { Metadata } from 'next';
import HostJournalContent from "./host-journal-content";

export const metadata: Metadata = {
  title: 'Host a Journal',
  description: 'Host your academic journal with the AI Innovation Society and leverage our global network, publication expertise, and commitment to open-access research.',
};

export default function HostJournalPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Host a Journal</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">HOST A JOURNAL</span>
          </div>
        </div>
      </section>

      <HostJournalContent />
    </div>
  );
}


import Link from "next/link";
import type { Metadata } from 'next';
import PastEventsContent from "./past-events-content";
import "../upcomingevents/events.css";

export const metadata: Metadata = {
  title: 'Past Events',
  description: 'Browse through our archive of past events, conferences, and workshops hosted by the AI Innovation Society.',
};

export default function PastEventsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Past Events</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">PAST EVENTS</span>
          </div>
        </div>
      </section>

      <PastEventsContent />
    </div>
  );
}

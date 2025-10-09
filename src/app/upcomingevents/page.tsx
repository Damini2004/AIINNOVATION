
import Link from "next/link";
import UpcomingEventsContent from "./upcoming-events-content";
import "./events.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description: 'Stay updated with the latest upcoming events, conferences, and webinars from the AI Innovation Society.',
};

export default function UpcomingEventsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">UPCOMING EVENTS</span>
          </div>
        </div>
      </section>
      <UpcomingEventsContent />
    </div>
  );
}

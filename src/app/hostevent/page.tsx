
import Link from "next/link";
import HostEventContent from "./host-event-content";
import "./hostevent.css";
import "@/components/slider.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Host an Event',
  description: 'Collaborate with the AI Innovation Society to host impactful seminars, webinars, conferences, and special sessions on Artificial Intelligence.',
};


export default function HostEventPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
       <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Host an Event</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">HOST AN EVENT</span>
          </div>
        </div>
      </section>

      <HostEventContent />
    </div>
  );
}

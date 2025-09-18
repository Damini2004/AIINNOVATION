"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/app/admin/actions";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type EventType = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
};

export default function EventsSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h5 className="text-primary text-sm font-bold mb-2">
            Ongoing and Upcoming Events
          </h5>
          <h2 className="text-3xl font-extrabold">Events for collaborations</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Event Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="w-full h-56" />
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-10 w-4/5" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
             ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    data-ai-hint="event poster"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="font-medium">{event.category}</span>
                    <span className="mx-2">|</span>
                    <span>{event.subtitle}</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition mb-3">
                    <Link href={event.link}>{event.title}</Link>
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                  <Button asChild variant="outline" className="mt-4">
                     <Link href={event.link}>
                        Read More
                     </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No upcoming events. Please check back later!</p>
          )}
        </div>
      </div>
    </section>
  );
}

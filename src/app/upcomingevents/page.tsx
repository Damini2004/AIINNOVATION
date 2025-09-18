
"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/app/admin/actions";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import "./events.css";

type EventType = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
};

export default function UpcomingEventsPage() {
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
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
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

      {/* Main Content */}
      <main className="blog_area py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h5 className="text-primary font-semibold">Upcoming Events</h5>
            <h2 className="text-3xl font-bold">
              Events for <span className="text-primary">collaborations</span>
            </h2>
            <div className="em_bar_bg"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="single_blog">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-10 w-4/5" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))
            ) : events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="single_blog">
                  <div className="single_blog_thumb">
                    <Link href={event.link}>
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={600}
                        height={400}
                        className="object-cover"
                        data-ai-hint="event poster"
                      />
                    </Link>
                  </div>
                  <div className="single_blog_content">
                    <div className="datatech_blog_meta">
                      <Link href="#">{event.category}</Link>
                    </div>
                    <div className="post-categories">
                      <Link href="#">{event.subtitle}</Link>
                    </div>
                    <div className="blog_page_title">
                      <h4>
                        <Link href={event.link}>{event.title}</Link>
                      </h4>
                    </div>
                    <div className="blog_description">
                      <p>{event.description}</p>
                    </div>
                     <Button asChild variant="link" className="p-0 h-auto text-primary button_two">
                        <Link href={event.link}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-muted-foreground">
                No upcoming events found. Please check back later.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

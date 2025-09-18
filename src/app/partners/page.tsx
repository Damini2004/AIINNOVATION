"use client";

import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(https://picsum.photos/seed/partners-hero/1920/300)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Our Partners</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">PARTNERS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Our Valued Partners</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We collaborate with leading organizations and institutions to advance the field of AI. Our partnerships are crucial in helping us achieve our mission.
            </p>
            <div className="mt-12 text-lg font-semibold">
                [Partner logos and information will be displayed here]
            </div>
        </div>
      </main>
    </div>
  );
}

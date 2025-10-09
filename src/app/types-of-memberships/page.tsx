
import Link from "next/link";
import "./member-stories.css";
import type { Metadata } from 'next';
import TypesOfMembershipsContent from "./types-of-memberships-content";

export const metadata: Metadata = {
  title: 'Types of Memberships',
  description: 'Explore the different membership types available at the AI Innovation Society for students and professionals, and find the one that fits you best.',
};

export default function TypesOfMembershipsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Types of Memberships</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">
              TYPES OF MEMBERSHIPS
            </span>
          </div>
        </div>
      </section>

      <TypesOfMembershipsContent />
    </div>
  );
}

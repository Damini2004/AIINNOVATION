
import Link from "next/link";
import "../members.css";
import type { Metadata } from 'next';
import PartnersContent from "./partners-content";

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'We collaborate with leading organizations and institutions to advance the field of AI. View our valued partners.',
};


export default function PartnersPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
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

      <PartnersContent />
    </div>
  );
}


import Link from "next/link";
import "./resources.css";
import type { Metadata } from 'next';
import EducationalResourcesContent from "./educational-resources-content";

export const metadata: Metadata = {
  title: 'Educational Resources',
  description: 'Browse and download educational resources including papers, presentations, and course materials from the AI Innovation Society.',
};

export default function EducationalResourcesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Educational Resources</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">EDUCATIONAL RESOURCES</span>
          </div>
        </div>
      </section>

      <EducationalResourcesContent />
    </div>
  );
}

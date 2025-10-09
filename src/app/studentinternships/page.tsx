
import Link from "next/link";
import "./internships.css";
import type { Metadata } from 'next';
import InternshipPageContent from "./internship-page-content";

export const metadata: Metadata = {
  title: 'Student Internship Program',
  description: 'Join the AI Innovation Society\'s internship program to gain hands-on experience in AI, ML, and Data Science under expert mentorship.',
};


export default function StudentInternshipsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Student Internship Program Overview</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">INTERNSHIPS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <InternshipPageContent />
    </div>
  );
}

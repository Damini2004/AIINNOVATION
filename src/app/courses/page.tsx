
import Link from "next/link";
import CoursesContent from "./courses-content";
import "./courses.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Courses',
  description: 'Explore a wide range of AI courses offered by the AI Innovation Society for K-12, undergraduate, and postgraduate levels.',
};


export default function CoursesPage() {

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Courses</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">COURSES</span>
          </div>
        </div>
      </section>

      <CoursesContent />
    </div>
  );
}

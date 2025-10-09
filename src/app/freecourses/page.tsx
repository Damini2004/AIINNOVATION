
import Link from "next/link";
import "../educationalresources/resources.css";
import type { Metadata } from 'next';
import FreeCoursesContent from "./free-courses-content";

export const metadata: Metadata = {
  title: 'Free AI Courses',
  description: 'Access free AI courses from the AI Innovation Society to start your journey in machine learning, data science, and more.',
};


export default function FreeCoursesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Free Courses</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">FREE COURSES</span>
          </div>
        </div>
      </section>

      <FreeCoursesContent />
    </div>
  );
}

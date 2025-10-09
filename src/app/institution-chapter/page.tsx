
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import InstitutionChapterServices from "./institution-chapter-services";
import "./institution-chapter.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Establish an Institution Chapter',
  description: 'Empower your institution by establishing an official AI Innovation Society (AIIS) chapter and bring global AI innovation to your campus.',
};

export default function InstitutionChapterPage() {
  const benefits = [
    "Official recognition as an AIIS affiliate chapter.",
    "Access to AIIS curriculum and educational resources.",
    "Funding and support for hosting local workshops and events.",
    "Opportunities for students to join exclusive internship programs.",
    "Collaboration on research projects with the global AIIS network.",
    "Branding and promotional support from AIIS headquarters.",
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Institution Chapter</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">INSTITUTION CHAPTER</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/seed/institution/600/500"
              alt="Institution Chapter Illustration"
              width={600}
              height={500}
              className="rounded-lg shadow-xl"
              data-ai-hint="university campus"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-sm font-bold text-primary uppercase">Start a Chapter</h2>
            <h3 className="text-3xl font-bold mt-2">
              Establish an AIIS{" "}
              <span className="text-primary">Institution Chapter</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              Empower your institution by establishing an official AI Innovation Society (AIIS) chapter. Bring the benefits of our global network directly to your students and faculty, fostering a local ecosystem of AI innovation, education, and ethical practice.
            </p>
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Chapter Benefits:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <InstitutionChapterServices />
    </div>
  );
}

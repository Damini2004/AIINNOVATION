
"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import "./internships.css";

export default function StudentInternshipsPage() {
  const programHighlights = [
    "Flexible durations: 4 weeks, 8 weeks, and 12 weeks.",
    "Virtual and hybrid participation options.",
    "Weekly live sessions with AI experts and mentors.",
    "Capstone project certificate co-signed by the AI Innovation Society.",
    "Opportunity to co-author publications and conference papers.",
    "SDG-mapped project themes promoting AI for social good.",
    "Placement assistance and professional networking support.",
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
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
      <main className="internship-details-area py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-12">
            <div className="portfolio-thumb">
              <Image
                src="https://picsum.photos/seed/internship/600/400"
                alt="Internship"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
                data-ai-hint="students collaborating"
              />
            </div>
            <div className="internship-info-card">
              <h3 className="text-2xl font-bold mb-4">Internship Information</h3>
              <ul>
                <li>
                  <b>Category:</b> Artificial Intelligence, Machine Learning
                </li>
                <li>
                  <b>Target Audience:</b> UG/PG Students & Research Scholars
                </li>
                <li>
                  <b>Duration:</b> 4 / 8 / 12 Weeks
                </li>
                <li>
                  <b>Certificate:</b> Verified Internship & Project Certificate
                </li>
                <li>
                  <b>Projects Offered In:</b> Computer Vision, NLP, Generative AI,
                  AI for SDGs
                </li>
              </ul>
            </div>
          </div>

          <div className="portfolio-content-details-box">
            <h2 className="text-3xl font-bold mb-4">Internships Description</h2>
            <p className="mb-4 text-muted-foreground">
              The AI Innovation Society offers cutting-edge internships designed for
              students passionate about Artificial Intelligence, Machine Learning,
              and Data Science. Our internship programs aim to bridge the gap
              between academic learning and industry application by providing
              hands-on experience under expert guidance. Interns are involved in
              real-time research projects, mentored by professionals, and given
              opportunities to publish, present, and innovate using responsible AI
              practices.
            </p>
            <div className="block-quote">
              <p>
                Our internships are built to empower future AI leaders by
                blending technical rigor with ethical awareness, inclusivity, and
                real-world applications.
              </p>
            </div>
            <p className="mb-6 text-muted-foreground">
              Students gain practical experience in tools such as Python,
              TensorFlow, Keras, PyTorch, and work on domains including computer
              vision, NLP, generative AI, healthcare AI, and sustainable
              technology. Our structured framework ensures measurable outcomes
              through weekly deliverables, skill assessments, and capstone
              projects.
            </p>
            <h3 className="text-2xl font-bold mb-4">Program Highlights</h3>
            <ul className="space-y-2">
              {programHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              Join hundreds of students already building their careers through
              our AI Internship Program. Whether you're from engineering,
              computer science, mathematics, or any interdisciplinary
              background, if you're passionate about innovation, our program
              will provide the guidance and environment to grow. Apply now to
              become part of a dynamic and visionary AI community.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AboutUsPage() {
  const steps = [
    "Become a Member.",
    "Take part in events and collaborate with members for projects and publications.",
    "Take up duties as trainer or researcher and publish research for free.",
    "Enjoy benefits of members and get invited to events.",
  ];
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(https://picsum.photos/seed/about-hero/1920/300)"}}
        data-ai-hint="abstract waves"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-sm font-bold text-primary uppercase">About Us</h2>
            <h3 className="text-3xl font-bold mt-2">
              We Are a AI Education and{" "}
              <span className="text-primary">Research Society</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              AI Innovation Society is a global platform fostering responsible AI
              innovation through education, research, social impact, and academic
              publishing.
            </p>
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Easy Steps to Get Started</h4>
              <ul className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/seed/about-us-main/600/600"
              alt="AI Research illustration"
              width={500}
              height={500}
              className="rounded-lg"
              data-ai-hint="woman tech"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
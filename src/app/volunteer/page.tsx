
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import VolunteerServices from "./volunteer-services";
import "./volunteer.css";

export default function VolunteerPage() {
  const benefits = [
    "Contribute your skills to meaningful AI projects.",
    "Expand your network and collaborate with experts.",
    "Gain hands-on experience in AI for social good.",
    "Receive recognition for your contributions.",
    "Help shape the future of ethical and inclusive AI.",
    "Access to exclusive workshops and training sessions.",
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
          <h1 className="text-4xl font-bold">Volunteer Opportunities</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">VOLUNTEER</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/seed/volunteer/600/500"
              alt="Volunteer illustration"
              width={600}
              height={500}
              className="rounded-lg shadow-xl"
              data-ai-hint="community volunteering"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-sm font-bold text-primary uppercase">Make an Impact</h2>
            <h3 className="text-3xl font-bold mt-2">
              Join Our <span className="text-primary">Volunteer Program</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              Volunteers are the heart of the AI Innovation Society. By contributing your time and expertise, you can help us build an ethical, inclusive, and impactful AI ecosystem. Whether you're a student, professional, or researcher, there's a place for you to make a difference.
            </p>
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Why Volunteer With Us?</h4>
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
      <VolunteerServices />
    </div>
  );
}

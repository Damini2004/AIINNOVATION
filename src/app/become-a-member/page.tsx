
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import MemberServices from "./member-services";
import "./member-services.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Member',
  description: 'Join the AI Innovation Society and unlock your potential with access to a global network, exclusive content, and collaborative opportunities.',
};

export default function BecomeAMemberPage() {

  const benefits = [
    "Access to exclusive AI courses and workshops.",
    "Opportunities to collaborate on research projects.",
    "Networking with a global community of AI professionals.",
    "Free or discounted access to AIIS conferences and events.",
    "Publication opportunities in AIIS-affiliated journals.",
    "Mentorship from leading experts in the field of AI.",
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
          <h1 className="text-4xl font-bold">Become a Member</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">BECOME A MEMBER</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <Image
                src="/assests/images/becomeamember.jpg"
                alt="AI Membership illustration"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                data-ai-hint="community network"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-sm font-bold text-primary uppercase">Join Our Community</h2>
              <h3 className="text-3xl font-bold mt-2">
                Unlock Your Potential with an{" "}
                <span className="text-primary">AIIS Membership</span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Becoming a member of the AI Innovation Society connects you to a vibrant global network of researchers, educators, and industry leaders. We provide the resources, opportunities, and collaborative environment you need to thrive in the world of Artificial Intelligence.
              </p>
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Membership Benefits:</h4>
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
      <MemberServices />
    </div>
  );
}

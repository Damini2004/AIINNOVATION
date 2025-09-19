
"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function HostJournalPage() {
  const keyPoints = [
    "Increased visibility and global reach through the AIIS network.",
    "Access to a diverse pool of expert reviewers and editors.",
    "Enhanced credibility and prestige from AIIS affiliation.",
    "Support for open-access publishing and ethical guidelines.",
    "Opportunities for special issues linked to AIIS conferences and events.",
    "Streamlined peer-review and publication management support.",
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Host a Journal</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">HOST A JOURNAL</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/seed/journal-host/600/500"
                alt="Hosting a Journal"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                data-ai-hint="academic research"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-sm font-bold text-primary uppercase">
                Collaborate with Us
              </h2>
              <h3 className="text-3xl font-bold mt-2">
                Host Your Journal with the{" "}
                <span className="text-primary">AI Innovation Society</span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                The AI Innovation Society provides a robust platform for
                institutions and research groups to launch and host academic
                journals. By partnering with us, you can leverage our global
                network, publication expertise, and commitment to ethical,
                open-access research to amplify your journal's impact and
                reach.
              </p>
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Key Benefits:</h4>
                <ul className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

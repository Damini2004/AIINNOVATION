
"use client";

import Image from "next/image";
import { CheckCircle, Database, Search, Globe, Award, ShieldCheck, Users } from "lucide-react";

export default function HostJournalContent() {
      const keyPoints = [
    "Increased visibility and global reach through the AIIS network.",
    "Access to a diverse pool of expert reviewers and editors.",
    "Enhanced credibility and prestige from AIIS affiliation.",
    "Support for open-access publishing and ethical guidelines.",
    "Opportunities for special issues linked to AIIS conferences and events.",
    "Streamlined peer-review and publication management support.",
  ];

  const services = [
    {
        icon: <Database />,
        title: "Indexing Support",
        description: "Assistance with indexing in Scopus, Web of Science, and other major databases to enhance visibility."
    },
    {
        icon: <Search />,
        title: "Peer Review Management",
        description: "Access to a robust platform and a global network of expert reviewers to ensure rigorous peer review."
    },
    {
        icon: <Globe />,
        title: "Global Promotion",
        description: "Promotion of your journal through AIIS's international channels, including conferences and newsletters."
    },
    {
        icon: <Award />,
        title: "DOI & CrossRef",
        description: "Full support for DOI registration and CrossRef integration to ensure permanent and citable links."
    },
    {
        icon: <ShieldCheck />,
        title: "Quality Assurance",
        description: "Dedicated editorial support to maintain the highest standards of academic quality and integrity."
    },
    {
        icon: <Users />,
        title: "Website & Hosting",
        description: "A professional, mobile-friendly journal website with hosting and technical support included."
    }
  ];

  return (
    <>
        <main className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <Image
                src="/assests/images/hostingajournal.jpeg"
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

       {/* Services Section */}
      <section className="journal-service-area py-20 bg-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h5 className="text-primary font-semibold uppercase">Our Services</h5>
            <h2 className="text-3xl font-bold">What We Provide</h2>
            <div className="em_bar_bg mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="journal-service-card">
                <div className="journal-service-icon">{service.icon}</div>
                <h3 className="text-xl font-bold mt-4 mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

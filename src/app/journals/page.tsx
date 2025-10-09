
"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JournalList from "@/components/journal-list";
import "./journals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIIS Publications & Journals',
  description: 'Discover the benefits of hosting your institutional journal with the AI Innovation Society, and explore our portfolio of publications.',
};

export default function JournalsPage() {
  const pros = [
    "Increased submission rates due to AIIS's reputation.",
    "Opportunities for special issues linked to AIIS events.",
    "Collaborative editorial board formation support.",
  ];
  
  const cons = [
    "Shared branding may dilute a journal's unique identity.",
    "Potential administrative overhead in coordinating with AIIS.",
    "Adherence to AIIS's overarching publication policies required.",
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Banner Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold max-w-4xl mx-auto">
            AIIS Provides Service for Hosting Institutional Journals in
            Collaboration with Society
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6">
          
          <section className="mb-20 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card border rounded-lg p-8 shadow-sm">
                <div>
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="flex items-center gap-2 text-primary">
                        <ThumbsUp /> Benefits of Collaboration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-0 pb-0">
                        <p className="text-muted-foreground">
                            Partnering with the AI Innovation Society to host your institutional journal opens up a world of opportunities. Our collaboration is designed to amplify your journal's impact, enhance its credibility, and connect your contributors to a vibrant global network. We provide comprehensive support, from streamlining the peer-review process to promoting your publications to a worldwide audience, ensuring your research reaches the minds that matter.
                        </p>
                        <ul className="space-y-3">
                        {[
                            "Global Visibility & Wider Reach",
                            "Enhanced Credibility & Prestige",
                            "Expert Reviewer & Editor Access",
                            "Streamlined Peer-Review Management",
                            "Targeted Marketing & Promotion"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0 animated-check-icon" />
                            <span>{item}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </div>
                 <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
                    <Image 
                        src="https://picsum.photos/seed/benefits/600/500"
                        alt="Benefits Collaboration"
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint="collaboration meeting"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card border rounded-lg p-8 shadow-sm">
                 <div className="relative h-full min-h-[300px] lg:min-h-[400px] order-last lg:order-first">
                    <Image 
                        src="https://picsum.photos/seed/pros/600/500"
                        alt="Pros of Collaboration"
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint="successful presentation"
                    />
                </div>
                 <div>
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                        <ThumbsUp /> Pros for Journals
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                        <p className="text-muted-foreground mt-4 mb-4">
                            Journals that partner with us gain a significant competitive edge. The association with AIIS boosts submission rates by signaling a commitment to quality and innovation. Furthermore, our-hosted events provide unique opportunities for special issues, and we offer expert support in forming collaborative and diverse editorial boards, enriching the journal's scope and expertise.
                        </p>
                        <ul className="space-y-3">
                        {pros.map((item, index) => (
                            <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0 animated-check-icon" />
                            <span>{item}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card border rounded-lg p-8 shadow-sm">
               <div>
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="flex items-center gap-2 text-red-600">
                        <ThumbsDown /> Potential Considerations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                         <p className="text-muted-foreground mt-4 mb-4">
                           While collaboration offers many advantages, it's important to consider all aspects. Partnering with AIIS means embracing a shared branding identity, which may influence a journal's unique positioning. There can be an administrative learning curve as your team aligns with our processes. Additionally, all publications must adhere to AIIS's overarching policies to ensure consistency and quality across our network.
                        </p>
                        <ul className="space-y-3">
                        {cons.map((item, index) => (
                            <li key={index} className="flex items-start">
                            <XCircle className="w-5 h-5 text-red-500 mr-2 mt-1 flex-shrink-0 animated-check-icon" />
                            <span>{item}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </div>
                <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
                    <Image 
                        src="https://picsum.photos/seed/cons/600/500"
                        alt="Potential Considerations"
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint="challenging discussion"
                    />
                </div>
            </div>
          </section>

          {/* Journals Section */}
          <JournalList />
        </div>
      </main>
    </div>
  );
}

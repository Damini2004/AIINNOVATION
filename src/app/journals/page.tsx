
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { getJournals } from "@/app/admin/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Journal = {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
};

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      const journalsData = await getJournals();
      setJournals(journalsData);
      setLoading(false);
    };
    fetchJournals();
  }, []);

  const benefits = [
    "Wider reach and global visibility through AIIS's network.",
    "Credibility enhancement via association with a recognized society.",
    "Access to a broad pool of expert reviewers and editors.",
    "Streamlined submission and peer-review process management.",
    "Marketing and promotional support for calls for papers and new issues.",
  ];

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

  const JournalCard = ({ journal }: { journal: Journal }) => {
    const cardContent = (
      <div
        className="bg-card border rounded-lg overflow-hidden group h-full flex flex-col"
      >
        <div className="relative w-full h-48">
          <Image
            src={journal.image}
            alt={journal.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="journal cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary">
            {journal.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">
            {journal.description}
          </p>
        </div>
      </div>
    );

    if (journal.link) {
      return (
        <Link href={journal.link} target="_blank" rel="noopener noreferrer" className="h-full block">
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  };


  return (
    <div className="bg-background text-foreground">
      {/* Banner Section */}
      <section
        className="py-24 bg-secondary relative bg-cover bg-center"
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
          
          <section className="mb-20 space-y-12">
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
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
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
                <div className="relative h-full min-h-[300px] lg:min-h-[400px] lg:order-last">
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
                        <ul className="space-y-3">
                        {pros.map((item, index) => (
                            <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
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
                        <ul className="space-y-3">
                        {cons.map((item, index) => (
                            <li key={index} className="flex items-start">
                            <XCircle className="w-5 h-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
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
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Journals</h2>
              <div className="em_bar_bg mt-4"></div>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore our portfolio of journals spanning various domains of
                Artificial Intelligence.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {journals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

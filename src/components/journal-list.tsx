
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { getJournals } from "@/app/admin/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

type Journal = {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
};

const JournalCard = ({ journal }: { journal: Journal }) => {
    const cardContent = (
      <div
        className="journal-card bg-card border rounded-lg overflow-hidden group h-full flex flex-col"
      >
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={journal.image}
            alt={journal.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="journal cover"
          />
           <div className="journal-card-overlay">
              <BookOpen className="w-8 h-8 text-white" />
              <span className="mt-2 text-sm font-semibold">Read More</span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
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


export default function JournalList() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      const journalsData = await getJournals();
      setJournals(journalsData);
      setLoading(false);
    };
    fetchJournals();
  }, []);
  
  const filteredJournals = journals.filter(journal => 
    journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Journals</h2>
            <div className="em_bar_bg mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of journals spanning various domains of
            Artificial Intelligence.
            </p>
        </div>
        
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search journals..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
            {filteredJournals.map((journal) => (
                <JournalCard key={journal.id} journal={journal} />
            ))}
            </div>
        )}
        { !loading && filteredJournals.length === 0 && (
          <p className="text-center text-muted-foreground col-span-full">No journals found matching your search.</p>
        )}
    </section>
  )
}


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDigitalLibraryPapers } from "@/app/admin/actions";
import type { DigitalLibraryPaper } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  BookText,
  File,
  User,
  Newspaper,
  Calendar,
  Filter,
} from "lucide-react";
import "./library.css";
import Image from "next/image";

function PaperCard({ paper }: { paper: DigitalLibraryPaper }) {
  return (
    <Link
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      className="paper-card no-underline"
    >
      <div className="paper-card-content">
        <h3 className="paper-title">{paper.paperTitle}</h3>
        <p className="paper-authors">
          <User className="inline-icon" /> {paper.authorName}
        </p>
        <div className="paper-meta">
          <span>
            <Newspaper className="inline-icon" /> {paper.journalName}
          </span>
          <span>
            <File className="inline-icon" /> {paper.volumeIssue}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DigitalLibraryPage() {
  const [papers, setPapers] = useState<DigitalLibraryPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      const papersData = await getDigitalLibraryPapers();
      setPapers(papersData);
      setLoading(false);
    };
    fetchPapers();
  }, []);

  const filteredPapers = papers.filter((paper) => {
    const term = searchTerm.toLowerCase();
    return (
      paper.paperTitle.toLowerCase().includes(term) ||
      paper.authorName.toLowerCase().includes(term) ||
      paper.journalName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract library"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Digital Library</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">DIGITAL LIBRARY</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Sidebar: Filters & Image */}
            <aside className="lg:col-span-3 space-y-8">
              <div className="p-6 bg-card border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filter & Search
                </h3>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search papers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-11 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://picsum.photos/seed/library-side/400/600"
                  alt="Digital Library"
                  fill
                  className="object-cover"
                  data-ai-hint="books knowledge"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">Explore Our Archives</h3>
                    <p className="text-white/90 mt-2 text-sm">A curated collection of research and innovation.</p>
                 </div>
              </div>
            </aside>

            {/* Right Content: Papers List */}
            <div className="lg:col-span-9">
              <div className="space-y-6">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-6 border rounded-lg space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  ))
                ) : filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))
                ) : (
                  <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <BookText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Papers Found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No papers matched your search criteria. Try another term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDigitalLibraryPapers } from "@/app/admin/actions";
import type { DigitalLibraryPaper } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, BookText, File, Link as LinkIcon, User, Newspaper } from "lucide-react";
import "./library.css";

function PaperCard({ paper }: { paper: DigitalLibraryPaper }) {
  const highlightAuthor = (authors: string, query: string) => {
    if (!query) return authors;
    const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
    return authors.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200 px-0">{part}</mark> : part
    );
  };

  return (
    <div className="paper-card">
      <div className="paper-card-content">
        <div className="flex items-start">
          <BookText className="h-5 w-5 text-primary mr-4 mt-1 flex-shrink-0" />
          <div>
            <Link href={paper.link} target="_blank" rel="noopener noreferrer">
              <h3 className="paper-title">{paper.paperTitle}</h3>
            </Link>
            <p className="paper-authors">{paper.authorName}</p>
            <div className="paper-meta">
              <span><Newspaper className="inline-icon" /> {paper.journalName}</span>
              <span><File className="inline-icon" /> {paper.volumeIssue}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="paper-card-actions">
        <Button asChild variant="outline" size="sm">
            <Link href={paper.link} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="mr-2 h-4 w-4"/>
              Visit Link
            </Link>
        </Button>
      </div>
    </div>
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
        <div className="container mx-auto px-6 max-w-4xl">
            {/* Search Bar */}
            <div className="relative mb-12">
              <Input
                type="text"
                placeholder="Search by paper title, author name, or journal name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Papers List */}
            <div className="space-y-6">
                {loading ? (
                    Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                ) : filteredPapers.length > 0 ? (
                    filteredPapers.map((paper) => (
                       <PaperCard key={paper.id} paper={paper} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No papers found matching your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

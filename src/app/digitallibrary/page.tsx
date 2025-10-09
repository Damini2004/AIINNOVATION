
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDigitalLibraryPapers } from "@/app/admin/actions";
import type { DigitalLibraryPaper } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookText,
  FileText,
  User,
  Newspaper,
  Filter,
} from "lucide-react";
import "./library.css";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Library',
  description: 'Access a vast repository of AI research papers, articles, and publications from the AI Innovation Society digital library.',
};

function PaperCard({ paper }: { paper: DigitalLibraryPaper }) {
  return (
    <div className="paper-item">
       <div className="paper-card-content">
         <Link
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <h3 className="paper-title">{paper.paperTitle}</h3>
          </Link>
          <p className="paper-authors">
            <User className="inline-icon" /> {paper.authorName}
          </p>
          <div className="paper-meta">
            <span>
              <Newspaper className="inline-icon" /> {paper.journalName}
            </span>
            <span>
              <FileText className="inline-icon" /> {paper.volumeIssue}
            </span>
          </div>
       </div>
    </div>
  );
}


const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', 'label': 'Oldest' },
    { value: 'alpha-az', label: 'Publication Title A-Z' },
    { value: 'alpha-za', label: 'Publication Title Z-A' },
];
type SortOption = typeof sortOptions[number]['value'];

const PAPERS_PER_PAGE = 15;


export default function DigitalLibraryPage() {
  const [papers, setPapers] = useState<DigitalLibraryPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOption>("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      const papersData = await getDigitalLibraryPapers();
      setPapers(papersData);
      setLoading(false);
    };
    fetchPapers();
  }, []);

  const sortedAndFilteredPapers = papers
    .filter((paper) => {
      const term = searchTerm.toLowerCase();
      return (
        paper.paperTitle.toLowerCase().includes(term) ||
        paper.authorName.toLowerCase().includes(term) ||
        paper.journalName.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return (b.id ?? "").localeCompare(a.id ?? "");
        case 'oldest':
            return (a.id ?? "").localeCompare(b.id ?? "");
        case 'alpha-az':
          return a.paperTitle.localeCompare(b.paperTitle);
        case 'alpha-za':
            return b.paperTitle.localeCompare(a.paperTitle);
        case 'relevance':
        default:
          return (b.id ?? "").localeCompare(a.id ?? ""); // Default to newest for now
      }
    });

  const totalPages = Math.ceil(sortedAndFilteredPapers.length / PAPERS_PER_PAGE);
  const paginatedPapers = sortedAndFilteredPapers.slice(
    (currentPage - 1) * PAPERS_PER_PAGE,
    currentPage * PAPERS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
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
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search by paper title, author, or journal..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on new search
                    }}
                    className="h-12 text-base rounded-full pr-14"
                />
                <Button variant="default" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 w-10" style={{backgroundColor: 'hsl(var(--primary))'}}>
                    <Search className="h-5 w-5 text-primary-foreground" />
                </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Sidebar: Filters */}
            <aside className="lg:col-span-3">
              <div className="p-6 bg-card border rounded-lg sticky top-24">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Filter className="h-5 w-5 mr-2 text-primary" />
                    Filter & Sort
                  </h3>
                  <div className="space-y-4">
                      <RadioGroup value={sortOrder} onValueChange={(value: SortOption) => {
                        setSortOrder(value);
                        setCurrentPage(1); // Reset to first page on sort change
                      }}>
                        <h4 className="font-medium text-sm">Sort by</h4>
                        <div className="space-y-2">
                          {sortOptions.map(option => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                                <Label htmlFor={`sort-${option.value}`} className="font-normal">{option.label}</Label>
                              </div>
                          ))}
                        </div>
                      </RadioGroup>
                  </div>
                </div>
            </aside>
            
            {/* Center Content: Papers List */}
            <div className="lg:col-span-9">
              <div className="space-y-2">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center p-6 border rounded-lg space-x-6">
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex gap-4 pt-2">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : paginatedPapers.length > 0 ? (
                  <>
                    {paginatedPapers.map((paper) => (
                      <PaperCard key={paper.id} paper={paper} />
                    ))}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center pt-8">
                        <Button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
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


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEducationalResources } from "@/app/admin/actions";
import type { EducationalResource } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  FileText,
  Presentation,
  File,
  Download,
} from "lucide-react";
import "../educationalresources/resources.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function ResourceCard({ resource }: { resource: EducationalResource }) {
  const getIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-10 w-10 text-primary" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-10 w-10 text-primary" />;
    if (fileType.includes("document") || fileType.includes("word")) return <File className="h-10 w-10 text-primary" />;
    return <File className="h-10 w-10 text-primary" />;
  };

  return (
    <div className="resource-card">
      <div className="resource-card-icon">
        {getIcon(resource.fileType)}
      </div>
      <div className="resource-card-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>
        <div className="resource-meta">
          <span className="file-type-badge">{resource.fileType.split('/')[1] || 'File'}</span>
          <Button asChild size="sm" variant="outline" className="mt-4">
            <a href={resource.fileUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

const PAPERS_PER_PAGE = 12;

export default function FreeCoursesPage() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fileTypeFilters, setFileTypeFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const resourcesData = await getEducationalResources();
      setResources(resourcesData);
      setLoading(false);
    };
    fetchResources();
  }, []);
  
  const allFileTypes = [...new Set(resources.map(r => r.fileType))];

  const handleFilterChange = (fileType: string) => {
    setFileTypeFilters(prev => 
      prev.includes(fileType) 
        ? prev.filter(ft => ft !== fileType)
        : [...prev, fileType]
    );
    setCurrentPage(1);
  }

  const filteredResources = resources
    .filter((resource) => {
      const term = searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term)
      );
    })
    .filter((resource) => {
      if (fileTypeFilters.length === 0) return true;
      return fileTypeFilters.includes(resource.fileType);
    });

  const totalPages = Math.ceil(filteredResources.length / PAPERS_PER_PAGE);
  const paginatedResources = filteredResources.slice(
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
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Free Courses</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">FREE COURSES</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 text-base rounded-full pr-14"
              />
              <Button variant="default" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 w-10" style={{backgroundColor: 'hsl(var(--primary))'}}>
                <Search className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3">
              <div className="p-6 bg-card border rounded-lg sticky top-24">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filter by Type
                </h3>
                <div className="space-y-3">
                  {allFileTypes.map(fileType => (
                    <div key={fileType} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`filter-${fileType}`} 
                        checked={fileTypeFilters.includes(fileType)}
                        onCheckedChange={() => handleFilterChange(fileType)}
                      />
                      <Label htmlFor={`filter-${fileType}`} className="font-normal capitalize">
                        {fileType.split('/')[1] || fileType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            
            <div className="lg:col-span-9">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-6 border rounded-lg space-y-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  ))}
                </div>
              ) : paginatedResources.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center pt-12 space-x-4">
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
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No Resources Found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No resources matched your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEducationalResources } from "@/app/dashboard/actions";
import type { EducationalResource } from "@/app/dashboard/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  FileText,
  Presentation,
  File,
  Eye,
  X,
  Link as LinkIcon
} from "lucide-react";
import "../educationalresources/resources.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function ResourceCard({ resource }: { resource: EducationalResource }) {
  const getIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-5 w-5 mr-2" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-5 w-5 mr-2" />;
    if (fileType.includes("document") || fileType.includes("word")) return <File className="h-5 w-5 mr-2" />;
    if (fileType === 'link') return <LinkIcon className="h-5 w-5 mr-2" />;
    return <File className="h-5 w-5 mr-2" />;
  };

  return (
    <div className="resource-card group">
        <div className="resource-card-image">
            <Image 
                src={resource.image || 'https://picsum.photos/seed/resource/400/225'}
                alt={resource.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="resource cover"
            />
        </div>
        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="resource-card-content no-underline">
            <h3 className="resource-title group-hover:text-primary">{resource.title}</h3>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-meta">
            <span className="file-type-badge flex items-center">
                {getIcon(resource.fileType)}{resource.fileType.split('/')[1] || resource.fileType}
            </span>
            <Button asChild size="sm" variant="outline">
                <span className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </span>
            </Button>
            </div>
        </a>
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
        className="py-32 bg-secondary relative bg-cover bg-center"
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
           <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative w-full max-w-2xl">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 rounded-full relative">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {fileTypeFilters.length > 0 && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 justify-center rounded-full bg-primary text-primary-foreground p-0">
                      {fileTypeFilters.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">File Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Select file types to display.
                    </p>
                  </div>
                   <div className="space-y-3">
                    {allFileTypes.map(fileType => (
                      <div key={fileType} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`filter-${fileType}-free`} 
                          checked={fileTypeFilters.includes(fileType)}
                          onCheckedChange={() => handleFilterChange(fileType)}
                        />
                        <Label htmlFor={`filter-${fileType}-free`} className="font-normal capitalize">
                          {fileType.split('/')[1] || fileType}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {fileTypeFilters.length > 0 && (
                     <Button variant="ghost" onClick={() => setFileTypeFilters([])}>
                       <X className="mr-2 h-4 w-4" />
                       Clear filters
                     </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
            
          <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4 rounded-lg border bg-card">
                      <Skeleton className="h-40 w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-12 w-full" />
                        <div className="flex justify-between items-center pt-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedResources.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      </main>
    </div>
  );
}

    
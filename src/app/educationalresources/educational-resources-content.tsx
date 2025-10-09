
"use client";

import { useState, useEffect } from "react";
import { getEducationalResources } from "@/app/admin/actions";
import type { EducationalResource } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  BookOpen,
  Eye,
  File as FileIcon,
  Presentation,
  FileCode,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";

function ResourceCard({ resource }: { resource: EducationalResource }) {
  const getIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileCode className="h-5 w-5 mr-2 text-red-500" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-5 w-5 mr-2 text-orange-500" />;
    if (fileType.includes("document") || fileType.includes("word")) return <FileIcon className="h-5 w-5 mr-2 text-blue-500" />;
    if (fileType === 'link') return <LinkIcon className="h-5 w-5 mr-2 text-gray-500" />;
    return <BookOpen className="h-5 w-5 mr-2" />;
  };

  const fileLabel = resource.fileType === 'link' ? 'Link' : resource.fileType.split('/')[1]?.toUpperCase() || 'File';

  return (
    <div className="resource-card group">
      <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
        <div className="resource-card-image">
            {resource.image ? (
                <Image 
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="resource cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                    {getIcon(resource.fileType)}
                </div>
            )}
        </div>
        <div className="resource-card-content">
            <h3 className="resource-title group-hover:text-primary">{resource.title}</h3>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-meta">
            <span className="file-type-badge flex items-center">
                {getIcon(resource.fileType)}{fileLabel}
            </span>
            <Button asChild size="sm" variant="outline">
                <span className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </span>
            </Button>
            </div>
        </div>
      </a>
    </div>
  );
}

const RESOURCES_PER_PAGE = 12;

export default function EducationalResourcesContent() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const resourcesData = await getEducationalResources();
      setResources(resourcesData);
      setLoading(false);
    };
    fetchResources();
  }, []);
  

  const filteredResources = resources
    .filter((resource) => {
      const term = searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term)
      );
    });

  const totalPages = Math.ceil(filteredResources.length / RESOURCES_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * RESOURCES_PER_PAGE,
    currentPage * RESOURCES_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  return (
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
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Resources Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No resources matched your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}

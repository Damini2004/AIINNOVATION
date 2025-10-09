
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCourses } from "@/app/admin/actions";
import type { Course } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  BookOpen,
  Eye,
} from "lucide-react";
import "../educationalresources/resources.css";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Courses',
  description: 'Access free AI courses from the AI Innovation Society to start your journey in machine learning, data science, and more.',
};

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="resource-card group">
        <div className="resource-card-image">
            <Image 
                src={course.img || 'https://picsum.photos/seed/resource/400/225'}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="course cover"
            />
        </div>
        <a href={course.link} target="_blank" rel="noopener noreferrer" className="resource-card-content no-underline">
            <h3 className="resource-title group-hover:text-primary">{course.title}</h3>
            <p className="resource-description">{course.description}</p>
            <div className="resource-meta">
            <span className="file-type-badge flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Course
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

const COURSES_PER_PAGE = 12;

export default function FreeCoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const coursesData = await getCourses();
      setAllCourses(coursesData);
      setLoading(false);
    };
    fetchCourses();
  }, []);
  
  const freeCourses = allCourses.filter(course => (course.category as any).includes('free'));

  const filteredCourses = freeCourses
    .filter((course) => {
      const term = searchTerm.toLowerCase();
      return (
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
      );
    });

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
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
                placeholder="Search courses by title or description..."
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
              ) : paginatedCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {paginatedCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
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
                  <h3 className="mt-4 text-lg font-semibold">No Courses Found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No free courses matched your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}

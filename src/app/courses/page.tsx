
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, LinkIcon, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./courses.css";
import { getCourses } from "../dashboard/actions";
import { Skeleton } from "@/components/ui/skeleton";

type Course = {
  id?: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  img: string;
  link?: string;
};

const filters = [
  { label: "Show All", value: "*" },
  { label: "Schools K-12 / High Schools", value: "school" },
  { label: "Undergraduate", value: "ug" },
  { label: "PG / PhD Senior Researchers", value: "pgphd" },
  { label: "Research Methodology", value: "rm" },
];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("*");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const coursesData = await getCourses();
      // The category in the db is a string, but the filter logic expects an array
      const formattedCourses = coursesData.map(c => ({...c, category: c.category.split(',').map(s => s.trim())}));
      setCourses(formattedCourses as any);
      setLoading(false);
    };
    fetchCourses();
  }, []);


  const filteredCourses =
    activeFilter === "*"
      ? courses
      : courses.filter((course) => (course.category as any).includes(activeFilter));

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Courses</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">COURSES</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="portfolio_area style_three py-24">
        <div className="container mx-auto px-6">
          <div className="text-center pb-10">
            <h5 className="text-primary font-semibold text-sm uppercase">Courses</h5>
            <h2 className="text-3xl font-bold mt-2">
              Let's See Our Popular <span className="text-primary">AI Courses</span>
            </h2>
            <div className="em_bar_bg"></div>
          </div>

          {/* Filter Buttons */}
          <div className="portfolio_nav mb-12">
            <div className="portfolio_menu text-center">
              <ul className="menu-filtering">
                {filters.map((filter) => (
                  <li
                    key={filter.value}
                    className={cn("cursor-pointer inline-block mx-2 my-1 px-4 py-2 rounded-md transition", {
                      "bg-primary text-primary-foreground": activeFilter === filter.value,
                      "bg-secondary hover:bg-primary/20": activeFilter !== filter.value,
                    })}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="single_portfolio"
                  >
                    <div className="single_portfolio_inner">
                      <div className="single_portfolio_thumb">
                        <Image
                          src={course.img}
                          alt={course.title}
                          width={400}
                          height={300}
                          className="rounded-t-lg w-full h-auto"
                          style={{aspectRatio: '4 / 3', objectFit: 'cover'}}
                          data-ai-hint="course illustration"
                        />
                        <div className="portfolio-icon">
                          <a href={course.img} target="_blank" rel="noopener noreferrer" className="portfolio-icon-link">
                            <ImageIcon />
                          </a>
                          {course.link && 
                            <Link href={course.link} className="portfolio-icon-link">
                              <LinkIcon />
                            </Link>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="single_portfolio_content">
                      <span className="single_portfolio_content_title">{course.title}</span>
                      <p className="single_portfolio_content_desc">
                        {course.link ? <Link href={course.link}>{course.description}</Link> : course.description}
                      </p>
                      <p className="single_portfolio_content_duration">
                        Duration: {course.duration}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

    
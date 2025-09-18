"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, LinkIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./courses.css";

const courses = [
  {
    category: ["school", "ug", "pgphd"],
    title: "Introduction to Artificial Intelligence",
    description: "Simple, Conceptual Introduction to AI, Robotics, and Intelligent Systems.",
    duration: "6–8 Weeks",
    img: "https://picsum.photos/seed/course1/400/300",
    link: "#",
  },
  {
    category: ["school"],
    title: "AI in Everyday Life",
    description: "Use cases like chatbots, navigation, recommendation engines, voice assistants.",
    duration: "10-12 Weeks",
    img: "https://picsum.photos/seed/course2/400/300",
    link: "#",
  },
  {
    category: ["school"],
    title: "Ethics in AI for Teens",
    description: "Exploring bias, privacy, and decision-making in machines with real-world examples.",
    duration: "4 Weeks",
    img: "https://picsum.photos/seed/course3/400/300",
    link: "#",
  },
  {
    category: ["school"],
    title: "Coding with Python for AI",
    description: "Hands-on coding with Python basics and logic building focused on AI readiness.",
    duration: "14-18 Weeks",
    img: "https://picsum.photos/seed/course4/400/300",
    link: "#",
  },
  {
    category: ["school"],
    title: "AI for Social Good (SDG)",
    description: "Learn how AI is solving global challenges like hunger, health, and climate.",
    duration: "4 Weeks",
    img: "https://picsum.photos/seed/course5/400/300",
    link: "#",
  },
  {
    category: ["ug"],
    title: "Creative AI",
    description: "Exploring how AI creates paintings, poems, music, and interactive games.",
    duration: "21-24 Weeks",
    img: "https://picsum.photos/seed/course6/400/300",
    link: "#",
  },
  {
    category: ["ug"],
    title: "Machine Learning Fundamentals",
    description: "Supervised and unsupervised learning, regression, classification, evaluation.",
    duration: "12-14 Weeks",
    img: "https://picsum.photos/seed/course7/400/300",
    link: "#",
  },
  {
    category: ["ug"],
    title: "Natural Language Processing (NLP)",
    description: "Text preprocessing, sentiment analysis, chatbots, and language models.",
    duration: "8-10 Weeks",
    img: "https://picsum.photos/seed/course8/400/300",
    link: "#",
  },
  {
    category: ["pgphd"],
    title: "AI for Business and Society",
    description: "AI in banking, healthcare, retail, smart cities; includes real-world case studies.",
    duration: "12-14 Weeks",
    img: "https://picsum.photos/seed/course9/400/300",
    link: "#",
  },
  {
    category: ["pgphd"],
    title: "AI and Ethics in Practice",
    description: "Hands-on evaluation of AI bias, explainability, fairness frameworks.",
    duration: "6 Weeks",
    img: "https://picsum.photos/seed/course10/400/300",
    link: "#",
  },
  {
    category: ["pgphd"],
    title: "Data Science for AI",
    description: "Data collection, wrangling, visualization, and exploration with tools like Pandas.",
    duration: "8-10 Weeks",
    img: "https://picsum.photos/seed/course11/400/300",
    link: "#",
  },
  {
    category: ["rm"],
    title: "AI-Enabled Robotics",
    description: "Basics of sensors, actuators, and decision-making using AI in robotics.",
    duration: "6-8 Weeks",
    img: "https://picsum.photos/seed/course12/400/300",
    link: "#",
  },
];

const filters = [
  { label: "Show All", value: "*" },
  { label: "Schools K-12 / High Schools", value: "school" },
  { label: "Undergraduate", value: "ug" },
  { label: "PG / PhD Senior Researchers", value: "pgphd" },
  { label: "Research Methodology", value: "rm" },
];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("*");

  const filteredCourses =
    activeFilter === "*"
      ? courses
      : courses.filter((course) => course.category.includes(activeFilter));

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
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
      <main className="portfolio_area py-24">
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.title}
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
                        className="rounded-t-lg w-full"
                        data-ai-hint="course illustration"
                      />
                      <div className="portfolio-icon">
                        <a href={course.img} target="_blank" rel="noopener noreferrer" className="portfolio-icon-link">
                          <ImageIcon />
                        </a>
                        <Link href={course.link} className="portfolio-icon-link">
                          <LinkIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="single_portfolio_content">
                    <span><strong>{course.title}</strong></span>
                    <p>
                      <Link href={course.link}>{course.description}</Link>
                      <br />
                      Duration: {course.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

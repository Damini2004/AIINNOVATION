
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function TypesOfMembershipsPage() {
  const [activeBenefit, setActiveBenefit] = useState("Find Community");

  const professionalBenefits = [
    {
      title: "Find Community",
      content: [
        "Connect with a worldwide network of AI professionals.",
        "Attend exclusive international conferences and events.",
        "Join specialized groups focused on your areas of interest.",
      ],
    },
    {
      title: "Gain Expertise",
      content: [
        "Access a vast digital library of research papers and journals.",
        "Enroll in cutting-edge AI courses and certification programs.",
        "Learn from leading experts through workshops and webinars.",
      ],
    },
    {
      title: "Offer Impact and Leadership",
      content: [
        "Volunteer for leadership roles within AIIS chapters.",
        "Mentor the next generation of AI innovators.",
        "Contribute to the development of ethical AI standards.",
      ],
    },
    {
      title: "Unlock Benefits",
      content: [
        "Receive discounts on publication fees and event registrations.",
        "Get recognized for your contributions with AIIS awards.",
        "Access exclusive job boards and career resources.",
      ],
    },
  ];

  const currentBenefit = professionalBenefits.find(b => b.title === activeBenefit);


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Types of Memberships</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">
              TYPES OF MEMBERSHIPS
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="professionals" className="w-full text-center">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-secondary rounded-lg h-auto">
              <TabsTrigger value="professionals">Professionals</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="stories">Member Stories</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key="tab-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-12">
                  <motion.div
                    className="h-16 w-px bg-border mx-auto"
                    initial={{ height: 0 }}
                    animate={{ height: "4rem" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mt-8">
                  Your Future, With AIIS
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                  Get the connections, knowledge, and recognition to grow your
                  career, starting today. Whether you're a student or a
                  seasoned professional, AIIS membership puts you at the center
                  of what's next in technology.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/become-a-member">Join as a Professional</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/become-a-member">Join as a Student</Link>
                  </Button>
                  <Button asChild size="lg">
                    <Link href="/membership-benefits">Explore Member Benefits</Link>
                  </Button>
                </div>

                <div className="mt-12">
                   <motion.div
                    className="h-16 w-px bg-border mx-auto"
                    initial={{ height: 0 }}
                    animate={{ height: "4rem" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  ></motion.div>
                </div>
                 
                <TabsContent value="professionals" className="mt-8 max-w-4xl mx-auto text-left">
                    <p className="text-muted-foreground text-center">
                        Join AIIS as a professional and get immediate access to a global community of engineers and technology experts. Tap into the latest technological news, research, and courses, plus countless other valuable benefits.
                    </p>
                     <div className="mt-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold">AIIS Membership Benefits for Professionals</h3>
                            <div className="em_bar_bg mt-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <ul className="space-y-2">
                                    {professionalBenefits.map(benefit => (
                                        <li key={benefit.title}>
                                            <button 
                                                onClick={() => setActiveBenefit(benefit.title)}
                                                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${activeBenefit === benefit.title ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-secondary/70'}`}
                                            >
                                                {benefit.title}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/membership-benefits" className="w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-secondary/70 block font-semibold text-primary">
                                            All Membership Benefits
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-2 bg-blue-950 rounded-lg p-8 text-white min-h-[250px]">
                                 <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeBenefit}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h4 className="text-2xl font-bold mb-6">{currentBenefit?.title}</h4>
                                        <ul className="space-y-4">
                                            {currentBenefit?.content.map((item, index) => (
                                                <motion.li 
                                                    key={index}
                                                    className="flex items-start"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 shrink-0"/>
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="students" className="mt-8 max-w-3xl mx-auto">
                    <p className="text-muted-foreground">
                       As a student member, you'll gain access to resources that will help you succeed in your studies and future career. Connect with mentors, find internships, and start building your professional network early.
                    </p>
                </TabsContent>
                <TabsContent value="stories" className="mt-8 max-w-3xl mx-auto">
                     <p className="text-muted-foreground">
                       Discover how AIIS membership has transformed the careers of our members. Read their stories, learn from their experiences, and see the impact of our community.
                    </p>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

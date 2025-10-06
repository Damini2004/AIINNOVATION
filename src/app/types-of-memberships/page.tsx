
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import "./member-stories.css";
import MemberStories from "./member-stories";

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

  const studentBenefits = [
    {
      title: "Expand Your Network",
      content: [
          "Connect with fellow students and experts.",
          "Join local activities and meet-ups.",
          "Connect with mentors.",
      ]
    },
    {
        title: "Develop Your Professional Skills",
        content: [
            "Participate in hands-on workshops.",
            "Contribute to open-source projects.",
            "Gain leadership experience in chapter roles.",
        ]
    },
    {
        title: "Find Financial Support",
        content: [
            "Apply for exclusive scholarships and grants.",
            "Get discounts on conference registrations.",
            "Find funding for your student projects.",
        ]
    },
    {
        title: "Unlock Benefits",
        content: [
            "Access to a digital library of research papers.",
            "Free or discounted access to AIIS certification programs.",
            "Career guidance and internship opportunities.",
        ]
    }
  ];

  
  const currentProfessionalBenefit = professionalBenefits.find(b => b.title === activeBenefit);
  const [activeStudentBenefit, setActiveStudentBenefit] = useState(studentBenefits[0].title);
  const currentStudentBenefit = studentBenefits.find(b => b.title === activeStudentBenefit);


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
             <TabsList className="items-center justify-center p-1 text-muted-foreground grid w-full grid-cols-1 sm:grid-cols-2 bg-secondary rounded-lg h-auto">
              <TabsTrigger value="professionals">Professionals</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
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
                    <Link href="/registrations">Join as a Professional</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/registrations">Join as a Student</Link>
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
                 
                 <TabsContent value="professionals" className="mt-8 text-left">
                    <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                        Join AIIS as a professional and get immediate access to a global community of engineers and technology experts. Tap into the latest technological news, research, and courses, plus countless other valuable benefits.
                    </p>
                    <div className="max-w-4xl mx-auto text-left space-y-16 py-16">

                          {/* Reduced Dues Section */}
                          <div className="space-y-4">
                            <h3 className="text-3xl font-bold">Reduced AIIS Membership Dues for Special Circumstances</h3>
                            <p className="text-muted-foreground">
                              AIIS supports its members through all of life's transitions. If you're retired, unemployed, permanently disabled, or experiencing financial hardship, you may qualify for reduced dues under our Special Circumstances program. AIIS also offers discounted electronic memberships for individuals living in eligible countries.
                            </p>
                            <div className="space-y-2">
                              <Link href="#" className="flex items-center text-primary font-semibold hover:underline">
                                <ArrowRight className="w-4 h-4 mr-2 transform -rotate-45" /> Learn More About Special Circumstances
                              </Link>
                              <Link href="#" className="flex items-center text-primary font-semibold hover:underline">
                                <ArrowRight className="w-4 h-4 mr-2 transform -rotate-45" /> Check Eligibility for Electronic Membership
                              </Link>
                            </div>
                          </div>

                          {/* Grades Section */}
                          <div className="space-y-4">
                            <h3 className="text-3xl font-bold">Grades</h3>
                            <p className="text-muted-foreground">
                              Join AIIS as a member, Associate member, Student member, or Graduate Student member, depending on your qualifications. You may also reach special designations of Life member, Senior member, or Fellow.
                            </p>
                            <Link href="#" className="flex items-center text-primary font-semibold hover:underline">
                                <ArrowRight className="w-4 h-4 mr-2 transform -rotate-45" /> Learn more
                            </Link>
                          </div>
                          
                           {/* Final CTA */}
                          <div className="text-center space-y-6 pt-8">
                             <div className="h-16 w-px bg-border mx-auto"></div>
                             <h2 className="text-4xl font-bold">Innovate the Future. Join AIIS.</h2>
                              <Button asChild size="lg">
                                <Link href="/registrations">Join Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                              </Button>
                          </div>
                          <div className="border-b border-border my-8"></div>
                           <div className="mt-16">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold">AIIS Membership Benefits for Professionals</h3>
                                    <div className="em_bar_bg mt-4"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                    <div className="md:col-span-4">
                                        <ul className="space-y-2">
                                            {professionalBenefits.map(benefit => (
                                                <li key={benefit.title}>
                                                    <button 
                                                        onClick={() => setActiveBenefit(benefit.title)}
                                                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 text-lg ${activeBenefit === benefit.title ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary/70 font-medium'}`}
                                                    >
                                                        {benefit.title}
                                                    </button>
                                                </li>
                                            ))}
                                            <li>
                                                <Link href="/membership-benefits" className="w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-secondary/70 block font-semibold text-primary text-lg">
                                                    All Membership Benefits
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="md:col-span-8 bg-blue-950 rounded-lg p-8 text-white min-h-[300px]">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeBenefit}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h4 className="text-2xl font-bold mb-6">{currentProfessionalBenefit?.title}</h4>
                                                <ul className="space-y-4">
                                                    {currentProfessionalBenefit?.content.map((item, index) => (
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
                           <div className="border-t my-12"></div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">Engineer the Future. Join IEEE.</h3>
                                <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                                    Professional. Social. Humanitarian. As a member, you’ll represent these core IEEE qualities and find them in our nearly half million members globally.
                                </p>
                                <div className="mt-6">
                                    <Button asChild size="lg">
                                        <Link href="/registrations">Join us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                <TabsContent value="students" className="mt-8 text-left">
                    <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                        Join AIIS as a student and benefit from our extensive engineering and technological expertise. Connect instantly to a network of STEM professionals, mentors, and other Student members.
                    </p>
                    <div className="mt-16">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold">AIIS Membership Benefits for Students</h3>
                            <div className="em_bar_bg mt-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-4">
                                <ul className="space-y-2">
                                    {studentBenefits.map(benefit => (
                                        <li key={benefit.title}>
                                            <button
                                                onClick={() => setActiveStudentBenefit(benefit.title)}
                                                className={`w-full text-left p-4 rounded-lg transition-all duration-300 text-lg ${activeStudentBenefit === benefit.title ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary/70 font-medium'}`}
                                            >
                                                {benefit.title}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/membership-benefits" className="w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-secondary/70 block font-semibold text-primary text-lg">
                                            All Membership Benefits
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-8 bg-blue-950 rounded-lg p-8 text-white min-h-[300px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStudentBenefit}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h4 className="text-2xl font-bold mb-6">{currentStudentBenefit?.title}</h4>
                                        <ul className="space-y-4">
                                            {currentStudentBenefit?.content.map((item, index) => (
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
                     <div className="max-w-4xl mx-auto text-left space-y-16 py-16">
                        <div className="mt-16 text-center">
                                <h3 className="text-2xl font-bold mb-6">Engineer the Future. Join IEEE.</h3>
                                <div className="mt-6">
                                    <Button asChild size="lg">
                                        <Link href="/registrations">Join Now</Link>
                                    </Button>
                                </div>
                                <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
                                Professional. Social. Humanitarian. As a member, you’ll represent these core IEEE qualities and find them in our nearly half million members globally.
                                </p>
                           </div>
                     </div>
                </TabsContent>
                
              </motion.div>
            </AnimatePresence>
          </Tabs>

           <div className="mt-16">
             <MemberStories />
           </div>

          <div className="mt-20 text-center">
            <div className="h-16 w-px bg-border mx-auto"></div>
             <div className="mt-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Ready to take the next step?</h2>
              <p className="mt-4 text-muted-foreground">
                Join IEEE and you’ll be part of a community of engineers and technological experts around the world. Become a member today.
              </p>
            </div>
            <div className="mt-8">
              <Image
                src="https://picsum.photos/seed/join-us/800/400"
                alt="Join AIIS Community"
                width={800}
                height={400}
                className="rounded-lg object-cover mx-auto shadow-lg"
                data-ai-hint="community working together"
              />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/registrations">Join as a Professional</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/registrations">Join as a Student</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact-us">Request More Information About Membership</Link>
              </Button>
            </div>
             <div className="mt-6">
                <Link href="#" className="text-sm text-primary hover:underline">
                    Renew Your Membership
                </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

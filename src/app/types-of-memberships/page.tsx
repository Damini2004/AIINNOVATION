
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function TypesOfMembershipsPage() {
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
      <main className="py-24">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="professionals" className="w-full text-center">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted">
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
                 
                <TabsContent value="professionals" className="mt-8 max-w-3xl mx-auto">
                    <p className="text-muted-foreground">
                        Join AIIS as a professional and get immediate access to a global community of engineers and technology experts. Tap into the latest technological news, research, and courses, plus countless other valuable benefits.
                    </p>
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

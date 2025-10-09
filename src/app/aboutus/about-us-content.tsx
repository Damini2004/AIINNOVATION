
"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import WhatWeDo from "./what-we-do";
import { motion } from "framer-motion";

export default function AboutUsContent() {
  const steps = [
    "Become a Member to join our network.",
    "Participate in events, projects, and publications.",
    "Contribute as a trainer or researcher.",
    "Enjoy exclusive member benefits and event invitations.",
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content: Expanded for SEO */}
          <div>
            <h2 className="text-sm font-bold text-primary uppercase">About The Society</h2>
            <h3 className="text-3xl font-bold mt-2">
              Pioneering Responsible AI through Education and Research
            </h3>
            <p className="mt-4 text-muted-foreground">
              The AI Innovation Society (AIIS) is a global, non-profit organization dedicated to building an ethical and inclusive future for Artificial Intelligence. We serve as a central hub for students, educators, researchers, and industry professionals who are passionate about leveraging AI for the betterment of humanity. Our core mission is to democratize AI knowledge and foster a collaborative ecosystem where innovation thrives responsibly.
            </p>
            <p className="mt-4 text-muted-foreground">
              At AIIS, we believe that the transformative power of AI comes with a profound responsibility. That’s why our programs are built on a foundation of ethical principles, transparency, and a commitment to social good. Through our diverse initiatives—from curriculum development and hands-on <Link href="/courses" className="text-primary hover:underline">AI courses</Link> to hosting international conferences—we aim to equip our members with the skills and a strong ethical framework to navigate the complexities of the digital age. Explore our <Link href="/missionvision" className="text-primary hover:underline">mission and vision</Link> to learn more about our guiding principles.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/assests/images/about-3.png"
              alt="An illustration representing AI education and research collaboration"
              width={500}
              height={500}
              className="rounded-lg"
              data-ai-hint="woman tech"
            />
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20">
            <h3 className="text-2xl font-bold text-center">How to Get Involved</h3>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-2 mb-8">
              Joining our society is a straightforward process designed to get you connected with our community and resources as quickly as possible.
            </p>
            <motion.ul
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {steps.map((step, index) => (
                  <motion.li key={index} className="flex items-start p-4 bg-card rounded-lg border shadow-sm" variants={itemVariants}>
                    <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span className="font-medium">{step}</span>
                  </motion.li>
                ))}
              </motion.ul>
        </div>
      </section>
      <WhatWeDo />
    </>
  );
}

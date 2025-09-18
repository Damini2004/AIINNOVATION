"use client";

import Image from "next/image";
import Link from "next/link";
import { GitBranch, BarChart, Bot } from "lucide-react";
import VisionSection from "./vision-section";

export default function MissionVisionPage() {
  const missionPoints = [
    {
      icon: <GitBranch className="w-8 h-8 text-primary" />,
      title: "Promote Ethical and Inclusive AI Education",
      description: "Deliver accessible, high-quality AI learning and certification programs for students, educators, and professionals worldwide."
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Advance Responsible Research and Innovation",
      description: "Foster open-access publications, interdisciplinary research, and innovation rooted in transparency, fairness, and social good."
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Build a Collaborative Global AI Ecosystem",
      description: "Unite academic institutions, industry leaders, and communities to drive AI applications that support sustainable development and equitable growth."
    }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Breadcrumb Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Mission and Vision</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">MISSION AND VISION</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7">
              <div>
                <h2 className="text-sm font-bold text-primary uppercase">Mission</h2>
                <h3 className="text-3xl font-bold mt-2 leading-snug">
                  Our Mission Is To Bring The Power Of AI To <span className="text-primary">Everyone</span>
                </h3>
                <div className="em_bar_bg text-left my-4"></div>
                <p className="mt-4 text-muted-foreground text-lg">
                  Our mission is to empower individuals, institutions, and communities by advancing responsible AI through global education, open-access research, ethical innovation, and impactful social collaborations.
                </p>
              </div>
              <div className="mt-8 space-y-8">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3 mr-6">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{point.title}</h4>
                      <p className="mt-1 text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-center">
              <Image
                src="/assests/images/b1.png"
                alt="Mission illustration"
                width={500}
                height={600}
                className="rounded-lg"
                data-ai-hint="abstract shapes"
              />
            </div>

          </div>
        </div>
      </section>
      <VisionSection />
    </div>
  );
}

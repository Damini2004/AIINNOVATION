"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function VisionSection() {
    const visionPoints = [
        "Champion Global AI Ethics",
        "Foster Inclusive AI Collaboration",
        "Drive Sustainable AI Impact",
        "Bridge the AI Knowledge Divide",
        "Empower the Next Generation of Innovators",
        "Shape Policy and Governance in AI",
        "Support Open and Transparent AI Research",
        "Accelerate AI for Sustainable Development Goals (SDGs)",
    ];

  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
              src="/assests/images/about1.png"
              alt="Vision illustration"
              width={600}
              height={600}
              className="rounded-lg"
              data-ai-hint="future technology"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-sm font-bold text-primary uppercase">Vision</h2>
            <h3 className="text-3xl font-bold mt-2 leading-snug">
              Vision of AIIS To Lead a <span className="text-primary">Global Movement</span>
            </h3>
            <div className="em_bar_bg text-left my-4"></div>
            <p className="text-muted-foreground text-lg">
              Our vision is to build an inclusive AI ecosystem that prioritizes ethics, equity, and sustainability — empowering present and future generations to use AI for the betterment of society and the planet.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

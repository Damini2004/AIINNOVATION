"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="about-area py-16 bg-background">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Image */}
          <div className="pr-0 lg:pr-8">
            <Image
              src="/assests/images/ab3.png"
              alt="About AI Innovation Society"
              width={600}
              height={600}
              className="w-full rounded-lg shadow-xl"
              data-ai-hint="team collaboration"
            />
          </div>

          {/* Right Content */}
          <div className="pl-0 lg:pl-8">
            <h5 className="text-primary text-base uppercase font-bold mb-4">
              Who We Are
            </h5>
            <h2 className="text-4xl font-bold text-foreground">
              We Thrive Innovation in
            </h2>
            <h2 className="text-4xl font-bold text-foreground">
              Artificial <span className="text-primary">Intelligence</span>
            </h2>

            <div className="em_bar_bg text-left" style={{ margin: '20px 0' }}></div>

            <p className="pt-3 text-base text-muted-foreground">
              AI Innovation Society (AIIS) is a non-profit initiative dedicated to promoting responsible artificial intelligence through education, ethical research, global events, and collaborative innovation. We connect researchers, educators, developers, and change-makers to harness AI for the greater good.
            </p>

            {/* Icon Boxes */}
            <div className="mt-6 space-y-4">

              <div className="flex items-start">
                <CheckCircle2 className="text-primary h-5 w-5 mt-1 mr-4 shrink-0" />
                <p className="text-foreground font-medium text-base">
                  Promoting AI Education in Schools and Universities.
                </p>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="text-primary h-5 w-5 mt-1 mr-4 shrink-0" />
                <p className="text-foreground font-medium text-base">
                  Empowering Research Publication in field of AI.
                </p>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="text-primary h-5 w-5 mt-1 mr-4 shrink-0" />
                <p className="text-foreground font-medium text-base">
                  Connecting a strong network of researchers and scientists in field of AI.
                </p>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="text-primary h-5 w-5 mt-1 mr-4 shrink-0" />
                <p className="text-foreground font-medium text-base">
                  Organizing events like conferences and workshops in field of AI.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

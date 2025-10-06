
"use client";

import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="about-area pt-16 pb-16  text-black">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="order-last lg:order-first">
            <Image
              src="/assests/images/about-3.png"
              alt="About Us"
              width={600}
              height={600}
              className="w-full rounded-lg"
              data-ai-hint="abstract geometric"
            />
          </div>

          {/* Right Content */}
          <div>
            <h5 className="text-primary font-bold uppercase tracking-wide">
              WHO WE ARE
            </h5>
            <h2 className="text-3xl font-extrabold text-black mt-2">
              Empowering Ethical AI Innovation, Together
            </h2>
            <div className="em_bar_bg text-left mt-4 mb-6"></div>
            <p className="text-base text-black mb-6">
              AI Innovation Society is a global platform fostering ethical,
              inclusive, and impactful advancements in Artificial Intelligence.
            </p>
            <p className="text-base text-black">
              We empower students, researchers, and professionals by providing
              access to high-quality education, supporting open-access
              research, and building a collaborative ecosystem for responsible
              AI development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

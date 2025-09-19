
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import "./slider.css";

export default function Slider() {
  return (
    <section
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 lg:py-32"
      style={{
        backgroundImage:
          "url(/assests/images/slider1.jpg)",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Welcome to AI <br />
              <span className="text-foreground">Innovation Society</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              AI Innovation Society is a global platform fostering responsible
              AI innovation through education, research, social impact, and
              academic publishing.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition w-full sm:w-auto justify-center"
              >
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <div className="flex items-center space-x-3">
                <a
                  href="https://youtu.be/UYGbTqu4JDY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pulse-btn flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition"
                >
                  <Play className="h-6 w-6" />
                </a>
                <span className="ml-3 text-muted-foreground font-semibold">Watch Video</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:-mt-12">
            <Image
              src="/assests/images/slider3.png"
              alt="AI Innovation Society"
              width={600}
              height={600}
              className="w-[80%] max-w-[400px] lg:max-w-full h-auto drop-shadow-xl"
              data-ai-hint="abstract tech"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

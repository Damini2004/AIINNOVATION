"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import "./slider.css";

export default function Slider() {
  return (
    <section
      className="relative bg-gradient-to-b from-white to-gray-50 py-20"
      style={{
        height: "930px",
        background:
          "url(https://picsum.photos/seed/slider1/1920/930) right top no-repeat scroll",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-foreground leading-tight">
              Welcome to AI <br />
              <span className="text-foreground">Innovation Society</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              AI Innovation Society is a global platform fostering responsible
              AI innovation through education, research, social impact, and
              academic publishing.
            </p>

            {/* Buttons */}
            <div className="flex items-center space-x-6">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition"
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
                <span className=" ml-3 text-muted-foreground font-semibold">Watch Video</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="https://picsum.photos/seed/slider3/600/600"
              alt="AI Innovation Society"
              width={600}
              height={600}
              className="max-w-full h-auto drop-shadow-xl"
              data-ai-hint="abstract tech"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

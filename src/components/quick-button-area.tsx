"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function QuickButtonArea() {
  return (
    <section className="bg-[#173969] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-2/3 mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Shape the Future of Ethical AI
            </h1>
            <p className="text-white/90 text-base md:text-lg">
              Join a global network of AI innovators, educators, and researchers
              driving change through collaboration.
            </p>
          </div>

          {/* Right Button */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0 md:pl-16">
            <Button asChild size="lg" className="bg-[#f16722] hover:bg-[#d4551b] text-white rounded-full">
                <Link
                href="/member"
                >
                Join Now →
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

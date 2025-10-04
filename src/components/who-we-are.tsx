
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function WhoWeAre() {
  const memberStories = [
    {
      name: "Dr. Nita Patel",
      title: "Vice President, Engineering",
      image: "https://picsum.photos/seed/nita-patel/600/600",
      imageHint: "professional woman portrait",
      bio: "It changes your life. AIIS membership helps you establish relationships that are tighter because you already have a lot of things in common in the way you think, work, and want to change the world around you.",
    },
    {
      name: "Dr. Vincent Kaabunga",
      title: "Lead Data Scientist",
      image: "https://picsum.photos/seed/vincent-k/600/600",
      imageHint: "professional man portrait",
      bio: "Being part of AIIS has accelerated my research and allowed me to collaborate on projects I never thought possible. The community is incredibly supportive.",
    },
    {
      name: "Dr. John McDonald",
      title: "AI Ethics Consultant",
      image: "https://picsum.photos/seed/john-mcdonald/600/600",
      imageHint: "man thinking",
      bio: "The society's focus on ethics is what drew me in. It's not just about what we can build, but what we should build. AIIS is leading that conversation.",
    },
  ];

  const [activeStory, setActiveStory] = useState(memberStories[0]);

  return (
    <section className="about-area py-24 bg-blue-950 text-white">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Image */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={activeStory.image}
                  alt={activeStory.name}
                  width={600}
                  height={600}
                  className="w-full rounded-lg shadow-xl aspect-square object-cover"
                  data-ai-hint={activeStory.imageHint}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="flex mb-6">
                {memberStories.map((story) => (
                    <button
                        key={story.name}
                        onClick={() => setActiveStory(story)}
                        className={`text-lg font-semibold mr-6 pb-2 transition-colors duration-300 ${
                        activeStory.name === story.name
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-400 hover:text-primary"
                        }`}
                    >
                        {story.name}
                    </button>
                ))}
            </div>
            
            <AnimatePresence mode="wait">
                 <motion.div
                    key={activeStory.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                 >
                    <h2 className="text-3xl font-bold text-white">
                        {activeStory.title}
                    </h2>
                    <div className="em_bar_bg text-left" style={{ margin: '20px 0' }}></div>
                    <p className="pt-3 text-base text-gray-300">
                        {activeStory.bio}
                    </p>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

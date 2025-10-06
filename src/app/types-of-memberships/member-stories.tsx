
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default function MemberStories() {
    const memberStories = [
    {
      name: "Dr. Nita Patel",
      title: "Vice President, Engineering",
      image: "https://picsum.photos/seed/nita-patel/400/500",
      imageHint: "professional woman portrait",
      quote: "It changes your life. AIIS membership helps you establish relationships that are tighter because you already have a lot of things in common in the way you think, work, and want to change the world around you.",
      bio: "Nita Patel, the 2023 president of the AI Computer Society, holds mathematics, electrical engineering, and computer engineering degrees from Southern Methodist University. She has also worked at L3Harris Technologies and R.S. Information Systems, Inc."
    },
    {
      name: "Dr. Vincent Kaabunga",
      title: "Lead Data Scientist",
      image: "https://picsum.photos/seed/vincent-k/400/500",
      imageHint: "professional man portrait",
      quote: "Being part of AIIS has accelerated my research and allowed me to collaborate on projects I never thought possible. The community is incredibly supportive.",
      bio: "Vincent is a lead data scientist specializing in natural language processing. His work focuses on creating more accessible AI-powered communication tools. He has published several papers in top AI conferences."
    },
    {
      name: "Dr. John McDonald",
      title: "AI Ethics Consultant",
      image: "https://picsum.photos/seed/john-mcdonald/400/500",
      imageHint: "man thinking",
      quote: "The society's focus on ethics is what drew me in. It's not just about what we can build, but what we should build. AIIS is leading that conversation.",
      bio: "John is an AI ethics consultant who works with tech companies and policymakers to ensure the responsible development and deployment of artificial intelligence. He is a frequent speaker at industry events."
    }
  ];

  const [activeStory, setActiveStory] = useState(memberStories[0]);

  return (
    <div className="member-stories-section">
        <div className="text-center mb-12">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Meet Our Members</h3>
            <h2 className="text-4xl font-bold mt-2">'What AIIS Membership Means to Me'</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
                <div className="member-tabs">
                    {memberStories.map((story, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveStory(story)}
                            className={`member-tab-btn ${story.name === activeStory.name ? 'active' : ''}`}
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
                      transition={{ duration: 0.3 }}
                      className="story-content mt-8"
                  >
                      <blockquote className="text-lg md:text-xl italic border-l-4 border-primary pl-6">
                          "{activeStory.quote}"
                      </blockquote>
                      <p className="mt-6 text-muted-foreground">{activeStory.bio}</p>
                      
                  </motion.div>
                </AnimatePresence>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <Image 
                      src={activeStory.image} 
                      alt={activeStory.name} 
                      width={400} 
                      height={500} 
                      className="rounded-lg object-cover shadow-2xl"
                      data-ai-hint={activeStory.imageHint}
                  />
                  <div className="member-caption">
                    <h4 className="font-bold">{activeStory.name}</h4>
                    <p className="text-sm">{activeStory.title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
        </div>
    </div>
  )
}

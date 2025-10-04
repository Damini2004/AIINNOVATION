
"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import { getCounters } from "@/app/dashboard/actions";
import type { Counter } from "@/app/dashboard/actions";

export default function CounterSection() {
    const [counters, setCounters] = useState([
        { icon: GraduationCap, number: 0, suffix: "+", label: "Members" },
        { icon: ClipboardCheck, number: 0, suffix: "+", label: "Projects" },
        { icon: Sparkles, number: 0, suffix: "", label: "International Journals" },
        { icon: Users, number: 0, suffix: "+", label: "Subscribers" },
    ]);
  const [counts, setCounts] = useState(counters.map(() => 0));
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  useEffect(() => {
    const fetchAndSetCounters = async () => {
        const data = await getCounters();
        if (data) {
            setCounters([
                { icon: GraduationCap, number: data.members, suffix: "+", label: "Members" },
                { icon: ClipboardCheck, number: data.projects, suffix: "+", label: "Projects" },
                { icon: Sparkles, number: data.journals, suffix: "", label: "International Journals" },
                { icon: Users, number: data.subscribers, suffix: "+", label: "Subscribers" },
            ]);
        }
    }
    fetchAndSetCounters();
  }, []);

  useEffect(() => {
    const section = document.getElementById("counter-section");
    const handleScroll = () => {
      if (!section || animationTriggered || counters.every(c => c.number === 0)) return;

      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        setAnimationTriggered(true);
        counters.forEach((counter, idx) => {
          let start = 0;
          const end = counter.number;
          const duration = 2000;
          if (end === 0) return;
          const increment = end / (duration / 20); // update every 20ms
          const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(interval);
            }
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[idx] = Math.floor(start);
              return newCounts;
            });
          }, 20);
        });
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationTriggered, counters]);

  return (
    <section
      id="counter-section"
      className="pt-[96px] pb-[47px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/assests/images/counter.jpg')",
      }}
      data-ai-hint="abstract texture"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex flex-wrap justify-center">
          {counters.map((counter, idx) => {
            const Icon = counter.icon;
            return (
              <div
                key={idx}
                className="w-full sm:w-1/2 lg:w-1/4 p-[15px] box-border cursor-pointer mb-[30px]"
              >
                <div className="flex items-center transform transition-transform duration-500 hover:rotate-3 hover:scale-105">
                  <div
                    className="relative z-10 overflow-visible mr-[15px] flex-shrink-0"
                    style={{ width: "85px", height: "85px" }}
                  >
                    <div
                      className="absolute top-[-2px] left-[-10px] w-[85px] h-[85px] transition-transform bg-no-repeat bg-center bg-cover"
                      style={{
                        transform: "rotate(-70deg)",
                        backgroundImage:
                          "url('/assests/images/coun.png')",
                      }}
                      data-ai-hint="geometric shape"
                    ></div>
                    <div className="relative inline-block transform transition-transform duration-500 hover:-rotate-12 flex items-center justify-center w-full h-full">
                      <Icon className="w-[50px] h-[50px] text-white" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-[40px] font-extrabold text-white m-0 inline-block">
                      {counts[idx]}
                      {counter.suffix && (
                        <span className="text-[38px] font-extrabold text-white">
                          {counter.suffix}
                        </span>
                      )}
                    </h3>
                    <h4 className="text-white text-[20px] font-medium mt-[8px]">
                      {counter.label}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

    
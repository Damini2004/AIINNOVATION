
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Calendar, Handshake, Star, BarChart, ShieldCheck, Users, Play } from "lucide-react";
import "./hostevent.css";
import "@/components/slider.css";


export default function HostEventPage() {
  const processSteps = [
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Event Information",
      description: "Provide a brief overview of the event.",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Motive",
      description: "Explain the motive and vision of the event.",
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Timelines",
      description: "Expected Timelines and possible deadlines of event.",
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: "Contribution to Society",
      description: "Explain how the event contributes to the society and sustainable development goals",
    },
  ];

  const benefits = [
      {
          icon: <Star className="w-10 h-10 text-primary" />,
          title: "Global Research Visibility",
          description: "Expand your reach with international exposure through AIIS’s strong academic and professional network worldwide."
      },
      {
          icon: <ShieldCheck className="w-10 h-10 text-primary" />,
          title: "Expert Curation & Quality Assurance",
          description: "Benefit from expert keynote speakers, reviewers, and peer-review processes ensuring academic excellence and credibility."
      },
      {
          icon: <Users className="w-10 h-10 text-primary" />,
          title: "End-to-End Event Support",
          description: "From event planning to publication management and promotions, AIIS provides complete support for smooth execution."
      },
      {
          icon: <FileText className="w-10 h-10 text-primary" />,
          title: "Publication Opportunities",
          description: "Gain access to Scopus-indexed proceedings, peer-reviewed journals, and special issues for high-impact research publishing."
      },
      {
          icon: <Handshake className="w-10 h-10 text-primary" />,
          title: "SDG & Policy Alignment",
          description: "Ensure events are aligned with UN Sustainable Development Goals, enhancing institutional rankings and global relevance."
      },
      {
          icon: <BarChart className="w-10 h-10 text-primary" />,
          title: "Collaborative Networking",
          description: "Connect with universities, industries, and policymakers to foster MoUs, joint projects, patents, and funded collaborations."
      },
  ];

  const stats = [
    { icon: <Users className="w-10 h-10" />, number: "8000+", label: "Members" },
    { icon: <Star className="w-10 h-10" />, number: "100K", label: "Global Reach" },
    { icon: <Calendar className="w-10 h-10" />, number: "47", label: "Events Collaborated every year" },
    { icon: <Handshake className="w-10 h-10" />, number: "1000+", label: "Testimonials" },
  ];

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            const targetNumber = parseInt(stats[targetIndex].number.replace(/[^0-9]/g, ''), 10);

            let start = 0;
            const duration = 1500;
            const increment = targetNumber / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= targetNumber) {
                start = targetNumber;
                clearInterval(timer);
              }
              setAnimatedStats(prev => {
                const newStats = [...prev];
                newStats[targetIndex] = Math.floor(start);
                return newStats;
              });
            }, 16);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('.counter-box');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [stats]);


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
       <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Host an Event</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">HOST AN EVENT</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="slider-area-two py-24 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(/assests/images/slider.jpg)'}}
        data-ai-hint="geometric shape"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 z-10">
              <h1 className="text-4xl font-bold">Collaborate</h1>
              <h2 className="text-3xl font-semibold">Host an Event with AI Innovation Society</h2>
              <p>Partner with Us to Shape the Future of Responsible AI</p>
               <Button asChild className="mt-6">
                  <Link href="/submitproposal">Submit Proposal</Link>
               </Button>
            </div>
             <div className="relative flex justify-center items-center">
                <div className="relative z-10 bounce-animate">
                    <Image src="/assests/images/slider-shape.png" alt="collaboration" width={500} height={500} data-ai-hint="collaboration abstract"/>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h5 className="text-primary font-semibold text-lg">Host an Event with AI Innovation Society</h5>
                <div className="em_bar_bg text-left"></div>
                <p className="text-justify text-muted-foreground">The AI Innovation Society (AIIS) invites universities, research institutions, and professional organizations to collaborate with us in hosting seminars, webinars, conferences, and special sessions. Together, we can create platforms that spark innovation, encourage interdisciplinary dialogue, and empower researchers, educators, and industry leaders in the field of Artificial Intelligence.</p>
                <p className="text-justify text-muted-foreground mt-4">
                  <strong>Types of Events We Support</strong><br/>
                  Academic Seminars & Webinars – Focused sessions for students, researchers, and faculty.<br/>
                  International Conferences – Flagship events with keynote speakers, technical sessions, and publication opportunities.<br/>
                  Special Sessions & Workshops – Theme-based tracks within larger conferences, hosted under AIIS branding.<br/>
                  Institutional Collaborations – Partner events co-branded with universities and research centers.
                </p>
            </div>
            <div className="relative group">
               <iframe width="100%" height="500px" src="https://www.youtube.com/embed/UYGbTqu4JDY?si=_LJ08zTbOr80lXzv&autoplay=1&mute=0" allow="autoplay" allowFullScreen></iframe>
                <a
                  href="https://www.youtube.com/embed/UYGbTqu4JDY?si=_LJ08zTbOr80lXzv&autoplay=1&mute=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pulse-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition"
                >
                  <Play className="h-10 w-10" />
                </a>
            </div>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="process-area-two py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h5 className="text-primary font-semibold uppercase">How to Apply</h5>
            <h2 className="text-3xl font-bold">Keep it Simple and <span className="text-primary">Clean</span></h2>
            <div className="em_bar_bg mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-box text-center">
                <div className="process-icon-wrapper">
                  <div className="process-icon">{step.icon}</div>
                  <span className="process-number">{`0${index + 1}`}</span>
                </div>
                <div className="process-content">
                  <h3 className="text-xl font-bold mt-4">{step.title}</h3>
                  <p className="text-muted-foreground mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="service-area-two py-24">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h5 className="text-primary font-semibold uppercase">Why Us?</h5>
                  <h2 className="text-3xl font-bold">Benefits of Collaboration with AI Innovation Society</h2>
                  <div className="em_bar_bg mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                      <div key={index} className="service-box-three">
                          <div className="service-box-inner">
                              <div className="service-icon">{benefit.icon}</div>
                              <h3 className="text-xl font-bold my-4">{benefit.title}</h3>
                              <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Counter Section */}
      <section className="counter-area-two py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="counter-box" data-index={index}>
                <div className="counter-icon">{stat.icon}</div>
                <div className="counter-content">
                  <h3 className="text-4xl font-bold">
                    {animatedStats[index]}{stat.number.replace(/[0-9]/g, '')}
                  </h3>
                  <p className="text-lg">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

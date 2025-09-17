"use client";

import { BarChart, Globe, Lock, Briefcase, Users, GitBranch } from 'lucide-react';

export default function WhatWeDo() {

    const services = [
        {
            icon: <BarChart />,
            title: "AI Education and Certification",
            description: "Delivering structured AI learning and certifications for students, educators, and professionals across disciplines",
            variant: "default"
        },
        {
            icon: <Globe />,
            title: "AI based Project Grant Supports",
            description: "Supporting AI-driven research and development through project grants and funding mentorships.",
            variant: "gradient"
        },
        {
            icon: <Lock />,
            title: "Global Conferences & Workshops",
            description: "Organizing international conferences, seminars, and workshops to foster AI collaboration and knowledge exchange.",
            variant: "default"
        },
        {
            icon: <Briefcase />,
            title: "Student Internships & Mentorship",
            description: "Providing hands-on internships and expert mentoring to nurture the next generation of AI innovators.",
            variant: "default"
        },
        {
            icon: <Users />,
            title: "Curriculum Development for Institutions",
            description: "Helping schools and universities build future-ready AI curricula aligned with global standards and SDGs.",
            variant: "default"
        },
        {
            icon: <GitBranch />,
            title: "Collaborative Innovation & Networking",
            description: "Creating a global network for AI professionals to collaborate, innovate, and drive ethical AI impact together.",
            variant: "default"
        }
    ];


  return (
    <div className="service-area style-six py-20">
      <div className="container mx-auto">
        <div className="text-center pb-12">
          <h5 className="text-primary font-semibold">WHAT WE DO</h5>
          <h2 className="text-3xl font-bold">
            Empowering the Future of <span className="text-primary">AI</span>
          </h2>
          <div className="em_bar_bg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                 <div key={index} className={service.variant === 'gradient' ? "dreamit-service-box-1 white" : "dreamit-service-box"}>
                    {service.variant === 'default' && 
                        <div className="service-icon">
                            {service.icon}
                        </div>
                    }
                    <div className="service-box-inner">
                         {service.variant === 'gradient' && 
                            <div className="service-icon">
                                {service.icon}
                            </div>
                        }
                        <div className="em-service-title">
                            <h2>{service.title}</h2>
                        </div>
                        <div className="em-service-text">
                            <p>{service.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

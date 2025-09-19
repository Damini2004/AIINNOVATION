
"use client";

import React from "react";
import Link from "next/link";
import {
  CircleDot,
  Compass,
  ShieldCheck,
  BrainCircuit,
  Briefcase,
  Layers,
  FileText,
  Users,
} from "lucide-react";
import "./curriculum.css";

export default function CurriculumSupportPage() {
  const scopeItems = [
    {
      icon: <CircleDot />,
      text: "AI in Engineering: Robotics, IoT, Computer Vision, Predictive Analytics",
    },
    {
      icon: <CircleDot />,
      text: "AI in Law: LegalTech, Sentiment Analysis, AI in Courtroom Automation",
    },
    {
      icon: <CircleDot />,
      text: "AI in Management: Business Intelligence, AI for Strategy, HR Analytics",
    },
    {
      icon: <CircleDot />,
      text: "AI in Medicine: Diagnosis Support, Imaging, Health Informatics",
    },
    {
      icon: <CircleDot />,
      text: "Multidisciplinary Modules: AI Ethics, AI for Social Good, SDG-Aligned Projects",
    },
  ];

  const offerItems = [
    { icon: <CircleDot />, text: "Custom AI syllabus design for UG/PG levels" },
    { icon: <CircleDot />, text: "Workshops and FDPs on AI tools and teaching" },
    { icon: <CircleDot />, text: "Open courseware with integrated project kits" },
    { icon: <CircleDot />, text: "AI lab establishment support and mentorship" },
    {
      icon: <CircleDot />,
      text: "Co-branding and joint certification opportunities",
    },
  ];

  const analysisItems = [
    {
      icon: <Compass />,
      title: "Delivery Mode",
      text: "Online / On-Campus / Hybrid",
    },
    {
      icon: <Layers />,
      title: "Course Types",
      text: "Core, Elective, Certification Tracks",
    },
    {
      icon: <BrainCircuit />,
      title: "Curriculum Duration",
      text: "Short-term (2-4 weeks) to Semester-long",
    },
    {
      icon: <Users />,
      title: "Faculty Involvement",
      text: "Train-the-Trainer & Joint Delivery",
    },
    {
      icon: <Briefcase />,
      title: "Global Alignment",
      text: "NEP 2020, SDGs, UNESCO AI Framework",
    },
    {
      icon: <FileText />,
      title: "Assessment Formats",
      text: "Project-Based, MCQs, Viva, Peer Review",
    },
    {
      icon: <ShieldCheck />,
      title: "Learning Resources",
      text: "Custom LMS Access, GitHub Repos, Case Banks",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Breadcrumb Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">AI Curriculum Design Support</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">CURRICULUM SUPPORT</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="career-details py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-8">
              <div className="single-details-box space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    Curriculum Design Support
                  </h3>
                  <p className="text-muted-foreground">
                    AI Innovation Society collaborates with universities and
                    institutions across disciplines to co-develop cutting-edge
                    Artificial Intelligence curriculum tailored for future-ready
                    learners. We help in embedding AI principles, tools, and
                    applications within academic frameworks to empower students
                    from engineering, law, management, medicine, and
                    multidisciplinary programs.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Our team of AI educators, researchers, and industry
                    professionals works closely with academic stakeholders to
                    create tailored AI modules. These include foundational
                    courses, practical labs, and project-based learning that
                    address national education frameworks, NEP 2020 guidelines,
                    and global standards like UNESCO AI competencies and SDG
                    integration.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">Service Overview</h4>
                  <p className="text-muted-foreground">
                    We offer end-to-end support to academic institutions for
                    designing and deploying AI-centric curriculum that suits
                    their department's goals. Our offerings span undergraduate,
                    postgraduate, and vocational levels with provisions for
                    electives, skill-based certifications, and
                    research-integrated learning paths.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    This initiative equips institutions with the knowledge and
                    support to align their programs with industry 4.0 needs. We
                    also support faculty development, hands-on training, and
                    AI-in-education workshops to build sustainable academic
                    ecosystems.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                    Scope of Curriculum Collaboration
                  </h4>
                  <ul className="details-list">
                    {scopeItems.map((item, index) => (
                      <li key={index}>
                        {React.cloneElement(item.icon, {
                          className: "icon",
                        })}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">We Offer</h4>
                  <ul className="details-list">
                    {offerItems.map((item, index) => (
                      <li key={index}>
                         {React.cloneElement(item.icon, {
                          className: "icon",
                        })}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4">
              <div className="side-details-box space-y-2">
                {analysisItems.map((item, index) => (
                  <div key={index} className="career-analysis-card">
                    <div className="career-icon">
                       {React.cloneElement(item.icon, {
                          className: "w-8 h-8 text-primary",
                        })}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

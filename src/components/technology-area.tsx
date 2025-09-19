
"use client";

import { GraduationCap, Users, Sparkles, ClipboardCheck, CheckCircle2 } from "lucide-react";


export default function TechnologyArea() {
  return (
    <section className="technology-area py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 - AI Education */}
            <div className="group rounded-xl shadow-lg p-8 text-foreground bg-card flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:text-primary-foreground"
                 style={{
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   backgroundRepeat: "no-repeat",
                 }}
                 onMouseOver={e => {
                    e.currentTarget.style.backgroundImage = "url(/assests/images/feature.png), linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))";
                 }}
                 onMouseOut={e => {
                    e.currentTarget.style.backgroundImage = "";
                 }}
                 data-ai-hint="education abstract"
                 >
              <GraduationCap className="w-12 h-12 mb-2 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              <h2 className="font-bold text-xl transition-colors duration-300 group-hover:text-primary-foreground">AI Education</h2>
              <p className="text-base leading-relaxed max-w-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                Courses, internships, and curriculum to upskill students and educators in AI.
              </p>
            </div>

            {/* Card 2 - Research */}
            <div className="group rounded-xl shadow-lg p-8 text-foreground bg-card flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:text-primary-foreground"
                 style={{
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   backgroundRepeat: "no-repeat",
                 }}
                 onMouseOver={e => {
                    e.currentTarget.style.backgroundImage = "url(/assests/images/feature.png), linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))";
                 }}
                 onMouseOut={e => {
                    e.currentTarget.style.backgroundImage = "";
                 }}
                 >
              <ClipboardCheck className="w-12 h-12 mb-2 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              <h2 className="font-bold text-xl text-foreground transition-colors duration-300 group-hover:text-primary-foreground">Research</h2>
              <p className="text-base leading-relaxed max-w-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                Hosting of AI domain journals for ethical research dissemination.
              </p>
            </div>

            {/* Card 3 - AI for Social Good */}
            <div className="group rounded-xl shadow-lg p-8 text-foreground bg-card flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:text-primary-foreground"
                 style={{
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   backgroundRepeat: "no-repeat",
                 }}
                 onMouseOver={e => {
                    e.currentTarget.style.backgroundImage = "url(/assests/images/feature.png), linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))";
                 }}
                 onMouseOut={e => {
                    e.currentTarget.style.backgroundImage = "";
                 }}
                >
              <Sparkles className="w-12 h-12 mb-2 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              <h2 className="font-bold text-xl text-foreground transition-colors duration-300 group-hover:text-primary-foreground">AI for Social Good</h2>
              <p className="text-base leading-relaxed max-w-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                Initiatives that use AI to address challenges in healthcare and equity.
              </p>
            </div>

            {/* Card 4 - Memberships */}
            <div className="group rounded-xl shadow-lg p-8 text-foreground bg-card flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:text-primary-foreground"
                 style={{
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   backgroundRepeat: "no-repeat",
                 }}
                 onMouseOver={e => {
                    e.currentTarget.style.backgroundImage = "url(/assests/images/feature.png), linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))";
                 }}
                 onMouseOut={e => {
                    e.currentTarget.style.backgroundImage = "";
                 }}
                 data-ai-hint="community abstract"
                 >
              <Users className="w-12 h-12 mb-2 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              <h2 className="font-bold text-xl transition-colors duration-300 group-hover:text-primary-foreground">Memberships</h2>
              <p className="text-base leading-relaxed max-w-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                Open to students, professionals, researchers, and institutions.
              </p>
            </div>
          </div>


          {/* Right side - Content */}
          <div>
            <h5 className="text-primary font-bold uppercase tracking-wide">
              What We Do?
            </h5>
            <h2 className="text-3xl font-extrabold text-foreground mt-2">
              Empowering the Future of <br />
              <span className="text-primary">AI Innovation</span>
            </h2>
            <div className="em_bar_bg my-4 h-1 w-24 bg-primary"></div>
            <p className="text-muted-foreground mb-6">
              AI Innovation Society is a global platform fostering ethical,
              inclusive, and impactful advancements in Artificial Intelligence.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-foreground p-6 rounded-xl">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>AI Education and Certification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Student Internships & Mentorship</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Ethical AI Research & Publications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Curriculum Development for Institutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>AI based Project Grant Supports</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Women in AI Leadership Programs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Global Conferences & Workshops</span>
              </div>
              <div className="flex items-center space-x-2">
               <CheckCircle2 className="w-6 h-6 text-primary" />
                <span>Collaborative Innovation & Networking</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

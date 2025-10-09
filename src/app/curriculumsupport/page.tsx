
import Link from "next/link";
import type { Metadata } from 'next';
import CurriculumSupportContent from "./curriculum-support-content";
import "./curriculum.css";

export const metadata: Metadata = {
  title: 'AI Curriculum Design Support',
  description: 'Collaborate with AI Innovation Society to co-develop cutting-edge Artificial Intelligence curriculum for your institution, tailored for future-ready learners.',
};

export default function CurriculumSupportPage() {
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
      <CurriculumSupportContent />
    </div>
  );
}

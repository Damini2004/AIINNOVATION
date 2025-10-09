
import Link from "next/link";
import type { Metadata } from 'next';
import MissionVisionContent from "./mission-vision-content";

export const metadata: Metadata = {
  title: 'Mission & Vision',
  description: 'Our mission is to empower individuals and communities by advancing responsible AI. Our vision is to build an inclusive AI ecosystem that prioritizes ethics, equity, and sustainability.',
};

export default function MissionVisionPage() {

  return (
    <div className="bg-background text-foreground">
      {/* Breadcrumb Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Mission and Vision</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">MISSION AND VISION</span>
          </div>
        </div>
      </section>
      <MissionVisionContent />
    </div>
  );
}

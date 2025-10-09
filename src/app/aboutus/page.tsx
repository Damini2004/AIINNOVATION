
import Link from "next/link";
import AboutUsContent from "./about-us-content";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the AI Innovation Society, a global platform fostering responsible AI innovation through education, research, social impact, and academic publishing.',
};

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)"}}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">ABOUT US</span>
          </div>
        </div>
      </section>

      <AboutUsContent />
    </div>
  );
}


import Link from "next/link";
import "./library.css";
import type { Metadata } from 'next';
import DigitalLibraryContent from "./digital-library-content";

export const metadata: Metadata = {
  title: 'Digital Library',
  description: 'Access a vast repository of AI research papers, articles, and publications from the AI Innovation Society digital library.',
};


export default function DigitalLibraryPage() {

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract library"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Digital Library</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">DIGITAL LIBRARY</span>
          </div>
        </div>
      </section>

      <DigitalLibraryContent />
    </div>
  );
}

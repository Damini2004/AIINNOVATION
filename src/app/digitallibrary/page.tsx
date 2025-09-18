
import Link from "next/link";

export default function DigitalLibraryPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
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

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Content Coming Soon</h2>
            <p className="mt-4 text-muted-foreground">This page is under construction. Check back later for our digital library resources.</p>
        </div>
      </main>
    </div>
  );
}


import Link from "next/link";

export default function SubmitProposalPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-24 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Submit a Proposal</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">SUBMIT PROPOSAL</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Content Coming Soon</h2>
            <p className="mt-4 text-muted-foreground">This page is under construction. Check back later for information on how to submit a proposal.</p>
        </div>
      </main>
    </div>
  );
}

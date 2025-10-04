
import Link from "next/link";
import RegistrationForm from "./registration-form";
import "./registrations.css";

export default function RegistrationsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Registration</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">REGISTRATION</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">
              Join the AI Innovation Society
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Complete the form below to begin your journey with a global
              community of AI enthusiasts and experts.
            </p>
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}

    
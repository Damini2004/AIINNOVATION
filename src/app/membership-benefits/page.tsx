
import Link from "next/link";
import MemberServices from "../become-a-member/member-services";
import "../become-a-member/member-services.css";
import ApprovedMembers from "@/components/approved-members";
import "@/app/members.css";

export default function MembershipBenefitsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Membership Benefits</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">MEMBERSHIP BENEFITS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <MemberServices />
      <ApprovedMembers />
    </div>
  );
}

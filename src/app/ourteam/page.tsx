
"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getMembers } from "../admin/actions";
import type { Member } from "../admin/actions";
import { Skeleton } from "@/components/ui/skeleton";


export default function OurTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const membersData = await getMembers();
      setMembers(membersData);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Those Who Made it Possible..</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">OUR MEMBERS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="team-area style-two py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Meet the Minds Behind the AI Innovation <span className="text-primary">Society</span>
            </h2>
            <div className="em_bar_bg mt-4"></div>
            <div className="max-w-4xl mx-auto text-left space-y-4 text-muted-foreground mt-6">
              <p>
                The AI Innovation Society is guided by a multidisciplinary team of researchers, educators, engineers, policy experts, and visionary leaders dedicated to harnessing the power of artificial intelligence for societal good. Our team represents a dynamic blend of academic excellence, industry innovation, and grassroots engagement—each member contributing unique expertise to advance ethical, inclusive, and impactful AI solutions.
              </p>
              <p>
                Our educators and curriculum designers work closely with institutions to integrate AI literacy into schools, colleges, and professional training programs, nurturing a new generation of informed and empowered AI users and innovators. Simultaneously, our research leads and journal editors actively engage with scholars and practitioners to build platforms for high-quality, peer-reviewed research that addresses real-world challenges.
              </p>
              <p>
                Together, the AI Innovation Society’s leadership fosters a global network that is not just reacting to the AI revolution—but actively shaping it for the betterment of society, the environment, and future generations. We invite collaborators, institutions, and individuals to join us on this mission to ensure AI is a force for good.
              </p>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href="/registrations">Join Now</Link>
            </Button>
          </div>

          {loading ? (
             <div className="team-grid">
               {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="team-card">
                    <Skeleton className="team-img" style={{height: '250px'}}/>
                    <div className="team-info">
                        <Skeleton className="h-5 w-3/4 mb-2"/>
                        <Skeleton className="h-4 w-1/2"/>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="team-grid">
              {members.map((member) => (
                <div key={member.id} className="team-card">
                  <div className="team-img-wrapper">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="team-img"
                      data-ai-hint="member portrait"
                    />
                    <div className="team-overlay">
                      <div className="team-social">
                        {member.facebookUrl && <a href={member.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>}
                        {member.twitterUrl && <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></a>}
                        {member.linkedinUrl && <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a>}
                      </div>
                    </div>
                  </div>
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

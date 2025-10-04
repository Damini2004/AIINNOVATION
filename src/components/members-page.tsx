
"use client";

import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getMembers } from "@/app/admin/actions";
import type { Member } from "@/app/admin/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const membersData = await getMembers();
        // Display a subset of members, e.g., the first 8
        setMembers(membersData.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="team-area py-20 bg-secondary">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h5 className="text-primary text-sm font-bold mb-2">Our Team</h5>
                <h2 className="text-3xl font-extrabold text-foreground">Meet Our Members</h2>
                <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
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
                {members.map((member, index) => (
                    <div key={index} className="team-card">
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
             <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/ourteam">View All Members</Link>
                </Button>
            </div>
        </div>
    </div>
  );
}

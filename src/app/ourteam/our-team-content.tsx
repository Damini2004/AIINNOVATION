
"use client";

import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getMembers } from "../admin/actions";
import type { Member } from "../admin/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function OurTeamContent() {
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
    <>
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
    </>
  );
}

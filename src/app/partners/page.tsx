
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPartners } from "../admin/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, Linkedin, Pinterest, Twitter } from "lucide-react";
import "../members.css";

type Partner = {
  id?: string;
  name: string;
  designation: string;
  logo: string;
  facebookUrl?: string;
  twitterUrl?: string;
  pinterestUrl?: string;
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const partnersData = await getPartners();
      setPartners(partnersData as Partner[]);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-20 bg-secondary relative bg-cover bg-center"
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Our Partners</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">PARTNERS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="team-area py-24">
        <div className="container mx-auto px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Valued Partners</h2>
             <div className="em_bar_bg mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading organizations and institutions to
              advance the field of AI. Our partnerships are crucial in helping us
              achieve our mission.
            </p>
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
              {partners.map((partner) => (
                <div key={partner.id} className="team-card">
                    <div className="team-img-wrapper">
                        {partner.logo && (
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={400}
                                height={400}
                                className="team-img"
                                style={{objectFit: 'contain', padding: '1rem'}}
                                data-ai-hint="partner logo"
                            />
                        )}
                         <div className="team-overlay">
                            <div className="team-social">
                                {partner.facebookUrl && <a href={partner.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>}
                                {partner.twitterUrl && <a href={partner.twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></a>}
                                {partner.pinterestUrl && <a href={partner.pinterestUrl} target="_blank" rel="noopener noreferrer"><Pinterest className="h-5 w-5" /></a>}
                            </div>
                        </div>
                    </div>
                     <div className="team-info">
                        <h4>{partner.name}</h4>
                        <p>{partner.designation}</p>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPartners } from "../admin/actions";
import { Skeleton } from "@/components/ui/skeleton";

type Partner = {
  id?: string;
  name: string;
  logo: string;
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
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
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
      <main className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Our Valued Partners</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We collaborate with leading organizations and institutions to
            advance the field of AI. Our partnerships are crucial in helping us
            achieve our mission.
          </p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-12">
               {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-12 items-center">
              {partners.map((partner) => (
                <div key={partner.id} className="flex justify-center grayscale hover:grayscale-0 transition duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

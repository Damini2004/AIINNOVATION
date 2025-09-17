"use client";

import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function MembersPage() {
  const members = [
    { name: "Dr. Anishkumar D", role: "Head - AI and Industry", img: "https://picsum.photos/seed/anish/400/400" },
    { name: "Dr. Sukhvinder Dari", role: "Head - AI and LAW", img: "https://picsum.photos/seed/dari/400/400" },
    { name: "Dr. Nitin Sherje", role: "Mentor - AI and Automation", img: "https://picsum.photos/seed/sherje/400/400" },
    { name: "Dr. Parikshit Mahalle", role: "Head - AI and DS Lead Trainer", img: "https://picsum.photos/seed/parikshit/400/400" },
    { name: "Dr. Vivek Deshpande", role: "Head - AI and Technology (Industry)", img: "https://picsum.photos/seed/vivek/400/400" },
    { name: "Dr. Dippanita Mondal", role: "AI and Medical Imaging", img: "https://picsum.photos/seed/mondal/400/400" },
    { name: "Dr. Naveen Jain", role: "Head - AI and Administration", img: "https://picsum.photos/seed/naveen/400/400" },
    { name: "Dr. Avinash Pawar", role: "Mentor - AI and Mechatronics", img: "https://picsum.photos/seed/avinash/400/400" },
  ];

  return (
    <div className="team-area py-20 bg-secondary">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h5 className="text-primary text-sm font-bold mb-2">Our Team</h5>
                <h2 className="text-3xl font-extrabold text-foreground">Meet Our Members</h2>
                <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
            </div>
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
                        <a href="#"><Facebook className="h-5 w-5" /></a>
                        <a href="#"><Twitter className="h-5 w-5" /></a>
                        <a href="#"><Linkedin className="h-5 w-5" /></a>
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
        </div>
    </div>
  );
}

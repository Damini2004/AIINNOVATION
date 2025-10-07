
"use client";

import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";

export function Footer() {
  const usefulLinks = [
    { label: "Become a Member", href: "/become-a-member" },
    { label: "Ongoing Courses", href: "/courses" },
    { label: "About Society", href: "/aboutus" },
    { label: "Event Information", href: "/upcomingevents" },
    { label: "Collaborations", href: "/partners" },
  ];

  const journalLinks = [
    { label: "Engineering", href: "/journals" },
    { label: "Management", href: "/journals" },
    { label: "Social Science", href: "/journals" },
    { label: "Arts & Humanities", href: "/journals" },
    { label: "Medicine", href: "/journals" },
  ];


  return (
    <footer
      className="pt-20 pb-3 bg-cover bg-center bg-secondary"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div>
            <div className="mb-10">
               <Image
                     src="/assests/images/logo3.png" // replace with your logo path inside public folder
                     alt="Datatech Logo"
                     width={250} // adjust size
                     height={63}
                   />
            </div>
          </div>

          {/* Column 2 - Useful Links */}
          <div>
            <h4 className="text-xl font-semibold mt-5 mb-4 text-foreground">Useful Links</h4>
            <ul className="space-y-3 relative">
              {usefulLinks.map((link, i) => (
                <li key={i} className="pl-6 relative">
                  <span className="absolute left-0 top-2 w-2.5 h-0.5 bg-primary" />
                  <Link
                    href={link.href}
                    className="text-[16px] text-muted-foreground link-gradient"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Journals */}
          <div>
            <h4 className="text-xl font-semibold mt-5 mb-4 text-foreground">Journals</h4>
            <ul className="space-y-3 relative">
              {journalLinks.map((link, i) => (
                <li key={i} className="pl-6 relative">
                  <span className="absolute left-0 top-2 w-2.5 h-0.5 bg-primary" />
                  <Link
                    href={link.href}
                    className="text-[16px] text-muted-foreground link-gradient"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-xl font-semibold mt-5 mb-4 text-foreground">Contact Us</h4>
           
            <p className="text-base text-muted-foreground mb-2">+91 7020892896</p>
            <p className="text-base text-muted-foreground">info@aiinsociety.in</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Copyright © AIIS all rights reserved.
          </p>
          <ul className="flex gap-6 mt-4 md:mt-0">
            <li>
              <Link
                href="/tnc"
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import "./header.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");
     // Close mobile menu on navigation
    setIsOpen(false);
  }, [pathname]);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const AdminLink = () => (
     <li>
        <Link href={isAdminLoggedIn ? "/admin" : "/login"}>
          Admin
        </Link>
      </li>
  );

  return (
    <header
      id="sticky-header"
      className="datatech_nav_manu"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        paddingLeft: "20px",
        paddingRight: "20px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div className="container w-full mx-auto">
        {/* Navbar wrapper */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" title="datatech">
      <Image
        src="/assests/images/logo.png" // replace with your logo path inside public folder
        alt="Datatech Logo"
        width={160} // adjust size
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>

          {/* Hamburger button */}
          <button
            className="lg:hidden text-2xl text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:block datatech_menu">
            <ul
              className="nav_scroll d-flex align-items-center"
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "25px",
                padding: 0,
              }}
            >
              <li><Link href="/">Home</Link></li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  About <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/aboutus">Overview</Link></li>
                  <li><Link href="/missionvision">Mission & Vision</Link></li>
                  <li><Link href="/ourteam">Our Members</Link></li>
                  <li><Link href="/partners">Partners</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  Programs <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/courses">AI Education and Courses</Link></li>
                  <li><Link href="/studentinternships">Student Internships</Link></li>
                  <li><Link href="/curriculumsupport">Curriculum Support</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  Events <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/upcomingevents">Upcoming Events</Link></li>
                  <li><Link href="/pastevents">Past Events</Link></li>
                  <li><Link href="/hostevent">Host an Event</Link></li>
                  <li><Link href="/submitproposal">Submit Proposal</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  Publications <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/journals">AI Journals</Link></li>
                  <li><Link href="/ethics">Ethics and Policies</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  Resources <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/news">News & Blog</Link></li>
                  <li><Link href="/researchhighlights">Research Highlights</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="flex items-center gap-1">
                  Membership <ChevronDown className="h-4 w-4" />
                </a>
                <ul className="sub-menu">
                  <li><Link href="/join">Join AIIS</Link></li>
                  <li><Link href="/institutional">Institutional Membership</Link></li>
                  <li><Link href="/volunteer">Volunteer Opportunities</Link></li>
                </ul>
              </li>

              <li><Link href="/contact-us">Contact</Link></li>
              <AdminLink />
            </ul>
          </nav>
        </div>

        {/* Mobile Menu with dropdowns */}
        {isOpen && (
          <nav className="lg:hidden absolute left-0 top-[60px] w-full bg-white shadow-lg datatech_menu">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px",
                gap: "10px",
              }}
            >
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <Link href="/">Home</Link>
              </li>

              {/* About */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("about")}
                >
                  About {openDropdown === "about" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "about" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/aboutus">Overview</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/missionvision">Mission & Vision</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/ourteam">Our Members</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/partners">Partners</Link></li>
                  </ul>
                )}
              </li>

              {/* Programs */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("programs")}
                >
                  Programs {openDropdown === "programs" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "programs" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/courses">AI Education and Courses</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/studentinternships">Student Internships</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/curriculumsupport">Curriculum Support</Link></li>
                  </ul>
                )}
              </li>

              {/* Events */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("events")}
                >
                  Events {openDropdown === "events" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "events" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/upcomingevents">Upcoming Events</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/pastevents">Past Events</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/hostevent">Host an Event</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/submitproposal">Submit Proposal</Link></li>
                  </ul>
                )}
              </li>

              {/* Publications */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("publications")}
                >
                  Publications {openDropdown === "publications" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "publications" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/journals">AI Journals</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/ethics">Ethics and Policies</Link></li>
                  </ul>
                )}
              </li>

              {/* Resources */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("resources")}
                >
                  Resources {openDropdown === "resources" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "resources" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/news">News & Blog</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/researchhighlights">Research Highlights</Link></li>
                  </ul>
                )}
              </li>

              {/* Membership */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("membership")}
                >
                  Membership {openDropdown === "membership" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "membership" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/join">Join AIIS</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/institutional">Institutional Membership</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/volunteer">Volunteer Opportunities</Link></li>
                  </ul>
                )}
              </li>

              <li><Link href="/contact-us">Contact</Link></li>
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <Link href={isAdminLoggedIn ? "/admin" : "/login"}>
                    Admin
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

    
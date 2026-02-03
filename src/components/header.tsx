"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import "./header.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const getSessionWithExpiry = (key: string) => {
    if (typeof window === 'undefined') return null;
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  };


  useEffect(() => {
    setIsClient(true);
    const userSession = getSessionWithExpiry("userSession");
    const adminSession = getSessionWithExpiry("adminSession");
    
    setIsLoggedIn(!!userSession?.loggedIn || !!adminSession?.loggedIn);
    setIsAdmin(!!adminSession?.loggedIn);
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on navigation
    if(isOpen) {
        setIsOpen(false);
    }
  }, [pathname]);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const AuthLink = () => {
    if (!isClient) {
      // On the server, and initial client render, render a placeholder
      return <li><Link href="/registrations"></Link></li>;
    }
    
    if (isAdmin) {
      return <li><Link href="/admin">Dashboard</Link></li>;
    }
    if (isLoggedIn) {
      return <li><Link href="/user-dashboard">Profile</Link></li>;
    }
    
    return <li><Link href="/registrations"></Link></li>;
  };

  const MobileAuthLink = () => {
     if (!isClient) {
      return <li className="hover:bg-gray-100 rounded px-3 py-2"><Link href="/registrations">Registrations</Link></li>;
    }
    
    if (isAdmin) {
      return <li className="hover:bg-gray-100 rounded px-3 py-2 text-black"><Link href="/admin">Dashboard</Link></li>;
    }
    if (isLoggedIn) {
      return <li className="hover:bg-gray-100 rounded px-3 py-2 text-black"><Link href="/user-dashboard">Profile</Link></li>;
    }
    
    return <li className="hover:bg-gray-100 rounded px-3 py-2 text-black"><Link href="/registrations">Registrations</Link></li>;
  }


  return (
    <header
      id="sticky-header"
      className={`datatech_nav_manu ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container w-full mx-auto">
        {/* Navbar wrapper */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-20" title="AI Innovation Society">
             <Image
                src="/assests/images/AIIS New Logo 2.png"
                alt="AI Innovation Society Logo 2"
                width={160}
                height={40}
                className="h-24 w-auto"
              />
          </Link>

          {/* Hamburger button */}
          <button
            className={cn("lg:hidden text-2xl relative z-20", isScrolled ? "text-white" : "text-black")}
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
                <button type="button" className="flex items-center gap-1">
                  About <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/aboutus">Overview</Link></li>
                  <li><Link href="/missionvision">Mission & Vision</Link></li>
                  <li><Link href="/partners">Partners</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button type="button" className="flex items-center gap-1">
                  Programs <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/courses">AI Education and Courses</Link></li>
                  <li><Link href="/studentinternships">Student Internships</Link></li>
                  <li><Link href="/curriculumsupport">Curriculum Support</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button type="button" className="flex items-center gap-1">
                  Events <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/upcomingevents">Upcoming Events</Link></li>
                  <li><Link href="/pastevents">Past Events</Link></li>
                  <li><Link href="/hostevent">Host an Event</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button type="button" className="flex items-center gap-1">
                  Research <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/journals">Publications</Link></li>
                  <li><Link href="/hostjournal">Host a journal with AIIS</Link></li>
                  <li><Link href="/associate-journal">Associated Journal</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button type="button" className="flex items-center gap-1">
                  Resources <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/digitallibrary">Digital Library</Link></li>
                  <li><Link href="/educationalresources">Educational Resources</Link></li>
                  <li><Link href="/freecourses">Free Courses</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <button type="button" className="flex items-center gap-1">
                  Membership <ChevronDown className="h-4 w-4" />
                </button>
                <ul className="sub-menu">
                  <li><Link href="/become-a-member">Become a Member</Link></li>
                  <li><Link href="/institution-chapter">Institution Chapter</Link></li>
                  <li><Link href="/volunteer">Volunteer Opportunities</Link></li>
                  <li><Link href="/types-of-memberships">Types of Memberships</Link></li>
                  <li><Link href="/membership-benefits">Membership Benefits</Link></li>
                  <li><Link href="/ourteam">Our Members</Link></li>
                </ul>
              </li>
              <AuthLink />
              <li><Link href="/contact-us">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu with dropdowns */}
        {isOpen && (
          <nav className="lg:hidden fixed left-0 top-[90px] w-full h-[calc(100vh-90px)] bg-white shadow-lg datatech_menu z-10 overflow-y-auto pb-8">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px",
                gap: "10px",
              }}
            >
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <Link href="/">Home</Link>
              </li>

              {/* About */}
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <button
                  type="button"
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("about")}
                >
                  About {openDropdown === "about" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "about" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/aboutus">Overview</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/missionvision">Mission & Vision</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/partners">Partners</Link></li>
                  </ul>
                )}
              </li>

              {/* Programs */}
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <button
                  type="button"
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
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <button
                  type="button"
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
                  </ul>
                )}
              </li>

              {/* Research */}
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <button
                  type="button"
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("research")}
                >
                  Research {openDropdown === "research" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "research" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/journals">Publications</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/hostjournal">Host a journal with AIIS</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/associate-journal">Associated Journal</Link></li>
                  </ul>
                )}
              </li>

              {/* Resources */}
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black">
                <button
                  type="button"
                  className="flex justify-between w-full font-medium"
                  onClick={() => toggleDropdown("resources")}
                >
                  Resources {openDropdown === "resources" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "resources" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/digitallibrary">Digital Library</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/educationalresources">Educational Resources</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/freecourses">Free Courses</Link></li>
                  </ul>
                )}
              </li>

              {/* Membership */}
              <li className="hover:bg-gray-100 rounded px-3 py-2">
                <button
                  type="button"
                  className="flex justify-between w-full font-medium text-black"
                  onClick={() => toggleDropdown("membership")}
                >
                  Membership {openDropdown === "membership" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openDropdown === "membership" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/become-a-member">Become a Member</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/institution-chapter">Institution Chapter</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/volunteer">Volunteer Opportunities</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/types-of-memberships">Types of Memberships</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/membership-benefits">Membership Benefits</Link></li>
                    <li className="hover:bg-gray-200 rounded px-2 py-1"><Link href="/ourteam">Our Members</Link></li>
                  </ul>
                )}
              </li>
              <MobileAuthLink />
              <li className="hover:bg-gray-100 rounded px-3 py-2 text-black"><Link href="/contact-us">Contact</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

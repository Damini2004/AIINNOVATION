
"use client";

import { Library, Users, GitMerge, Award, Briefcase, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MemberServices() {
    const services = [
        {
            icon: <Library />,
            title: "Exclusive Content",
            description: "Access our rich library of AI courses, workshops, and cutting-edge research papers.",
        },
        {
            icon: <Users />,
            title: "Networking Events",
            description: "Receive invitations to member-only virtual and in-person events to connect with peers and experts.",
            variant: "gradient",
        },
        {
            icon: <GitMerge />,
            title: "Collaborative Projects",
            description: "Find collaborators and contribute to impactful, real-world AI projects in our innovation hub.",
        },
        {
            icon: <Award />,
            title: "Career Center",
            description: "Explore exclusive job postings, internship opportunities, and career development resources.",
        },
        {
            icon: <Briefcase />,
            title: "Publishing Perks",
            description: "Get discounts on publication fees and opportunities to publish in our affiliated journals.",
        },
        {
            icon: <MessageSquare />,
            title: "Mentorship Program",
            description: "Connect with experienced mentors in your field for personalized guidance and support.",
            variant: "gradient",
        }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    };


  return (
    <div className="member-service-area py-20 bg-blue-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center pb-12">
          <h5 className="text-primary font-semibold uppercase">Member Services</h5>
          <h2 className="text-3xl font-bold">
            Everything You Need to Succeed in <span className="text-primary">AI</span>
          </h2>
          <div className="em_bar_bg"></div>
        </div>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {services.map((service, index) => (
                 <motion.div
                    key={index}
                    className={`member-service-card ${service.variant === 'gradient' ? 'variant-gradient' : ''}`}
                    variants={itemVariants}
                  >
                    <motion.div
                      className="service-icon"
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {service.icon}
                    </motion.div>
                    <div className="service-content">
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}

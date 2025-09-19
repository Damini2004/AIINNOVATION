
"use client";

import { Code, Megaphone, PenTool, Handshake, Users, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VolunteerServices() {
    const opportunities = [
        {
            icon: <Code />,
            title: "AI Project Contributor",
            description: "Join a research project and contribute your coding, data analysis, or modeling skills.",
        },
        {
            icon: <PenTool />,
            title: "Content Creator",
            description: "Write articles, create tutorials, or design graphics to help us share AI knowledge with the world.",
        },
        {
            icon: <Megaphone />,
            title: "Event Ambassador",
            description: "Help us organize, promote, and run workshops, webinars, and conferences.",
        },
        {
            icon: <Handshake />,
            title: "Community Moderator",
            description: "Engage with our community, answer questions, and foster a collaborative online environment.",
        },
        {
            icon: <Users />,
            title: "Chapter Leader",
            description: "Start or lead an AIIS chapter at your local institution or in your city to build a local community.",
        },
        {
            icon: <Presentation />,
            title: "Guest Speaker/Mentor",
            description: "Share your expertise by mentoring students or giving talks at our events and workshops.",
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
    <div className="volunteer-service-area py-20 bg-blue-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center pb-12">
          <h5 className="text-primary font-semibold uppercase">Volunteer Roles</h5>
          <h2 className="text-3xl font-bold text-white">
            Find Your Place to Contribute
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
            {opportunities.map((service, index) => (
                 <motion.div
                    key={index}
                    className="volunteer-service-card"
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

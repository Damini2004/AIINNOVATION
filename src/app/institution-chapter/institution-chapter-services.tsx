
"use client";

import { Building, BookOpen, Mic, Award, FlaskConical, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InstitutionChapterServices() {
    const services = [
        {
            icon: <BookOpen />,
            title: "Curriculum Support",
            description: "Receive guidance and resources to integrate AI into your institution's existing curriculum.",
        },
        {
            icon: <Mic />,
            title: "Event Hosting",
            description: "Get support for organizing workshops, seminars, and hackathons under the AIIS banner.",
        },
        {
            icon: <FlaskConical />,
            title: "Research Collaboration",
            description: "Connect your faculty and students with our global network for collaborative research projects.",
        },
        {
            icon: <Award />,
            title: "Certification Programs",
            description: "Offer exclusive AIIS certification programs to your students at a discounted rate.",
        },
        {
            icon: <Users />,
            title: "Guest Lectures",
            description: "Arrange for AI experts from our network to deliver guest lectures and talks at your institution.",
        },
        {
            icon: <Building />,
            title: "Lab Setup Assistance",
            description: "Receive mentorship and guidance on establishing and running an AI-focused lab or center of excellence.",
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
    <div className="chapter-service-area py-20 bg-blue-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center pb-12">
          <h5 className="text-primary font-semibold uppercase">Chapter Services</h5>
          <h2 className="text-3xl font-bold text-white">
            What Your Institution Gains
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
                    className="chapter-service-card"
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

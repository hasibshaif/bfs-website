"use client";
import React from "react";
import { motion } from "motion/react";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { IconType } from "react-icons";
import Image from "next/image";

interface MemberLink {
  type: string;
  url: string;
  icon: IconType;
  label: string;
}

interface Member {
  name: string;
  position: string;
  year: string;
  image: string;
  linkedin: string;
  links: MemberLink[];
}

export default function People() {
  const executiveBoard: Member[] = [
    {
      name: "Gregory Tomchuk",
      position: "President",
      year: "Junior",
      image: "/images/people/gregory-tomchuk.jpeg",
      linkedin: "https://www.linkedin.com/in/gregory-tomchuk",
      links: []
    },
    {
      name: "Nabil Hasan",
      position: "Vice President",
      year: "Junior",
      image: "/images/people/nabil-hasan.jpeg",
      linkedin: "https://www.linkedin.com/in/nabil-hasan1",
      links: []
    },
    {
      name: "Hasib Shaif",
      position: "Secretary",
      year: "Senior",
      image: "/images/people/hasib-shaif.jpeg",
      linkedin: "https://www.linkedin.com/in/hasib-shaif/",
      links: [
        {
          type: "website",
          url: "https://hasibshaif.us",
          icon: FaGlobe,
          label: "Personal Website"
        }
      ]
    },
    {
      name: "Mohsin Ali",
      position: "Treasurer",
      year: "Senior",
      image: "/images/people/mohsin-ali.jpeg",
      linkedin: "https://www.linkedin.com/in/mohsin-ali27",
      links: []
    }
  ];

  const committee: Member[] = [
    {
      name: "Nishat Angum",
      position: "Marketer",
      year: "Junior",
      image: "/images/people/nishat-angum.jpg",
      linkedin: "https://www.linkedin.com/in/nishat-angum-406288275",
      links: []
    },
    {
      name: "Dereck Teverne",
      position: "Community Outreach",
      year: "Junior",
      image: "/images/people/dereck-teverne.jpg",
      linkedin: "https://www.linkedin.com/in/dereck-taverne/",
      links: []
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#030717] to-[#000000] w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Main content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-16 max-w-6xl mx-auto">
        {/* Hero section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6"
            style={{
              fontFamily: "var(--font-azeret-mono)",
              background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            people
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-ubuntu)" }}
          >
            meet the individuals driving innovation in our community.
          </p>
        </motion.div>

        {/* Executive Board Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter mb-8 text-center"
            style={{
              fontFamily: "var(--font-azeret-mono)",
              background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            executive board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executiveBoard.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-blue-300/10 backdrop-blur rounded-xl p-8 border border-white/10 hover:bg-blue-300/20 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 
                  className="text-xl font-light tracking-tighter mb-4"
                  style={{
                    fontFamily: "var(--font-azeret-mono)",
                    background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {member.name}
                </h3>
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-lg relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    style={{
                      imageRendering: 'auto'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/128x128/1e3a8a/ffffff?text=" + member.name.charAt(0);
                    }}
                  />
                </div>
                <p 
                  className="text-white/90 font-extralight tracking-tighter mb-2 text-lg"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {member.position}
                </p>
                <p 
                  className="text-white/60 font-extralight tracking-tighter text-sm mb-4"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {member.year}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-blue-400 transition-colors duration-200"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  {member.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-blue-400 transition-colors duration-200"
                      title={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Committee Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter mb-8 text-center"
            style={{
              fontFamily: "var(--font-azeret-mono)",
              background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {committee.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-blue-300/10 backdrop-blur rounded-xl p-8 border border-white/10 hover:bg-blue-300/20 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 
                  className="text-lg font-light tracking-tighter mb-4"
                  style={{
                    fontFamily: "var(--font-azeret-mono)",
                    background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {member.name}
                </h3>
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-lg relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    style={{
                      imageRendering: 'auto'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/112x112/1e3a8a/ffffff?text=" + member.name.charAt(0);
                    }}
                  />
                </div>
                <p 
                  className="text-white/90 font-extralight tracking-tighter mb-2 text-lg"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {member.position}
                </p>
                <p 
                  className="text-white/60 font-extralight tracking-tighter text-sm mb-4"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {member.year}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-blue-400 transition-colors duration-200"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  {member.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-blue-400 transition-colors duration-200"
                      title={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Members Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter mb-8 text-center"
            style={{
              fontFamily: "var(--font-azeret-mono)",
              background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            project members
          </h2>
          <div className="bg-blue-300/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <p 
              className="text-white/80 font-extralight leading-relaxed tracking-tighter text-lg md:text-xl"
              style={{ fontFamily: "var(--font-ubuntu)" }}
            >
              coming soon
            </p>
          </div>
        </motion.div>

        {/* General Members Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter mb-8 text-center"
            style={{
              fontFamily: "var(--font-azeret-mono)",
              background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            general members
          </h2>
          <div className="bg-blue-300/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <p 
              className="text-white/80 font-extralight leading-relaxed tracking-tighter text-lg md:text-xl"
              style={{ fontFamily: "var(--font-ubuntu)" }}
            >
              coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
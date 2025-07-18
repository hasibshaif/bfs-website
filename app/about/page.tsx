"use client";
import React from "react";
import { motion } from "motion/react";
import { 
  FaCode,
  FaLightbulb,
  FaHandshake,
  FaRocket
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: FaCode,
      title: "Full-Stack Development",
      description: "Learn both frontend and backend technologies to build complete web applications."
    },
    {
      icon: FaLightbulb,
      title: "Project-Driven Learning",
      description: "Apply your skills through real-world projects that solve actual problems."
    },
    {
      icon: FaHandshake,
      title: "Collaborative Environment",
      description: "Work with fellow students in a supportive, team-oriented atmosphere."
    },
    {
      icon: FaRocket,
      title: "Industry Connections",
      description: "Connect with professionals and companies in the tech industry through our events and panels."
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
            about
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-ubuntu)" }}
          >
            baruch&apos;s premiere project-driven software engineering club, promoting full-stack development for bearcats and beyond.
          </p>
        </motion.div>

        {/* Mission section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-blue-300/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tighter mb-6 text-center"
              style={{
                fontFamily: "var(--font-azeret-mono)",
                background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              our mission
            </h2>
            <p 
              className="text-white/90 font-extralight leading-relaxed tracking-tighter text-lg md:text-xl text-center"
              style={{ fontFamily: "var(--font-ubuntu)" }}
            >
              Baruch Full Stack empowers aspiring software engineers through hands-on, real-world projects that benefit the community while building technical skills and strong portfolios.
              We bridge academia and industry through events, panels, hackathons, and more that foster innovation and collaboration. 
              Our mission is to support growth, inspire impact, and shape the next generation of tech leaders.
            </p>
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-blue-300/10 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-blue-300/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-light tracking-tighter mb-2"
                    style={{
                      fontFamily: "var(--font-azeret-mono)",
                      background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-white/80 font-extralight leading-relaxed tracking-tighter"
                    style={{ fontFamily: "var(--font-ubuntu)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
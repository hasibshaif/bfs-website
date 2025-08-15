"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export const EventsCTA: React.FC = () => {
  return (
    <motion.div
      className="text-center mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-blue-300/10 to-blue-400/5 backdrop-blur rounded-xl p-6 md:p-8 border border-white/10">
        <p 
          className="text-white/80 font-extralight leading-relaxed tracking-tighter text-base md:text-lg mb-4"
          style={{ fontFamily: "var(--font-ubuntu)" }}
        >
          Check out our full gallery for more photos and videos from our events
        </p>
        <Link
          href="/gallery"
          className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/20 to-blue-400/15 hover:from-blue-500/30 hover:to-blue-400/25 border border-blue-400/30 hover:border-blue-400/50 rounded-lg text-blue-200 hover:text-blue-100 transition-all duration-200 font-light tracking-tighter text-sm md:text-base group"
          style={{ fontFamily: "var(--font-ubuntu)" }}
        >
          <span>View Gallery</span>
          <svg 
            className="w-4 h-4 md:w-5 md:h-5 ml-2 transform transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

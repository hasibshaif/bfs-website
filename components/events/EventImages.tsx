"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface EventImagesProps {
  eventFolder: string;
  eventTitle: string;
  eventImages: { [eventFolder: string]: string[] };
  loading: boolean;
}

// Function to get images for each event
const getEventImages = (eventFolder: string, eventImages: { [eventFolder: string]: string[] }): string[] => {
  return eventImages[eventFolder] || [];
};

export const EventImages: React.FC<EventImagesProps> = ({ 
  eventFolder, 
  eventTitle, 
  eventImages, 
  loading 
}) => {
  const images = getEventImages(eventFolder, eventImages);

  if (loading) {
    return (
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-white/5 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`grid gap-3 max-w-5xl ${images.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        {images.slice(0, 4).map((image, imageIndex) => (
          <motion.div
            key={imageIndex}
            className="relative aspect-square rounded-lg overflow-hidden bg-white/10 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ImageWithFallback
              src={image}
              alt={`${eventTitle} - Image ${imageIndex + 1}`}
              style={{
                imageRendering: 'auto'
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* View more images link */}
      <motion.div
        className="mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link
          href={`/gallery#${eventFolder}`}
          className="inline-flex items-center text-blue-300/80 hover:text-blue-200 transition-colors duration-200 text-xs font-light tracking-tighter group"
          style={{ fontFamily: "var(--font-ubuntu)" }}
        >
          <span>View more images</span>
          <svg 
            className="w-3 h-3 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
};

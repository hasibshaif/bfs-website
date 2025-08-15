"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { EventInfo } from "@/types/gallery";

interface GalleryItemProps {
  mediaFile: string;
  mediaIndex: number;
  eventName: string;
  eventInfo: EventInfo;
  mediaUrls?: string[];
  videoThumbnailUrls?: string[];
  path: string;
  globalImageIndex: number;
  eventIndex: number;
  onImageClick: (index: number) => void;
  formatDate: (dateString: string) => string;
}

export default function GalleryItem({
  mediaFile,
  mediaIndex,
  eventInfo,
  mediaUrls,
  videoThumbnailUrls,
  path,
  globalImageIndex,
  eventIndex,
  onImageClick,
  formatDate
}: GalleryItemProps) {
  const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaFile);
  const videoThumbnailIndex = videoThumbnailUrls ? 
    mediaIndex : 0;

  return (
    <motion.div
      className={`relative aspect-square rounded-xl overflow-hidden bg-white/10 border border-white/10 ${
        isVideo ? '' : 'group cursor-pointer'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 + eventIndex * 0.1 + mediaIndex * 0.05 }}
      whileHover={{ scale: isVideo ? 1.0 : 1.02 }}
      onClick={() => !isVideo && onImageClick(globalImageIndex)}
    >
      {isVideo ? (
        <video
          src={mediaUrls ? mediaUrls[mediaIndex] : `${path}/${mediaFile}`}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster={videoThumbnailUrls && videoThumbnailUrls[videoThumbnailIndex] ? videoThumbnailUrls[videoThumbnailIndex] : undefined}
        />
      ) : (
        <Image
          src={mediaUrls ? mediaUrls[mediaIndex] : `${path}/${mediaFile}`}
          alt={`${eventInfo.eventName} - Media ${mediaIndex + 1}`}
          fill
          className="object-cover transition-all duration-300 group-hover:blur-sm"
          style={{
            imageRendering: 'auto'
          }}
        />
      )}
      
      {/* Hover Overlay - Only for non-video items */}
      {!isVideo && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <div className="text-center">
            <h3 
              className="text-lg font-light tracking-tighter mb-2"
              style={{
                fontFamily: "var(--font-azeret-mono)",
                background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {eventInfo.eventName}
            </h3>
            <p 
              className="text-white/90 font-extralight tracking-tighter text-sm mb-2"
              style={{ fontFamily: "var(--font-ubuntu)" }}
            >
              {formatDate(eventInfo.date)}
            </p>
            <p 
              className="text-white/70 font-extralight tracking-tighter text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-ubuntu)" }}
            >
              {eventInfo.description}
            </p>
            <div className="mt-3 text-white/60 text-xs">
              Click to enlarge
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

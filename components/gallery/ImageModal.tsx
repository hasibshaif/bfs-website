"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ModalImage } from "@/types/gallery";

interface ImageModalProps {
  isOpen: boolean;
  currentImage: ModalImage | null;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  formatDate: (dateString: string) => string;
}

export default function ImageModal({
  isOpen,
  currentImage,
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
  formatDate
}: ImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
            onClick={onClose}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
            onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image container */}
          <div className="relative max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                style={{
                  imageRendering: 'auto'
                }}
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 
                  className="text-xl font-light tracking-tighter mb-2"
                  style={{
                    fontFamily: "var(--font-azeret-mono)",
                    background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {currentImage.eventName}
                </h3>
                <p 
                  className="text-white/90 font-extralight tracking-tighter text-sm mb-2"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {formatDate(currentImage.date)}
                </p>
                <p 
                  className="text-white/70 font-extralight tracking-tighter text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-ubuntu)" }}
                >
                  {currentImage.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
            {currentIndex + 1} of {totalImages}
          </div>

          {/* Keyboard hint */}
          <div className="absolute top-4 left-4 text-white/40 text-xs">
            Use arrow keys or click to navigate • ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

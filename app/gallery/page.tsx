"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface EventInfo {
  eventName: string;
  date: string;
  description: string;
}

interface EventFolder {
  name: string;
  path: string;
  mediaFiles: string[];
  eventInfo: EventInfo;
  mediaUrls?: string[]; // URLs for Google Drive media
  videoThumbnailUrls?: string[]; // Thumbnail URLs for videos
}

interface ModalImage {
  src: string;
  alt: string;
  eventName: string;
  date: string;
  description: string;
}

export default function Gallery() {
  const [events, setEvents] = useState<EventFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<ModalImage[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        const data = await response.json();
        setEvents(data);
        
        // Create a flat array of all images for the modal
        const images: ModalImage[] = [];
        data.forEach((event: EventFolder) => {
          event.mediaFiles.forEach((mediaFile, mediaIndex) => {
            const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaFile);
            if (!isVideo) { // Only include images in the modal
              images.push({
                src: event.mediaUrls ? event.mediaUrls[mediaIndex] : `${event.path}/${mediaFile}`,
                alt: `${event.eventInfo.eventName} - Media ${mediaIndex + 1}`,
                eventName: event.eventInfo.eventName,
                date: event.eventInfo.date,
                description: event.eventInfo.description
              });
            }
          });
        });
        setAllImages(images);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setModalOpen(false);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentImageIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentImageIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, allImages.length]);

  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0);
  };

  const formatDate = (dateString: string) => {
    // Parse the date string and create a local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-[#030717] to-[#000000] w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
        <div className="relative z-10 pt-24 md:pt-32 pb-16 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-[#030717] to-[#000000] w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Main content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-16 max-w-7xl mx-auto">
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
            gallery
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-ubuntu)" }}
          >
            capturing moments from our events, workshops, and community gatherings.
          </p>
        </motion.div>

        {/* Events Grid */}
        {events.map((event, eventIndex) => (
          <motion.div
            key={event.name}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + eventIndex * 0.1 }}
          >
            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {event.mediaFiles.map((mediaFile, mediaIndex) => {
                const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaFile);
                const videoThumbnailIndex = event.videoThumbnailUrls ? 
                  event.mediaFiles.slice(0, mediaIndex).filter(f => /\.(mp4|mov|avi|mkv|webm)$/i.test(f)).length : 0;
                
                // Find the global image index for this image
                let globalImageIndex = 0;
                for (let i = 0; i < eventIndex; i++) {
                  globalImageIndex += events[i].mediaFiles.filter(f => !/\.(mp4|mov|avi|mkv|webm)$/i.test(f)).length;
                }
                globalImageIndex += event.mediaFiles.slice(0, mediaIndex).filter(f => !/\.(mp4|mov|avi|mkv|webm)$/i.test(f)).length;
                
                return (
                  <motion.div
                    key={`${event.name}-${mediaFile}`}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-white/10 border border-white/10 ${
                      isVideo ? '' : 'group cursor-pointer'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + eventIndex * 0.1 + mediaIndex * 0.05 }}
                    whileHover={{ scale: isVideo ? 1.0 : 1.02 }}
                    onClick={() => !isVideo && openModal(globalImageIndex)}
                  >
                    {isVideo ? (
                      <video
                        src={event.mediaUrls ? event.mediaUrls[mediaIndex] : `${event.path}/${mediaFile}`}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        poster={event.videoThumbnailUrls && event.videoThumbnailUrls[videoThumbnailIndex] ? event.videoThumbnailUrls[videoThumbnailIndex] : undefined}
                      />
                    ) : (
                      <Image
                        src={event.mediaUrls ? event.mediaUrls[mediaIndex] : `${event.path}/${mediaFile}`}
                        alt={`${event.eventInfo.eventName} - Media ${mediaIndex + 1}`}
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
                            {event.eventInfo.eventName}
                          </h3>
                          <p 
                            className="text-white/90 font-extralight tracking-tighter text-sm mb-2"
                            style={{ fontFamily: "var(--font-ubuntu)" }}
                          >
                            {formatDate(event.eventInfo.date)}
                          </p>
                          <p 
                            className="text-white/70 font-extralight tracking-tighter text-xs leading-relaxed"
                            style={{ fontFamily: "var(--font-ubuntu)" }}
                          >
                            {event.eventInfo.description}
                          </p>
                          <div className="mt-3 text-white/60 text-xs">
                            Click to enlarge
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-blue-300/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/10">
              <p 
                className="text-white/80 font-extralight leading-relaxed tracking-tighter text-lg md:text-xl"
                style={{ fontFamily: "var(--font-ubuntu)" }}
              >
                No events have been added to the gallery yet. Check back soon for photos from our upcoming events!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalOpen && allImages[currentImageIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
              onClick={closeModal}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image container */}
            <div className="relative max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src={allImages[currentImageIndex].src}
                  alt={allImages[currentImageIndex].alt}
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
                    {allImages[currentImageIndex].eventName}
                  </h3>
                  <p 
                    className="text-white/90 font-extralight tracking-tighter text-sm mb-2"
                    style={{ fontFamily: "var(--font-ubuntu)" }}
                  >
                    {formatDate(allImages[currentImageIndex].date)}
                  </p>
                  <p 
                    className="text-white/70 font-extralight tracking-tighter text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-ubuntu)" }}
                  >
                    {allImages[currentImageIndex].description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              {currentImageIndex + 1} of {allImages.length}
            </div>

            {/* Keyboard hint */}
            <div className="absolute top-4 left-4 text-white/40 text-xs">
              Use arrow keys or click to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
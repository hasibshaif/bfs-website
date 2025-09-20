"use client";
import React, { useEffect } from "react";
import { Layout, Typography } from "@/components/ui/DesignSystem";
import { useGallery } from "@/hooks/useGallery";
import { useImageModal } from "@/hooks/useImageModal";
import { formatDate } from "@/lib/utils";
import {
  EventSection,
  ImageModal,
  GalleryEmptyState,
  GalleryLoadingState
} from "@/components/gallery";

export default function Gallery() {
  const { events, loading, allImages } = useGallery();
  const {
    modalOpen,
    currentImageIndex,
    currentImage,
    openModal,
    closeModal,
    goToPrevious,
    goToNext
  } = useImageModal(allImages);

  // Handle hash navigation to scroll to specific event
  useEffect(() => {
    if (!loading && events.length > 0) {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        // Find the event with matching folder name or event name
        const targetEvent = events.find(event => {
          // Check if hash matches the event folder name (path)
          const eventFolder = event.path.split('/').pop() || '';
          return eventFolder === hash || 
                 event.name.toLowerCase().includes(hash.toLowerCase()) ||
                 event.name.toLowerCase().replace(/[^a-z0-9]/g, '') === hash.toLowerCase().replace(/[^a-z0-9]/g, '');
        });
        
        if (targetEvent) {
          // Scroll to the event after a short delay to ensure rendering is complete
          setTimeout(() => {
            const eventElement = document.getElementById(`event-${targetEvent.name}`);
            if (eventElement) {
              eventElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          }, 500);
        }
      }
    }
  }, [loading, events]);

  if (loading) {
    return <GalleryLoadingState />;
  }

  return (
    <Layout.PageContainer>
      <Layout.ContentContainer maxWidth="max-w-7xl">
        <Layout.HeroSection>
          <Typography.HeroTitle>gallery</Typography.HeroTitle>
          <Typography.HeroSubtitle>
            capturing moments from our events, workshops, and community gatherings.
          </Typography.HeroSubtitle>
        </Layout.HeroSection>

        {/* Events Grid */}
        {events.map((event, eventIndex) => (
          <EventSection
            key={event.name}
            event={event}
            eventIndex={eventIndex}
            events={events}
            onImageClick={openModal}
            formatDate={formatDate}
          />
        ))}

        {/* Empty State */}
        {events.length === 0 && <GalleryEmptyState />}
      </Layout.ContentContainer>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        currentImage={currentImage}
        currentIndex={currentImageIndex}
        totalImages={allImages.length}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        formatDate={formatDate}
      />
    </Layout.PageContainer>
  );
}
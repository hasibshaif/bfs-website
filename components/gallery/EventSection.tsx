"use client";
import React from "react";
import { Animated, Grid } from "@/components/ui/DesignSystem";
import GalleryItem from "./GalleryItem";
import { EventFolder } from "@/types/gallery";

interface EventSectionProps {
  event: EventFolder;
  eventIndex: number;
  events: EventFolder[];
  onImageClick: (index: number) => void;
  formatDate: (dateString: string) => string;
}

export default function EventSection({
  event,
  eventIndex,
  events,
  onImageClick,
  formatDate
}: EventSectionProps) {
  return (
    <Animated.FadeIn delay={0.2 + eventIndex * 0.1}>
      <div id={`event-${event.name}`} className="mb-16">
        <Grid.Gallery>
          {event.mediaFiles.map((mediaFile, mediaIndex) => {
            // Find the global image index for this image
            let globalImageIndex = 0;
            for (let i = 0; i < eventIndex; i++) {
              globalImageIndex += events[i].mediaFiles.filter(f => !/\.(mp4|mov|avi|mkv|webm)$/i.test(f)).length;
            }
            globalImageIndex += event.mediaFiles.slice(0, mediaIndex).filter(f => !/\.(mp4|mov|avi|mkv|webm)$/i.test(f)).length;
            
            return (
              <GalleryItem
                key={`${event.name}-${mediaFile}`}
                mediaFile={mediaFile}
                mediaIndex={mediaIndex}
                eventName={event.name}
                eventInfo={event.eventInfo}
                mediaUrls={event.mediaUrls}
                videoThumbnailUrls={event.videoThumbnailUrls}
                path={event.path}
                globalImageIndex={globalImageIndex}
                eventIndex={eventIndex}
                onImageClick={onImageClick}
                formatDate={formatDate}
              />
            );
          })}
        </Grid.Gallery>
      </div>
    </Animated.FadeIn>
  );
}

import { useState, useEffect } from "react";
import { EventFolder, ModalImage } from "@/types/gallery";

export function useGallery() {
  const [events, setEvents] = useState<EventFolder[]>([]);
  const [loading, setLoading] = useState(true);
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

  return { events, loading, allImages };
}

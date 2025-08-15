import { useState, useEffect } from "react";

export const useEventImages = () => {
  const [eventImages, setEventImages] = useState<{ [eventFolder: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events/images');
        const result = await response.json();
        
        if (result.success) {
          setEventImages(result.data);
        } else {
          setError(result.error || 'Failed to load event images');
        }
      } catch (err) {
        setError('Failed to fetch event images');
        console.error('Error fetching event images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventImages();
  }, []);

  return { eventImages, loading, error };
};

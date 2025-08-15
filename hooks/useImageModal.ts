import { useState, useEffect } from "react";
import { ModalImage } from "@/types/gallery";

export function useImageModal(allImages: ModalImage[]) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return {
    modalOpen,
    currentImageIndex,
    currentImage: allImages[currentImageIndex] || null,
    openModal,
    closeModal,
    goToPrevious,
    goToNext
  };
}

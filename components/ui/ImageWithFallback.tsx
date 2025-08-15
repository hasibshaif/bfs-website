"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className, 
  style 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  };
  
  if (imageError) {
    return (
      <div className={`${className} flex items-center justify-center bg-white/5 border border-white/10`}>
        <div className="text-center text-white/40">
          <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">No image</p>
        </div>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      style={style}
      onError={handleError}
      sizes="(max-width: 768px) 50vw, 25vw"
      priority={false}
    />
  );
};

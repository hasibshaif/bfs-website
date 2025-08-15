"use client";
import React from "react";

export default function GalleryLoadingState() {
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

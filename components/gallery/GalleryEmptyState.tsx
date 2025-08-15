"use client";
import React from "react";
import { Animated, Typography, Utility } from "@/components/ui/DesignSystem";

export default function GalleryEmptyState() {
  return (
    <Animated.FadeIn delay={0.2}>
      <div className="text-center py-16">
        <Utility.GlassMorphism className="rounded-2xl p-8 md:p-12">
          <Typography.BodyText className="text-lg md:text-xl">
            No events have been added to the gallery yet. Check back soon for photos from our upcoming events!
          </Typography.BodyText>
        </Utility.GlassMorphism>
      </div>
    </Animated.FadeIn>
  );
}

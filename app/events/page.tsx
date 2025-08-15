"use client";
import React from "react";
import { events } from "@/app/data/events/events";
import { useEventImages } from "@/hooks/useEventImages";
import { TimelineItem } from "@/components/events/TimelineItem";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsCTA } from "@/components/events/EventsCTA";
import { Layout } from "@/components/ui/DesignSystem";

export default function Events() {
  const { eventImages, loading, error } = useEventImages();

  return (
    <Layout.PageContainer>
      {/* Error handling */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-200 text-sm z-50">
          {error}
        </div>
      )}
      
      {/* Main content */}
      <Layout.ContentContainer maxWidth="max-w-4xl">
        {/* Hero section */}
        <EventsHero />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/60 via-blue-300/40 to-transparent"></div>
          
          {/* Events */}
          {events.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              eventImages={eventImages}
              loading={loading}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <EventsCTA />
      </Layout.ContentContainer>
    </Layout.PageContainer>
  );
}
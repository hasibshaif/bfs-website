"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Event, formatDate } from "@/app/data/events/events";
import { EventImages } from "./EventImages";
import { Typography, Timeline } from "@/components/ui/DesignSystem";

interface TimelineItemProps {
  event: Event;
  index: number;
  eventImages: { [eventFolder: string]: string[] };
  loading: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ 
  event, 
  index, 
  eventImages, 
  loading 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const dateOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, -10]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={containerRef} className="relative mb-12 md:mb-16">
      {/* Sticky Date */}
      <motion.div
        className="sticky top-24 z-10 mb-4"
        style={{ opacity: dateOpacity, y: dateY }}
      >
        <div className="flex items-center gap-3">
          <Timeline.Dot />
          <span 
            className="text-lg md:text-xl font-light tracking-tighter text-white/90"
            style={{ fontFamily: "var(--font-azeret-mono)" }}
          >
            {formatDate(event.date)}
          </span>
        </div>
      </motion.div>

      {/* Event Content */}
      <motion.div
        className="ml-11 md:ml-14"
        style={{ opacity: contentOpacity }}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: false }}
      >
        {/* Event Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/8 transition-all duration-300">
          {/* Title */}
          <Typography.CardTitle className="text-base md:text-lg lg:text-xl mb-3">
            {event.title}
          </Typography.CardTitle>

          {/* Description */}
          <Typography.BodyText className="text-xs md:text-sm mb-4">
            {event.description}
          </Typography.BodyText>

          {/* Images section */}
          <EventImages 
            eventFolder={event.eventFolder} 
            eventTitle={event.title} 
            eventImages={eventImages}
            loading={loading}
          />

          {/* Subtext (for special events like chartering) */}
          {event.subtext && (
            <motion.div
              className="bg-gradient-to-r from-blue-500/10 to-blue-400/5 border border-blue-400/20 rounded-lg p-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography.BodyText className="text-blue-200/90 text-xs md:text-sm">
                {event.subtext}
              </Typography.BodyText>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

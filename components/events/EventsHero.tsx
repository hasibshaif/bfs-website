"use client";
import React from "react";
import { motion } from "motion/react";
import { Typography } from "@/components/ui/DesignSystem";

export const EventsHero: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Typography.HeroTitle>events</Typography.HeroTitle>
      <Typography.HeroSubtitle>
        our club&apos;s journey through workshops, talks, and community building
      </Typography.HeroSubtitle>
    </motion.div>
  );
};

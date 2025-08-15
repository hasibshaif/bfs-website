"use client";
import React from "react";
import { Layout, Typography } from "@/components/ui/DesignSystem";
import { FeaturesSection, MissionSection } from "@/components/about";
import { features } from "@/app/data/about/features";

export default function About() {
  return (
    <Layout.PageContainer>
      <Layout.ContentContainer>
        <Layout.HeroSection>
          <Typography.HeroTitle>about</Typography.HeroTitle>
          <Typography.HeroSubtitle>
            baruch&apos;s premiere project-driven software engineering club, promoting full-stack development for bearcats and beyond.
          </Typography.HeroSubtitle>
        </Layout.HeroSection>

        {/* Mission section */}
        <MissionSection />

        {/* Features grid */}
        <FeaturesSection features={features} />
      </Layout.ContentContainer>
    </Layout.PageContainer>
  );
}
"use client";
import React from "react";
import { Layout, Typography } from "@/components/ui/DesignSystem";
import { MemberSection, ComingSoonSection } from "@/components/people";
import { executiveBoard, committee } from "@/app/data/people/members";

export default function People() {
  return (
    <Layout.PageContainer>
      <Layout.ContentContainer>
        <Layout.HeroSection>
          <Typography.HeroTitle>people</Typography.HeroTitle>
          <Typography.HeroSubtitle>
            meet the individuals driving innovation in our community.
          </Typography.HeroSubtitle>
        </Layout.HeroSection>

        {/* Executive Board Section */}
        <MemberSection
          title="executive board"
          members={executiveBoard}
          delay={0.2}
          size="large"
          layout="grid"
        />

        {/* Committee Section */}
        <MemberSection
          title="committee"
          members={committee}
          delay={0.6}
          size="medium"
          layout="flex"
          maxWidth="max-w-3xl"
        />

        {/* Project Members Section */}
        <ComingSoonSection
          title="project members"
          delay={1.0}
        />

        {/* General Members Section */}
        <ComingSoonSection
          title="general members"
          delay={1.2}
        />
      </Layout.ContentContainer>
    </Layout.PageContainer>
  );
}
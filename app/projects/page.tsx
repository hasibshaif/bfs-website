"use client";
import React from "react";
import { Layout, Typography, Card } from "@/components/ui/DesignSystem";

export default function Projects() {
  return (
    <Layout.PageContainer>
      <Layout.ContentContainer>
        <Layout.HeroSection>
          <Typography.HeroTitle>projects</Typography.HeroTitle>
          <Typography.HeroSubtitle>
            explore the innovative projects built by our community of developers.
          </Typography.HeroSubtitle>
        </Layout.HeroSection>

        {/* Coming Soon Section */}
        <Layout.Section delay={0.2}>
          <Card.Mission className="text-center">
            <Typography.SectionTitle className="text-2xl sm:text-3xl md:text-4xl mb-6">
              coming soon
            </Typography.SectionTitle>
            <Typography.BodyText className="text-lg md:text-xl"> 
              Check back soon to see what our members are building!
            </Typography.BodyText>
          </Card.Mission>
        </Layout.Section>
      </Layout.ContentContainer>
    </Layout.PageContainer>
  );
}
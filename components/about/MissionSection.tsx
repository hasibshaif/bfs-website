"use client";
import React from "react";
import { Layout, Typography, Card } from "@/components/ui/DesignSystem";

interface MissionSectionProps {
  delay?: number;
}

export default function MissionSection({ delay = 0.2 }: MissionSectionProps) {
  return (
    <Layout.Section delay={delay}>
      <Card.Mission>
        <Typography.SectionTitle className="text-2xl sm:text-3xl md:text-4xl">
          our mission
        </Typography.SectionTitle>
        <Typography.BodyText className="text-lg md:text-xl text-center">
          Baruch Full Stack empowers aspiring software engineers through hands-on, real-world projects that benefit the community while building technical skills and strong portfolios.
          We bridge academia and industry through events, panels, hackathons, and more that foster innovation and collaboration. 
          Our mission is to support growth, inspire impact, and shape the next generation of tech leaders.
        </Typography.BodyText>
      </Card.Mission>
    </Layout.Section>
  );
}

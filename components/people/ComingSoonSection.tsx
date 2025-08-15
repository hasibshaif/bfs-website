"use client";
import React from "react";
import { Layout, Typography, Card } from "@/components/ui/DesignSystem";

interface ComingSoonSectionProps {
  title: string;
  delay?: number;
}

export default function ComingSoonSection({ title, delay = 1.0 }: ComingSoonSectionProps) {
  return (
    <Layout.Section delay={delay}>
      <Typography.SectionTitle>{title}</Typography.SectionTitle>
      <Card.Mission className="text-center">
        <Typography.BodyText className="text-lg md:text-xl">
          coming soon
        </Typography.BodyText>
      </Card.Mission>
    </Layout.Section>
  );
}

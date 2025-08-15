"use client";
import React from "react";
import { Layout, Grid } from "@/components/ui/DesignSystem";
import FeatureCard from "./FeatureCard";
import { Feature } from "@/types/about";

interface FeaturesSectionProps {
  features: Feature[];
  delay?: number;
}

export default function FeaturesSection({ features, delay = 0.4 }: FeaturesSectionProps) {
  return (
    <Layout.Section delay={delay}>
      <Grid.Features>
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </Grid.Features>
    </Layout.Section>
  );
}

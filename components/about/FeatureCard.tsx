"use client";
import React from "react";
import { Card, Typography } from "@/components/ui/DesignSystem";
import { Feature } from "@/types/about";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card.Feature>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/10 rounded-lg">
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <Typography.CardTitle>{feature.title}</Typography.CardTitle>
          <Typography.BodyText>{feature.description}</Typography.BodyText>
        </div>
      </div>
    </Card.Feature>
  );
}

"use client";
import React from "react";
import { Layout, Typography, Grid } from "@/components/ui/DesignSystem";
import MemberCard from "./MemberCard";
import { Member } from "@/types/people";

interface MemberSectionProps {
  title: string;
  members: Member[];
  delay?: number;
  size?: "large" | "medium";
  layout?: "grid" | "flex";
  maxWidth?: string;
}

export default function MemberSection({ 
  title, 
  members, 
  delay = 0.2, 
  size = "large",
  layout = "grid",
  maxWidth
}: MemberSectionProps) {
  if (layout === "flex") {
    return (
      <Layout.Section delay={delay}>
        <Typography.SectionTitle>{title}</Typography.SectionTitle>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${maxWidth || 'max-w-3xl'} mx-auto`}>
          {members.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              size={size}
            />
          ))}
        </div>
      </Layout.Section>
    );
  }

  return (
    <Layout.Section delay={delay}>
      <Typography.SectionTitle>{title}</Typography.SectionTitle>
      <Grid.Members>
        {members.map((member) => (
          <MemberCard
            key={member.name}
            member={member}
            size={size}
          />
        ))}
      </Grid.Members>
    </Layout.Section>
  );
}

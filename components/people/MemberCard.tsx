"use client";
import React from "react";
import { FaLinkedin, FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { Card, Typography } from "@/components/ui/DesignSystem";
import { Member } from "@/types/people";

interface MemberCardProps {
  member: Member;
  size?: "large" | "medium";
  className?: string;
}

export default function MemberCard({ member, size = "large", className = "" }: MemberCardProps) {
  const imageSize = size === "large" ? "w-32 h-32" : "w-28 h-28";
  const titleSize = size === "large" ? "" : "text-lg";

  return (
    <Card.Feature className={`text-center p-8 ${className}`}>
      <Typography.CardTitle className={`mb-4 ${titleSize}`}>
        {member.name}
      </Typography.CardTitle>
      <div className={`${imageSize} mx-auto mb-4 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-lg relative`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center"
          style={{
            imageRendering: 'auto'
          }}
          onError={(e) => {
            const fallbackSize = size === "large" ? "128x128" : "112x112";
            e.currentTarget.src = `https://via.placeholder.com/${fallbackSize}/1e3a8a/ffffff?text=${member.name.charAt(0)}`;
          }}
        />
      </div>
      <Typography.BodyText className="mb-2 text-lg">{member.position}</Typography.BodyText>
      <div className="flex items-center justify-center gap-2 mb-1">
        <FaGraduationCap className="w-4 h-4 text-blue-200" />
        <Typography.MutedText>{member.major}</Typography.MutedText>
      </div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <FaCalendarAlt className="w-4 h-4 text-blue-200" />
        <Typography.MutedText>{member.year}</Typography.MutedText>
      </div>
      <div className="flex items-center justify-center gap-3">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-blue-400 transition-colors duration-200"
          title="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
        {member.links.map((link, linkIndex) => (
          <a
            key={linkIndex}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-blue-400 transition-colors duration-200"
            title={link.label}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </Card.Feature>
  );
}

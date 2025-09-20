"use client";
import React, { useState } from "react";
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
  const [imageError, setImageError] = useState(false);
  const imageSize = size === "large" ? "w-32 h-32" : "w-28 h-28";
  const titleSize = size === "large" ? "" : "text-lg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card.Feature className={`text-center p-8 ${className}`}>
      <Typography.CardTitle className={`mb-4 ${titleSize}`}>
        {member.name}
      </Typography.CardTitle>
      <div className={`${imageSize} mx-auto mb-4 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-lg relative`}>
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <div className="text-center text-white/40">
              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-xs">{member.name.charAt(0)}</p>
            </div>
          </div>
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-center"
            style={{
              imageRendering: 'auto'
            }}
            onError={handleImageError}
          />
        )}
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

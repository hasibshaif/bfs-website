// components/ui/NavBar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";

export interface NavItem {
  label: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const container: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 1,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const NavBar: React.FC<{
  items: NavItem[];
  direction?: "horizontal" | "vertical";
  tooltipPosition?: "top" | "bottom" | "right";
  className?: string;
}> = ({ items, direction = "horizontal", tooltipPosition = "bottom", className }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const isHorizontal = direction === "horizontal";

  const getBaseColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "instagram": return "#E4405F";
      case "linkedin": return "#0077B5";
      case "linktree": return "#00FF88";
      case "discord": return "#5865F2";
      default: return "white";
    }
  };
  const getHoverColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "instagram": return "#FF6B9D";
      case "linkedin": return "#0A66C2";
      case "linktree": return "#00CC6A";
      case "discord": return "#4752C4";
      default: return "#BDCDFF";
    }
  };

  const tooltipBase = `
    absolute whitespace-nowrap
    bg-black/80 text-white text-xs rounded px-2 py-1
    pointer-events-none transition ease-out duration-200
  `;
  const tooltipClasses = {
    bottom: `top-full mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0`,
    top:    `bottom-full mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:-translate-y-0`,
    right:  `left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100`,
  }[tooltipPosition];

  return (
    <motion.nav
      className={`${className} flex ${isHorizontal ? "flex-row gap-6" : "flex-col gap-4"} bg-blue-300/10 backdrop-blur px-6 py-3 rounded-full`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map(({ label, href, Icon }) => (
        <motion.div
          key={label}
          variants={item}
          className="relative group flex items-center"
          onMouseEnter={() => setHoveredIcon(label)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Link href={href} className="p-2 block">
            <Icon
              className="w-6 h-6 hover:scale-110 transition-all duration-200"
              style={{ color: hoveredIcon === label ? getHoverColor(label) : getBaseColor(label) }}
            />
          </Link>
          <span className={`${tooltipBase} ${tooltipClasses}`}>{label}</span>
        </motion.div>
      ))}
    </motion.nav>
  );
};

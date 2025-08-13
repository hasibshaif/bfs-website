// components/ui/moving-lines.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

const COLORS = [
  "#393b9c",
  "#090a65",
  "#7b84bc",
  "#32349f",
  "#5970a5",
  "#7590bd",
  "#36436d",
];

const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const snap = (val: number, grid: number) =>
  Math.round(val / grid) * grid;

const generatePath = (w: number, h: number, jitter = 300, grid = 2) => {
  const rndXY = () =>
    snap(Math.random() * (w + jitter * 2) - jitter, grid);
  const startY = snap(Math.random() * (h + jitter * 2) - jitter, grid);
  const endY   = snap(Math.random() * (h + jitter * 2) - jitter, grid);

  return `M ${-jitter} ${startY}
          C ${rndXY()} ${rndXY()},
            ${rndXY()} ${rndXY()},
            ${w + jitter} ${endY}`;
};

interface MovingLinesProps {
  numLines?: number;
  strokeWidthRange?: [number, number];
  className?: string;
}

const Line: React.FC<{
  width: number;
  height: number;
  strokeWidthRange: [number, number];
  lineIndex: number;
}> = ({ width, height, strokeWidthRange: [minW, maxW], lineIndex }) => {
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const [gradientId] = useState(`gradient-${lineIndex}`);

  useEffect(() => {
    if (!width || !height) return;
    setFrom(generatePath(width, height));
    setTo(generatePath(width, height));
  }, [width, height]);

  if (!from || !to) return null;

  return (
    <motion.path
      d={from}
      stroke={`url(#${gradientId})`}
      strokeWidth={snap(rand(minW, maxW), 1)}
      fill="none"
      vectorEffect="non-scaling-stroke"
      initial={{ opacity: 0 }}
      animate={{
        d: [from, to, from],
        opacity: [0, rand(0.4, 0.9), 0],
      }}
      transition={{
        duration: rand(1, 60),
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const GradientDefinitions: React.FC<{ numLines: number }> = ({ numLines }) => {
  return (
    <defs>
      {Array.from({ length: numLines }).map((_, i) => {
        const baseColor1 = COLORS[Math.floor(Math.random() * COLORS.length)];
        const baseColor2 = COLORS[Math.floor(Math.random() * COLORS.length)];
        const baseColor3 = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        return (
          <linearGradient key={i} id={`gradient-${i}`} gradientUnits="userSpaceOnUse">
            <motion.stop
              offset="0%"
              stopColor={baseColor1}
              animate={{
                stopColor: [baseColor1, baseColor2, baseColor3, baseColor1],
              }}
              transition={{
                duration: rand(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="50%"
              stopColor={baseColor2}
              animate={{
                stopColor: [baseColor2, baseColor3, baseColor1, baseColor2],
              }}
              transition={{
                duration: rand(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="100%"
              stopColor={baseColor3}
              animate={{
                stopColor: [baseColor3, baseColor1, baseColor2, baseColor3],
              }}
              transition={{
                duration: rand(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </linearGradient>
        );
      })}
    </defs>
  );
};

export const MovingLines: React.FC<MovingLinesProps> = ({
  numLines = 8,
  strokeWidthRange = [4, 12],
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDims({ width, height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        shapeRendering="auto"
      >
        <GradientDefinitions numLines={numLines} />
        {dims.width > 0 &&
          Array.from({ length: numLines }).map((_, i) => (
            <Line
              key={i}
              width={dims.width}
              height={dims.height}
              strokeWidthRange={strokeWidthRange}
              lineIndex={i}
            />
          ))}
      </svg>
    </div>
  );
};

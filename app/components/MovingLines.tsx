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

const generatePath = (w: number, h: number, jitter = 300, grid = 8) => {
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
}> = ({ width, height, strokeWidthRange: [minW, maxW] }) => {
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const [stroke, setStroke] = useState(COLORS[0]);

  useEffect(() => {
    if (!width || !height) return;
    setFrom(generatePath(width, height));
    setTo(generatePath(width, height));
    setStroke(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, [width, height]);

  if (!from || !to) return null;

  return (
    <motion.path
      d={from}
      stroke={stroke}
      strokeWidth={snap(rand(minW, maxW), 1)}
      fill="none"
      vectorEffect="non-scaling-stroke"
      initial={{ opacity: 0 }}
      animate={{
        d: [from, to, from],
        opacity: [0, rand(0.4, 0.9), 0],
      }}
      transition={{
        duration: rand(20, 60),
        repeat: Infinity,
        ease: "linear",
      }}
    />
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
      style={{ imageRendering: "pixelated" }}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated" }}
      >
        {dims.width > 0 &&
          Array.from({ length: numLines }).map((_, i) => (
            <Line
              key={i}
              width={dims.width}
              height={dims.height}
              strokeWidthRange={strokeWidthRange}
            />
          ))}
      </svg>
    </div>
  );
};

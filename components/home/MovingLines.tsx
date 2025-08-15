// components/ui/moving-lines.tsx
"use client";
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { isLowPerformanceDevice, getOptimizedAnimationSettings } from "@/lib/performance";

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
  isLowPerformance: boolean;
}> = ({ width, height, strokeWidthRange: [minW, maxW], lineIndex, isLowPerformance }) => {
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const [gradientId] = useState(`gradient-${lineIndex}`);

  // Memoize path generation to avoid recalculation
  const paths = useMemo(() => {
    if (!width || !height) return { from: "", to: "" };
    return {
      from: generatePath(width, height, isLowPerformance ? 200 : 300, isLowPerformance ? 4 : 2),
      to: generatePath(width, height, isLowPerformance ? 200 : 300, isLowPerformance ? 4 : 2)
    };
  }, [width, height, isLowPerformance]);

  useEffect(() => {
    setFrom(paths.from);
    setTo(paths.to);
  }, [paths]);

  if (!from || !to) return null;

  // Optimize animation parameters for low performance devices
  const settings = getOptimizedAnimationSettings();
  const duration = rand(settings.animationDuration.min, settings.animationDuration.max);
  const opacityRange = isLowPerformance ? [0, rand(0.3, 0.6), 0] : [0, rand(0.4, 0.9), 0];

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
        opacity: opacityRange,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const GradientDefinitions: React.FC<{ 
  numLines: number; 
  isLowPerformance: boolean;
}> = ({ numLines, isLowPerformance }) => {
  // Memoize gradient definitions to avoid recalculation
  const gradients = useMemo(() => {
    return Array.from({ length: numLines }).map((_, i) => {
      const baseColor1 = COLORS[Math.floor(Math.random() * COLORS.length)];
      const baseColor2 = COLORS[Math.floor(Math.random() * COLORS.length)];
      const baseColor3 = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      return {
        id: i,
        colors: [baseColor1, baseColor2, baseColor3],
        duration: isLowPerformance ? rand(12, 20) : rand(8, 15)
      };
    });
  }, [numLines, isLowPerformance]);

  return (
    <defs>
      {gradients.map((gradient) => (
        <linearGradient key={gradient.id} id={`gradient-${gradient.id}`} gradientUnits="userSpaceOnUse">
          <motion.stop
            offset="0%"
            stopColor={gradient.colors[0]}
            animate={{
              stopColor: [gradient.colors[0], gradient.colors[1], gradient.colors[2], gradient.colors[0]],
            }}
            transition={{
              duration: gradient.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.stop
            offset="50%"
            stopColor={gradient.colors[1]}
            animate={{
              stopColor: [gradient.colors[1], gradient.colors[2], gradient.colors[0], gradient.colors[1]],
            }}
            transition={{
              duration: gradient.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.stop
            offset="100%"
            stopColor={gradient.colors[2]}
            animate={{
              stopColor: [gradient.colors[2], gradient.colors[0], gradient.colors[1], gradient.colors[2]],
            }}
            transition={{
              duration: gradient.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </linearGradient>
      ))}
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
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Optimize resize handling with debouncing
  const updateDims = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDims({ width, height });
    }
  }, []);

  useEffect(() => {
    setIsLowPerformance(isLowPerformanceDevice());
    updateDims();
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDims, 100); // Debounce resize events
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateDims]);

  // Reduce number of lines on low performance devices
  const settings = getOptimizedAnimationSettings();
  const optimizedNumLines = isLowPerformance ? Math.min(numLines, settings.maxLines) : numLines;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        shapeRendering={isLowPerformance ? "optimizeSpeed" : "auto"}
        style={{
          willChange: isLowPerformance ? "transform" : "auto",
        }}
      >
        <GradientDefinitions numLines={optimizedNumLines} isLowPerformance={isLowPerformance} />
        {dims.width > 0 &&
          Array.from({ length: optimizedNumLines }).map((_, i) => (
            <Line
              key={i}
              width={dims.width}
              height={dims.height}
              strokeWidthRange={strokeWidthRange}
              lineIndex={i}
              isLowPerformance={isLowPerformance}
            />
          ))}
      </svg>
    </div>
  );
};

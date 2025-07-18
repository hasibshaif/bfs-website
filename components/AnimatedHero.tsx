// components/animated-hero.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MovingLines } from "./MovingLines";
import { RotateCcw } from "lucide-react";

export const AnimatedHero: React.FC = () => {
  const initial = "{bfs}";
  const fullText = "{baruch full stack}";
  const subText =
    "baruch's premiere project-driven software engineering club, promoting full-stack development for bearcats and beyond.";

  const [displayText, setDisplayText] = useState("");
  const [displaySub, setDisplaySub] = useState("");
  const [showMainCursor, setShowMainCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Audio for keyboard sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio('/audio/keyboard-click1.mp3');
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  const playKeyboardSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Audio play prevented:', err);
      });
    }
  };

  const startAnimation = () => {
    const timers: NodeJS.Timeout[] = [];

    // 1) type bfs
    initial.split("").forEach((ch, i) => {
      timers.push(
        setTimeout(() => {
          setDisplayText((t) => t + ch);
          playKeyboardSound();
        }, i * 120)
      );
    });
    const deleteStart = initial.length * 120 + 180;
    timers.push(setTimeout(() => setShowMainCursor(false), deleteStart));

    // 3) delete bfs
    initial
      .split("")
      .reverse()
      .forEach((_, i) =>
        timers.push(
          setTimeout(
            () => {
              setDisplayText((t) => t.slice(0, -1));
              playKeyboardSound();
            },
            deleteStart + i * 120
          )
        )
      );

    // 4) Type fullText
    const fullStart = deleteStart + initial.length * 120 + 180;
    timers.push(setTimeout(() => setShowMainCursor(true), fullStart));
    fullText.split("").forEach((ch, i) =>
      timers.push(
        setTimeout(
          () => {
            setDisplayText((t) => t + ch);
            playKeyboardSound();
          },
          fullStart + i * 100
        )
      )
    );
    const fullEnd = fullStart + fullText.length * 100;
    timers.push(setTimeout(() => setShowMainCursor(false), fullEnd));

    // 5) Type subText
    const subStart = fullEnd + 200;
    subText.split("").forEach((ch, i) =>
      timers.push(
        setTimeout(
          () => {
            setDisplaySub((t) => t + ch);
          },
          subStart + i * 15
        )
      )
    );

    // 6) show nav (triggers global navigation)
    const subEnd = subStart + subText.length * 15;
    timers.push(setTimeout(() => {
      sessionStorage.setItem('bfs-animation-completed', 'true');
      setAnimationComplete(true);
      // Dispatch a custom event to notify the global navigation
      window.dispatchEvent(new CustomEvent('bfs-animation-completed'));
    }, subEnd + 150));

    return () => timers.forEach(clearTimeout);
  };

  const replayAnimation = () => {
    setDisplayText("");
    setDisplaySub("");
    setShowMainCursor(true);
    setAnimationComplete(false);
    
    // clear session storage for replay
    sessionStorage.removeItem('bfs-animation-completed');
    
    // Dispatch event to hide global navigation
    window.dispatchEvent(new CustomEvent('bfs-animation-started'));
    
    return startAnimation();
  };
  
  // session storage to check if animation alr been completed in session
  useEffect(() => {
    const animationCompleted = sessionStorage.getItem('bfs-animation-completed');
    if (animationCompleted === 'true') {
      setDisplayText(fullText);
      setDisplaySub(subText);
      setShowMainCursor(false);
      setAnimationComplete(true);
      return;
    }
    return startAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#010617] to-[#000000] w-full flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
      {/* background lines */}
      <MovingLines numLines={5} strokeWidthRange={[2, 12]} className="z-0 opacity-70" />

      {/* main text */}
      <motion.div
        className="z-10 flex-row justify-center items-center text-center font-light tracking-tighter text-4xl sm:text-4xl md:text-6xl lg:text-9xl"
        style={{
          fontFamily: "var(--font-azeret-mono)",
          background: "linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayText}
        {showMainCursor && <MainCursor />}
      </motion.div>

      {/* subtext */}
      {displaySub && (
        <motion.p
          className="z-10 font-extralight text-white mt-8 text-lg sm:text-lg md:text-3xl text-center leading-relaxed tracking-tighter"
          style={{ fontFamily: "var(--font-azeret-mono)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {displaySub}
          <SubCursor />
        </motion.p>
      )}

      {/* foreground lines */}
      <MovingLines numLines={2} strokeWidthRange={[2, 4]} className="z-10 opacity-60" />

      {/* replay button */}
      {animationComplete && (
        <div className="fixed bottom-6 z-30 group md:right-6 md:left-auto left-1/2 md:translate-x-0 -translate-x-1/2 flex items-center gap-2">
          <span className="hidden md:block whitespace-nowrap bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition ease-out duration-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            Replay Animation
          </span>
          <button
            onClick={replayAnimation}
            className="p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 relative"
          >
            <RotateCcw className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:hidden whitespace-nowrap bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition ease-out duration-200 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:-translate-y-0">
              Replay Animation
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const MainCursor: React.FC = () => (
  <motion.span
    className="inline-block w-[2px] h-[1em] align-bottom"
    style={{
      background: "linear-gradient(to bottom, #FFFFFF 0%, #BDCDFF 100%)",
    }}
    animate={{ opacity: [1, 0] }}
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
  />
);

const SubCursor: React.FC = () => (
  <motion.span
    className="inline-block w-[1px] h-[1em] align-center ml-1"
    style={{
      background: "linear-gradient(to bottom, #FFFFFF 0%, #BDCDFF 100%)",
    }}
    animate={{ opacity: [1, 0] }}
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
  />
);

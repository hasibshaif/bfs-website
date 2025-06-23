// components/animated-hero.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MovingLines } from "./MovingLines";
import { NavBar, NavItem } from "./NavBar";
import {
  FaInfoCircle,
  FaUsers,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaProjectDiagram,
  FaCalendar,
  FaImage,
} from "react-icons/fa"
import { SiLinktree } from "react-icons/si";
import { Menu, X } from "lucide-react";
import { RotateCcw } from "lucide-react";

export const AnimatedHero: React.FC = () => {
  const topItems: NavItem[] = [
    { label: "About",    href: "/about",    Icon: FaInfoCircle },
    { label: "People",   href: "/people",   Icon: FaUsers },
    { label: "Projects", href: "/projects", Icon: FaProjectDiagram },
    { label: "Events",   href: "/events",   Icon: FaCalendar },
    { label: "Gallery",  href: "/gallery",  Icon: FaImage },
  ];

  const socialItems: NavItem[] = [
    { label: "Instagram", href: "https://www.instagram.com/baruchfullstack/", Icon: FaInstagram },
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/baruch-full-stack/",  Icon: FaLinkedinIn  },
    { label: "Linktree",  href: "https://linktr.ee/baruchfullstack",  Icon: SiLinktree  },
    { label: "Discord",  href: "https://discord.gg/WXxPUmgUTa",  Icon: FaDiscord  },
  ];
  
  const initial = "{bfs}";
  const fullText = "{baruch full stack}";
  const subText =
    "baruch's premiere project-driven software engineering club, promoting full-stack development for bearcats and beyond.";

  const [displayText, setDisplayText] = useState("");
  const [displaySub, setDisplaySub] = useState("");
  const [showMainCursor, setShowMainCursor] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Audio ref for keyboard sound
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/keyboard-click1.mp3');
    audioRef.current.volume = 0.3; // Set volume to 30%
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Function to play keyboard sound
  const playKeyboardSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(err => {
        // Silently handle autoplay restrictions
        console.log('Audio play prevented:', err);
      });
    }
  };

  const startAnimation = () => {
    const timers: NodeJS.Timeout[] = [];

    // 1) type bfs - ensure each character gets its own click
    initial.split("").forEach((ch, i) => {
      timers.push(
        setTimeout(() => {
          setDisplayText((t) => t + ch);
          playKeyboardSound();
        }, i * 150) // Increased delay to ensure audio plays for each character
      );
    });
    const deleteStart = initial.length * 150 + 200;
    timers.push(setTimeout(() => setShowMainCursor(false), deleteStart));

    // 3) delete bfs - ensure each deletion gets its own click
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
            deleteStart + i * 150 // Increased delay to ensure audio plays for each deletion
          )
        )
      );

    // 4) Type fullText - slowed down to match audio better
    const fullStart = deleteStart + initial.length * 150 + 200;
    timers.push(setTimeout(() => setShowMainCursor(true), fullStart));
    fullText.split("").forEach((ch, i) =>
      timers.push(
        setTimeout(
          () => {
            setDisplayText((t) => t + ch);
            playKeyboardSound();
          },
          fullStart + i * 120 // Slowed down from 70ms to 120ms
        )
      )
    );
    const fullEnd = fullStart + fullText.length * 120;
    timers.push(setTimeout(() => setShowMainCursor(false), fullEnd));

    // 5) Type subText - faster typing without audio
    const subStart = fullEnd + 300;
    subText.split("").forEach((ch, i) =>
      timers.push(
        setTimeout(
          () => {
            setDisplaySub((t) => t + ch);
          },
          subStart + i * 25 // Faster typing at 25ms per character
        )
      )
    );

    // 6) show nav and mark animation as complete
    const subEnd = subStart + subText.length * 25;
    timers.push(setTimeout(() => {
      setShowNav(true);
      sessionStorage.setItem('bfs-animation-completed', 'true');
    }, subEnd + 200));

    return () => timers.forEach(clearTimeout);
  };

  const replayAnimation = () => {
    // reset states
    setDisplayText("");
    setDisplaySub("");
    setShowMainCursor(true);
    setShowNav(false);
    setMenuOpen(false);
    
    // clear session storage to force replay
    sessionStorage.removeItem('bfs-animation-completed');
    return startAnimation();
  };

  useEffect(() => {
    // Use session storage to check if animation has already been completed in this session
    const animationCompleted = sessionStorage.getItem('bfs-animation-completed');
    
    if (animationCompleted === 'true') {
      setDisplayText(fullText);
      setDisplaySub(subText);
      setShowMainCursor(false);
      setShowNav(true);
      return;
    }

    return startAnimation();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#040712] to-[#000000] w-full flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">
      {/* background lines */}
      <MovingLines numLines={5} strokeWidthRange={[2, 12]} className="z-0 opacity-70" />

      {/* desktop top nav */}
      <div className="hidden md:absolute md:top-4 md:inset-x-0 md:flex md:justify-center md:z-20">
        {showNav && <NavBar items={topItems} />}
      </div>

      {/* mobile hamburger */}
      {showNav && (
        <button
          className="md:hidden fixed top-4 right-4 z-30 p-2 bg-black/50 rounded-full"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      )}

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-20 flex justify-center items-start pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="flex gap-8 items-start">
              <NavBar items={topItems} direction="vertical" tooltipPosition="right" className="bg-black/30" showLabels={true} />
              <div className="h-full w-px bg-white/30" />
              <NavBar items={socialItems} direction="vertical" tooltipPosition="left" className="bg-black/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


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

      {/* desktop bottom nav */}
      <div className="hidden md:absolute md:bottom-6 md:inset-x-0 md:flex md:justify-center md:z-20">
        {showNav && <NavBar items={socialItems} tooltipPosition="top" />}
      </div>

      {/* foreground lines */}
      <MovingLines numLines={2} strokeWidthRange={[2, 4]} className="z-10 opacity-60" />

      {/* replay button */}
      {showNav && (
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

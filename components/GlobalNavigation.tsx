"use client";
import { NavBar, NavItem } from "@/components/NavBar";
import { 
  FaInfoCircle, 
  FaUsers, 
  FaInstagram, 
  FaLinkedinIn, 
  FaDiscord, 
  FaProjectDiagram, 
  FaCalendar, 
  FaImage 
} from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const GlobalNavigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showNav, setShowNav] = useState(!isHomePage);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Listen for animation completion on home page
  useEffect(() => {
    if (isHomePage) {
      const checkAnimationStatus = () => {
        const animationCompleted = sessionStorage.getItem('bfs-animation-completed');
        if (animationCompleted === 'true') {
          setShowNav(true);
        }
      };

      const handleAnimationCompleted = () => {
        setShowNav(true);
      };

      const handleAnimationStarted = () => {
        setShowNav(false);
      };

      // Check immediately
      checkAnimationStatus();

      // Listen for custom events
      window.addEventListener('bfs-animation-completed', handleAnimationCompleted);
      window.addEventListener('bfs-animation-started', handleAnimationStarted);

      return () => {
        window.removeEventListener('bfs-animation-completed', handleAnimationCompleted);
        window.removeEventListener('bfs-animation-started', handleAnimationStarted);
      };
    } else {
      setShowNav(true);
    }
  }, [isHomePage]);

  // Create navigation items with current page highlighting
  const getTopItemsWithHighlight = () => {
    return topItems.map(item => ({
      ...item,
      isActive: pathname === item.href
    }));
  };

  return (
    <>
      {/* Desktop Navigation */}
      {showNav && (
        <>
          {/* Fixed Top Navigation - Desktop Only */}
          <div className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            {isHomePage ? (
              // Landing page: centered navigation
              <NavBar items={topItems} />
            ) : (
              // Other pages: wider navigation with logo
              <div className="flex items-center justify-between bg-blue-300/10 backdrop-blur px-6 sm:px-8 lg:px-12 py-3 rounded-full border border-white/10 min-w-[20rem] sm:min-w-[24rem] lg:min-w-[32rem] xl:min-w-[36rem]">
                {/* BFS Logo */}
                <Link href="/" className="flex items-center">
                  <Image 
                    src="/images/icons/bfs_logo.png" 
                    alt="BFS Logo" 
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200"
                  />
                </Link>
                
                {/* Navigation Icons */}
                <div className="flex gap-4 sm:gap-6 lg:gap-8">
                  {getTopItemsWithHighlight().map(({ label, href, Icon, isActive }) => (
                    <Link 
                      key={label} 
                      href={href} 
                      className="p-1.5 sm:p-2 block group relative"
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-all duration-200 ${
                          isActive 
                            ? 'text-blue-400 hover:text-blue-500' 
                            : 'text-white hover:text-blue-200'
                        }`}
                      />
                      <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition ease-out duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fixed Bottom Navigation - Desktop Only */}
          <div className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <NavBar items={socialItems} tooltipPosition="top" />
          </div>
        </>
      )}

      {/* Mobile Hamburger Menu */}
      {showNav && (
        <>
          {/* Fixed Hamburger Button */}
          <button
            className="md:hidden fixed top-4 right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="md:hidden fixed inset-0 bg-black/60 z-40 flex justify-center items-start pt-24 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              >
                <div onClick={(e) => e.stopPropagation()} className="flex gap-8 items-start">
                  {/* Page Navigation with Logo */}
                  <div className="bg-black/30 backdrop-blur px-4 sm:px-6 py-3 rounded-full border border-white/10">
                    {/* BFS Logo */}
                    <div className="flex justify-center mb-6 sm:mb-4">
                      <Link href="/" onClick={() => setMenuOpen(false)}>
                        <Image 
                          src="/images/icons/bfs_logo.png" 
                          alt="BFS Logo" 
                          width={32}
                          height={32}
                          className="w-10 h-10 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-200"
                        />
                      </Link>
                    </div>
                    
                    {/* Navigation Icons */}
                    <NavBar 
                      items={getTopItemsWithHighlight()} 
                      direction="vertical" 
                      tooltipPosition="left" 
                      className="bg-transparent" 
                      showLabels={true}
                      onItemClick={() => setMenuOpen(false)}
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="h-full w-px bg-white/30" />
                  
                  {/* Social Navigation */}
                  <NavBar 
                    items={socialItems} 
                    direction="vertical" 
                    tooltipPosition="left" 
                    className="bg-black/30" 
                    showLabels={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}; 
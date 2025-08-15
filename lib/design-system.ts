// Design System for BFS Website
// This file contains all standardized design tokens and utilities

export const designTokens = {
  // Colors
  colors: {
    // Primary brand colors
    primary: {
      50: '#f0f4ff',
      100: '#e0e9ff',
      200: '#c7d7ff',
      300: '#a5b8ff',
      400: '#8190ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    
    // Background gradients
    background: {
      primary: 'linear-gradient(to bottom right, #030717, #000000)',
      secondary: 'linear-gradient(to bottom right, #010617, #000000)',
      card: 'rgba(255, 255, 255, 0.05)',
      cardHover: 'rgba(255, 255, 255, 0.08)',
      blue: 'rgba(59, 130, 246, 0.1)',
      blueHover: 'rgba(59, 130, 246, 0.2)',
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
      muted: 'rgba(255, 255, 255, 0.4)',
      blue: '#b3c5fc',
      blueLight: '#93c5fd',
    },
    
    // Border colors
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.2)',
      blue: 'rgba(59, 130, 246, 0.2)',
      blueLight: 'rgba(147, 197, 253, 0.2)',
    },
    
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  
  // Typography
  typography: {
    fonts: {
      primary: 'var(--font-azeret-mono)',
      secondary: 'var(--font-ubuntu)',
      fallback: 'Arial, Helvetica, sans-serif',
    },
    
    fontWeights: {
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    blue: '0 0 10px rgba(59, 130, 246, 0.3)',
    blueGlow: '0 0 20px rgba(59, 130, 246, 0.4)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
    slower: '500ms ease-in-out',
  },
  
  // Z-index
  zIndex: {
    base: '0',
    content: '10',
    navigation: '20',
    modal: '50',
    tooltip: '60',
    overlay: '40',
  },
};

// Gradient definitions
export const gradients = {
  // Text gradients
  text: {
    primary: 'linear-gradient(to right, #FFFFFF 0%, #b3c5fc 100%)',
    secondary: 'linear-gradient(to right, #FFFFFF 0%, #93c5fd 100%)',
    blue: 'linear-gradient(to right, #3b82f6 0%, #93c5fd 100%)',
  },
  
  // Background gradients
  background: {
    primary: 'linear-gradient(to bottom right, #030717, #000000)',
    secondary: 'linear-gradient(to bottom right, #010617, #000000)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    blue: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
  },
  
  // Border gradients
  border: {
    blue: 'linear-gradient(to right, #3b82f6, #93c5fd)',
    blueGlow: 'linear-gradient(to right, #3b82f6, #93c5fd), linear-gradient(to bottom right, #030717, #000000)',
  },
  
  // Timeline gradients
  timeline: {
    line: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.4) 50%, transparent 100%)',
  },
};

// Animation presets
export const animations = {
  // Fade animations
  fade: {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8 },
    },
    inUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
    },
    inDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
    },
  },
  
  // Scale animations
  scale: {
    in: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 },
    },
    hover: {
      whileHover: { scale: 1.02 },
      transition: { duration: 0.2 },
    },
  },
  
  // Stagger animations
  stagger: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
  },
};

// Utility functions
export const utils = {
  // Get CSS custom property
  getCSSVar: (name: string): string => `var(--${name})`,
  
  // Create gradient text style
  gradientText: (gradient: string) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
  
  // Create glass morphism effect
  glassMorphism: (opacity: number = 0.1) => ({
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }),
  
  // Create responsive text size
  responsiveText: (sizes: { sm?: string; md?: string; lg?: string; xl?: string }) => {
    const classes = [];
    if (sizes.sm) classes.push(`text-${sizes.sm}`);
    if (sizes.md) classes.push(`md:text-${sizes.md}`);
    if (sizes.lg) classes.push(`lg:text-${sizes.lg}`);
    if (sizes.xl) classes.push(`xl:text-${sizes.xl}`);
    return classes.join(' ');
  },
};

// Component-specific styles
export const componentStyles = {
  // Hero section styles
  hero: {
    title: {
      className: 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6',
      style: utils.gradientText(gradients.text.primary),
    },
    subtitle: {
      className: 'text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto',
      style: { fontFamily: designTokens.typography.fonts.secondary },
    },
  },
  
  // Card styles
  card: {
    base: 'bg-blue-300/10 backdrop-blur rounded-xl border border-white/10',
    hover: 'hover:bg-blue-300/20 transition-all duration-300',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
  },
  
  // Button styles
  button: {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200',
    secondary: 'bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200',
    ghost: 'text-white/70 hover:text-white transition-colors duration-200',
  },
  
  // Navigation styles
  navigation: {
    base: 'bg-blue-300/10 backdrop-blur px-3 xs:px-2 sm:px-4 md:px-5 lg:px-6 py-2 xs:py-1.5 sm:py-2.5 md:py-3 rounded-full',
    item: 'p-2 block hover:scale-110 transition-all duration-200',
  },
  
  // Timeline styles
  timeline: {
    line: 'absolute left-4 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/60 via-blue-300/40 to-transparent',
    dot: 'w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-[0_0_10px_rgba(59,_130,_246,_0.3)]',
  },
};

const designSystem = {
  designTokens,
  gradients,
  animations,
  utils,
  componentStyles,
};

export default designSystem;

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { designTokens, gradients, animations, utils, componentStyles } from '@/lib/design-system';

// Typography Components
export const Typography = {
  // Hero Title Component
  HeroTitle: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6 leading-[1.1] ${className}`}
      style={utils.gradientText(gradients.text.primary)}
      {...props}
    >
      {children}
    </h1>
  ),

  // Hero Subtitle Component
  HeroSubtitle: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`text-lg sm:text-xl md:text-2xl text-white/80 font-extralight leading-relaxed tracking-tighter max-w-4xl mx-auto ${className}`}
      style={{ fontFamily: designTokens.typography.fonts.secondary }}
      {...props}
    >
      {children}
    </p>
  ),

  // Section Title Component
  SectionTitle: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter mb-8 text-center leading-[1.2] ${className}`}
      style={utils.gradientText(gradients.text.primary)}
      {...props}
    >
      {children}
    </h2>
  ),

  // Card Title Component
  CardTitle: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={`text-xl font-light tracking-tighter mb-2 leading-[1.3] ${className}`}
      style={utils.gradientText(gradients.text.primary)}
      {...props}
    >
      {children}
    </h3>
  ),

  // Body Text Component
  BodyText: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`text-white/80 font-extralight leading-relaxed tracking-tighter ${className}`}
      style={{ fontFamily: designTokens.typography.fonts.secondary }}
      {...props}
    >
      {children}
    </p>
  ),

  // Muted Text Component
  MutedText: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`text-white/60 font-extralight tracking-tighter text-sm ${className}`}
      style={{ fontFamily: designTokens.typography.fonts.secondary }}
      {...props}
    >
      {children}
    </p>
  ),
};

// Layout Components
export const Layout = {
  // Page Container Component
  PageContainer: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`relative bg-gradient-to-br from-[#030717] to-[#000000] w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Content Container Component
  ContentContainer: ({ children, className = '', maxWidth = 'max-w-6xl', ...props }: React.HTMLAttributes<HTMLDivElement> & { maxWidth?: string }) => (
    <div 
      className={`relative z-10 pt-24 md:pt-32 pb-16 ${maxWidth} mx-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Hero Section Component
  HeroSection: ({ children, className = '', ...props }: HTMLMotionProps<"div">) => (
    <motion.div
      className={`text-center mb-16 ${className}`}
      {...animations.fade.inUp}
      {...props}
    >
      {children}
    </motion.div>
  ),

  // Section Component
  Section: ({ children, className = '', delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
    <motion.div
      className={`mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      {...props}
    >
      {children}
    </motion.div>
  ),
};

// Card Components
export const Card = {
  // Base Card Component
  Base: ({ children, className = '', padding = 'lg', hover = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { 
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    hover?: boolean;
  }) => (
    <div 
      className={`${componentStyles.card.base} ${componentStyles.card.padding[padding]} ${hover ? componentStyles.card.hover : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Feature Card Component
  Feature: ({ children, className = '', ...props }: HTMLMotionProps<"div">) => (
    <motion.div
      className={`${componentStyles.card.base} ${componentStyles.card.hover} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  ),

  // Mission Card Component
  Mission: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`bg-blue-300/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
};

// Button Components
export const Button = {
  // Primary Button Component
  Primary: ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`${componentStyles.button.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),

  // Secondary Button Component
  Secondary: ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`${componentStyles.button.secondary} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),

  // Ghost Button Component
  Ghost: ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`${componentStyles.button.ghost} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
};

// Navigation Components
export const Navigation = {
  // Base Navigation Component
  Base: ({ children, className = '', ...props }: HTMLMotionProps<"nav">) => (
    <motion.nav
      className={`${componentStyles.navigation.base} ${className}`}
      variants={animations.stagger.container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.nav>
  ),

  // Navigation Item Component
  Item: ({ children, className = '', ...props }: HTMLMotionProps<"div">) => (
    <motion.div
      className={`relative group flex items-center ${className}`}
      variants={animations.stagger.item}
      {...props}
    >
      {children}
    </motion.div>
  ),
};

// Timeline Components
export const Timeline = {
  // Timeline Line Component
  Line: ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`${componentStyles.timeline.line} ${className}`}
      {...props}
    />
  ),

  // Timeline Dot Component
  Dot: ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`${componentStyles.timeline.dot} ${className}`}
      {...props}
    />
  ),
};

// Grid Components
export const Grid = {
  // Feature Grid Component
  Features: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Member Grid Component
  Members: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Gallery Grid Component
  Gallery: ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
};

// Animation Components
export const Animated = {
  // Fade In Component
  FadeIn: ({ children, className = '', delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      {...props}
    >
      {children}
    </motion.div>
  ),

  // Scale In Component
  ScaleIn: ({ children, className = '', delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  ),

  // Stagger Container Component
  StaggerContainer: ({ children, className = '', ...props }: HTMLMotionProps<"div">) => (
    <motion.div
      className={className}
      variants={animations.stagger.container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  ),

  // Stagger Item Component
  StaggerItem: ({ children, className = '', ...props }: HTMLMotionProps<"div">) => (
    <motion.div
      className={className}
      variants={animations.stagger.item}
      {...props}
    >
      {children}
    </motion.div>
  ),
};

// Utility Components
export const Utility = {
  // Glass Morphism Component
  GlassMorphism: ({ children, className = '', opacity = 0.1, ...props }: React.HTMLAttributes<HTMLDivElement> & { opacity?: number }) => (
    <div 
      className={className}
      style={utils.glassMorphism(opacity)}
      {...props}
    >
      {children}
    </div>
  ),

  // Gradient Text Component
  GradientText: ({ children, gradient = gradients.text.primary, className = '', ...props }: React.HTMLAttributes<HTMLSpanElement> & { gradient?: string }) => (
    <span 
      className={className}
      style={utils.gradientText(gradient)}
      {...props}
    >
      {children}
    </span>
  ),

  // Loading Spinner Component
  LoadingSpinner: ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto ${className}`}
      {...props}
    />
  ),
};

// Export all components
const DesignSystem = {
  Typography,
  Layout,
  Card,
  Button,
  Navigation,
  Timeline,
  Grid,
  Animated,
  Utility,
};

export default DesignSystem;

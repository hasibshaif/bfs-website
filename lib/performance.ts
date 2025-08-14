// lib/performance.ts

/**
 * Detects if the current device is likely to have performance limitations
 * for animations and complex visual effects.
 */
export const isLowPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices (basic heuristic)
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
  
  // Check for low memory devices
  const isLowMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory <= 4 : false;
  
  // Check for slow connection
  const isSlowConnection = (navigator as any).connection ? 
    ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType) : false;
  
  return isMobile || prefersReducedMotion || isLowEnd || isLowMemory || isSlowConnection;
};

/**
 * Gets optimized animation settings based on device performance
 */
export const getOptimizedAnimationSettings = () => {
  const isLowPerformance = isLowPerformanceDevice();
  
  return {
    isLowPerformance,
    // Typing animation delays - faster on mobile for better engagement
    baseTypingDelay: isLowPerformance ? 150 : 120,
    subTypingDelay: isLowPerformance ? 20 : 15,
    fullTextDelay: isLowPerformance ? 120 : 100,
    
    // Moving lines settings - more lines on mobile for visual interest
    maxLines: isLowPerformance ? 6 : 8,
    strokeWidthRange: isLowPerformance ? [2, 8] : [2, 12],
    animationDuration: {
      min: isLowPerformance ? 15 : 10,
      max: isLowPerformance ? 35 : 60
    },
  };
};

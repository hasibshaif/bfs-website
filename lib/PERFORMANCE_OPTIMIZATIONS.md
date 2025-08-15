# Performance Optimizations for Mobile and Older Devices

This document outlines the performance optimizations implemented to improve the user experience on mobile devices and older hardware.

## Overview

The BFS website includes complex animations (typing effects and moving background lines) that can be resource-intensive on lower-end devices. We've implemented adaptive performance detection and optimization strategies to ensure smooth performance across all devices.

## Performance Detection

The system automatically detects low-performance devices using multiple heuristics:

- **Mobile Detection**: Identifies mobile browsers via user agent
- **Reduced Motion**: Respects user's `prefers-reduced-motion` setting
- **Hardware Assessment**: Checks CPU cores (≤4 cores considered low-end)
- **Memory Detection**: Identifies devices with ≤4GB RAM
- **Connection Speed**: Detects slow network connections (2G/3G)

## Optimizations Implemented

### 1. AnimatedHero Component

**Typing Animation Optimizations:**
- Slower typing speed on low-performance devices (200ms vs 120ms base delay)
- Reduced subtext typing speed (25ms vs 15ms)
- Audio throttling (only 30% of sounds play on low-performance devices)
- Audio disabled entirely on very low-end devices

**Visual Optimizations:**
- Reduced number of background lines (3 vs 5)
- Reduced number of foreground lines (1 vs 2)
- Smaller stroke widths for moving lines

### 2. MovingLines Component

**Animation Optimizations:**
- Longer animation durations on low-performance devices (20-40s vs 10-60s)
- Reduced maximum number of lines (4 vs 8)
- Lower opacity ranges for better performance
- Optimized SVG rendering with `shapeRendering="optimizeSpeed"`
- Debounced resize event handling (100ms delay)

**Memory Optimizations:**
- Memoized path generation to avoid recalculation
- Memoized gradient definitions
- Reduced jitter and grid precision on low-performance devices

### 3. Shared Performance Utilities

**`lib/performance.ts`:**
- Centralized device detection logic
- Configurable animation settings
- Reusable optimization parameters

**`components/PerformanceMonitor.tsx`:**
- Real-time FPS monitoring (development only)
- Performance metrics logging
- Device capability reporting

## Configuration

Performance settings can be adjusted in `lib/performance.ts`:

```typescript
export const getOptimizedAnimationSettings = () => {
  const isLowPerformance = isLowPerformanceDevice();
  
  return {
    isLowPerformance,
    baseTypingDelay: isLowPerformance ? 200 : 120,
    subTypingDelay: isLowPerformance ? 25 : 15,
    fullTextDelay: isLowPerformance ? 150 : 100,
    maxLines: isLowPerformance ? 4 : 8,
    strokeWidthRange: isLowPerformance ? [1, 6] : [2, 12],
    animationDuration: {
      min: isLowPerformance ? 20 : 10,
      max: isLowPerformance ? 40 : 60
    },
    audioThrottle: isLowPerformance ? 0.3 : 1.0,
  };
};
```

## Testing Performance

### Development Mode
- Performance monitor shows real-time FPS and frame times
- Console logs detailed performance metrics
- Device capability information displayed

### Production Mode
- Performance monitor automatically disabled
- Optimizations applied based on device detection
- No performance overhead from monitoring

## Best Practices

1. **Progressive Enhancement**: Core functionality works without animations
2. **User Preferences**: Respects `prefers-reduced-motion` setting
3. **Adaptive Loading**: Audio and complex animations load conditionally
4. **Memory Management**: Proper cleanup of timers and event listeners
5. **Debounced Events**: Resize and scroll events are debounced

## Browser Support

- **Modern Browsers**: Full optimization suite
- **Older Browsers**: Graceful degradation with basic animations
- **Mobile Browsers**: Optimized for touch devices and limited resources
- **Accessibility**: Respects user motion preferences

## Monitoring

In development mode, the performance monitor provides:
- Real-time FPS counter
- Average frame time
- Device classification
- Memory usage (when available)

This helps developers identify performance issues and fine-tune optimizations for different device categories.

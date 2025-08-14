// components/PerformanceMonitor.tsx
"use client";
import { useEffect, useRef } from 'react';
import { isLowPerformanceDevice } from '@/lib/performance';

// TypeScript interfaces for navigator and performance extensions
interface NetworkInformation {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
}

interface NavigatorWithExtensions extends Navigator {
  deviceMemory?: number;
  connection?: NetworkInformation;
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  deviceInfo: {
    userAgent: string;
    hardwareConcurrency: number;
    deviceMemory?: number;
    connectionType?: string;
    isLowPerformance: boolean;
  };
}

export const PerformanceMonitor: React.FC = () => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const navigatorWithExtensions = navigator as NavigatorWithExtensions;
  const performanceWithMemory = performance as PerformanceWithMemory;
  
  const metrics = useRef<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    deviceInfo: {
      userAgent: navigator.userAgent,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: navigatorWithExtensions.deviceMemory,
      connectionType: navigatorWithExtensions.connection?.effectiveType,
      isLowPerformance: isLowPerformanceDevice(),
    }
  });

  useEffect(() => {
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      frameCount.current++;
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        const frameTime = (currentTime - lastTime.current) / frameCount.current;
        
        metrics.current.fps = fps;
        metrics.current.frameTime = frameTime;
        
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', {
            fps,
            frameTime: frameTime.toFixed(2) + 'ms',
            deviceInfo: metrics.current.deviceInfo,
            memoryUsage: performanceWithMemory.memory?.usedJSHeapSize ? 
              Math.round(performanceWithMemory.memory.usedJSHeapSize / 1024 / 1024 * 100) / 100 : undefined
          });
        }
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded pointer-events-none">
      <div>FPS: {metrics.current.fps}</div>
      <div>Frame: {metrics.current.frameTime.toFixed(1)}ms</div>
      <div>Device: {metrics.current.deviceInfo.isLowPerformance ? 'Low Performance' : 'High Performance'}</div>
    </div>
  );
};

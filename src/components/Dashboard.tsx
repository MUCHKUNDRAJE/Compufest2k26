'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D Canvas with SSR disabled to avoid hydration/window errors
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), {
  ssr: false,
});

export default function Dashboard() {
  const [stage, setStage] = useState<'loading' | 'video' | 'flash' | 'scene'>('loading');
  const [whiteFlashOpacity, setWhiteFlashOpacity] = useState(1);
  const [purpleFlashOpacity, setPurpleFlashOpacity] = useState(1);

  useEffect(() => {
    if (stage === 'loading') {
      // Loading screen displays for 2.5 seconds
      const timer = setTimeout(() => {
        setStage('video');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleVideoEnded = () => {
    // Transition to flash stage
    setStage('flash');
    setWhiteFlashOpacity(1);
    setPurpleFlashOpacity(1);
    
    // Smoothly fade out both flash color overlays in the next frame
    const animationFrame = requestAnimationFrame(() => {
      setWhiteFlashOpacity(0);
      setPurpleFlashOpacity(0);
    });

    // Remove the flash overlay state completely after the slow animation finishes
    const timer = setTimeout(() => {
      setStage('scene');
    }, 1300);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  };

  // The canvas is visible during flash and scene stages
  const isCanvasVisible = stage === 'flash' || stage === 'scene';
  // The canvas is PRE-MOUNTED (but invisible) during video to preload the model in background
  const isCanvasMounted = stage === 'video' || isCanvasVisible;

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative select-none">

      {/* 3D SCENE LAYER — mounted during 'video' for preloading, visible after flash */}
      {isCanvasMounted && (
        <div
          className="w-full h-full absolute inset-0 z-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.webp')",
            // Invisible during video stage (model preloads silently in background)
            // Becomes visible once flash transition begins
            opacity: isCanvasVisible ? 1 : 0,
            pointerEvents: isCanvasVisible ? 'auto' : 'none',
            transition: 'opacity 200ms ease',
          }}
        >
          {/* Dark overlay for contrast */}
          <div className="w-full h-full absolute inset-0 bg-black/35 z-0" />

          {/* COMPUFEST title — centered, BEHIND the 3D model */}
          {/* <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <h1
              className="text-white text-center leading-loose"
              style={{
                fontFamily: 'var(--font-press-start-2p)',
                fontSize: 'clamp(105px, 6vw, 105px)',
                textShadow: '0 0 30px #560994, 0 0 60px #a855f7, 0 2px 8px rgba(0,0,0,0.9)',
                letterSpacing: '0.08em',
              }}
            >
              COMPUFEST 2K26
            </h1>
          </div> */}

          {/* 3D Canvas — higher z-index so it renders IN FRONT of the text */}
          <div className="absolute top-0 inset-0 z-20">
            <ThreeCanvas />
          </div>
        </div>
      )}

      {/* stage 1: #560994 LOADING SCREEN */}
      {stage === 'loading' && (
        <div className="w-full h-full absolute inset-0 bg-[#560994] z-50 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            <p
              className="text-white text-[9px] uppercase animate-pulse"
              style={{ fontFamily: 'var(--font-press-start-2p)', letterSpacing: '0.15em' }}
            >
              LOADING SYSTEM
            </p>
          </div>
        </div>
      )}

      {/* stage 2: FULLSCREEN LOADER VIDEO (canvas is preloading invisibly behind this) */}
      {stage === 'video' && (
        <div className="w-full h-full absolute inset-0 bg-black z-40">
          <video
            src="/loader.webm"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* stage 3: DUAL-LAYER FLASH TRANSITIONS (WHITE + PURPLE) */}
      {stage === 'flash' && (
        <>
          {/* White Blast (Quick 300ms fadeout) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              opacity: whiteFlashOpacity,
              transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full h-full absolute inset-0 z-35 pointer-events-none"
          />
          
          {/* Deep Purple Glow (Slower 1200ms fadeout) */}
          <div
            style={{
              backgroundColor: '#560994',
              opacity: purpleFlashOpacity,
              transition: 'opacity 1200ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="w-full h-full absolute inset-0 z-30 pointer-events-none"
          />
        </>
      )}
    </div>
  );
}

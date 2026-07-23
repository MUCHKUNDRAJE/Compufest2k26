'use client';

import { useEffect, useState } from 'react';

export default function MinecraftLoader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  // Track real page load
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageReady(true);
    } else {
      const onLoad = () => setPageReady(true);
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);


    const pixelFont = { fontFamily: 'var(--font-press-start-2p)' };
  // Simulated progress ticking up, capped at 90% until real load fires
  useEffect(() => {
    if (hideLoader) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const cap = pageReady ? 100 : 90;
        if (prev >= cap) return prev;
        const step = Math.random() * 4 + 1;
        return Math.min(cap, prev + step);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [pageReady, hideLoader]);

  // Once we hit 100, wait a beat then fade the loader out
  useEffect(() => {
    if (progress >= 100 && pageReady) {
      const timeout = setTimeout(() => setHideLoader(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, pageReady]);

  return (
    <>
      {!hideLoader && (
        <div
          className="fixed inset-0 z-[9999] pb-40 flex flex-col  items-center justify-center bg-[#1a1a1a] transition-opacity duration-500"
          style={{ opacity: progress >= 100 && pageReady ? 0 : 1 }}
        >
          {/* Title */}
          <div className="-mb-20 scale-90 md:scale-145">
             <img src="./minechain.png" alt="" />
          </div>

          {/* Spinner */}
          <div className="md:mb-8 h-20 w-20 scale-70 md:scale-100 ">
              <img className='h-full w-full object-cover' src="./loader2.gif" alt="" />
          </div>

          {/* Progress bar */}
          <div className="w-[min(70vw,860px)] h-[22px] border-[3px] border-white box-border bg-[#1a1a1a] p-[3px]">
            <div
              className="h-full bg-white"
              style={{ width: `${progress}%`, transition: 'width 150ms linear' }}
            />
          </div>
          <div className="mt-3 text-[18px] tracking-wide text-zinc-300" style={{fontFamily:"Minecraft"}}>
            {Math.floor(progress)}%
          </div>
        </div>
      )}

      {children}
    </>
  );
}
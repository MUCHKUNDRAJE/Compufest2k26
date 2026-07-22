"use client"
import React, { useState, useEffect, useRef } from 'react';
import PixelSnow from './PixelSnow';

const HeroSection = ({ imageUrl = "/image.png" }) => {
  // Styles applied using the provided CSS variable
  const pixelFont = { fontFamily: 'var(--font-press-start-2p)' };
  const minecraftShadow = "4px 4px 0px #000";
  const greenShadow = "7px 7px 0px black";



  return (
    <div className="min-h-screen bg-[#0a1420]" style={pixelFont}>
      {/* Navbar */}
  
      {/* Hero Content */}

      <div className=' absolute top-10 ' style={{ width: '100%', height: '600px',  }}>
  <PixelSnow 
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={180}
    speed={1.25}
    density={0.22}
    direction={125}
    brightness={1}
    depthFade={8}
    farPlane={14}
    gamma={0.4545}
    variant="square"
/>
</div>
      <header className="relative h-screen flex flex-col justify-center items-center text-center p-4">
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt="Minecraft landscape" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1420] via-transparent to-[#0a1420]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
    <div className=' w-60 absolute top-14 scale-75 left-1/2 -translate-1/2'>
   <img className='h-full w-full '  src="/minechain.png" alt="" />
    </div>
          <h1 className="text-5xl md:text-8xl mt-20 text-green-400" style={{ textShadow: greenShadow, fontFamily: "MineCraft" }}>
            COMPUFEST <br />
            2k26
          </h1>

          <p className="text-white text-[10px] md:text-xs tracking-widest mt-4">
            ✦ CODE. CREATE. CONQUER. ✦
          </p>

          {/* Info Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 bg-[#0a1420]/80 border-2 border-green-500 p-4 rounded-lg text-[8px] text-white">
            <span>📅 26TH - 28TH SEPT 2025</span>
            <span className="hidden md:block">|</span>
            <span>📍 YCCE, NAGPUR</span>
            <span className="hidden md:block">|</span>
            <span>👥 FOR INNOVATORS</span>
          </div>

          <button className="mt-2 bg-green-500 mb-2 hover:bg-green-400 text-[#0a1420] px-8 py-4 rounded-lg font-bold shadow-[4px_4px_0px_#064e3b] transition-all hover:-translate-y-1 text-xs">
            EXPLORE EVENTS →
          </button>
        </div>

        {/* Decorative Grass Edge */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-slow-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>

        <div className="absolute bottom-0 w-full h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
          <div className="flex animate-slow-marquee whitespace-nowrap gap-4 px-4">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"
              ></div>
            ))}
            {/* Duplicate set for seamless looping */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`copy-${i}`}
                className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeroSection;
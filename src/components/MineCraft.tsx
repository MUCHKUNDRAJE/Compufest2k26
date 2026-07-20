"use client"
import React, { useState, useEffect, useRef } from 'react';
 import PixelSnow from './PixelSnow';

const HeroSection = ({ imageUrl = "/image.png" }) => {
  // Styles applied using the provided CSS variable
  const pixelFont = { fontFamily: 'var(--font-press-start-2p)' };
  const minecraftShadow = "4px 4px 0px #000";
  const greenShadow = "7px 7px 0px black";

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // near top, always show
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1420]" style={pixelFont}>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 bg-[#0a1420]/90 backdrop-blur-sm border-b border-green-800 p-4 transition-transform duration-300 ${
          showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
         


          
          
               <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-400 grid grid-cols-2 gap-0.5 p-1">
              <div className="bg-[#0a1420]"></div><div className="bg-white"></div>
              <div className="bg-white"></div><div className="bg-[#0a1420]"></div>
            </div>
            <div>
              <h1 className="text-white text-[10px] font-bold">YCCE TECH CLUB</h1>
            </div>
          </div>

          <div className="hidden md:flex gap-6 text-white text-[8px] uppercase items-center">
            {['HOME', 'ABOUT', 'EVENTS', 'HIGHLIGHTS', 'SCHEDULE', 'CONTACT'].map((item) => (
              <a key={item} href="#" className={`hover:text-green-400 ${item === 'HOME' ? 'border-b-2 border-green-400' : ''}`}>
                {item}
              </a>
            ))}
            <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-500 transition-transform hover:scale-105 border-b-4 border-green-800">
              REGISTER NOW →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}

      <div className=' absolute top-10 ' style={{ width: '100%', height: '600px',  }}>
  <PixelSnow 
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={200}
    speed={1.25}
    density={0.3}
    direction={125}
    brightness={1}
    depthFade={8}
    farPlane={20}
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
   <img className='h-full w-full '  src="/Minecraft.png" alt="" />
    </div>
          <h1 className="text-4xl md:text-8xl mt-20 text-green-400" style={{ textShadow: greenShadow, fontFamily: "MineCraft" }}>
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
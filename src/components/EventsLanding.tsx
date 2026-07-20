"use client"
import React from 'react';
import Portal from './portal';
import SpriteSheetAnimator from './sprite';
import MinecraftCourses from './MinecraftCourses';
import BentoGrid from './MinecraftCourses';

function EventLanding() {
  const playerOffsets = [
  { x: -7, y: 0 },   // Frame 1
  { x: 10, y: 0 },  // Frame 2 (adjust these numbers until it looks centered)
  { x: 0, y: 0 }, 
  { x: 0, y: 0 }, // Frame 3
  { x: 0, y: 0 },
   { x: 0, y: 0 }
  // ... add an entry for every frame
];
  return (
    <div className='w-full '>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slow-marquee { animation: marquee 20s linear infinite; }
      `}</style>
      
      {/* Header / Video Section */}
      <div className='h-40 flex w-full relative'>
        <div className='h-40 w-96'>
          <img src="./2.png" className="object-cover h-full w-full"></img>
        </div>
         <div className='h-40 w-96 '>
          <img src="./6.png" className="object-cover   h-full w-full"></img>
        </div>
          <div className='h-40 w-96 '>
          <img src="./4.png" className="object-cover   h-full w-full"></img>
        </div>  <div className='h-40 w-96 '>
          <img src="./5.png" className="object-cover   h-full w-full"></img>
        </div>
        
          {/* <SpriteSheetAnimator
            src="\spritesheet.png"
            frameWidth={35}
            frameHeight={56}
            frameCount={8}
            columns={8}
            fps={1}
            loop={true}
            scale={2}
            frameOffsets={playerOffsets}
            className='mt-10 absolute '
            onComplete={undefined}/> */}
            
    
            {/* <div className='h-40 w-72'>
          <img src="./1.png" className="object-cover h-full w-full"></img>
        </div>
            <div className='h-40 w-72'>
          <img src="./1.png" className="object-cover h-full w-full"></img>
        </div>
           <div className='h-40 w-72'>
          <img src="./1.png" className="object-cover h-full w-full"></img>
        </div>
           <div className='h-40 w-72'>
          <img src="./1.png" className="object-cover h-full w-full"></img>
        </div>
             <div className='h-40 w-72'>
          <img src="./1.png" className="object-cover h-full w-full"></img>
        </div> */}
      </div>

      {/* Marquee Section */}
      <div className="w-full h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
        <div className="flex animate-slow-marquee whitespace-nowrap gap-4 px-4">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
          ))}
          {[...Array(40)].map((_, i) => (
            <div key={`copy-${i}`} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Events Section: Fixed to cover the screen */}
      <div 
        className='w-full min-h-screen bg-red-100 bg-cover bg-center py-10' 
        style={{ backgroundImage: "url('/bg-dirt.png')" }}
      >
        <h1 className='text-5xl text-white text-center mb-10' style={{fontFamily:"MineCraft"}}>
          Events
        </h1>
        
        {/* The grid is now a sibling to the h1, not inside it */}
        <BentoGrid/> 


      </div>
    </div>
  );
}

export default EventLanding;
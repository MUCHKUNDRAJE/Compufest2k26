"use client"
import React from 'react'

function Mario() {
  return (
    <div className='min-h-screen w-full '>
        <div className='h-screen p-10 w-full bg-white  '>
           <div className='h-full w-full bg-sky-300 flex z-20 flex-col items-center justify-center relative overflow-hidden'>
                   <h1 style={{fontFamily:"SuperMario256"}} className='flex text-9xl   text-center items-center justify-center '> 
                    
  <span className="[-webkit-text-stroke:3px_black] text-[#FE504C]">c</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#FDCA00]">o</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#74A053]">m</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#0086F6]">p</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#FE504C]">u</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#FDCA00]">f</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#74A053]">e</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#0086F6]">s</span>
  <span className="[-webkit-text-stroke:3px_black] text-[#FE504C]">t</span>
 
              </h1>
              <h1 style={{fontFamily:"SuperMario256"}} className='flex text-9xl   text-center items-center justify-center '>
                 <span className="[-webkit-text-stroke:3px_black] text-[#FE504C]">2</span>
                 <span className="[-webkit-text-stroke:3px_black] text-[#FDCA00]">k</span>
                 <span className="[-webkit-text-stroke:3px_black] text-[#74A053]">2</span>
                 <span className="[-webkit-text-stroke:3px_black] text-[#0086F6]">6</span>
              </h1>

              {/* Floating clouds */}
              <div className='absolute scale-100 top-60 z-20 left-20 animate-float-slow'>
                    <img src="/Cloud.png" alt="" />   
              </div>
               <div className='absolute scale-60 -top-30  z-20 left-200 animate-float-medium'>
                    <img src="/Cloud.png" alt="" />   
              </div>
               <div className='absolute scale-60 -top-20 z-30 left-20 animate-float-fast'>
                    <img src="/Cloud.png" alt="" />   
              </div>

              {/* Mario question block */}
              {/* <div className='absolute sc top-40 right-32 z-30 animate-bounce-block'>
                    <img src="/block.png" alt="Mario question block" />
              </div> */}
           </div>

        </div>

        <style jsx>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(10px); }
          }
          @keyframes floatMedium {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(-15px); }
          }
          @keyframes floatFast {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-10px) translateX(15px); }
          }
          @keyframes bounceBlock {
            0%, 100% { transform: translateY(0px); }
            25% { transform: translateY(-8px); }
            50% { transform: translateY(0px); }
          }
          .animate-float-slow {
            animation: floatSlow 6s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: floatMedium 8s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: floatFast 5s ease-in-out infinite;
          }
          .animate-bounce-block {
            animation: bounceBlock 1.5s ease-in-out infinite;
          }
        `}</style>
    </div>
  )
}

export default Mario
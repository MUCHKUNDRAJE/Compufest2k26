import React from 'react'
import ThreeCanvas from './ThreeCanvas'

function About() {
  return (
    <div id='about' className='h-screen relative w-full overflow-hidden'>
      <img src="/about-bg.png" alt="" className='w-full h-full object-cover' />
      <div className='h-screen w-full hidden md:block absolute top-0'>
        <ThreeCanvas />
      </div>
      <div
        className='h-screen w-full absolute top-0 pointer-events-none flex flex-col items-center gap-4 px-4 pt-6 overflow-y-auto md:block md:px-0 md:pt-0 md:mt-10 md:overflow-visible'
        style={{ fontFamily: 'MineCraft' }}
      >
        <h1 className='text-center text-2xl md:text-4xl text-white'>About us</h1>

        <div className='p-3 w-full max-w-xs h-auto md:h-90 md:w-90 bg-[#401D70] border-2 rounded-2xl bg-accent-foreground md:ml-20 md:mt-40'>
          <div>
            <p className='text-base md:text-xl text-white'>
              <span className='text-2xl md:text-3xl'> What is Compufest ?</span>
              <br />
              Compufest is YCCE's Computer Technology Department annual tech event with competitions, workshops, coding, and gaming, fostering innovation and collaboration.
            </p>
          </div>
        </div>

        <div className='p-3 w-full max-w-xs h-auto md:h-90 md:w-90 bg-[#401D70] border-2 rounded-2xl md:absolute md:right-20 md:top-10'>
          <div>
            <p className='text-sm md:text-md text-white'>
              <span className='text-2xl md:text-3xl'> About CT Dpartment ?</span>
              <br />
              The Department of Computer Technology at YCCE, established in 1985, is accredited and recognized for excellence in education and research. With a focus on AI, IoT, ML, and more, it offers industry-relevant programs and advanced research opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-0 h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
        <div className="flex animate-slow-marquee whitespace-nowrap gap-4 px-4">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
          ))}
          {[...Array(40)].map((_, i) => (
            <div key={`copy-${i}`} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
import React from 'react';

function Footer() {
  return (
    <footer className="relative w-full h-40 bg-[#5b3922] border-t-8 border-[#3f5e27] ">
      {/* Grass Top Layer Pattern (Pixelated Look) */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[#4a6b30]">
        {/* Decorative "Grass Blades" or pixel blocks */}
        <div className="flex gap-1 px-2 h-full items-end">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`w-6 ${i % 2 === 0 ? 'h-3' : 'h-2'} bg-[#5a7d3a]`}
            ></div>
          ))}
        </div>
      </div>

      {/* Footer Content Area */}
      <div className="flex flex-col items-center justify-center h-full pt-6 text-[#d1d5db]">
        <p className="font-['Minecraft'] text-sm tracking-widest text-[#a3a3a3]">
         Compufest 2K26
        </p>
          <p className="font-['Minecraft'] text-sm tracking-widest text-[#a3a3a3]">
           Website Created By Muchkundraje thote and  Compufest Technical Team 
        </p>
        <div className="flex gap-6 mt-4">
          <a href="#" className="hover:text-white font-['Minecraft'] text-xs">Home</a>
          <a href="#" className="hover:text-white font-['Minecraft'] text-xs">About</a>
          <a href="#" className="hover:text-white font-['Minecraft'] text-xs">Event</a>
          <a href="#" className="hover:text-white font-['Minecraft'] text-xs">Timeline</a>
          <a href="#" className="hover:text-white font-['Minecraft'] text-xs">Instgram</a>
        <a href="#" className="hover:text-white font-['Minecraft'] text-xs">Committee</a>
        </div>
      </div>

      {/* Bottom Border/Bedrock Style */}
      <div className="absolute bottom-0 w-full h-2 bg-[#2d1f14]"></div>
    </footer>
  );
}

export default Footer;
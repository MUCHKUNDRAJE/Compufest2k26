import React from 'react';

const EventCard = ({ 
  imageUrl = "/portal.png", 
  title = "CODERUSH",
  subtitle = "24-HOUR HACKATHON",
  description = "50 Teams. 24 Hours. Dive into a full-day innovation sprint where ideas turn into impactful tech solutions. Build, debug, and deliver under pressure.",
  stats = {
    fee: "₹500",
    mode: "Offline",
    difficulty: "MAXIMUM THREAT",
    team: "3-5",
    reward: "₹30,000"
  }
}) => {
  return (
    <div className="group relative w-90 h-[500px] border-[30px] border-[#1a1a1a] bg-black shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] overflow-hidden font-['Minecraft']">
      
      {/* Animated Portal Background */}
      <div 
        className="absolute inset-0 bg-cover  bg-center animate-pulse opacity-70"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 bg-black/60 backdrop-blur-sm text-white">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest text-white drop-shadow-[0_2px_2px_rgba(147,51,234,1)] mb-2">
            {title}
          </h1>
          <span className="inline-block bg-purple-700 px-3 py-1 text-xs uppercase font-bold tracking-tighter">
            {subtitle}
          </span>
        </div>

        <p className="text-xs text-gray-200 text-center leading-relaxed px-2">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full text-[10px] bg-black/40 p-3 border-2 border-purple-900/50">
          <div><p className="text-purple-400">💰 FEE</p><p>{stats.fee}</p></div>
          <div><p className="text-purple-400">📍 MODE</p><p>{stats.mode}</p></div>
          <div className="col-span-2 text-center">
            <p className="text-red-500 font-bold">⚠️ {stats.difficulty}</p>
          </div>
          <div><p className="text-purple-400">🧑‍🤝‍🧑 TEAM</p><p>{stats.team}</p></div>
          <div><p className="text-purple-400">🏆 REWARD</p><p>{stats.reward}</p></div>
        </div>

        {/* CTA Button */}
        <button className="w-full  bg-gradient-to-r from-purple-800 to-purple-600 border-b-4 border-purple-900 hover:brightness-125 transition-all active:border-b-0 active:translate-y-1 flex items-center justify-center p-2">
          <span className="text-sm font-bold">ENTER THE PORTAL →</span>
        </button>
        
      </div>
    </div>
  );
};

export default EventCard;
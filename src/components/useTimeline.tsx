"use client"
import Timeline from './Timeline';
export default function UseTimeline() {
  // 1. Create dummy data
  const dummyEvents = [
    { 
      id: 1, 
      title: 'CodeRush Hackathon', 
      date: '7-8 August 2026',
      xp: 50,
      blockType: 'dirt',
      difficulty: 'Easy',
      description: 'Code Rush is a 24-hour hackathon to build innovative solutions and solve real-world problems. Collaborate, code, and innovate under pressure!',
      prizePool: '₹70,000',
      imag: "https://i.pinimg.com/736x/6e/61/a0/6e61a09f6e8c673ad1a1e0c2781922b1.jpg",
    },
    { 
      id: 2, 
      title: 'Versus Coding', 
      date: '06-August 2026',
      xp: 100,
      blockType: 'stone',
      difficulty: 'Medium',
      description: 'Versus Coding is a competitive coding event where participants battle to solve challenging problems. Compete, code, and prove your skills!',
      prizePool: '₹3,500',
      imag:"https://i.pinimg.com/736x/e4/a8/1e/e4a81e06f9be9934de83e441de328ec0.jpg"
    },
    { 
      id: 3, 
      title: 'Prompt-A-thon', 
      date: '06 August 2026',
      xp: 250,
      blockType: 'gold',
      difficulty: 'Hard',
      description: 'Prompt-a-thon is a creative AI challenge where participants craft powerful prompts to solve unique problems. Think, prompt, and innovate with AI!',
      prizePool: '₹5,000',
      imag:"https://i.pinimg.com/736x/86/34/2a/86342adb2ab846a073e05b362092b0af.jpg"
    },
    { 
      id: 4, 
      title: 'Tech Quiz', 
      date: '07 August 2026',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Medium',
      description: 'Tech Quiz is an exciting challenge to test your knowledge of technology, coding, and innovation. Think fast, answer smart, and prove your tech skills!',
      prizePool: '₹4,500',
      imag:"https://i.pinimg.com/1200x/ed/fc/6d/edfc6d5a5b63db5690f417dee6b776e9.jpg",
    },
       { 
      id: 5, 
      title: 'Hack ML', 
      date: '06 August 2026',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Maximum Threat',
      description: 'Hack ML is an exciting challenge where participants build innovative solutions using Machine Learning. Learn, code, and create intelligent solutions!',
      prizePool: '₹3,000',
      imag:"https://i.pinimg.com/1200x/e2/4a/ea/e24aea50864d60e225d6c2c8c12805a9.jpg",
    },   { 
      id: 6, 
      title: 'Long Cricket', 
      date: '1st-3rd August',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Hard',
      description: 'Long Cricket is an exciting cricket challenge that tests your skills, strategy, and teamwork. Play hard, score big, and enjoy the game!',
      prizePool: '₹7,000',
      imag:"https://i.pinimg.com/736x/5c/ea/00/5cea00ff21a77908e9ab46c526f0481b.jpg"
    },   { 
      id: 7, 
      title: 'Chess', 
      date: '06 August 2026',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Medium',
      description: 'Chess is a strategic battle of minds where every move counts. Think ahead, outsmart your opponent, and claim victory!',
      prizePool: '₹2,200',
      imag:'https://i.pinimg.com/1200x/3d/04/0c/3d040ce7a4e0af9e2e54e2ba57c2a544.jpg'
    },
    { 
      id: 8, 
      title: 'Free Fire', 
      date: '05 August 2026',
      xp: 50,
      blockType: 'dirt',
      difficulty: 'Easy',
      description: 'Free Fire is an action-packed battle royale where players compete for survival and victory. Fight smart, survive longer, and be the last one standing!',
      prizePool: '₹2,200',
      imag: "https://i.pinimg.com/736x/6e/61/a0/6e61a09f6e8c673ad1a1e0c2781922b1.jpg",
    },
    { 
      id: 9, 
      title: 'BGMI', 
      date: '07 August 2026',
      xp: 100,
      blockType: 'stone',
      difficulty: 'Hard',
      description: 'BGMI is an intense battle royale where players compete with strategy, teamwork, and skill. Gear up, fight smart, and be the last team standing!',
      prizePool: '₹2,200',
      imag:"https://i.pinimg.com/736x/e4/a8/1e/e4a81e06f9be9934de83e441de328ec0.jpg"
    }
   
  ];

  // 2. Define your handler functions
  const handleHover = (pos: { x: number; y: number }, rect: DOMRect) => {};
  const handleLeave = () => {};
  const handleClick = (xp: number, rect: DOMRect) => {};
  const handleIntersect = (xp: number) => {};

  return (
    <>
      <div id='highlights' className="w-full h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
      <div id='highlights' className="w-full h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
       <div className="flex animate-slow-marquee whitespace-nowrap gap-4 px-4">
         {[...Array(40)].map((_, i) => (
           <div key={i} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
         ))}
         {[...Array(40)].map((_, i) => (
           <div key={`copy-${i}`} className="w-8 h-8 bg-green-500 mb-2 opacity-50 flex-shrink-0"></div>
         ))}
       </div>
      </div>
<section className='relative bg-center bg-repeat' style={{
  width: '100%',
  background: "url(/forest.png)",
  backgroundSize: 'cover',
  padding: '80px 0 60px',
  borderTop: '4px solid #166534',
  borderBottom: '4px solid #166534',
}}>
    <div className='h-full w-full absolute z-1  top-0 bg-black opacity-30'>

    </div>
      {/* Section Header */}
      <div className='relative z-10' style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{
          fontFamily: 'MineCraft, var(--font-press-start-2p), sans-serif',
          fontSize: '10px',
          color: '#4ade80',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>Compufest 2k26</p>
        <h2 style={{
          fontFamily: 'MineCraft, var(--font-press-start-2p), sans-serif',
          fontSize: 'clamp(24px, 4vw, 48px)',
          color: '#ffffff',
          textShadow: '4px 4px 0px #000, 0 0 30px rgba(74,222,128,0.4)',
          textTransform: 'uppercase',
          margin: 0,
        }}>Events Timeline</h2>
        <div style={{ width: '120px', height: '4px', background: '#15803d', margin: '16px auto 0', boxShadow: '0 0 10px #4ade80' }} />
      </div>


      <Timeline
        events={dummyEvents}
        onBlockHover={handleHover}
        onBlockLeave={handleLeave}
        onBlockClick={handleClick}
        onNodeIntersect={handleIntersect}
        playerPos={{ x: 0, y: 0 }}
        playerState="idle"
      />
      
      <div  className="absolute bottom-0 w-full z-10 h-12 bg-green-600 border-t-4 border-green-800 overflow-hidden flex items-end">
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
    </section>
    </>
    
  );
}
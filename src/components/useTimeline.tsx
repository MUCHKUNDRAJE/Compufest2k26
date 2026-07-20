"use client"
import Timeline from './Timeline';
export default function UseTimeline() {
  // 1. Create dummy data
  const dummyEvents = [
    { 
      id: 1, 
      title: 'Minecraft Build Battle', 
      date: '2026-09-26',
      xp: 50,
      blockType: 'dirt',
      difficulty: 'Easy',
      description: 'Build the most spectacular pixel structures within a limited block budget and tight time constraint.',
      prizePool: '₹5,000',
      imag: "https://i.pinimg.com/736x/6e/61/a0/6e61a09f6e8c673ad1a1e0c2781922b1.jpg",
    },
    { 
      id: 2, 
      title: 'Redstone Wire Up', 
      date: '2026-09-26',
      xp: 100,
      blockType: 'stone',
      difficulty: 'Medium',
      description: 'Connect complex logical gates, fix broken circuitry, and light up the redstone beacons in record time.',
      prizePool: '₹10,000',
      imag:"https://i.pinimg.com/736x/e4/a8/1e/e4a81e06f9be9934de83e441de328ec0.jpg"
    },
    { 
      id: 3, 
      title: 'CodeRush Hackathon', 
      date: '2026-09-27',
      xp: 250,
      blockType: 'gold',
      difficulty: 'Hard',
      description: 'A 24-hour intense coding sprint to build interactive web apps, debug retro games, and deliver under pressure.',
      prizePool: '₹30,000',
      imag:"https://i.pinimg.com/736x/86/34/2a/86342adb2ab846a073e05b362092b0af.jpg"
    },
    { 
      id: 4, 
      title: 'Nether Portal Quest', 
      date: '2026-09-28',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Maximum Threat',
      description: 'Decode cryptographic nodes, solve multi-threaded puzzles, and light up the ancient obsidian portal to win.',
      prizePool: '₹50,000',
      imag:"https://i.pinimg.com/1200x/ed/fc/6d/edfc6d5a5b63db5690f417dee6b776e9.jpg",
    },
       { 
      id: 5, 
      title: 'Nether Portal Quest', 
      date: '2026-09-28',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Maximum Threat',
      description: 'Decode cryptographic nodes, solve multi-threaded puzzles, and light up the ancient obsidian portal to win.',
      prizePool: '₹50,000',
      imag:"https://i.pinimg.com/1200x/e2/4a/ea/e24aea50864d60e225d6c2c8c12805a9.jpg",
    },   { 
      id: 6, 
      title: 'Nether Portal Quest', 
      date: '2026-09-28',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Maximum Threat',
      description: 'Decode cryptographic nodes, solve multi-threaded puzzles, and light up the ancient obsidian portal to win.',
      prizePool: '₹50,000',
      imag:"https://i.pinimg.com/736x/5c/ea/00/5cea00ff21a77908e9ab46c526f0481b.jpg"
    },   { 
      id: 7, 
      title: 'Nether Portal Quest', 
      date: '2026-09-28',
      xp: 500,
      blockType: 'obsidian',
      difficulty: 'Maximum Threat',
      description: 'Decode cryptographic nodes, solve multi-threaded puzzles, and light up the ancient obsidian portal to win.',
      prizePool: '₹50,000',
      imag:'https://i.pinimg.com/1200x/3d/04/0c/3d040ce7a4e0af9e2e54e2ba57c2a544.jpg'
    },
  ];

  // 2. Define your handler functions
  const handleHover = (pos: { x: number; y: number }, rect: DOMRect) => {};
  const handleLeave = () => {};
  const handleClick = (xp: number, rect: DOMRect) => {};
  const handleIntersect = (xp: number) => {};

  return (
    
    <section style={{
      width: '100%',
      background: 'linear-gradient(180deg, #0a1420 0%, #0d1f10 50%, #0a1420 100%)',
      padding: '80px 0 60px',
      borderTop: '4px solid #166534',
      borderBottom: '4px solid #166534',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
    </section>
  );
}
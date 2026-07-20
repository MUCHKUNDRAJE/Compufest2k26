'use client';

import React, { useEffect, useRef } from 'react';

/* ─── Past-events data ──────────────────────────────────────────────── */
const PAST_EVENTS = [
  { year: '2024', title: 'CodeRush',     tag: 'Hackathon', img: 'https://i.pinimg.com/736x/86/34/2a/86342adb2ab846a073e05b362092b0af.jpg' },
  { year: '2024', title: 'Box Cricket',  tag: 'Sports',    img: 'https://i.pinimg.com/736x/6e/61/a0/6e61a09f6e8c673ad1a1e0c2781922b1.jpg' },
  { year: '2024', title: 'Free Fire',    tag: 'Gaming',    img: 'https://i.pinimg.com/736x/e4/a8/1e/e4a81e06f9be9934de83e441de328ec0.jpg' },
  { year: '2023', title: 'BGMI',         tag: 'Gaming',    img: 'https://i.pinimg.com/1200x/ed/fc/6d/edfc6d5a5b63db5690f417dee6b776e9.jpg' },
  { year: '2023', title: 'Versus Code',  tag: 'Coding',    img: 'https://i.pinimg.com/1200x/e2/4a/ea/e24aea50864d60e225d6c2c8c12805a9.jpg' },
  { year: '2023', title: 'Quiz Night',   tag: 'Quiz',      img: 'https://i.pinimg.com/736x/5c/ea/00/5cea00ff21a77908e9ab46c526f0481b.jpg' },
  { year: '2022', title: 'Prompt-a-Thon',tag: 'AI',        img: 'https://i.pinimg.com/1200x/3d/04/0c/3d040ce7a4e0af9e2e54e2ba57c2a544.jpg' },
  { year: '2022', title: 'Vision Net',   tag: 'ML',        img: 'https://i.pinimg.com/1200x/ed/fc/6d/edfc6d5a5b63db5690f417dee6b776e9.jpg' },
];

/* Triplicate so both rows feel infinite in both directions */
const ROW_A = [...PAST_EVENTS, ...PAST_EVENTS, ...PAST_EVENTS];
const ROW_B = [...PAST_EVENTS].reverse().concat(
  [...PAST_EVENTS].reverse(),
  [...PAST_EVENTS].reverse()
);

/* ─── Single card ───────────────────────────────────────────────────── */
function EventCard({ ev }: { ev: (typeof PAST_EVENTS)[0] }) {
  return (
    <div
      className="relative flex-shrink-0 w-56 h-36 md:w-72 md:h-44 rounded-xl overflow-hidden group cursor-pointer select-none"
      style={{ border: '2px solid rgba(168,85,247,0.4)', boxShadow: '0 0 18px rgba(168,85,247,0.25)' }}
    >
      <img
        src={ev.img}
        alt={ev.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1">
        <span
          className="text-[9px] px-2 py-0.5 rounded-full w-fit"
          style={{ background: 'rgba(168,85,247,0.55)', color: '#f0abfc', fontFamily: 'MineCraft', letterSpacing: '0.08em' }}
        >
          {ev.tag}
        </span>
        <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: 'MineCraft', textShadow: '1px 1px 0 #000' }}>
          {ev.title}
        </p>
        <p className="text-purple-300 text-[10px]" style={{ fontFamily: 'monospace' }}>
          COMPUFEST {ev.year}
        </p>
      </div>
    </div>
  );
}

/* ─── Scroll-driven track ───────────────────────────────────────────── */
function ScrollTrack({
  items,
  direction,
  baseOffset,
}: {
  items: (typeof PAST_EVENTS)[0][];
  /** +1 → scroll-up sweeps right  |  -1 → scroll-up sweeps left */
  direction: 1 | -1;
  baseOffset: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(baseOffset);   // current translateX in px
  const velRef   = useRef(0);            // velocity accumulated from wheel
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const CARD_W    = window.innerWidth >= 768 ? 288 : 224; // md:w-72 or w-56
    const GAP       = 16;
    const CYCLE     = (CARD_W + GAP) * PAST_EVENTS.length; // width of one original set

    const onWheel = (e: WheelEvent) => {
      // deltaY > 0 = user scrolled DOWN
      velRef.current -= e.deltaY * 0.5 * direction;
    };

    const tick = () => {
      if (trackRef.current) {
        posRef.current += velRef.current * 0.08;  // ease into velocity
        velRef.current *= 0.87;                    // friction

        // Wrap within the middle copy for seamless looping
        if (posRef.current > 0)           posRef.current -= CYCLE;
        if (posRef.current < -CYCLE * 2)  posRef.current += CYCLE;

        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [direction]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ transform: `translateX(${baseOffset}px)`, paddingLeft: '16px' }}
      >
        {items.map((ev, i) => (
          <EventCard key={i} ev={ev} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────────────── */
export default function Past() {
  return (
    <section
      className="w-full py-20 overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #120820 50%, #0a0a1a 100%)',
        borderTop:    '3px solid rgba(168,85,247,0.35)',
        borderBottom: '3px solid rgba(168,85,247,0.35)',
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-20 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #4f46e5, transparent 70%)' }}
      />

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <p className="text-xs tracking-[0.3em] uppercase text-purple-400 mb-3" style={{ fontFamily: 'MineCraft' }}>
          Relive the legacy
        </p>
        <h2
          className="text-3xl md:text-5xl text-white"
          style={{ fontFamily: 'MineCraft', textShadow: '3px 3px 0 #000, 0 0 30px rgba(168,85,247,0.5)' }}
        >
          Past Events
        </h2>
        <div
          className="mx-auto mt-4 w-24 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
        />
     
      </div>

      {/* Row 1 — scroll up sweeps RIGHT (+1) */}
      <div className="mb-5">
        <ScrollTrack items={ROW_A} direction={1}  baseOffset={-240} />
      </div>

      {/* Row 2 — scroll up sweeps LEFT  (-1), starts offset for depth effect */}
      <div>
        <ScrollTrack items={ROW_B} direction={-1} baseOffset={-480} />
      </div>
    </section>
  );
}

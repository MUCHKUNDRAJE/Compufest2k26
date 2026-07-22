'use client';

import React from 'react';

/* ─── Past-events data ──────────────────────────────────────────────── */
const PAST_EVENTS = [
  { img: '/2k25 memories/2.webp' },
  { img: '/2k25 memories/3.webp' },
  { img: '/2k25 memories/4.webp' },
  { img: '/2k25 memories/6.webp' },
  { img: '/2k25 memories/7.webp' },
  { img: '/2k25 memories/9.webp' },
  { img: '/2k25 memories/10.webp' },
  { img: '/2k25 memories/11.webp' },
  { img: '/2k25 memories/12.webp' },
  { img: '/2k25 memories/13.webp' },
  { img: '/2k25 memories/14.webp' },
  { img: '/2k25 memories/15.webp' },
  { img: '/2k25 memories/16.webp' },
  { img: '/2k25 memories/17.webp' },
  { img: '/2k25 memories/18.webp' },
  { img: '/2k25 memories/19.webp' },
  { img: '/2k25 memories/20.webp' },
  { img: '/2k25 memories/21.webp' },
  { img: '/2k25 memories/22.webp' },
  { img: '/2k25 memories/23.webp' },
  { img: '/2k25 memories/24.webp' },
  { img: '/2k25 memories/25.webp' },
  { img: '/2k25 memories/26.webp' },
];

/* Marquee track needs exactly two copies back-to-back so a -50%
   translate is precisely one full loop, with no seam. */
const ROW_A = [...PAST_EVENTS, ...PAST_EVENTS];
const ROW_B = [...PAST_EVENTS].reverse().concat([...PAST_EVENTS].reverse());

/* ─── Single card ─────────────────────────────────────────────────────
   Explicit width/height so the browser doesn't reflow while images
   stream in; no hover-scale/blur so it stays light on every device.  */
function EventCard({ ev }: { ev: (typeof PAST_EVENTS)[0] }) {
  return (
    <div
      className="relative flex-shrink-0 w-56 h-36 md:w-72 md:h-44 rounded-xl overflow-hidden select-none"
      style={{ border: '2px solid rgba(168,85,247,0.4)' }}
    >
      <img
        src={ev.img}
        alt=""
        width={288}
        height={176}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    </div>
  );
}

/* ─── Pure-CSS marquee ─────────────────────────────────────────────────
   Same track works for mobile and desktop — no wheel events, no JS
   physics, just an infinite linear CSS animation. Pauses via
   IntersectionObserver when scrolled out of view so it doesn't burn
   battery in the background.                                        */
function MarqueeTrack({
  items,
  reverse,
  duration,
}: {
  items: (typeof PAST_EVENTS)[0][];
  reverse?: boolean;
  duration: number; // seconds for one full loop
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      },
      { threshold: 0 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{
          animation: `compufest-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          willChange: 'transform',
        }}
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
        borderTop: '3px solid rgba(168,85,247,0.35)',
        borderBottom: '3px solid rgba(168,85,247,0.35)',
      }}
    >
      <style>{`
        @keyframes compufest-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

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

      {/* Row 1 — scrolls left to right */}
      <div className="mb-5">
        <MarqueeTrack items={ROW_A} duration={40} />
      </div>

      {/* Row 2 — scrolls right to left */}
      <div>
        <MarqueeTrack items={ROW_B} reverse duration={44} />
      </div>
    </section>
  );
}
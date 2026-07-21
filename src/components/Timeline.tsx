"use client"
import { useEffect, useRef, useState } from 'react';
import { RefObject } from 'react';
import TimelineNode from './TimelineNode';
import Player from './Player';

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  xp: number;
  blockType: string;
  difficulty: string;
  description: string;
  prizePool: string;
  imag: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  onBlockHover: (pos: { x: number; y: number }, rect: DOMRect) => void;
  onBlockLeave: () => void;
  onBlockClick: (xp: number, rect: DOMRect) => void;
  onNodeIntersect: (xp: number) => void;
  playerPos: any;
  playerState: string;
}

export default function Timeline({
  events,
  onBlockHover,
  onBlockLeave,
  onBlockClick,
  onNodeIntersect,
  playerPos,
  playerState
}: TimelineProps) {
  const timelineWrapRef = useRef<HTMLElement | null>(null);
  const [chainFill, setChainFill] = useState(0);

  useEffect(() => {
    let scrollTicking = false;
    const updateChainFill = () => {
      if (!timelineWrapRef.current) return;
      const rect = timelineWrapRef.current.getBoundingClientRect();
      const total = rect.height;
      const viewportCenter = window.innerHeight * 0.5;
      const progressPx = Math.min(Math.max(viewportCenter - rect.top, 0), total);
      const pct = total > 0 ? (progressPx / total) * 100 : 0;
      setChainFill(pct);
      scrollTicking = false;
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateChainFill);
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateChainFill);
    updateChainFill();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateChainFill);
    };
  }, []);

  return (
    <main  className="timeline-wrap min-h-screen w-full relative z-10" id="timelineWrap" ref={timelineWrapRef} >
      <div className="chain-line" id="chainLine">
        <div className="chain-line-fill" id="chainLineFill" style={{ height: `${chainFill}%` }}></div>
      </div>

      <Player pos={playerPos} state={playerState} />

      {events.map((ev, i) => (
        <TimelineNode 
          key={ev.id} 
          event={ev} 
          index={i}
          timelineWrapRef={timelineWrapRef}
          onHover={onBlockHover}
          onLeave={onBlockLeave}
          onClick={onBlockClick}
          onIntersect={onNodeIntersect}
        />
      ))}
    </main>
  );
}

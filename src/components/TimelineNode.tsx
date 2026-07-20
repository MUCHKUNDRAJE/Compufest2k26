import { useEffect, useRef, useState, RefObject } from 'react';
import { TimelineEvent } from './Timeline';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  timelineWrapRef: RefObject<HTMLElement | null>;
  onHover: (pos: { x: number; y: number }, rect: DOMRect) => void;
  onLeave: () => void;
  onClick: (xp: number, rect: DOMRect) => void;
  onIntersect: (xp: number) => void;
}

export default function TimelineNode({
  event,
  index,
  timelineWrapRef,
  onHover,
  onLeave,
  onClick,
  onIntersect
}: TimelineNodeProps) {
  const {
    title = '',
    date = '',
    difficulty = 'Easy',
    description = '',
    prizePool = '',
    blockType = 'stone',
    xp = 0,
    imag=""
  } = event;
  const nodeRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeHover, setActiveHover] = useState(false);
  const [visited, setVisited] = useState(false);
  const [cracking, setCracking] = useState(false);
  const [mined, setMined] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!visited) {
            setVisited(true);
            onIntersect(xp);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [visited, xp, onIntersect]);

  const handleMouseEnter = () => {
    setActiveHover(true);
    if (blockRef.current && timelineWrapRef.current) {
      const wrapRect = timelineWrapRef.current.getBoundingClientRect();
      const elRect = blockRef.current.getBoundingClientRect();
      const pos = {
        x: elRect.left + elRect.width / 2 - wrapRect.left,
        y: elRect.top + elRect.height / 2 - wrapRect.top
      };
      onHover(pos, elRect);
    }
  };

  const handleMouseLeave = () => {
    setActiveHover(false);
    onLeave();
  };

  const handleTouchStart = () => {
    if (blockRef.current && timelineWrapRef.current) {
      const wrapRect = timelineWrapRef.current.getBoundingClientRect();
      const elRect = blockRef.current.getBoundingClientRect();
      const pos = {
        x: elRect.left + elRect.width / 2 - wrapRect.left,
        y: elRect.top + elRect.height / 2 - wrapRect.top
      };
      onHover(pos, elRect);
    }
  };

  const handleBlockClick = () => {
    setCracking(true);
    if (blockRef.current) {
      onClick(xp, blockRef.current.getBoundingClientRect());
    }
    setTimeout(() => {
      setCracking(false);
      setMined(true);
      setExpanded(prev => !prev);
      setTimeout(() => setMined(false), 400);
    }, 260);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (blockRef.current) {
      // You can implement particles logic for register btn here or in App via onClick
      // For simplicity, we just pass the info if we want, or do nothing special.
    }
  };

  return (
    <section
      className={`timeline-node ${index % 2 === 0 ? 'side-left' : 'side-right'} ${inView ? 'in-view' : ''} ${activeHover ? 'active-hover' : ''} ${expanded ? 'expanded' : ''}`}
      ref={nodeRef}
    >
      <div 
        className={`node-block ${cracking ? 'cracking' : ''} ${mined ? 'mined' : ''}`}
        ref={blockRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleBlockClick}
        onTouchStart={handleTouchStart}
      >
        <img
          src={event.imag}
          alt="event block"
          className={`block-img border-2 rounded-2xl ${index % 2 == 0 ?"md:mt-35":"md:mt-0"}  `}
          draggable={false}
        />
        <div className="block-glow-ring"></div>
      </div>

      <article className="event-card">
        <div className="card-pixel-border"></div>
        <div className="card-inner">
          <div className="card-row card-row-top">
            <span className="card-date">{date}</span>
            <span className={`badge badge-${difficulty.toLowerCase()}`}>{difficulty}</span>
          </div>
          <h2 className="card-title">{title}</h2>
          <p className="card-desc">{description}</p>
          <div className="card-row card-row-bottom">
            <div className="prize">
              <span className="prize-label">PRIZE POOL</span>
              <span className="prize-value">{prizePool}</span>
            </div>
            <button className="register-btn" onClick={handleRegisterClick}>
              <span>Register</span>
              <i className="coin-icon"></i>
            </button>
          </div>
        </div>
        <div className="card-shadow-glow"></div>
      </article>
    </section>
  );
}

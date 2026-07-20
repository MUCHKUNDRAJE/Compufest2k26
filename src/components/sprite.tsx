import { useRef, useEffect, useState } from "react";

interface SpriteSheetAnimatorProps {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  columns?: number;
  fps?: number;
  loop?: boolean;
  playing?: boolean;
  scale?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  paddingX?: number;
  paddingY?: number;
  frameOffsets?: { x: number; y: number }[];
}

export default function SpriteSheetAnimator({
  src,
  frameWidth,  // The base width of a frame cell (e.g., 64)
  frameHeight, // The base height of a frame cell (e.g., 64)
  frameCount,
  columns,
  fps = 12,
  loop = true,
  playing = true,
  scale = 1,
  onComplete,
  className = "",
  style = {},
  // New prop: Additional padding to apply to each frame to allow for movement
  // This makes the effective drawing area larger.
  paddingX = 20, 
  paddingY = 10,
  // New prop: Array of pixel offsets (x, y) to manually center each frame.
  // This handles the "nudge" needed to align the character's feet/center point.
  // frameOffsets[frame] = { x: -10, y: 5 }
  frameOffsets = [], 
}: SpriteSheetAnimatorProps) {
  const [frame, setFrame] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const cols = columns || frameCount;

  useEffect(() => {
    if (!playing) return;
    const frameDuration = 1000 / fps;

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const elapsed = time - lastTimeRef.current;

      if (elapsed >= frameDuration) {
        lastTimeRef.current = time;
        setFrame((prev) => {
          const next = prev + 1;
          if (next >= frameCount) {
            if (loop) return 0;
            if (onComplete) onComplete();
            return prev;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [playing, fps, frameCount, loop, onComplete]);

  const row = Math.floor(frame / cols);
  const col = frame % cols;
  
  // --- Padding and Centering Logic ---

  // The visual size of the final component will be (frameWidth + 2*padding) * scale
  const containerWidth = (frameWidth + 2 * paddingX) * scale;
  const containerHeight = (frameHeight + 2 * paddingY) * scale;
  
  // Get the specific offset for the current frame, default to {x:0, y:0}
  const offset = frameOffsets[frame] || { x: 0, y: 0 };

  // The background-position needs to account for:
  // 1. The grid position: `-(col * frameWidth)`
  // 2. The manual centering nudge: `+ offset.x`
  // 3. The internal padding: `+ paddingX`
  const bgPositionX = -( (col * frameWidth + paddingX) + offset.x ) * scale;
  const bgPositionY = -( (row * frameHeight + paddingY) + offset.y ) * scale;

  return (
    // Outer container to establish the fixed, centered viewport size
    <div
      className={className}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden', // Hides the rest of the spritesheet
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid red', // DEBUG: remove in production
        ...style,
      }}
    >
      {/* Inner div that holds the background image and performs the positioning */}
      <div
        style={{
          width: frameWidth * scale, // The size of one frame
          height: frameHeight * scale,
          backgroundImage: `url(${src})`,
          backgroundPosition: `${bgPositionX}px ${bgPositionY}px`,
          backgroundSize: `${cols * frameWidth * scale}px auto`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
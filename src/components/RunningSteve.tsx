import React from 'react';

export default function RunningSteve() {
  return (
    <div className="pointer-events-none  w-full  bg-amber-200left-50 bottom-6  scale-120 absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src="/stickers/steve-run.gif"
        alt=""
        className="running-steve-gif"
      />

      <style jsx>{`
        .running-steve-gif {
          position: absolute;
          bottom: 2px;
          left: 0;
          height: 80px;
          width: auto;
          object-fit: contain;
          image-rendering: pixelated;
          filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.35));
          animation: steveRun 15s linear infinite;
          will-change: transform;
        }

        @keyframes steveRun {
          0% {
            transform: translateX(-180px);
          }
          100% {
            transform: translateX(1000%);
          }
        }

        @media (max-width: 768px) {
          .running-steve-gif {
            height: 65px;
          }
        }

        @media (max-width: 480px) {
          .running-steve-gif {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}

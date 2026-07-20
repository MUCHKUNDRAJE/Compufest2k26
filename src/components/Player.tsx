interface PlayerProps {
  pos: { x: number; y: number };
  state: string;
}

export default function Player({ pos, state }: PlayerProps) {
  return (
    <div 
      className={`player ${state === 'running' ? 'running' : ''} ${state === 'mining' ? 'mining' : ''}`} 
      id="player"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      <div className="player-sprite">
        <div className="p-head"></div>
        <div className="p-torso"></div>
        <div className="p-arm p-arm-l"></div>
        <div className="p-arm p-arm-r"><div className="pickaxe"></div></div>
        <div className="p-leg p-leg-l"></div>
        <div className="p-leg p-leg-r"></div>
      </div>
      <div className="player-dust"></div>
    </div>
  );
}

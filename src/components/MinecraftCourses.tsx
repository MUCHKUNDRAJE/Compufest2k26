import React, { useState } from "react";

/**
 * Asymmetric bento layout for the COMPUFEST missions — CodeRush as the
 * big hero cell, Box Cricket / Expert Session as wide cells, everything
 * else as compact cells — arranged with CSS grid-template-areas.
 * Two breakpoints collapse the named-area layout down to a simple
 * auto-fit grid (tablet) and a single column (mobile).
 *
 * Each card also carries a hanging corner tag marking it as a
 * SPORTS or TECHNICAL event.
 */

const CREAM = "#eee5c8";
const CREAM_DIM = "#c9bd9c";
const PANEL = "#3a2a1c";
const PANEL_BORDER = "#5c4530";
const GREEN = "#5da627";
const GREEN_DARK = "#3f7a1a";
const pixelFont = "'Press Start 2P', monospace";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#5da627",
  Medium: "#e0942c",
  "MAXIMUM THREAT": "#c23b3b",
};

// Colors for the two event groups. Sports reuses the green accent already
// used for the CTA button; Technical gets its own violet so the two tags
// never get confused with difficulty colors (green/amber/red) at a glance.
const GROUP_STYLE: Record<string, { bg: string; border: string; icon: string }> = {
  Sports: { bg: "#5da627", border: "#3f7a1a", icon: "🏆" },
  Technical: { bg: "#7a4fa0", border: "#54366f", icon: "🖥" },
};

const MISSIONS = [
  {
    area: "cr",
    variant: "hero",
    category: "Hackathon",
    group: "Technical",
    title: "CodeRush",
    subtitle: "24-Hour Hackathon",
    description:
      "50 Teams. 24 Hours. Dive into a full-day innovation sprint where ideas turn into impactful tech solutions. Build, debug, and deliver under pressure.",
    icon: "💻",
    fee: "₹500",
    mode: "Offline",
    difficulty: "MAXIMUM THREAT",
    agents: "Team of 3-5",
    reward: "₹30,000",
  },
  {
    area: "bc",
    variant: "wide",
    category: "Competition",
    group: "Sports",
    title: "Box Cricket",
    subtitle: "Turf Battle",
    description: "Short-format cricket matches packed with excitement and energy.",
    icon: "🏏",
    fee: "₹550",
    mode: "Offline",
    difficulty: "Medium",
    agents: "6/team + 2 subs",
    reward: "₹5000",
  },
  {
    area: "aw",
    variant: "compact",
    category: "Competition",
    group: "Sports",
    title: "Free Fire",
    subtitle: "Test your Strength",
    icon: "💪",
    fee: "₹150",
    mode: "Offline",
    difficulty: "Medium",
    agents: "Individual",
    reward: "₹4000",
  },
  {
    area: "bg",
    variant: "compact",
    category: "Competition",
    group: "Technical",
    title: "BGMI: BattleZone",
    subtitle: "Ultimate Survival",
    icon: "🎮",
    fee: "₹200",
    mode: "Online",
    difficulty: "Easy",
    agents: "Team of 4",
    reward: "₹2500",
  },
  {
    area: "vs",
    variant: "compact",
    category: "Competition",
    group: "Sports",
    title: "Chess",
    subtitle: "Battle of the Coders",
    icon: "⚔️",
    fee: "₹150",
    mode: "Offline",
    difficulty: "Medium",
    agents: "Team of 2",
    reward: "₹2000",
  },
  {
    area: "vi",
    variant: "compact",
    category: "Hackathon",
    group: "Technical",
    title: "Vision Image-Net",
    subtitle: "AI & ML expertise",
    icon: "👁️",
    fee: "₹150",
    mode: "Offline",
    difficulty: "Medium",
    agents: "Team of 2",
    reward: "₹2,500",
  },
  {
    area: "pa",
    variant: "wide  ",
    category: "Hackathon",
    group: "Technical",
    title: "Prompt-a-Thon",
    subtitle: "Master the Art of Prompt",
    icon: "🪄",
    fee: "₹50",
    mode: "Offline",
    difficulty: "Easy",
    agents: "Individual",
    reward: "₹1500",
  },
  {
    area: "qz",
    variant: "compact",
    category: "Quiz",
    group: "Technical",
    title: "Tech Quiz",
    subtitle: "Learn from the Best",
    description: "Industry professionals share real-world experiences and insights.",
    icon: "🧠",
    fee: "₹150",
    mode: "Offline",
    difficulty: "Easy",
    agents: "Team of 2-3",
    reward: "₹1500",
  },
  {
    area: "vx",
    variant: "compact",
    category: "Competition",
    group: "Technical",
    title: "Versus Coding",
    subtitle: "Battle of the Coders",
    icon: "⚔️",
    fee: "₹150",
    mode: "Offline",
    difficulty: "Medium",
    agents: "Team of 2",
    reward: "₹2000",
  },
];

interface CategoryTagProps {
  children: string;
}

function CategoryTag({ children }: CategoryTagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "MineCraft",
        fontSize: "8px",
        color: CREAM_DIM,
        background: "#241a11",
        border: "2px solid rgba(238,229,200,0.2)",
        padding: "4px 7px",
        letterSpacing: "1px",
      }}
    >
      {children.toUpperCase()}
    </span>
  );
}

interface GroupFrameProps {
  group: string;
}

// Hanging corner tag — pinned to the top-left of the card, tilted
// slightly like a hand-stamped quest marker, reading SPORTS or TECHNICAL.
function GroupFrame({ group }: GroupFrameProps) {
  const style = GROUP_STYLE[group];
  if (!style) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "-13px",
        left: "14px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        background: style.bg,
        border: `3px solid ${style.border}`,
        boxShadow: "0 0 0 3px #1c1208, 2px 3px 0 0 rgba(0,0,0,0.4)",
        padding: "4px 8px",
        transform: "rotate(-2deg)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: "11px", lineHeight: 1 }}>{style.icon}</span>
      <span
        style={{
          fontFamily: pixelFont,
          fontSize: "8px",
          color: CREAM,
          textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
          letterSpacing: "0.5px",
          whiteSpace: "nowrap",
        }}
      >
        {group.toUpperCase()}
      </span>
    </div>
  );
}

interface StatProps {
  label: string;
  value?: string;
}

function Stat({ label, value }: StatProps) {
  const c = value ? DIFFICULTY_COLOR[value] : undefined;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontFamily: "monospace", fontSize: "9.5px", color: CREAM_DIM }}>{label}</span>
      <span style={{ fontFamily: pixelFont, fontSize: "9px", color: c || CREAM }}>{value}</span>
    </div>
  );
}

interface MissionButtonProps {
  small?: boolean;
}

function MissionButton({ small }: MissionButtonProps) {
  const [down, setDown] = useState(false);
  return (
    <button
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      style={{
        fontFamily: pixelFont,
        fontSize: small ? "9px" : "11px",
        color: CREAM,
        textShadow: "1.5px 1.5px 0 rgba(0,0,0,0.4)",
        background: GREEN,
        border: `3px solid ${GREEN_DARK}`,
        padding: small ? "9px 10px" : "12px 14px",
        cursor: "pointer",
        boxShadow: down
          ? "inset 2px 2px 0 0 rgba(0,0,0,0.35)"
          : "inset 2px 2px 0 0 rgba(255,255,255,0.3), inset -3px -3px 0 0 rgba(0,0,0,0.3)",
        transform: down ? "translateY(1px)" : "none",
        letterSpacing: "1px",
        width: small ? "auto" : "100%",
        whiteSpace: "nowrap",
      }}
    >
      ACCEPT MISSION
    </button>
  );
}

interface Mission {
  area: string;
  variant: string;
  category: string;
  group: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon: string;
  fee?: string;
  mode?: string;
  difficulty: string;
  agents?: string;
  reward: string;
}

interface MissionCellProps {
  m: Mission;
}

function MissionCell({ m }: MissionCellProps) {
  const base = {
    background: PANEL,
    border: `3px solid ${PANEL_BORDER}`,
    boxShadow: "0 0 0 3px #1c1208",
    padding: "18px",
    display: "flex",
    gap: "12px",
    position: "relative" as const,
    overflow: "visible" as const,
  };

  if (m.variant === "hero") {
    return (
      <div className={`cell cell-${m.area}`} style={{ ...base, flexDirection: "column", justifyContent: "space-between" }}>
        <GroupFrame group={m.group} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <CategoryTag>{m.category}</CategoryTag>
            <h3 style={{ margin: 0, fontFamily: "MineCraft", fontSize: "40px", color: CREAM, textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
              {m.title}
            </h3>
            <div style={{ fontFamily: "monospace", fontSize: "13px", color: "#f0c419", fontStyle: "italic" }}>{m.subtitle}</div>
          </div>
          <div style={{ fontSize: "42px", filter: "drop-shadow(2px 4px 0 rgba(0,0,0,0.5))" }}>{m.icon}</div>
        </div>

        <p style={{ margin: 0, fontFamily: "monospace", fontSize: "13px", lineHeight: 1.6, color: CREAM_DIM }}>{m.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", padding: "10px 0", borderTop: "1px dashed rgba(238,229,200,0.2)", borderBottom: "1px dashed rgba(238,229,200,0.2)" }}>
          <Stat label="Entry Fees" value={m.fee} />
          <Stat label="Mode" value={m.mode} />
          <Stat label="Difficulty" value={m.difficulty} />
          <Stat label="Agents" value={m.agents} />
          <Stat label="Reward" value={m.reward} />
        </div>

        <MissionButton />
      </div>
    );
  }

  if (m.variant === "wide") {
    return (
      <div className={`cell cell-${m.area}`} style={{ ...base, flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
        <GroupFrame group={m.group} />
        <div style={{ fontSize: "34px", flexShrink: 0 }}>{m.icon}</div>
        <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <CategoryTag>{m.category}</CategoryTag>
          <h3 style={{ margin: 0, fontFamily: "MineCraft", fontSize: "20px", color: CREAM, textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
            {m.title}
          </h3>
          {m.description && (
            <p style={{ margin: "4px 0 0", fontFamily: "monospace", fontSize: "11.5px", color: CREAM_DIM, lineHeight: 1.5 }}>
              {m.description}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Stat label="Difficulty" value={m.difficulty} />
          <Stat label="Reward" value={m.reward} />
        </div>
        <MissionButton small />
      </div>
    );
  }

  // compact
  return (
    <div className={`cell cell-${m.area}`} style={{ ...base, flexDirection: "column", gap: "10px" }}>
      <GroupFrame group={m.group} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <CategoryTag>{m.category}</CategoryTag>
        <div style={{ fontSize: "26px" }}>{m.icon}</div>
      </div>
      <h3 style={{ margin: 0, fontFamily: "MineCraft", fontSize: "20px", color: CREAM, textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
        {m.title}
      </h3>
      <div style={{ fontFamily: "monospace", fontSize: "10.5px", color: "#f0c419", fontStyle: "italic" }}>{m.subtitle}</div>
      <div style={{ display: "flex", gap: "14px", marginTop: "auto" }}>
        <Stat label="Difficulty" value={m.difficulty} />
        <Stat label="Reward" value={m.reward} />
      </div>
      <MissionButton small />
    </div>
  );
}

const GRID_CSS = `
  .bento {
    display: grid;
    gap: 16px;
    padding: 24px 16px 0;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, minmax(140px, auto));
    grid-template-areas:
      "cr cr cr bc bc bc"
      "cr cr cr aw bg vs"
      "vi vi pa pa qz vx"
     
  }
  .cell-cr { grid-area: cr; }
  .cell-bc { grid-area: bc; }
  .cell-aw { grid-area: aw; }
  .cell-bg { grid-area: bg; }
  .cell-vs { grid-area: vs; }
  .cell-vi { grid-area: vi; }
  .cell-ss { grid-area: ss; }
  .cell-ff { grid-area: ff; }
  .cell-pa { grid-area: pa; }
  .cell-qz { grid-area: qz; }
  .cell-ex { grid-area: ex; }

  @media (max-width: 900px) {
    .bento {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: none;
      grid-template-areas:
        "cr cr"
        "bc bc"
        "aw bg"
        "vs vi"
        "ss ff"
        "pa qz"
        "ex ex";
    }
  }

  @media (max-width: 560px) {
    .bento {
      grid-template-columns: 1fr;
      grid-template-areas:
        "cr"
        "bc"
        "aw"
        "bg"
        "vs"
        "vi"
        "ss"
        "ff"
        "pa"
        "qz"
        "ex";
    }
  }
`;

export default function MissionBento() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        ${GRID_CSS}
      `}</style>

      <div className="bento" style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {MISSIONS.map((m) => (
          <MissionCell key={m.area} m={m} />
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';

interface LampIntroProps {
  onComplete: () => void;
}

export default function LampIntro({ onComplete }: LampIntroProps) {
  const [lampOn, setLampOn] = useState(false);
  const [flickering, setFlickering] = useState(false);
  const [glowing, setGlowing] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [hoverPull, setHoverPull] = useState(false);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFadingOut(true);
    setTimeout(() => onComplete(), 700);
  };

  // Safety fallback: never allow the user to get stuck. If something hangs or
  // the animation takes longer than 3s after toggle, force-reveal portfolio.
  useEffect(() => {
    if (!lampOn) return;
    const t = setTimeout(finish, 3000);
    return () => clearTimeout(t);
  }, [lampOn]);

  const handleToggle = () => {
    if (lampOn) return;
    setLampOn(true);
    setFlickering(true);
    setTimeout(() => setFlickering(false), 600);
    setTimeout(() => setGlowing(true), 500);
    setTimeout(finish, 2200);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: '#0a0f1c' }}
    >
      {/* Ambient moonlight glow when off */}
      {!lampOn && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(100,116,139,0.06) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Soft warm pool of light beneath the lamp when on — contained, never full-screen */}
      {lampOn && (
        <div
          className="absolute"
          style={{
            top: '42%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(520px, 80vw)',
            height: 'min(520px, 60vh)',
            maxWidth: '520px',
            maxHeight: '520px',
            background: 'radial-gradient(ellipse at center, rgba(255,213,128,0.55) 0%, rgba(255,243,214,0.28) 35%, rgba(255,213,128,0.08) 60%, transparent 75%)',
            opacity: glowing ? 1 : 0,
            transition: 'opacity 1.2s ease-out',
            pointerEvents: 'none',
            zIndex: 1,
            filter: flickering ? 'brightness(0.6)' : 'brightness(1)',
          }}
        />
      )}

      {/* Flicker overlay — warm only, capped well below white */}
      {flickering && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(255,213,128,0.18) 0%, transparent 40%)',
            animation: 'flicker 0.6s ease-in-out',
          }}
        />
      )}

      {/* Text prompt above lamp */}
      <div
        className={`relative z-10 text-center mb-12 transition-all duration-700 ${lampOn ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}
      >
        <p
          className="text-lg sm:text-2xl font-light tracking-wide text-slate-300"
          style={{
            textShadow: '0 0 20px rgba(148,163,184,0.3)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          Toggle the lamp to enter my portfolio
        </p>
        <p className="text-sm text-slate-500 mt-2 font-light">Click the pull string</p>
      </div>

      {/* Desk lamp SVG */}
      <div className="relative z-10" style={{ filter: lampOn ? 'drop-shadow(0 0 40px rgba(255,213,128,0.35))' : 'none', transition: 'filter 1s ease' }}>
        <svg
          width="260"
          height="340"
          viewBox="0 0 260 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[70vw] h-auto"
        >
          {/* Lampshade */}
          <path
            d="M70 30 L190 30 L165 110 L95 110 Z"
            fill={lampOn ? '#3d3d3d' : '#2a2a3e'}
            stroke={lampOn ? '#5a5a5a' : '#3a3a4e'}
            strokeWidth="2"
            style={{ transition: 'fill 0.6s, stroke 0.6s' }}
          />
          {/* Shade inner rim highlight */}
          <path
            d="M95 110 L165 110 L160 106 L100 106 Z"
            fill={lampOn ? 'rgba(255,243,214,0.85)' : '#1e1e2e'}
            style={{ transition: 'fill 0.6s' }}
          />
          {/* Bulb glow when on */}
          {lampOn && (
            <ellipse cx="130" cy="80" rx="28" ry="20" fill="rgba(255,213,128,0.7)" style={{ animation: flickering ? 'flicker 0.15s infinite' : 'none' }} />
          )}

          {/* Arm/neck — upper segment */}
          <rect x="126" y="110" width="8" height="80" rx="4" fill={lampOn ? '#4a4a4a' : '#2e2e3e'} stroke={lampOn ? '#666' : '#3a3a4e'} strokeWidth="1.5" style={{ transition: 'fill 0.6s, stroke 0.6s' }} />
          {/* Joint */}
          <circle cx="130" cy="190" r="9" fill={lampOn ? '#555' : '#33334a'} stroke={lampOn ? '#777' : '#44445a'} strokeWidth="1.5" style={{ transition: 'fill 0.6s, stroke 0.6s' }} />
          {/* Arm — lower segment (angled) */}
          <rect x="126" y="190" width="8" height="80" rx="4" fill={lampOn ? '#4a4a4a' : '#2e2e3e'} stroke={lampOn ? '#666' : '#3a3a4e'} strokeWidth="1.5" style={{ transition: 'fill 0.6s, stroke 0.6s' }} />

          {/* Base */}
          <ellipse cx="130" cy="285" rx="55" ry="12" fill={lampOn ? '#3a3a3a' : '#252535'} stroke={lampOn ? '#5a5a5a' : '#35354a'} strokeWidth="2" style={{ transition: 'fill 0.6s, stroke 0.6s' }} />
          <rect x="120" y="270" width="20" height="16" rx="3" fill={lampOn ? '#444' : '#2e2e3e'} style={{ transition: 'fill 0.6s' }} />

          {/* Pull string */}
          <line
            x1="175"
            y1="55"
            x2="175"
            y2="150"
            stroke={hoverPull ? '#94a3b8' : '#475569'}
            strokeWidth="1.5"
            strokeDasharray="3 2"
            style={{ transition: 'stroke 0.2s' }}
          />
          {/* Pull bead */}
          <circle
            cx="175"
            cy="155"
            r={hoverPull ? 8 : 7}
            fill={hoverPull ? '#cbd5e1' : '#64748b'}
            stroke="#94a3b8"
            strokeWidth="1"
            className="cursor-pointer"
            style={{ transition: 'r 0.2s, fill 0.2s', filter: hoverPull ? 'drop-shadow(0 0 8px rgba(148,163,184,0.5))' : 'none' }}
          />
          {/* Invisible click target over pull string area */}
          <rect
            x="160"
            y="50"
            width="30"
            height="120"
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoverPull(true)}
            onMouseLeave={() => setHoverPull(false)}
            onClick={handleToggle}
          />
        </svg>
      </div>

      {/* Desk/table silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 z-5"
        style={{
          height: '120px',
          background: lampOn
            ? 'linear-gradient(to bottom, rgba(60,50,40,0.3) 0%, rgba(40,35,30,0.6) 100%)'
            : 'linear-gradient(to bottom, rgba(20,25,40,0.4) 0%, rgba(10,15,28,0.8) 100%)',
          transition: 'background 1.5s ease',
        }}
      />

      {/* Click hint pulse on bead */}
      {!lampOn && (
        <div
          className="absolute z-10"
          style={{
            top: 'calc(50% + 75px)',
            left: 'calc(50% + 45px)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(148,163,184,0.3)',
            animation: 'ripple 2s ease-out infinite',
          }}
        />
      )}

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          20% { opacity: 0.3; }
          40% { opacity: 0.9; }
          50% { opacity: 0.4; }
          60% { opacity: 0.8; }
          80% { opacity: 0.5; }
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(148,163,184,0.2); opacity: 0.8; }
          50% { text-shadow: 0 0 30px rgba(148,163,184,0.5); opacity: 1; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

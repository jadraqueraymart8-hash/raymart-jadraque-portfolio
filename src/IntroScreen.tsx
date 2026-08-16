import { useEffect, useState } from "react";

/**
 * IntroScreen — replaces the "Lamp" intro.
 * Pitch-black background, animated white topographic contour lines
 * (opacity capped at 0.5), one minimal button to enter the site.
 *
 * Usage in App.tsx:
 *   const [entered, setEntered] = useState(false);
 *   return (
 *     <>
 *       {!entered && <IntroScreen onEnter={() => setEntered(true)} />}
 *       {entered && <YourRealSiteContent />}
 *     </>
 *   );
 */

function wavePath(yBase: number, amplitude: number, phase: number, width = 1000) {
  const segments = 6;
  const points: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i;
    const y = yBase + Math.sin((i / segments) * Math.PI * 2 + phase) * amplitude;
    points.push([x, y]);
  }
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` Q ${cx},${y0} ${x1},${y1}`;
  }
  return d;
}

const LINES = Array.from({ length: 9 }).map((_, i) => {
  const yBase = 40 + i * 65;
  const amplitude = 18 + (i % 3) * 10;
  const phaseA = i * 0.6;
  const phaseB = phaseA + Math.PI;
  return {
    d0: wavePath(yBase, amplitude, phaseA),
    d1: wavePath(yBase, amplitude, phaseB),
    opacity: 0.12 + (i % 4) * 0.1, // caps around 0.5
    dur: 7 + (i % 5) * 1.6,
  };
});

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 650);
  };

  return (
    <div
      className={`fixed inset-0 z-[999] bg-black flex items-center justify-center transition-opacity duration-700 ease-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        {LINES.map((line, i) => (
          <path
            key={i}
            d={line.d0}
            fill="none"
            stroke="white"
            strokeWidth={1}
            style={{ opacity: line.opacity }}
          >
            <animate
              attributeName="d"
              values={`${line.d0};${line.d1};${line.d0}`}
              dur={`${line.dur}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
            />
          </path>
        ))}
      </svg>

      <button
        onClick={handleEnter}
        className={`relative z-10 px-10 py-4 rounded-full border border-white/30 text-white text-sm tracking-[0.25em] uppercase
          transition-all duration-700 ease-out hover:bg-white hover:text-black hover:border-white
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        Enter
      </button>
    </div>
  );
}

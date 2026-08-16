import { useState } from 'react';

export default function ContourIntro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onComplete, 700);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-700"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      {/* Contour line SVG — white waving lines at ~40% opacity */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g stroke="white" strokeWidth="1.2" fill="none" opacity="0.35">
          {Array.from({ length: 22 }).map((_, i) => {
            const y = 50 + i * 38;
            return (
              <path
                key={i}
                d={`M0,${y} C240,${y - 50} 480,${y + 60} 720,${y - 20} S1200,${y + 70} 1440,${y - 30}`}
                opacity={0.2 + (i % 4) * 0.08}
              />
            );
          })}
        </g>
        <g stroke="white" strokeWidth="0.8" fill="none" opacity="0.2">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 60 + i * 95;
            return (
              <path
                key={i}
                d={`M${x},0 C${x - 40},250 ${x + 50},500 ${x - 30},700 S${x + 40},900 ${x},900`}
                opacity={0.1 + (i % 3) * 0.06}
              />
            );
          })}
        </g>
      </svg>

      {/* Subtle radial glow behind button */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <p className="text-white/50 text-sm font-medium uppercase tracking-[0.3em] mb-6 animate-pulse">
          E-Commerce Virtual Assistant
        </p>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
          Raymart Jadraque
        </h1>
        <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
          Shopify &amp; eBay specialist — product listing, order fulfillment, customer support, and general e-commerce support.
        </p>
        <button
          onClick={handleEnter}
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-2xl shadow-white/10"
        >
          Enter Portfolio
          <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </button>
        <p className="text-white/30 text-xs mt-8 tracking-wide">$5–$15 / hour</p>
      </div>
    </div>
  );
}

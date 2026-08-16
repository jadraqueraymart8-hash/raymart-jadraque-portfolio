import { useEffect, useRef, useState } from "react";

/**
 * ScrambleText — headline "resolves" out of random characters into
 * the real text. Reads as a deliberate, high-craft typography effect.
 *
 * Usage:
 *   <ScrambleText text="Raymart Jadraque" className="text-5xl font-bold text-white" />
 */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";

export default function ScrambleText({
  text,
  className = "",
  speedMs = 30,
}: {
  text: string;
  className?: string;
  speedMs?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          runScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runScramble() {
    let iteration = 0;
    const totalIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > totalIterations) clearInterval(interval);
    }, speedMs);
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

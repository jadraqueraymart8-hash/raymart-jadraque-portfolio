import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/* ============================================================
   Import "./styles/animations.css" once in your app entry
   (e.g. main.tsx) before using these components.
   ============================================================ */

/* ---------- 1. Reveal: fade + slide up on scroll ---------- */
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ---------- 2. WordReveal: headline splits into words, cascades in ---------- */
export function WordReveal({
  text,
  className = "",
  delayStepMs = 60,
}: {
  text: string;
  className?: string;
  delayStepMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block"
            style={{
              animation: visible
                ? `word-reveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards`
                : "none",
              animationDelay: `${i * delayStepMs}ms`,
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateY(100%)",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------- 3. GradientText: animated shimmering gradient headline ---------- */
export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`gradient-text font-bold ${className}`}>{children}</span>;
}

/* ---------- 4. FloatingBlobs: ambient background motion for hero sections ---------- */
export function FloatingBlobs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="float-blob absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="float-blob-delayed absolute top-1/3 -right-10 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="float-blob absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl" />
    </div>
  );
}

/* ---------- 5. MagneticButton: lifts + glows on hover ---------- */
export function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ---------- 6. Marquee: infinite scrolling strip (e.g. tool logos) ---------- */
export function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-wrapper overflow-hidden ${className}`}>
      <div className="marquee-track gap-8">
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 7. PulseBadge: pulsing dot, e.g. "Available for Projects" ---------- */
export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pulse-ring inline-block w-2 h-2 rounded-full bg-emerald-400 ${className}`}
    />
  );
}

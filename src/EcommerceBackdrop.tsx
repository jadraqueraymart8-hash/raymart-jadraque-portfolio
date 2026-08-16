import { useEffect, useState } from "react";

/**
 * EcommerceBackdrop — a subtle, "alive" background for the body section.
 * Picks a random e-commerce-themed image on each page load, blurs it,
 * and cross-fades to a new random image every few seconds.
 *
 * SETUP:
 * 1. Add a handful of e-commerce-related images (product shots, boxes,
 *    laptop + shopping cart, warehouse, etc.) to: public/images/ecommerce/
 * 2. List their filenames in the IMAGES array below.
 * 3. Drop <EcommerceBackdrop /> as the FIRST child inside your section,
 *    with the section set to `relative` — it positions itself absolute/inset-0
 *    behind your real content (which needs `relative z-10`).
 */

const IMAGES = [
  "/images/ecommerce/shot-1.jpg",
  "/images/ecommerce/shot-2.jpg",
  "/images/ecommerce/shot-3.jpg",
  "/images/ecommerce/shot-4.jpg",
  "/images/ecommerce/shot-5.jpg",
];

function pickRandom(exclude?: string) {
  const pool = exclude ? IMAGES.filter((img) => img !== exclude) : IMAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function EcommerceBackdrop({
  intervalMs = 9000,
  blurPx = 6,
  darkenOpacity = 0.72,
}: {
  intervalMs?: number;
  blurPx?: number;
  darkenOpacity?: number;
}) {
  const [current, setCurrent] = useState(() => pickRandom());
  const [next, setNext] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const upcoming = pickRandom(current);
      setNext(upcoming);
      setFading(true);
      setTimeout(() => {
        setCurrent(upcoming);
        setFading(false);
        setNext(null);
      }, 1200);
    }, intervalMs);
    return () => clearInterval(id);
  }, [current, intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <img
        src={current}
        alt=""
        className="w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ filter: `blur(${blurPx}px)`, opacity: fading ? 0 : 1 }}
      />
      {next && (
        <img
          src={next}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
          style={{ filter: `blur(${blurPx}px)`, opacity: fading ? 1 : 0 }}
        />
      )}
      {/* dark overlay so text stays readable */}
      <div
        className="absolute inset-0 bg-[#0b1120]"
        style={{ opacity: darkenOpacity }}
      />
    </div>
  );
}

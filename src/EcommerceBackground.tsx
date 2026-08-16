import { useState, useEffect, useRef } from 'react';

const ECOMMERCE_IMAGES = [
  '/screenshots/portfolio/AG_20.png',
  '/screenshots/portfolio/AG_21.png',
  '/screenshots/portfolio/AG_22.png',
  '/screenshots/portfolio/AG_23.png',
  '/screenshots/portfolio/AG_24.png',
  '/screenshots/portfolio/LB_04.png',
  '/screenshots/portfolio/LB_05.png',
  '/screenshots/portfolio/LB_06.png',
  '/screenshots/portfolio/LB_07.png',
  '/screenshots/portfolio/LB_08.png',
  '/screenshots/portfolio/Screenshot_2026-07-07_142519.png',
  '/screenshots/portfolio/Screenshot_2026-07-07_142529.png',
  '/screenshots/portfolio/Screenshot_2026-07-07_142540.png',
  '/screenshots/portfolio/Screenshot_2026-07-07_142545.png',
  '/screenshots/portfolio/Screenshot_2026-07-07_142604.png',
  '/screenshots/crosslisting/62f70dc5-f5a8-4b7c-8b38-fa05d2ccbec7.png',
  '/screenshots/customer support resolution/757_number_chat.png',
  '/screenshots/customer support resolution/chicago_theater_chat.png',
  '/screenshots/customer support resolution/fort_worth_tx_chat.png',
  '/screenshots/email management/gmail_sold_tickets.png',
  '/screenshots/email management/inbox_screenshot.png',
];

interface FloatingImage {
  id: number;
  src: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
}

export default function EcommerceBackground() {
  const [images, setImages] = useState<FloatingImage[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const generate = () => {
      const count = 6;
      const newImages: FloatingImage[] = [];
      for (let i = 0; i < count; i++) {
        newImages.push({
          id: idRef.current++,
          src: ECOMMERCE_IMAGES[Math.floor(Math.random() * ECOMMERCE_IMAGES.length)],
          x: Math.random() * 90 + 5,
          y: Math.random() * 80 + 10,
          duration: 18 + Math.random() * 12,
          delay: Math.random() * 5,
          size: 120 + Math.random() * 180,
        });
      }
      setImages(newImages);
    };

    generate();
    const interval = setInterval(generate, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {images.map((img) => (
        <div
          key={img.id}
          className="absolute rounded-2xl overflow-hidden"
          style={{
            left: `${img.x}%`,
            top: `${img.y}%`,
            width: `${img.size}px`,
            height: `${img.size * 0.7}px`,
            opacity: 0.08,
            filter: 'blur(6px)',
            animation: `ec-float-drift ${img.duration}s ease-in-out ${img.delay}s infinite alternate`,
          }}
        >
          <img src={img.src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

type Variant = 'emerald' | 'blue' | 'dark' | 'light';

const BLOBS: Record<Variant, { className: string; anim: string }[]> = {
  emerald: [
    { className: 'bg-emerald-400/12', anim: 'animate-aurora-1' },
    { className: 'bg-teal-400/10', anim: 'animate-aurora-2' },
    { className: 'bg-emerald-500/8', anim: 'animate-aurora-3' },
  ],
  blue: [
    { className: 'bg-blue-400/12', anim: 'animate-aurora-1' },
    { className: 'bg-sky-400/10', anim: 'animate-aurora-2' },
    { className: 'bg-cyan-400/8', anim: 'animate-aurora-3' },
  ],
  dark: [
    { className: 'bg-blue-600/15', anim: 'animate-aurora-1' },
    { className: 'bg-sky-500/10', anim: 'animate-aurora-2' },
    { className: 'bg-emerald-500/8', anim: 'animate-aurora-3' },
  ],
  light: [
    { className: 'bg-slate-300/15', anim: 'animate-aurora-1' },
    { className: 'bg-blue-200/12', anim: 'animate-aurora-2' },
    { className: 'bg-emerald-200/8', anim: 'animate-aurora-3' },
  ],
};

const POSITIONS = [
  '-top-1/4 -left-1/4 w-[600px] h-[600px]',
  'top-1/3 -right-1/4 w-[500px] h-[500px]',
  '-bottom-1/4 left-1/3 w-[450px] h-[450px]',
];

export default function SectionBackground({ variant = 'blue' }: { variant?: Variant }) {
  const blobs = BLOBS[variant];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute ${POSITIONS[i]} ${blob.className} rounded-full blur-[100px] ${blob.anim}`}
        />
      ))}
    </div>
  );
}

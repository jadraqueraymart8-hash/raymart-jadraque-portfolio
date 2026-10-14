import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
          <span className="text-white font-bold text-3xl">RJ</span>
        </div>
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-300 mb-3">Page not found</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved or the link might be wrong.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </a>
      </div>
    </div>
  );
}

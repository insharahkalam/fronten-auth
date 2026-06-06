import { Link } from "react-router-dom";

export default function ErrorPage({
    code = "404",
    title = "Target Not Found",
    message = "The location you're looking for has been destroyed, moved, or never existed. Abort and return to base.",
    onRetry,
}) {
    const handleRetry = () => {
        if (onRetry) return onRetry();
        if (typeof window !== "undefined") window.location.reload();
    };

    return (
        <div className="noise relative min-h-screen bg-black text-neutral-200 font-rajdhani flex items-center justify-center overflow-hidden px-4">
            <style>{css}</style>

            {/* Grid bg */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                backgroundImage: 'linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-[1]" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
            }} />

            {/* Bottom glow */}
            <div className="fixed bottom-[-10%] right-[-10%] w-[45%] h-[50%] pointer-events-none z-0"
                style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 70%)' }} />

            {/* Content */}
            <div className="relative z-10 w-full max-w-lg text-center fade-in pb-12">

                {/* Top tag */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <span className="h-px w-10 bg-red-600 opacity-50" />
                    <p className="font-orbitron text-[10px] tracking-[0.5em] text-red-600 uppercase">
                        // System Error Detected
                    </p>
                    <span className="h-px w-10 bg-red-600 opacity-50" />
                </div>

                {/* 404 */}
                <div className="mb-1">
                    <span className="font-orbitron font-black text-white leading-none" style={{ fontSize: 'clamp(6rem, 22vw, 10rem)', letterSpacing: '-0.02em' }}>
                        {code.slice(0, 1)}
                        <span className="text-red-600 relative">
                            {code.slice(1, 2)}
                            <span className="absolute inset-0 text-red-600 blur-xl opacity-50 pointer-events-none" aria-hidden="true">
                                {code.slice(1, 2)}
                            </span>
                        </span>
                        {code.slice(2)}
                    </span>
                </div>

                {/* Decorative underline */}
                <div className="flex items-center justify-center gap-1 mb-6">
                    <span className="block h-0.5 w-10 bg-red-600" />
                    <span className="block h-0.5 w-2 bg-red-600 opacity-50" />
                    <span className="block h-0.5 w-14 bg-red-600" />
                    <span className="block h-0.5 w-2 bg-red-600 opacity-50" />
                    <span className="block h-0.5 w-6 bg-red-600" />
                </div>

                {/* Title */}
                <h1 className="font-orbitron font-bold text-white uppercase tracking-[0.15em] mb-4 text-lg sm:text-xl">
                    {title}
                </h1>

                {/* Message */}
                <p className="text-neutral-600 text-[15px] leading-relaxed tracking-wide mb-8 max-w-sm mx-auto">
                    {message}
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="block h-px w-14 bg-neutral-900" />
                    <span className="block w-1.5 h-1.5 bg-red-600 rotate-45" />
                    <span className="block h-px w-14 bg-neutral-900" />
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={handleRetry}
                        className="inline-flex items-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-orbitron text-[11px] tracking-[0.3em] uppercase transition-all hover:shadow-[0_0_24px_rgba(220,38,38,0.35)]"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        Retry Mission
                    </button>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-neutral-800 hover:border-red-600 text-neutral-500 hover:text-red-500 font-orbitron text-[11px] tracking-[0.3em] uppercase transition-all"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Return to Base
                    </Link>
                </div>
            </div>

            {/* Status bar */}
            <div className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-2.5 bg-black/80 border-t border-neutral-900">
                <span className="font-orbitron text-[9px] tracking-[0.3em] text-neutral-800 uppercase">NOIR // SYS</span>
                <span className="font-orbitron text-[9px] tracking-[0.3em] text-red-600 uppercase flex items-center gap-1.5">
                    <span className="blink">▮</span> ERROR {code}
                </span>
                <span className="font-orbitron text-[9px] tracking-[0.3em] text-neutral-800 uppercase">SIGNAL LOST</span>
            </div>
        </div>
    );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
.font-orbitron { font-family: 'Orbitron', monospace; }
.font-rajdhani { font-family: 'Rajdhani', sans-serif; }

@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
.fade-in { animation: fadeIn 0.4s ease both; }

@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.blink { animation: blink 1.2s step-start infinite; }

.noise::before {
  content:''; position:fixed; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events:none; z-index:0; opacity:0.35;
}
.noise::after {
  content:''; position:fixed; top:-20%; left:-10%; width:50%; height:60%;
  background:radial-gradient(ellipse,rgba(220,38,38,0.07) 0%,transparent 70%);
  pointer-events:none; z-index:0;
}
`
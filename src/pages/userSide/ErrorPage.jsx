import { Link } from "react-router-dom";

export default function ErrorPage({
    code = "500",
    title = "System Malfunction",
    message = "Something went wrong on our end. You can try refreshing or head back home.",
    onRetry,
}) {
    const router = typeof useRouter === "function" ? useRouter() : null;

    const handleRetry = () => {
        if (onRetry) return onRetry();
        if (router) router.invalidate();
        else if (typeof window !== "undefined") window.location.reload();
    };

    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
            style={{
                backgroundColor: "#0b0c10",
                color: "#e2e2e2",
                fontFamily: "'Rajdhani', system-ui, sans-serif",
            }}
        >
            {/* Noise grain overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
                    opacity: 0.35,
                }}
            />
            {/* Red radial glow */}
            <div
                className="pointer-events-none fixed z-0"
                style={{
                    top: "-20%",
                    left: "-10%",
                    width: "50%",
                    height: "60%",
                    background:
                        "radial-gradient(ellipse, rgba(220,38,38,0.06) 0%, transparent 70%)",
                }}
            />

            {/* Fade-in keyframes (scoped) */}
            <style>{`
        @keyframes errFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div
                className="relative z-10 w-full max-w-md text-center"
                style={{ animation: "errFadeIn 0.35s ease both" }}
            >
                {/* Icon */}
                <div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(220,38,38,0.10)", color: "#dc2626" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                </div>

                {/* Error code */}
                <div
                    className="mb-2 text-6xl font-black tracking-widest"
                    style={{
                        fontFamily: "'Orbitron', system-ui, sans-serif",
                        color: "#dc2626",
                        textShadow: "0 0 30px rgba(220,38,38,0.4)",
                    }}
                >
                    {code}
                </div>

                {/* Title */}
                <h1
                    className="mb-3 text-xl font-bold uppercase"
                    style={{
                        fontFamily: "'Orbitron', system-ui, sans-serif",
                        letterSpacing: "0.1em",
                        color: "#e2e2e2",
                    }}
                >
                    {title}
                </h1>

                {/* Message */}
                <p className="mb-6 text-base leading-relaxed" style={{ color: "#8b8b8b" }}>
                    {message}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={handleRetry}
                        className="rounded-md px-5 py-2.5 text-sm font-semibold uppercase transition-all"
                        style={{
                            fontFamily: "'Rajdhani', system-ui, sans-serif",
                            letterSpacing: "0.05em",
                            backgroundColor: "#dc2626",
                            color: "#fff",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#b91c1c";
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(220,38,38,0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#dc2626";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        Retry System
                    </button>

                    <Link
                        to="/"
                        className="rounded-md px-5 py-2.5 text-sm font-semibold uppercase transition-all"
                        style={{
                            fontFamily: "'Rajdhani', system-ui, sans-serif",
                            letterSpacing: "0.05em",
                            backgroundColor: "#12131a",
                            color: "#e2e2e2",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#12131a";
                        }}
                    >
                        Return to Base
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/service";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();

    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleMove = (e) => {
            setGlow({ x: e.clientX, y: e.clientY });
            setCursor({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/loginUser", { email, password });

            const { token, logUser } = res.data;

            // ── Sync AuthContext (updates Navbar + ProductCard instantly) ──
            login(token, {
                id: logUser._id,
                name: logUser.username,
                email: logUser.email,
                role: logUser.role,
            });

            // Keep individual keys for any legacy code that reads them directly
            localStorage.setItem("token", token);
            localStorage.setItem("role", logUser.role);
            localStorage.setItem("username", logUser.username);
            localStorage.setItem("email", logUser.email);
            localStorage.setItem("id", logUser._id);

            toast.success("Login successful!");

            setTimeout(() => {
                navigate(logUser.role === "admin" ? "/dashboard" : "/home");
            }, 1200);

        } catch (error) {
            console.error("Login error:", error.message);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Allow submitting with Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    const inputCls =
        "w-full h-11 px-4 rounded-xl bg-black/20 border border-red-900/30 text-slate-100 placeholder:text-slate-400 outline-none transition-all focus:border-red-700/60 focus:ring-2 focus:ring-red-700/20 backdrop-blur-sm font-serif";
    const labelCls =
        "block text-sm font-medium text-slate-200 mb-1 ps-1.5 font-serif";

    return (
        <div
            className="relative min-h-screen cursor-none flex items-center justify-center px-4 py-10 overflow-hidden font-serif"
            onKeyDown={handleKeyDown}
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a0f14_0%,#0b0b0f_55%,#000000_100%)]" />
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-800/40 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-red-800/40 blur-3xl" />

            {/* noise */}
            <div
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />

            {/* ── Card ── */}
            <div className="relative w-full max-w-md">
                <div className="rounded-2xl bg-white/[0.06] border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl py-6 px-8">
                    <h1 className="text-2xl font-semibold text-white text-center mb-4">
                        Welcome Back
                    </h1>

                    <div className="space-y-3">
                        <div>
                            <label className={labelCls}>Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={inputCls}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={labelCls}>Password</label>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={inputCls}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-slate-400 hover:text-slate-100"
                                >
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full h-11 mt-2 rounded-xl text-white font-bold font-serif tracking-wide transition-all hover:scale-[1.03] shadow-lg shadow-red-800/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                            }}
                        >
                            {loading ? "Logging in…" : "Login"}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/" className="text-red-300 hover:text-red-200">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* ── Glow cursor ── */}
            <div
                className="pointer-events-none fixed w-40 h-40 rounded-full"
                style={{
                    left: glow.x - 80,
                    top: glow.y - 80,
                    background: "radial-gradient(circle, rgba(88,28,28,0.6) 0%, rgba(0,0,0,0) 75%)",
                    filter: "blur(20px)",
                    zIndex: 40,
                }}
            />
            <div
                className="pointer-events-none fixed w-3 h-3 rounded-full bg-red-800/40 z-[9999]"
                style={{
                    left: cursor.x,
                    top: cursor.y,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 10px #7f1d1d",
                }}
            />
        </div>
    );
}
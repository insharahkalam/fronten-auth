import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/service";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState("login");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [glow, setGlow] = useState({ x: 0, y: 0 });
    const [cursor, setCursor] = useState({ x: 0, y: 0 });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const handleMove = (e) => {
            setGlow({ x: e.clientX, y: e.clientY });
            setCursor({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const switchMode = (m) => {
        setMode(m);
        setShow(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
    };

    const handleSubmit = async () => {
        if (mode === "login") {
            if (!email.trim() || !password.trim()) return toast.error("Please fill in all fields");
            setLoading(true);
            try {
                const res = await api.post("/auth/loginUser", { email, password });
                const { token, logUser } = res.data;
                login(token, {
                    id: logUser._id,
                    name: logUser.username,
                    email: logUser.email,
                    role: logUser.role,
                });
                toast.success("Welcome back!");
                setTimeout(() => navigate(logUser.role === "admin" ? "/dashboard" : "/"), 1200);
            } catch (err) {
                toast.error(err.response?.data?.message || "Login failed");
            } finally {
                setLoading(false);
            }
        } else {
            if (!username.trim() || !email.trim() || !password.trim() || !role.trim())
                return toast.error("Please fill in all fields");
            setLoading(true);
            try {
                const res = await api.post("/auth/users", {
                    username,
                    email,
                    password,
                    role,
                });
                console.log(res.data, "user created");
                toast.success("User created successfully!");
                setTimeout(() => switchMode("login"), 1500);
            } catch (err) {
                console.log(err.message, "error in creating users");
                const msg = err.response?.data?.message || "Something went wrong";
                toast.error(msg);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

    return (
        <>
            <Navbar />
            <div
                className="noise-auth relative min-h-screen cursor-none flex items-center justify-center px-4 py-12 overflow-hidden font-rajdhani"
                onKeyDown={handleKeyDown}
            >
                <style>{css}</style>

                {/* Grid bg */}
                <div className="fixed inset-0 pointer-events-none z-0" style={{
                    backgroundImage: "linear-gradient(rgba(220,38,38,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.025) 1px,transparent 1px)",
                    backgroundSize: "60px 60px"
                }} />

                {/* Glow orbs */}
                <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
                <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 70%)", filter: "blur(40px)" }} />

                <div className="relative z-10 w-full max-w-md">

                    {/* Brand */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="h-px w-8 bg-red-600" />
                            <p className="font-orbitron text-[10px] tracking-[0.5em] text-red-600 uppercase">// NOIR Store</p>
                            <span className="h-px w-8 bg-red-600" />
                        </div>
                        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                            {mode === "login"
                                ? <>Welcome <span className="text-red-600">Back</span></>
                                : <>Create <span className="text-red-600">Account</span></>}
                        </h1>
                        <p className="text-neutral-600 text-sm mt-2 tracking-wide">
                            {mode === "login"
                                ? "Sign in to access your orders and profile."
                                : "Join NOIR and start your mission."}
                        </p>
                    </div>

                    {/* Tab toggle */}
                    <div className="flex mb-8 border border-neutral-900 p-1 gap-1 bg-black/40">
                        {["login", "signup"].map((m) => (
                            <button
                                key={m}
                                onClick={() => switchMode(m)}
                                className={`flex-1 py-2.5 font-orbitron text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${mode === m ? "bg-red-600 text-white" : "text-neutral-600 hover:text-neutral-400"}`}
                            >
                                {m === "login" ? "Sign In" : "Sign Up"}
                            </button>
                        ))}
                    </div>

                    {/* Form card */}
                    <div className="border border-neutral-900 bg-black/60 backdrop-blur-sm p-7 relative overflow-hidden">
                        <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-red-600/40" />
                        <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-red-600/40" />

                        <div className="space-y-5 form-slide">

                            {/* Username — signup only */}
                            {mode === "signup" && (
                                <div className="fade-field">
                                    <label className="auth-label">Username</label>
                                    <input
                                        type="text"
                                        placeholder="johndoe"
                                        className="auth-input"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="auth-label">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="auth-input"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="auth-label !mb-0">Password</label>
                                    {mode === "login" && (
                                        <Link
                                            to="/forgot-password"
                                            className="font-orbitron text-[9px] tracking-[0.15em] text-neutral-700 hover:text-red-500 uppercase transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="auth-input pr-11"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(s => !s)}
                                        className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-neutral-700 hover:text-red-500 transition-colors"
                                    >
                                        {show ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Role — signup only */}
                            {mode === "signup" && (
                                <div className="fade-field">
                                    <label className="auth-label">Role</label>
                                    <input
                                        type="text"
                                        placeholder="user / admin"
                                        className="auth-input"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="group w-full relative flex items-center justify-center gap-3 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 disabled:text-neutral-700 text-white font-orbitron text-[11px] tracking-[0.35em] uppercase transition-all mt-2 overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing…
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10">{mode === "login" ? "Sign In" : "Create Account"}</span>
                                        <ArrowRight size={13} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                        <span className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Footer link */}
                        <p className="mt-6 text-center font-orbitron text-[10px] tracking-[0.15em] text-neutral-700 uppercase">
                            {mode === "login" ? "No account yet?" : "Already a member?"}{" "}
                            <button
                                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                                className="text-red-600 hover:text-red-400 transition-colors ml-1"
                            >
                                {mode === "login" ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>

                    {/* Trust row */}
                    <div className="mt-6 flex items-center justify-center gap-6">
                        {[
                            [Shield, "Secure Login"],
                            [Zap, "Instant Access"],
                        ].map(([Icon, text]) => (
                            <div key={text} className="flex items-center gap-1.5">
                                <Icon size={10} className="text-red-600" />
                                <span className="font-orbitron text-[9px] tracking-[0.2em] text-neutral-800 uppercase">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mouse glow */}
                <div className="pointer-events-none fixed w-48 h-48 rounded-full z-40" style={{
                    left: glow.x - 96,
                    top: glow.y - 96,
                    background: "radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 70%)",
                    filter: "blur(20px)",
                }} />

                {/* Custom cursor */}
                <div className="pointer-events-none fixed w-2.5 h-2.5 z-[9999]" style={{
                    left: cursor.x,
                    top: cursor.y,
                    transform: "translate(-50%,-50%)",
                    background: "#dc2626",
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                }} />
            </div>
            <Footer />
        </>
    );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
.font-orbitron { font-family: 'Orbitron', monospace; }
.font-rajdhani { font-family: 'Rajdhani', sans-serif; }

.noise-auth::before {
  content:''; position:fixed; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events:none; z-index:0; opacity:0.4;
}

.auth-label {
  display:block;
  font-family:'Orbitron',monospace;
  font-size:9px;
  letter-spacing:0.25em;
  text-transform:uppercase;
  color:rgb(82,82,82);
  margin-bottom:6px;
}
.auth-input {
  width:100%;
  background:rgba(0,0,0,0.5);
  border:1px solid rgb(28,28,28);
  color:#fff;
  padding:11px 13px;
  font-family:'Rajdhani',sans-serif;
  font-size:14px;
  letter-spacing:0.04em;
  outline:none;
  transition:border-color 0.2s, background 0.2s;
}
.auth-input::placeholder { color:rgb(50,50,50); }
.auth-input:focus { border-color:#dc2626; background:rgba(220,38,38,0.03); }
.auth-input:hover:not(:focus) { border-color:rgb(45,45,45); }

@keyframes fadeField {
  from { opacity:0; transform:translateY(-6px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-field { animation: fadeField 0.25s ease both; }

@keyframes slideForm {
  from { opacity:0; transform:translateX(6px); }
  to   { opacity:1; transform:translateX(0); }
}
.form-slide { animation: slideForm 0.3s ease both; }
`;
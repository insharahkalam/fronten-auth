import { useState, useEffect } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../config/service";

export default function Signup() {

    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [particles, setParticles] = useState([]);
    const [glow, setGlow] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setGlow({ x: e.clientX, y: e.clientY });
            setCursor({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMove);

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const inputCls = "w-full h-11 px-4 rounded-xl bg-black/20 border border-red-900/30 text-slate-100 placeholder:text-slate-400 outline-none transition-all focus:border-red-700/60 focus:ring-2 focus:ring-red-700/20 backdrop-blur-sm font-serif";
    const labelCls = "block text-sm font-medium text-slate-200 mb-1 ps-1.5 font-serif";


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const navigate = useNavigate()

    const handleSignup = async () => {
        console.log("data aarha hai", username, email, password, role);

        try {
            const res = await api.post('/auth/users', {
                username,
                email,
                password,
                role
            })

            console.log(res.data, "res aaya hai kch");
            toast.success("User created successfully!");

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.log(error.message, "error in creating users");
            const msg = error.response?.data?.message || "Something went wrong";
            toast.error(msg)
            console.log(msg);
        }
    }

    return (

        <div className="relative min-h-screen cursor-none flex items-center justify-center px-4 py-10 overflow-hidden font-serif">

            {/* Main dark gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a0f14_0%,#0b0b0f_55%,#000000_100%)]" />


            {/* Soft neon glow orbs (updated colors) */}
            < div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-800/40 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-red-800/40 blur-3xl" />        {/* Subtle grain/noise overlay */}
            <div
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />

            <div className="relative w-full max-w-md">
                <div className="rounded-2xl bg-white/[0.06] border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl py-4 px-8">
                    <div className="flex flex-col items-center text-center mb-3">

                        <h1 className="text-2xl font-semibold text-white">Create your account</h1>
                    </div>

                    <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className={labelCls}>Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Jane Doe" className={inputCls} />
                        </div>

                        <div>
                            <label className={labelCls}>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="jane@company.com" className={inputCls} />
                        </div>

                        <div>
                            <label className={labelCls}>Password</label>
                            <div className="relative">
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type={show ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={inputCls}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow((s) => !s)}
                                    className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
                                >
                                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className={labelCls}>Role</label>
                            <input
                                onChange={(e) => setRole(e.target.value)}
                                type="text"
                                placeholder="user/admin"
                                className={inputCls}
                            />
                        </div>


                        <button
                            type="button" onClick={handleSignup}
                            className="w-full h-11 mt-2 cursor-pointer rounded-xl text-white font-bold font-serif tracking-wide transition-all hover:scale-[1.03] shadow-lg shadow-red-800/30"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                            }}
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400 font-serif">
                        Already have an account?{" "}
                        <Link to={'/login'} className="text-red-300 hover:text-red-200 hover:underline">
                            Log in
                        </Link >
                    </p>
                </div>
            </div>

            <div
                className="pointer-events-none fixed w-40 h-40 rounded-full"
                style={{
                    left: glow.x - 80,
                    top: glow.y - 80,
                    background:
                        "radial-gradient(circle, rgba(88,28,28,0.6) 0%, rgba(0,0,0,0) 75%)",
                    filter: "blur(20px)",
                    position: "fixed",
                    zIndex: 40,
                }}
            />

            <div
                className="pointer-events-none fixed w-3 h-3 rounded-full bg-red-800/40 z-[9999]"
                style={{
                    left: cursor.x,
                    top: cursor.y,
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 10px #7f1d1d",
                }}
            />
        </div >



    );
}



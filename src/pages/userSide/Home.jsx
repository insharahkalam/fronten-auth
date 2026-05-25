// import React, { useEffect, useState } from 'react'
// import { User, Mail, Edit3 } from "lucide-react"
// import { useNavigate } from 'react-router-dom'
// import api from '../../config/service'
// import toast from 'react-hot-toast'

// const Home = () => {

//     const navigate = useNavigate()

//     const [user, setUser] = useState({
//         username: localStorage.getItem("username"),
//         email: localStorage.getItem("email")
//     })

//     const [openModal, setOpenModal] = useState(false)

//     const [formData, setFormData] = useState({
//         username: user.username,
//         email: user.email,
//         password: ''
//     })

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleUpdate = async (e) => {
//         e.preventDefault()

//         try {
//             const id = localStorage.getItem('id')

//             const res = await api.put(`/updateUser/${id}`, formData)

//             console.log(res.data, "check updated data");

//             localStorage.setItem("username", res.data.updated.username)
//             localStorage.setItem("email", res.data.updated.email)

//             setUser({
//                 username: res.data.updated.username,
//                 email: res.data.updated.email,
//             })

//             toast.success("Profile updated successfully!")
//             setOpenModal(false)

//         } catch (error) {
//             console.log(error)
//             const msg = error.response?.data?.message || "Update failed"
//             toast.error(msg)
//         }
//     }

//     const handleLogout = async () => {
//         try {
//             const res = await api.get('/logout')

//             console.log(res.data)

//             localStorage.clear()

//             toast.success("Logout successful")

//             // redirect to login
//             setTimeout(() => {
//                 navigate('/login');
//             }, 800);

//         } catch (error) {
//             console.log(error)

//             const msg = error.response?.data?.message || "Logout failed"
//             toast.error(msg)
//         }
//     }

//     return (
//         <>
//             <div className="relative min-h-screen overflow-hidden text-white font-serif">

//                 {/* Background */}
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a0f14_0%,#0b0b0f_55%,#000000_100%)]" />

//                 {/* Glow */}
//                 <div className="absolute -top-32 -left-32 h-96 w-96 bg-red-900/30 blur-3xl rounded-full" />
//                 <div className="absolute bottom-0 right-0 h-96 w-96 bg-red-900/20 blur-3xl rounded-full" />

//                 {/* Content */}


//                 <div className="relative z-10 px-4 sm:px-6 py-6">

//                     {/* Profile Card */}
//                     <div className="max-w-3xl mx-auto mt-6 sm:mt-10">

//                         <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-4 sm:p-6 shadow-xl">

//                             {/* Top Row */}
//                             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

//                                 {/* Left side user info */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">

//                                     <div className="w-16 h-16 mx-auto sm:mx-0 rounded-full bg-red-900/30 flex items-center justify-center shrink-0">
//                                         <User className="text-red-300" />
//                                     </div>

//                                     <div className="break-all">
//                                         <h1 className="text-xl sm:text-2xl font-bold leading-tight">
//                                             Welcome,{" "}
//                                             <span className="text-red-400">
//                                                 {user.username}
//                                             </span>
//                                         </h1>

//                                         <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 mt-2 text-sm sm:text-base break-all">
//                                             <Mail size={16} />
//                                             {user.email}
//                                         </div>
//                                     </div>

//                                 </div>

//                                 {/* Right side buttons */}
//                                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">

//                                     {/* Edit Button */}
//                                     <button
//                                         onClick={() => setOpenModal(true)}
//                                         className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg hover:scale-[1.03] transition-all shadow-lg shadow-red-900/30 w-full sm:w-auto"
//                                         style={{
//                                             background:
//                                                 "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
//                                         }}
//                                     >
//                                         <Edit3 size={16} />
//                                         Edit
//                                     </button>

//                                     {/* Logout Button */}
//                                     <button
//                                         onClick={handleLogout}
//                                         className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg hover:scale-[1.03] transition-all shadow-lg shadow-red-900/30 w-full sm:w-auto"
//                                         style={{
//                                             background:
//                                                 "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
//                                         }}
//                                     >
//                                         Logout
//                                     </button>

//                                 </div>
//                             </div>

//                             {/* Dummy Text Section */}
//                             <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/10">

//                                 <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
//                                     All your personal information and account details are securely managed here.
//                                     You can update your profile, change password, and manage settings anytime.
//                                 </p>

//                             </div>

//                         </div>
//                     </div>
//                 </div>


//                 {/* Modal */}
//                 {openModal && (
//                     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

//                         <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl relative">

//                             <button
//                                 onClick={() => setOpenModal(false)}
//                                 className="absolute top-3 right-3 text-slate-400 hover:text-white"
//                             >
//                                 ✖
//                             </button>

//                             <h2 className="text-xl font-bold text-center mb-4">
//                                 Update Profile
//                             </h2>

//                             <form onSubmit={handleUpdate} className="space-y-3">

//                                 <input
//                                     type="text"
//                                     name="username"
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     placeholder="Username"
//                                     className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
//                                 />

//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="Email"
//                                     className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
//                                 />

//                                 <input
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="New Password"
//                                     className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
//                                 />

//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 w-full rounded-xl font-semibold transition-all hover:scale-[1.03] shadow-lg shadow-red-900/30 text-white"
//                                     style={{
//                                         background:
//                                             "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
//                                     }}
//                                 >
//                                     Save Changes
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     )
// }

// export default Home


import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones,
    Sparkles, LayoutGrid, TrendingUp, ChevronRight, Package,
    BadgeCheck, Globe, Clock, Star, Quote
} from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../../components/ProductCard'
import { GridSkeleton } from '../../components/Skeleton'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CATEGORIES = [
    { name: 'Electronics', icon: '💻', count: '4.2K' },
    { name: 'Mobile & Accessories', icon: '📱', count: '3.8K' },
    { name: 'Fashion (Men)', icon: '👔', count: '5.1K' },
    { name: 'Fashion (Women)', icon: '👗', count: '6.4K' },
    { name: 'Footwear', icon: '👟', count: '2.9K' },
    { name: 'Home & Living', icon: '🏠', count: '3.3K' },
    { name: 'Beauty & Personal Care', icon: '💄', count: '2.1K' },
    { name: 'Health & Wellness', icon: '🌿', count: '1.7K' },
    { name: 'Sports & Fitness', icon: '🏋️', count: '2.4K' },
    { name: 'Books & Stationery', icon: '📚', count: '4.8K' },
    { name: 'Kids & Toys', icon: '🧸', count: '1.9K' },
    { name: 'Grocery', icon: '🛒', count: '3.0K' },
    { name: 'Automotive', icon: '🚗', count: '1.2K' },
    { name: 'Furniture', icon: '🪑', count: '0.9K' },
    { name: 'Kitchen & Dining', icon: '🍳', count: '2.6K' },
    { name: 'Other', icon: '✦', count: '3.7K' },
]

const FEATURES = [
    { icon: Truck, title: 'Free Delivery', desc: 'On all orders above Rs. 2,000', meta: '01' },
    { icon: ShieldCheck, title: 'Secure Checkout', desc: 'End-to-end encrypted payments', meta: '02' },
    { icon: RefreshCw, title: 'Easy Returns', desc: 'Hassle-free 30-day policy', meta: '03' },
    { icon: Headphones, title: '24 / 7 Support', desc: 'Expert help, around the clock', meta: '04' },
]

const STATS = [
    { value: '50K+', label: 'Products', icon: Package },
    { value: '2M+', label: 'Customers', icon: Globe },
    { value: '99%', label: 'Satisfaction', icon: BadgeCheck },
    { value: '16', label: 'Categories', icon: LayoutGrid },
]

const TESTIMONIALS = [
    { quote: 'Quality is uncompromising. The fastest delivery I have ever experienced in Pakistan.', name: 'Areeba K.', role: 'Verified Buyer' },
    { quote: 'Curated, premium and genuinely affordable. This is my default store now.', name: 'Hassan R.', role: 'Verified Buyer' },
    { quote: 'Returns were effortless and support replied within minutes. Trust earned.', name: 'Sara M.', role: 'Verified Buyer' },
]

/* ─────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────── */
const SectionEyebrow = ({ icon: Icon, text, code }) => (
    <div className="inline-flex items-center gap-3 mb-5">
        <div className="w-6 h-px bg-red-600/60" />
        <Icon size={11} className="text-red-500" />
        <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.28em] uppercase text-red-500/80">
            {text}
        </span>
        {code && (
            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.22em] text-white/20">
                / {code}
            </span>
        )}
    </div>
)

const SectionHeading = ({ children }) => (
    <h2
        className="font-['Orbitron',monospace] font-black text-white leading-[0.95] tracking-tight"
        style={{ fontSize: 'clamp(28px, 4.4vw, 44px)' }}
    >
        {children}
    </h2>
)

const PrimaryBtn = ({ to, children }) => (
    <Link
        to={to}
        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-[10px] no-underline
      font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase
      bg-gradient-to-br from-red-600 to-red-700 text-white
      shadow-[0_8px_32px_rgba(220,38,38,0.35)]
      hover:from-red-500 hover:to-red-600
      hover:shadow-[0_10px_40px_rgba(220,38,38,0.55)]
      hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
        {children}
        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
    </Link>
)

const GhostBtn = ({ to, children }) => (
    <Link
        to={to}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] no-underline
      font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.18em] uppercase
      bg-transparent border border-white/[0.10] text-white/55
      hover:border-red-600/40 hover:text-white hover:bg-red-600/[0.04]
      transition-all duration-200"
    >
        {children}
    </Link>
)

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
    const { products, loading } = useProducts()
    const navigate = useNavigate()
    const featured = products.slice(0, 8)

    return (
        <div>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.35s ease both; }
        .noise::before {
          content:'';position:fixed;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events:none;z-index:0;opacity:0.35;
        }
        .noise::after {
          content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;
          background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);
          pointer-events:none;z-index:0;
        }
      `}</style>
            <Navbar />

            {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
            <section className="relative overflow-hidden min-h-[94vh] flex items-center">
                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
                            'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                        backgroundSize: '64px 64px',
                    }} />

                {/* Glows */}
                <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 65%)' }} />
                <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />

                {/* Vertical accent rails */}
                <div className="absolute top-0 left-0 w-px h-full hidden lg:block"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.25), transparent)' }} />
                <div className="absolute top-0 right-0 w-px h-full hidden lg:block"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)' }} />

                {/* Floating side-rail label */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-10">
                    <div className="w-px h-12 bg-white/10" />
                    <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.4em] text-white/30 uppercase [writing-mode:vertical-rl]">
                        EST · 2025 · KARACHI
                    </span>
                    <div className="w-px h-12 bg-white/10" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-33 w-full">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* LEFT — content */}
                        <div className="lg:col-span-8 max-w-[720px]">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2.5 mb-10 pl-2 pr-4 py-2 rounded-full
                bg-red-600/[0.08] border border-red-600/25 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 animate-ping" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                </span>
                                <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.26em] uppercase text-red-400">
                                    New Drop · Collection 2026
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-['Orbitron',monospace] font-black leading-[0.88] tracking-tight mb-8"
                                style={{ fontSize: 'clamp(46px, 8.4vw, 94px)' }}>
                                DEFINE<br />
                                <span className="text-red-500 relative"
                                    style={{ textShadow: '0 0 60px rgba(220,38,38,0.45)' }}>
                                    YOUR
                                </span>{' '}
                                STYLE.
                            </h1>

                            {/* Description with rail */}
                            <div className="flex items-start gap-5 mb-10 max-w-xl">
                                <div className="h-[2px] w-12 mt-3 bg-red-600 shrink-0" />
                                <p className="text-[15px] sm:text-[17px] tracking-wide leading-relaxed text-white/55">
                                    50,000+ premium products across 16 curated categories.
                                    Quality you can trust. Prices that make sense.
                                    Delivered nationwide in 24 hours.
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 mb-16">
                                <PrimaryBtn to="/shop">Explore Collection</PrimaryBtn>
                                <GhostBtn to="/about">Our Story</GhostBtn>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px
                border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.015]">
                                {STATS.map(({ value, label, icon: Icon }) => (
                                    <div key={label}
                                        className="relative flex flex-col items-start justify-center gap-2 py-6 px-5
                      bg-[#05080a] hover:bg-red-600/[0.06] transition-colors duration-200 group">
                                        <div className="flex items-center gap-2">
                                            <Icon size={12} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
                                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.18em] uppercase text-white/30">
                                                {label}
                                            </span>
                                        </div>
                                        <div className="font-['Orbitron',monospace] text-[26px] sm:text-[30px] font-black text-white leading-none">
                                            {value}
                                        </div>
                                        <div className="absolute top-3 right-3 font-['Orbitron',monospace] text-[8px] tracking-widest text-white/15">
                                            0{STATS.indexOf(STATS.find(s => s.label === label)) + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — decorative diagnostic panel */}
                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm p-6 overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full"
                                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)' }} />

                                <div className="relative">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.28em] uppercase text-white/40">
                                            LIVE · INDEX
                                        </span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            ['Daily Orders', '12,480', '+8.4%'],
                                            ['Active Users', '94,210', '+2.1%'],
                                            ['Avg. Rating', '4.92', '5.0'],
                                            ['Cities Served', '108', 'PK'],
                                        ].map(([k, v, badge]) => (
                                            <div key={k} className="flex items-center justify-between border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
                                                <span className="text-[12px] tracking-wide text-white/40">{k}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-['Orbitron',monospace] text-[14px] font-bold text-white">{v}</span>
                                                    <span className="font-['Orbitron',monospace] text-[8px] tracking-widest text-red-400/80">{badge}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center gap-2">
                                        <Star size={11} className="text-red-500 fill-red-500" />
                                        <span className="text-[11px] text-white/40 tracking-wide">
                                            Rated <span className="text-white font-semibold">4.92/5</span> by 240K reviewers
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          FEATURES BAR
      ════════════════════════════════════════ */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,4,4,0.65)',
            }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/[0.05]
            lg:divide-x lg:divide-white/[0.05]">
                        {FEATURES.map(({ icon: Icon, title, desc, meta }) => (
                            <div key={title}
                                className="relative flex items-start gap-5 px-6 py-7
                  group hover:bg-red-600/[0.04] transition-colors duration-200">
                                <span className="absolute top-3 right-4 font-['Orbitron',monospace] text-[9px] tracking-widest text-white/15">
                                    / {meta}
                                </span>
                                <div className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center
                  bg-red-600/10 border border-red-600/25 text-red-500
                  group-hover:bg-red-600/20 group-hover:border-red-600/45
                  group-hover:shadow-[0_0_22px_rgba(220,38,38,0.25)]
                  transition-all duration-300">
                                    <Icon size={17} strokeWidth={1.6} />
                                </div>
                                <div>
                                    <div className="font-['Orbitron',monospace] text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-1.5">
                                        {title}
                                    </div>
                                    <div className="text-[13px] tracking-wide text-white/45 leading-snug">
                                        {desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
                    <div>
                        <SectionEyebrow icon={LayoutGrid} text="Browse by Category" code="01" />
                        <SectionHeading>Shop by Category.</SectionHeading>
                        <p className="text-[14px] text-white/45 mt-4 tracking-wide max-w-md">
                            From everyday essentials to premium picks — find exactly what
                            you're looking for across our 16 curated departments.
                        </p>
                    </div>
                    <Link to="/shop"
                        className="group inline-flex items-center gap-1.5 no-underline shrink-0
              font-['Orbitron',monospace] text-[10px] tracking-[0.22em] uppercase
              text-white/40 hover:text-red-400 transition-colors duration-200 self-start sm:self-auto">
                        Browse All <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
                    {CATEGORIES.map((cat) => (
                        <button key={cat.name}
                            onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                            className="group relative bg-white/[0.025] border border-white/[0.07] rounded-2xl
                p-4 sm:p-5 flex flex-col items-center gap-2.5 text-center
                hover:bg-red-600/[0.07] hover:border-red-600/35
                hover:shadow-[0_4px_28px_rgba(220,38,38,0.12)]
                active:scale-[0.97] transition-all duration-200 hover:-translate-y-1">
                            <span className="text-3xl sm:text-[34px] leading-none
                transition-transform duration-300 group-hover:scale-110">
                                {cat.icon}
                            </span>
                            <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide
                leading-tight text-white/55 group-hover:text-white transition-colors duration-200">
                                {cat.name}
                            </span>
                            <span className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.18em] uppercase text-white/25 group-hover:text-red-400/80 transition-colors">
                                {cat.count} items
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
                    <div>
                        <SectionEyebrow icon={TrendingUp} text="Handpicked for You" code="02" />
                        <SectionHeading>Featured Products.</SectionHeading>
                        <p className="text-[14px] text-white/45 mt-4 tracking-wide max-w-md">
                            Our editors' top picks — curated weekly for quality, style and value.
                        </p>
                    </div>
                    <Link to="/shop"
                        className="group inline-flex items-center gap-1.5 no-underline shrink-0
              font-['Orbitron',monospace] text-[10px] tracking-[0.22em] uppercase
              text-white/40 hover:text-red-400 transition-colors duration-200 self-start sm:self-auto">
                        View All <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <GridSkeleton count={8} />
                ) : featured.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 gap-4
            border border-dashed border-white/[0.08] rounded-3xl bg-white/[0.01]">
                        <Package size={36} className="text-white/15" />
                        <p className="font-['Orbitron',monospace] text-[10px] tracking-[0.28em] text-white/30 uppercase">
                            No products available yet
                        </p>
                        <div className="mt-2">
                            <PrimaryBtn to="/shop">Go to Shop</PrimaryBtn>
                        </div>
                    </div>
                )}

                {featured.length > 0 && (
                    <div className="text-center mt-14 sm:mt-16">
                        <GhostBtn to="/shop">View Full Catalog</GhostBtn>
                    </div>
                )}
            </section>

            {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
            <section className="relative border-t border-white/[0.05]
        bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.05),transparent_70%)]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionEyebrow icon={Quote} text="What People Say" code="03" />
                        <SectionHeading>Trusted by Millions.</SectionHeading>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {TESTIMONIALS.map((t, i) => (
                            <figure key={i}
                                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02]
                  p-7 hover:border-red-600/30 hover:bg-red-600/[0.03] transition-all duration-200">
                                <span className="absolute top-5 right-5 font-['Orbitron',monospace] text-[9px] tracking-widest text-white/15">
                                    / 0{i + 1}
                                </span>
                                <div className="flex items-center gap-1 mb-5">
                                    {Array.from({ length: 5 }).map((_, k) => (
                                        <Star key={k} size={12} className="text-red-500 fill-red-500" />
                                    ))}
                                </div>
                                <blockquote className="text-[14.5px] leading-relaxed text-white/75 tracking-wide mb-6">
                                    "{t.quote}"
                                </blockquote>
                                <figcaption className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-red-800
                    flex items-center justify-center font-['Orbitron',monospace] text-[11px] font-bold text-white">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-['Orbitron',monospace] text-[11px] font-bold tracking-wider text-white">
                                            {t.name}
                                        </div>
                                        <div className="text-[10.5px] tracking-[0.18em] uppercase text-white/35 mt-0.5">
                                            {t.role}
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 sm:py-32"
                style={{
                    background: 'rgba(10,3,3,0.85)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                {/* Glows */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 55% 80% at 50% 50%, rgba(220,38,38,0.10) 0%, transparent 70%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-red-600/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

                {/* Faint grid */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
                            'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />

                <div className="relative max-w-2xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
            bg-red-600/[0.08] border border-red-600/25">
                        <Sparkles size={10} className="text-red-500" />
                        <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.28em] uppercase text-red-400">
                            Join 2 Million+ Shoppers
                        </span>
                    </div>

                    <h2 className="font-['Orbitron',monospace] font-black tracking-tight text-white mb-6 leading-[1.02]"
                        style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}>
                        READY TO REDEFINE<br />
                        <span className="text-red-500" style={{ textShadow: '0 0 40px rgba(220,38,38,0.4)' }}>
                            YOUR LIFESTYLE?
                        </span>
                    </h2>

                    <p className="text-[15px] tracking-wide leading-relaxed mb-10
            text-white/50 max-w-md mx-auto">
                        Premium quality, unbeatable prices and rapid delivery —
                        everything you need, all in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <PrimaryBtn to="/shop">Start Shopping</PrimaryBtn>
                        <GhostBtn to="/about">Learn More</GhostBtn>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/35">
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-red-500/70" />
                            <span className="text-[11px] tracking-[0.14em] uppercase font-['Orbitron',monospace]">24h Processing</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <div className="flex items-center gap-2">
                            <RefreshCw size={12} className="text-red-500/70" />
                            <span className="text-[11px] tracking-[0.14em] uppercase font-['Orbitron',monospace]">Free Returns</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={12} className="text-red-500/70" />
                            <span className="text-[11px] tracking-[0.14em] uppercase font-['Orbitron',monospace]">Secure Payments</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

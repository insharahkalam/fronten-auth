import {
    Shield, Users, Award, Globe, ArrowRight,
    Sparkles, Building2, TrendingUp, Leaf
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const VALUES = [
    {
        icon: Shield,
        title: 'Authenticity',
        desc: 'Every product is personally reviewed and verified by our team before it reaches the catalog.',
    },
    {
        icon: Users,
        title: 'Community',
        desc: 'Built by shoppers, for shoppers. Your feedback directly shapes what we carry.',
    },
    {
        icon: Award,
        title: 'Excellence',
        desc: 'From product curation to delivery — we hold ourselves to an uncompromising standard.',
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        desc: 'Carbon-neutral shipping and 100% recyclable packaging on every order.',
    },
]

const TEAM = [
    { initials: 'AK', name: 'Ayesha Khan', role: 'CEO & Founder' },
    { initials: 'ZR', name: 'Zaid Raza', role: 'Head of Product' },
    { initials: 'SM', name: 'Sara Malik', role: 'Creative Director' },
    { initials: 'HR', name: 'Hamza Rizvi', role: 'Tech Lead' },
    { initials: 'NA', name: 'Nadia Ahmed', role: 'Customer Experience' },
    { initials: 'OB', name: 'Omar Baig', role: 'Logistics Head' },
]

const STATS = [
    { value: '2018', label: 'Founded' },
    { value: '50K+', label: 'Products' },
    { value: '2M+', label: 'Customers' },
    { value: '16', label: 'Categories' },
]

const SectionEyebrow = ({ icon: Icon, text }) => (
    <div className="inline-flex items-center gap-2 mb-4">
        <div className="w-5 h-px bg-red-600/50" />
        <Icon size={9} className="text-red-500" />
        <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.22em] uppercase text-red-500/70">
            {text}
        </span>
        <div className="w-5 h-px bg-red-600/50" />
    </div>
)

export default function About() {
    return (
        <div className="noise min-h-screen bg-[#05080a] font-['Rajdhani',sans-serif] text-white antialiased">
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
            <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
                {/* Glows */}
                <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 65%)' }} />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />

                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
                            'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />

                <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
                    <SectionEyebrow icon={Building2} text="Our Story" />

                    <h1 className="font-['Orbitron',monospace] font-black leading-[0.9] tracking-tight mb-8"
                        style={{ fontSize: 'clamp(48px, 9vw, 88px)' }}>
                        ABOUT{' '}
                        <span className="text-red-500" style={{ textShadow: '0 0 50px rgba(220,38,38,0.4)' }}>
                            NOIR
                        </span>
                    </h1>

                    <div className="flex items-center gap-4 justify-center mb-6">
                        <div className="h-px flex-1 max-w-[60px] bg-red-600/30" />
                        <p className="text-[15px] sm:text-[17px] tracking-wide leading-relaxed text-white/35 max-w-xl">
                            Founded in 2018 on a simple belief — premium products shouldn't come with
                            premium confusion. We cut out the noise, the middlemen, and the guesswork,
                            leaving only what matters.
                        </p>
                        <div className="h-px flex-1 max-w-[60px] bg-red-600/30" />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(10,4,4,0.65)',
            }}>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-white/[0.04]
            sm:divide-x sm:divide-white/[0.04]">
                        {STATS.map(({ value, label }) => (
                            <div key={label} className="flex flex-col items-center justify-center py-8 sm:py-10 px-6
                group hover:bg-red-600/[0.04] transition-colors duration-200">
                                <div className="font-['Orbitron',monospace] text-[32px] sm:text-[40px] font-black text-red-500 leading-none mb-2"
                                    style={{ textShadow: '0 0 20px rgba(220,38,38,0.4)' }}>
                                    {value}
                                </div>
                                <div className="font-['Orbitron',monospace] text-[9px] tracking-[0.18em] uppercase text-white/25">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════
          MISSION
      ════════════════════════════════════════ */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left — copy */}
                    <div>
                        <SectionEyebrow icon={TrendingUp} text="Why We Exist" />
                        <h2 className="font-['Orbitron',monospace] font-black text-[26px] sm:text-[36px]
              text-white leading-[1.05] tracking-tight mb-6">
                            QUALITY WITHOUT<br />COMPROMISE
                        </h2>
                        <p className="text-[14px] sm:text-[15px] tracking-wide leading-relaxed text-white/35 mb-5">
                            Every purchase you make should feel like a confident decision, not a gamble.
                            Our team of curators personally reviews every product before it joins the catalog.
                            If we wouldn't buy it ourselves, it doesn't make the cut.
                        </p>
                        <p className="text-[14px] sm:text-[15px] tracking-wide leading-relaxed text-white/35 mb-10">
                            Today NOIR serves millions of customers across Pakistan with 50,000+ products
                            spanning 16 categories — from consumer electronics to artisan home goods.
                        </p>
                        <Link to="/shop"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[10px] no-underline
                font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.16em] uppercase
                bg-gradient-to-br from-red-600 to-red-700 text-white
                shadow-[0_6px_28px_rgba(220,38,38,0.35)]
                hover:from-red-500 hover:to-red-600
                hover:shadow-[0_8px_36px_rgba(220,38,38,0.5)]
                hover:-translate-y-0.5 transition-all duration-200">
                            Shop the Catalog <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* Right — value cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {VALUES.map(({ icon: Icon, title, desc }) => (
                            <div key={title}
                                className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                  rounded-2xl p-6 group
                  hover:bg-red-600/[0.05] hover:border-red-600/25
                  hover:shadow-[0_4px_24px_rgba(220,38,38,0.08)]
                  hover:-translate-y-0.5 transition-all duration-300">
                                {/* Top shimmer */}
                                <div className="absolute top-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

                                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20
                  flex items-center justify-center mb-4 text-red-500
                  group-hover:bg-red-600/15 group-hover:border-red-600/35
                  group-hover:shadow-[0_0_16px_rgba(220,38,38,0.18)]
                  transition-all duration-300">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-['Orbitron',monospace] text-[11px] font-bold tracking-[0.1em]
                  uppercase text-white mb-2.5">
                                    {title}
                                </h3>
                                <p className="text-[13px] tracking-wide leading-relaxed text-white/30">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          TEAM
      ════════════════════════════════════════ */}
            <section style={{
                background: 'rgba(10,4,4,0.6)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">

                    {/* Header */}
                    <div className="text-center mb-14 sm:mb-16">
                        <SectionEyebrow icon={Users} text="The People" />
                        <h2 className="font-['Orbitron',monospace] font-black text-[26px] sm:text-[36px]
              text-white leading-none tracking-tight">
                            MEET THE TEAM
                        </h2>
                        <p className="text-[13px] sm:text-[14px] tracking-wide text-white/30 mt-4 max-w-md mx-auto leading-relaxed">
                            The minds behind NOIR — a small team with an outsized obsession for quality.
                        </p>
                    </div>

                    {/* Team grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TEAM.map(({ initials, name, role }) => (
                            <div key={name}
                                className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                  rounded-2xl p-5 text-center group
                  hover:bg-red-600/[0.05] hover:border-red-600/25
                  hover:shadow-[0_4px_24px_rgba(220,38,38,0.08)]
                  hover:-translate-y-1 transition-all duration-300">
                                {/* Top shimmer */}
                                <div className="absolute top-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center
                  bg-red-600/10 border-2 border-red-600/20 text-red-400
                  font-['Orbitron',monospace] text-[15px] font-black
                  group-hover:border-red-600/40 group-hover:bg-red-600/15
                  group-hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]
                  transition-all duration-300">
                                    {initials}
                                </div>

                                <div className="font-['Rajdhani',sans-serif] text-[13.5px] font-semibold
                  tracking-wide text-white leading-tight mb-1">
                                    {name}
                                </div>
                                <div className="font-['Rajdhani',sans-serif] text-[11.5px] tracking-wide
                  text-white/25 leading-snug">
                                    {role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 sm:py-28">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

                <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                    <SectionEyebrow icon={Sparkles} text="Join the Community" />

                    <h2 className="font-['Orbitron',monospace] font-black text-[24px] sm:text-[34px]
            text-white leading-[1.05] tracking-tight mb-5">
                        EXPERIENCE NOIR<br />FOR YOURSELF
                    </h2>

                    <p className="text-[14px] sm:text-[15px] tracking-wide leading-relaxed text-white/30 mb-10 max-w-sm mx-auto">
                        Join 2 million+ shoppers who choose NOIR for premium quality, honest pricing,
                        and a shopping experience that just works.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/shop"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] no-underline
                font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.18em] uppercase
                bg-gradient-to-br from-red-600 to-red-700 text-white
                shadow-[0_6px_28px_rgba(220,38,38,0.35)]
                hover:from-red-500 hover:to-red-600
                hover:shadow-[0_8px_36px_rgba(220,38,38,0.5)]
                hover:-translate-y-0.5 transition-all duration-200">
                            Start Shopping <ArrowRight size={13} />
                        </Link>
                        <Link to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] no-underline
                font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.16em] uppercase
                border border-white/[0.09] text-white/35
                hover:border-white/[0.18] hover:text-white/60
                transition-all duration-200">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
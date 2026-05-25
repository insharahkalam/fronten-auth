import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, HelpCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const INFO = [
    { icon: Mail, label: 'Email', value: 'hello@noir.store', desc: 'For general inquiries' },
    { icon: Phone, label: 'Phone', value: '+92 21 3456 7890', desc: 'Call us during business hours' },
    { icon: MapPin, label: 'Address', value: '14 Commerce Square, Karachi', desc: 'Visit our flagship office' },
    { icon: Clock, label: 'Hours', value: 'Mon – Sat, 9am – 8pm PKT', desc: 'We reply within 24 hours' },
]

const FAQS = [
    'How do I track my order?',
    'What is your return policy?',
    'Do you offer nationwide delivery?',
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

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [sent, setSent] = useState(false)

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill all required fields', {
                style: { background: '#0f1418', color: '#e2eef1', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px' },
            })
            return
        }
        setSent(true)
        toast.success("Message sent! We'll reply within 24 hours.", {
            style: { background: '#0f1418', color: '#e2eef1', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px' },
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
        })
    }

    const inputCls = `w-full bg-white/[0.04] border border-white/[0.08] rounded-xl
    px-4 py-3 text-[14px] text-white placeholder:text-white/20 tracking-wide
    font-['Rajdhani',sans-serif] outline-none
    focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10
    transition-all duration-200`

    const labelCls = `block font-['Orbitron',monospace] text-[9px] font-bold
    tracking-[0.18em] uppercase text-white/30 mb-2`

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
            <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-28">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 65%)' }} />
                <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),' +
                            'linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                    <SectionEyebrow icon={MessageSquare} text="Support" />

                    <h1 className="font-['Orbitron',monospace] font-black leading-[0.9] tracking-tight mb-7"
                        style={{ fontSize: 'clamp(44px, 8vw, 80px)' }}>
                        GET IN{' '}
                        <span className="text-red-500" style={{ textShadow: '0 0 50px rgba(220,38,38,0.4)' }}>
                            TOUCH
                        </span>
                    </h1>

                    <div className="flex items-center gap-4 justify-center">
                        <div className="h-px flex-1 max-w-[50px] bg-red-600/30" />
                        <p className="text-[15px] sm:text-[16px] tracking-wide leading-relaxed text-white/35">
                            Have a question about your order or a product?
                            Our team responds within 24 hours.
                        </p>
                        <div className="h-px flex-1 max-w-[50px] bg-red-600/30" />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24 sm:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* ── Left: Info + FAQ ── */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Section label */}
                        <div>
                            <SectionEyebrow icon={Phone} text="Contact Info" />
                            <h2 className="font-['Orbitron',monospace] font-black text-[20px] sm:text-[24px]
                text-white leading-none tracking-tight mb-3">
                                REACH US DIRECTLY
                            </h2>
                            <p className="text-[13px] sm:text-[14px] tracking-wide leading-relaxed text-white/30">
                                Our support team is on hand to help with orders, returns, and product questions.
                            </p>
                        </div>

                        {/* Info cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            {INFO.map(({ icon: Icon, label, value, desc }) => (
                                <div key={label}
                                    className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                    rounded-2xl p-4 flex items-center gap-4 group
                    hover:bg-red-600/[0.05] hover:border-red-600/25
                    hover:shadow-[0_4px_20px_rgba(220,38,38,0.08)]
                    transition-all duration-300">
                                    <div className="absolute top-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

                                    <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center
                    bg-red-600/10 border border-red-600/20 text-red-500
                    group-hover:bg-red-600/15 group-hover:border-red-600/35
                    group-hover:shadow-[0_0_14px_rgba(220,38,38,0.18)]
                    transition-all duration-300">
                                        <Icon size={16} strokeWidth={1.5} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="font-['Orbitron',monospace] text-[9px] tracking-[0.16em]
                      uppercase text-white/25 mb-1">
                                            {label}
                                        </div>
                                        <div className="text-[13.5px] font-semibold tracking-wide text-white truncate">
                                            {value}
                                        </div>
                                        <div className="text-[11.5px] tracking-wide text-white/25 mt-0.5">
                                            {desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ teaser */}
                        <div className="relative overflow-hidden bg-red-600/[0.05] border border-red-600/20
              rounded-2xl p-5">
                            <div className="absolute top-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-red-600/35 to-transparent" />

                            <div className="flex items-center gap-2 mb-4">
                                <HelpCircle size={13} className="text-red-500" />
                                <span className="font-['Orbitron',monospace] text-[10px] font-bold
                  tracking-[0.16em] uppercase text-white/50">
                                    Common Questions
                                </span>
                            </div>

                            <div className="space-y-0.5">
                                {FAQS.map(q => (
                                    <div key={q}
                                        className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0" />
                                        <span className="text-[13px] tracking-wide text-white/35">{q}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div className="lg:col-span-3">
                        <div className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
              rounded-2xl p-7 sm:p-9">
                            <div className="absolute top-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

                            {sent ? (
                                /* ── Success state ── */
                                <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25
                    flex items-center justify-center">
                                        <CheckCircle size={28} className="text-emerald-400" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-['Orbitron',monospace] font-black text-[18px] sm:text-[22px]
                      text-white tracking-tight mb-2">
                                            MESSAGE SENT
                                        </h3>
                                        <p className="text-[13px] sm:text-[14px] tracking-wide text-white/30 max-w-xs mx-auto leading-relaxed">
                                            We've received your message and will respond within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px]
                      font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.16em] uppercase
                      border border-white/[0.09] text-white/40
                      hover:border-red-600/35 hover:text-white/65 hover:bg-red-600/[0.05]
                      transition-all duration-200">
                                        Send Another
                                    </button>
                                </div>

                            ) : (
                                /* ── Form ── */
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <SectionEyebrow icon={Send} text="Send a Message" />
                                        <h2 className="font-['Orbitron',monospace] font-black text-[20px] sm:text-[26px]
                      text-white leading-none tracking-tight">
                                            WE'D LOVE TO HEAR FROM YOU
                                        </h2>
                                    </div>

                                    <div className="h-px bg-white/[0.06]" />

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelCls}>
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                value={form.name} onChange={set('name')}
                                                placeholder="Your full name"
                                                className={inputCls} required
                                            />
                                        </div>
                                        <div>
                                            <label className={labelCls}>
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email" value={form.email} onChange={set('email')}
                                                placeholder="you@example.com"
                                                className={inputCls} required
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className={labelCls}>Subject</label>
                                        <input
                                            value={form.subject} onChange={set('subject')}
                                            placeholder="What's this about?"
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className={labelCls}>
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={form.message} onChange={set('message')}
                                            placeholder="Tell us more about your inquiry…"
                                            rows={5}
                                            className={`${inputCls} resize-none`}
                                            required
                                        />
                                        <p className="text-[11px] text-white/20 mt-2 tracking-wide">
                                            * Required fields
                                        </p>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2.5
                      py-4 rounded-[10px]
                      font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.18em] uppercase
                      bg-gradient-to-br from-red-600 to-red-700 text-white
                      shadow-[0_6px_28px_rgba(220,38,38,0.35)]
                      hover:from-red-500 hover:to-red-600
                      hover:shadow-[0_8px_36px_rgba(220,38,38,0.5)]
                      hover:-translate-y-0.5 active:translate-y-0
                      transition-all duration-200">
                                        <Send size={13} />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}
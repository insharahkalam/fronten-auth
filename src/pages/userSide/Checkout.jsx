import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../redux/cartSelectors'
import { clearCart } from '../../redux/slices/cartSlice'
import { ArrowLeft, ArrowRight, Shield, Truck, CreditCard, Lock, ChevronDown, Check, Zap } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'

const PLACEHOLDER = 'https://placehold.co/80x80/0a0a0a/333?text=NOIR'

const toastStyle = {
    style: {
        background: '#0a0a0a',
        color: '#fff',
        border: '1px solid #1f1f1f',
        borderRadius: '2px',
        fontFamily: 'Rajdhani, sans-serif',
        letterSpacing: '0.05em',
    },
}

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector(selectCartItems)
    const total = useSelector(selectCartTotal)

    const [step, setStep] = useState(0)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [orderDone, setOrderDone] = useState(false)

    const tax = Math.round(total * 0.16)
    const shipping = total > 2000 ? 0 : 200
    const grand = total + tax + shipping

    /* ── Form state ── */
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', province: '', zip: '',
        cardName: '', cardNumber: '', expiry: '', cvv: '',
        saveCard: false,
    })

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

    const formatExpiry = (v) => {
        // Agar user slash delete kar raha hai to handle karo
        if (v.endsWith('/') && v.length === 3) return v.slice(0, 2)
        const d = v.replace(/\D/g, '').slice(0, 4)
        return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
    }

    /* ── Validation ── */
    const canNext = () => {
        if (step === 0) return form.firstName && form.lastName && form.email && form.phone && form.address && form.city
        if (step === 1) return form.cardName && form.cardNumber.replace(/\s/g, '').length === 16 && /^\d{2}\/\d{2}$/.test(form.expiry) && form.cvv.length >= 3
        return true
    }

    const placeOrder = async () => {
        setPlacingOrder(true)
        await new Promise(r => setTimeout(r, 1800))
        dispatch(clearCart())
        setOrderDone(true)
        setPlacingOrder(false)
    }

    /* ── Order success screen ── */
    if (orderDone) return (
        <div className="noise min-h-screen bg-black text-neutral-200 font-rajdhani relative overflow-hidden">
            <style>{css}</style>
            <Navbar />
            <main className="relative z-10 max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border border-red-600/40 rotate-45 animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                            <Check size={28} className="text-red-500" />
                        </div>
                    </div>
                </div>
                <p className="font-orbitron text-[10px] tracking-[0.5em] text-red-600 uppercase mb-4">// Order Confirmed</p>
                <h1 className="font-orbitron text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                    Mission <span className="text-red-600">Complete</span>
                </h1>
                <p className="text-neutral-500 mb-2 tracking-wide">Your order has been placed successfully.</p>
                <p className="font-orbitron text-[11px] tracking-[0.2em] text-neutral-600 uppercase mb-10">
                    Confirmation sent to {form.email}
                </p>
                <Link to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-orbitron text-[11px] tracking-[0.3em] uppercase transition-all">
                    <ArrowLeft size={14} /> Continue Shopping
                </Link>
            </main>
            <Footer />
        </div>
    )

    if (!items.length) return (
        <div className="noise min-h-screen bg-black text-neutral-200 font-rajdhani relative overflow-hidden">
            <style>{css}</style>
            <Navbar />
            <main className="relative z-10 max-w-xl mx-auto px-4 py-32 text-center">
                <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase mb-3">// Empty</p>
                <h2 className="font-orbitron text-2xl text-white uppercase mb-6">Cart is empty</h2>
                <Link to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-orbitron text-xs tracking-[0.3em] uppercase transition-all">
                    <ArrowLeft size={14} /> Enter Shop
                </Link>
            </main>
            <Footer />
        </div>
    )

    return (
        <div className="noise min-h-screen bg-black text-neutral-200 font-rajdhani relative overflow-hidden">
            <style>{css}</style>
            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 fade-in">

                {/* ── Page header ── */}
                <div className="mb-12 border-b border-neutral-900 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="h-px w-8 bg-red-600" />
                        <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase">
                            [ 02 ] / Checkout
                        </p>
                    </div>
                    <h1 className="font-orbitron font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
                        Check<span className="text-red-600">out</span>
                    </h1>
                </div>

                {/* ── Step indicator ── */}
                <div className="flex items-center gap-0 mb-12 max-w-sm">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <button
                                onClick={() => i < step && setStep(i)}
                                className={`flex items-center gap-2 px-3 py-1.5 font-orbitron text-[10px] tracking-[0.2em] uppercase transition-all
                  ${i === step ? 'text-red-500 border-b border-red-600' :
                                        i < step ? 'text-neutral-400 cursor-pointer hover:text-red-400' :
                                            'text-neutral-700 cursor-default'}`}
                            >
                                <span className={`w-5 h-5 flex items-center justify-center text-[9px] border
                  ${i === step ? 'border-red-600 text-red-500 bg-red-600/10' :
                                        i < step ? 'border-neutral-700 text-neutral-400 bg-neutral-900' :
                                            'border-neutral-800 text-neutral-700'}`}>
                                    {i < step ? <Check size={10} /> : String(i + 1).padStart(2, '0')}
                                </span>
                                {s}
                            </button>
                            {i < STEPS.length - 1 && (
                                <span className="w-8 h-px bg-neutral-800 mx-1" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left: Form ── */}
                    <div className="lg:col-span-2">

                        {/* STEP 0 — Shipping */}
                        {step === 0 && (
                            <div className="fade-in space-y-6">
                                <SectionHead icon={Truck} label="Shipping Information" index="01" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="First Name" value={form.firstName} onChange={v => set('firstName', v)} placeholder="Ayesha" />
                                    <Field label="Last Name" value={form.lastName} onChange={v => set('lastName', v)} placeholder="Khan" />
                                    <Field label="Email Address" value={form.email} onChange={v => set('email', v)} placeholder="ayesha@email.com" type="email" span />
                                    <Field label="Phone Number" value={form.phone} onChange={v => set('phone', v)} placeholder="+92 300 0000000" type="tel" />
                                    <div className="sm:col-span-2">
                                        <label className="field-label">Province</label>
                                        <div className="relative">
                                            <select
                                                value={form.province}
                                                onChange={e => set('province', e.target.value)}
                                                className="field-input appearance-none pr-10 w-full"
                                            >
                                                <option value="">Select Province</option>
                                                {['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'].map(p => (
                                                    <option key={p} value={p}>{p}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                                        </div>
                                    </div>
                                    <Field label="City" value={form.city} onChange={v => set('city', v)} placeholder="Karachi" />
                                    <Field label="ZIP / Postal Code" value={form.zip} onChange={v => set('zip', v)} placeholder="75000" />
                                    <Field label="Street Address" value={form.address} onChange={v => set('address', v)} placeholder="House #, Street, Area" span />
                                </div>
                            </div>
                        )}

                        {/* STEP 1 — Payment */}
                        {step === 1 && (
                            <div className="fade-in space-y-6">
                                <SectionHead icon={CreditCard} label="Payment Details" index="02" />

                                {/* Card preview */}
                                <div className="relative h-40 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 p-5 overflow-hidden mb-2">
                                    <div className="absolute inset-0 opacity-5"
                                        style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '8px 8px' }} />
                                    <div className="absolute top-4 right-5">
                                        <Zap size={22} className="text-red-600 fill-red-600" />
                                    </div>
                                    <p className="font-orbitron text-[9px] tracking-[0.3em] text-neutral-600 uppercase mb-6">NOIR Payment</p>
                                    <p className="font-orbitron text-base tracking-[0.25em] text-white mb-4">
                                        {form.cardNumber || '•••• •••• •••• ••••'}
                                    </p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="font-orbitron text-[8px] tracking-[0.2em] text-neutral-600 uppercase mb-0.5">Card Holder</p>
                                            <p className="font-orbitron text-[11px] text-white uppercase tracking-wider">
                                                {form.cardName || 'YOUR NAME'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-orbitron text-[8px] tracking-[0.2em] text-neutral-600 uppercase mb-0.5">Expires</p>
                                            <p className="font-orbitron text-[11px] text-white">{form.expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Name on Card" value={form.cardName} onChange={v => set('cardName', v)} placeholder="AYESHA KHAN" span />
                                    <Field
                                        label="Card Number" value={form.cardNumber}
                                        onChange={v => set('cardNumber', formatCard(v))}
                                        placeholder="1234 5678 9012 3456"
                                        inputMode="numeric"
                                        span
                                    />
                                    <Field
                                        label="Expiry Date" value={form.expiry}
                                        onChange={v => set('expiry', formatExpiry(v))}
                                        placeholder="MM/YY"
                                    />
                                    <Field label="CVV" value={form.cvv}
                                        onChange={v => set('cvv', v.replace(/\D/g, '').slice(0, 4))}
                                        placeholder="•••" type="password"
                                    />
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div
                                        onClick={() => set('saveCard', !form.saveCard)}
                                        className={`w-4 h-4 border flex items-center justify-center transition-all
                      ${form.saveCard ? 'border-red-600 bg-red-600/20' : 'border-neutral-700 hover:border-neutral-500'}`}
                                    >
                                        {form.saveCard && <Check size={10} className="text-red-500" />}
                                    </div>
                                    <span className="font-orbitron text-[10px] tracking-[0.2em] text-neutral-500 uppercase group-hover:text-neutral-300 transition-colors">
                                        Save card for future orders
                                    </span>
                                </label>

                                <div className="flex items-center gap-2 border border-neutral-900 bg-neutral-950/60 px-4 py-3">
                                    <Lock size={12} className="text-red-600 shrink-0" />
                                    <span className="font-orbitron text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                                        256-bit SSL encrypted — your data is safe
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* STEP 2 — Review */}
                        {step === 2 && (
                            <div className="fade-in space-y-6">
                                <SectionHead icon={Shield} label="Order Review" index="03" />

                                {/* Shipping summary */}
                                <div className="border border-neutral-900 bg-neutral-950/60 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-500 uppercase">Shipping To</p>
                                        <button onClick={() => setStep(0)} className="font-orbitron text-[9px] tracking-[0.2em] text-red-500 uppercase hover:text-red-400 transition-colors">Edit</button>
                                    </div>
                                    <p className="text-sm text-white font-semibold">{form.firstName} {form.lastName}</p>
                                    <p className="text-xs text-neutral-500 mt-1">{form.address}, {form.city}, {form.province} {form.zip}</p>
                                    <p className="text-xs text-neutral-500">{form.phone} · {form.email}</p>
                                </div>

                                {/* Payment summary */}
                                <div className="border border-neutral-900 bg-neutral-950/60 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-500 uppercase">Payment</p>
                                        <button onClick={() => setStep(1)} className="font-orbitron text-[9px] tracking-[0.2em] text-red-500 uppercase hover:text-red-400 transition-colors">Edit</button>
                                    </div>
                                    <p className="font-orbitron text-sm text-white tracking-[0.2em]">
                                        •••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4)}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">{form.cardName}</p>
                                </div>

                                {/* Items */}
                                <div className="space-y-3">
                                    <p className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4">Items ({items.reduce((s, i) => s + i.qty, 0)})</p>
                                    {items.map((item) => {
                                        const img = (Array.isArray(item.images) && item.images[0]) || item.image || PLACEHOLDER
                                        return (
                                            <div key={item._id} className="flex gap-3 border border-neutral-900 p-3">
                                                <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0">
                                                    <img src={img} alt={item.name} onError={e => e.currentTarget.src = PLACEHOLDER}
                                                        className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-orbitron text-white text-[11px] font-bold uppercase tracking-wide line-clamp-1">{item.name}</p>
                                                    <p className="font-orbitron text-[9px] text-neutral-600 uppercase tracking-wider mt-0.5">Qty: {item.qty}</p>
                                                </div>
                                                <p className="font-orbitron text-white text-sm font-bold shrink-0">
                                                    Rs. {(item.price * item.qty).toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── Navigation buttons ── */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-900">
                            {step > 0 ? (
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>
                            ) : (
                                <Link to="/cart"
                                    className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors">
                                    <ArrowLeft size={14} /> Cart
                                </Link>
                            )}

                            {step < 2 ? (
                                <button
                                    onClick={() => canNext() && setStep(s => s + 1)}
                                    disabled={!canNext()}
                                    className="group flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 disabled:text-neutral-700 text-white font-orbitron text-[11px] tracking-[0.25em] uppercase transition-all"
                                >
                                    Continue
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <button
                                    onClick={placeOrder}
                                    disabled={placingOrder}
                                    className="group flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-orbitron text-[11px] tracking-[0.25em] uppercase transition-all"
                                >
                                    {placingOrder ? (
                                        <><span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                                    ) : (
                                        <><Lock size={12} /> Place Order</>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Order summary ── */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 bg-neutral-950/80 border border-neutral-900 backdrop-blur-sm">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-black/40">
                                <h2 className="font-orbitron text-white text-sm font-bold uppercase tracking-[0.2em]">Summary</h2>
                                <span className="font-orbitron text-[10px] text-red-600 tracking-[0.3em]">// 03</span>
                            </div>

                            <div className="p-6">
                                {/* Items mini list */}
                                <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                                    {items.map((item) => {
                                        const img = (Array.isArray(item.images) && item.images[0]) || item.image || PLACEHOLDER
                                        return (
                                            <div key={item._id} className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 shrink-0 bg-neutral-900 border border-neutral-800 overflow-hidden">
                                                    <img src={img} alt={item.name} onError={e => e.currentTarget.src = PLACEHOLDER}
                                                        className="w-full h-full object-cover" />
                                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 font-orbitron text-[8px] text-white flex items-center justify-center">
                                                        {item.qty}
                                                    </span>
                                                </div>
                                                <p className="flex-1 font-orbitron text-[10px] text-neutral-300 uppercase tracking-wide line-clamp-1">{item.name}</p>
                                                <p className="font-orbitron text-[11px] text-white font-bold shrink-0">
                                                    Rs. {(item.price * item.qty).toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="space-y-3 border-t border-neutral-900 pt-4 mb-5">
                                    {[
                                        ['Subtotal', `Rs. ${total.toLocaleString()}`],
                                        ['Shipping', shipping === 0 ? 'FREE' : `Rs. ${shipping}`],
                                        ['Tax (16%)', `Rs. ${tax.toLocaleString()}`],
                                    ].map(([label, val]) => (
                                        <div key={label} className="flex justify-between items-center text-sm">
                                            <span className="font-orbitron text-[10px] tracking-[0.15em] text-neutral-500 uppercase">{label}</span>
                                            <span className="font-orbitron text-[11px] text-neutral-200 font-medium">{val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-neutral-800 pt-4 flex justify-between items-baseline">
                                    <span className="font-orbitron text-white text-xs uppercase tracking-[0.2em]">Total</span>
                                    <span className="font-orbitron text-white text-2xl font-black">
                                        Rs. {grand.toLocaleString()}
                                    </span>
                                </div>

                                {shipping > 0 && (
                                    <div className="mt-4 flex items-center gap-2 border border-dashed border-neutral-800 px-3 py-2.5">
                                        <Truck size={11} className="text-red-600 shrink-0" />
                                        <span className="font-orbitron text-[9px] tracking-[0.15em] text-neutral-600 uppercase">
                                            Add Rs. {(2000 - total).toLocaleString()} for free shipping
                                        </span>
                                    </div>
                                )}

                                <div className="mt-5 pt-4 border-t border-neutral-900 space-y-2.5">
                                    {[
                                        [Shield, 'Secure SSL Checkout'],
                                        [Lock, '256-bit Encryption'],
                                        [Truck, 'Fast & Tracked Delivery'],
                                    ].map(([Icon, text]) => (
                                        <div key={text} className="flex items-center gap-2 font-orbitron text-[9px] tracking-[0.2em] text-neutral-700 uppercase">
                                            <Icon size={10} className="text-red-600" />
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}

/* ── Sub-components ── */
function SectionHead({ icon: Icon, label, index }) {
    return (
        <div className="flex items-center gap-4 pb-5 border-b border-neutral-900">
            <div className="w-8 h-8 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-red-500" />
            </div>
            <h2 className="font-orbitron text-white text-sm font-bold uppercase tracking-[0.2em]">{label}</h2>
            <span className="ml-auto font-orbitron text-[10px] text-red-600 tracking-[0.3em]">// {index}</span>
        </div>
    )
}

function Field({ label, value, onChange, placeholder, type = 'text', span, inputMode }) {
    return (
        <div className={span ? 'sm:col-span-2' : ''}>
            <label className="field-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="field-input w-full"
                autoComplete="off"
                inputMode={inputMode}
            />
        </div>
    )
}
/* ── Styles ── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
.font-orbitron { font-family: 'Orbitron', monospace; }
.font-rajdhani { font-family: 'Rajdhani', sans-serif; }

@keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
.fade-in { animation: fadeIn 0.35s ease both; }

@keyframes spin-slow { to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 6s linear infinite; }

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

.field-label {
  display: block;
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgb(82,82,82);
  margin-bottom: 6px;
}

.field-input {
  background: rgba(0,0,0,0.6);
  border: 1px solid rgb(38,38,38);
  color: #fff;
  padding: 10px 12px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  letter-spacing: 0.04em;
  outline: none;
  transition: border-color 0.2s;
}
.field-input::placeholder { color: rgb(64,64,64); }
.field-input:focus { border-color: rgb(220,38,38); }

.scrollbar-thin::-webkit-scrollbar { width: 2px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 1px; }
`
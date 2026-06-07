import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../redux/cartSelectors'
import { clearCart } from '../../redux/slices/cartSlice'
import {
    ArrowLeft, ArrowRight, Shield, Truck, CreditCard, Lock, ChevronDown,
    Check, Zap, User, MapPin, Package, Sparkles, Loader2
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'

const PLACEHOLDER = 'https://placehold.co/80x80/0a0a0a/333?text=NOIR'

const STEPS = [
    { label: 'Shipping', icon: MapPin },
    { label: 'Payment', icon: CreditCard },
    { label: 'Review', icon: Package },
]

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

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', province: '', zip: '',
        cardName: '', cardNumber: '', expiry: '', cvv: '',
        saveCard: false,
    })

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

    const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    const formatExpiry = (v) => {
        if (v.endsWith('/') && v.length === 3) return v.slice(0, 2)
        const d = v.replace(/\D/g, '').slice(0, 4)
        return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
    }

    const canNext = () => {
        if (step === 0) return form.firstName && form.lastName && form.email && form.phone && form.address && form.city && form.province
        if (step === 1) return form.cardName && form.cardNumber.replace(/\s/g, '').length === 16 && /^\d{2}\/\d{2}$/.test(form.expiry) && form.cvv.length >= 3
        return true
    }

    const placeOrder = async () => {
        setPlacingOrder(true)
        await new Promise(r => setTimeout(r, 1800))
        dispatch(clearCart())
        localStorage.removeItem("cart")
        setOrderDone(true)
        setPlacingOrder(false)
    }

    /* ── Order success ── */
    if (orderDone) return (
        <div className="min-h-screen bg-black text-white font-rajdhani noise relative overflow-hidden">
            <Style />
            <Navbar />
            <main className="relative z-10 max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="relative w-28 h-28 mx-auto mb-10">
                    <div className="absolute inset-0 border border-red-600/30 rotate-45 animate-spin-slow" />
                    <div className="absolute inset-2 border border-red-600/15 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '10s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600/10 border border-red-600/40 flex items-center justify-center">
                            <Check size={30} className="text-red-500" />
                        </div>
                    </div>
                </div>
                <p className="font-orbitron text-[10px] tracking-[0.5em] text-red-600 uppercase mb-4">// Order Confirmed</p>
                <h1 className="font-orbitron text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
                    Mission <span className="text-red-600">Complete</span>
                </h1>
                <p className="text-neutral-500 mb-1 tracking-wide text-sm">Your order has been placed successfully.</p>
                <p className="font-orbitron text-[11px] tracking-[0.2em] text-neutral-700 uppercase mb-12">
                    Confirmation sent to <span className="text-neutral-400">{form.email}</span>
                </p>
                <Link to="/shop"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-orbitron text-[11px] tracking-[0.35em] uppercase transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <ArrowLeft size={13} /> Continue Shopping
                </Link>
            </main>
            <Footer />
        </div>
    )

    if (!items.length) return (
        <div className="min-h-screen bg-black text-white font-rajdhani noise relative">
            <Style />
            <Navbar />
            <div className="relative z-10 max-w-xl mx-auto px-6 py-32 text-center fade-in">
                <div className="font-orbitron text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-4">// Empty</div>
                <h1 className="font-orbitron font-black text-4xl uppercase mb-8">Cart is empty</h1>
                <Link to="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-orbitron text-[11px] tracking-[0.25em] uppercase transition-all">
                    <ArrowRight className="w-4 h-4" /> Enter Shop
                </Link>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white font-rajdhani noise relative overflow-hidden">
            <Style />
            <Navbar />

            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                style={{ backgroundImage: 'linear-gradient(rgba(220,38,38,1) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">

                {/* Page header */}
                <div className="mb-10 fade-in">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-px w-10 bg-red-600" />
                        <span className="font-orbitron text-[10px] tracking-[0.4em] text-red-500 uppercase">
                            [ 02 ] / Checkout
                        </span>
                    </div>
                    <h1 className="font-orbitron font-black text-4xl md:text-6xl uppercase tracking-tight">
                        Check<span className="text-red-500">out</span>
                    </h1>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2 fade-in">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon
                        const active = i === step
                        const done = i < step
                        return (
                            <div key={s.label} className="flex items-center gap-2 sm:gap-4 shrink-0">
                                <button
                                    onClick={() => done && setStep(i)}
                                    className={`flex items-center gap-2 px-3 py-2 font-orbitron text-[10px] tracking-[0.2em] uppercase transition-all border ${active ? 'text-red-500 border-red-600 bg-red-600/5 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]' :
                                        done ? 'text-neutral-300 border-neutral-800 hover:border-red-600/40 hover:text-red-400 cursor-pointer' :
                                            'text-neutral-700 border-neutral-900 cursor-default'
                                        }`}
                                >
                                    <span className={`w-5 h-5 flex items-center justify-center text-[9px] ${active ? 'bg-red-600 text-white' : done ? 'bg-neutral-800 text-red-400' : 'bg-neutral-900 text-neutral-700'}`}>
                                        {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                                    </span>
                                    {s.label}
                                </button>
                                {i < STEPS.length - 1 && (
                                    <div className={`h-px w-6 sm:w-12 ${done ? 'bg-red-600' : 'bg-neutral-800'}`} />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left: Form */}
                    <div className="lg:col-span-2 space-y-8 fade-in">
                        <div className="border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm relative">
                            {/* corner accents */}
                            <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-red-600" />
                            <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-red-600" />
                            <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-red-600" />
                            <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-red-600" />

                            <div className="p-6 md:p-8">

                                {/* STEP 0 */}
                                {step === 0 && (
                                    <div className="fade-in">
                                        <SectionHead icon={MapPin} label="Shipping Details" index="01" />
                                        <div className="grid sm:grid-cols-2 gap-5 mt-6">
                                            <Field label="First Name" value={form.firstName} onChange={v => set('firstName', v)} placeholder="Ayesha" />
                                            <Field label="Last Name" value={form.lastName} onChange={v => set('lastName', v)} placeholder="Khan" />
                                            <Field label="Email" value={form.email} onChange={v => set('email', v)} placeholder="ayesha@email.com" type="email" span />
                                            <Field label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="+92 300 0000000" type="tel" />
                                            <div>
                                                <label className="field-label">Province</label>
                                                <div className="relative">
                                                    <select
                                                        value={form.province}
                                                        onChange={(e) => set('province', e.target.value)}
                                                        className="field-input appearance-none pr-10 w-full"
                                                    >
                                                        <option value="">Select Province</option>
                                                        {['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'].map(p => (
                                                            <option key={p} value={p}>{p}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                                                </div>
                                            </div>
                                            <Field label="City" value={form.city} onChange={v => set('city', v)} placeholder="Karachi" />
                                            <Field label="Postal Code" value={form.zip} onChange={v => set('zip', v)} placeholder="75000" />
                                            <Field label="Address" value={form.address} onChange={v => set('address', v)} placeholder="House #, Street, Area" span />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 1 */}
                                {step === 1 && (
                                    <div className="fade-in">
                                        <SectionHead icon={CreditCard} label="Payment Method" index="02" />

                                        {/* Card preview */}
                                        <div className="mt-6 mb-8 relative aspect-[1.6/1] max-w-md mx-auto p-6 bg-gradient-to-br from-neutral-900 via-black to-red-950/40 border border-red-900/30 overflow-hidden">
                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 blur-3xl rounded-full" />
                                            <div className="absolute top-4 right-4 flex gap-1">
                                                <span className="w-8 h-8 rounded-full bg-red-600/80" />
                                                <span className="w-8 h-8 rounded-full bg-red-400/40 -ml-3" />
                                            </div>
                                            <div className="relative">
                                                <div className="w-10 h-7 bg-gradient-to-br from-yellow-600/80 to-yellow-800/80 rounded-sm mb-6" />
                                                <p className="font-orbitron text-[9px] tracking-[0.3em] text-red-500/80 uppercase mb-1">NOIR Payment</p>
                                                <p className="font-orbitron text-lg sm:text-xl tracking-[0.2em] text-white mb-6">
                                                    {form.cardNumber || '•••• •••• •••• ••••'}
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="font-orbitron text-[8px] tracking-[0.3em] text-neutral-500 uppercase mb-1">Card Holder</p>
                                                        <p className="font-orbitron text-xs tracking-[0.15em] text-white uppercase truncate max-w-[180px]">
                                                            {form.cardName || 'YOUR NAME'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="font-orbitron text-[8px] tracking-[0.3em] text-neutral-500 uppercase mb-1">Expires</p>
                                                        <p className="font-orbitron text-xs tracking-[0.2em] text-white">{form.expiry || 'MM/YY'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <Field label="Cardholder Name" value={form.cardName} onChange={v => set('cardName', v.toUpperCase())} placeholder="AYESHA KHAN" span />
                                            <Field label="Card Number" value={form.cardNumber} onChange={v => set('cardNumber', formatCard(v))} placeholder="1234 5678 9012 3456" inputMode="numeric" span />
                                            <Field label="Expiry" value={form.expiry} onChange={v => set('expiry', formatExpiry(v))} placeholder="MM/YY" />
                                            <Field label="CVV" value={form.cvv} onChange={v => set('cvv', v.replace(/\D/g, '').slice(0, 4))} placeholder="•••" type="password" />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => set('saveCard', !form.saveCard)}
                                            className="mt-6 flex items-center gap-3 group"
                                        >
                                            <span className={`w-4 h-4 border flex items-center justify-center transition-all ${form.saveCard ? 'border-red-600 bg-red-600' : 'border-neutral-700 group-hover:border-neutral-500'
                                                }`}>
                                                {form.saveCard && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                            </span>
                                            <span className="font-rajdhani text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                                Save card for future orders
                                            </span>
                                        </button>

                                        <div className="mt-6 flex items-center gap-3 p-3 border border-neutral-900 bg-black/40">
                                            <Lock className="w-4 h-4 text-red-500 shrink-0" />
                                            <span className="font-rajdhani text-xs text-neutral-400">
                                                256-bit SSL encrypted — your data is safe
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2 */}
                                {step === 2 && (
                                    <div className="fade-in">
                                        <SectionHead icon={Package} label="Review Order" index="03" />

                                        <div className="space-y-5 mt-6">
                                            <SummaryBlock title="Shipping To" onEdit={() => setStep(0)}>
                                                <p className="text-white font-medium">{form.firstName} {form.lastName}</p>
                                                <p className="text-neutral-400 text-sm">{form.address}, {form.city}, {form.province} {form.zip}</p>
                                                <p className="text-neutral-500 text-xs mt-1">{form.phone} · {form.email}</p>
                                            </SummaryBlock>

                                            <SummaryBlock title="Payment" onEdit={() => setStep(1)}>
                                                <p className="font-orbitron text-white tracking-[0.2em]">
                                                    •••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4)}
                                                </p>
                                                <p className="text-neutral-500 text-xs mt-1">{form.cardName}</p>
                                            </SummaryBlock>

                                            <div className="border border-neutral-900 bg-black/40 p-4">
                                                <p className="font-orbitron text-[10px] tracking-[0.3em] text-red-500 uppercase mb-4">
                                                    Items ({items.reduce((s, i) => s + i.qty, 0)})
                                                </p>
                                                <div className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin pr-2">
                                                    {items.map((item) => {
                                                        const img = (Array.isArray(item.images) && item.images[0]) || item.image || PLACEHOLDER
                                                        return (
                                                            <div key={item.id || item._id || item.name} className="flex items-center gap-3 p-2 border border-neutral-900 hover:border-red-900/40 transition-colors">
                                                                <div className="w-14 h-14 border border-neutral-800 bg-neutral-950 overflow-hidden shrink-0">
                                                                    <img src={img} alt={item.name} onError={(e) => e.currentTarget.src = PLACEHOLDER} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-white text-sm truncate">{item.name}</p>
                                                                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-neutral-500 uppercase">Qty: {item.qty}</p>
                                                                </div>
                                                                <p className="font-orbitron text-sm text-red-500 tracking-wider whitespace-nowrap">
                                                                    Rs. {(item.price * item.qty).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Nav buttons */}
                                <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-900">
                                    {step > 0 ? (
                                        <button
                                            onClick={() => setStep(s => s - 1)}
                                            className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : (
                                        <Link to="/cart" className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors">
                                            <ArrowLeft className="w-4 h-4" /> Cart
                                        </Link>
                                    )}

                                    {step < 2 ? (
                                        <button
                                            onClick={() => canNext() && setStep(s => s + 1)}
                                            disabled={!canNext()}
                                            className="group flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 disabled:text-neutral-700 disabled:cursor-not-allowed text-white font-orbitron text-[11px] tracking-[0.25em] uppercase transition-all"
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={placeOrder}
                                            disabled={placingOrder}
                                            className="group flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-orbitron text-[11px] tracking-[0.25em] uppercase transition-all"
                                        >
                                            {placingOrder ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                                            ) : (
                                                <><Zap className="w-4 h-4" /> Place Order</>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 fade-in">
                            <div className="border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm relative">
                                <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-red-600" />
                                <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-red-600" />
                                <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-red-600" />
                                <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-red-600" />

                                <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                                    <h2 className="font-orbitron font-black text-lg uppercase tracking-wider">Summary</h2>
                                    <span className="font-orbitron text-[10px] tracking-[0.3em] text-red-500">// 03</span>
                                </div>

                                <div className="p-6 space-y-5">
                                    <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-thin pr-1">
                                        {items.map((item) => {
                                            const img = (Array.isArray(item.images) && item.images[0]) || item.image || PLACEHOLDER
                                            return (
                                                <div key={item.id || item._id || item.name} className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 border border-neutral-800 bg-neutral-950 overflow-hidden shrink-0">
                                                        <img src={img} alt={item.name} onError={(e) => e.currentTarget.src = PLACEHOLDER} className="w-full h-full object-cover" />
                                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-orbitron flex items-center justify-center">
                                                            {item.qty}
                                                        </span>
                                                    </div>
                                                    <p className="flex-1 text-neutral-300 text-sm truncate">{item.name}</p>
                                                    <p className="font-orbitron text-xs text-white tracking-wider whitespace-nowrap">
                                                        Rs. {(item.price * item.qty).toLocaleString()}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="h-px bg-neutral-900" />

                                    <div className="space-y-2">
                                        {[
                                            ['Subtotal', `Rs. ${total.toLocaleString()}`],
                                            ['Shipping', shipping === 0 ? 'FREE' : `Rs. ${shipping}`],
                                            ['Tax (16%)', `Rs. ${tax.toLocaleString()}`],
                                        ].map(([label, val]) => (
                                            <div key={label} className="flex justify-between text-sm">
                                                <span className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-500 uppercase">{label}</span>
                                                <span className={`font-rajdhani ${val === 'FREE' ? 'text-red-500 font-bold' : 'text-white'}`}>{val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-neutral-900" />

                                    <div className="flex justify-between items-baseline">
                                        <span className="font-orbitron text-xs tracking-[0.25em] uppercase">Total</span>
                                        <span className="font-orbitron font-black text-2xl text-red-500 tracking-wider">
                                            Rs. {grand.toLocaleString()}
                                        </span>
                                    </div>

                                    {shipping > 0 && (
                                        <div className="flex items-center gap-2 p-3 border border-red-900/30 bg-red-600/5">
                                            <Truck className="w-4 h-4 text-red-500 shrink-0" />
                                            <span className="text-xs text-neutral-300">
                                                Add <span className="text-red-400 font-semibold">Rs. {(2000 - total).toLocaleString()}</span> for free shipping
                                            </span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-neutral-900 space-y-2">
                                        {[
                                            [Shield, 'Secure SSL Checkout'],
                                            [Lock, '256-bit Encryption'],
                                            [Truck, 'Fast & Tracked Delivery'],
                                        ].map(([Icon, text]) => (
                                            <div key={text} className="flex items-center gap-2 text-xs text-neutral-500">
                                                <Icon className="w-3.5 h-3.5 text-red-500/70" />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

/* ── Sub-components ── */
function SectionHead({ icon: Icon, label, index }) {
    return (
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-900">
            <div className="w-8 h-8 border border-red-600/40 flex items-center justify-center bg-red-600/5">
                <Icon className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="font-orbitron font-bold text-lg uppercase tracking-wider flex-1">{label}</h2>
            <span className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-600">// {index}</span>
        </div>
    )
}

function SummaryBlock({ title, onEdit, children }) {
    return (
        <div className="border border-neutral-900 bg-black/40 p-4">
            <div className="flex items-center justify-between mb-3">
                <p className="font-orbitron text-[10px] tracking-[0.3em] text-red-500 uppercase">{title}</p>
                <button onClick={onEdit} className="font-orbitron text-[9px] tracking-[0.2em] text-neutral-400 hover:text-red-400 uppercase transition-colors">
                    Edit
                </button>
            </div>
            {children}
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
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="field-input w-full"
                autoComplete="off"
                inputMode={inputMode}
            />
        </div>
    )
}

function Style() {
    return (
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.4s ease both; }

        @keyframes pulseSlow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        .animate-pulse-slow { animation: pulseSlow 2.5s ease-in-out infinite; }

        .noise::before {
          content:'';position:fixed;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events:none;z-index:0;opacity:0.35;
        }
        .noise::after {
          content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;
          background:radial-gradient(ellipse,rgba(220,38,38,0.08) 0%,transparent 70%);
          pointer-events:none;z-index:0;
        }

        .field-label {
          display:block;font-family:'Orbitron',monospace;font-size:9px;
          letter-spacing:0.25em;text-transform:uppercase;color:rgb(115,115,115);
          margin-bottom:8px;
        }
        .field-input {
          background:rgba(0,0,0,0.6);border:1px solid rgb(38,38,38);color:#fff;
          padding:11px 14px;font-family:'Rajdhani',sans-serif;font-size:14px;
          letter-spacing:0.04em;outline:none;width:100%;
          transition:border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }

        .field-input::placeholder { color:rgb(64,64,64); }
        .field-input:focus {
          border-color:rgb(220,38,38);
          box-shadow:0 0 0 3px rgba(220,38,38,0.1), inset 0 0 20px rgba(220,38,38,0.05);
          background:rgba(0,0,0,0.8);
        }
        select.field-input option { background:#0a0a0a; color:#fff; }

        .scrollbar-thin::-webkit-scrollbar { width:3px; }
        .scrollbar-thin::-webkit-scrollbar-track { background:rgba(255,255,255,0.02); }
        .scrollbar-thin::-webkit-scrollbar-thumb { background:#dc2626; border-radius:2px; }
      `}</style>
    )
}



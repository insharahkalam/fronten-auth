import { useState, useEffect } from 'react'
import {
    Package, Search, Eye, Truck, CheckCircle, Clock, XCircle, RefreshCw, MapPin, Phone, Mail, Calendar, DollarSign,
    TrendingUp, ShieldCheck, User, Box, SlidersHorizontal, X, ChevronLeft, ChevronRight, AlertCircle, Loader
} from 'lucide-react'
import api from '../config/service'

const card = `relative overflow-hidden bg-white/[0.03] border border-white/[0.07] rounded-2xl
    backdrop-blur transition-all duration-300 hover:border-white/[0.11]`;
const shimmerLine = `absolute top-0 left-0 right-0 h-px
    bg-gradient-to-r from-transparent via-red-600/35 to-transparent`;

// ── Status config ──────────────────────────────────────────
const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/25', dot: 'bg-amber-400', icon: Clock },
    processing: { label: 'Processing', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/25', dot: 'bg-blue-400', icon: RefreshCw },
    shipped: { label: 'Shipped', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/25', dot: 'bg-purple-400', icon: Truck },
    delivered: { label: 'Delivered', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/25', dot: 'bg-red-500', icon: XCircle },
}

const USE_FAKE_DATA = false   // ✅ fake data band

// ── Helpers ────────────────────────────────────────────────
const fmt = (n) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n)

const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

const fmtTime = (d) =>
    new Date(d).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })

const customerName = (order) =>
    order.user?.username ?? `${order.shippingAddress?.firstName ?? ''} ${order.shippingAddress?.lastName ?? ''}`.trim() ?? '—'

const customerEmail = (order) =>
    order.user?.email ?? order.shippingAddress?.email ?? '—'

// ── Status Badge ───────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-['Orbitron',monospace] font-bold tracking-[0.15em] uppercase border ${cfg.bg} ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    )
}

// ── Order Detail Modal ─────────────────────────────────────
const OrderModal = ({ order, onClose, onStatusChange }) => {
    const [updating, setUpdating] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(order.status)

    if (!order) return null

    const handleStatus = async (newStatus) => {
        setUpdating(true)
        try {
            await api.put(`/orders/${order._id}/status`, { status: newStatus })
            setCurrentStatus(newStatus)
            onStatusChange(order._id, newStatus)
        } catch (e) {
            console.error(e)
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-white/[0.08]"
                style={{ background: '#08080a' }}>

                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)' }} />

                <div className="relative flex items-start justify-between p-6 border-b border-white/[0.06]">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.3em] uppercase text-red-500/80">
                                ORDER DETAILS
                            </span>
                            <span className="font-['Orbitron',monospace] text-[9px] text-white/20">/ {order._id?.slice(-8).toUpperCase()}</span>
                        </div>
                        <h2 className="font-['Orbitron',monospace] font-black text-white text-lg tracking-tight">
                            #{order._id?.slice(-6).toUpperCase()}
                        </h2>
                        <div className="flex items-center gap-3 mt-2">
                            <StatusBadge status={currentStatus} />
                            <span className="text-[12px] text-white/35">{fmtDate(order.createdAt)} · {fmtTime(order.createdAt)}</span>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center
                        text-white/40 hover:text-white hover:border-white/20 transition-all">
                        <X size={15} />
                    </button>
                </div>

                <div className="relative p-6 space-y-5">

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <User size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                Customer
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InfoRow icon={User} label="Name" value={customerName(order)} />
                            <InfoRow icon={Mail} label="Email" value={customerEmail(order)} />
                            <InfoRow icon={Phone} label="Phone" value={order.shippingAddress?.phone ?? '—'} />
                            <InfoRow icon={MapPin} label="City" value={order.shippingAddress?.city ?? '—'} />
                        </div>
                        {order.shippingAddress?.address && (
                            <div className="mt-3 pt-3 border-t border-white/[0.05]">
                                <span className="text-[11px] text-white/30 block mb-1">Delivery Address</span>
                                <p className="text-[13px] text-white/65 leading-relaxed">
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.province ?? ''} {order.shippingAddress.postalCode ?? ''}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Box size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                Items Ordered
                            </span>
                        </div>
                        <div className="space-y-3">
                            {order.products?.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/[0.07] bg-white/[0.03]">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package size={16} className="text-white/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] text-white font-medium truncate">{item.title}</p>
                                        <p className="text-[11px] text-white/35 mt-0.5">
                                            Qty: {item.quantity} · {fmt(item.price)} each
                                        </p>
                                    </div>
                                    <div className="font-['Orbitron',monospace] text-[13px] font-bold text-white shrink-0">
                                        {fmt(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
                            {order.subtotal !== undefined && (
                                <div className="flex justify-between text-[12px] text-white/40">
                                    <span>Subtotal</span><span>{fmt(order.subtotal)}</span>
                                </div>
                            )}
                            {order.tax !== undefined && (
                                <div className="flex justify-between text-[12px] text-white/40">
                                    <span>Tax</span><span>{fmt(order.tax)}</span>
                                </div>
                            )}
                            {order.shippingFee !== undefined && (
                                <div className="flex justify-between text-[12px] text-white/40">
                                    <span>Shipping</span>
                                    <span>{order.shippingFee === 0 ? 'Free' : fmt(order.shippingFee)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center pt-2 border-t border-white/[0.05]">
                                <span className="font-['Orbitron',monospace] text-[11px] font-bold tracking-widest text-white/60 uppercase">Total</span>
                                <span className="font-['Orbitron',monospace] text-[18px] font-black text-white">{fmt(order.totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                Payment
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <InfoRow icon={DollarSign} label="Method" value={order.paymentMethod ?? 'COD'} />
                            <InfoRow icon={CheckCircle} label="Status" value={order.paymentStatus ?? 'Pending'} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-red-600/20 bg-red-600/[0.04] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <SlidersHorizontal size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-red-400/80">
                                Update Order Status
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => {
                                const cfg = STATUS_CONFIG[s]
                                const Icon = cfg.icon
                                const active = currentStatus === s
                                return (
                                    <button key={s} onClick={() => handleStatus(s)} disabled={updating}
                                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all duration-200
                                        ${active
                                                ? `${cfg.bg} ${cfg.color} border-current`
                                                : 'border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/60 bg-white/[0.02]'
                                            }`}>
                                        <Icon size={13} />
                                        <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-widest uppercase">{cfg.label}</span>
                                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current" />}
                                    </button>
                                )
                            })}
                        </div>
                        {updating && (
                            <div className="flex items-center gap-2 mt-3 text-white/40 text-[12px]">
                                <Loader2 size={12} className="animate-spin" />
                                Updating status…
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-2">
        <Icon size={12} className="text-white/25 mt-0.5 shrink-0" />
        <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest">{label}</div>
            <div className="text-[13px] text-white/75 mt-0.5">{value}</div>
        </div>
    </div>
)

// ── Stat Card (compact) ─────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, accent }) => (
    <div className="relative flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.015]
        hover:border-red-600/20 hover:bg-red-600/[0.03] transition-all duration-200">
        <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 shrink-0">
            <Icon size={15} />
        </div>
        <div className="min-w-0">
            <div className="flex items-center gap-2">
                <span className="font-['Orbitron',monospace] text-[18px] font-black text-white leading-none">{value}</span>
                {accent && <span className="font-['Orbitron',monospace] text-[8px] tracking-widest text-emerald-400">{accent}</span>}
            </div>
            <div className="text-[11px] text-white/40 tracking-wide truncate">{label}</div>
            {sub && <div className="text-[10px] text-white/25">{sub}</div>}
        </div>
    </div>
)

// ── Table column header ──────────────────────────────────────
const Th = ({ children, className = '' }) => (
    <th className={`px-4 py-3 text-left font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.18em] uppercase text-white/35 ${className}`}>
        {children}
    </th>
)

// ── MAIN PAGE ──────────────────────────────────────────────
export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [page, setPage] = useState(1)
    const PER_PAGE = 10

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/orders/all')
            setOrders(res.data?.orders ?? [])
        } catch (e) {
            setError('Failed to load orders. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = (id, newStatus) => {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o))
    }

    const filtered = orders.filter(o => {
        const q = search.toLowerCase()
        if (!q) return true
        return (
            o._id?.toLowerCase().includes(q) ||
            o.user?.username?.toLowerCase().includes(q) ||
            o.user?.email?.toLowerCase().includes(q) ||
            o.shippingAddress?.firstName?.toLowerCase().includes(q) ||
            o.shippingAddress?.lastName?.toLowerCase().includes(q) ||
            o.products?.some(i => i.title?.toLowerCase().includes(q))
        )
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        revenue: orders
            .filter(o => o.status !== 'cancelled')
            .reduce((acc, o) => acc + (o.totalAmount ?? 0), 0),
    }

    return (
        <div className="min-h-screen" style={{ background: '#050709', color: 'white' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
                @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
                .fade-in { animation: fadeIn 0.3s ease both; }
                ::-webkit-scrollbar { width: 4px; height: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(220,38,38,0.3); border-radius: 2px; }
            `}</style>

            <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent pointer-events-none z-10" />
            <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.07) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 fade-in">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="w-5 h-px bg-red-600/60" />
                            <Package size={10} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.28em] uppercase text-red-500/80">
                                Admin Panel
                            </span>
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.22em] text-white/20">/ Orders</span>
                        </div>
                        <h1 className="font-['Orbitron',monospace] font-black text-white leading-tight tracking-tight"
                            style={{ fontSize: 'clamp(22px, 3.5vw, 34px)' }}>
                            Order Management
                        </h1>
                        <p className="text-[13px] text-white/40 mt-2 tracking-wide">
                            {orders.length} total orders · Live tracking & status control
                        </p>
                    </div>
                    <button onClick={fetchOrders}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08]
                        text-white/50 hover:text-white hover:border-red-600/30 hover:bg-red-600/[0.05]
                        font-['Orbitron',monospace] text-[9px] tracking-widest uppercase transition-all duration-200 self-start">
                        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr mb-9 fade-in ">
                    <StatCard icon={Package} label="Total Orders" value={stats.total} />
                    <StatCard icon={Clock} label="Pending" value={stats.pending} />
                    <StatCard icon={RefreshCw} label="Processing" value={stats.processing} />
                    <StatCard icon={Truck} label="Shipped" value={stats.shipped} />
                    <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} />
                    <StatCard icon={TrendingUp} label="Revenue" value={`₨ ${(stats.revenue / 1000).toFixed(0)}K`} />
                </div>

                <div className={`${card} p-4 sm:p-5 mb-4 sm:mb-5`}>
                    <span className={shimmerLine} />
                    <div className="flex flex-col justify-center w-full gap-2">
                        <div className='flex gap-2 items-center'>
                            <Search size={12} className="text-red-500 shrink-0" />
                            <p className="font-['Orbitron',monospace] text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-white/35">
                                Search by orders ID, customers…
                            </p>
                        </div>
                        <div className="relative w-full fade-in">
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1) }}
                                placeholder="Search..."
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03]
                    text-[13px] text-white placeholder-white/25 tracking-wide
                    focus:outline-none focus:border-red-600/40 focus:bg-red-600/[0.04]
                    transition-all duration-200"
                            />
                            {search && (
                                <button onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden fade-in">
                    {loading ? (
                        <div className="p-4 space-y-2.5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[52px] rounded-lg border border-white/[0.04] bg-white/[0.01] animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-3 py-20">
                            <AlertCircle size={32} className="text-red-500/50" />
                            <p className="text-white/40 text-[13px]">{error}</p>
                            <button onClick={fetchOrders}
                                className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-600/25 text-red-400
                font-['Orbitron',monospace] text-[10px] tracking-widest uppercase hover:bg-red-600/20 transition-all">
                                Try Again
                            </button>
                        </div>
                    ) : paginated.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-24">
                            <Package size={36} className="text-white/15" />
                            <p className="font-['Orbitron',monospace] text-[10px] tracking-[0.28em] text-white/25 uppercase">
                                {search ? 'No orders match your search' : 'No orders yet'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="lg:hidden divide-y divide-white/[0.05]">
                                {paginated.map((order) => (
                                    <div
                                        key={order._id}
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-4 active:bg-red-600/[0.05] hover:bg-red-600/[0.04] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="min-w-0">
                                                <span className="font-['Orbitron',monospace] text-[12px] font-bold text-white tracking-wider">
                                                    #{order._id?.slice(-6).toUpperCase()}
                                                </span>
                                                <p className="text-[13px] text-white/75 font-medium truncate mt-1">
                                                    {customerName(order)}
                                                </p>
                                                <p className="text-[11px] text-white/30 truncate">
                                                    {customerEmail(order)}
                                                </p>
                                            </div>
                                            <StatusBadge status={order.status} />
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex -space-x-2 shrink-0">
                                                {order.products?.slice(0, 4).map((item, i) => (
                                                    <div key={i} className="w-7 h-7 rounded-md border-2 border-[#050709] overflow-hidden bg-white/[0.05]"
                                                        style={{ zIndex: 4 - i }}>
                                                        {item.image
                                                            ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                            : <div className="w-full h-full flex items-center justify-center"><Package size={10} className="text-white/20" /></div>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[12px] text-white/40 truncate">
                                                {order.products?.length ?? 0} item{order.products?.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                                            <div className="flex items-center gap-1.5 text-white/35 text-[11px]">
                                                <Calendar size={11} />
                                                {fmtDate(order.createdAt)}
                                            </div>
                                            <span className="font-['Orbitron',monospace] text-[14px] font-black text-white">
                                                {fmt(order.totalAmount ?? 0)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedOrder(order) }}
                                            className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-white/[0.08]
                            text-white/45 font-['Orbitron',monospace] text-[9px] tracking-widest uppercase
                            hover:border-red-600/40 hover:text-red-400 hover:bg-red-600/[0.06] transition-all"
                                        >
                                            <Eye size={12} /> View Details
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full min-w-[820px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/[0.07]">
                                            <Th>Order</Th>
                                            <Th>Customer</Th>
                                            <Th>Items</Th>
                                            <Th>Date</Th>
                                            <Th>Status</Th>
                                            <Th className="text-right">Total</Th>
                                            <Th className="text-center">View</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map((order, idx) => (
                                            <tr key={order._id}
                                                className={`group border-b border-white/[0.04] last:border-0 hover:bg-red-600/[0.04] transition-colors duration-150 cursor-pointer ${idx % 2 === 1 ? 'bg-white/[0.008]' : ''}`}
                                                onClick={() => setSelectedOrder(order)}>

                                                <td className="px-4 py-3.5">
                                                    <span className="font-['Orbitron',monospace] text-[11px] font-bold text-white tracking-wider">
                                                        #{order._id?.slice(-6).toUpperCase()}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3.5 max-w-[180px]">
                                                    <p className="text-[13px] text-white/75 font-medium truncate">
                                                        {customerName(order)}
                                                    </p>
                                                    <p className="text-[11px] text-white/30 truncate">
                                                        {customerEmail(order)}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-3.5 max-w-[220px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex -space-x-2 shrink-0">
                                                            {order.products?.slice(0, 3).map((item, i) => (
                                                                <div key={i} className="w-7 h-7 rounded-md border-2 border-[#050709] overflow-hidden bg-white/[0.05]"
                                                                    style={{ zIndex: 3 - i }}>
                                                                    {item.image
                                                                        ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                                        : <div className="w-full h-full flex items-center justify-center"><Package size={10} className="text-white/20" /></div>
                                                                    }
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-[12px] text-white/40 truncate">
                                                            {order.products?.length ?? 0} item{order.products?.length !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3.5">
                                                    <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
                                                        <Calendar size={11} />
                                                        {fmtDate(order.createdAt)}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3.5">
                                                    <StatusBadge status={order.status} />
                                                </td>

                                                <td className="px-4 py-3.5 text-right">
                                                    <span className="font-['Orbitron',monospace] text-[13px] font-black text-white">
                                                        {fmt(order.totalAmount ?? 0)}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3.5 text-center">
                                                    <button onClick={(e) => { e.stopPropagation(); setSelectedOrder(order) }}
                                                        className="inline-flex w-8 h-8 rounded-lg border border-white/[0.07]
                                        items-center justify-center text-white/35
                                        hover:border-red-600/40 hover:text-red-400 hover:bg-red-600/[0.08]
                                        transition-all duration-150">
                                                        <Eye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

            </div>

            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    )
}
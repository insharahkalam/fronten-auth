import { useState, useEffect } from 'react'
import {
    Package, Search, Filter, Eye, ChevronDown, ChevronUp,
    Truck, CheckCircle, Clock, XCircle, RefreshCw,
    MapPin, Phone, Mail, Calendar, DollarSign,
    ArrowUpRight, LayoutGrid, TrendingUp, ShieldCheck,
    User, Box, Hash, SlidersHorizontal, X, Download,
    ChevronLeft, ChevronRight, AlertCircle, Loader2
} from 'lucide-react'
import api from '../config/service'

// ── Status config ──────────────────────────────────────────
const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/25',
        dot: 'bg-amber-400',
        icon: Clock,
    },
    processing: {
        label: 'Processing',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/25',
        dot: 'bg-blue-400',
        icon: RefreshCw,
    },
    shipped: {
        label: 'Shipped',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/25',
        dot: 'bg-purple-400',
        icon: Truck,
    },
    delivered: {
        label: 'Delivered',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/25',
        dot: 'bg-emerald-400',
        icon: CheckCircle,
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/25',
        dot: 'bg-red-500',
        icon: XCircle,
    },
}

const ALL_STATUSES = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

// ── Helpers ────────────────────────────────────────────────
const fmt = (n) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n)

const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

const fmtTime = (d) =>
    new Date(d).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })

// ── Status Badge ───────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
    const Icon = cfg.icon
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
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08]"
                style={{ background: '#08080a' }}>

                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)' }} />

                {/* Header */}
                <div className="relative flex items-start justify-between p-6 border-b border-white/[0.06]">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.3em] uppercase text-red-500/80">
                                ORDER DETAILS
                            </span>
                            <span className="font-['Orbitron',monospace] text-[9px] text-white/20">/ {order._id?.slice(-8).toUpperCase()}</span>
                        </div>
                        <h2 className="font-['Orbitron',monospace] font-black text-white text-lg tracking-tight">
                            #{order.orderNumber ?? order._id?.slice(-6).toUpperCase()}
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

                    {/* Customer Info */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <User size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                Customer
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InfoRow icon={User} label="Name" value={order.customer?.name ?? order.shippingAddress?.fullName ?? '—'} />
                            <InfoRow icon={Mail} label="Email" value={order.customer?.email ?? '—'} />
                            <InfoRow icon={Phone} label="Phone" value={order.customer?.phone ?? order.shippingAddress?.phone ?? '—'} />
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

                    {/* Products */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Box size={13} className="text-red-500" />
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                Items Ordered
                            </span>
                        </div>
                        <div className="space-y-3">
                            {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/[0.07] bg-white/[0.03]">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package size={16} className="text-white/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] text-white font-medium truncate">{item.name}</p>
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

                        {/* Totals */}
                        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
                            {order.subtotal && (
                                <div className="flex justify-between text-[12px] text-white/40">
                                    <span>Subtotal</span><span>{fmt(order.subtotal)}</span>
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
                                <span className="font-['Orbitron',monospace] text-[18px] font-black text-white">{fmt(order.totalAmount ?? order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
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

                    {/* Update Status */}
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

// ── Order Row / Card ───────────────────────────────────────
const OrderRow = ({ order, onView }) => {
    const firstItem = order.items?.[0]

    return (
        <div className="group relative flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5
            rounded-2xl border border-white/[0.06] bg-white/[0.015]
            hover:border-red-600/25 hover:bg-red-600/[0.03]
            transition-all duration-200">

            {/* Product thumbnail(s) */}
            <div className="flex -space-x-2 shrink-0">
                {order.items?.slice(0, 3).map((item, i) => (
                    <div key={i} className="w-12 h-12 rounded-xl border-2 border-[#08080a] overflow-hidden bg-white/[0.05]"
                        style={{ zIndex: 3 - i }}>
                        {item.image
                            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><Package size={14} className="text-white/20" /></div>
                        }
                    </div>
                ))}
                {order.items?.length > 3 && (
                    <div className="w-12 h-12 rounded-xl border-2 border-[#08080a] bg-white/[0.05]
                        flex items-center justify-center font-['Orbitron',monospace] text-[9px] text-white/40">
                        +{order.items.length - 3}
                    </div>
                )}
            </div>

            {/* Main info */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <span className="font-['Orbitron',monospace] text-[11px] font-bold text-white tracking-wider">
                        #{order.orderNumber ?? order._id?.slice(-6).toUpperCase()}
                    </span>
                    <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] text-white/70 truncate font-medium">
                    {order.customer?.name ?? order.shippingAddress?.fullName ?? 'Customer'}
                </p>
                <p className="text-[12px] text-white/35 mt-0.5 truncate">
                    {order.items?.length ?? 0} item{order.items?.length !== 1 ? 's' : ''} ·{' '}
                    {firstItem?.name}{order.items?.length > 1 ? ` +${order.items.length - 1} more` : ''}
                </p>
            </div>

            {/* Meta */}
            <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 shrink-0">
                <div className="font-['Orbitron',monospace] text-[15px] font-black text-white">
                    {fmt(order.totalAmount ?? order.total ?? 0)}
                </div>
                <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                    <Calendar size={11} />
                    {fmtDate(order.createdAt)}
                </div>
            </div>

            {/* View button */}
            <button onClick={() => onView(order)}
                className="shrink-0 w-9 h-9 rounded-xl border border-white/[0.07]
                flex items-center justify-center text-white/35
                hover:border-red-600/40 hover:text-red-400 hover:bg-red-600/[0.06]
                transition-all duration-200">
                <Eye size={15} />
            </button>
        </div>
    )
}

// ── Stat Card ──────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, accent }) => (
    <div className="relative flex flex-col justify-between p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015]
        hover:border-red-600/20 hover:bg-red-600/[0.03] transition-all duration-200 group overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)' }} />
        <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500">
                <Icon size={15} />
            </div>
            {accent && <span className="font-['Orbitron',monospace] text-[9px] tracking-widest text-emerald-400">{accent}</span>}
        </div>
        <div>
            <div className="font-['Orbitron',monospace] text-[26px] font-black text-white leading-none mb-1">{value}</div>
            <div className="text-[12px] text-white/40 tracking-wide">{label}</div>
            {sub && <div className="text-[11px] text-white/25 mt-0.5">{sub}</div>}
        </div>
    </div>
)

// ── MAIN PAGE ──────────────────────────────────────────────
export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
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
            const res = await api.get('/orders/admin/all')
            setOrders(res.data?.orders ?? res.data ?? [])
        } catch (e) {
            setError('Failed to load orders. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = (id, newStatus) => {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o))
    }

    // Filter + search
    const filtered = orders.filter(o => {
        const matchStatus = statusFilter === 'all' || o.status === statusFilter
        const q = search.toLowerCase()
        const matchSearch = !q ||
            o._id?.toLowerCase().includes(q) ||
            o.orderNumber?.toLowerCase().includes(q) ||
            o.customer?.name?.toLowerCase().includes(q) ||
            o.shippingAddress?.fullName?.toLowerCase().includes(q) ||
            o.customer?.email?.toLowerCase().includes(q) ||
            o.items?.some(i => i.name?.toLowerCase().includes(q))
        return matchStatus && matchSearch
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    // Stats
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        revenue: orders
            .filter(o => o.status !== 'cancelled')
            .reduce((acc, o) => acc + (o.totalAmount ?? o.total ?? 0), 0),
    }

    return (
        <div className="min-h-screen" style={{ background: '#050709', color: 'white' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
                @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
                .fade-in { animation: fadeIn 0.35s ease both; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(220,38,38,0.3); border-radius: 2px; }
            `}</style>

            {/* Top ambient glow */}
            <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent pointer-events-none z-10" />
            <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.07) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 fade-in">
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
                            style={{ fontSize: 'clamp(24px, 4vw, 38px)' }}>
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

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 fade-in">
                    <StatCard icon={Package} label="Total Orders" value={stats.total} />
                    <StatCard icon={Clock} label="Pending" value={stats.pending} accent={stats.pending > 0 ? 'ACTION' : ''} />
                    <StatCard icon={RefreshCw} label="Processing" value={stats.processing} />
                    <StatCard icon={Truck} label="Shipped" value={stats.shipped} />
                    <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} />
                    <StatCard icon={TrendingUp} label="Revenue" value={`₨${(stats.revenue / 1000).toFixed(0)}K`} sub="excl. cancelled" />
                </div>

                {/* ── Filters & Search ── */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 fade-in">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1) }}
                            placeholder="Search by order ID, customer, product…"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03]
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

                    {/* Status filter tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        {ALL_STATUSES.map(s => {
                            const cfg = STATUS_CONFIG[s]
                            const active = statusFilter === s
                            const count = s === 'all' ? orders.length : orders.filter(o => o.status === s).length
                            return (
                                <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
                                    className={`shrink-0 px-3 py-2 rounded-xl border text-[10px] font-['Orbitron',monospace] font-bold tracking-[0.15em] uppercase transition-all duration-200
                                    ${active
                                            ? s === 'all'
                                                ? 'bg-red-600/20 border-red-600/50 text-red-400'
                                                : `${cfg.bg} ${cfg.color} border-current`
                                            : 'border-white/[0.07] text-white/30 hover:text-white/60 hover:border-white/15'
                                        }`}>
                                    {s === 'all' ? 'All' : cfg.label}
                                    <span className="ml-1.5 opacity-60">({count})</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* ── Orders List ── */}
                <div className="space-y-2.5 fade-in">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-[88px] rounded-2xl border border-white/[0.04] bg-white/[0.01] animate-pulse" />
                        ))
                    ) : error ? (
                        <div className="flex flex-col items-center gap-3 py-20 border border-dashed border-white/[0.07] rounded-3xl">
                            <AlertCircle size={32} className="text-red-500/50" />
                            <p className="text-white/40 text-[13px]">{error}</p>
                            <button onClick={fetchOrders}
                                className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-600/25 text-red-400
                                font-['Orbitron',monospace] text-[10px] tracking-widest uppercase hover:bg-red-600/20 transition-all">
                                Try Again
                            </button>
                        </div>
                    ) : paginated.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-24 border border-dashed border-white/[0.07] rounded-3xl">
                            <Package size={36} className="text-white/15" />
                            <p className="font-['Orbitron',monospace] text-[10px] tracking-[0.28em] text-white/25 uppercase">
                                {search || statusFilter !== 'all' ? 'No orders match your filter' : 'No orders yet'}
                            </p>
                        </div>
                    ) : (
                        paginated.map(order => (
                            <OrderRow key={order._id} order={order} onView={setSelectedOrder} />
                        ))
                    )}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.05]">
                        <span className="text-[12px] text-white/30">
                            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="w-8 h-8 rounded-lg border border-white/[0.07] flex items-center justify-center
                                text-white/40 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-lg border font-['Orbitron',monospace] text-[11px] font-bold transition-all
                                    ${page === p
                                            ? 'bg-red-600/20 border-red-600/50 text-red-400'
                                            : 'border-white/[0.07] text-white/30 hover:text-white hover:border-white/20'
                                        }`}>
                                    {p}
                                </button>
                            ))}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                className="w-8 h-8 rounded-lg border border-white/[0.07] flex items-center justify-center
                                text-white/40 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Order Detail Modal ── */}
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


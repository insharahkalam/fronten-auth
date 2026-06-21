import { useState, useEffect, useMemo } from 'react'
import {
  Package, Check, Clock, CheckCircle, Truck, MapPin, XCircle,
  ShoppingBag, ChevronDown, ChevronUp, Calendar, CreditCard,
  Hash, Star, Search, Filter, ArrowRight, RotateCcw, FileText,
  PackageCheck, Home, AlertCircle, RefreshCw
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../config/service'

const STATUS_CONFIG = {
  pending: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/25', icon: Clock, step: 1, label: 'Order Placed' },
  processing: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/25', icon: CheckCircle, step: 2, label: 'Processing' },
  shipped: { color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/25', icon: Truck, step: 3, label: 'Shipped' },
  delivered: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', icon: PackageCheck, step: 4, label: 'Delivered' },
  cancelled: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/25', icon: XCircle, step: 0, label: 'Cancelled' },
}

const FILTER_OPTIONS = ['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']
const PROGRESS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: ShoppingBag },
  { key: 'processing', label: 'Processing', icon: CheckCircle },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
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

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      ${cfg.bg} ${cfg.border} border
      font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.1em] uppercase ${cfg.color}`}>
      <Icon size={10} strokeWidth={2} />
      {status}
    </span>
  )
}

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [cancellingId, setCancellingId] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/orders/my-orders')
      console.log(res, "orders response check")
      console.log(res.data, "orders response check")
      const data = res.data?.orders ?? []
      setOrders(data)
      if (data.length > 0) setExpanded(data[0]._id)
    } catch (e) {
      setError('Failed to load your orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return
    setCancellingId(orderId)
    try {
      await api.put(`/orders/${orderId}/cancel`)
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'cancelled' } : o))
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to cancel order")
    } finally {
      setCancellingId(null)
    }
  }

  const filtered = useMemo(() => orders.filter((order) => {
    const query = search.trim().toLowerCase()
    return (filter === 'All' || order.status === filter) &&
      (!query ||
        order._id?.toLowerCase().includes(query) ||
        order.products?.some((item) => item.title?.toLowerCase().includes(query)))
  }), [filter, search, orders])

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
    { label: 'In Transit', value: orders.filter((o) => ['processing', 'shipped'].includes(o.status)).length, icon: Truck },
    { label: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length, icon: PackageCheck },
    { label: 'Total Spent', value: `Rs. ${orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0).toLocaleString()}`, icon: CreditCard },
  ]

  const toggle = (id) => setExpanded(e => e === id ? null : id)

  const inputCls = `bg-white/[0.04] border border-white/[0.08] rounded-xl
    text-white placeholder:text-white/20 tracking-wide
    font-['Rajdhani',sans-serif] outline-none
    focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10
    transition-all duration-200`

  return (
    <div className="noise min-h-screen bg-[#05080a] font-['Rajdhani',sans-serif] text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.35s ease both; }
        @keyframes ordFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .ord-fade { animation: ordFadeUp 0.4s ease both; }
        .ord-scroll::-webkit-scrollbar { height: 6px; }
        .ord-scroll::-webkit-scrollbar-track { background: transparent; }
        .ord-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* ── Header ── */}
        <div className="mb-8 sm:mb-10 ord-fade">
          <SectionEyebrow icon={ShoppingBag} text="Account · Order History" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-['Orbitron',monospace] font-black text-[26px] sm:text-[36px]
                text-white leading-none tracking-tight mb-3">
                MY ORDERS
              </h1>
              <p className="text-[13px] sm:text-[14px] tracking-wide text-white/30">
                Track shipments, view invoices, and manage your purchase history.
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
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 ord-fade" style={{ animationDelay: '60ms' }}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label}
              className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 group
                hover:border-red-600/25 hover:bg-red-600/[0.04] transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0 flex items-center justify-center
                bg-red-600/10 border border-red-600/20 text-red-500
                group-hover:bg-red-600/15 group-hover:border-red-600/35 transition-all duration-300">
                <Icon size={15} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="font-['Orbitron',monospace] text-[15px] sm:text-[19px] font-black
                  text-white leading-none mb-1 truncate">
                  {value}
                </p>
                <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em]
                  uppercase text-white/25 truncate">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search & Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 ord-fade" style={{ animationDelay: '120ms' }}>
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search order ID or product…"
              className={`${inputCls} w-full pl-9 pr-4 py-3 text-[13px]`}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto ord-scroll pb-1 sm:pb-0">
            {FILTER_OPTIONS.map(option => {
              const active = filter === option
              return (
                <button key={option}
                  onClick={() => setFilter(option)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                    font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                    border transition-all duration-200
                    ${active
                      ? 'bg-red-600/10 border-red-600/30 text-red-400'
                      : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60 hover:border-white/[0.14]'
                    }`}>
                  {option === 'All' && <Filter size={10} />}
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Orders List ── */}
        <div className="space-y-5">

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[140px] rounded-2xl border border-white/[0.06] bg-white/[0.015] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-20 border border-dashed border-white/[0.07] rounded-3xl">
              <AlertCircle size={28} className="text-red-500/50" />
              <p className="text-white/40 text-[13px]">{error}</p>
              <button onClick={fetchOrders}
                className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-600/25 text-red-400
                font-['Orbitron',monospace] text-[10px] tracking-widest uppercase hover:bg-red-600/20 transition-all">
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4
              border border-dashed border-white/[0.07] rounded-3xl bg-white/[0.01]">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                flex items-center justify-center">
                <Package size={24} className="text-white/15" />
              </div>
              <div className="text-center">
                <p className="font-['Orbitron',monospace] text-[12px] font-bold tracking-widest
                  uppercase text-white/40 mb-2">No Orders Found</p>
                <p className="text-[13px] text-white/20 tracking-wide">
                  {orders.length === 0 ? "You haven't placed any orders yet." : "Try adjusting your filters or search."}
                </p>
              </div>
            </div>
          ) : filtered.map((order, index) => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
            const isOpen = expanded === order._id
            const itemCount = order.products?.reduce((s, i) => s + i.quantity, 0) ?? 0

            return (
              <div key={order._id}
                className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                  rounded-2xl transition-all duration-300 hover:border-white/[0.11] ord-fade"
                style={{ animationDelay: `${index * 60}ms` }}>

                <div className="absolute top-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

                {/* ── Order Strip Header ── */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-6 py-4
                  border-b border-white/[0.05] bg-white/[0.012]">
                  <div className="flex items-center gap-2">
                    <Hash size={10} className="text-red-500" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Order
                      </p>
                      <p className="font-['Orbitron',monospace] text-[11px] font-bold tracking-[0.08em] text-white">
                        #{order._id?.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={10} className="text-white/20" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Placed On
                      </p>
                      <p className="text-[12px] text-white/55 tracking-wide">{fmtDate(order.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={10} className="text-white/20" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Payment
                      </p>
                      <p className="text-[12px] text-white/55 tracking-wide">
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <div className="text-right">
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Order Total
                      </p>
                      <p className="font-['Orbitron',monospace] text-[14px] font-black text-white">
                        Rs. {order.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-6">

                    {/* Product thumbnails + summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-4">
                        {order.products?.slice(0, 4).map((item, i) => (
                          <div key={i}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0 overflow-hidden
                              bg-white/[0.04] border border-white/[0.07] flex items-center justify-center relative">
                            {item.image
                              ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              : <Package size={20} className="text-white/15" />
                            }
                            {item.quantity > 1 && (
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md
                                bg-black/70 font-['Orbitron',monospace] text-[8px] font-bold text-white/70">
                                ×{item.quantity}
                              </span>
                            )}
                          </div>
                        ))}
                        {order.products?.length > 4 && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0
                            bg-white/[0.02] border border-dashed border-white/[0.1]
                            flex items-center justify-center
                            font-['Orbitron',monospace] text-[11px] font-bold text-white/30">
                            +{order.products.length - 4}
                          </div>
                        )}
                      </div>

                      <p className="text-[13px] text-white/45 tracking-wide leading-relaxed">
                        <span className="text-white font-semibold">{order.products?.[0]?.title}</span>
                        {order.products?.length > 1 && (
                          <> and <span className="text-white/60">{order.products.length - 1} other item{order.products.length > 2 ? 's' : ''}</span></>
                        )}
                        {' '}· {itemCount} unit{itemCount !== 1 ? 's' : ''} total
                      </p>

                      <p className={`mt-2 inline-flex items-center gap-1.5 font-['Orbitron',monospace]
                        text-[9px] font-bold tracking-[0.12em] uppercase ${cfg.color}`}>
                        <cfg.icon size={11} />
                        {cfg.label}
                      </p>
                    </div>

                    {/* ── Tracking Timeline ── */}
                    {order.status !== 'cancelled' && (
                      <div className="lg:w-[340px] shrink-0 lg:pl-6 lg:border-l border-white/[0.05]">
                        <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.18em]
                          uppercase text-white/25 mb-4">Shipment Progress</p>

                        <div className="relative">
                          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/[0.06]" />
                          <div
                            className="absolute left-[13px] top-2 w-px bg-gradient-to-b from-red-600 to-red-400/40 transition-all duration-700"
                            style={{ height: `${(Math.max(cfg.step - 1, 0) / (PROGRESS_STEPS.length - 1)) * 100}%` }}
                          />

                          <div className="space-y-4">
                            {PROGRESS_STEPS.map((step, i) => {
                              const reached = cfg.step >= i + 1
                              const active = cfg.step === i + 1
                              const StepIcon = step.icon
                              return (
                                <div key={step.key} className="flex items-center gap-3 relative z-10">
                                  <div className={`w-7 h-7 rounded-full border-2 shrink-0 flex items-center justify-center
                                    transition-all duration-300
                                    ${active
                                      ? 'bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                                      : reached
                                        ? 'bg-red-600/30 border-red-600/60 text-red-300'
                                        : 'bg-[#05080a] border-white/[0.1] text-white/20'
                                    }`}>
                                    {reached ? <Check size={11} /> : <StepIcon size={11} />}
                                  </div>
                                  <span className={`font-['Rajdhani',sans-serif] text-[12.5px] font-semibold tracking-wide
                                    ${active ? 'text-red-400' : reached ? 'text-white/55' : 'text-white/20'}`}>
                                    {step.label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Action Bar ── */}
                  <div className="mt-5 pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row
                    items-center justify-between gap-3">
                    <button
                      onClick={() => toggle(order._id)}
                      className="inline-flex items-center gap-2
                        font-['Orbitron',monospace] text-[9px] tracking-[0.2em] uppercase
                        text-white/30 hover:text-white/60 transition-colors duration-200">
                      {isOpen ? 'Hide Full Invoice' : 'View Full Invoice'}
                      {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {order.status === 'delivered' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          bg-gradient-to-br from-red-600 to-red-700 text-white
                          shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                          hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
                          transition-all duration-200">
                          <Star size={12} /> Leave Review
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          bg-gradient-to-br from-red-600 to-red-700 text-white
                          shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                          hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
                          transition-all duration-200">
                          <Truck size={12} /> Track Package <ArrowRight size={11} />
                        </button>
                      )}
                      {order.status === 'cancelled' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          border border-white/[0.09] text-white/35
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          hover:border-red-600/35 hover:text-red-400 hover:bg-red-600/[0.05]
                          transition-all duration-200">
                          <RotateCcw size={12} /> Reorder
                        </button>
                      )}
                      {!['delivered', 'cancelled'].includes(order.status) && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          disabled={cancellingId === order._id}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
      border border-white/[0.09] text-white/35
      font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
      hover:border-red-600/35 hover:text-red-400 hover:bg-red-600/[0.05]
      disabled:opacity-40 transition-all duration-200">
                          <XCircle size={12} /> {cancellingId === order._id ? 'Cancelling…' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Expanded Invoice ── */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 -mt-1">
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5">

                      <div className="flex items-center gap-2 mb-4">
                        <FileText size={11} className="text-red-500" />
                        <p className="font-['Orbitron',monospace] text-[9px] tracking-[0.18em]
                          uppercase text-white/30">Invoice Breakdown</p>
                      </div>

                      <div className="space-y-2.5 mb-4">
                        {order.products?.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden
                              bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                              {item.image
                                ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                : <Package size={15} className="text-white/15" />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold text-white truncate tracking-wide">
                                {item.title}
                              </p>
                              <p className="text-[11.5px] text-white/30 mt-0.5">
                                Rs. {item.price?.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                            <div className="shrink-0 font-['Orbitron',monospace] text-[12px] font-bold text-white/70">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="h-px bg-white/[0.06] mb-4" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin size={10} className="text-red-500" />
                            <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.16em]
                              uppercase text-white/25">Shipping Address</p>
                          </div>
                          <p className="text-[12.5px] text-white/50 tracking-wide leading-snug">
                            {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-white/30 tracking-wide">Subtotal</span>
                            <span className="text-white/60 font-['Rajdhani',sans-serif] font-semibold">
                              Rs. {order.subtotal?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-white/30 tracking-wide">Tax</span>
                            <span className="text-white/60 font-['Rajdhani',sans-serif] font-semibold">
                              Rs. {order.tax?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-white/30 tracking-wide">Shipping</span>
                            <span className="text-emerald-400 font-['Rajdhani',sans-serif] font-semibold">
                              {order.shippingFee === 0 ? 'Free' : `Rs. ${order.shippingFee?.toLocaleString()}`}
                            </span>
                          </div>
                          <div className="h-px bg-white/[0.06] my-1.5" />
                          <div className="flex items-center justify-between">
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.16em] uppercase text-white/40">
                              Total
                            </span>
                            <span className="font-['Orbitron',monospace] text-[15px] font-black text-white">
                              Rs. {order.totalAmount?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
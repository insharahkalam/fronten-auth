import { useState, useEffect } from 'react'
import {
  Package, Clock, CheckCircle, Truck, MapPin, XCircle,
  ShoppingBag, ChevronDown, ChevronUp, Calendar, CreditCard,
  Home, Hash, Star, ArrowRight, Search
} from 'lucide-react'
// import api from '../config/service'

const STATUS_CONFIG = {
  Pending:           { color: 'text-amber-300',   bg: 'bg-amber-400/10',   border: 'border-amber-400/30', icon: Clock,       step: 1 },
  Confirmed:         { color: 'text-sky-300',     bg: 'bg-sky-400/10',     border: 'border-sky-400/30',   icon: CheckCircle, step: 2 },
  Processing:        { color: 'text-violet-300',  bg: 'bg-violet-400/10',  border: 'border-violet-400/30',icon: Package,     step: 3 },
  Shipped:           { color: 'text-cyan-300',    bg: 'bg-cyan-400/10',    border: 'border-cyan-400/30',  icon: Truck,       step: 4 },
  'Out for Delivery':{ color: 'text-orange-300',  bg: 'bg-orange-400/10',  border: 'border-orange-400/30',icon: MapPin,      step: 5 },
  Delivered:         { color: 'text-emerald-300', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30',icon: Star,       step: 6 },
  Cancelled:         { color: 'text-red-300',     bg: 'bg-red-500/10',     border: 'border-red-500/30',   icon: XCircle,     step: 0 },
}

const STEPS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']

const MOCK_ORDERS = [
  {
    _id: 'ORD-2025-001',
    createdAt: '2025-06-01T10:30:00Z',
    status: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: 'TRK-789456123',
    totalAmount: 12500,
    deliveryAddress: { street: '14 Commerce Square', city: 'Karachi', province: 'Sindh', zip: '75000' },
    products: [
      { _id: 'p1', title: 'Wireless Noise-Cancelling Headphones', image: null, price: 8500, qty: 1 },
      { _id: 'p2', title: 'USB-C Fast Charging Cable (2m)', image: null, price: 2000, qty: 2 },
    ],
  },
  {
    _id: 'ORD-2025-002',
    createdAt: '2025-05-28T14:15:00Z',
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK-456123789',
    totalAmount: 4800,
    deliveryAddress: { street: '22 Clifton Block 5', city: 'Karachi', province: 'Sindh', zip: '75600' },
    products: [{ _id: 'p3', title: "Running Shoes — Men's Pro Series", image: null, price: 4800, qty: 1 }],
  },
  {
    _id: 'ORD-2025-003',
    createdAt: '2025-05-20T09:00:00Z',
    status: 'Cancelled',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: null,
    totalAmount: 3200,
    deliveryAddress: { street: '5 Garden Road', city: 'Lahore', province: 'Punjab', zip: '54000' },
    products: [{ _id: 'p4', title: 'Skincare Essentials Gift Set', image: null, price: 3200, qty: 1 }],
  },
]

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}

function ProgressBar({ status }) {
  const cfg = STATUS_CONFIG[status]
  if (!cfg || status === 'Cancelled') return null
  const currentStep = cfg.step
  const pct = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="px-1 py-2">
      <div className="relative">
        <div className="absolute left-3 right-3 top-3 h-[2px] rounded-full bg-white/10" />
        <div
          className="absolute left-3 top-3 h-[2px] rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 transition-all duration-700"
          style={{ width: `calc((100% - 1.5rem) * ${pct / 100})` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((step, i) => {
            const done = i + 1 <= currentStep
            const active = i + 1 === currentStep
            return (
              <div key={step} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
                    done
                      ? 'border-red-400 bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                      : 'border-white/15 bg-zinc-900 text-white/40'
                  } ${active ? 'scale-110 ring-2 ring-red-500/40' : ''}`}
                >
                  {done ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`hidden text-center text-[10px] font-medium uppercase tracking-wider sm:block ${done ? 'text-white/80' : 'text-white/35'}`}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SectionEyebrow({ icon: Icon, text }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
        <Icon className="h-3 w-3 text-red-400" />
        {text}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  )
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Replace this with your real API call:
    // api.get('/orders').then(res => { setOrders(res.data); setLoading(false) })
    const t = setTimeout(() => {
      setOrders(MOCK_ORDERS)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const toggle = (id) => setExpanded((e) => (e === id ? null : id))

  const stats = {
    total: orders.length,
    active: orders.filter((o) => !['Delivered', 'Cancelled'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
    spent: orders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.totalAmount, 0),
  }

  const filtered = orders.filter((o) => {
    const matchesFilter = filter === 'All' || o.status === filter
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      o._id.toLowerCase().includes(q) ||
      o.products.some((p) => p.title.toLowerCase().includes(q))
    return matchesFilter && matchesQuery
  })

  const filterChips = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0c] text-white" style={{ fontFamily: "'Rajdhani', system-ui, sans-serif" }}>
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-red-600/20 blur-[140px]" />
        <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        .fade-up { animation: fadeUp .45s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        .sk { background: linear-gradient(90deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 100%); background-size: 200% 100%; animation: shimmer 1.6s linear infinite; border-radius: 16px; }
        .display { font-family: 'Orbitron', sans-serif; letter-spacing: .04em; }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Header */}
        <header className="fade-up mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/60 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Order Center
          </div>
          <h1 className="display bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
            My Orders
          </h1>
          <p className="mt-2 max-w-xl text-base text-white/55">
            Track shipments, review past purchases and manage everything you've ordered — all in one place.
          </p>

          {/* Stat cards */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total Orders', value: stats.total, icon: ShoppingBag, color: 'text-white' },
              { label: 'In Transit', value: stats.active, icon: Truck, color: 'text-cyan-300' },
              { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'text-emerald-300' },
              { label: 'Total Spent', value: `Rs. ${stats.spent.toLocaleString()}`, icon: CreditCard, color: 'text-red-300' },
            ].map((s) => {
              const Ic = s.icon
              return (
                <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.05]">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-red-500/10 blur-2xl transition group-hover:bg-red-500/20" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{s.label}</div>
                      <div className={`display mt-1.5 text-xl font-bold sm:text-2xl ${s.color}`}>{s.value}</div>
                    </div>
                    <Ic className="h-4 w-4 text-white/40" />
                  </div>
                </div>
              )
            })}
          </div>
        </header>

        {/* Search + Filters */}
        {!loading && orders.length > 0 && (
          <div className="fade-up mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by order ID or product..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur transition focus:border-red-500/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filterChips.map((c) => {
                const active = filter === c
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                      active
                        ? 'border-red-500/50 bg-red-500/15 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.25)]'
                        : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="sk h-28" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="fade-up rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-red-500/15 to-rose-500/5">
              <ShoppingBag className="h-9 w-9 text-red-300" />
            </div>
            <h2 className="display text-2xl font-bold text-white">
              {orders.length === 0 ? 'No Orders Yet' : 'No Matching Orders'}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
              {orders.length === 0
                ? "You haven't placed any orders yet. Start exploring our catalog and your purchases will appear here."
                : "Try adjusting your filters or search query to find what you're looking for."}
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_30px_-10px_rgba(239,68,68,0.7)] transition hover:scale-[1.02] hover:shadow-[0_14px_36px_-10px_rgba(239,68,68,0.9)]">
              <ShoppingBag className="h-4 w-4" />
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Order list */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((order, idx) => {
              const isOpen = expanded === order._id
              const date = new Date(order.createdAt).toLocaleDateString('en-PK', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
              const itemCount = order.products.reduce((s, p) => s + p.qty, 0)

              return (
                <article
                  key={order._id}
                  className="fade-up group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl transition hover:border-white/20"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />

                  {/* Card Header */}
                  <button
                    onClick={() => toggle(order._id)}
                    className="flex w-full flex-col gap-4 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                      {/* Order ID + Date */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Hash className="h-3.5 w-3.5 text-red-400" />
                          <span className="display text-sm font-bold tracking-wider text-white">{order._id}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/45">
                          <Calendar className="h-3 w-3" />
                          {date}
                          <span className="mx-1.5 text-white/20">•</span>
                          <span>
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="sm:ml-auto">
                        <StatusBadge status={order.status} />
                      </div>

                      {/* Total */}
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Total</div>
                        <div className="display text-lg font-bold text-white">
                          Rs. {order.totalAmount?.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition group-hover:border-red-500/40 group-hover:text-red-300">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="fade-up border-t border-white/5 px-5 pb-6 pt-2 sm:px-6">
                      {/* Progress */}
                      <div className="mb-6">
                        <SectionEyebrow icon={Truck} text="Order Progress" />
                        <ProgressBar status={order.status} />
                      </div>

                      {/* Products */}
                      <SectionEyebrow icon={Package} text="Items Ordered" />
                      <div className="mb-6 space-y-2">
                        {order.products.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.04]"
                          >
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                              {item.image ? (
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                              ) : (
                                <Package className="h-6 w-6 text-white/30" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-white">{item.title}</div>
                              <div className="mt-0.5 text-xs text-white/45">
                                Qty {item.qty} · Rs. {item.price?.toLocaleString()} each
                              </div>
                            </div>
                            <div className="display shrink-0 text-sm font-bold text-white">
                              Rs. {(item.price * item.qty)?.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer grid */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
                            <CreditCard className="h-3 w-3 text-red-400" />
                            Payment
                          </div>
                          <div className="text-sm font-semibold text-white">{order.paymentMethod}</div>
                          <div className="display mt-1 text-lg font-bold text-red-300">
                            Rs. {order.totalAmount?.toLocaleString()}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
                            <Home className="h-3 w-3 text-red-400" />
                            Delivery To
                          </div>
                          <div className="text-sm font-medium text-white/85">{order.deliveryAddress?.street}</div>
                          <div className="text-xs text-white/50">
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.province} {order.deliveryAddress?.zip}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
                            <Truck className="h-3 w-3 text-red-400" />
                            Tracking
                          </div>
                          {order.trackingNumber ? (
                            <>
                              <div className="display text-sm font-bold text-white">{order.trackingNumber}</div>
                              <button className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-red-300 hover:text-red-200">
                                Track shipment <ArrowRight className="h-3 w-3" />
                              </button>
                            </>
                          ) : (
                            <div className="text-sm text-white/50">Not assigned yet</div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-white/25 hover:bg-white/[0.08]">
                          View Invoice
                        </button>
                        {order.status === 'Delivered' && (
                          <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.6)] transition hover:scale-[1.02]">
                            <Star className="h-3.5 w-3.5" />
                            Leave Review
                          </button>
                        )}
                        {!['Delivered', 'Cancelled'].includes(order.status) && (
                          <button className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-300 transition hover:bg-red-500/20">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

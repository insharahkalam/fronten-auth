// // import { useState, useMemo } from 'react'
// // import {
// //   Package, Check, Clock, CheckCircle, Truck, MapPin, XCircle,
// //   ShoppingBag, ChevronDown, ChevronUp, Calendar, CreditCard,
// //   Hash, Star, Search, Filter
// // } from 'lucide-react'
// // import Navbar from '../../components/Navbar'
// // import Footer from '../../components/Footer'

// // export default function Orders() {

// //   const statusConfig = {
// //     Pending: { icon: Clock, step: 1 },
// //     Confirmed: { icon: CheckCircle, step: 2 },
// //     Shipped: { icon: Truck, step: 3 },
// //     Delivered: { icon: Package, step: 4 },
// //     Cancelled: { icon: XCircle, step: 0 },
// //   };

// //   const FONT_LINK = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap"

// //   const NOISE_BG = "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")"


// //   const orders = [
// //     { id: "ORD-78A2F1", status: "Shipped", createdAt: "10 Jun 2025", total: 12499, paymentMethod: "Card", address: "221B Baker Street, London", items: [{ name: "Cyber Hoodie", qty: 1, price: 4999 }, { name: "Neon Sneakers", qty: 1, price: 7500 }] },
// //     { id: "ORD-552C90", status: "Delivered", createdAt: "22 May 2025", total: 3200, paymentMethod: "COD", address: "Sector 17, Chandigarh", items: [{ name: "Tactical Cap", qty: 2, price: 1600 }] },
// //     { id: "ORD-119BB7", status: "Pending", createdAt: "13 Jun 2025", total: 899, paymentMethod: "UPI", address: "MG Road, Bangalore", items: [{ name: "Carbon Wallet", qty: 1, price: 899 }] },
// //   ];

// //   const filterOptions = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
// //   const progressSteps = ["Pending", "Confirmed", "Shipped", "Delivered"];


// //   const [expanded, setExpanded] = useState(orders[0]?.id ?? null);
// //   const [filter, setFilter] = useState("All");
// //   const [search, setSearch] = useState("");

// //   const filtered = useMemo(() => orders.filter((order) => {
// //     const query = search.trim().toLowerCase();
// //     return (filter === "All" || order.status === filter) &&
// //       (!query || order.id.toLowerCase().includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query)));
// //   }), [filter, search]);

// //   const stats = [
// //     { label: "Total orders", value: orders.length, icon: ShoppingBag },
// //     { label: "In transit", value: orders.filter((o) => ["Confirmed", "Shipped"].includes(o.status)).length, icon: Truck },
// //     { label: "Delivered", value: orders.filter((o) => o.status === "Delivered").length, icon: CheckCircle },
// //     { label: "Total spent", value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: CreditCard },
// //   ];


// //   return (
// //     <div className="noise min-h-screen bg-black text-neutral-200 font-rajdhani relative overflow-hidden">
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
// //         .font-orbitron { font-family: 'Orbitron', monospace; }
// //         .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
// //         @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
// //         .fade-in { animation: fadeIn 0.35s ease both; }
// //         .noise::before {
// //           content:'';position:fixed;inset:0;
// //           background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
// //           pointer-events:none;z-index:0;opacity:0.35;
// //         }
// //         .noise::after {
// //           content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;
// //           background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);
// //           pointer-events:none;z-index:0;
// //         }
// //       `}</style>

// //       {/* noise + red glow */}
// //       <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: NOISE_BG, opacity: 0.4 }} />
// //       <div className="pointer-events-none fixed -top-1/4 -left-1/4 w-[60%] h-[60%] z-0"
// //         style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.10) 0%, transparent 70%)' }} />
// //       <div className="pointer-events-none fixed -bottom-1/4 -right-1/4 w-[60%] h-[60%] z-0"
// //         style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />

// //       <style>{`
// //         @keyframes ordFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
// //         @keyframes ordPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
// //         .ord-fade { animation: ordFadeUp 0.4s ease both; }
// //         .ord-pulse { animation: ordPulse 2s ease-in-out infinite; }
// //         .ord-scroll::-webkit-scrollbar { width: 6px; }
// //         .ord-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
// //       `}</style>

// //       <Navbar />
// //       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
// //         {/* HEADER */}

// //         <div className="mb-12 border-b border-neutral-900 pb-8">
// //           <div className="flex items-center gap-3 mb-3">
// //             <span className="h-px w-8 bg-red-600" />
// //             <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase">
// //               [ 03 ] / Track Order
// //             </p>
// //           </div>
// //           <div className="flex items-end justify-between flex-wrap gap-4">
// //             <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
// //               My <span className="text-red-600">ORDERS</span>
// //             </h1>

// //           </div>
// //         </div>


// //         {/* Stats */}
// //         <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
// //           {stats.map(({ label, value, icon: Icon }) => (
// //             <article key={label} className="group border border-border bg-card/75 p-4 backdrop-blur-sm transition hover:border-primary/60 sm:p-5">
// //               <div className="flex items-start justify-between gap-3">
// //                 <div className="min-w-0">
// //                   <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
// //                   <p className="mt-3 font-display text-xl font-bold sm:text-3xl">{value}</p>
// //                 </div>
// //                 <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-secondary text-primary">
// //                   <Icon className="h-4 w-4" />
// //                 </span>
// //               </div>
// //             </article>
// //           ))}
// //         </section>

// //         {/* Search & Filter */}
// //         <section className="mt-8 space-y-4 border-y border-border py-5">
// //           <label className="relative block">
// //             <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search order ID or product..."
// //               className="h-12 w-full rounded-lg border border-input bg-card/80 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
// //             />
// //           </label>
// //           <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
// //             {filterOptions.map((option) => (
// //               <button
// //                 key={option}
// //                 type="button"
// //                 size="sm"
// //                 variant={filter === option ? "default" : "outline"}
// //                 onClick={() => setFilter(option)}
// //                 className="shrink-0 uppercase tracking-widest"
// //               >
// //                 {option}
// //               </button>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Orders List */}
// //         <section className="mt-6 space-y-4">
// //           {filtered.length === 0 ? (
// //             <div className="border border-dashed border-border bg-card/50 px-6 py-16 text-center">
// //               <Search className="mx-auto h-8 w-8 text-primary" />
// //               <h2 className="mt-4 font-display text-lg font-bold">NO ORDERS FOUND</h2>
// //               <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search.</p>
// //             </div>
// //           ) : filtered.map((order, index) => {
// //             const config = statusConfig[order.status];
// //             const StatusIcon = config.icon;
// //             const isOpen = expanded === order.id;

// //             return (
// //               <article
// //                 key={order.id}
// //                 className="order-enter relative overflow-hidden border border-border bg-card/90 backdrop-blur-sm"
// //                 style={{ animationDelay: `${index * 70}ms` }}
// //               >
// //                 <span className="absolute inset-y-0 left-0 w-1 bg-primary" />
// //                 <div className="p-5 sm:p-6 lg:p-7">
// //                   {/* Order Header */}
// //                   <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
// //                     <div className="flex min-w-0 items-start gap-3 sm:gap-4">
// //                       <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
// //                         <StatusIcon className="h-5 w-5" />
// //                       </span>
// //                       <div className="min-w-0">
// //                         <div className="flex min-w-0 flex-wrap items-center gap-2">
// //                           <h2 className="truncate font-display text-sm font-bold sm:text-base">{order.id}</h2>
// //                           <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
// //                             {order.status}
// //                           </span>
// //                         </div>
// //                         <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
// //                           <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{order.createdAt}</span>
// //                           <span className="flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5" />{order.paymentMethod}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total</p>
// //                       <p className="mt-1 font-display text-lg font-bold sm:text-xl">₹{order.total.toLocaleString()}</p>
// //                     </div>
// //                   </div>

// //                   {/* Progress Tracker */}
// //                   {order.status !== "Cancelled" && (
// //                     <div className="mt-6 grid grid-cols-4">
// //                       {progressSteps.map((step, stepIndex) => {
// //                         const reached = config.step >= stepIndex + 1;
// //                         return (
// //                           <div key={step} className="relative flex flex-col items-center">
// //                             <div className={`absolute left-0 right-0 top-3 h-px ${stepIndex < config.step ? "bg-primary" : "bg-border"}`} />
// //                             <span className={`relative z-10 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold ${reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
// //                               {reached ? <Check className="h-3 w-3" /> : stepIndex + 1}
// //                             </span>
// //                             <span className={`mt-2 text-[9px] font-semibold uppercase tracking-wider sm:text-[11px] ${reached ? "text-foreground" : "text-muted-foreground"}`}>
// //                               {step}
// //                             </span>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   )}

// //                   {/* Toggle Details */}
// //                   <button
// //                     type="button"
// //                     variant="ghost"
// //                     onClick={() => setExpanded(isOpen ? null : order.id)}
// //                     className="mt-5 w-full border-t border-border pt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
// //                   >
// //                     {isOpen ? <>Hide details </> : <>View details <ChevronDown /></>}
// //                   </button>
// //                 </div>

// //                 {/* Expanded Details */}
// //                 {isOpen && (
// //                   <div className="grid gap-6 border-t border-border bg-background/35 p-5 sm:p-6 lg:grid-cols-[1.35fr_1fr] lg:p-7">
// //                     <div>
// //                       <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">Items</h3>
// //                       <div className="mt-4 divide-y divide-border">
// //                         {order.items.map((item) => (
// //                           <div key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
// //                             <div className="flex min-w-0 items-center gap-3">
// //                               <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground">
// //                                 <Package className="h-4 w-4" />
// //                               </span>
// //                               <div className="min-w-0">
// //                                 <p className="truncate text-sm font-bold">{item.name}</p>
// //                                 <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
// //                               </div>
// //                             </div>
// //                             <p className="font-display text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                     <div className="space-y-5">
// //                       <div className="flex items-start gap-3">
// //                         <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
// //                         <div>
// //                           <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery address</h3>
// //                           <p className="mt-2 text-sm leading-6">{order.address}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex flex-wrap gap-2">
// //                         {order.status === "Delivered" && <button size="sm"><Star /> Leave review</button>}
// //                         {!["Delivered", "Cancelled"].includes(order.status) && (
// //                           <button size="sm" variant="destructive"><XCircle /> Cancel order</button>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </article>
// //             );
// //           })}
// //         </section>
// //       </div>
// //       <Footer />

// //     </div >
// //   )
// // }



// import { useState, useMemo } from 'react'
// import {
//   Package, Check, Clock, CheckCircle, Truck, MapPin, XCircle,
//   ShoppingBag, ChevronDown, ChevronUp, Calendar, CreditCard,
//   Hash, Star, Search, Filter
// } from 'lucide-react'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'

// const STATUS_CONFIG = {
//   Pending: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/25', icon: Clock, step: 1 },
//   Confirmed: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/25', icon: CheckCircle, step: 2 },
//   Shipped: { color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/25', icon: Truck, step: 3 },
//   Delivered: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', icon: Package, step: 4 },
//   Cancelled: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/25', icon: XCircle, step: 0 },
// }

// const FILTER_OPTIONS = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
// const PROGRESS_STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered']

// const ORDERS = [
//   {
//     id: 'ORD-78A2F1', status: 'Shipped', createdAt: '10 Jun 2025', total: 12499,
//     paymentMethod: 'Card', address: '221B Baker Street, London',
//     items: [
//       { name: 'Cyber Hoodie', qty: 1, price: 4999 },
//       { name: 'Neon Sneakers', qty: 1, price: 7500 },
//     ],
//   },
//   {
//     id: 'ORD-552C90', status: 'Delivered', createdAt: '22 May 2025', total: 3200,
//     paymentMethod: 'COD', address: 'Sector 17, Chandigarh',
//     items: [
//       { name: 'Tactical Cap', qty: 2, price: 1600 },
//     ],
//   },
//   {
//     id: 'ORD-119BB7', status: 'Pending', createdAt: '13 Jun 2025', total: 899,
//     paymentMethod: 'UPI', address: 'MG Road, Bangalore',
//     items: [
//       { name: 'Carbon Wallet', qty: 1, price: 899 },
//     ],
//   },
// ]

// const SectionEyebrow = ({ icon: Icon, text }) => (
//   <div className="inline-flex items-center gap-2 mb-4">
//     <div className="w-5 h-px bg-red-600/50" />
//     <Icon size={9} className="text-red-500" />
//     <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.22em] uppercase text-red-500/70">
//       {text}
//     </span>
//     <div className="w-5 h-px bg-red-600/50" />
//   </div>
// )

// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending
//   const Icon = cfg.icon
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
//       ${cfg.bg} ${cfg.border} border
//       font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.1em] uppercase ${cfg.color}`}>
//       <Icon size={10} strokeWidth={2} />
//       {status}
//     </span>
//   )
// }

// export default function Orders() {
//   const [expanded, setExpanded] = useState(ORDERS[0]?.id ?? null)
//   const [filter, setFilter] = useState('All')
//   const [search, setSearch] = useState('')

//   const filtered = useMemo(() => ORDERS.filter((order) => {
//     const query = search.trim().toLowerCase()
//     return (filter === 'All' || order.status === filter) &&
//       (!query ||
//         order.id.toLowerCase().includes(query) ||
//         order.items.some((item) => item.name.toLowerCase().includes(query)))
//   }), [filter, search])

//   const stats = [
//     { label: 'Total Orders', value: ORDERS.length, icon: ShoppingBag },
//     { label: 'In Transit', value: ORDERS.filter((o) => ['Confirmed', 'Shipped'].includes(o.status)).length, icon: Truck },
//     { label: 'Delivered', value: ORDERS.filter((o) => o.status === 'Delivered').length, icon: CheckCircle },
//     { label: 'Total Spent', value: `Rs. ${ORDERS.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: CreditCard },
//   ]

//   const toggle = (id) => setExpanded(e => e === id ? null : id)

//   const inputCls = `bg-white/[0.04] border border-white/[0.08] rounded-xl
//     text-white placeholder:text-white/20 tracking-wide
//     font-['Rajdhani',sans-serif] outline-none
//     focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10
//     transition-all duration-200`

//   return (
//     <div className="noise min-h-screen bg-[#05080a] font-['Rajdhani',sans-serif] text-white antialiased">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
//         @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//         .fade-in { animation: fadeIn 0.35s ease both; }
//         @keyframes ordFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes ordPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
//         .ord-fade { animation: ordFadeUp 0.4s ease both; }
//         .ord-pulse { animation: ordPulse 2s ease-in-out infinite; }
//         .ord-scroll::-webkit-scrollbar { height: 6px; }
//         .ord-scroll::-webkit-scrollbar-track { background: transparent; }
//         .ord-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
//         .noise::before {
//           content:'';position:fixed;inset:0;
//           background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
//           pointer-events:none;z-index:0;opacity:0.35;
//         }
//         .noise::after {
//           content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;
//           background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);
//           pointer-events:none;z-index:0;
//         }
//       `}</style>

//       <Navbar />

//       <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

//         {/* ── Header ── */}
//         <div className="mb-10 sm:mb-12 ord-fade">
//           <SectionEyebrow icon={ShoppingBag} text="[ 03 ] / Track Order" />
//           <h1 className="font-['Orbitron',monospace] font-black text-[26px] sm:text-[36px]
//             text-white leading-none tracking-tight mb-3">
//             MY ORDERS
//           </h1>
//           <p className="text-[13px] sm:text-[14px] tracking-wide text-white/30">
//             View order status, track shipments, and manage your purchases.
//           </p>
//         </div>

//         {/* ── Stats ── */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 ord-fade" style={{ animationDelay: '60ms' }}>
//           {stats.map(({ label, value, icon: Icon }) => (
//             <div key={label}
//               className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
//                 rounded-2xl p-4 sm:p-5 group
//                 hover:border-red-600/25 hover:bg-red-600/[0.04] transition-all duration-300">
//               <div className="absolute top-0 left-0 right-0 h-px
//                 bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

//               <div className="flex items-center justify-between mb-3">
//                 <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-600/20
//                   flex items-center justify-center text-red-500
//                   group-hover:bg-red-600/15 group-hover:border-red-600/35 transition-all duration-300">
//                   <Icon size={14} strokeWidth={1.5} />
//                 </div>
//               </div>
//               <p className="font-['Orbitron',monospace] text-[16px] sm:text-[20px] font-black
//                 text-white leading-none mb-1">
//                 {value}
//               </p>
//               <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.16em]
//                 uppercase text-white/25">
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* ── Search & Filter ── */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-8 ord-fade" style={{ animationDelay: '120ms' }}>
//           {/* Search */}
//           <div className="relative flex-1">
//             <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search order ID or product…"
//               className={`${inputCls} w-full pl-9 pr-4 py-3 text-[13px]`}
//             />
//           </div>

//           {/* Filter chips */}
//           <div className="flex items-center gap-2 overflow-x-auto ord-scroll pb-1 sm:pb-0">
//             {FILTER_OPTIONS.map(option => {
//               const active = filter === option
//               return (
//                 <button key={option}
//                   onClick={() => setFilter(option)}
//                   className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
//                     font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
//                     border transition-all duration-200
//                     ${active
//                       ? 'bg-red-600/10 border-red-600/30 text-red-400'
//                       : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60 hover:border-white/[0.14]'
//                     }`}>
//                   {option === 'All' && <Filter size={10} />}
//                   {option}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* ── Orders List ── */}
//         <div className="space-y-4">

//           {filtered.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-24 gap-4
//               border border-dashed border-white/[0.07] rounded-3xl bg-white/[0.01]">
//               <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07]
//                 flex items-center justify-center">
//                 <Package size={24} className="text-white/15" />
//               </div>
//               <div className="text-center">
//                 <p className="font-['Orbitron',monospace] text-[12px] font-bold tracking-widest
//                   uppercase text-white/40 mb-2">No Orders Found</p>
//                 <p className="text-[13px] text-white/20 tracking-wide">
//                   Try adjusting your filters or search.
//                 </p>
//               </div>
//             </div>
//           ) : filtered.map((order, index) => {
//             const cfg = STATUS_CONFIG[order.status]
//             const StatusIcon = cfg.icon
//             const isOpen = expanded === order.id

//             return (
//               <div key={order.id}
//                 className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
//                   rounded-2xl transition-all duration-300 hover:border-white/[0.11] ord-fade"
//                 style={{ animationDelay: `${index * 60}ms` }}>

//                 <div className="absolute top-0 left-0 right-0 h-px
//                   bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

//                 <div className="p-5 sm:p-6">

//                   {/* ── Order Header ── */}
//                   <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
//                     <div className="flex items-center gap-3.5">
//                       <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center
//                         ${cfg.bg} ${cfg.border} border ${cfg.color}`}>
//                         <StatusIcon size={16} strokeWidth={1.5} />
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2 mb-1 flex-wrap">
//                           <Hash size={10} className="text-red-500" />
//                           <span className="font-['Orbitron',monospace] text-[11px] font-bold
//                             tracking-[0.1em] text-white">
//                             {order.id}
//                           </span>
//                           <StatusBadge status={order.status} />
//                         </div>
//                         <div className="flex items-center gap-3 text-white/25 text-[11.5px] tracking-wide flex-wrap">
//                           <span className="inline-flex items-center gap-1.5">
//                             <Calendar size={10} /> {order.createdAt}
//                           </span>
//                           <span className="inline-flex items-center gap-1.5">
//                             <CreditCard size={10} /> {order.paymentMethod}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right sm:text-right shrink-0">
//                       <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.16em]
//                         uppercase text-white/25 mb-1">Total</p>
//                       <p className="font-['Orbitron',monospace] text-[16px] sm:text-[18px] font-black text-white">
//                         Rs. {order.total.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── Progress Tracker ── */}
//                   {order.status !== 'Cancelled' && (
//                     <div className="mt-6 pt-5 border-t border-white/[0.05]">
//                       <div className="flex items-center justify-between relative">
//                         {/* connecting line */}
//                         <div className="absolute top-3.5 left-0 right-0 h-px bg-white/[0.06]" />
//                         <div
//                           className="absolute top-3.5 left-0 h-px bg-gradient-to-r from-red-600 to-red-400 transition-all duration-700"
//                           style={{ width: `${(Math.max(cfg.step - 1, 0) / (PROGRESS_STEPS.length - 1)) * 100}%` }}
//                         />
//                         {PROGRESS_STEPS.map((step, stepIndex) => {
//                           const reached = cfg.step >= stepIndex + 1
//                           const active = cfg.step === stepIndex + 1
//                           return (
//                             <div key={step} className="flex flex-col items-center gap-2 relative z-10">
//                               <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
//                                 font-['Orbitron',monospace] text-[10px] font-bold transition-all duration-300
//                                 ${active
//                                   ? 'bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
//                                   : reached
//                                     ? 'bg-red-600/30 border-red-600/60 text-red-300'
//                                     : 'bg-[#05080a] border-white/[0.1] text-white/20'
//                                 }`}>
//                                 {reached ? <Check size={12} /> : stepIndex + 1}
//                               </div>
//                               <span className={`font-['Orbitron',monospace] text-[7px] tracking-[0.08em] uppercase
//                                 hidden sm:block text-center max-w-[60px] leading-tight
//                                 ${active ? 'text-red-400' : reached ? 'text-white/35' : 'text-white/15'}`}>
//                                 {step}
//                               </span>
//                             </div>
//                           )
//                         })}
//                       </div>
//                     </div>
//                   )}

//                   {/* ── Toggle Details ── */}
//                   <button
//                     onClick={() => toggle(order.id)}
//                     className="mt-5 w-full border-t border-white/[0.05] pt-4 flex items-center justify-center gap-2
//                       font-['Orbitron',monospace] text-[9px] tracking-[0.2em] uppercase
//                       text-white/25 hover:text-red-400 transition-colors duration-200">
//                     {isOpen ? 'Hide Details' : 'View Details'}
//                     {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
//                   </button>
//                 </div>

//                 {/* ── Expanded Details ── */}
//                 {isOpen && (
//                   <div className="px-5 sm:px-6 pb-6 -mt-2">

//                     {/* Items */}
//                     <div className="mb-4">
//                       <p className="font-['Orbitron',monospace] text-[9px] tracking-[0.18em]
//                         uppercase text-white/25 mb-3">Items</p>
//                       <div className="space-y-2.5">
//                         {order.items.map((item, i) => (
//                           <div key={i}
//                             className="flex items-center gap-3 p-3 rounded-xl
//                               bg-white/[0.02] border border-white/[0.05]">
//                             <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center
//                               bg-white/[0.04] border border-white/[0.07]">
//                               <Package size={15} className="text-white/15" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-[13px] font-semibold text-white truncate tracking-wide">
//                                 {item.name}
//                               </p>
//                               <p className="text-[11.5px] text-white/30 mt-0.5">
//                                 Qty: {item.qty}
//                               </p>
//                             </div>
//                             <div className="shrink-0 font-['Orbitron',monospace] text-[11px]
//                               font-bold text-white/60">
//                               Rs. {(item.price * item.qty).toLocaleString()}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Address + Actions */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]
//                         flex items-start gap-3">
//                         <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center
//                           bg-red-600/10 border border-red-600/20 text-red-500">
//                           <MapPin size={13} strokeWidth={1.5} />
//                         </div>
//                         <div>
//                           <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.16em]
//                             uppercase text-white/25 mb-1">Delivery Address</p>
//                           <p className="text-[12.5px] text-white/55 tracking-wide leading-snug">
//                             {order.address}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2.5">
//                         {order.status === 'Delivered' && (
//                           <button className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl
//                             font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
//                             bg-gradient-to-br from-red-600 to-red-700 text-white
//                             shadow-[0_4px_20px_rgba(220,38,38,0.3)]
//                             hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
//                             transition-all duration-200">
//                             <Star size={12} /> Leave Review
//                           </button>
//                         )}
//                         {!['Delivered', 'Cancelled'].includes(order.status) && (
//                           <button className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl
//                             font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
//                             border border-white/[0.09] text-white/35
//                             hover:border-red-600/35 hover:text-red-400 hover:bg-red-600/[0.05]
//                             transition-all duration-200">
//                             <XCircle size={12} /> Cancel Order
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }


import { useState, useMemo } from 'react'
import {
  Package, Check, Clock, CheckCircle, Truck, MapPin, XCircle,
  ShoppingBag, ChevronDown, ChevronUp, Calendar, CreditCard,
  Hash, Star, Search, Filter, ArrowRight, RotateCcw, FileText,
  PackageCheck, Home
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STATUS_CONFIG = {
  Pending: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/25', icon: Clock, step: 1, label: 'Order Placed' },
  Confirmed: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/25', icon: CheckCircle, step: 2, label: 'Confirmed' },
  Shipped: { color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/25', icon: Truck, step: 3, label: 'Shipped' },
  Delivered: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', icon: PackageCheck, step: 4, label: 'Delivered' },
  Cancelled: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/25', icon: XCircle, step: 0, label: 'Cancelled' },
}

const FILTER_OPTIONS = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
const PROGRESS_STEPS = [
  { key: 'Pending', label: 'Order Placed', icon: ShoppingBag },
  { key: 'Confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'Shipped', label: 'Shipped', icon: Truck },
  { key: 'Delivered', label: 'Delivered', icon: Home },
]

const ORDERS = [
  {
    id: 'ORD-78A2F1', status: 'Shipped', createdAt: '10 Jun 2025', eta: 'Arriving 16 Jun', total: 12499,
    paymentMethod: 'Card', address: '221B Baker Street, London', tracking: 'TRK-9385-2210',
    items: [
      { name: 'Cyber Hoodie — Midnight Black', qty: 1, price: 4999, image: null },
      { name: 'Neon Sneakers — Size 42', qty: 1, price: 7500, image: null },
    ],
  },
  {
    id: 'ORD-552C90', status: 'Delivered', createdAt: '22 May 2025', eta: 'Delivered 25 May', total: 3200,
    paymentMethod: 'Cash on Delivery', address: 'Sector 17, Chandigarh', tracking: 'TRK-7741-0093',
    items: [
      { name: 'Tactical Cap — Olive Green', qty: 2, price: 1600, image: null },
    ],
  },
  {
    id: 'ORD-119BB7', status: 'Pending', createdAt: '13 Jun 2025', eta: 'Processing', total: 899,
    paymentMethod: 'UPI', address: 'MG Road, Bangalore', tracking: null,
    items: [
      { name: 'Carbon Fiber Wallet', qty: 1, price: 899, image: null },
    ],
  },
  {
    id: 'ORD-204AC3', status: 'Cancelled', createdAt: '05 Jun 2025', eta: 'Cancelled 06 Jun', total: 5400,
    paymentMethod: 'Card', address: 'DHA Phase 6, Karachi', tracking: null,
    items: [
      { name: 'Wireless Mechanical Keyboard', qty: 1, price: 5400, image: null },
    ],
  },
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
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending
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

export default function Orders() {
  const [expanded, setExpanded] = useState(ORDERS[0]?.id ?? null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => ORDERS.filter((order) => {
    const query = search.trim().toLowerCase()
    return (filter === 'All' || order.status === filter) &&
      (!query ||
        order.id.toLowerCase().includes(query) ||
        order.items.some((item) => item.name.toLowerCase().includes(query)))
  }), [filter, search])

  const stats = [
    { label: 'Total Orders', value: ORDERS.length, icon: ShoppingBag },
    { label: 'In Transit', value: ORDERS.filter((o) => ['Confirmed', 'Shipped'].includes(o.status)).length, icon: Truck },
    { label: 'Delivered', value: ORDERS.filter((o) => o.status === 'Delivered').length, icon: PackageCheck },
    { label: 'Total Spent', value: `Rs. ${ORDERS.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: CreditCard },
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
        @keyframes ordPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .ord-fade { animation: ordFadeUp 0.4s ease both; }
        .ord-pulse { animation: ordPulse 2s ease-in-out infinite; }
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

          {filtered.length === 0 ? (
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
                  Try adjusting your filters or search.
                </p>
              </div>
            </div>
          ) : filtered.map((order, index) => {
            const cfg = STATUS_CONFIG[order.status]
            const isOpen = expanded === order.id
            const itemCount = order.items.reduce((s, i) => s + i.qty, 0)

            return (
              <div key={order.id}
                className="relative overflow-hidden bg-white/[0.025] border border-white/[0.07]
                  rounded-2xl transition-all duration-300 hover:border-white/[0.11] ord-fade"
                style={{ animationDelay: `${index * 60}ms` }}>

                <div className="absolute top-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

                {/* ── Order Strip Header — receipt style ── */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-6 py-4
                  border-b border-white/[0.05] bg-white/[0.012]">
                  <div className="flex items-center gap-2">
                    <Hash size={10} className="text-red-500" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Order
                      </p>
                      <p className="font-['Orbitron',monospace] text-[11px] font-bold tracking-[0.08em] text-white">
                        {order.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={10} className="text-white/20" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Placed On
                      </p>
                      <p className="text-[12px] text-white/55 tracking-wide">{order.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={10} className="text-white/20" />
                    <div>
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Payment
                      </p>
                      <p className="text-[12px] text-white/55 tracking-wide">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <div className="text-right">
                      <p className="font-['Orbitron',monospace] text-[8px] tracking-[0.16em] uppercase text-white/25 leading-none mb-0.5">
                        Order Total
                      </p>
                      <p className="font-['Orbitron',monospace] text-[14px] font-black text-white">
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                {/* ── Body: products + image preview ── */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-6">

                    {/* Product thumbnails + summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-4">
                        {order.items.slice(0, 4).map((item, i) => (
                          <div key={i}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0 overflow-hidden
                              bg-white/[0.04] border border-white/[0.07] flex items-center justify-center relative">
                            {item.image
                              ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              : <Package size={20} className="text-white/15" />
                            }
                            {item.qty > 1 && (
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md
                                bg-black/70 font-['Orbitron',monospace] text-[8px] font-bold text-white/70">
                                ×{item.qty}
                              </span>
                            )}
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0
                            bg-white/[0.02] border border-dashed border-white/[0.1]
                            flex items-center justify-center
                            font-['Orbitron',monospace] text-[11px] font-bold text-white/30">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>

                      <p className="text-[13px] text-white/45 tracking-wide leading-relaxed">
                        <span className="text-white font-semibold">{order.items[0].name}</span>
                        {order.items.length > 1 && (
                          <> and <span className="text-white/60">{order.items.length - 1} other item{order.items.length > 2 ? 's' : ''}</span></>
                        )}
                        {' '}· {itemCount} unit{itemCount > 1 ? 's' : ''} total
                      </p>

                      {/* ETA / cancellation note */}
                      <p className={`mt-2 inline-flex items-center gap-1.5 font-['Orbitron',monospace]
                        text-[9px] font-bold tracking-[0.12em] uppercase ${cfg.color}`}>
                        <cfg.icon size={11} />
                        {order.eta}
                      </p>
                    </div>

                    {/* ── Tracking Timeline ── */}
                    {order.status !== 'Cancelled' && (
                      <div className="lg:w-[340px] shrink-0 lg:pl-6 lg:border-l border-white/[0.05]">
                        <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.18em]
                          uppercase text-white/25 mb-4">Shipment Progress</p>

                        <div className="relative">
                          {/* vertical connecting line */}
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

                        {order.tracking && (
                          <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                            <span className="text-[11px] text-white/25 tracking-wide">Tracking ID</span>
                            <span className="font-['Orbitron',monospace] text-[10px] font-bold text-cyan-400 tracking-wide">
                              {order.tracking}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Action Bar ── */}
                  <div className="mt-5 pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row
                    items-center justify-between gap-3">
                    <button
                      onClick={() => toggle(order.id)}
                      className="inline-flex items-center gap-2
                        font-['Orbitron',monospace] text-[9px] tracking-[0.2em] uppercase
                        text-white/30 hover:text-white/60 transition-colors duration-200">
                      {isOpen ? 'Hide Full Invoice' : 'View Full Invoice'}
                      {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {order.status === 'Delivered' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          bg-gradient-to-br from-red-600 to-red-700 text-white
                          shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                          hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
                          transition-all duration-200">
                          <Star size={12} /> Leave Review
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          bg-gradient-to-br from-red-600 to-red-700 text-white
                          shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                          hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
                          transition-all duration-200">
                          <Truck size={12} /> Track Package <ArrowRight size={11} />
                        </button>
                      )}
                      {order.status === 'Cancelled' && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          border border-white/[0.09] text-white/35
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          hover:border-red-600/35 hover:text-red-400 hover:bg-red-600/[0.05]
                          transition-all duration-200">
                          <RotateCcw size={12} /> Reorder
                        </button>
                      )}
                      {!['Delivered', 'Cancelled'].includes(order.status) && (
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          border border-white/[0.09] text-white/35
                          font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.14em] uppercase
                          hover:border-red-600/35 hover:text-red-400 hover:bg-red-600/[0.05]
                          transition-all duration-200">
                          <XCircle size={12} /> Cancel
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

                      {/* Line items */}
                      <div className="space-y-2.5 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center
                              bg-white/[0.04] border border-white/[0.07]">
                              <Package size={15} className="text-white/15" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold text-white truncate tracking-wide">
                                {item.name}
                              </p>
                              <p className="text-[11.5px] text-white/30 mt-0.5">
                                Rs. {item.price.toLocaleString()} × {item.qty}
                              </p>
                            </div>
                            <div className="shrink-0 font-['Orbitron',monospace] text-[12px] font-bold text-white/70">
                              Rs. {(item.price * item.qty).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="h-px bg-white/[0.06] mb-4" />

                      {/* Totals + Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin size={10} className="text-red-500" />
                            <p className="font-['Orbitron',monospace] text-[8.5px] tracking-[0.16em]
                              uppercase text-white/25">Shipping Address</p>
                          </div>
                          <p className="text-[12.5px] text-white/50 tracking-wide leading-snug">
                            {order.address}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-white/30 tracking-wide">Subtotal</span>
                            <span className="text-white/60 font-['Rajdhani',sans-serif] font-semibold">
                              Rs. {order.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-white/30 tracking-wide">Shipping</span>
                            <span className="text-emerald-400 font-['Rajdhani',sans-serif] font-semibold">Free</span>
                          </div>
                          <div className="h-px bg-white/[0.06] my-1.5" />
                          <div className="flex items-center justify-between">
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.16em] uppercase text-white/40">
                              Total
                            </span>
                            <span className="font-['Orbitron',monospace] text-[15px] font-black text-white">
                              Rs. {order.total.toLocaleString()}
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
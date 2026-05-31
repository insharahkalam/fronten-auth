// src/pages/Wishlist.jsx
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
    Heart,
    Trash2,
    ShoppingBag,
    Search,
    ArrowLeft,
    Share2,
    SlidersHorizontal,
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const STORAGE_KEY = 'wishlist:v1'

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) return parsed
        }
    } catch { /* ignore */ }
    return []
}

export default function Wishlist() {
    const [items, setItems] = useState(readStorage)   // read synchronously on first render
    const [query, setQuery] = useState('')
    const [activeCat, setActiveCat] = useState('All')
    const loaded = useRef(false)

    // Mark loaded after first render so the write effect knows it's safe
    useEffect(() => { loaded.current = true }, [])

    // Write to localStorage — but ONLY after initial load to avoid wiping on mount
    useEffect(() => {
        if (!loaded.current) return
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }
        catch { /* ignore */ }
    }, [items])

    // Stay in sync when ProductCard adds/removes items in the same tab
    useEffect(() => {
        const sync = () => setItems(readStorage())
        window.addEventListener('wishlist-updated', sync)
        return () => window.removeEventListener('wishlist-updated', sync)
    }, [])

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))],
        [items],
    )

    const filtered = useMemo(() => {
        return items.filter((i) => {
            const matchesCat = activeCat === 'All' || i.category === activeCat
            const q = query.trim().toLowerCase()
            const matchesQ = !q || i.name?.toLowerCase().includes(q) || i.brand?.toLowerCase().includes(q)
            return matchesCat && matchesQ
        })
    }, [items, activeCat, query])

    const total = items.reduce((sum, i) => sum + (i.price || 0), 0)
    const saved = items.reduce((sum, i) => sum + ((i.oldPrice ?? i.price ?? 0) - (i.price || 0)), 0)

    const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
    const clearAll = () => setItems([])

    return (
        <div className="noise min-h-screen bg-black text-neutral-200 font-rajdhani relative overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
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
        .card-shine { position:relative; overflow:hidden; }
        .card-shine::after {
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,transparent 40%,rgba(220,38,38,0.03) 100%);
          pointer-events:none;
        }
      `}</style>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 fade-in">

                {/* ── Header ── */}
                <div className="mb-12 border-b border-neutral-900 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="h-px w-8 bg-red-600" />
                        <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase">
                            [ 01 ] / Saved
                        </p>
                    </div>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                            Wish<span className="text-red-600">list</span>
                        </h1>
                        <div className="flex items-end gap-8">
                            <div className="text-right">
                                <p className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-600 uppercase mb-1">Items</p>
                                <p className="font-orbitron text-2xl text-white font-bold">
                                    {String(items.length).padStart(2, '0')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-600 uppercase mb-1">Total</p>
                                <p className="font-orbitron text-2xl text-white font-bold">
                                    Rs. {total.toLocaleString()}
                                </p>
                            </div>
                            {saved > 0 && (
                                <div className="text-right">
                                    <p className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-600 uppercase mb-1">Saved</p>
                                    <p className="font-orbitron text-2xl text-red-500 font-bold">
                                        Rs. {saved.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-neutral-900 bg-neutral-950/60 p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <SlidersHorizontal size={13} className="text-red-600 shrink-0" />
                        {categories.map((c) => {
                            const active = c === activeCat
                            return (
                                <button
                                    key={c}
                                    onClick={() => setActiveCat(c)}
                                    className={`font-orbitron text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-all border ${active
                                            ? 'bg-red-600 border-red-600 text-white'
                                            : 'border-neutral-800 text-neutral-500 hover:border-red-600/50 hover:text-red-500'
                                        }`}
                                >
                                    {c}
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-neutral-800 bg-black px-3 py-2 focus-within:border-red-600 transition-colors">
                            <Search size={13} className="text-neutral-600 shrink-0" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="SEARCH ITEMS"
                                className="bg-transparent font-orbitron text-[10px] tracking-[0.2em] text-white placeholder:text-neutral-700 outline-none w-36 sm:w-44 uppercase"
                            />
                        </div>

                        <button
                            type="button"
                            className="border border-neutral-800 hover:border-neutral-600 p-2 text-neutral-500 hover:text-neutral-300 transition-colors"
                            title="Share list"
                        >
                            <Share2 size={14} />
                        </button>

                        {items.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="font-orbitron text-[10px] tracking-[0.2em] text-neutral-600 hover:text-red-600 uppercase flex items-center gap-2 transition-colors border border-transparent hover:border-red-600/30 px-2 py-2"
                            >
                                <Trash2 size={13} /> Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Grid / Empty ── */}
                {filtered.length === 0 ? (
                    <EmptyState hasItems={items.length > 0} onReset={() => { setQuery(''); setActiveCat('All') }} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((item, idx) => (
                            <WishCard
                                key={item.id}
                                item={item}
                                idx={idx}
                                onRemove={() => removeItem(item.id)}
                            />
                        ))}
                    </div>
                )}

                {/* ── Footer strip ── */}
                <div className="flex items-center justify-between pt-10 mt-10 border-t border-neutral-900 flex-wrap gap-4">
                    <Link
                        to="/shop"
                        className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft size={14} /> Continue Shopping
                    </Link>
                    <span className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-700 uppercase">
            // Saved on this device
                    </span>
                </div>

            </main>

            <Footer />
        </div>
    )
}

function WishCard({ item, idx, onRemove }) {
    return (
        <article className="card-shine group relative flex flex-col bg-neutral-950/60 border border-neutral-900 hover:border-red-600/40 transition-all duration-300">

            <span className="absolute top-3 right-3 font-orbitron text-[10px] text-neutral-700 tracking-widest z-10">
                {String(idx + 1).padStart(2, '0')}
            </span>

            {item.oldPrice && (
                <span className="absolute top-3 left-3 z-10 bg-red-600 font-orbitron text-[9px] tracking-[0.2em] uppercase text-white px-2 py-1">
                    -{Math.round((1 - item.price / item.oldPrice) * 100)}%
                </span>
            )}

            <div className="relative overflow-hidden bg-neutral-900" style={{ aspectRatio: '4/5' }}>
                <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <span className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-neutral-400 border border-neutral-700 px-3 py-1.5">
                            Out of Stock
                        </span>
                    </div>
                )}

                <button
                    onClick={onRemove}
                    aria-label="Remove from wishlist"
                    className="absolute bottom-3 right-3 h-8 w-8 flex items-center justify-center bg-black/70 border border-neutral-800 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                    <Heart size={14} className="fill-current" />
                </button>
            </div>

            <div className="flex flex-1 flex-col p-4 gap-2">
                <div className="flex items-center justify-between">
                    <p className="font-orbitron text-[9px] tracking-[0.3em] text-red-600 uppercase">
                        {item.brand}
                    </p>
                    {item.rating && (
                        <span className="font-orbitron text-[9px] text-neutral-600 tracking-wider">
                            ★ {item.rating}
                        </span>
                    )}
                </div>

                <h3 className="font-orbitron text-white text-xs sm:text-sm font-bold uppercase tracking-wide leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                    {item.name}
                </h3>

                {item.category && (
                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-neutral-600 uppercase">
                        {item.category}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-900">
                    <div className="flex items-baseline gap-2">
                        <span className="font-orbitron text-white font-bold text-sm">
                            Rs. {item.price?.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                            <span className="font-orbitron text-[10px] text-neutral-600 line-through">
                                Rs. {item.oldPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <button
                        disabled={!item.inStock}
                        className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 disabled:text-neutral-700 disabled:cursor-not-allowed text-white font-orbitron text-[9px] tracking-[0.2em] uppercase px-3 py-2 transition-colors"
                    >
                        <ShoppingBag size={11} />
                        Add
                    </button>
                </div>
            </div>

            <div className="h-px w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
        </article>
    )
}

function EmptyState({ hasItems, onReset }) {
    return (
        <div className="flex flex-col items-center justify-center border border-dashed border-neutral-900 bg-neutral-950/40 px-6 py-28 text-center fade-in">
            <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border border-neutral-900 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Heart size={28} className="text-red-600" strokeWidth={1.5} />
                </div>
            </div>

            <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase mb-3">
        // Empty
            </p>
            <h2 className="font-orbitron text-2xl text-white mb-3 uppercase tracking-wider">
                {hasItems ? 'No Matches Found' : 'Nothing Saved Yet'}
            </h2>
            <p className="text-neutral-500 mb-8 tracking-wide text-sm max-w-xs">
                {hasItems
                    ? 'Try clearing filters or searching a different term.'
                    : 'Tap the heart on any product to save it here.'}
            </p>

            <div className="flex items-center gap-3">
                {hasItems ? (
                    <button
                        onClick={onReset}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 hover:border-red-600 text-neutral-300 hover:text-red-500 font-orbitron text-xs tracking-[0.25em] uppercase transition-colors"
                    >
                        Reset Filters
                    </button>
                ) : (
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-orbitron text-xs tracking-[0.3em] uppercase transition-colors"
                    >
                        <ArrowLeft size={14} /> Enter Shop
                    </Link>
                )}
            </div>
        </div>
    )
}
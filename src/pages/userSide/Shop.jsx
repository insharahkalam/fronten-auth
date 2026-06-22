import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, Search, Package, LayoutGrid, ArrowRight, Tag } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../../components/ProductCard'
import { GridSkeleton } from '../../components/Skeleton'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SORT_OPTIONS = [
    { value: 'default', label: 'All' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'name-asc', label: 'Name: A → Z' },
    { value: 'newest', label: 'Newest First' },
]

const categories = [
    'Electronics', 'Mobile & Accessories', 'Fashion (Men)', 'Fashion (Women)',
    'Footwear', 'Home & Living', 'Beauty & Personal Care', 'Health & Wellness',
    'Sports & Fitness', 'Books & Stationery', 'Kids & Toys', 'Grocery',
    'Automotive', 'Furniture', 'Kitchen & Dining', 'Other',
]

// ── Sidebar extracted outside Shop to prevent remounting on every render ──
function Sidebar({ qCategory, setCategory, priceMax, setPriceMax, onClose }) {
    return (
        <div className="space-y-8 sidebar-scroll">

            {/* Categories */}
            <div>
                <p className="font-['Orbitron',monospace] text-[9px] tracking-[0.2em] uppercase
                    text-white/30 mb-3 flex items-center gap-2">
                    <LayoutGrid size={9} className="text-red-500/70" /> Category
                </p>
                <div className="space-y-0.5">
                    {['All', ...categories].map(cat => {
                        const active = cat === 'All' ? qCategory === 'All' : qCategory === cat
                        return (
                            <button key={cat}
                                onClick={() => { setCategory(cat); onClose?.() }}
                                className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-[10px]
                                    font-['Rajdhani',sans-serif] text-[13px] font-semibold tracking-wide
                                    transition-all duration-150
                                    ${active
                                        ? 'bg-red-600/10 border border-red-600/25 text-red-400'
                                        : 'border border-transparent text-white/30 hover:text-white/55 hover:bg-white/[0.03]'
                                    }`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                                    ${active ? 'bg-red-500' : 'bg-white/15'}`} />
                                {cat}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Price */}
            <div>
                <p className="font-['Orbitron',monospace] text-[9px] tracking-[0.2em] uppercase
                    text-white/30 mb-4 flex items-center gap-2">
                    <Tag size={9} className="text-red-500/70" /> Max Price
                </p>
                <input
                    type="range" min={0} max={100000} step={500} value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: '#dc2626' }}
                />
                <div className="flex justify-between mt-3">
                    <span className="font-['Rajdhani',sans-serif] text-[11px] tracking-wide text-white/20">
                        Rs. 0
                    </span>
                    <span className="font-['Orbitron',monospace] text-[10px] font-bold text-red-400">
                        Rs. {priceMax.toLocaleString()}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default function Shop() {
    const { products, loading, error } = useProducts()
    const [params, setParams] = useSearchParams()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sort, setSort] = useState('default')
    const [priceMax, setPriceMax] = useState(100000)
    const [localSearch, setLocalSearch] = useState(params.get('search') || '')

    const qCategory = params.get('category') || 'All'
    const qSearch = params.get('search') || ''

    // ── Derive unique categories directly from backend data ──
    const categories = useMemo(() => {
        const seen = new Set()
        return products
            .map(p => p.category?.trim())          // normalize whitespace
            .filter(cat => {
                if (!cat || seen.has(cat)) return false
                seen.add(cat)
                return true
            })
            .sort()
    }, [products])

    const setCategory = (cat) => {
        const next = new URLSearchParams(params)
        cat === 'All' ? next.delete('category') : next.set('category', cat)
        setParams(next)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const next = new URLSearchParams(params)
        localSearch.trim() ? next.set('search', localSearch.trim()) : next.delete('search')
        setParams(next)
    }

    const filtered = useMemo(() => {
        let r = [...products]

        // ── Featured filter ──
        if (sort === 'featured') {
            r = r.filter(p => p.featured === true)
        }

        // ── Category filter ──
        if (qCategory !== 'All') {
            const normalizedQ = qCategory.trim().toLowerCase()
            r = r.filter(p => p.category?.trim().toLowerCase() === normalizedQ)
        }

        // ── Search filter ──
        if (qSearch) {
            const q = qSearch.toLowerCase()
            r = r.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            )
        }

        // ── Price filter ──
        r = r.filter(p => (p.price || 0) <= priceMax)

        // ── Sorting ──
        switch (sort) {
            case 'price-asc': r.sort((a, b) => a.price - b.price); break
            case 'price-desc': r.sort((a, b) => b.price - a.price); break
            case 'name-asc': r.sort((a, b) => a.name?.localeCompare(b.name)); break
            case 'newest': r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
        }

        return r
    }, [products, qCategory, qSearch, priceMax, sort])


    return (
        <div className="noise min-h-screen bg-[#05080a] font-['Rajdhani',sans-serif] text-white antialiased">
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
                .sidebar-scroll::-webkit-scrollbar { width: 3px; }
                .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
                .sidebar-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 2px; }
                input[type=range]::-webkit-slider-thumb {
                    appearance: none; width: 14px; height: 14px;
                    background: #dc2626; border-radius: 50%;
                    box-shadow: 0 0 8px rgba(220,38,38,0.5);
                    cursor: pointer;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    height: 3px; border-radius: 2px;
                    background: rgba(255,255,255,0.08);
                }
            `}</style>

            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Page Header ── */}
                <div className="pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-px bg-red-600/50" />
                        <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.22em] uppercase text-red-500/70">
                            Catalog
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h1 className="font-['Orbitron',monospace] text-[28px] sm:text-[40px] font-black
                                text-white leading-none tracking-tight">
                                {qCategory !== 'All' ? qCategory : 'All Products'}
                            </h1>

                            {qSearch && (
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    <span className="text-[13px] text-white/30 tracking-wide">Results for</span>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                        bg-red-600/10 border border-red-600/25 text-red-400
                                        font-['Orbitron',monospace] text-[9px] tracking-[0.1em] uppercase">
                                        "{qSearch}"
                                        <button
                                            onClick={() => {
                                                const n = new URLSearchParams(params)
                                                n.delete('search'); setLocalSearch(''); setParams(n)
                                            }}
                                            className="text-red-400/60 hover:text-red-300 transition-colors ml-0.5">
                                            <X size={10} />
                                        </button>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden self-start sm:self-auto inline-flex items-center gap-2
                                px-4 py-2.5 rounded-[10px] border border-white/[0.09] text-white/40
                                font-['Orbitron',monospace] text-[9px] tracking-[0.14em] uppercase
                                hover:border-red-600/30 hover:text-white/65 hover:bg-red-600/[0.04]
                                transition-all duration-200">
                            <SlidersHorizontal size={13} /> Filters
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 pt-8 pb-20">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start
                        max-h-[calc(100vh-7rem)] overflow-y-auto sidebar-scroll pr-1">
                        <Sidebar
                            categories={categories}
                            qCategory={qCategory}
                            setCategory={setCategory}
                            priceMax={priceMax}
                            setPriceMax={setPriceMax}
                        />
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between
                            gap-4 mb-6 pb-5 border-b border-white/[0.05]">
                            <span className="font-['Orbitron',monospace] text-[9px] tracking-[0.18em]
                                uppercase text-white/20 text-center md:text-left">
                                {loading
                                    ? "Loading…"
                                    : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
                            </span>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">

                                {/* Search */}
                                <form onSubmit={handleSearch} className="w-full sm:flex-1 md:min-w-[300px]">
                                    <div className="relative">
                                        <input
                                            value={localSearch}
                                            onChange={(e) => setLocalSearch(e.target.value)}
                                            placeholder="Search products…"
                                            className="w-full bg-white/[0.04] border border-white/[0.08]
                                                rounded-xl px-3.5 pr-10 py-2.5 text-[13px] text-white
                                                placeholder:text-white/20 outline-none
                                                focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10
                                                font-['Rajdhani',sans-serif] tracking-wide
                                                transition-all duration-200"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-3 top-1/2 -translate-y-1/2
                                                text-white/25 hover:text-red-400 transition-colors">
                                            <Search size={13} />
                                        </button>
                                    </div>
                                </form>

                                {/* Sort */}
                                <div className="relative w-full sm:w-auto">
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="appearance-none w-full sm:w-auto bg-black border
                                            border-red-600/50 rounded-xl pl-3.5 pr-9 py-3 text-white
                                            outline-none cursor-pointer
                                            font-['Orbitron',monospace] text-[9px]
                                            tracking-[0.12em] transition-all duration-200
                                            sm:min-w-[160px]">
                                        {SORT_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2
                                        pointer-events-none text-white/30" />
                                </div>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {qCategory !== 'All' && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-red-600/10 border border-red-600/25 text-red-400
                                    font-['Orbitron',monospace] text-[9px] tracking-[0.1em] uppercase">
                                    {qCategory}
                                    <button
                                        onClick={() => setCategory('All')}
                                        className="text-red-400/60 hover:text-red-300 transition-colors">
                                        <X size={10} />
                                    </button>
                                </span>
                            </div>
                        )}

                        {/* Grid / States */}
                        {loading ? (
                            <GridSkeleton count={8} />

                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4
                                border border-dashed border-white/[0.07] rounded-3xl">
                                <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/20
                                    flex items-center justify-center">
                                    <X size={20} className="text-red-500" />
                                </div>
                                <p className="font-['Orbitron',monospace] text-[11px] tracking-widest text-red-400 uppercase">
                                    Failed to Load
                                </p>
                                <p className="text-[13px] text-white/20 tracking-wide">{error}</p>
                            </div>

                        ) : filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-5
                                border border-dashed border-white/[0.07] rounded-3xl bg-white/[0.01]">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                                    flex items-center justify-center">
                                    <Package size={24} className="text-white/15" />
                                </div>
                                <div className="text-center">
                                    <p className="font-['Orbitron',monospace] text-[12px] font-bold tracking-widest
                                        uppercase text-white/40 mb-2">
                                        No Products Found
                                    </p>
                                    <p className="text-[13px] text-white/20 tracking-wide">
                                        Try adjusting your filters or search query.
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setCategory('All'); setLocalSearch(''); setParams({}) }}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px]
                                        font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.16em] uppercase
                                        bg-gradient-to-br from-red-600 to-red-700 text-white
                                        shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                                        hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5
                                        transition-all duration-200">
                                    Clear All Filters <ArrowRight size={12} />
                                </button>
                            </div>

                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                                {filtered.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0"
                        style={{ background: 'rgba(4,1,1,0.85)', backdropFilter: 'blur(6px)' }}
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="absolute right-0 inset-y-0 w-72 flex flex-col"
                        style={{
                            background: 'rgba(8,2,2,0.98)',
                            borderLeft: '1px solid rgba(255,255,255,0.06)',
                        }}>
                        <div className="flex items-center justify-between px-6 py-5
                            border-b border-white/[0.05] shrink-0">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={12} className="text-red-500" />
                                <span className="font-['Orbitron',monospace] text-[10px] tracking-[0.22em]
                                    uppercase text-white/50">
                                    Filters
                                </span>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center
                                    text-white/30 hover:text-red-400 hover:border-red-600/30 transition-all duration-200">
                                <X size={15} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto sidebar-scroll px-6 py-6">
                            <Sidebar
                                categories={categories}
                                qCategory={qCategory}
                                setCategory={setCategory}
                                priceMax={priceMax}
                                setPriceMax={setPriceMax}
                                onClose={() => setSidebarOpen(false)}
                            />
                        </div>

                        <div className="px-6 py-5 border-t border-white/[0.05] shrink-0">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[10px]
                                    font-['Orbitron',monospace] text-[9px] font-bold tracking-[0.18em] uppercase
                                    bg-gradient-to-br from-red-600 to-red-700 text-white
                                    shadow-[0_4px_20px_rgba(220,38,38,0.3)]
                                    hover:from-red-500 hover:to-red-600 transition-all duration-200">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}
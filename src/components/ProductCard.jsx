import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import toast from 'react-hot-toast'

const PLACEHOLDER = 'https://placehold.co/600x600/0e0404/333?text=NOIR'
const WISHLIST_KEY = 'wishlist:v1'

/* ── localStorage helpers ─────────────────────────────────────────────── */
function getWishlist() {
    try {
        const raw = localStorage.getItem(WISHLIST_KEY)
        return raw ? JSON.parse(raw) : []
    } catch { return [] }
}

function saveWishlist(items) {
    try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
        window.dispatchEvent(new Event('wishlist-updated'))
    } catch { /* ignore */ }
}

/* ── Shared toast style ───────────────────────────────────────────────── */
const toastStyle = {
    background: 'rgba(14,4,4,0.96)',
    color: '#f5f5f5',
    border: '1px solid rgba(220,38,38,0.28)',
    fontFamily: 'Rajdhani',
    letterSpacing: '0.04em',
    backdropFilter: 'blur(8px)',
}

const authToastStyle = {
    ...toastStyle,
    border: '1px solid rgba(251,191,36,0.35)',
}

export default function ProductCard({ product, index = 0 }) {
    const dispatch = useDispatch()
    const { isAuthed } = useAuth()
    const navigate = useNavigate()

    const {
        _id,
        title, name,
        description,
        brand,
        category = '',
        price = 0,
        oldPrice,
        discount,
        image,
        images = [],
        stock,
        rating,
        featured,
    } = product

    const displayName = title || name || 'Unnamed Product'

    // ✅ Category normalize — trim + consistent casing for grouping
    const normalizedCategory = category?.trim() || ''

    /* ── Image state ──────────────────────────────────────────────────── */
    const [imgErr, setImgErr] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)
    const imgSrc = imgErr
        ? PLACEHOLDER
        : (Array.isArray(images) && images[0]) || image || PLACEHOLDER

    /* ── Stock + pricing ──────────────────────────────────────────────── */
    const inStock = stock === undefined ? true : stock > 0

    const pct =
        discount && discount > 0
            ? Math.round(discount)
            : oldPrice && oldPrice > price
                ? Math.round((1 - price / oldPrice) * 100)
                : null

    const originalPrice =
        oldPrice && oldPrice > price
            ? oldPrice
            : pct
                ? Math.round(price / (1 - pct / 100))
                : null

    /* ── Auth guard helper ────────────────────────────────────────────── */
    const requireAuth = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toast('Please login to continue', {
            style: authToastStyle,
        })
        navigate('/auth')
        return false
    }

    /* ── Wishlist ─────────────────────────────────────────────────────── */
    const [wished, setWished] = useState(() =>
        getWishlist().some((i) => i.id === String(_id))
    )

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthed) { requireAuth(e); return }

        const current = getWishlist()
        const id = String(_id)

        if (wished) {
            saveWishlist(current.filter((i) => i.id !== id))
            setWished(false)
            toast('Removed from wishlist', { icon: '🤍', style: toastStyle })
        } else {
            saveWishlist([
                ...current,
                {
                    id,
                    name: displayName,
                    brand: brand?.trim() || '',
                    // ✅ FIX — trimmed category save karo taake grouping consistent rahe
                    category: normalizedCategory,
                    price,
                    oldPrice: originalPrice || undefined,
                    image: imgSrc,
                    rating: rating ?? undefined,
                    inStock,
                },
            ])
            setWished(true)
            toast.success('Added to wishlist', { style: toastStyle })
        }
    }

    /* ── Cart ─────────────────────────────────────────────────────────── */
    const [adding, setAdding] = useState(false)

    const handleAdd = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthed) { requireAuth(e); return }
        if (!inStock || adding) return

        dispatch(addToCart(product))
        setAdding(true)
        toast.success('Added to cart', {
            style: toastStyle,
            iconTheme: { primary: '#ef4444', secondary: '#0e0404' },
        })
        setTimeout(() => setAdding(false), 1400)
    }

    const delayClass = ['delay-1', 'delay-2', 'delay-3', 'delay-4'][index % 4]

    return (
        <Link
            to={`/product/${_id}`}
            className="no-underline block group h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 rounded-xl"
            aria-label={`${displayName} — Rs. ${price.toLocaleString()}`}
        >
            <article
                className={`card-dark card-dark-hover fade-up ${delayClass} h-full flex flex-col overflow-hidden rounded-xl border border-white/[0.06] hover:border-red-500/30 transition-colors duration-300`}
            >
                {/* ── Media ── */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0a0303] to-[#150707]">
                    {!imgLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] animate-pulse" />
                    )}

                    <img
                        src={imgSrc}
                        alt={displayName}
                        loading="lazy"
                        onError={() => { setImgErr(true); setImgLoaded(true) }}
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.08] ${imgLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {featured && (
                            <span className="text-[7px] tracking-[0.18em] font-[Orbitron] font-semibold rounded-md px-2 py-1 bg-amber-400/95 text-black shadow-lg shadow-amber-500/20">
                                ★ FEATURED
                            </span>
                        )}
                        {pct && (
                            <span className="badge-red text-[7px] tracking-[0.18em] font-[Orbitron] font-semibold rounded-md px-2 py-1 shadow-lg shadow-red-900/30">
                                −{pct}% OFF
                            </span>
                        )}
                        {!inStock && (
                            <span className="text-[8px] tracking-[0.18em] font-[Orbitron] font-semibold rounded-md px-2 py-1 bg-black/70 text-white/60 border border-white/15 backdrop-blur-sm">
                                SOLD OUT
                            </span>
                        )}
                    </div>

                    {/* Wishlist button */}
                    <button
                        onClick={handleWishlist}
                        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                        aria-pressed={wished}
                        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-md border transition-all duration-200 hover:scale-110 active:scale-95 ${wished
                            ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-900/30'
                            : 'bg-black/60 border-white/10 hover:border-white/25 hover:bg-black/80'
                            }`}
                    >
                        <Heart
                            size={15}
                            className={`transition-all ${wished ? 'fill-red-500 text-red-500 scale-110' : 'text-white/70'
                                }`}
                        />
                    </button>

                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-10">
                        <button
                            onClick={handleAdd}
                            disabled={!inStock}
                            className="flex-1 btn-red-solid py-2.5 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-[Orbitron] font-semibold tracking-[0.16em] rounded-md shadow-lg shadow-red-950/40 transition-transform hover:translate-y-[-1px] active:translate-y-0"
                        >
                            {adding ? (
                                <><Check size={14} className="animate-in" /> ADDED</>
                            ) : (
                                <><ShoppingCart size={13} /> {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Quick view"
                            className="w-10 h-10 rounded-md flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
                        >
                            <Eye size={14} />
                        </button>
                    </div>
                </div>

                {/* ── Info ── */}
                <div className="p-4 flex flex-col flex-1 gap-2">
                    {(brand || normalizedCategory) && (
                        <div className="flex items-center justify-between gap-2 text-[9px] tracking-[0.18em] uppercase font-[Orbitron] font-medium">
                            {brand && <span className="text-red-400/90 text-[7px] sm:text-[8px] line-clamp-1">{brand}</span>}
                            {brand && normalizedCategory && <span className="text-white/15">•</span>}
                            {normalizedCategory && <span className="text-white/40 text-[7px] sm:text-[8px] line-clamp-1">{normalizedCategory}</span>}
                        </div>
                    )}

                    <h3 className="font-rajdhani text-[15px] font-semibold tracking-wide leading-snug line-clamp-2 text-white/95 group-hover:text-red-50 transition-colors">
                        {displayName}
                    </h3>

                    {description && (
                        <p className="font-rajdhani text-[12px] leading-relaxed text-white/45 line-clamp-2">
                            {description}
                        </p>
                    )}

                    <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-end justify-between gap-2">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="font-orbitron text-sm font-bold text-white tracking-tight">
                                    Rs. {price.toLocaleString()}
                                </span>
                                {originalPrice && (
                                    <span className="font-rajdhani text-xs line-through text-white/30">
                                        Rs. {originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}
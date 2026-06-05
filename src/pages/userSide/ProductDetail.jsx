// import { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import {
//     ShoppingCart, ArrowLeft, Star, Shield, Truck, Package,
//     ChevronLeft, ChevronRight, Check, Minus, Plus, Zap, Award, RotateCcw
// } from 'lucide-react'
// import api from '../../config/service'
// import { useCart } from '../../context/CartContext'
// import { useProducts } from '../../hooks/useProducts'
// import ProductCard from '../../components/ProductCard'
// import toast from 'react-hot-toast'
// import Footer from '../../components/Footer'
// import Navbar from '../../components/Navbar'

// const PLACEHOLDER = 'https://placehold.co/800x800/0c1418/333?text=No+Image'

// /* ─── Small reusable bits ─── */
// const Eyebrow = ({ icon: Icon, text }) => (
//     <div className="flex items-center gap-3 mb-4">
//         <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-600/60" />
//         <Icon size={14} className="text-red-500" />
//         <span
//             className="text-[11px] tracking-[0.3em] uppercase text-red-500/90 font-semibold"
//             style={{ fontFamily: 'Orbitron, sans-serif' }}
//         >
//             {text}
//         </span>
//         <div className="h-px flex-1 bg-gradient-to-r from-red-600/60 via-white/10 to-transparent" />
//     </div>
// )

// const SpecRow = ({ label, children }) => (
//     <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
//         <span
//             className="text-[11px] tracking-[0.2em] uppercase text-white/40"
//             style={{ fontFamily: 'Orbitron, sans-serif' }}
//         >
//             {label}
//         </span>
//         <span className="text-sm text-white/90 font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
//             {children}
//         </span>
//     </div>
// )

// const Feature = ({ icon: Icon, title, desc }) => (
//     <div className="group flex items-start gap-3 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-red-600/30 hover:bg-red-600/[0.03] transition-all">
//         <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600/20 flex items-center justify-center group-hover:scale-105 transition-transform">
//             <Icon size={16} className="text-red-500" />
//         </div>
//         <div>
//             <p className="text-sm font-semibold text-white/95" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{title}</p>
//             <p className="text-xs text-white/50 mt-0.5">{desc}</p>
//         </div>
//     </div>
// )

// export default function ProductDetail() {
//     const { id } = useParams()
//     const { addToCart } = useCart()
//     const { products } = useProducts()

//     const [product, setProduct] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [imgIdx, setImgIdx] = useState(0)
//     const [qty, setQty] = useState(1)
//     const [imgError, setImgErr] = useState(false)

//     useEffect(() => {
//         window.scrollTo(0, 0)
//         setLoading(true)
//         setImgIdx(0)
//         api.get(`/products/getProduct/${id}`)
//             .then(r => setProduct(r.data?.getOne || r.data))
//             .catch(() => {
//                 const local = products.find(p => p._id === id)
//                 if (local) setProduct(local)
//             })
//             .finally(() => setLoading(false))
//     }, [id])

//     /* ── Loading ── */
//     if (loading) return (
//         <div className="min-h-screen bg-[#070a0c] noise relative">
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
//         .noise::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:0.35;}
//         .noise::after{content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
//         @keyframes pulse{0%,100%{opacity:.4}50%{opacity:.7}}
//         .sk{background:rgba(255,255,255,0.04);border-radius:12px;animation:pulse 1.6s ease infinite;}
//       `}</style>
//             <Navbar />
//             <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 grid lg:grid-cols-2 gap-12">
//                 <div className="sk aspect-square" />
//                 <div className="space-y-4">
//                     {[60, 80, 40, 55, 100, 70, 45].map((w, i) => (
//                         <div key={i} className="sk h-6" style={{ width: `${w}%` }} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )

//     /* ── Not found ── */
//     if (!product) return (
//         <div className="min-h-screen bg-[#070a0c] noise relative">
//             <Navbar />
//             <div className="max-w-2xl mx-auto px-6 py-32 text-center relative z-10">
//                 <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
//                     <Package size={28} className="text-red-500" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                     Product Not Found
//                 </h1>
//                 <p className="text-white/50 mb-8">This product may have been removed or doesn't exist.</p>
//                 <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-colors">
//                     <ArrowLeft size={16} /> Back to Shop
//                 </Link>
//             </div>
//         </div>
//     )

//     const { title, brand, category, description, image, images = [], price, stock, discount = 0, featured = false } = product
//     const oldPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : null
//     const allImgs = Array.isArray(images) && images.length ? images : image ? [image] : [PLACEHOLDER]
//     const mainImg = imgError ? PLACEHOLDER : allImgs[imgIdx]
//     const inStock = stock === undefined ? true : stock > 0
//     const related = products.filter(p => p.category === category && p._id !== id).slice(0, 4)

//     const handleAdd = () => {
//         for (let i = 0; i < qty; i++) addToCart(product)
//         toast.success(`${qty}× ${title} added to cart`, {
//             style: { background: '#0f1418', color: '#e2eef1', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px' },
//             iconTheme: { primary: '#dc2626', secondary: '#fff' },
//         })
//     }

//     const nextImg = () => setImgIdx((imgIdx + 1) % allImgs.length)
//     const prevImg = () => setImgIdx((imgIdx - 1 + allImgs.length) % allImgs.length)

//     return (
//         <div className="min-h-screen bg-[#070a0c] noise relative text-white/90" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
//         .noise::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:0.35;}
//         .noise::after{content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
//         .corner-frame{position:relative;}
//         .corner-frame::before,.corner-frame::after{content:'';position:absolute;width:14px;height:14px;border:1px solid rgba(220,38,38,0.5);}
//         .corner-frame::before{top:-1px;left:-1px;border-right:none;border-bottom:none;}
//         .corner-frame::after{bottom:-1px;right:-1px;border-left:none;border-top:none;}
//       `}</style>

//             <Navbar />

//             <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
//                 {/* Breadcrumb */}
//                 <nav className="flex items-center gap-2 text-xs mb-8 text-white/40">
//                     {[
//                         { label: 'Home', to: '/' },
//                         { label: 'Shop', to: '/shop' },
//                         ...(category ? [{ label: category, to: `/shop?category=${encodeURIComponent(category)}` }] : []),
//                     ].map(({ label, to }) => (
//                         <span key={label} className="flex items-center gap-2">
//                             <Link to={to} className="hover:text-red-500 transition-colors uppercase tracking-wider">{label}</Link>
//                             <span className="text-white/20">/</span>
//                         </span>
//                     ))}
//                     <span className="text-white/70 uppercase tracking-wider truncate">{title}</span>
//                 </nav>

//                 <Eyebrow icon={Package} text="Product Detail" />

//                 {/* Main grid */}
//                 <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-20">
//                     {/* ─── Gallery ─── */}
//                     <div className="space-y-4">
//                         <div className="corner-frame relative aspect-square bg-gradient-to-br from-[#0c1418] to-[#070a0c] border border-white/[0.06] overflow-hidden group">
//                             <img
//                                 src={mainImg}
//                                 alt={title}
//                                 onError={() => setImgErr(true)}
//                                 className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
//                             />

//                             {discount > 0 && (
//                                 <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                                     -{discount}%
//                                 </div>
//                             )}
//                             {featured && (
//                                 <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur border border-red-600/30 text-red-500 text-[10px] font-bold tracking-wider uppercase">
//                                     <Star size={10} className="fill-red-500" /> Featured
//                                 </div>
//                             )}

//                             {allImgs.length > 1 && (
//                                 <>
//                                     <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100">
//                                         <ChevronLeft size={18} />
//                                     </button>
//                                     <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100">
//                                         <ChevronRight size={18} />
//                                     </button>
//                                 </>
//                             )}
//                         </div>

//                         {allImgs.length > 1 && (
//                             <div className="grid grid-cols-5 gap-2">
//                                 {allImgs.slice(0, 5).map((img, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => { setImgIdx(i); setImgErr(false) }}
//                                         className={`aspect-square border overflow-hidden transition-all ${i === imgIdx ? 'border-red-600 ring-1 ring-red-600/40' : 'border-white/[0.08] hover:border-white/20'
//                                             }`}
//                                     >
//                                         <img src={img} alt="" className="w-full h-full object-contain p-2 bg-[#0c1418]" />
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* ─── Details ─── */}
//                     <div className="flex flex-col">
//                         {brand && (
//                             <span className="text-[11px] tracking-[0.3em] uppercase text-red-500 font-semibold mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                                 {brand}
//                             </span>
//                         )}

//                         <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                             {title}
//                         </h1>

//                         {/* Rating placeholder */}
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="flex items-center gap-0.5">
//                                 {[1, 2, 3, 4, 5].map(i => (
//                                     <Star key={i} size={14} className="fill-red-500 text-red-500" />
//                                 ))}
//                             </div>
//                             <span className="text-xs text-white/40">(Verified Product)</span>
//                             <span className="text-white/20">·</span>
//                             <span className="flex items-center gap-1 text-xs">
//                                 <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
//                                 <span className={inStock ? 'text-green-400' : 'text-red-400'}>
//                                     {inStock ? 'In Stock' : 'Out of Stock'}
//                                 </span>
//                             </span>
//                         </div>

//                         {/* Price */}
//                         <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/[0.06]">
//                             <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                                 Rs. {price?.toLocaleString()}
//                             </span>
//                             {oldPrice && (
//                                 <>
//                                     <span className="text-lg text-white/30 line-through">Rs. {oldPrice.toLocaleString()}</span>
//                                     <span className="text-xs text-green-400 font-semibold">Save Rs. {(oldPrice - price).toLocaleString()}</span>
//                                 </>
//                             )}
//                         </div>

//                         {/* Description */}
//                         {description && (
//                             <p className="text-sm leading-relaxed text-white/60 mb-6">
//                                 {description}
//                             </p>
//                         )}

//                         {/* Quantity + Add to cart */}
//                         <div className="flex flex-col sm:flex-row gap-3 mb-6">
//                             <div className="flex items-center border border-white/10 bg-white/[0.02]">
//                                 <button
//                                     onClick={() => setQty(Math.max(1, qty - 1))}
//                                     className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white/[0.03] transition"
//                                 >
//                                     <Minus size={14} />
//                                 </button>
//                                 <span className="w-12 text-center font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{qty}</span>
//                                 <button
//                                     onClick={() => setQty(qty + 1)}
//                                     className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white/[0.03] transition"
//                                 >
//                                     <Plus size={14} />
//                                 </button>
//                             </div>

//                             <button
//                                 onClick={handleAdd}
//                                 disabled={!inStock}
//                                 className="flex-1 group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed text-white font-bold tracking-wider uppercase text-sm transition-all"
//                                 style={{ fontFamily: 'Orbitron, sans-serif' }}
//                             >
//                                 <ShoppingCart size={16} />
//                                 {inStock ? 'Add to Cart' : 'Out of Stock'}
//                             </button>
//                         </div>

//                         {/* Feature strip */}
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
//                             <Feature icon={Truck} title="Fast Delivery" desc="2–4 business days" />
//                             <Feature icon={Shield} title="Secure Payment" desc="100% protected" />
//                             <Feature icon={RotateCcw} title="Easy Returns" desc="7-day policy" />
//                         </div>

//                         {/* Specs */}
//                         <div className="border border-white/[0.06] bg-white/[0.02] p-5">
//                             <div className="flex items-center gap-2 mb-2">
//                                 <Award size={14} className="text-red-500" />
//                                 <h3 className="text-[11px] tracking-[0.3em] uppercase text-white/70 font-semibold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                                     Specifications
//                                 </h3>
//                             </div>
//                             {brand && <SpecRow label="Brand">{brand}</SpecRow>}
//                             {category && <SpecRow label="Category">{category}</SpecRow>}
//                             <SpecRow label="Availability">
//                                 <span className={inStock ? 'text-green-400' : 'text-red-400'}>
//                                     {inStock ? `${stock ?? '∞'} in stock` : 'Unavailable'}
//                                 </span>
//                             </SpecRow>
//                             {discount > 0 && (
//                                 <SpecRow label="Discount"><span className="text-red-500">{discount}% OFF</span></SpecRow>
//                             )}
//                             <SpecRow label="SKU"><span className="text-white/50 text-xs">{id?.slice(-10).toUpperCase()}</span></SpecRow>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ─── Related ─── */}
//                 {related.length > 0 && (
//                     <section className="border-t border-white/[0.06] pt-12">
//                         <div className="flex items-end justify-between mb-8">
//                             <div>
//                                 <Eyebrow icon={Zap} text="You Might Also Like" />
//                                 <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                                     Related Products
//                                 </h2>
//                             </div>
//                             <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition">
//                                 View All <ChevronRight size={14} />
//                             </Link>
//                         </div>

//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {related.map(p => <ProductCard key={p._id} product={p} />)}
//                         </div>
//                     </section>
//                 )}
//             </div>

//             <Footer />
//         </div>
//     )
// }



// src/pages/userSide/ProductDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    ShoppingCart, ArrowLeft, Star, Shield, Truck, Package,
    ChevronLeft, ChevronRight, Minus, Plus, Zap, Award, RotateCcw
} from 'lucide-react'
import api from '../../config/service'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../../components/ProductCard'
import toast from 'react-hot-toast'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

const PLACEHOLDER = 'https://placehold.co/800x800/0c1418/333?text=No+Image'

const toastStyle = {
    background: '#0f1418',
    color: '#e2eef1',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    fontSize: '13px',
}

/* ─── Small reusable bits ─── */
const Eyebrow = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-600/60" />
        <Icon size={14} className="text-red-500" />
        <span className="text-[11px] tracking-[0.3em] uppercase text-red-500/90 font-semibold"
            style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {text}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-red-600/60 via-white/10 to-transparent" />
    </div>
)

const SpecRow = ({ label, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40"
            style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {label}
        </span>
        <span className="text-sm text-white/90 font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {children}
        </span>
    </div>
)

const Feature = ({ icon: Icon, title, desc }) => (
    <div className="group flex items-start gap-3 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-red-600/30 hover:bg-red-600/[0.03] transition-all">
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon size={16} className="text-red-500" />
        </div>
        <div>
            <p className="text-sm font-semibold text-white/95" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{title}</p>
            <p className="text-xs text-white/50 mt-0.5">{desc}</p>
        </div>
    </div>
)

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { isAuthed } = useAuth()
    const navigate = useNavigate()
    const { products } = useProducts()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imgIdx, setImgIdx] = useState(0)
    const [qty, setQty] = useState(1)
    const [imgError, setImgErr] = useState(false)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoading(true)
        setImgIdx(0)
        api.get(`/products/getProduct/${id}`)
            .then(r => setProduct(r.data?.getOne || r.data))
            .catch(() => {
                const local = products.find(p => p._id === id)
                if (local) setProduct(local)
            })
            .finally(() => setLoading(false))
    }, [id])

    /* ── Loading skeleton ── */
    if (loading) return (
        <div className="min-h-screen bg-[#070a0c] noise relative">
            <style>{noiseCSS}</style>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 grid lg:grid-cols-2 gap-12">
                <div className="sk aspect-square" />
                <div className="space-y-4">
                    {[60, 80, 40, 55, 100, 70, 45].map((w, i) => (
                        <div key={i} className="sk h-6" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>
        </div>
    )

    /* ── Not found ── */
    if (!product) return (
        <div className="min-h-screen bg-[#070a0c] noise relative">
            <style>{noiseCSS}</style>
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 py-32 text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                    <Package size={28} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Product Not Found
                </h1>
                <p className="text-white/50 mb-8">This product may have been removed or doesn't exist.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-colors">
                    <ArrowLeft size={16} /> Back to Shop
                </Link>
            </div>
        </div>
    )

    const {
        title, brand, category, description,
        image, images = [], price, stock, discount = 0, featured = false,
    } = product

    const oldPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : null
    const allImgs = Array.isArray(images) && images.length ? images : image ? [image] : [PLACEHOLDER]
    const mainImg = imgError ? PLACEHOLDER : allImgs[imgIdx]
    const inStock = stock === undefined ? true : stock > 0
    const related = products.filter(p => p.category === category && p._id !== id).slice(0, 4)

    /* ── Auth-gated Add to Cart ── */
    const handleAdd = () => {
        if (!isAuthed) {
            toast('Please login to continue', {
                icon: '🔐',
                style: { ...toastStyle, border: '1px solid rgba(251,191,36,0.35)' },
            })
            navigate('/login')
            return
        }
        if (!inStock || adding) return

        setAdding(true)
        dispatch(addToCart({ ...product, qty }))
        toast.success(`${qty}× ${title} added to cart`, {
            style: toastStyle,
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
        })
        setTimeout(() => setAdding(false), 1400)
    }

    const nextImg = () => setImgIdx((imgIdx + 1) % allImgs.length)
    const prevImg = () => setImgIdx((imgIdx - 1 + allImgs.length) % allImgs.length)

    return (
        <div className="min-h-screen bg-[#070a0c] noise relative text-white/90"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <style>{noiseCSS}</style>

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs mb-8 text-white/40">
                    {[
                        { label: 'Home', to: '/' },
                        { label: 'Shop', to: '/shop' },
                        ...(category ? [{ label: category, to: `/shop?category=${encodeURIComponent(category)}` }] : []),
                    ].map(({ label, to }) => (
                        <span key={label} className="flex items-center gap-2">
                            <Link to={to} className="hover:text-red-500 transition-colors uppercase tracking-wider">{label}</Link>
                            <span className="text-white/20">/</span>
                        </span>
                    ))}
                    <span className="text-white/70 uppercase tracking-wider truncate">{title}</span>
                </nav>

                <Eyebrow icon={Package} text="Product Detail" />

                {/* Main grid */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-20">

                    {/* ─── Gallery ─── */}
                    <div className="space-y-4">
                        <div className="corner-frame relative aspect-square bg-gradient-to-br from-[#0c1418] to-[#070a0c] border border-white/[0.06] overflow-hidden group">
                            <img
                                src={mainImg}
                                alt={title}
                                onError={() => setImgErr(true)}
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                            />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-bold tracking-wider"
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    -{discount}%
                                </div>
                            )}
                            {featured && (
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur border border-red-600/30 text-red-500 text-[10px] font-bold tracking-wider uppercase">
                                    <Star size={10} className="fill-red-500" /> Featured
                                </div>
                            )}
                            {allImgs.length > 1 && (
                                <>
                                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100">
                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </div>

                        {allImgs.length > 1 && (
                            <div className="grid grid-cols-5 gap-2">
                                {allImgs.slice(0, 5).map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setImgIdx(i); setImgErr(false) }}
                                        className={`aspect-square border overflow-hidden transition-all ${i === imgIdx
                                            ? 'border-red-600 ring-1 ring-red-600/40'
                                            : 'border-white/[0.08] hover:border-white/20'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain p-2 bg-[#0c1418]" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ─── Details ─── */}
                    <div className="flex flex-col">
                        {brand && (
                            <span className="text-[11px] tracking-[0.3em] uppercase text-red-500 font-semibold mb-3"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {brand}
                            </span>
                        )}

                        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
                            style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {title}
                        </h1>

                        {/* Rating + stock */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={14} className="fill-red-500 text-red-500" />
                                ))}
                            </div>
                            <span className="text-xs text-white/40">(Verified Product)</span>
                            <span className="text-white/20">·</span>
                            <span className="flex items-center gap-1 text-xs">
                                <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                <span className={inStock ? 'text-green-400' : 'text-red-400'}>
                                    {inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/[0.06]">
                            <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                Rs. {price?.toLocaleString()}
                            </span>
                            {oldPrice && (
                                <>
                                    <span className="text-lg text-white/30 line-through">Rs. {oldPrice.toLocaleString()}</span>
                                    <span className="text-xs text-green-400 font-semibold">Save Rs. {(oldPrice - price).toLocaleString()}</span>
                                </>
                            )}
                        </div>

                        {description && (
                            <p className="text-sm leading-relaxed text-white/60 mb-6">{description}</p>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="flex items-center border border-white/10 bg-white/[0.02]">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white/[0.03] transition"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-12 text-center font-bold text-white"
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white/[0.03] transition"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <button
                                onClick={handleAdd}
                                disabled={!inStock || adding}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5
                                           bg-red-600 hover:bg-red-700
                                           disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed
                                           text-white font-bold tracking-wider uppercase text-sm transition-all"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                <ShoppingCart size={16} />
                                {/* Guest sees the same label — guard fires on click */}
                                {!inStock ? 'Out of Stock' : adding ? 'Added!' : 'Add to Cart'}
                            </button>
                        </div>

                        {/* Guest nudge — subtle hint below the button */}
                        {!isAuthed && inStock && (
                            <p className="text-[11px] text-white/30 tracking-wide mb-4"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                <Link to="/login" className="text-red-500/70 hover:text-red-400 transition-colors">
                                    Login
                                </Link>{' '}
                                required to add items to cart.
                            </p>
                        )}

                        {/* Feature strip */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
                            <Feature icon={Truck} title="Fast Delivery" desc="2–4 business days" />
                            <Feature icon={Shield} title="Secure Payment" desc="100% protected" />
                            <Feature icon={RotateCcw} title="Easy Returns" desc="7-day policy" />
                        </div>

                        {/* Specs */}
                        <div className="border border-white/[0.06] bg-white/[0.02] p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Award size={14} className="text-red-500" />
                                <h3 className="text-[11px] tracking-[0.3em] uppercase text-white/70 font-semibold"
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Specifications
                                </h3>
                            </div>
                            {brand && <SpecRow label="Brand">{brand}</SpecRow>}
                            {category && <SpecRow label="Category">{category}</SpecRow>}
                            <SpecRow label="Availability">
                                <span className={inStock ? 'text-green-400' : 'text-red-400'}>
                                    {inStock ? `${stock ?? '∞'} in stock` : 'Unavailable'}
                                </span>
                            </SpecRow>
                            {discount > 0 && (
                                <SpecRow label="Discount"><span className="text-red-500">{discount}% OFF</span></SpecRow>
                            )}
                            <SpecRow label="SKU">
                                <span className="text-white/50 text-xs">{id?.slice(-10).toUpperCase()}</span>
                            </SpecRow>
                        </div>
                    </div>
                </div>

                {/* ─── Related products ─── */}
                {related.length > 0 && (
                    <section className="border-t border-white/[0.06] pt-12">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <Eyebrow icon={Zap} text="You Might Also Like" />
                                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Related Products
                                </h2>
                            </div>
                            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {related.map(p => <ProductCard key={p._id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </div>
    )
}

/* ── Shared CSS injected once ── */
const noiseCSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
.noise::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:0.35;}
.noise::after{content:'';position:fixed;top:-20%;left:-10%;width:50%;height:60%;background:radial-gradient(ellipse,rgba(220,38,38,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;}
.corner-frame{position:relative;}
.corner-frame::before,.corner-frame::after{content:'';position:absolute;width:14px;height:14px;border:1px solid rgba(220,38,38,0.5);}
.corner-frame::before{top:-1px;left:-1px;border-right:none;border-bottom:none;}
.corner-frame::after{bottom:-1px;right:-1px;border-left:none;border-top:none;}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.7}}
.sk{background:rgba(255,255,255,0.04);border-radius:12px;animation:pulse 1.6s ease infinite;}
`
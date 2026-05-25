import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const PH = 'https://placehold.co/400x400/0e0404/333?text=NOIR'

export default function ProductCard({ product, index = 0 }) {
    const { addToCart } = useCart()
    const [wished, setWished] = useState(false)
    const [imgErr, setImgErr] = useState(false)

    const {
        _id, name = 'Unnamed', price = 0, oldPrice,
        category = '', images = [], image,
        stock, rating, numReviews,
    } = product

    const imgSrc = imgErr ? PH : (Array.isArray(images) && images[0]) || image || PH
    const inStock = stock === undefined ? true : stock > 0
    const discount = oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null

    const handleAdd = (e) => {
        e.preventDefault()
        if (!inStock) return
        addToCart(product)
        toast.success(`Added to cart`, {
            style: { background: 'rgba(14,4,4,0.95)', color: '#f5f5f5', border: '1px solid rgba(220,38,38,0.3)', fontFamily: 'Rajdhani', letterSpacing: '0.04em' },
            iconTheme: { primary: '#ef4444', secondary: '#0e0404' },
        })
    }

    const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4']
    const delayClass = delays[index % 4]

    return (
        <Link to={`/product/${_id}`} className="no-underline block group">
            <div className={`card-dark card-dark-hover fade-up ${delayClass} overflow-hidden h-full flex flex-col`}>

                {/* Image */}
                <div className="relative overflow-hidden aspect-square"
                    style={{ background: 'rgba(8,2,2,0.8)' }}>
                    <img src={imgSrc} alt={name} onError={() => setImgErr(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {discount && (
                            <span className="badge-red">-{discount}%</span>
                        )}
                        {!inStock && (
                            <span style={{ fontFamily: 'Orbitron', fontSize: '8px', letterSpacing: '0.14em', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '2px 8px' }}>
                                SOLD OUT
                            </span>
                        )}
                    </div>

                    {/* Wishlist */}
                    <button onClick={e => { e.preventDefault(); setWished(!wished) }}
                        className="absolute top-3 right-3 w-7 h-7 rounded-[8px] flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-all duration-200"
                        style={{ background: 'rgba(8,2,2,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Heart size={13} className={wished ? 'fill-red-500 text-red-500' : 'text-white/40'} />
                    </button>

                    {/* Add to cart overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <button onClick={handleAdd} disabled={!inStock}
                            className="w-full btn-red-solid py-2 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ fontSize: '10px', padding: '9px 16px' }}>
                            <ShoppingCart size={13} />
                            {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1 gap-1.5">
                    {category && (
                        <span className="section-label" style={{ fontSize: '8px' }}>{category}</span>
                    )}

                    <h3 className="font-rajdhani text-[14px] font-semibold tracking-wide leading-snug line-clamp-2"
                        style={{ color: 'rgba(255,255,255,0.85)' }}>
                        {name}
                    </h3>

                    {rating !== undefined && (
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={10}
                                    className={s <= Math.round(rating) ? 'text-red-500 fill-red-500' : 'text-white/10'} />
                            ))}
                            {numReviews !== undefined && (
                                <span className="font-rajdhani text-[11px] text-white/25 tracking-wide">({numReviews})</span>
                            )}
                        </div>
                    )}

                    {/* Price */}
                    <div className="mt-auto pt-2 flex items-baseline gap-2">
                        <span className="font-orbitron text-[15px] font-bold text-white">
                            Rs. {price.toLocaleString()}
                        </span>
                        {oldPrice && oldPrice > price && (
                            <span className="font-rajdhani text-[12px] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                Rs. {oldPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
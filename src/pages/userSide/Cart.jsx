import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Tag, Shield, Truck, Plus, Minus } from 'lucide-react'
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/cartSelectors";

import { removeFromCart, clearCart, updateQty } from '../../redux/slices/cartSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const PLACEHOLDER = 'https://placehold.co/120x120/0a0a0a/333?text=NOIR'

export default function Cart() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.items);
  console.log("CART STATE FULL:", cartState);

  const items = useSelector(selectCartItems);
  console.log(items, "check");

  const total = useSelector(selectCartTotal);

  const [promo, setPromo] = useState('')
  const [discount, setDisc] = useState(0)

  const tax = Math.round(total * 0.16)
  const shipping = total > 2000 ? 0 : 200
  const grandTotal = total - discount + tax + shipping
  const itemCount = Array.isArray(items)
    ? items.reduce((s, i) => s + i.qty, 0)
    : 0;

  const toastStyle = {
    style: { background: '#0a0a0a', color: '#fff', border: '1px solid #1f1f1f', borderRadius: '2px', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' },
  }

  const applyPromo = () => {
    if (promo.toUpperCase() === 'NOIR10') {
      setDisc(Math.round(total * 0.1))
      toast.success('PROMO ACCEPTED — 10% OFF', toastStyle)
    } else {
      toast.error('INVALID CODE', toastStyle)
    }
  }

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
      `}</style>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 fade-in">
        {/* Header */}
        <div className="mb-12 border-b border-neutral-900 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-red-600" />
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase">
              [ 01 ] / Review
            </p>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              Your <span className="text-red-600">Cart</span>
            </h1>
            <div className="text-right">
              <p className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-600 uppercase mb-1">Units</p>
              <p className="font-orbitron text-2xl text-white font-bold">
                {String(itemCount).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto py-24 text-center fade-in">
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 border border-neutral-900 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag size={36} className="text-red-600" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-red-600 uppercase mb-3">// Empty</p>
            <h2 className="font-orbitron text-2xl text-white mb-3 uppercase tracking-wider">
              No Items Selected
            </h2>
            <p className="text-neutral-500 mb-8 tracking-wide">
              The arsenal awaits. Begin your acquisition.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-orbitron text-xs tracking-[0.3em] uppercase transition-colors"
            >
              <ArrowLeft size={14} /> Enter Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item, idx) => {
                const imgSrc =
                  (Array.isArray(item.images) && item.images[0]) || item.image || PLACEHOLDER
                return (
                  <div
                    key={item._id}
                    className="group relative bg-neutral-950/60 border border-neutral-900 hover:border-red-600/40 transition-all p-4 sm:p-5 flex gap-4 sm:gap-5"
                  >
                    {/* index */}
                    <span className="absolute top-3 right-4 font-orbitron text-[10px] text-neutral-700 tracking-widest">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <Link to={`/product/${item._id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-neutral-900 overflow-hidden border border-neutral-900 group-hover:border-red-600/30 transition-colors">
                        <img
                          src={imgSrc}
                          alt={item.name}
                          onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="pr-6">
                        {item.category && (
                          <p className="font-orbitron text-[9px] tracking-[0.3em] text-red-600 uppercase mb-1">
                            {item.category}
                          </p>
                        )}
                        <Link
                          to={`/product/${item._id}`}
                          className="block font-orbitron text-white text-sm sm:text-base font-bold uppercase tracking-wide hover:text-red-500 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-neutral-500 mt-1 tracking-wider">
                          UNIT · Rs. {item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                        <div className="flex items-center border border-neutral-800">
                          <button
                            onClick={() => dispatch(updateQty({ id: item._id, qty: item.qty - 1 }))}
                            className="px-3 py-2 text-neutral-500 hover:text-red-500 hover:bg-neutral-900 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-4 font-orbitron text-white text-sm font-bold min-w-[2.5rem] text-center">
                            {String(item.qty).padStart(2, '0')}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(updateQty({ id: item._id, qty: item.qty + 1 }))
                            }
                            className="px-3 py-2 text-neutral-500 hover:text-red-500 hover:bg-neutral-900 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-orbitron text-white font-bold text-base">
                            Rs. {(item.price * item.qty).toLocaleString()}
                          </span>
                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="text-neutral-700 hover:text-red-600 transition-colors p-1"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="flex items-center justify-between pt-6 border-t border-neutral-900">
                <Link
                  to="/shop"
                  className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-400 hover:text-red-500 uppercase flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft size={14} /> Continue
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="font-orbitron text-[11px] tracking-[0.25em] text-neutral-600 hover:text-red-600 uppercase flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={12} /> Clear All
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-neutral-950/80 border border-neutral-900 backdrop-blur-sm">
                {/* header bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-black/40">
                  <h2 className="font-orbitron text-white text-sm font-bold uppercase tracking-[0.2em]">
                    Summary
                  </h2>
                  <span className="font-orbitron text-[10px] text-red-600 tracking-[0.3em]">// 02</span>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {[
                      ['Subtotal', `Rs. ${total.toLocaleString()}`],
                      ['Shipping', shipping === 0 ? 'FREE' : `Rs. ${shipping}`],
                      ['Tax (16%)', `Rs. ${tax.toLocaleString()}`],
                      ...(discount > 0 ? [['Discount', `-Rs. ${discount.toLocaleString()}`]] : []),
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        className="flex justify-between items-center text-sm tracking-wide"
                      >
                        <span className="text-neutral-500 uppercase text-xs font-orbitron tracking-[0.15em]">
                          {label}
                        </span>
                        <span
                          className={
                            label === 'Discount'
                              ? 'text-red-500 font-orbitron font-bold'
                              : 'text-neutral-200 font-orbitron font-medium'
                          }
                        >
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-800 pt-4 mb-6 flex justify-between items-baseline">
                    <span className="font-orbitron text-white text-xs uppercase tracking-[0.2em]">
                      Total
                    </span>
                    <span className="font-orbitron text-white text-2xl font-black">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Promo */}
                  <div className="mb-5">
                    <label className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-600 uppercase block mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                        />
                        <input
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                          placeholder="NOIR10"
                          className="w-full bg-black border border-neutral-900 focus:border-red-600 outline-none py-2.5 pl-9 pr-3 text-sm text-white font-orbitron tracking-widest uppercase placeholder:text-neutral-700 transition-colors"
                        />
                      </div>
                      <button
                        onClick={applyPromo}
                        className="px-4 border border-neutral-800 hover:border-red-600 hover:text-red-500 font-orbitron text-[10px] tracking-[0.25em] uppercase text-neutral-300 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <Link to={'/checkout'}
                    className="group w-full bg-red-600 hover:bg-red-700 text-white font-orbitron text-xs tracking-[0.3em] uppercase py-4 flex items-center justify-center gap-3 transition-all"
                  >
                    Checkout
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  {/* meta */}
                  <div className="mt-5 pt-5 border-t border-neutral-900 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-orbitron tracking-[0.2em] text-neutral-600 uppercase">
                      <Shield size={11} className="text-red-600" />
                      SSL Encrypted Checkout
                    </div>
                    {shipping > 0 && (
                      <div className="flex items-center gap-2 text-[10px] font-orbitron tracking-[0.2em] text-neutral-600 uppercase">
                        <Truck size={11} className="text-red-600" />
                        Add Rs. {(2000 - total).toLocaleString()} for free shipping
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

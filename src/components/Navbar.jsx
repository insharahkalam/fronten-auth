// import { useState } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { ShoppingCart, Search, Menu, X, Zap, Heart, User, LogIn } from 'lucide-react'
// import { useCart } from '../context/CartContext'

// export default function Navbar() {
//   const { count } = useCart()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [searchOpen, setSearch] = useState(false)
//   const [query, setQuery] = useState('')
//   const navigate = useNavigate()

//   // TODO: replace with real auth state from your AuthContext
//   const isAuthed = false
//   const wishlistCount = 0

//   const links = [
//     { to: '/home', label: 'Home' },
//     { to: '/shop', label: 'Shop' },
//     { to: '/about', label: 'About' },
//     { to: '/contact', label: 'Contact' },
//   ]

//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (!query.trim()) return
//     navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
//     setQuery(''); setSearch(false); setMenuOpen(false)
//   }

//   const iconBtn =
//     'relative p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/[0.04] transition-all no-underline'

//   const Badge = ({ value, tone = 'red' }) => (
//     <span
//       className={`absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 ${
//         tone === 'red' ? 'bg-red-600' : 'bg-amber-500'
//       } text-white font-orbitron text-[9px] font-black rounded-full flex items-center justify-center pulse-glow`}
//     >
//       {value > 9 ? '9+' : value}
//     </span>
//   )

//   return (
//     <nav
//       style={{
//         background: 'rgba(8,2,2,0.95)',
//         backdropFilter: 'blur(12px)',
//         borderBottom: '1px solid rgba(255,255,255,0.05)',
//       }}
//       className="sticky top-0 z-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 gap-4">
//           {/* Logo */}
//           <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
//             <div className="icon-box w-8 h-8">
//               <Zap size={14} fill="currentColor" />
//             </div>
//             <span className="font-orbitron text-[18px] font-black tracking-[0.12em] text-white">
//               NOIR<span className="text-red-500 glow-red">.</span>
//             </span>
//           </Link>

//           {/* Desktop nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 end={l.to === '/'}
//                 className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
//               >
//                 {l.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right cluster */}
//           <div className="flex items-center gap-1">
//             {/* Search */}
//             {searchOpen ? (
//               <form onSubmit={handleSearch} className="flex items-center gap-2 fade-up">
//                 <input
//                   autoFocus
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search products…"
//                   className="input-dark w-40 sm:w-52 py-2 text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setSearch(false)}
//                   aria-label="Close search"
//                   className="text-white/30 hover:text-white/70 p-1.5 transition-colors"
//                 >
//                   <X size={16} />
//                 </button>
//               </form>
//             ) : (
//               <button
//                 onClick={() => setSearch(true)}
//                 aria-label="Search"
//                 className={iconBtn}
//               >
//                 <Search size={18} />
//               </button>
//             )}

//             {/* Wishlist */}
//             <Link to="/wishlist" aria-label="Wishlist" className={iconBtn}>
//               <Heart size={18} />
//               {wishlistCount > 0 && <Badge value={wishlistCount} tone="amber" />}
//             </Link>

//             {/* Cart */}
//             <Link to="/cart" aria-label="Cart" className={iconBtn}>
//               <ShoppingCart size={18} />
//               {count > 0 && <Badge value={count} />}
//             </Link>

//             {/* Divider */}
//             <span className="hidden sm:block w-px h-6 bg-white/10 mx-1" />

//             {/* Auth */}
//             {isAuthed ? (
//               <Link
//                 to="/account"
//                 aria-label="Account"
//                 className={`${iconBtn} hidden sm:inline-flex`}
//               >
//                 <User size={18} />
//               </Link>
//             ) : (
//               <div className="hidden sm:flex items-center gap-1.5">
//                 <Link
//                   to="/login"
//                   className="px-3 py-1.5 font-orbitron text-[10px] tracking-[0.15em] uppercase
//                              text-white/60 hover:text-white transition-colors no-underline"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/"
//                   className="px-3.5 py-1.5 font-orbitron text-[10px] tracking-[0.15em] uppercase
//                              bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg
//                              shadow-[0_4px_14px_-4px_rgba(220,38,38,0.6)]
//                              hover:shadow-[0_6px_20px_-4px_rgba(220,38,38,0.8)]
//                              transition-all no-underline"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile toggle */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Menu"
//               className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
//             >
//               {menuOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile drawer */}
//       {menuOpen && (
//         <div
//           className="md:hidden border-t fade-up"
//           style={{ background: 'rgba(8,2,2,0.98)', borderColor: 'rgba(255,255,255,0.05)' }}
//         >
//           <div className="px-4 py-4 space-y-1">
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 end={l.to === '/'}
//                 onClick={() => setMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `block px-3 py-2.5 rounded-[10px] font-orbitron text-[10px] tracking-[0.15em] uppercase transition-all
//                    ${
//                      isActive
//                        ? 'text-red-400 bg-red-600/10 border border-red-600/25'
//                        : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
//                    }`
//                 }
//               >
//                 {l.label}
//               </NavLink>
//             ))}

//             {/* Mobile wishlist link */}
//             <NavLink
//               to="/wishlist"
//               onClick={() => setMenuOpen(false)}
//               className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] font-orbitron text-[10px]
//                          tracking-[0.15em] uppercase text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
//             >
//               <Heart size={14} /> Wishlist
//               {wishlistCount > 0 && (
//                 <span className="ml-auto text-amber-400">{wishlistCount}</span>
//               )}
//             </NavLink>

//             {/* Mobile auth */}
//             <div className="pt-3 mt-2 border-t border-white/[0.06] grid grid-cols-2 gap-2">
//               {isAuthed ? (
//                 <Link
//                   to="/account"
//                   onClick={() => setMenuOpen(false)}
//                   className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-lg
//                              bg-white/[0.04] text-white/80 font-orbitron text-[10px] tracking-[0.15em] uppercase no-underline"
//                 >
//                   <User size={14} /> My Account
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-center gap-2 py-2.5 rounded-lg
//                                bg-white/[0.04] text-white/80 font-orbitron text-[10px] tracking-[0.15em] uppercase no-underline"
//                   >
//                     <LogIn size={14} /> Login
//                   </Link>
//                   <Link
//                     to="/"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-center gap-2 py-2.5 rounded-lg
//                                bg-gradient-to-r from-red-600 to-red-500 text-white
//                                font-orbitron text-[10px] tracking-[0.15em] uppercase
//                                shadow-[0_4px_14px_-4px_rgba(220,38,38,0.6)] no-underline"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>

//             <form onSubmit={handleSearch} className="flex gap-2 pt-3">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search…"
//                 className="input-dark text-sm py-2"
//               />
//               <button type="submit" className="btn-red px-4 py-2">
//                 Go
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }



import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, Zap, Heart, User, LogIn } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WISHLIST_KEY = 'wishlist:v1'

function getWishlistCount() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw).length : 0
  } catch { return 0 }
}

export default function Navbar() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount)
  const navigate = useNavigate()

  // TODO: replace with real auth state from your AuthContext
  const isAuthed = false

  // Re-read wishlist count whenever localStorage changes
  // (covers same-tab updates via custom event + cross-tab via storage event)
  useEffect(() => {
    const sync = () => setWishlistCount(getWishlistCount())

    // Cross-tab sync
    window.addEventListener('storage', sync)
    // Same-tab sync — ProductCard dispatches this after writing localStorage
    window.addEventListener('wishlist-updated', sync)

    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('wishlist-updated', sync)
    }
  }, [])

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
    setQuery(''); setSearch(false); setMenuOpen(false)
  }

  const iconBtn =
    'relative p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/[0.04] transition-all no-underline'

  const Badge = ({ value, tone = 'red' }) => (
    <span
      className={`absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 ${tone === 'red' ? 'bg-red-600' : 'bg-amber-500'
        } text-white font-orbitron text-[9px] font-black rounded-full flex items-center justify-center pulse-glow`}
    >
      {value > 9 ? '9+' : value}
    </span>
  )

  return (
    <nav
      style={{
        background: 'rgba(8,2,2,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
            <div className="icon-box w-8 h-8">
              <Zap size={14} fill="currentColor" />
            </div>
            <span className="font-orbitron text-[18px] font-black tracking-[0.12em] text-white">
              NOIR<span className="text-red-500 glow-red">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 fade-up">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="input-dark w-40 sm:w-52 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setSearch(false)}
                  aria-label="Close search"
                  className="text-white/30 hover:text-white/70 p-1.5 transition-colors"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearch(true)}
                aria-label="Search"
                className={iconBtn}
              >
                <Search size={18} />
              </button>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" aria-label="Wishlist" className={iconBtn}>
              <Heart size={18} />
              {wishlistCount > 0 && <Badge value={wishlistCount} tone="amber" />}
            </Link>

            {/* Cart */}
            <Link to="/cart" aria-label="Cart" className={iconBtn}>
              <ShoppingCart size={18} />
              {count > 0 && <Badge value={count} />}
            </Link>

            {/* Divider */}
            <span className="hidden sm:block w-px h-6 bg-white/10 mx-1" />

            {/* Auth */}
            {isAuthed ? (
              <Link
                to="/account"
                aria-label="Account"
                className={`${iconBtn} hidden sm:inline-flex`}
              >
                <User size={18} />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-3 py-1.5 font-orbitron text-[10px] tracking-[0.15em] uppercase
                             text-white/60 hover:text-white transition-colors no-underline"
                >
                  Login
                </Link>
                <Link
                  to="/"
                  className="px-3.5 py-1.5 font-orbitron text-[10px] tracking-[0.15em] uppercase
                             bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg
                             shadow-[0_4px_14px_-4px_rgba(220,38,38,0.6)]
                             hover:shadow-[0_6px_20px_-4px_rgba(220,38,38,0.8)]
                             transition-all no-underline"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t fade-up"
          style={{ background: 'rgba(8,2,2,0.98)', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-[10px] font-orbitron text-[10px] tracking-[0.15em] uppercase transition-all
                   ${isActive
                    ? 'text-red-400 bg-red-600/10 border border-red-600/25'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            {/* Mobile wishlist link */}
            <NavLink
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] font-orbitron text-[10px]
                         tracking-[0.15em] uppercase text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
            >
              <Heart size={14} /> Wishlist
              {wishlistCount > 0 && (
                <span className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                               bg-gradient-to-r from-red-600 to-red-500 text-white
                               font-orbitron text-[10px] tracking-[0.15em] uppercase
                               shadow-[0_4px_14px_-4px_rgba(220,38,38,0.6)] no-underline">{wishlistCount}</span>
              )}
            </NavLink>

            {/* Mobile auth */}
            <div className="pt-3 mt-2 border-t border-white/[0.06] grid grid-cols-2 gap-2">
              {isAuthed ? (
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-lg
                             bg-white/[0.04] text-white/80 font-orbitron text-[10px] tracking-[0.15em] uppercase no-underline"
                >
                  <User size={14} /> My Account
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                               bg-white/[0.04] text-white/80 font-orbitron text-[10px] tracking-[0.15em] uppercase no-underline"
                  >
                    <LogIn size={14} /> Login
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                               bg-gradient-to-r from-red-600 to-red-500 text-white
                               font-orbitron text-[10px] tracking-[0.15em] uppercase
                               shadow-[0_4px_14px_-4px_rgba(220,38,38,0.6)] no-underline"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex gap-2 pt-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="input-dark text-sm py-2"
              />
              <button type="submit" className="btn-red px-4 py-2">
                Go
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  )
}
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { count } = useCart()
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearch] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

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

    return (
        <nav style={{ background: 'rgba(8,2,2,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            className="sticky top-0 z-50">
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
                        {links.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.to === '/'}
                                className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
                                {l.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        {searchOpen ? (
                            <form onSubmit={handleSearch} className="flex items-center gap-2 fade-up">
                                <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                                    placeholder="Search products…"
                                    className="input-dark w-40 sm:w-52 py-2 text-sm" />
                                <button type="button" onClick={() => setSearch(false)}
                                    className="text-white/30 hover:text-white/70 p-1.5 transition-colors">
                                    <X size={16} />
                                </button>
                            </form>
                        ) : (
                            <button onClick={() => setSearch(true)}
                                className="p-2 text-white/30 hover:text-red-400 transition-colors">
                                <Search size={18} />
                            </button>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 text-white/30 hover:text-red-400 transition-colors no-underline">
                            <ShoppingCart size={18} />
                            {count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white
                  font-orbitron text-[9px] font-black rounded-full flex items-center justify-center pulse-glow">
                                    {count > 9 ? '9+' : count}
                                </span>
                            )}
                        </Link>

                        {/* Mobile toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 text-white/30 hover:text-white transition-colors">
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            {menuOpen && (
                <div className="md:hidden border-t fade-up"
                    style={{ background: 'rgba(8,2,2,0.98)', borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="px-4 py-4 space-y-1">
                        {links.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.to === '/'}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2.5 rounded-[10px] font-orbitron text-[10px] tracking-[0.15em] uppercase transition-all
                   ${isActive
                                        ? 'text-red-400 bg-red-600/10 border border-red-600/25'
                                        : 'text-white/30 hover:text-white/70 hover:bg-white/[0.03]'}`}>
                                {l.label}
                            </NavLink>
                        ))}
                        <form onSubmit={handleSearch} className="flex gap-2 pt-2">
                            <input value={query} onChange={e => setQuery(e.target.value)}
                                placeholder="Search…" className="input-dark text-sm py-2" />
                            <button type="submit" className="btn-red px-4 py-2">Go</button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    )
}
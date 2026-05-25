import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(6,1,1,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 no-underline">
              <div className="icon-box w-8 h-8"><Zap size={14} fill="currentColor" /></div>
              <span className="font-orbitron text-[17px] font-black tracking-[0.12em] text-white">
                NOIR<span className="text-red-500 glow-red">.</span>
              </span>
            </Link>
            <p className="text-[13px] text-white/25 tracking-wide leading-relaxed">
              Premium products curated for those who demand excellence in every purchase.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="section-label mb-4">Shop</p>
            <ul className="space-y-2.5">
              {['All Products','Electronics','Fashion','Footwear','Home & Living'].map(l => (
                <li key={l}>
                  <Link to="/shop"
                    className="font-rajdhani text-sm text-white/30 hover:text-red-400 transition-colors no-underline tracking-wide">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="section-label mb-4">Company</p>
            <ul className="space-y-2.5">
              {[['About','/about'],['Contact','/contact'],['Privacy','#'],['Terms','#']].map(([l,h]) => (
                <li key={l}>
                  <Link to={h}
                    className="font-rajdhani text-sm text-white/30 hover:text-red-400 transition-colors no-underline tracking-wide">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-4">Contact</p>
            <ul className="space-y-3">
              {[[Mail,'hello@noir.store'],[Phone,'+92 21 3456 7890'],[MapPin,'Karachi, Pakistan']].map(([Icon,text]) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={13} className="text-red-500 flex-shrink-0" />
                  <span className="font-rajdhani text-sm text-white/30 tracking-wide">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="section-label" style={{ fontSize: '8px' }}>© 2025 NOIR. ALL RIGHTS RESERVED.</p>
          <p className="section-label" style={{ fontSize: '8px' }}>CRAFTED WITH PRECISION ✦</p>
        </div>
      </div>
    </footer>
  )
}
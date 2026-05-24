// import { useState } from "react";
// import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//     LayoutDashboard,
//     Users,
//     Package,
//     PlusSquare,
//     Menu,
//     X,
//     Zap,
//     Shield,
//     Bell,
//     LogOut
// } from "lucide-react";
// import api from "../config/service";
// import toast from 'react-hot-toast'
// const navLinks = [
//     {
//         to: "/dashboard",
//         label: "Dashboard",
//         icon: LayoutDashboard,
//     },
//     {
//         to: "/users",
//         label: "Users",
//         icon: Users,
//     },
//     {
//         to: "/add-product",
//         label: "Add Product",
//         icon: PlusSquare,
//     },
//     {
//         to: "/products",
//         label: "Products",
//         icon: Package,
//     },

// ];

// const pageTitles = {
//     "/dashboard": "Dashboard",
//     "/users": "Users",
//     "/add-product": "Add Product",
//     "/products": "Products",
// };

// export default function AdminLayout() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const location = useLocation();
//     const currentTitle = pageTitles[location.pathname] || "Admin";
//     const closeSidebar = () => setSidebarOpen(false);

//     const navigate = useNavigate()

//     const handleLogout = async () => {
//         try {
//             const res = await api.get('/auth/logout')
//             console.log(res.data)
//             localStorage.clear()
//             toast.success("Logout successful")

//             // redirect to login
//             setTimeout(() => {
//                 navigate('/login');
//             }, 800);

//         } catch (error) {
//             console.log(error)

//             const msg = error.response?.data?.message || "Logout failed"
//             toast.error(msg)
//         }
//     }



//     return (
//         <div className="admin-layout">
//             {/* Mobile overlay */}
//             {sidebarOpen && (
//                 <div className="sidebar-overlay" onClick={closeSidebar} />
//             )}

//             {/* SIDEBAR */}
//             <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//                 {/* Logo */}
//                 <div className="sidebar-logo">
//                     <h1>
//                         <Zap
//                             size={16}
//                             style={{ display: "inline", marginRight: 6, color: "#dc2626" }}
//                         />
//                         NexAdmin
//                     </h1>
//                     <span>E-Commerce Control</span>
//                 </div>

//                 {/* Nav */}
//                 <nav className="sidebar-nav">
//                     <div className="nav-section-label">Main Menu</div>
//                     {navLinks.map(({ to, label, icon: Icon }) => (
//                         <NavLink
//                             key={to}
//                             to={to}
//                             className={({ isActive }) =>
//                                 `nav-link ${isActive ? "active" : ""}`
//                             }
//                             onClick={closeSidebar}
//                         >
//                             <Icon className="nav-icon" />
//                             {label}
//                             {/* Active indicator rendered via CSS .active class */}
//                         </NavLink>
//                     ))}

//                     <div className="nav-section-label" style={{ marginTop: 20 }}>
//                         Session
//                     </div>
//                     <div onClick={handleLogout}
//                         className="nav-link"
//                         style={{ cursor: "default", opacity: 0.5 }}
//                     >
//                         <LogOut className="nav-icon" />
//                         Logout
//                     </div>


//                 </nav>


//             </aside>

//             {/* MAIN CONTENT */}
//             <div className="main-content">
//                 {/* Topbar */}
//                 <header className="topbar">
//                     <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                         <button
//                             className="hamburger"
//                             onClick={() => setSidebarOpen((p) => !p)}
//                             aria-label="Toggle sidebar"
//                         >
//                             {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//                         </button>
//                         <p className="topbar-title">
//                             NexAdmin / <span>{currentTitle}</span>
//                         </p>
//                     </div>
//                     <div className="topbar-right">
//                         <div
//                             style={{ position: "relative", cursor: "pointer" }}
//                             title="Notifications"
//                         >
//                             <Bell size={18} color="var(--text-secondary)" />
//                             <span
//                                 style={{
//                                     position: "absolute",
//                                     top: -3,
//                                     right: -3,
//                                     width: 7,
//                                     height: 7,
//                                     background: "var(--red-primary)",
//                                     borderRadius: "50%",
//                                     boxShadow: "0 0 6px var(--red-glow)",
//                                 }}
//                             />
//                         </div>
//                         <div className="topbar-badge">Live</div>
//                     </div>
//                 </header>

//                 {/* Page */}
//                 <main className="page-content fade-in">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Package, PlusSquare,
  Menu, X, Zap, Bell, LogOut,
} from "lucide-react";
import api from "../config/service";
import toast from "react-hot-toast";

const navLinks = [
  { to: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { to: "/users",       label: "Users",        icon: Users           },
  { to: "/add-product", label: "Add Product",  icon: PlusSquare      },
  { to: "/products",    label: "Products",     icon: Package         },
];

const pageTitles = {
  "/dashboard":   "Dashboard",
  "/users":       "Users",
  "/add-product": "Add Product",
  "/products":    "Products",
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const currentTitle = pageTitles[location.pathname] || "Admin";
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      console.log(res.data);
      localStorage.clear();
      toast.success("Logout successful");
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.35s ease both; }
        /* noise overlay */
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
        /* custom scrollbar */
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 2px; }
      `}</style>

      {/* Root */}
      <div className="noise flex min-h-screen bg-[#050505] font-rajdhani text-[#f5f5f5] relative">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-[90] lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* ════════════ SIDEBAR ════════════ */}
        <aside className={`
          fixed top-0 left-0 h-screen w-[260px] z-[100] flex flex-col
          bg-[rgba(10,3,3,0.88)] backdrop-blur-xl
          border-r border-red-900/30
          shadow-[4px_0_30px_rgba(220,38,38,0.08)]
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}>

          {/* Logo */}
          <div className="px-6 pt-7 pb-5 border-b border-white/[0.06]">
            <h1 className="font-orbitron text-[18px] font-black tracking-[0.1em] uppercase
              bg-gradient-to-br from-white to-red-600 bg-clip-text text-transparent flex items-center gap-2">
              <Zap size={15} className="text-red-600 shrink-0" />
              NexAdmin
            </h1>
            <span className="block text-[10px] tracking-[0.25em] text-white/30 uppercase font-light mt-1">
              E-Commerce Control
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto sidebar-scroll">
            <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase px-3 mb-1.5 pb-1">
              Main Menu
            </p>

            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeSidebar}
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] mb-0.5
                  text-[14px] font-medium tracking-[0.04em] no-underline
                  transition-all duration-200 overflow-hidden group
                  ${isActive
                    ? "text-white bg-red-600/[0.15] border border-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.12),inset_0_0_15px_rgba(220,38,38,0.05)]"
                    : "text-[#a0a0a0] hover:text-white hover:bg-red-600/[0.08]"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* hover glow bg */}
                    <span className="absolute inset-0 bg-gradient-to-br from-red-600/[0.12] to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[10px]" />
                    <Icon
                      size={17}
                      className={`shrink-0 relative z-10 transition-all duration-200
                        ${isActive ? "text-red-500 drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]" : "group-hover:text-red-500"}`}
                    />
                    <span className="relative z-10">{label}</span>
                    {/* active bar */}
                    {isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%]
                        bg-red-500 rounded-l-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Session section */}
            <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase px-3 mt-5 mb-1.5 pb-1">
              Session
            </p>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px]
                text-[14px] font-medium tracking-[0.04em] text-[#a0a0a0]
                hover:text-white hover:bg-red-600/[0.08] transition-all duration-200
                group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-red-600/[0.12] to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[10px]" />
              <LogOut size={17} className="shrink-0 relative z-10 group-hover:text-red-500 transition-colors duration-200" />
              <span className="relative z-10">Logout</span>
            </button>
          </nav>
        </aside>

        {/* ════════════ MAIN CONTENT ════════════ */}
        <div className="flex flex-col flex-1 min-h-screen lg:ml-[260px]">

          {/* ── Topbar ── */}
          <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-7
            bg-[rgba(8,3,3,0.75)] backdrop-blur-xl border-b border-white/[0.05]">

            <div className="flex items-center gap-3.5">
              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden p-1.5 text-[#f5f5f5] hover:text-red-400 transition-colors"
                onClick={() => setSidebarOpen(p => !p)}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <p className="font-orbitron text-[12px] tracking-[0.15em] text-[#555] uppercase">
                NexAdmin / <span className="text-red-500">{currentTitle}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Bell */}
              <div className="relative cursor-pointer p-1" title="Notifications">
                <Bell size={18} className="text-[#a0a0a0] hover:text-white transition-colors" />
                <span className="absolute top-0.5 right-0.5 w-[7px] h-[7px] bg-red-600 rounded-full
                  shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
              </div>

              {/* Live badge */}
              <div className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30
                font-orbitron text-[10px] tracking-[0.1em] text-red-500 uppercase">
                Live
              </div>
            </div>
          </header>

          {/* ── Page content ── */}
          <main className="flex-1 p-7 max-w-[1400px] w-full mx-auto fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
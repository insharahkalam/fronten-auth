// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../config/service";
// import axios from "axios";
// import {
//   Users,
//   Package,
//   ShoppingCart,
//   Activity,
//   ArrowRight,
//   Cpu,
//   Server,
// } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     orders: 0,
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ FETCH STATS
//   const fetchStats = async () => {
//     try {
//       setLoading(true);

//       const usersRes = await api.get('/auth/allUsers');
//       console.log(usersRes, "res user check");

//       const productsRes = await api.get('/products/getAllProduct');
//       console.log(productsRes, "res product check");

//       const users = usersRes?.data.allUser || [];
//       const products = productsRes?.data.getProduct || [];

//       setStats({
//         users: users.length,
//         products: products.length,
//         orders: 0, // agar API nahi hai
//       });
//     } catch (err) {
//       console.log("Error fetching stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const statCards = [
//     {
//       label: "Total Users",
//       value: stats.users,
//       icon: Users,
//       change: "+12.4%",
//       dir: "up",
//     },
//     {
//       label: "Products",
//       value: stats.products,
//       icon: Package,
//       change: "+5 today",
//       dir: "up",
//     },
//     {
//       label: "Orders",
//       value: stats.orders,
//       icon: ShoppingCart,
//       change: "+8.1%",
//       dir: "up",
//     },
//   ];

//   const STATUS_ITEMS = [
//     { label: "API Server", status: "online", uptime: "99.9% uptime" },
//     { label: "Database", status: "online", uptime: "MongoDB · Active" },
//     { label: "CDN", status: "online", uptime: "Global · 12 nodes" },
//     { label: "Auth Service", status: "online", uptime: "JWT · Secure" },
//     { label: "Storage", status: "warning", uptime: "78% used" },
//     { label: "Email Queue", status: "online", uptime: "24 pending" },
//   ];

//   return (
//     <div className="fade-in">

//       {/* Welcome */}
//       <div className="welcome-banner">
//         <h2>
//           Welcome back, <span>Admin</span>
//         </h2>
//         <p>
//           Monitor your users, products and system performance in real-time.
//         </p>
//       </div>

//       {/* Header */}
//       <div className="page-header">
//         <h2>
//           <Activity className="header-icon" size={22} />
//           Overview
//         </h2>
//         <p>Real-time statistics and system health</p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="stats-grid">
//         {statCards.map(({ label, value, icon: Icon, change, dir }) => (
//           <div className="stat-card" key={label}>
//             <div className="stat-icon-wrap">
//               <Icon size={22} />
//             </div>

//             <div className="stat-info">
//               <p>{label}</p>
//               <h3>{loading ? "..." : value}</h3>
//               <div className={`stat-change ${dir}`}>{change}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* SYSTEM STATUS */}
//       <div className="glass-card" style={{ padding: 24 }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: 18,
//           }}
//         >
//           <p className="section-title">
//             <Server size={14} style={{ marginRight: 8 }} />
//             System Status
//           </p>
//         </div>

//         <div className="grid grid-cols-3 gap-5">
//           {STATUS_ITEMS.map(({ label, status, uptime }) => (
//             <div className="status-item" key={label}>
//               <div className={`status-dot ${status}`} />
//               <div>
//                 <p>{label}</p>
//                 <span>{uptime}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* QUICK LINKS */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: 14,
//           marginTop: 20,
//         }}
//       >
//         {[
//           {
//             to: "/add-product",
//             label: "Add Product",
//             icon: Package,
//             desc: "Upload & list a product",
//           },
//           {
//             to: "/users",
//             label: "Manage Users",
//             icon: Users,
//             desc: "View & control accounts",
//           },
//           {
//             to: "/products",
//             label: "Product Catalog",
//             icon: Cpu,
//             desc: "Edit & delete listings",
//           },
//         ].map(({ to, label, icon: Icon, desc }) => (
//           <Link key={to} to={to} className="glass-card">
//             <div
//               style={{
//                 padding: "20px",
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div style={{ display: "flex", gap: 12 }}>
//                 <div className="stat-icon-wrap">
//                   <Icon size={18} />
//                 </div>

//                 <div>
//                   <p style={{ fontWeight: 600 }}>{label}</p>
//                   <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
//                     {desc}
//                   </p>
//                 </div>
//               </div>

//               <ArrowRight size={16} />
//             </div>
//           </Link>
//         ))}
//       </div>

//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../config/service";
// import {
//   Users,
//   Package,
//   ShoppingCart,
//   Activity,
//   ArrowRight,
//   Cpu,
//   Server,
// } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     orders: 0,
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ FETCH STATS
//   const fetchStats = async () => {
//     try {
//       setLoading(true);

//       const usersRes = await api.get("/auth/allUsers");
//       console.log(usersRes, "res user check");

//       const productsRes = await api.get("/products/getAllProduct");
//       console.log(productsRes, "res product check");

//       const users = usersRes?.data.allUser || [];
//       const products = productsRes?.data.getProduct || [];

//       setStats({
//         users: users.length,
//         products: products.length,
//         orders: 0,
//       });
//     } catch (err) {
//       console.log("Error fetching stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const statCards = [
//     { label: "Total Users",  value: stats.users,    icon: Users,        change: "+12.4%",  dir: "up" },
//     { label: "Products",     value: stats.products, icon: Package,      change: "+5 today", dir: "up" },
//     { label: "Orders",       value: stats.orders,   icon: ShoppingCart, change: "+8.1%",   dir: "up" },
//   ];

//   const STATUS_ITEMS = [
//     { label: "API Server",   status: "online",   uptime: "99.9% uptime"     },
//     { label: "Database",     status: "online",   uptime: "MongoDB · Active"  },
//     { label: "CDN",          status: "online",   uptime: "Global · 12 nodes" },
//     { label: "Auth Service", status: "online",   uptime: "JWT · Secure"      },
//     { label: "Storage",      status: "warning",  uptime: "78% used"          },
//     { label: "Email Queue",  status: "online",   uptime: "24 pending"        },
//   ];

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../config/service";
import axios from "axios";
import {
  Users,
  Package,
  ShoppingCart,
  Activity,
  ArrowRight,
  Cpu,
  Server,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH STATS
  const fetchStats = async () => {
    try {
      setLoading(true);

      const usersRes = await api.get('/auth/allUsers');
      console.log(usersRes, "res user check");

      const productsRes = await api.get('/products/getAllProduct');
      console.log(productsRes, "res product check");

      const users = usersRes?.data.allUser || [];
      const products = productsRes?.data.getProduct || [];

      setStats({
        users: users.length,
        products: products.length,
        orders: 0, // agar API nahi hai
      });
    } catch (err) {
      console.log("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      change: "+12.4%",
      dir: "up",
    },
    {
      label: "Products",
      value: stats.products,
      icon: Package,
      change: "+5 today",
      dir: "up",
    },
    {
      label: "Orders",
      value: stats.orders,
      icon: ShoppingCart,
      change: "+8.1%",
      dir: "up",
    },
  ];

  const STATUS_ITEMS = [
    { label: "API Server", status: "online", uptime: "99.9% uptime" },
    { label: "Database", status: "online", uptime: "MongoDB · Active" },
    { label: "CDN", status: "online", uptime: "Global · 12 nodes" },
    { label: "Auth Service", status: "online", uptime: "JWT · Secure" },
    { label: "Storage", status: "warning", uptime: "78% used" },
    { label: "Email Queue", status: "online", uptime: "24 pending" },
  ];


  const statusDotColor = (status) => {
    if (status === "online")  return "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]";
    if (status === "warning") return "bg-yellow-400 shadow-[0_0_6px_2px_rgba(250,204,21,0.6)]";
    return "bg-red-500 shadow-[0_0_6px_2px_rgba(220,38,38,0.7)]";
  };

  return (
    <div className="font-rajdhani text-[#f5f5f5]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up          { animation: fadeUp 0.4s ease both; }
        .delay-1          { animation-delay: 0.05s; }
        .delay-2          { animation-delay: 0.10s; }
        .delay-3          { animation-delay: 0.15s; }

        .stat-card {
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(220,38,38,0.4) !important;
          box-shadow: 0 0 24px rgba(220,38,38,0.08);
        }
        .quick-link {
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .quick-link:hover {
          transform: translateY(-3px);
          background: rgba(220,38,38,0.06) !important;
          border-color: rgba(220,38,38,0.3) !important;
        }
        .quick-link:hover .arrow-icon { color: #ef4444; }
      `}</style>

      {/* ── Welcome Banner ── */}
      <div className="fade-up mb-7 rounded-[14px] border border-red-900/30
          bg-gradient-to-r from-red-600/10 via-red-500/[0.04] to-transparent
          p-6 backdrop-blur-sm
          shadow-[0_0_30px_rgba(220,38,38,0.06)]">
        <h2 className="font-orbitron text-xl font-black tracking-wide text-white">
          Welcome back, <span className="text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]">Admin</span>
        </h2>
        <p className="mt-1 text-sm text-white/40 tracking-wide">
          Monitor your users, products and system performance in real-time.
        </p>
      </div>

      {/* ── Page Header ── */}
      <div className="fade-up delay-1 mb-6 flex items-center gap-2.5">
        <Activity size={16} className="text-red-500 drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]" />
        <div>
          <h2 className="font-orbitron text-[13px] font-bold tracking-[0.12em] uppercase text-white">
            Overview
          </h2>
          <p className="text-[11px] tracking-widest text-white/30 uppercase">Real-time statistics and system health</p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon, change, dir }, i) => (
          <div
            key={label}
            className={`stat-card fade-up delay-${i + 1} rounded-[14px] border border-white/[0.06]
              bg-[rgba(14,4,4,0.7)] backdrop-blur-sm p-5`}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-orbitron text-[9px] tracking-[0.2em] uppercase text-white/30">{label}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px]
                border border-red-600/30 bg-red-600/10 text-red-500
                shadow-[0_0_12px_rgba(220,38,38,0.15)]">
                <Icon size={15} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <h3 className="font-orbitron text-4xl font-black text-white tracking-tight">
                {loading ? (
                  <span className="inline-block h-8 w-14 animate-pulse rounded-lg bg-white/[0.06]" />
                ) : (
                  value
                )}
              </h3>
              <span className={`mb-1 rounded-full px-2.5 py-0.5 font-rajdhani text-xs font-semibold tracking-wide ${
                dir === "up"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── System Status ── */}
      <div className="fade-up delay-2 mb-6 rounded-[14px] border border-white/[0.06]
          bg-[rgba(14,4,4,0.7)] backdrop-blur-sm p-6">
        <div className="mb-5 flex items-center gap-2">
          <Server size={13} className="text-red-500" />
          <p className="font-orbitron text-[9px] tracking-[0.2em] uppercase text-white/30">
            System Status
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STATUS_ITEMS.map(({ label, status, uptime }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-[10px] border border-white/[0.05]
                bg-[rgba(8,2,2,0.6)] px-4 py-3"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${statusDotColor(status)}`} />
              <div>
                <p className="text-[13px] font-semibold tracking-wide text-white/80">{label}</p>
                <span className="text-[11px] tracking-wide text-white/30">{uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { to: "/add-product", label: "Add Product",     icon: Package, desc: "Upload & list a product"  },
          { to: "/users",       label: "Manage Users",    icon: Users,   desc: "View & control accounts"  },
          { to: "/products",    label: "Product Catalog", icon: Cpu,     desc: "Edit & delete listings"   },
        ].map(({ to, label, icon: Icon, desc }, i) => (
          <Link
            key={to}
            to={to}
            className={`quick-link fade-up delay-${i + 1} flex items-center justify-between
              rounded-[14px] border border-white/[0.06] bg-[rgba(14,4,4,0.7)]
              p-5 backdrop-blur-sm no-underline`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px]
                border border-red-600/30 bg-red-600/10 text-red-500
                shadow-[0_0_10px_rgba(220,38,38,0.12)]">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-[14px] font-semibold tracking-wide text-white/90">{label}</p>
                <p className="text-[11px] tracking-wide text-white/30">{desc}</p>
              </div>
            </div>
            <ArrowRight size={15} className="arrow-icon text-white/20 transition-colors duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}
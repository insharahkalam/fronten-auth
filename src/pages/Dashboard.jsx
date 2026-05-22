import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Server,
  Database,
  Wifi,
  Activity,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { getDashboardStats } from "../config/service.js";

// Mock stats for demo — replace with real API data
const MOCK_STATS = {
  users: 1248,
  products: 342,
  orders: 5890,
  revenue: 128430,
};

const STATUS_ITEMS = [
  { label: "API Server", status: "online", uptime: "99.9% uptime" },
  { label: "Database", status: "online", uptime: "PostgreSQL · Active" },
  { label: "CDN", status: "online", uptime: "Global · 12 nodes" },
  { label: "Auth Service", status: "online", uptime: "JWT · Secure" },
  { label: "Storage", status: "warning", uptime: "78% used" },
  { label: "Email Queue", status: "online", uptime: "24 pending" },
];

const RECENT_ACTIVITY = [
  { action: "New user registered", time: "2 min ago", type: "user" },
  { action: "Product #342 added", time: "15 min ago", type: "product" },
  { action: "Order #5891 placed", time: "28 min ago", type: "order" },
  { action: "User #204 deleted", time: "1 hr ago", type: "delete" },
  { action: "Stock updated — SKU-441", time: "2 hrs ago", type: "product" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getDashboardStats();
        if (res.data) setStats(res.data);
      } catch {
        // Using mock data if API not ready
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Users",
      value: stats.users?.toLocaleString() || "—",
      icon: Users,
      change: "+12.4%",
      dir: "up",
    },
    {
      label: "Products",
      value: stats.products?.toLocaleString() || "—",
      icon: Package,
      change: "+5 today",
      dir: "up",
    },
    {
      label: "Orders",
      value: stats.orders?.toLocaleString() || "—",
      icon: ShoppingCart,
      change: "+8.1%",
      dir: "up",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue?.toLocaleString() || "—"}`,
      icon: TrendingUp,
      change: "-2.3%",
      dir: "down",
    },
  ];

  return (
    <div className="fade-in">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>
          Welcome back, <span>Admin</span>
        </h2>
        <p>
          Your store is performing well today. Monitor your key metrics, manage
          users and products from this control center.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <Link to="/products" className="btn btn-primary">
            <Package size={15} />
            Manage Products
          </Link>
          <Link to="/users" className="btn btn-ghost">
            <Users size={15} />
            View Users
          </Link>
        </div>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h2>
          <Activity className="header-icon" size={22} />
          Overview
        </h2>
        <p>Real-time statistics and system health</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {statCards.map(({ label, value, icon: Icon, change, dir }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon-wrap">
              <Icon size={22} />
            </div>
            <div className="stat-info">
              <p>{label}</p>
              <h3>{loading ? "…" : value}</h3>
              <div className={`stat-change ${dir}`}>{change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* System Status */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <p className="section-title" style={{ margin: 0, border: 0 }}>
              <Server
                size={14}
                style={{ display: "inline", marginRight: 8 }}
              />
              System Status
            </p>
            <span
              style={{
                fontSize: 11,
                color: "#22c55e",
                letterSpacing: "0.05em",
              }}
            >
              ALL SYSTEMS NOMINAL
            </span>
          </div>
          <div className="status-grid">
            {STATUS_ITEMS.map(({ label, status, uptime }) => (
              <div className="status-item" key={label}>
                <div className={`status-dot ${status}`} />
                <div>
                  <p style={{ marginBottom: 2 }}>{label}</p>
                  <span>{uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card" style={{ padding: 24 }}>
          <p className="section-title">
            <Activity
              size={14}
              style={{ display: "inline", marginRight: 8 }}
            />
            Recent Activity
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {RECENT_ACTIVITY.map(({ action, time, type }, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 0",
                  borderBottom:
                    i < RECENT_ACTIVITY.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        type === "delete"
                          ? "var(--red-primary)"
                          : type === "user"
                          ? "#60a5fa"
                          : "#22c55e",
                      boxShadow:
                        type === "delete"
                          ? "0 0 6px var(--red-glow)"
                          : "none",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ fontSize: 13, color: "var(--text-secondary)" }}
                  >
                    {action}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    marginLeft: 10,
                  }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginTop: 20,
        }}
      >
        {[
          {
            to: "/add-product",
            label: "Add New Product",
            icon: Package,
            desc: "Upload & list a product",
          },
          {
            to: "/users",
            label: "Manage Users",
            icon: Users,
            desc: "View & control accounts",
          },
          {
            to: "/products",
            label: "Product Catalog",
            icon: Cpu,
            desc: "Edit & delete listings",
          },
        ].map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            style={{ textDecoration: "none" }}
            className="glass-card"
          >
            <div
              style={{
                padding: "20px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="stat-icon-wrap" style={{ width: 38, height: 38 }}>
                  <Icon size={17} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {desc}
                  </p>
                </div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
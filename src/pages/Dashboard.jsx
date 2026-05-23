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

  return (
    <div className="fade-in">

      {/* Welcome */}
      <div className="welcome-banner">
        <h2>
          Welcome back, <span>Admin</span>
        </h2>
        <p>
          Monitor your users, products and system performance in real-time.
        </p>
      </div>

      {/* Header */}
      <div className="page-header">
        <h2>
          <Activity className="header-icon" size={22} />
          Overview
        </h2>
        <p>Real-time statistics and system health</p>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        {statCards.map(({ label, value, icon: Icon, change, dir }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon-wrap">
              <Icon size={22} />
            </div>

            <div className="stat-info">
              <p>{label}</p>
              <h3>{loading ? "..." : value}</h3>
              <div className={`stat-change ${dir}`}>{change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SYSTEM STATUS */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <p className="section-title">
            <Server size={14} style={{ marginRight: 8 }} />
            System Status
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {STATUS_ITEMS.map(({ label, status, uptime }) => (
            <div className="status-item" key={label}>
              <div className={`status-dot ${status}`} />
              <div>
                <p>{label}</p>
                <span>{uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK LINKS */}
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
            label: "Add Product",
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
          <Link key={to} to={to} className="glass-card">
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <div className="stat-icon-wrap">
                  <Icon size={18} />
                </div>

                <div>
                  <p style={{ fontWeight: 600 }}>{label}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {desc}
                  </p>
                </div>
              </div>

              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
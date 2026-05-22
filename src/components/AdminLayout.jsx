import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Package,
    PlusSquare,
    Menu,
    X,
    Zap,
    Shield,
    Bell,
} from "lucide-react";

const navLinks = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        to: "/users",
        label: "Users",
        icon: Users,
    },
    {
        to: "/add-product",
        label: "Add Product",
        icon: PlusSquare,
    },
    {
        to: "/products",
        label: "Products",
        icon: Package,
    },
];

const pageTitles = {
    "/dashboard": "Dashboard",
    "/users": "Users",
    "/add-product": "Add Product",
    "/products": "Products",
};

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const currentTitle = pageTitles[location.pathname] || "Admin";
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="admin-layout">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar} />
            )}

            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                {/* Logo */}
                <div className="sidebar-logo">
                    <h1>
                        <Zap
                            size={16}
                            style={{ display: "inline", marginRight: 6, color: "#dc2626" }}
                        />
                        NexAdmin
                    </h1>
                    <span>E-Commerce Control</span>
                </div>

                {/* Nav */}
                <nav className="sidebar-nav">
                    <div className="nav-section-label">Main Menu</div>
                    {navLinks.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                            onClick={closeSidebar}
                        >
                            <Icon className="nav-icon" />
                            {label}
                            {/* Active indicator rendered via CSS .active class */}
                        </NavLink>
                    ))}

                    <div className="nav-section-label" style={{ marginTop: 20 }}>
                        Security
                    </div>
                    <div
                        className="nav-link"
                        style={{ cursor: "default", opacity: 0.5 }}
                    >
                        <Shield className="nav-icon" />
                        Permissions
                    </div>
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <div className="sidebar-footer-info">
                        <div className="avatar">A</div>
                        <div className="avatar-info">
                            <p>Admin User</p>
                            <span>Super Admin</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <button
                            className="hamburger"
                            onClick={() => setSidebarOpen((p) => !p)}
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <p className="topbar-title">
                            NexAdmin / <span>{currentTitle}</span>
                        </p>
                    </div>
                    <div className="topbar-right">
                        <div
                            style={{ position: "relative", cursor: "pointer" }}
                            title="Notifications"
                        >
                            <Bell size={18} color="var(--text-secondary)" />
                            <span
                                style={{
                                    position: "absolute",
                                    top: -3,
                                    right: -3,
                                    width: 7,
                                    height: 7,
                                    background: "var(--red-primary)",
                                    borderRadius: "50%",
                                    boxShadow: "0 0 6px var(--red-glow)",
                                }}
                            />
                        </div>
                        <div className="topbar-badge">Live</div>
                    </div>
                </header>

                {/* Page */}
                <main className="page-content fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
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
    LogOut
} from "lucide-react";
import api from "../config/service";
import toast from 'react-hot-toast'
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

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await api.get('/auth/logout')
            console.log(res.data)
            localStorage.clear()
            toast.success("Logout successful")

            // redirect to login
            setTimeout(() => {
                navigate('/login');
            }, 800);

        } catch (error) {
            console.log(error)

            const msg = error.response?.data?.message || "Logout failed"
            toast.error(msg)
        }
    }



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
                        Session
                    </div>
                    <div onClick={handleLogout}
                        className="nav-link"
                        style={{ cursor: "default", opacity: 0.5 }}
                    >
                        <LogOut className="nav-icon" />
                        Logout
                    </div>


                </nav>


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
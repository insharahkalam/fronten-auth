import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AdminLayout from "../components/AdminLayout"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import AddProduct from "../pages/AddProduct"
import Products from "../pages/Products"
import Home from '../pages/userSide/Home'
import About from "../pages/userSide/About"
import Shop from "../pages/userSide/Shop"
import ProductDetail from "../pages/userSide/ProductDetail"
import Contact from "../pages/userSide/Contact"
import Cart from "../pages/userSide/Cart"
import Wishlist from "../pages/userSide/Wishlist"
import { AuthProvider } from "../context/AuthContext"
import ErrorPage from "../pages/userSide/ErrorPage"
import Checkout from "../pages/userSide/Checkout"
import AuthPage from "../pages/Authpage"

export default function App() {
    return (
        <BrowserRouter>
            {/* AuthProvider wraps everything so any component can call useAuth() */}
            <AuthProvider>

                <Routes>
                    {/* ── Public / auth pages ── */}
                    <Route path="/auth" element={<AuthPage />} />

                    {/* ── Admin pages ── */}
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/products" element={<Products />} />
                    </Route>

                    {/* ── User-facing storefront ── */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {/* =====404==== */}
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
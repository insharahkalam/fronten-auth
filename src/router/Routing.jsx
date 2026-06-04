// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import AdminLayout from "../components/AdminLayout";
// import Dashboard from "../pages/Dashboard";
// import Users from "../pages/Users";
// import AddProduct from "../pages/AddProduct";
// import Products from "../pages/Products";
// import Admin from "../pages/AddProduct";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Home from '../pages/userSide/Home'
// import About from "../pages/userSide/About";
// import Shop from "../pages/userSide/Shop";
// import ProductDetail from "../pages/userSide/ProductDetail";
// import Contact from "../pages/userSide/Contact";
// import Cart from "../pages/userSide/Cart";
// import { CartProvider } from "../context/CartContext";
// import Wishlist from "../pages/userSide/Wishlist";


// export default function App() {
//     return (
//         <BrowserRouter>
//             <CartProvider>
//                 <Routes>
//                     <Route path="/" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route element={<AdminLayout />}>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route path="/users" element={<Users />} />
//                         <Route path="/add-product" element={<AddProduct />} />
//                         <Route path="/products" element={<Products />} />
//                     </Route>


//                     <Route path="/home" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/shop" element={<Shop />} />
//                     <Route path="/product/:id" element={<ProductDetail />} />
//                     <Route path="/cart" element={<Cart />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/wishlist" element={<Wishlist />} />
//                     <Route path="*" element={
//                         <div className="text-center py-32">
//                             <div className="font-display text-8xl text-red-500 mb-4">404</div>
//                             <p className="text-gray-400 mb-6">Page not found</p>
//                             <a href="/home" className="btn-primary inline-block">Go Home</a>
//                         </div>
//                     } />
//                 </Routes>
//             </CartProvider>
//         </BrowserRouter>
//     );
// }


// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AdminLayout from "../components/AdminLayout"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import AddProduct from "../pages/AddProduct"
import Products from "../pages/Products"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from '../pages/userSide/Home'
import About from "../pages/userSide/About"
import Shop from "../pages/userSide/Shop"
import ProductDetail from "../pages/userSide/ProductDetail"
import Contact from "../pages/userSide/Contact"
import Cart from "../pages/userSide/Cart"
import Wishlist from "../pages/userSide/Wishlist"
import { CartProvider } from "../context/CartContext"
import { AuthProvider } from "../context/AuthContext"

export default function App() {
    return (
        <BrowserRouter>
            {/* AuthProvider wraps everything so any component can call useAuth() */}
            <AuthProvider>
                {/* CartProvider is inside AuthProvider so CartContext can access auth if needed */}
                <CartProvider>
                    <Routes>
                        {/* ── Public / auth pages ── */}
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />

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

                        {/* ── 404 ── */}
                        <Route path="*" element={
                            <div className="text-center py-32">
                                <div className="font-display text-8xl text-red-500 mb-4">404</div>
                                <p className="text-gray-400 mb-6">Page not found</p>
                                <a href="/home" className="btn-primary inline-block">Go Home</a>
                            </div>
                        } />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
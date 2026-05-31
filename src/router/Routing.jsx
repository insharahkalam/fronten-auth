// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Home from "../pages/Home";
// import Admin from "../pages/Admin";
// import AdminRoute from '../components/AdminRoute'
// import Dashboard from "../pages/Dashboard";
// import Users from "../pages/Users";
// import AddProduct from "../pages/AddProduct";
// import Products from "../pages/Products";

// const Routing = () => {

//     return (
//         <>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/users" element={<Users />} />
//                     <Route path="/add-product" element={<AddProduct />} />
//                     <Route path="/products" element={<Products />} />
//                     <Route path="/admin" element={
//                         <AdminRoute>
//                             <Admin />
//                         </AdminRoute>} />
//                 </Routes>
//             </BrowserRouter>
//         </>
//     )
// }

// export default Routing



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Admin from "../pages/AddProduct";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from '../pages/userSide/Home'
import About from "../pages/userSide/About";
import Shop from "../pages/userSide/Shop";
import ProductDetail from "../pages/userSide/ProductDetail";
import Contact from "../pages/userSide/Contact";
import Cart from "../pages/userSide/Cart";
import { CartProvider } from "../context/CartContext";
import Wishlist from "../pages/userSide/Wishlist";


export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/products" element={<Products />} />
                    </Route>


                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="*" element={
                        <div className="text-center py-32">
                            <div className="font-display text-8xl text-red-500 mb-4">404</div>
                            <p className="text-gray-400 mb-6">Page not found</p>
                            <a href="/home" className="btn-primary inline-block">Go Home</a>
                        </div>
                    } />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
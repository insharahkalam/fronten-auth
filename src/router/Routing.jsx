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
import Home from "../pages/Home";


export default function App() {
    return (
        <BrowserRouter>

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
            </Routes>
        </BrowserRouter>
    );
}
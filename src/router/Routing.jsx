// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Home from "../pages/Home";
// import Admin from "../pages/Admin";
// import AdminRoute from '../component/AdminRoute'

// const Routing = () => {

//     return (
//         <>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/home" element={<Home />} />
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



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";


export default function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    {/* <Route index element={<Navigate to="/dashboard" replace />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/products" element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
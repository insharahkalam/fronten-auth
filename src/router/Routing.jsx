import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import AdminRoute from '../component/AdminRoute'

const Routing = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing
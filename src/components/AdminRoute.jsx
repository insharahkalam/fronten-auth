import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const role = localStorage.getItem("role");
    const navigate = useNavigate()

    if (role !== "admin") {
        alert("Access denied! only admin can access this.");
        navigate('/login')
        return;
    }
    return <>
        {children}

    </>
}

export default AdminRoute

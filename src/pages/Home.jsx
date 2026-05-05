import React, { useEffect } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            alert("Unauthorized!")
            navigate('/login')
        }
    }, [token])
    return (
        <>
            <Navbar />

            <h1>THS IS HOME PAGE</h1>
        </>
    )
}

export default Home
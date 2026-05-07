import React, { useEffect, useState } from 'react'
import { User, Mail, Edit3 } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import api from '../config/service'
import toast from 'react-hot-toast'

const Home = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
    })

    const [openModal, setOpenModal] = useState(false)

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const id = localStorage.getItem('id')
            const res = await api.put(`/updateUser/${id}`, formData)

            localStorage.setItem("username", res.data.updated.username)
            localStorage.setItem("email", res.data.updated.email)

            setUser({
                username: res.data.updated.username,
                email: res.data.updated.email,
            })

            toast.success("Profile updated successfully!")
            setOpenModal(false)

        } catch (error) {
            console.log(error)
            const msg = error.response?.data?.message || "Update failed"
            toast.error(msg)
        }
    }

    const handleLogout = async () => {
        try {
            const res = await api.get('/logout')

            console.log(res.data)

            // token / user clear

            localStorage.clear()
            sessionStorage.clear()

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
        <>
            <div className="relative min-h-screen overflow-hidden text-white font-serif">

                {/* Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a0f14_0%,#0b0b0f_55%,#000000_100%)]" />

                {/* Glow */}
                <div className="absolute -top-32 -left-32 h-96 w-96 bg-red-900/30 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 h-96 w-96 bg-red-900/20 blur-3xl rounded-full" />

                {/* Content */}
                <div className="relative z-10 p-6">

                    {/* Profile Card */}
                    <div className="max-w-4xl mx-auto mt-10">

                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 shadow-xl">

                            {/* Top Row */}
                            <div className="flex items-center justify-between">

                                {/* Left side user info */}
                                <div className="flex items-center gap-4">

                                    <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center">
                                        <User className="text-red-300" />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            Welcome, <span className="text-red-400">{user.username}</span>
                                        </h1>

                                        <div className="flex items-center gap-2 text-slate-400 mt-1">
                                            <Mail size={16} />
                                            {user.email}
                                        </div>
                                    </div>

                                </div>

                                {/* Right side buttons */}
                                <div className="flex items-center gap-3">

                                    {/* Edit Button */}
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="flex items-center gap-2 px-8 py-2 rounded-lg  hover:scale-[1.03] transition-all shadow-lg shadow-red-900/30"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                                        }}
                                    >
                                        <Edit3 size={16} />
                                        Edit
                                    </button>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-8 py-2 rounded-lg  hover:scale-[1.03] transition-all shadow-lg shadow-red-900/30"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                                        }}
                                    >
                                        Logout
                                    </button>

                                </div>
                            </div>

                            {/* Dummy Text Section */}
                            <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/10">

                                <p className="text-slate-300 text-sm leading-relaxed">
                                    All your personal information and account details are securely managed here.
                                    You can update your profile, change password, and manage settings anytime.
                                </p>

                            </div>

                        </div>
                    </div>
                </div>

                {/* Modal */}
                {openModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl relative">

                            <button
                                onClick={() => setOpenModal(false)}
                                className="absolute top-3 right-3 text-slate-400 hover:text-white"
                            >
                                ✖
                            </button>

                            <h2 className="text-xl font-bold text-center mb-4">
                                Update Profile
                            </h2>

                            <form onSubmit={handleUpdate} className="space-y-3">

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    className="w-full h-11 px-4 rounded-xl bg-black/30 border border-red-900/30 outline-none focus:border-red-700 text-white font-serif"
                                />

                                <button
                                    type="submit"
                                    className="px-6 py-3 w-full rounded-xl font-semibold transition-all hover:scale-[1.03] shadow-lg shadow-red-900/30 text-white"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                                    }}
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
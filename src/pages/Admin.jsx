import React, { useEffect, useState } from 'react'
import api from '../config/service'
import toast from 'react-hot-toast'
import { Trash2, Users, ShieldCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const [userData, setUserData] = useState([])
    const [searchId, setSearchId] = useState("")
    const navigate = useNavigate()
    const handleGetOneUser = async () => {

        if (!searchId) {
            return toast.error("Please enter user ID")
        }

        try {
            const res = await api.get(`/getOne/${searchId}`)
            console.log(res, "one user res");

            setUserData([res.data.specific])
            toast.success("User found!")

        } catch (error) {
            const msg = error.response?.data?.message || "User not found"
            toast.error(msg)
        }
    }

    const handleUsers = async () => {
        try {
            const res = await api.get('/allUsers')
            setUserData(res.data.allUser)
            toast.success("Users loaded successfully!")
        } catch (error) {
            console.log(error)
            toast.error("Failed to load users")
        }
    }


    const handleDelete = async (id) => {

        try {
            await api.delete(`/deleteUser/${id}`)
            toast.success("User deleted successfully!")
            setUserData((prev) =>
                prev.filter((user) => user._id !== id)
            )
        } catch (error) {
            console.log(error)
            const msg = error.response?.data?.message || "Something went wrong"
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
            {/* <Navbar /> */}

            <div className="relative min-h-screen overflow-hidden bg-black text-white font-serif">

                {/* Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a0f14_0%,#0b0b0f_55%,#000000_100%)]" />

                {/* Glow */}
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-900/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-900/20 blur-3xl" />

                {/* Noise */}
                <div
                    className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                />

                <div className="relative z-10 p-6">

                    {/* Top */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                        <div>
                            <h1 className="text-3xl font-bold tracking-wide">
                                Admin Dashboard
                            </h1>

                            <p className="text-slate-400 mt-1">
                                Manage all registered users
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.03] shadow-lg shadow-red-900/30 text-white"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                            }}
                        >
                            Logout
                        </button>

                    </div>

                    {/* stats */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 shadow-xl hover:scale-[1.03] hover:bg-white/[0.08]  transition-all duration-500 cursor-pointer">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Total Users
                                    </p>

                                    <h2 className="text-3xl font-bold mt-1">
                                        {userData.length}
                                    </h2>
                                </div>

                                <div className="p-3 rounded-xl bg-red-900/20">
                                    <Users className="text-red-300" />
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 shadow-xl hover:scale-[1.03] hover:bg-white/[0.08]  transition-all duration-500 cursor-pointer">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Admin Access
                                    </p>

                                    <h2 className="text-xl font-bold mt-1">
                                        Active
                                    </h2>
                                </div>

                                <div className="p-3 rounded-xl bg-red-900/20">
                                    <ShieldCheck className="text-red-300" />
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 shadow-xl hover:scale-[1.03] hover:bg-white/[0.08]  transition-all duration-500 cursor-pointer">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        System Status
                                    </p>

                                    <h2 className="text-xl font-bold mt-1 text-green-400">
                                        Running
                                    </h2>
                                </div>

                                <div className="h-4 w-4 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 mb-8">

                        <div className="flex flex-col md:flex-row gap-3 ">

                            <input
                                type="text"
                                placeholder="Enter user ID..."
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleGetOneUser();
                                    }
                                }}
                                className="w-full md:w-[450px] h-12 px-4 rounded-full bg-black/20 border border-red-900/30 text-slate-100 placeholder:text-slate-500 outline-none border-red-700/60 ring-2 ring-red-700/20 backdrop-blur-sm font-serif"
                            />


                        </div>

                        <button
                            onClick={handleUsers}
                            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.03] shadow-lg shadow-red-900/30"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6b1414 0%, #111 40%, #111 60%, #6b1414 100%)",
                            }}
                        >
                            Get All Users
                        </button>


                    </div>

                    {/* Table */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-2xl">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-white/[0.04] border-b border-white/10">

                                    <tr>
                                        <th className="text-left p-5 text-slate-300 font-semibold">
                                            S.No
                                        </th>

                                        <th className="text-left p-5 text-slate-300 font-semibold">
                                            User_Id
                                        </th>

                                        <th className="text-left p-5 text-slate-300 font-semibold">
                                            Username
                                        </th>

                                        <th className="text-left p-5 text-slate-300 font-semibold">
                                            Email
                                        </th>

                                        <th className="text-center p-5 text-slate-300 font-semibold">
                                            Action
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {userData.length > 0 ? (

                                        userData.map((user, index) => (

                                            <tr
                                                key={user._id}
                                                className="border-b border-white/5 hover:bg-white/[0.03] transition-all"
                                            >

                                                <td className="p-5 font-medium">
                                                    {`${index + 1} :`}
                                                </td>

                                                <td className="p-5 font-medium">
                                                    {user._id}
                                                </td>

                                                <td className="p-5 font-medium">
                                                    {user.username}
                                                </td>

                                                <td className="p-5 text-slate-300">
                                                    {user.email}
                                                </td>

                                                <td className="p-5">

                                                    <div className="flex justify-center">

                                                        <button
                                                            onClick={() => handleDelete(user._id)}
                                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 border border-red-900/30 hover:bg-red-900/40 transition-all"
                                                        >
                                                            <Trash2 size={16} />

                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-2xl  p-10 text-slate-500"
                                            >
                                                No users found!
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Admin
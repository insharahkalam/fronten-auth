import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom'
import api from '../config/service'

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


        console.log("kam kr rha hai update");
        try {
            const id = localStorage.getItem('id')
            const res = await api.put(`/updateUser/${id}`, formData)
            console.log(res, "ho gya upd");

            localStorage.setItem("username", res.data.updated.username)
            localStorage.setItem("email", res.data.updated.email)

            setUser({
                username: res.data.updated.username,
                email: res.data.updated.email,
            })
            alert('user updated success!')

            setOpenModal(false)

        } catch (error) {
            console.log("error in update", error);
            const msg = error.response?.data?.message || 'something went wrong in updatin user'
            console.log(msg);

        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">

                {/* Top Bar */}
                <div className="flex justify-end">

                    {/* Profile Icon */}
                    <div
                        onClick={() => setOpenModal(true)}
                        className="w-12 h-12 rounded-full text-white flex items-center justify-center cursor-pointer shadow-lg bg-pink-200 transition"
                    >

                    </div>

                </div>

                <h1 className="text-2xl mt-6 font-bold text-gray-800">
                    Welcome back <span className='text-red-700'>{user.username}</span>
                </h1>

                {/* Modal */}
                {openModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">

                            {/* Close Button */}
                            <button
                                onClick={() => setOpenModal(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            >
                                ✖
                            </button>

                            <h2 className="text-xl font-bold mb-4 text-center">
                                Update Profile
                            </h2>

                            <form onSubmit={handleUpdate} className="space-y-4">

                                {/* Username */}
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg bg-gray-100"
                                />

                                {/* Password */}
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
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
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import api from '../config/service'

const Admin = () => {

    const [userData, setUserData] = useState([])

    const handleUsers = async () => {
        try {
            const res = await api.get('/allUsers')
            setUserData(res.data.allUser)
        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = async (id) => {

        console.log(id), "unique id of all users";
        console.log("kam kr rha hai");
        try {
            const res = await api.delete(`/deleteUser/${id}`)
            alert("user deleted successfully")
            console.log("deleted user", res);
            setUserData((prev) => prev.filter((user) => user._id !== id))


        } catch (error) {
            console.log(error);
            const msg = error.response?.data?.message || "something went wrong in deleting users."
            console.log(msg, "delete err");
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">

                {/* Heading */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

                    <button
                        onClick={handleUsers}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
                    >
                        Load Users
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full text-left">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-4">Username</th>
                                <th className="p-4">Email</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userData.length > 0 ? (
                                userData.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">

                                        <td className="p-4 font-medium">{user.username}</td>
                                        <td className="p-4">{user.email}</td>

                                        <td className="p-4 text-center">
                                            <button onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center p-6 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
        </>
    )
}

export default Admin
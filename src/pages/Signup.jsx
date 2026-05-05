import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../config/service";


const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate()

    const handleSignup = async () => {
        console.log("data aarha hai", name, email, password, role);

        try {
            const res = await api.post('/users', {
                username,
                email,
                password,
                role
            })

            console.log(res.data, "res aaya hai kch");
            alert("user created successfully.")
            navigate('/login')


        } catch (error) {
            console.log(error.message, "error in creating users");

            const msg = error.response?.data?.message || "Something went wrong";
            setErrorMsg(msg);
            console.log(msg);

        }


    }


    return (
        <>
            <div className=" flex py-7 justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
                <div className="bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px] border border-gray-700">

                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Create Account
                    </h2>

                    <form className="space-y-4">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <input
                            onChange={(e) => setRole(e.target.value)}
                            type="text"
                            placeholder="Role (user/admin)"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <button type="button" onClick={handleSignup} className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg text-white font-semibold">
                            Signup
                        </button>
                    </form>

                    <Link to={'/login'}>
                        <p className="text-gray-400 text-sm text-center mt-4">
                            Already have an account?{" "}
                            <span className="text-red-500 cursor-pointer">Login</span>
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Signup;
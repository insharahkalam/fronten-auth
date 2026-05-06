import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/service";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleLogin = async () => {
        console.log("kam kr rha hai");

        try {
            const res = await api.post('/loginUser', {
                email,
                password
            })


            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.logUser.role)



            console.log(res.data, "login data aaya hai");

            alert("login success")
            const role = localStorage.getItem("role")

            if (role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/home')
            }


        } catch (error) {
            console.log(error.message, "login error");
            const msg = error.response?.data?.message || 'something went wrong'
            console.log(msg, "error message");

        }
    }





    return (
        <>

            <div className=" flex py-23 justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
                <div className="bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px] border border-gray-700">

                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Welcome Back
                    </h2>

                    <form className="space-y-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button onClick={handleLogin} type="button" className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold">
                            Login
                        </button>
                    </form>
                    <Link to={'/'}>
                        <p className="text-gray-400 text-sm text-center mt-4">
                            Don't have an account?{" "}
                            <span className="text-green-500 cursor-pointer">Signup</span>
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
import React, { useState } from "react";
import api from "../config/service";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogout = async () => {
    console.log("kam kr rha hai");
    try {

      const res = await api.get('/logout')

      console.log(res.data, "log res");
      alert("logout success")
      localStorage.clear()
      navigate('/')


    } catch (error) {
      console.log(error, "logout error");
      const msg = error.response?.data?.message || 'something went wrong'
      console.log(msg, "logError");
      setErrorMsg(msg)
    }

  }

  return (
    <div className="bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">

      <h1 className="text-white text-xl font-bold">
        Auth System
      </h1>

      <button onClick={handleLogout} type="button" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
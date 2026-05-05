import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import api from '../config/service';

const Admin = () => {

    const [userData, setUserData] = useState([])

    const handleUsers = async () => {
        console.log("kam kr rha hai ");
        try {
            const res = await api.get('/allUsers')
            console.log(res, "all user res");
            console.log(res.data);
            setUserData(res.data.allUser)


        } catch (error) {
            console.log(error);
            const msg = error.response?.data?.message || 'something went wrong'
            console.log(msg);
        }
    }

    return (
        <>
            <Navbar />

            <h1>THIS IS ADMIN PAGE</h1>
            <button onClick={handleUsers} type="button" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition">GET ALL USERS</button >

            {console.log(userData)}


            {userData?.map((elem) => (
                <div key={elem._id} style={{ border: '2px solid black', padding: '5px', margin: '5px' }}>
                    <ul>
                        <li>{elem.username}</li>
                        <li>{elem.email}</li>

                    </ul>
                </div>
            ))}
        </>
    )
}

export default Admin
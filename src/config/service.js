import axios from "axios";

const url = 'http://localhost:3000/api/auth' || 'https://backend-authentication-wine.vercel.app/api/auth'

const api = axios.create({
    baseURL: url,
    headers: {
        "content-type": "application/json"
    }
})

export default api 
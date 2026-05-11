import axios from "axios";

const url =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/api/auth"
        : "https://backend-authentication-sigma.vercel.app/api/auth";

const api = axios.create({
    baseURL: url,
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
})

export default api 
// import axios from "axios";

// const url =
//     import.meta.env.MODE === "development"
//         ? "http://localhost:3000/api/auth"
//         : "https://backend-authentication-sigma.vercel.app/api/auth";

// const api = axios.create({
//     baseURL: url,
//     headers: {
//         "content-type": "application/json"
//     },
//     withCredentials: true
// })

// export default api 



import axios from "axios";

// Base API URL — update this to your backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

// ─── AUTH ──────────────────────────────────
export const adminLogin = (credentials) =>
  api.post("/auth/admin/login", credentials);

// ─── USERS ─────────────────────────────────
export const getAllUsers = () => api.get("/auth/allUsers");
export const getUserById = (id) => api.get(`/auth/getOne/${id}`);
export const deleteUser = (id) => api.delete(`/auth/deleteUser/${id}`);

// ─── PRODUCTS ──────────────────────────────
export const getAllProducts = () => api.get("/products/getAllProduct");
export const getProductById = (id) => api.get(`/products/getProduct/${id}`);
export const addProduct = (formData) =>
  api.post("/products/create", formData);
export const updateProduct = (id, formData) =>
  api.put(`/products/updated/${id}`, formData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ─── DASHBOARD ─────────────────────────────
export const getDashboardStats = () => api.get("/admin/stats");

export default api;
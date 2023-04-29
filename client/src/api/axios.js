import axios from "axios"
const BASE_URL = (import.meta.env.DEV) ? "http://localhost:5000/api" : "https://travel-journal-api.onrender.com/api";

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

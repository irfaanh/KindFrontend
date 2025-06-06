import axios from 'axios'

export const api = axios.create({
    baseURL:import.meta.env.VITE_ORIGIN
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") || null
    config.headers.Authorization = `Bearer ${token}`
    console.log(config);
    
    return config
})
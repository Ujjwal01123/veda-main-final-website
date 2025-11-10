import axios from 'axios'

const axiosIntance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
})
// axiosIntance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('rental_token')
//         if (token) config.headers['Authorization'] = `Bearer ${token}`
//         return config
//     },
//     (error) => Promise.reject(error),
// )

axiosIntance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error?.response?.data?.error?.message || error.message || 'Unknown API error'
        return Promise.reject(new Error(message))
    },
)

export default axiosIntance

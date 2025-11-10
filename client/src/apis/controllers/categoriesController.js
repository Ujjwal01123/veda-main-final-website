import axiosInstance from "../api"

// 🟡 Get all categories (with optional query, pagination)
export const getAllCategories = (query, page) => axiosInstance.get("/categories/all", { params: { q: query, page: page, limit: 20 } })

// 🔵 Get a single category by ID
export const getCategoryById = (id) => axiosInstance.get(`/categories/${id}`)

import axiosIntance from "../api"

export const postBracelet = (data) => {
    return axiosIntance.post("/product/bracelet", data)
}

export const getBracelet = () => {
    return axiosIntance.get("/product/bracelet")
}

export const deleteBracelet = (id) => {
    return axiosIntance.delete(`/product/bracelet/${id}`)
}

export const updateBracelet = (id, data) => {
    return axiosIntance.put(`/product/bracelet/${id}`, data)
}

export const getBraceletById = (id) => {
    return axiosIntance.get(`/product/bracelet/${id}`)
}

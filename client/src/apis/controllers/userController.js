import axiosIntance from "../api"

export const registerUser = (data) => {
    return axiosIntance.post("/users", data)
}
export const loginUser = (data) => {
    return axiosIntance.post("/users/login", data)
}
export const currentUser = () => {
    return axiosIntance.post("/users/current-user")
}
export const logoutUser = () => {
    return axiosIntance.post("/users/logout")
}

export const updateUserAddress = (data) => axiosIntance.patch("/users/update-address", data)

export const updateUserDetails = (data) => axiosIntance.put("/users/update-user", data)

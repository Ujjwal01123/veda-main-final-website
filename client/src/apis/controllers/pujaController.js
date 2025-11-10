import axiosIntance from "../api"

export const getPuja = () => {
    return axiosIntance.get("/pujas/all")
}

import axiosIntance from "../api"

export const allOrders = () => axiosIntance.get("/orders")

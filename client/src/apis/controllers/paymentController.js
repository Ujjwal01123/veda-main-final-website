import axiosIntance from '../api'

export const createOrder = (data) => axiosIntance.post('/payments/create-order', data)
export const verifyPayment = (data) => axiosIntance.post('/payments/verify-payment', data)

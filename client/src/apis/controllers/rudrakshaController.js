import axiosIntance from '../api'

export const postRudraksha = (data) => {
    return axiosIntance.post('/product/rudraksha', data)
}

export const getRudraksha = () => {
    return axiosIntance.get('/product/rudraksha')
}

export const deleteRudraksha = (id) => {
    return axiosIntance.delete(`/product/rudraksha/${id}`)
}

export const updateRudraksha = (id, data) => {
    return axiosIntance.put(`/product/rudraksha/${id}`, data)
}

export const getRudrakshaById = (id) => {
    return axiosIntance.get(`/product/rudraksha/${id}`)
}

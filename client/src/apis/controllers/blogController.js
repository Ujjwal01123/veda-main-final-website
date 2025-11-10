import axiosIntance from "../api"

export const postBlog = (data) => {
    return axiosIntance.post("/blogs", data)
}
export const getAllBlogs = (blogQuery, blogPage) => axiosIntance.get("/blogs", { params: { q: blogQuery, page: blogPage, limit: 9 } })
export const getMyBlogs = () => axiosIntance.get("/blogs/my-blogs")
// export const getBlog = (slug) => axiosIntance.get(`/blogs/${slug}`)
export const editMyBlog = (id, data) => axiosIntance.put(`/blogs/${id}`, data)
export const deleteMyBlog = (id) => axiosIntance.delete(`/blogs/${id}`)
export const deleteBlog = (id) => axiosIntance.delete(`/blogs/delete/${id}`)
export const getBlogById = (id) => axiosIntance.get(`/blogs/${id}`)

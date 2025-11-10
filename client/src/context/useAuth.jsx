"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { currentUser, logoutUser } from "@/apis/controllers/userController"
// import { useRouter } from "next/navigation"
import { getAllBlogs } from "@/apis/controllers/blogController"

const AuthContext = createContext()

export function AuthProvider({ children, initialUser }) {
    // const router = useRouter()
    const [user, setUser] = useState(initialUser || null)
    const [blogs, setBlogs] = useState([])
    const [blogTotalPages, setBlogTotalPages] = useState(1)
    const [blogQuery, setBlogQuery] = useState("")
    const [blogPage, setBlogPage] = useState(1)
    const [blogLoading, setBlogLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            fetchUser()
        }
    }, [])
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchBlogs()
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [blogQuery, blogPage])

    const fetchUser = async () => {
        try {
            setLoading(true)
            const res = await currentUser()
            setUser(res?.data || null)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await logoutUser()
        await fetchUser()
        setUser(null)
        localStorage.removeItem("cart")
        // router.push("/")
    }

    const fetchBlogs = async () => {
        try {
            setBlogLoading(true)
            const res = await getAllBlogs(blogQuery, blogPage)
            setBlogs(res?.data?.blogs || [])
            setBlogTotalPages(res?.data?.totalPages || 1)
        } catch (err) {
            console.log(err)
        } finally {
            setBlogLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, refetchUser: fetchUser, blogs, refetchBlog: fetchBlogs, blogTotalPages, setBlogPage, blogPage, setBlogQuery, blogLoading, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

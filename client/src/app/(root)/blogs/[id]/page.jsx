"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { use, useEffect, useState } from "react"
import { getBlogById } from "@/apis/controllers/blogController" // ✅ Make sure you have this function

export default function BlogDetail({ params }) {
    // ✅ Unwrap params Promise
    const resolvedParams = use(params)
    const { id } = resolvedParams
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await getBlogById(id)
                setBlog(res?.data?.blog || res?.data || {})
            } catch (error) {
                console.error("Error fetching blog:", error)
            }
        }
        if (id) fetchBlog()
    }, [id])

    if (!blog) return <p className="mt-20 text-center text-gray-500">Blog not found</p>

    // ✅ Base API URL (for local images)
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "localhost:5000/api"
    console.log("API URL:", apiUrl)

    const getFullImageUrl = (path = "") => {
        if (!path) return ""
        if (path.startsWith("http")) return path
        return `${apiUrl}${path.startsWith("/") ? path : `/${path}`}`
    }

    // const getBaseUrl = (url) => {
    //     // Use a regular expression to ensure we only remove "/api" if it's at the end,
    //     // optionally handling a trailing slash as well.
    //     return url.replace(/\/api[\/]?$/, "")
    // }

    const cleanBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://api.vedastructure.com"

    return (
        <div className="mx-auto max-w-5xl p-6 md:p-10">
            <Link href="/blogs" className="mb-8 flex items-center text-sm text-orange-500 transition-colors duration-300 hover:text-orange-600">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Link>

            {/* Hero Image & Title Section */}
            <div className="relative text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>

                    {blog?.image && <Image src={`${cleanBaseUrl}${blog.image}`} alt={blog?.title} width={1920} height={1080} className="h-full w-full rounded-lg object-cover shadow-lg" />}
                </div>

                <div className="right-0 bottom-4 left-0 px-6">
                    <h1 className="text-lg font-bold text-orange-500 md:text-2xl">{blog?.title}</h1>
                </div>

                <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm text-gray-500 md:flex-row">
                    <div className="flex items-center space-x-2">
                        {blog?.author?.avatar && (
                            <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
                                <Image src={getFullImageUrl(blog.author.avatar)} alt={blog?.title} width={50} height={50} className="object-cover" />
                            </div>
                        )}
                        <span className="font-medium">{blog?.authorType || "Unknown Author"}</span>
                    </div>
                    <span className="hidden md:inline">•</span>
                    {blog?.createdAt && (
                        <span>
                            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-gray-200" />

            {/* Blog Content */}
            <article
                className="prose prose-lg prose-orange prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-700 mx-auto max-w-none leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />

            {/* Decorative Gradient Footer */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-[1px]">
                <div className="rounded-2xl bg-white p-6 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-orange-500">✨ Thank you for reading!</h2>
                    <p className="text-gray-500">Stay tuned for more spiritual insights and practices to elevate your soul.</p>
                    <Link href="/blogs" className="mt-4 inline-block rounded-lg bg-orange-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-orange-600">
                        Back to All Blogs
                    </Link>
                </div>
            </div>
        </div>
    )
}

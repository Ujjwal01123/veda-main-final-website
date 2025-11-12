"use client"
import DOMPurify from "dompurify"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import TiptapEditor from "@/components/TiptapEditor"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { postBlog } from "@/apis/controllers/blogController"
import { toast } from "sonner"
import { useAuth } from "@/context/useAuth"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function BlogPage() {
    const { blogs, refetchBlog, blogPage, blogQuery, setBlogPage, setBlogQuery, blogLoading, blogTotalPages } = useAuth()
    const [blogContent, setBlogContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const postHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const form = e.target
            const formData = new FormData(form)
            formData.append("content", blogContent)
            const res = await postBlog(formData)
            await refetchBlog()
            toast.success(res.message)
        } catch (err) {
            toast.success("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
            setOpen(false)
            setBlogContent("")
            e.target.reset()
        }
    }
    // console.log(blogs)

    // ✅ Base API URL (for local images)
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "www.vedastructure.com/api"

    const getBaseUrl = (url) => {
        // Use a regular expression to ensure we only remove "/api" if it's at the end,
        // optionally handling a trailing slash as well.
        return url.replace(/\/api[\/]?$/, "")
    }

    const cleanBaseUrl = getBaseUrl(apiUrl)
    // console.log("API URL:", cleanBaseUrl)

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Hero Section */}
            <div className="py-12 text-center">
                <h1 className="text-gradient from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">Spiritual Wisdom & Insights</h1>
                <p className="mt-4 text-gray-500">Explore articles, guides, and practices to nurture your mind, body, and soul.</p>

                {/* Search Bar */}
                <div className="mt-6 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Input placeholder="Search spiritual blogs..." className="pr-10" value={blogQuery} onChange={(e) => setBlogQuery(e.target.value)} />
                        <Search className="absolute top-2.5 right-3 text-gray-400" size={20} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer hover:bg-orange-400 hover:text-white">
                            <Plus /> Post Blog
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-h-auto max-h-[500px] overflow-y-scroll">
                        <form onSubmit={postHandler}>
                            <DialogHeader>
                                <DialogTitle>Post Blog</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" placeholder="Title" required />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="content">Content</Label>
                                    <TiptapEditor onChange={setBlogContent} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="image">Image</Label>
                                    <Input id="image" name="image" type="file" accept="image/*" />
                                </div>
                            </div>

                            <DialogFooter className="mt-2">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" disabled={loading}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={loading}>
                                    {loading && <Spinner />} Post Blog
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Featured Blogs */}
            {blogLoading && <p className="animate-pulse text-center">Fetching...</p>}
            {!blogLoading && blogs?.length === 0 && <p className="text-center">No blogs found</p>}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {blogs?.map((blog) => (
                    <Card key={blog._id} className="p-0 transition-shadow duration-300 hover:shadow-xl">
                        <CardHeader className="p-0">
                            <Image src={`${cleanBaseUrl}${blog.image}`} alt={blog.title} width={400} height={350} className="h-52 w-full rounded-t-lg object-cover" />
                        </CardHeader>
                        <CardContent className="pb-6">
                            <CardTitle>{blog.title}</CardTitle>
                            {/* <CardDescription>
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}></div>
                            </CardDescription> */}
                            <Link href={`/blogs/${blog._id}`} className="mt-2 inline-block text-orange-500 hover:underline">
                                Read More →
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-6">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button variant="outline" onClick={() => setBlogPage(blogPage - 1)} disabled={blogPage <= 1}>
                                Previous
                            </Button>
                        </PaginationItem>

                        <PaginationItem>
                            <Button variant="ghost">{blogPage}</Button>
                        </PaginationItem>

                        <PaginationItem>
                            <Button variant="outline" onClick={() => setBlogPage(blogPage + 1)} disabled={blogPage >= blogTotalPages}>
                                Next
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { useAuth } from "@/context/useAuth"
import { Pencil, Plus, Search, Trash } from "lucide-react"
import Image from "next/image"
import TiptapEditor from "@/components/TiptapEditor"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useMemo } from "react"
import { deleteBlog, postBlog } from "@/apis/controllers/blogController"
import { Label } from "@/components/ui/label"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export default function Page() {
    const { user, blogs, refetchBlog, blogPage, blogQuery, setBlogPage, setBlogQuery, blogLoading, blogTotalPages } = useAuth()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [blogContent, setBlogContent] = useState("")
    const [filterRole, setFilterRole] = useState("all") // 👈 New state for filtering

    const postHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const form = e.target
            const formData = new FormData(form)
            formData.append("content", blogContent)
            const res = await postBlog(formData)
            toast.success(res.message)
            await refetchBlog()
        } catch (err) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
            setOpen(false)
            setBlogContent("")
            e.target.reset()
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id)
            toast.success("Blog deleted successfully")
            await refetchBlog()
        } catch (error) {
            toast.error(error.message)
        }
    }

    // 👇 Filter blogs based on selected role
    const filteredBlogs = useMemo(() => {
        if (!blogs) return []
        if (filterRole === "all") return blogs
        return blogs.filter((b) => b?.author?.role === filterRole)
    }, [blogs, filterRole])

    return (
        <div className="space-y-6">
            {/* --- Top Section --- */}
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full max-w-md">
                        <Input placeholder="Search spiritual blogs..." className="pr-10" value={blogQuery} onChange={(e) => setBlogQuery(e.target.value)} />
                        <Search className="absolute top-2.5 right-3 text-gray-400" size={20} />
                    </div>

                    {/* --- Filter Buttons --- */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant={filterRole === "all" ? "default" : "outline"}
                            onClick={() => setFilterRole("all")}
                            className={filterRole === "all" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterRole === "user" ? "default" : "outline"}
                            onClick={() => setFilterRole("user")}
                            className={filterRole === "user" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        >
                            User Blogs
                        </Button>

                        <Button
                            variant={filterRole === "admin" ? "default" : "outline"}
                            onClick={() => setFilterRole("admin")}
                            className={filterRole === "admin" ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        >
                            Admin Blogs
                        </Button>
                    </div>
                </div>

                {/* --- Post Blog Dialog --- */}
                <div>
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
                                        {loading && <span className="mr-2 animate-spin">⏳</span>} Post Blog
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* --- Blogs Grid --- */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {filteredBlogs?.length === 0 && <h1 className="col-span-full text-center text-2xl text-gray-500">No Blogs Found</h1>}

                {filteredBlogs?.map((blog) => (
                    <article key={blog._id} className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                        <Image alt={blog.title} src={blog.image} width={1920} height={1080} className="h-56 w-full object-cover" />

                        <div className="bg-white p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <time dateTime={blog.createdAt} className="block text-xs text-gray-500">
                                    {new Date(blog.createdAt).toDateString()}
                                </time>
                                <div className="text-gray-500">{blog?.author?.fullname}</div>
                            </div>

                            <h3 className="mt-0.5 text-lg text-gray-900">{blog.title}</h3>

                            <p className="mt-2 line-clamp-3 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                        </div>

                        <div className="absolute top-4 right-4 flex gap-2">
                            {blog?.author?.role === "admin" && (
                                <Button variant="outline" className="bg-white hover:text-white" title="Edit">
                                    <Pencil />
                                </Button>
                            )}

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="bg-white hover:text-white" title="Delete">
                                        <Trash />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to delete this blog?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete this blog from the server.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(blog._id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </article>
                ))}
            </div>

            {/* --- Pagination --- */}
            <div>
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

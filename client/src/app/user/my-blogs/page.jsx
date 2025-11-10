"use client"
import { deleteMyBlog, getMyBlogs } from "@/apis/controllers/blogController"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"
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
export default function page() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)

    async function refetchBlog() {
        const res = await getMyBlogs()
        console.log(res)
        setBlogs(res?.data?.blogs || [])
    }
    useEffect(() => {
        refetchBlog()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteMyBlog(id)
            toast.success("Blog deleted successfully")
            await refetchBlog()
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {blogs.length === 0 && <h1 className="text-center text-2xl font-bold">No Blog Posted</h1>}
            {blogs.map((b) => (
                <Card className="relative gap-2 overflow-hidden p-0">
                    <CardHeader className="p-0">
                        <Image src={b.image} alt="image" width={1920} height={1080} className="h-48 w-full object-cover" />
                        <CardTitle className="px-4 pt-2">{b.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="m-0 px-4 pb-4">
                        <div dangerouslySetInnerHTML={{ __html: b.content }}></div>
                    </CardContent>
                    <CardAction>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="absolute top-4 right-4 border bg-white">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your blog from servers.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(b._id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardAction>
                </Card>
            ))}
        </div>
    )
}

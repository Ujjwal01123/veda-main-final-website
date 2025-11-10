"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/useAuth"
import { updateUserDetails } from "@/apis/controllers/userController"
import { toast } from "sonner"

export default function Profile() {
    const { user, refetchUser, logout } = useAuth()
    const [form, setForm] = useState(null)

    useEffect(() => {
        if (user) {
            setForm({
                fullname: user.fullname || "",
                email: user.email || "",
                phone: user.phone || "",
                fulladdress: user.fulladdress || "",
                landmark: user.landmark || "",
                city: user.city || "",
                state: user.state || "",
                pincode: user.pincode || "",
            })
        }
    }, [user])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form) return

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        delete data.email

        const hasChanged = Object.keys(data).some((key) => String(data[key] ?? "") !== String(user[key] ?? ""))

        if (!hasChanged) {
            toast.info("No changes detected.")
            return
        }

        try {
            const res = await updateUserDetails(data)
            await refetchUser()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.message || "Update failed.")
        }
    }

    if (!form) {
        return <p className="text-gray-500">Loading profile...</p>
    }

    return (
        <div>
            <h1 className="mb-4 text-xl font-bold">Profile Details</h1>
            <form onSubmit={handleSubmit} className="grid max-w-2xl gap-2 space-y-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        readOnly
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Mobile</label>
                    <input
                        type="number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-full border-t md:col-span-2"></div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Full Address</label>
                    <textarea
                        name="fulladdress"
                        id=""
                        value={form.fulladdress}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Landmark</label>
                    <input
                        type="text"
                        name="landmark"
                        value={form.landmark}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Pincode</label>
                    <input
                        type="number"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        max={999999}
                        min={100000}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="mt-4 rounded-md bg-[#f4b61e] px-4 py-2 text-white hover:bg-[#f4b61e]/80 md:col-span-2">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

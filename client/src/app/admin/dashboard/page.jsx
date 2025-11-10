"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { allOrders } from "@/apis/controllers/orderController"

export default function Dashboard() {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const res = await allOrders()
            setOrders(res?.data?.orders || [])
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const stats = useMemo(() => {
        const paidOrders = orders.filter((o) => o.status === "paid")

        // total sales (Razorpay gives amount in paise → divide by 100)
        const totalSales = paidOrders.reduce((sum, o) => sum + o.transactionId.amount / 100, 0)
        const totalOrders = paidOrders.length

        // total products sold
        const totalProducts = paidOrders.reduce((sum, o) => sum + o.products.reduce((p, x) => p + x.quantity, 0), 0)

        const monthlyMap = {}
        const yearlyMap = {}

        paidOrders.forEach((o) => {
            const date = new Date(o.createdAt)
            const year = date.getFullYear()
            const month = date.toLocaleString("default", { month: "short" })
            const key = `${month}-${year}`

            monthlyMap[key] = (monthlyMap[key] || 0) + o.transactionId.amount / 100
            yearlyMap[year] = (yearlyMap[year] || 0) + o.transactionId.amount / 100
        })

        const monthlyStats = Object.entries(monthlyMap).map(([month, totalSales]) => ({
            month,
            totalSales,
        }))

        const yearlyStats = Object.entries(yearlyMap).map(([year, totalSales]) => ({
            year,
            totalSales,
        }))

        return { totalSales, totalOrders, totalProducts, monthlyStats, yearlyStats }
    }, [orders])

    return (
        <div className="space-y-8 p-6">
            {/* Summary Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-green-600">₹{stats.totalSales.toLocaleString("en-IN")}</CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalOrders}</CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Total Products Sold</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-blue-600">{stats.totalProducts}</CardContent>
                </Card>
            </div>

            {/* Monthly Sales Chart */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Monthly Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    {stats.monthlyStats.length ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.monthlyStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(val) => `₹${val.toLocaleString("en-IN")}`} />
                                <Bar dataKey="totalSales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">No sales data available</p>
                    )}
                </CardContent>
            </Card>

            {/* Yearly Sales Chart */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Yearly Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    {stats.yearlyStats.length ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.yearlyStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip formatter={(val) => `₹${val.toLocaleString("en-IN")}`} />
                                <Bar dataKey="totalSales" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">No yearly data</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

"use client"
import { useAuth } from "@/context/useAuth"
import Image from "next/image"

function OrdersPage() {
    const { user, loading } = useAuth()

    if (loading || !user) {
        return <p className="py-10 text-center">Loading your orders...</p>
    }

    if (!user.orders || user.orders.length === 0) {
        return <p className="py-10 text-center">No orders found.</p>
    }
    console.log(user.orders)
    return (
        <div>
            <h1 className="mb-4 text-xl font-bold">My Orders</h1>
            <div className="space-y-4">
                {user.orders.map((orderWrapper) => {
                    const order = orderWrapper.orderId

                    return (
                        <div key={order._id} className="rounded-lg border bg-white p-6 shadow-sm">
                            {/* Order Header */}
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Order #{order._id.slice(-6).toUpperCase()}</h2>
                                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                                    <p className="text-sm">
                                        Status:{" "}
                                        <span
                                            className={`rounded px-2 py-1 text-xs font-semibold uppercase ${
                                                order.status === "paid" ? "bg-green-100 text-green-700" : order.status === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </p>
                                </div>

                                {/* User Info */}
                                {/* <div className="text-right">
                                    <p className="font-medium">{user.fullname}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <p className="text-sm text-gray-500">
                                        {user.phone} • {user.city} • {user.state} • {user.pincode}
                                    </p>
                                </div> */}
                            </div>

                            {/* Products */}
                            <div className="divide-y overflow-hidden rounded-lg border">
                                {order.products.map((p) => (
                                    <div key={p._id} className="flex items-center gap-4 bg-gray-50 p-3">
                                        <Image width={64} height={64} src={p.productId.productImage?.[0]} alt={p.productId.productName} className="h-16 w-16 rounded object-cover" />
                                        <div className="flex-1">
                                            <p className="font-medium">{p.productId.productName}</p>
                                            <p className="text-sm text-gray-500">
                                                ₹{p.productId.productPrice} x {p.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500">Discount: {p.productId.productDiscount}%</p>
                                            {p?.energizationForm && (
                                                <div>
                                                    Energization: [ Wearer Name: {p?.energizationForm?.wearerName}, Time: {p?.energizationForm?.time} , Gotra: {p?.energizationForm?.gotra || "N/A"},
                                                    Date of birth: {new Date(p?.energizationForm?.dob).toDateString()}, Birth Place: {p?.energizationForm?.birthPlace}, Gender:{" "}
                                                    {p?.energizationForm?.gender} ]
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-semibold">₹{p.productId.productPrice * p.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Transaction */}
                            <div className="mt-4 flex flex-col justify-between gap-2 text-sm text-gray-600 md:flex-row">
                                <div>
                                    {/* <p>
                                        <span className="font-medium">Transaction ID:</span>{' '}
                                        {order.transactionId._id}
                                    </p> */}
                                    <p>
                                        <span className="font-medium">Payment ID:</span> {order.transactionId.paymentId}
                                    </p>
                                    <p>
                                        <span className="font-medium">Total Amount:</span> ₹{order.transactionId.amount / 100} {order.transactionId.currency}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">Address: </span>
                                        {user.fulladdress}
                                    </p>
                                    <p>
                                        <span className="font-medium">Location: </span>
                                        {user.city} • {user.state} • {user.pincode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrdersPage

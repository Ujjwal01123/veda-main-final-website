"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { updateUserAddress } from "@/apis/controllers/userController"
import { useCart } from "@/context/cartContext"
import { useAuth } from "@/context/useAuth"
import { calculateDiscount, handlePayment } from "@/utils/utils"
import { toast } from "sonner"

export default function Checkout() {
    const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart()
    const { user, refetchUser } = useAuth()
    const router = useRouter()

    const subtotal = cart.items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)

    const discount = cart.items.reduce((acc, item) => acc + (item.productPrice - calculateDiscount(item.productPrice, item.productDiscount)) * item.quantity, 0)

    const gst = (cart.totalPrice * 3) / 100
    const total = cart.totalPrice + gst

    const handleUpdateUserAddress = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)
            const res = await updateUserAddress(data)
            if (res.success) {
                toast.success(res.message)
                await refetchUser()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <section className="mx-auto max-w-7xl p-6">
            <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="h-[600px] overflow-y-scroll rounded border p-4">
                        {cart.items.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            cart.items.map((item) => (
                                <div key={item._id} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center space-x-4">
                                        <Image src={item.productImage?.[0]} alt={item.productName} width={80} height={80} className="rounded" />
                                        <div>
                                            <h2 className="font-semibold">{item.productName}</h2>
                                            <p className="text-sm text-gray-500">
                                                ₹{calculateDiscount(item.productPrice, item.productDiscount)} x {item.quantity}
                                            </p>
                                            {item.selectedEnergization && <p className="text-xs text-gray-400">+ Energization: ₹{item.selectedEnergization.value}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => decreaseQty(item._id)} className="rounded border px-2 py-1">
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQty(item._id)} className="rounded border px-2 py-1">
                                            +
                                        </button>
                                        <button onClick={() => removeItem(item._id)} className="ml-4 text-red-500 hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* Summary */}
                <div className="rounded-lg border p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                    <div className="mb-2 flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-600">-₹{discount}</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <span>GST (3%)</span>
                        <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    {!user?.fulladdress && (
                        <form className="rounded border" onSubmit={(e) => handleUpdateUserAddress(e)}>
                            <h1 className="bg-orange-100 py-2 text-center font-bold text-orange-700">Add Address continue payment.</h1>
                            <div className="p-4">
                                <div className="grid gap-2">
                                    <label htmlFor="fulladdress">
                                        <span>Full Address</span>
                                        <textarea type="text" id="fulladdress" name="fulladdress" rows={4} placeholder="Full Address" className="textarea resize-none border" />
                                    </label>
                                    <label htmlFor="state">
                                        <span>State: </span>
                                        <input type="text" name="state" id="state" rows={4} placeholder="State" className="input border" />
                                    </label>
                                    <label htmlFor="city">
                                        <span>City: </span>
                                        <input type="text" name="city" id="city" rows={4} placeholder="City" className="input border" />
                                    </label>
                                    <label htmlFor="landmark">
                                        <span>Landmark: </span>
                                        <input type="text" name="landmark" id="landmark" rows={4} placeholder="Landmark" className="input border" />
                                    </label>
                                    <label htmlFor="pincode">
                                        <span>Pincode/Zip code: </span>
                                        <input type="number" name="pincode" id="pincode" rows={4} placeholder="Enter pincode" className="input border" />
                                    </label>
                                    <label htmlFor="contact">
                                        <span>Contact Number: </span>
                                        <input type="number" name="phone" id="contact" rows={4} placeholder="Enter your contact number" className="input border" />
                                    </label>
                                    <button type="submit" className="cursor-pointer rounded border bg-orange-500 py-2 text-white transition-all hover:bg-orange-600">
                                        Update Address
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {user?.fulladdress && (
                        <button
                            onClick={() => handlePayment(total, cart, user, clearCart, router)}
                            disabled={cart.items.length === 0}
                            className="mt-6 w-full rounded-lg bg-yellow-500 py-3 font-medium text-white transition hover:bg-yellow-600"
                        >
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

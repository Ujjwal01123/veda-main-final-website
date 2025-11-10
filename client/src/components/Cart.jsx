import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FaShoppingCart } from "react-icons/fa"
import { Separator } from "./ui/separator"
import { useCart } from "@/context/cartContext"
import Image from "next/image"
import { CircleX, Trash2 } from "lucide-react"
import Link from "next/link"
import { calculateDiscount } from "@/utils/utils"

export default function Cart() {
    const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart()
    const subtotal = cart.items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)

    const discount = cart.items.reduce((acc, item) => acc + (item.productPrice - calculateDiscount(item.productPrice, item.productDiscount)) * item.quantity, 0)

    const gst = (cart.totalPrice * 3) / 100
    const total = cart.totalPrice + gst

    return (
        <Sheet className="z-50">
            <SheetTrigger className="cursor-pointer">
                <div className="relative">
                    <FaShoppingCart className="text-xl" />
                    <span className="absolute -top-1 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">{cart.totalQty}</span>
                </div>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                {/* Header */}
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-2xl font-black">
                        <FaShoppingCart className="text-xl" />
                        <span>Cart</span>
                    </SheetTitle>
                    <SheetDescription>
                        <p>Checkout our products</p>
                    </SheetDescription>
                    <div className="flex justify-end">
                        {!!cart.items?.length && (
                            <button onClick={clearCart} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
                                <CircleX className="inline h-4 w-4" /> Clear Cart
                            </button>
                        )}
                    </div>
                </SheetHeader>

                {/* Empty state */}
                {!cart.items?.length && (
                    <div className="grid flex-1 place-items-center">
                        <p className="text-2xl font-bold">Your cart is empty</p>
                    </div>
                )}

                {/* Scrollable items */}
                {!!cart.items?.length && (
                    <div className="flex-1 space-y-3 overflow-y-auto p-2">
                        {cart?.items?.map((item) => (
                            <div key={item._id} className="rounded-lg border p-2">
                                <div className="flex items-center justify-between gap-2">
                                    <Image src={item?.productImage?.[0]} alt={item.productName} className="h-16 w-16 rounded object-cover" width={100} height={100} />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.productName}</p>
                                        <span>Rs. {item.productPrice}</span>
                                    </div>
                                    <button onClick={() => removeItem(item._id)} title="Remove item from cart" className="cursor-pointer rounded-full border bg-gray-100 p-2 text-red-500">
                                        <Trash2 />
                                    </button>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <p className="font-semibold">Quantity</p>
                                    <div className="flex gap-2">
                                        <button className="aspect-square w-8 cursor-pointer border bg-gray-50 hover:bg-gray-100" onClick={() => decreaseQty(item._id)}>
                                            -
                                        </button>
                                        <button className="aspect-square w-8 border">{item.quantity}</button>
                                        <button className="aspect-square w-8 cursor-pointer border bg-gray-50 hover:bg-gray-100" onClick={() => increaseQty(item._id)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer stays fixed */}
                <SheetFooter className="mt-4 space-y-1 border-t pt-4">
                    <div className="flex items-center justify-between">
                        <span>Subtotal:</span> <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span>Discount (10%):</span> <span className="font-medium text-green-500">₹{discount}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span>GST (3%):</span> <span className="font-medium">₹{gst}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Total:</span> <span className="font-bold text-orange-500">₹{total}</span>
                    </div>
                    <Link
                        href="/checkout"
                        className="inline-block w-full cursor-pointer rounded border border-orange-500 px-6 py-2 text-center font-semibold transition-all hover:bg-orange-500 hover:text-white"
                    >
                        Checkout
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

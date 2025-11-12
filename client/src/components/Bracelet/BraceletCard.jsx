"use client"
import { useCart } from "@/context/cartContext"
import useBracelet from "@/hooks/useBracelet"
import { calculateDiscount } from "@/utils/utils"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

export default function RudraProducts() {
    const { bracelet } = useBracelet()
    const { addItem } = useCart()
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-orange-700 drop-shadow-md" data-aos="fade-up" data-aos-duration="1000">
                        🌿 Divine Bracelet Collection 🌿
                    </h2>
                    <p className="mt-2 text-gray-600" data-aos="fade-up" data-aos-delay="200">
                        Discover 100% authentic Bracelet beads to enhance your spiritual journey
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                    {!bracelet?.length && (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-2xl font-semibold text-gray-600">No products found</p>
                        </div>
                    )}
                    {bracelet?.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            {/* Make image + text a clickable link */}
                            <Link href={`/bracelet/${item._id}`}>
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={item.productImage[0]}
                                        alt={item?.productName}
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-cover object-bottom transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Bracelet</span>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                                    {/* <div className="flex items-end justify-center gap-2">
                                        <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
                                        <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
                                        <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount && item.productDiscount + "% OFF"}</p>
                                    </div> */}
                                    <div className="flex items-end justify-center gap-2">
                                        {item.productDiscount > 0 ? (
                                            <>
                                                <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
                                                <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
                                                <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount}% OFF</p>
                                            </>
                                        ) : (
                                            <p className="mt-2 text-xl font-bold text-orange-500">₹{item.productPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>

                            {/* Button OUTSIDE the Link so it only adds to cart */}
                            <div className="p-4 pt-0">
                                {item?.stock <= 0 ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toast.error("Out of Stock")
                                        }}
                                        className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
                                    >
                                        Out of Stock
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // stop click bubbling
                                            addItem(item)
                                            toast.success("Item added to cart!")
                                        }}
                                        className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-10 text-center" data-aos="zoom-in-up">
                    <button id="viewAllBtn" className="rounded-full bg-orange-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-orange-700">
                        View All Bracelets
                    </button>
                </div> */}
            </div>
        </section>
    )
}

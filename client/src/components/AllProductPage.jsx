"use client"
import { useState } from "react"
import { useCart } from "@/context/cartContext"
import useBracelet from "@/hooks/useBracelet"
import useRudraksha from "@/hooks/useRudraksha"
import { calculateDiscount } from "@/utils/utils"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

function AllProductPage() {
    const [filter, setFilter] = useState("all")
    const { rudraksha } = useRudraksha()
    const { bracelet } = useBracelet()
    const { addItem } = useCart()

    return (
        <>
            <div className="container mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                    {rudraksha?.slice(0, 4).map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            {/* Make image + text a clickable link */}
                            <Link href={`/rudraksha/${item._id}`}>
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={item.productImage[0]}
                                        alt={item?.productName}
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-cover object-bottom transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Rudraksha</span>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
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
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center" data-aos="zoom-in-up">
                    <Link href="/rudraksha" className="rounded-full bg-orange-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-orange-700">
                        View All Rudraksha <ArrowRightIcon className="inline h-5 w-5" />
                    </Link>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                    {/* {!bracelet?.length && (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-2xl font-semibold text-gray-600">No products found</p>
                        </div>
                    )} */}
                    {bracelet?.slice(0, 4).map((item) => (
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
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center" data-aos="zoom-in-up">
                    <Link href="/bracelet" className="rounded-full bg-orange-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-orange-700">
                        View All Bracelets <ArrowRightIcon className="inline h-5 w-5" />
                    </Link>
                </div>
            </div>
            {/* <div className="mx-auto max-w-7xl px-4 py-10 md:py-12 lg:py-16">
                <div className="mb-6 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row">
                    <h1 className="text-2xl font-bold text-gray-800 md:text-4xl">All Products</h1>
                    <div className="flex items-center gap-2 overflow-auto hideScrollbar">
                        <button onClick={() => setFilter("all")} className={`h-8 cursor-pointer rounded-full border border-dashed border-red-950 bg-yellow-100 px-4 duration-200 hover:bg-yellow-300 ${filter === "all" ? "bg-yellow-300" : ""}`}>All</button>
                        <button onClick={() => setFilter("Rudraksha")} className={`h-8 cursor-pointer rounded-full border border-dashed border-red-950 bg-yellow-100 px-4 duration-200 hover:bg-yellow-300 ${filter === "Rudraksha" ? "bg-yellow-300" : ""}`}>Rudraksha</button>
                        <button onClick={() => setFilter("Bracelet")} className={`h-8 cursor-pointer rounded-full border border-dashed border-red-950 bg-yellow-100 px-4 duration-200 hover:bg-yellow-300 ${filter === "Bracelet" ? "bg-yellow-300" : ""}`}>Bracelet</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                    {(filter === "all" || filter === "Rudraksha") && rudraksha?.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            <Link href={`/rudraksha/${item._id}`}>
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={item.productImage[0]}
                                        alt={item?.productName}
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-cover object-bottom transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Rudraksha</span>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                                    <div className="flex items-end justify-center gap-2">
                                        <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
                                        <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
                                        <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount}% OFF</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 pt-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation() // stop click bubbling */}
            {/* addItem(item)
                                        toast.success("Item added to cart!")
                                    }}
                                    className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                    {(filter === "all" || filter === "Bracelet") && bracelet?.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            Make image + text a clickable link */}
            {/* <Link href={`/bracelet/${item._id}`}>
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
                                    <div className="flex items-end justify-center gap-2">
                                        <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
                                        <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
                                        <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount}% OFF</p>
                                    </div>
                                </div>
                            </Link> */}

            {/* Button OUTSIDE the Link so it only adds to cart */}
            {/* <div className="p-4 pt-0">
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
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    )
}

export default AllProductPage

"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useCart } from "@/context/cartContext"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function PujaProducts() {
    const { addItem } = useCart()
    const [pujas, setPujas] = useState([])
    const [loading, setLoading] = useState(true)

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api"

    useEffect(() => {
        const fetchPujas = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pujas/all`)

                if (Array.isArray(response.data)) {
                    setPujas(response.data)
                } else {
                    toast.error("Unexpected API response format")
                }
            } catch (error) {
                console.error("Error fetching pujas:", error)
                toast.error("Failed to load puja data")
            } finally {
                setLoading(false)
            }
        }

        fetchPujas()
    }, [])

    if (loading) {
        return (
            <section className="flex h-[60vh] items-center justify-center bg-gray-50">
                <p className="animate-pulse text-lg font-semibold text-yellow-700">Loading sacred pujas...</p>
            </section>
        )
    }

    const IMG_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL?.replace("/api", "") || "http://localhost:5000"
    console.log(pujas)
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-yellow-700 drop-shadow-md" data-aos="fade-up" data-aos-duration="1000">
                        🔱 Sacred Puja Offerings 🔱
                    </h2>
                    <p className="mt-2 text-gray-600" data-aos="fade-up" data-aos-delay="200">
                        Book authentic Vedic Pujas performed by expert priests for peace, prosperity, and divine blessings.
                    </p>
                </div>

                {pujas.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                        {pujas.map((item) => (
                            <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                                {/* Clickable image and text */}
                                <Link href={`/pujass`}>
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={
                                                item.image
                                                    ? item.image.startsWith("http")
                                                        ? item.image
                                                        : `${IMG_BASE_URL}${item.image}` // ✅ ensures no /api in image URL
                                                    : "/images/default-puja.jpg"
                                            }
                                            alt={item.title || "Puja"}
                                            width={1000}
                                            height={1000}
                                            className="h-full w-full object-cover object-center transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-white shadow">Puja</span>
                                    </div>

                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                        <p className="mt-2 font-semibold text-yellow-600">{item.category?.name || "General"}</p>
                                    </div>
                                </Link>

                                {/* Add to cart */}
                                <div className="p-4 pt-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            addItem(item)
                                            toast.success("Puja added to cart!")
                                        }}
                                        className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No pujas found.</p>
                )}
            </div>
        </section>
    )
}

// "use client"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import { useCart } from "@/context/cartContext"
// import { toast } from "sonner"
// import Image from "next/image"
// import Link from "next/link"

// export default function PujaProducts() {
//     const { addItem } = useCart()
//     const [puja, setPuja] = useState([])
//     const [loading, setLoading] = useState(true)

//     const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api"
//     useEffect(() => {
//         const fetchPuja = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/pujas/all`) // ✅ Update this URL to match your backend endpoint
//                 console.log("hello", response.data)
//                 setPuja(response.data)
//             } catch (error) {
//                 console.error("Error fetching pujas:", error)
//                 toast.error("Failed to load puja data")
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchPuja()
//     }, [])

//     if (loading) {
//         return (
//             <section className="flex h-[60vh] items-center justify-center bg-gray-50">
//                 <p className="animate-pulse text-lg font-semibold text-yellow-700">Loading sacred pujas...</p>
//             </section>
//         )
//     }

//     return (
//         <section className="bg-gray-50 py-16">
//             <div className="container mx-auto px-6">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-4xl font-extrabold text-yellow-700 drop-shadow-md" data-aos="fade-up" data-aos-duration="1000">
//                         🔱 Sacred Puja Offerings 🔱
//                     </h2>
//                     <p className="mt-2 text-gray-600" data-aos="fade-up" data-aos-delay="200">
//                         Book authentic Vedic Pujas performed by expert priests for peace, prosperity, and divine blessings.
//                     </p>
//                 </div>

//                 {puja?.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
//                         {puja.map((item) => (
//                             <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
//                                 {/* Image + Text as clickable Link */}
//                                 <Link href={`/puja/${item._id}`}>
//                                     <div className="relative h-64 w-full">
//                                         <Image
//                                             src={item.image?.[0] || item.image || "/images/default-puja.jpg"}
//                                             alt={item.title || item.pujaName || "Puja"}
//                                             width={1000}
//                                             height={1000}
//                                             className="h-full w-full object-cover object-center transition-transform duration-500"
//                                         />

//                                         <span className="absolute top-3 left-3 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-white shadow">Puja</span>
//                                     </div>
//                                     <div className="p-4 text-center">
//                                         <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
//                                         <div className="flex items-end justify-center gap-2">
//                                             <p className="mt-2 text-xl font-bold text-yellow-600">{item.category?.name || "General"}</p>
//                                         </div>
//                                     </div>
//                                 </Link>

//                                 {/* Add to Cart / Out of Stock */}
//                                 <div className="p-4 pt-0">
//                                     {item?.slotsAvailable <= 0 ? (
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 toast.error("Currently Unavailable")
//                                             }}
//                                             className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
//                                         >
//                                             Unavailable
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 addItem(item)
//                                                 toast.success("Puja added to cart!")
//                                             }}
//                                             className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
//                                         >
//                                             Book Now
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-600">No pujas found.</p>
//                 )}
//             </div>
//         </section>
//     )
// }

// // "use client"
// // import { useCart } from "@/context/cartContext"
// // import usePuja from "@/hooks/usePuja"
// // import { calculateDiscount } from "@/utils/utils"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { toast } from "sonner"

// // export default function PujaProducts() {
// //     const { puja, loading } = usePuja() // ✅ Corrected variable name
// //     const { addItem } = useCart()

// //     console.log("Puja data in PujaProducts:", puja)

// //     if (loading) {
// //         return (
// //             <section className="flex h-[60vh] items-center justify-center bg-gray-50">
// //                 <p className="animate-pulse text-lg font-semibold text-yellow-700">Loading sacred pujas...</p>
// //             </section>
// //         )
// //     }

// //     return (
// //         <section className="bg-gray-50 py-16">
// //             <div className="container mx-auto px-6">
// //                 <div className="mb-10 text-center">
// //                     <h2 className="text-4xl font-extrabold text-yellow-700 drop-shadow-md" data-aos="fade-up" data-aos-duration="1000">
// //                         🔱 Sacred Puja Offerings 🔱
// //                     </h2>
// //                     <p className="mt-2 text-gray-600" data-aos="fade-up" data-aos-delay="200">
// //                         Book authentic Vedic Pujas performed by expert priests for peace, prosperity, and divine blessings.
// //                     </p>
// //                 </div>

// //                 {puja?.length > 0 ? (
// //                     <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
// //                         {puja.map((item) => (
// //                             <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
// //                                 {/* Image + Text as clickable Link */}
// //                                 <Link href={`/puja/${item._id}`}>
// //                                     <div className="relative h-64 w-full">
// //                                         <Image
// //                                             src={item.image?.[0] || item.image || "/images/default-puja.jpg"}
// //                                             alt={item.title || item.pujaName || "Puja"}
// //                                             width={1000}
// //                                             height={1000}
// //                                             className="h-full w-full object-cover object-center transition-transform duration-500"
// //                                         />

// //                                         <span className="absolute top-3 left-3 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-white shadow">Puja</span>
// //                                     </div>
// //                                     <div className="p-4 text-center">
// //                                         <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
// //                                         <div className="flex items-end justify-center gap-2">
// //                                             <p className="mt-2 text-xl font-bold text-yellow-600">{item.category.name}</p>
// //                                             {/* <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.pujaPrice}</p> */}
// //                                             {/* {item.pujaDiscount && <p className="text-md mt-2 font-bold text-green-600">{item.pujaDiscount}% OFF</p>} */}
// //                                         </div>
// //                                     </div>
// //                                 </Link>

// //                                 {/* Add to Cart / Out of Stock */}
// //                                 <div className="p-4 pt-0">
// //                                     {item?.slotsAvailable <= 0 ? (
// //                                         <button
// //                                             onClick={(e) => {
// //                                                 e.stopPropagation()
// //                                                 toast.error("Currently Unavailable")
// //                                             }}
// //                                             className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
// //                                         >
// //                                             Unavailable
// //                                         </button>
// //                                     ) : (
// //                                         <button
// //                                             onClick={(e) => {
// //                                                 e.stopPropagation()
// //                                                 addItem(item)
// //                                                 toast.success("Puja added to cart!")
// //                                             }}
// //                                             className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
// //                                         >
// //                                             Book Now
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 ) : (
// //                     <p className="text-center text-gray-600">No pujas found.</p>
// //                 )}
// //             </div>
// //         </section>
// //     )
// // }

// // "use client"
// // import { useCart } from "@/context/cartContext"
// // import usePuja from "@/hooks/usePuja" // ✅ custom hook like useRudraksha
// // import { calculateDiscount } from "@/utils/utils"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { toast } from "sonner"

// // export default function PujaProducts() {
// //     const { pujas } = usePuja()
// //     const { addItem } = useCart()

// //     return (
// //         <section className="bg-gray-50 py-16">
// //             <div className="container mx-auto px-6">
// //                 <div className="mb-10 text-center">
// //                     <h2 className="text-4xl font-extrabold text-yellow-700 drop-shadow-md" data-aos="fade-up" data-aos-duration="1000">
// //                         🔱 Sacred Puja Offerings 🔱
// //                     </h2>
// //                     <p className="mt-2 text-gray-600" data-aos="fade-up" data-aos-delay="200">
// //                         Book authentic Vedic Pujas performed by expert priests for peace, prosperity, and divine blessings.
// //                     </p>
// //                 </div>

// //                 <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
// //                     {pujas?.map((item) => (
// //                         <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
// //                             {/* Image + Text as clickable Link */}
// //                             <Link href={`/puja/${item._id}`}>
// //                                 <div className="relative h-64 w-full">
// //                                     <Image
// //                                         src={item.pujaImage?.[0] || "/images/default-puja.jpg"}
// //                                         alt={item?.pujaName || "Puja"}
// //                                         width={1000}
// //                                         height={1000}
// //                                         className="h-full w-full object-cover object-center transition-transform duration-500"
// //                                     />
// //                                     <span className="absolute top-3 left-3 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-white shadow">Puja</span>
// //                                 </div>
// //                                 <div className="p-4 text-center">
// //                                     <h3 className="text-lg font-semibold text-gray-800">{item.pujaName}</h3>
// //                                     <div className="flex items-end justify-center gap-2">
// //                                         <p className="mt-2 text-xl font-bold text-yellow-600">₹{calculateDiscount(item.pujaPrice, item.pujaDiscount)}</p>
// //                                         <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.pujaPrice}</p>
// //                                         <p className="text-md mt-2 font-bold text-green-600">{item.pujaDiscount && item.pujaDiscount + "% OFF"}</p>
// //                                     </div>
// //                                 </div>
// //                             </Link>

// //                             {/* Add to Cart / Out of Stock */}
// //                             <div className="p-4 pt-0">
// //                                 {item?.slotsAvailable <= 0 ? (
// //                                     <button
// //                                         onClick={(e) => {
// //                                             e.stopPropagation()
// //                                             toast.error("Currently Unavailable")
// //                                         }}
// //                                         className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
// //                                     >
// //                                         Unavailable
// //                                     </button>
// //                                 ) : (
// //                                     <button
// //                                         onClick={(e) => {
// //                                             e.stopPropagation()
// //                                             addItem(item)
// //                                             toast.success("Puja added to cart!")
// //                                         }}
// //                                         className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
// //                                     >
// //                                         Book Now
// //                                     </button>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     )
// // }

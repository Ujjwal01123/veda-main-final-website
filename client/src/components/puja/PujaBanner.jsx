"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

export default function PujaBanner() {
    const [banners, setBanners] = useState([])
    const [current, setCurrent] = useState(0)
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"

    // Fetch banners
    useEffect(() => {
        axios
            .get(`${apiUrl}/banners/puja`)
            .then((res) => {
                if (res.data?.success && res.data.data?.images) {
                    setBanners(res.data.data.images)
                }
            })
            .catch((err) => console.error("Error fetching Puja banners:", err))
    }, [apiUrl])

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (banners.length === 0) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [banners])

    // Safe image URL
    const getFullImageUrl = (path = "") => {
        if (!path) return ""
        const baseUrl = apiUrl.replace(/\/api$/, "")
        if (path.startsWith("http")) return path
        return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
    }

    // Fallback banner
    if (banners.length === 0) {
        return (
            <section className="relative flex w-full items-center justify-center overflow-hidden bg-gray-100">
                <img src="/images/default-puja-banner.jpg" className="w-full object-contain object-center" alt="Fallback Puja Banner" />
            </section>
        )
    }

    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={banners[current].imageUrl}
                        src={getFullImageUrl(banners[current].imageUrl)}
                        alt={banners[current].altText || "Puja Banner"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full object-contain object-center"
                    />
                </AnimatePresence>

                {/* Dots for navigation */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                    {banners.map((_, index) => (
                        <button key={index} onClick={() => setCurrent(index)} className={`h-2 w-2 rounded-full transition-all ${index === current ? "w-4 bg-yellow-500" : "bg-white/60"}`}></button>
                    ))}
                </div>
            </div>
        </section>
    )
}

// "use client"

// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { motion, AnimatePresence } from "framer-motion"

// export default function PujaBanner() {
//     const [banners, setBanners] = useState([])
//     const [current, setCurrent] = useState(0)
//     const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"

//     // Fetch banners for the puja section
//     useEffect(() => {
//         axios
//             .get(`${apiUrl}/banners/puja`)
//             .then((res) => {
//                 console.log("Fetched Puja banners:", res.data.data?.images)
//                 if (res.data?.success && res.data.data?.images) {
//                     setBanners(res.data.data.images)
//                 }
//             })
//             .catch((err) => console.error("Error fetching Puja banners:", err))
//     }, [apiUrl])

//     // Auto-slide every 4 seconds
//     useEffect(() => {
//         if (banners.length === 0) return
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % banners.length)
//         }, 4000)
//         return () => clearInterval(timer)
//     }, [banners])

//     // Build image URL safely
//     const getFullImageUrl = (path = "") => {
//         if (!path) return ""
//         const baseUrl = apiUrl.replace(/\/api$/, "")
//         if (path.startsWith("http")) return path
//         return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
//     }

//     // Fallback if no banner found
//     if (banners.length === 0) {
//         return (
//             <section className="relative flex h-[200px] w-full items-center justify-center overflow-hidden bg-gray-100 sm:h-[300px] md:h-[400px] lg:h-[500px]">
//                 <img src="/images/default-puja-banner.jpg" className="h-full w-full object-cover object-center" alt="Fallback Puja Banner" />
//             </section>
//         )
//     }

//     return (
//         <section className="relative h-[200px] w-full overflow-hidden sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[560px]">
//             <div className="relative h-full w-full">
//                 <AnimatePresence mode="wait">
//                     <motion.img
//                         key={banners[current].imageUrl}
//                         src={getFullImageUrl(banners[current].imageUrl)}
//                         alt={banners[current].altText || "Puja Banner"}
//                         initial={{ opacity: 0, scale: 1.05 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 1.05 }}
//                         transition={{ duration: 1 }}
//                         className="absolute top-0 left-0 h-full w-full object-cover object-center"
//                     />
//                 </AnimatePresence>

//                 {/* Gradient Overlay for better text readability */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>

//                 {/* Dots for navigation */}
//                 <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-5">
//                     {banners.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrent(index)}
//                             className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${index === current ? "w-5 bg-yellow-500 shadow-md" : "bg-white/70 hover:bg-yellow-400"}`}
//                         ></button>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// "use client"

// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { motion, AnimatePresence } from "framer-motion"

// export default function PujaBanner() {
//     const [banners, setBanners] = useState([])
//     const [current, setCurrent] = useState(0)
//     const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"

//     // Fetch banners for the puja section
//     useEffect(() => {
//         axios
//             .get(`${apiUrl}/banners/puja`)
//             .then((res) => {
//                 console.log("Fetched Puja banners:", res.data.data?.images)
//                 if (res.data?.success && res.data.data?.images) {
//                     setBanners(res.data.data.images)
//                 }
//             })
//             .catch((err) => console.error("Error fetching Puja banners:", err))
//     }, [apiUrl])

//     // Auto-slide every 4 seconds
//     useEffect(() => {
//         if (banners.length === 0) return
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % banners.length)
//         }, 4000)
//         return () => clearInterval(timer)
//     }, [banners])

//     // Build image URL safely
//     const getFullImageUrl = (path = "") => {
//         if (!path) return ""
//         const baseUrl = apiUrl.replace(/\/api$/, "")
//         if (path.startsWith("http")) return path
//         return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
//     }

//     // Fallback if no banner found
//     if (banners.length === 0) {
//         return (
//             <section className="relative flex h-[560px] w-full items-center justify-center overflow-hidden bg-gray-100">
//                 <img src="/images/default-puja-banner.jpg" className="h-full w-full object-cover object-center" alt="Fallback Puja Banner" />
//             </section>
//         )
//     }

//     return (
//         <section className="relative h-[480px] w-full overflow-hidden">
//             <div className="relative h-full w-full">
//                 <AnimatePresence mode="wait">
//                     <motion.img
//                         key={banners[current].imageUrl}
//                         src={getFullImageUrl(banners[current].imageUrl)}
//                         alt={banners[current].altText || "Puja Banner"}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 1 }}
//                         className="absolute top-0 left-0 h-full w-full object-cover object-center"
//                     />
//                 </AnimatePresence>

//                 {/* Dots for navigation */}
//                 <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
//                     {banners.map((_, index) => (
//                         <button key={index} onClick={() => setCurrent(index)} className={`h-2 w-2 rounded-full transition-all ${index === current ? "w-4 bg-yellow-500" : "bg-white/60"}`}></button>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

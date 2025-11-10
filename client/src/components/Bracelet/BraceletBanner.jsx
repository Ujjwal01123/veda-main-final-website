"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

export default function BraceletBanner() {
    const [banners, setBanners] = useState([])
    const [current, setCurrent] = useState(0)
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"

    // ✅ Fetch Bracelet Banners
    useEffect(() => {
        axios
            .get(`${apiUrl}/banners/bracelet`)
            .then((res) => {
                if (res.data?.success && res.data.data?.images) {
                    setBanners(res.data.data.images)
                }
            })
            .catch((err) => console.error("Error fetching bracelet banners:", err))
    }, [apiUrl])

    // ✅ Auto Slide
    useEffect(() => {
        if (banners.length === 0) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [banners])

    // ✅ Format Image URL (remove /api)
    const getFullImageUrl = (path = "") => {
        if (!path) return ""
        const baseUrl = apiUrl.replace(/\/api$/, "")
        if (path.startsWith("http")) return path
        return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
    }

    // ✅ Fallback Banner (auto height, no bg)
    if (banners.length === 0) {
        return (
            <section className="relative flex w-full items-center justify-center overflow-hidden">
                <img src="/images/Artboard-1.jpg" alt="Fallback Bracelet Banner" className="h-auto w-full object-contain object-center" />
            </section>
        )
    }

    // ✅ Render Banner Carousel (auto height, no bg)
    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={banners[current].imageUrl}
                        src={getFullImageUrl(banners[current].imageUrl)}
                        alt={banners[current].altText || "Bracelet Banner"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="h-auto w-full object-contain object-center"
                    />
                </AnimatePresence>

                {/* Dots Navigation */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                    {banners.map((_, index) => (
                        <button key={index} onClick={() => setCurrent(index)} className={`h-2 w-2 rounded-full transition-all ${index === current ? "w-4 bg-yellow-500" : "bg-white/60"}`}></button>
                    ))}
                </div>
            </div>
        </section>
    )
}

"use client"

// import React from "react"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import YagyaHeroSection from "@/components/yagya-compo/YagyaHeroSection/YagyaHeroSection.jsx"
import YagyaAboutSection from "@/components/yagya-compo/YagyaAboutSection/YagyaAboutSection.jsx"
import YagyaTypesSection from "@/components/yagya-compo/YagyaTypesSection/YagyaTypesSection.jsx"
// import PricingSection from "@/components/yagya-compo/PricingSection/PricingSection.jsx"
import HowItWorksSection from "@/components/yagya-compo/HowItWorksSection/HowItWorksSection.jsx"
import ForWhomSection from "@/components/yagya-compo/ForWhomSection/ForWhomSection.jsx"
// import ClosingCTASection from "@/components/yagya-compo/ClosingCTASection/ClosingCTASection.jsx"
import TestimonialCarousel from "@/components/yagya-compo/TestimonialCarousel/TestimonialCarousel.jsx"
import FaqAccordion from "@/components/yagya-compo/FaqAccordion/FaqAccordion.jsx"
import TrustAuthenticitySection from "@/components/yagya-compo/TrustAuthenticitySection/TrustAuthenticitySection.jsx"

const App = () => {
    const router = useRouter()
    const [yagyas, setYagyas] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchYagyas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const yagyaData = res.data.filter((item) => item.category.name === "Vedic Yagya")
                // console.log("Fetched nitya data:", yagyaData)
                setYagyas(yagyaData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchYagyas()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")

    return (
        <>
            <YagyaHeroSection />
            <YagyaAboutSection />
            <YagyaTypesSection />
            {/* <PricingSection /> */}
            {/* cards */}
            <section id="book" className="bg-base-50 py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Yagya You Can Book</h2>
                    {/* <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p> */}
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {yagyas?.map((item) => (
                            <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <Link href={`/yagya-puja/${item._id}`}>
                                    <div className="relative h-56 w-full sm:h-64 md:h-72">
                                        <Image
                                            src={`${imageUrl}${item.image}`}
                                            alt={item?.title}
                                            width={1000}
                                            height={1000}
                                            className="h-full w-full object-cover object-center transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">{item.category.name}</span>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">{item.title}</h3>
                                        <div className="flex items-end justify-center gap-2">
                                            {/* <p className="mt-3 text-sm text-neutral-800 sm:text-base" dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-4 pt-0">
                                    <button
                                        onClick={() => router.push(`/yagya-puja/${item._id}`)} // ✅ same route
                                        className="mt-3 w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/*  */}
            {/*  */}
            <HowItWorksSection />
            <ForWhomSection />
            <TrustAuthenticitySection />
            {/* <TestimonialCarousel /> */}
            <FaqAccordion />
            {/* <ClosingCTASection /> */}
        </>
    )
}

export default App

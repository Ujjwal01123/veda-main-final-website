// Path.jsx
"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

function Path() {
    const router = useRouter()
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [isPopupAnimating, setIsPopupAnimating] = useState(false)

    // --- Popup Modal Logic ---
    const showPopup = (e) => {
        e.preventDefault()
        setIsPopupVisible(true)

        requestAnimationFrame(() => {
            setIsPopupAnimating(true)
        })
    }

    const hidePopup = () => {
        setIsPopupAnimating(false)

        setTimeout(() => {
            setIsPopupVisible(false)
        }, 300)
    }

    useEffect(() => {
        const reveals = document.querySelectorAll(".reveal")
        if (reveals.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                    }
                })
            },
            {
                threshold: 0.1,
            },
        )

        reveals.forEach((reveal) => {
            observer.observe(reveal)
        })

        return () => {
            reveals.forEach((reveal) => {
                observer.unobserve(reveal)
            })
        }
    }, [])

    useEffect(() => {
        document.title = "Path & Recitation Services - Veda Structure"
    }, [])

    const [paths, setpaths] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const pathData = res.data.filter((item) => item.category.name === "Path | Recitation")
                console.log("Fetched path data:", pathData)
                setpaths(pathData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPaths()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")

    return (
        <>
            <main className="test">
                <section className="relative overflow-hidden pt-24 pb-32 text-center md:pt-32 md:pb-40">
                    <video autoPlay loop muted playsInline className="absolute top-0 left-0 z-0 h-full w-full object-cover">
                        {/* IMPORTANT: Asset paths are now relative to the 'public' folder */}
                        <source src="/images/path-recitation/Hv-F.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute top-0 left-0 z-1 h-full w-full bg-black/50" aria-hidden="true"></div>

                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <h1 className="reveal mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ transitionDelay: "100ms" }}>
                            📿 Experience the <span className="text-orange-500">Transformative Power</span> of Vedic Path
                        </h1>

                        <p className="reveal mx-auto mt-8 max-w-2xl text-lg text-white sm:text-xl" style={{ transitionDelay: "200ms" }}>
                            Sacred mantras have the vibration to shift destiny. At Veda Structure, every Path is performed by{" "}
                            <span className="font-semibold text-orange-500">experienced Kashi Pandits</span>, following authentic Vedic methods.
                        </p>
                        <div className="reveal mt-10" style={{ transitionDelay: "300ms" }}>
                            <a
                                href="#pricing"
                                className="hover:bg-saffron-600 inline-flex transform items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                            >
                                Book Your Path Now
                            </a>
                            <p className="mt-3 text-sm text-white">For peace, prosperity, protection, and spiritual upliftment.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-base-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 lg:grid-cols-7">
                            <div className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">🪔</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Certified Kashi Pandits</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "50ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">📜</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Vedic & Puranic Scriptures</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "100ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">📿</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Personalized Sankalp</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "150ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">🔔</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Authentic Live Chanting</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "200ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">📸</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Live Streaming & Video</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "250ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">🌞</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Pure Ritual Setup</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <div className="bg-base-100 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <span className="text-4xl">💫</span>
                                </div>
                                <p className="mt-4 text-base font-semibold text-neutral-800">Expert Astrologer Guidance</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                        <div className="reveal">
                            <div className="bg-base-50 h-80 w-full overflow-hidden rounded-lg border border-gray-100 shadow-lg md:h-96">
                                <img src="/images/path-recitation/i-1.jpg" alt="Kashi Pandits performing Path Recitation" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        <div className="reveal" style={{ transitionDelay: "150ms" }}>
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">
                                What is <span className="text-orange-500">Path & Recitation?</span>
                            </h2>
                            <p className="mt-6 text-lg text-neutral-800">
                                A <strong className="font-semibold text-orange-500">Path (पाठ)</strong> is the sacred chanting of Vedic or Puranic mantras — performed to invoke divine blessings,
                                purify karmic blocks, and strengthen spiritual energy.
                            </p>
                            <p className="mt-4 text-lg text-neutral-800">
                                When these mantras are recited by trained Pandits in <strong className="text-neutral-900">Kashi</strong>, the energy of every sound multiplies, connecting your soul
                                directly to the Divine. Each mantra carries specific vibrations to restore balance in your life.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-base-50 py-24">
                    <div className="reveal mx-auto max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Path You Can Book</h2>
                        <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p>
                    </div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {paths?.map((item) => (
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
                                            {/* <div className="flex items-end justify-center gap-2">
                                                <p className="mt-3 text-sm text-neutral-800 sm:text-base" dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </div> */}
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

                <section className="bg-white py-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                        <div className="reveal">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">
                                What You&apos;ll <span className="text-orange-500">Receive</span>
                            </h2>
                            <p className="mt-6 text-lg text-neutral-800">Every Path is a complete divine experience, handled with utmost care and devotion.</p>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-start">
                                    <span className="text-lg text-neutral-800">Personalized Sankalp with your name, gotra, and intent</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-lg text-neutral-800">Chanting by 3–5 dedicated Kashi Pandits</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-lg text-neutral-800">Live streaming or full recording (optional)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-lg text-neutral-800">Digital blessings note & Puja summary</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-lg text-neutral-800">Guidance on what to do post-path (spiritual routine or donation advice)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="reveal" style={{ transitionDelay: "150ms" }}>
                            <div className="bg-base-50 h-80 w-full overflow-hidden rounded-lg border border-gray-100 shadow-lg md:h-96">
                                <img src="/images/path-recitation/p-2.png" alt="Puja Samagri for Path Recitation" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-base-50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal mx-auto max-w-2xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">
                                Why Choose <span className="text-orange-500">Veda Structure?</span>
                            </h2>
                            <p className="mt-4 text-lg text-neutral-800">We are committed to authenticity and real results.</p>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                            <div className="reveal rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg sm:h-20 sm:w-20">
                                    <span className="text-4xl sm:text-5xl">🌺</span>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">Authenticity</h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">Follows the true Maharishi Vedic tradition.</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "100ms" }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg sm:h-20 sm:w-20">
                                    <span className="text-4xl sm:text-5xl">🕉️</span>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">Experience</h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">Over 15 years of Vedic expertise in Kashi.</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "200ms" }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg sm:h-20 sm:w-20">
                                    <span className="text-4xl sm:text-5xl">📜</span>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">Transparency</h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">Live proof of every recitation — join virtually.</p>
                            </div>

                            <div
                                className="reveal rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                style={{ transitionDelay: "300ms" }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg sm:h-20 sm:w-20">
                                    <span className="text-4xl sm:text-5xl">💫</span>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">Personalized</h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">Tailored as per your doshas and needs.</p>
                            </div>

                            <div
                                className="reveal col-span-2 rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-1"
                                style={{ transitionDelay: "400ms" }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg sm:h-20 sm:w-20">
                                    <span className="text-4xl sm:text-5xl">💖</span>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900 sm:text-xl">Energy Purification</h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">Correct pronunciation for real results.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section id="pricing" className="bg-white py-24">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal mx-auto max-w-2xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">Choose Your Plan</h2>
                            <p className="mt-4 text-lg text-neutral-800">Select the Path intensity that feels right for you.</p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="reveal flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                                <div className="flex-grow">
                                    <h3 className="font-serif text-2xl font-bold text-orange-500"> Basic Path</h3>
                                    <p className="mt-4 text-4xl font-bold text-neutral-900">₹2,100</p>
                                    <p className="mt-2 text-gray-600">Short recitation by 1 Pandit with your Sankalp</p>
                                </div>
                                <a
                                    href="#"
                                    onClick={showPopup}
                                    className="book-now-btn mt-8 inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-6 py-3 text-base font-medium text-orange-500 transition-colors duration-300 hover:bg-orange-500 hover:text-white"
                                >
                                    Book Now
                                </a>
                            </div>

                            <div
                                className="reveal flex transform flex-col rounded-2xl border-2 border-orange-500 bg-white p-8 shadow-2xl shadow-orange-500/20 md:scale-105"
                                style={{ transitionDelay: "100ms" }}
                            >
                                <span className="absolute top-0 left-1/2 -mt-3 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-sm font-bold text-white">POPULAR</span>
                                <div className="flex-grow">
                                    <h3 className="font-serif text-2xl font-bold text-orange-500"> Complete Path</h3>
                                    <p className="mt-4 text-4xl font-bold text-neutral-900">₹5,100</p>
                                    <p className="mt-2 text-gray-600">Full recitation by 3 Pandits with mantras & rituals</p>
                                </div>
                                <a
                                    href="#"
                                    onClick={showPopup}
                                    className="book-now-btn hover:bg-saffron-600 mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white transition-colors duration-300"
                                >
                                    Book Now
                                </a>
                            </div>

                            <div className="reveal flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-lg" style={{ transitionDelay: "200ms" }}>
                                <div className="flex-grow">
                                    <h3 className="font-serif text-2xl font-bold text-orange-500"> Maha Path</h3>
                                    <p className="mt-4 text-4xl font-bold text-neutral-900">₹9,100</p>
                                    <p className="mt-2 text-gray-600">5 Pandits, extended chanting, personalized blessings & recording</p>
                                </div>
                                <a
                                    href="#"
                                    onClick={showPopup}
                                    className="book-now-btn mt-8 inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-6 py-3 text-base font-medium text-orange-500 transition-colors duration-300 hover:bg-orange-500 hover:text-white"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="bg-base-50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal mx-auto max-w-2xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">How It Works</h2>
                            <p className="mt-4 text-lg text-neutral-800">A simple and transparent process.</p>
                        </div>

                        <div className="mt-20 grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-y-8 lg:grid-cols-4 lg:gap-x-20">
                            <div className="reveal relative rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg">
                                <div className="bg-base-100 mx-auto -mt-14 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500">
                                    <span className="font-serif text-2xl font-bold text-orange-500">01</span>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Submit Your Details</h3>
                                <p className="mt-2 text-gray-600">Submit your Name, Gotra & Date of Birth.</p>

                                <div className="absolute top-1/2 -right-10 z-0 hidden -translate-y-1/2 lg:block">
                                    <svg className="h-8 w-8 text-orange-500/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>

                            <div className="reveal relative rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg" style={{ transitionDelay: "100ms" }}>
                                <div className="bg-base-100 mx-auto -mt-14 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500">
                                    <span className="font-serif text-2xl font-bold text-orange-500">02</span>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Choose Your Path</h3>
                                <p className="mt-2 text-gray-600">Choose the Path you wish to perform.</p>

                                <div className="absolute top-1/2 -right-10 z-0 hidden -translate-y-1/2 lg:block">
                                    <svg className="h-8 w-8 text-orange-500/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>

                            <div className="reveal relative rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg" style={{ transitionDelay: "200ms" }}>
                                <div className="bg-base-100 mx-auto -mt-14 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500">
                                    <span className="font-serif text-2xl font-bold text-orange-500">03</span>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Pandits Perform Path</h3>
                                <p className="mt-2 text-gray-600">Our Pandits perform the chanting in Kashi.</p>

                                <div className="absolute top-1/2 -right-10 z-0 hidden -translate-y-1/2 lg:block">
                                    <svg className="h-8 w-8 text-orange-500/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>

                            <div className="reveal relative rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg" style={{ transitionDelay: "300ms" }}>
                                <div className="bg-base-100 mx-auto -mt-14 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500">
                                    <span className="font-serif text-2xl font-bold text-orange-500">04</span>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Receive Blessings</h3>
                                <p className="mt-2 text-gray-600">Receive live stream link, photos, and a report.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal mx-auto max-w-2xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">
                                What Our <span className="text-orange-500">Devotees</span> Say
                            </h2>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="reveal bg-base-50 border-base-100 rounded-xl border p-8">
                                <div className="text-3xl text-amber-400">⭐⭐⭐⭐⭐</div>
                                <p className="mt-6 text-lg text-neutral-800">“After my Maha Mrityunjaya Path, my health improved miraculously. Grateful for Veda Structure!”</p>
                                <p className="mt-4 font-bold text-neutral-900">- Renu Sharma</p>
                            </div>
                            <div className="reveal bg-base-50 border-base-100 rounded-xl border p-8" style={{ transitionDelay: "100ms" }}>
                                <div className="text-3xl text-amber-400">⭐⭐⭐⭐⭐</div>
                                <p className="mt-6 text-lg text-neutral-800">“The Durga Saptashati Path brought peace and prosperity to my home. Truly divine experience.”</p>
                                <p className="mt-4 font-bold text-neutral-900">- Saurabh Gupta</p>
                            </div>
                            <div className="reveal bg-base-50 border-base-100 rounded-xl border p-8" style={{ transitionDelay: "200ms" }}>
                                <div className="text-3xl text-amber-400">⭐⭐⭐⭐⭐</div>
                                <p className="mt-6 text-lg text-neutral-800">“Sundarkand Path filled my heart with devotion. Felt Hanuman ji’s presence.”</p>
                                <p className="mt-4 font-bold text-neutral-900">- Aditi Verma</p>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="bg-base-50 py-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal text-center">
                            <h2 className="font-serif text-4xl font-bold text-neutral-900">Frequently Asked Questions</h2>
                        </div>
                        <div className="mt-12 space-y-6">
                            <details className="reveal group rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <summary className="flex cursor-pointer list-none items-center justify-between">
                                    <span className="text-lg font-medium text-neutral-900">Q1: Can I attend the Path online?</span>
                                    <span className="transform text-2xl text-orange-500 transition-transform duration-200 group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 text-neutral-800">👉 Yes! We offer live-streaming and recorded video options.</p>
                            </details>
                            <details className="reveal group rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <summary className="flex cursor-pointer list-none items-center justify-between">
                                    <span className="text-lg font-medium text-neutral-900">Q2: How do I choose the right Path?</span>
                                    <span className="transform text-2xl text-orange-500 transition-transform duration-200 group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 text-neutral-800">👉 Our astrologer will analyze your birth chart and suggest the most suitable recitation.</p>
                            </details>
                            <details className="reveal group rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <summary className="flex cursor-pointer list-none items-center justify-between">
                                    <span className="text-lg font-medium text-neutral-900">Q3: How soon will my Path start after booking?</span>
                                    <span className="transform text-2xl text-orange-500 transition-transform duration-200 group-open:rotate-445">+</span>
                                </summary>
                                <p className="mt-4 text-neutral-800">👉 Usually within 2–3 days based on the auspicious muhurat.</p>
                            </details>
                        </div>
                    </div>
                </section>

                <section className="from-base-100 bg-gradient-to-t to-white py-24">
                    <div className="reveal mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                            📿 Let the Power of <span className="text-orange-500">Sacred Sound</span> Transform You.
                        </h2>
                        <p className="mt-6 text-lg text-neutral-800 sm:text-xl">
                            Mantras are living vibrations. When recited with devotion, they align your body, mind, and soul with cosmic rhythm. At Veda Structure, we bring this ancient healing to your
                            life.
                        </p>
                        <div className="mt-10">
                            <a
                                href="#pricing"
                                className="hover:bg-saffron-600 inline-flex transform items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                            >
                                Book Your Path Now – Experience the Energy
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Booking Popup Modal --- */}
            {/* This is now controlled by React state.
        - `isPopupVisible` controls the 'display' (using 'hidden' class).
        - `isPopupAnimating` controls the opacity and scale for the transition.
      */}
            {isPopupVisible && (
                <div
                    id="booking-popup"
                    className={`bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-opacity duration-300 ease-out ${
                        isPopupAnimating ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={hidePopup} // Click on overlay to close
                >
                    <div
                        id="popup-content"
                        className={`relative w-full max-w-sm transform rounded-lg bg-white p-8 text-center shadow-2xl transition-all duration-300 ease-out md:p-12 ${
                            isPopupAnimating ? "scale-100" : "scale-95"
                        }`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
                    >
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-neutral-900">Booked Successfully!</h2>
                        <p className="mt-2 text-lg text-gray-600">Our team will contact you shortly.</p>
                        <button id="close-popup" onClick={hidePopup} className="hover:bg-saffron-600 mt-8 w-full rounded-md bg-orange-500 px-6 py-3 font-bold text-white transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Path

// import React from "react"

// const PathRecitation = () => {
//     return (
//         <div className="bg-cream text-charcoal font-sans antialiased">
//             {/* HEADER */}
//             <header className="relative flex min-h-screen items-end overflow-hidden text-white md:items-center">
//                 <div className="absolute inset-0 z-0">
//                     <img src="/images/nitya-ati/banner.jpg" alt="Path Recitation Ceremony" className="h-full w-full object-cover" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//                 </div>

//                 <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:px-12 md:pb-0 md:text-left">
//                     <h1 className="font-serif text-5xl leading-tight font-bold tracking-wide md:text-7xl">Recite the Sacred Path</h1>
//                     <p className="mt-4 max-w-2xl text-lg text-amber-300 md:text-xl">
//                         Experience the divine energy through sacred Path | Recitation — a spiritual practice that purifies the soul, spreads peace, and invokes divine blessings through holy verses.
//                     </p>
//                     <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
//                         <a
//                             href="#participate"
//                             className="bg-orange-500 hover:bg-saffron-600 flex w-full transform items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-105 sm:w-auto"
//                         >
//                             Participate in Path
//                         </a>
//                         <a
//                             href="#live"
//                             className="hover:text-charcoal flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-black/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white sm:w-auto"
//                         >
//                             Watch Live Recitation
//                         </a>
//                     </div>
//                 </div>
//             </header>

//             <main>
//                 {/* ABOUT SECTION */}
//                 <section id="about" className="py-24">
//                     <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//                             <div className="flex justify-center">
//                                 <div className="rounded-t-full rounded-b-xl border-2 border-yellow-500/30 bg-orange-100 p-4 shadow-2xl">
//                                     <div className="overflow-hidden rounded-t-full rounded-b-lg">
//                                         <img
//                                             src="/images/nitya-ati/Kashi Vishvnath.jpg"
//                                             alt="Path Recitation at Temple"
//                                             className="h-auto w-full transform object-cover transition-transform duration-500 hover:scale-110"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-center lg:text-left">
//                                 <h2 className="font-serif text-4xl leading-tight font-bold text-gray-800 md:text-5xl">The Power of Sacred Recitation</h2>
//                                 <p className="mt-4 text-lg text-orange-600">
//                                     Path or Recitation involves reading or chanting sacred scriptures such as *Ramayana*, *Durga Saptashati*, *Sundar Kand*, or *Bhagavad Gita* with deep devotion and
//                                     focus. Each verse radiates divine vibrations that cleanse the aura and bless the surroundings.
//                                 </p>
//                                 <div className="mx-auto my-8 h-px w-2/3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent lg:mx-0"></div>
//                                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">📜</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Sacred Scriptures</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Reciting holy texts brings divine energy into the space and strengthens devotion and wisdom.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🕉️</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Vedic Vibrations</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Each mantra carries healing vibrations that align mind and body with universal consciousness.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🪔</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Purification</h3>
//                                         <p className="mt-2 text-sm text-gray-600">The Path cleanses negative energies and invokes positivity, peace, and divine protection.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🌼</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Spiritual Awakening</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Through recitation, devotees experience connection with the divine and inner tranquility.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* BENEFITS SECTION */}
//                 <section id="benefits" className="overflow-hidden py-24">
//                     <div className="container mx-auto px-6">
//                         <div className="mx-auto mb-16 max-w-3xl text-center">
//                             <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Embrace Peace through Path</h2>
//                             <p className="mt-4 text-lg text-orange-600">
//                                 Path | Recitation is not just reading — it’s divine remembrance. Every verse radiates spiritual light that purifies thought and destiny.
//                             </p>
//                         </div>
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="flex w-full justify-center">
//                                 <img src="/images/nitya-ati/medi.jpg" alt="Recitation for peace" className="max-h-[600px] rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute top-0 bottom-0 left-4">
//                                     <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-yellow-300">
//                                         <line x1="1" y1="0" x2="1" y2="100%" strokeWidth="2" />
//                                     </svg>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {[
//                                         { title: "Spiritual Purity", desc: "Reciting sacred texts removes karmic burdens and uplifts the spirit." },
//                                         { title: "Peace & Harmony", desc: "The vibrations bring mental clarity and emotional balance." },
//                                         { title: "Positive Aura", desc: "Creates divine protection and fills surroundings with auspicious energy." },
//                                         { title: "Devotional Strength", desc: "Enhances focus, faith, and connection with the divine." },
//                                         { title: "Blessings of Deities", desc: "Invokes prosperity, protection, and grace in every aspect of life." },
//                                     ].map((b, i) => (
//                                         <div key={i} className="group relative pl-12">
//                                             <div className="absolute top-0 left-0 flex h-full items-center">
//                                                 <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
//                                                 <div className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
//                                                     📜
//                                                 </div>
//                                             </div>
//                                             <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">{b.title}</h3>
//                                             <p className="mt-1 text-gray-600">{b.desc}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* PARTICIPATION SECTION */}
//                 <section id="participate" className="py-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')" }}>
//                     <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="hidden lg:block">
//                                 <img src="/images/nitya-ati/download.jpg" alt="Path Recitation Event" className="h-full w-full rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div>
//                                 <div className="mb-12 text-center lg:text-left">
//                                     <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Join the Path Recitation</h2>
//                                     <p className="mt-4 text-lg text-orange-600">Become part of a divine recitation ceremony and spread spiritual vibrations of peace and devotion.</p>
//                                 </div>
//                                 <div className="space-y-8">
//                                     {[
//                                         { step: "01", title: "Select Your Path", desc: "Choose the scripture you wish to be recited — Ramayana, Gita, or Durga Saptashati." },
//                                         { step: "02", title: "Register for the Event", desc: "Provide your details for inclusion in the sacred Path ceremony." },
//                                         { step: "03", title: "Attend or Watch Live", desc: "Participate in the recitation or join our online live stream." },
//                                         { step: "04", title: "Receive Blessings", desc: "Experience purity, peace, and divine grace through the ceremony." },
//                                     ].map((p, i) => (
//                                         <div key={i} className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
//                                             <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
//                                                 {p.step}
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">{p.title}</h3>
//                                                 <p className="mt-1 text-gray-600">{p.desc}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-12 text-center lg:text-left">
//                                     <a
//                                         href="#register"
//                                         className="inline-block transform rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-orange-400/50"
//                                     >
//                                         Participate Now
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* FAQ SECTION */}
//                 <section id="faq" className="py-24">
//                     <div className="container mx-auto max-w-4xl px-6">
//                         <div className="mb-16 text-center">
//                             <h2 className="text-charcoal font-serif text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
//                         </div>
//                         <div className="space-y-4">
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     What is Path or Recitation?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-orange-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Path or Recitation means reading or chanting divine scriptures aloud with faith and devotion. It spreads positive energy and divine vibrations.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Can I participate from home?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-orange-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">Yes, you can join online through our live streaming and offer prayers virtually during the ceremony.</p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Which texts can be recited?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-orange-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Commonly recited scriptures include *Sundar Kand*, *Durga Saptashati*, *Bhagavad Gita*, and *Vishnu Sahasranama*, depending on the occasion or deity.
//                                 </p>
//                             </details>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     )
// }

// export default PathRecitation

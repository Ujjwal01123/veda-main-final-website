"use client"

// import React, { useEffect } from "react"
// import { Link } from "react-router-dom"
// import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import {} from "../a"
// C:\Users\ASUS\OneDrive\Desktop\working\client\client\public\images\puja-in-kashi
// public\images\puja-in-kashi

const pujas = [
    {
        title: "Rudrabhishek Puja",
        description: "Performed to please Lord Shiva and remove all negativities.",
        imgSrc: "/images/puja-in-kashi/Rudrabhishek.jpeg",
        linkTo: "/rudrabhishek",
    },
    {
        title: "Mahamrityunjaya Puja",
        description: "A life-protecting puja invoking Lord Shiva’s blessings for longevity.",
        imgSrc: "/images/puja-in-kashi/Mahamritunjay.jpeg",
        linkTo: "/mahamrityunjaya",
    },
    {
        title: "Ganga Aarti",
        description: "A divine evening ritual performed on the ghats of River Ganga.",
        imgSrc: "/images/puja-in-kashi/Ganga.jpeg",
        linkTo: "/ganga-aarti",
    },
    {
        title: "Tripindi Shradh",
        description: "A ritual for ancestors to attain peace and moksha.",
        imgSrc: "/images/puja-in-kashi/shradh.jpeg",
        linkTo: "/tripindi-shradh",
    },
    {
        title: "Navgraha Shanti Puja",
        description: "Performed to balance planetary energies and remove doshas.",
        imgSrc: "/images/puja-in-kashi/Navgrah.jpeg",
        linkTo: "/navgraha-shanti",
    },
    {
        title: "Kashi Anna Daan",
        description: "Offering food to the needy, considered the highest virtue in Kashi.",
        imgSrc: "/images/puja-in-kashi/Anna dan.jpeg",
        linkTo: "/kashi-anna-daan",
    },
]

// Reusable Puja Card Component
const PujaCard = ({ title, description, imgSrc, linkTo }) => (
    <div className="group glass transform rounded-2xl bg-white/70 p-6 shadow-xl transition duration-300 hover:scale-105" data-aos="zoom-in-up" data-aos-duration="800">
        <Link href={linkTo} className="cursor-pointer">
            <img src={imgSrc} alt={title} className="mb-4 h-52 w-full rounded-xl object-cover" />
            <h3 className="text-2xl font-semibold text-orange-700 group-hover:text-yellow-800">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
        </Link>
        <Link
            href={linkTo}
            className="relative mt-6 inline-block overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-2 font-semibold text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_rgba(255,165,0,0.7)]"
        >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"></span>
        </Link>
    </div>
)

const Kashi = () => {
    const router = useRouter()
    useEffect(() => {
        AOS.init({ once: true, duration: 1000 })
    }, [])

    //
    const [kashis, setKashis] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchKashis = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const kashiData = res.data.filter((item) => item.category.name === "Puja in Kashi(Kashi Khand)")
                console.log("Fetched nitya data:", kashiData)
                setKashis(kashiData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchKashis()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")

    return (
        // FIX: Main container handles the scrolling, preventing double scrollbars.
        <div className="bg-gradient-to-br from-yellow-50 to-white text-gray-800">
            {/* Hero Section */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden text-center">
                {/* FIX: Video Background with correct path and z-index */}
                {/* <video autoPlay muted loop playsInline className="absolute top-0 left-0 h-full w-full object-cover">
                    <source src="/images/puja-in-kashi/KPV-1.mp4" type="video/mp4" />
                </video> */}
                <img src="/images/puja-in-kashi/kpv1.jpg" className="absolute top-0 left-0 h-full w-full object-cover" alt="Mandala" />

                {/* <video autoPlay muted loop playsInline className="absolute top-0 left-0 z-0 h-full w-full animate-[fadeIn_1.5s_ease-in-out_forwards] object-cover opacity-0">
                    <source src="/images/puja-in-kashi/KPV-1.mp4" type="video/mp4" />
                </video> */}

                <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-t from-yellow-600/20 via-transparent to-transparent"></div>
                <img src="/images/puja-in-kashi/Mandala-bg.png" className="absolute top-10 left-1/2 z-10 w-64 -translate-x-1/2 animate-[spin-slow_60s_linear_infinite] opacity-10" alt="Mandala" />
                <div className="absolute inset-0 z-10 bg-black/60"></div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-3xl px-6 ">
                    <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl" data-aos="fade-up" data-aos-duration="1400">
                        Experience the Divine Rituals With the <br />
                        <span className="animate-[shine_3s_linear_infinite] bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">Specific Pujas of Kashi</span>
                    </h1>
                    <p className="mt-4 text-lg font-semibold text-gray-300" data-aos="fade-right" data-aos-duration="1400">
                        यत्र भक्तिः तत्र देवता।
                    </p>
                    <a
                        href="#pujas"
                        className="relative mt-6 inline-block overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-3 font-semibold text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(255,165,0,0.6)]"
                        data-aos="fade-down"
                        data-aos-duration="1400"
                    >
                        <span className="relative z-10">Book Your Specific Pooja</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"></span>
                    </a>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 px-6 py-24 md:px-20">
                <div className="absolute inset-0 bg-[url('/images/mandala-bg.svg')] bg-center bg-no-repeat opacity-5"></div>
                <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row" data-aos="fade-up">
                    <div className="md:w-1/2" data-aos="fade-right" data-aos-duration="1200">
                        <img src="/images/puja-in-kashi/ghat.jpeg" alt="Kashi Ghat" className="rounded-3xl shadow-2xl transition-transform duration-[2500ms] will-change-transform hover:scale-105" />
                    </div>
                    <div className="border-l-4 border-yellow-600 pl-6 text-center md:w-1/2 md:text-left">
                        <h2 className="mb-4 text-5xl font-extrabold text-yellow-800">About Kashi</h2>
                        <p className="mb-6 text-lg leading-relaxed text-gray-700">
                            Kashi (Varanasi) — the eternal city of light — stands as one of the world’s oldest living cities and the spiritual heart of India. Every ritual, every mantra chanted here
                            echoes through ages, offering liberation from the cycle of birth and karma.
                        </p>
                        <p className="mb-6 text-lg leading-relaxed text-gray-700">
                            Situated along the sacred Ganga, Kashi’s ghats witness countless divine ceremonies daily. From
                            <span className="font-semibold text-orange-600"> Rudrabhishek</span> to <span className="font-semibold text-orange-600">Ganga Aarti</span>, every puja holds a promise — of
                            peace, purity, and prosperity.
                        </p>
                        <div className="mb-6 rounded-xl bg-white/60 px-5 py-3 text-yellow-700 italic shadow-md">
                            <p>“काशी विश्वनाथ की नगरी – जहाँ हर श्वास में शिव बसते हैं।”</p>
                            <p className="mt-1 text-sm text-gray-600">— The City Where Every Breath is a Prayer</p>
                        </div>
                        <div className="mb-8 flex justify-center gap-8 md:justify-start">
                            <div>
                                <h3 className="text-3xl font-bold text-orange-600">10,000+</h3>
                                <p className="text-gray-700">Pujas Performed</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-orange-600">5,000+</h3>
                                <p className="text-gray-700">Devotees Served</p>
                            </div>
                        </div>
                        <button className="relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-3 font-semibold text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(255,165,0,0.6)]">
                            <span className="relative z-10">Know More</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"></span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Puja List Section */}
            {/* cards */}
            <section className="bg-base-50 py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Kashi Puja You Can Book</h2>
                    {/* <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p> */}
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {kashis?.map((item) => (
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
            {/* <section id="pujas" className="bg-gradient-to-br from-yellow-50 to-white py-20" data-aos="fade-up">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="mb-10 text-4xl font-bold text-yellow-800">Kashi Specific Pujas</h2>
                    <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
                        {pujas.map((puja, index) => (
                            <PujaCard key={index} title={puja.title} description={puja.description} imgSrc={puja.imgSrc} linkTo={puja.linkTo} />
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default Kashi

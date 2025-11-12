"use client"

import React, { useState, useEffect, useRef } from "react"
import AOS from "aos"
import "aos/dist/aos.css" // AOS CSS को इम्पोर्ट करें
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

const Carddetails = () => {
    const router = useRouter()
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api"
    const IMG_BASE_URL = apiUrl.replace("/api", "") // ✅ remove /api for images

    const { id } = useParams()
    const [pujaData, setPujaData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPuja = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/${id}`)
                setPujaData(res?.data)
                if (res.data?.image) {
                    const imageUrl = res.data.image.startsWith("http") ? res.data.image : `${IMG_BASE_URL}${res.data.image}`
                    setMainDisplay({ type: "image", src: imageUrl })
                }
            } catch (error) {
                console.error("Error fetching puja:", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchPuja()
    }, [id, apiUrl, IMG_BASE_URL])

    // State Management
    const [mainDisplay, setMainDisplay] = useState({ type: "image", src: "/images/Bagalamukhi Puja.jpg" })
    const [isPopupVisible, setPopupVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [isFavorite, setIsFavorite] = useState(false)
    const [countdown, setCountdown] = useState("")
    const [formErrors, setFormErrors] = useState([])
    //

    // Refs for uncontrolled form inputs and carousel
    const nameRef = useRef(null)
    const phoneRef = useRef(null)
    const emailRef = useRef(null)
    const carouselRef = useRef(null)

    // --- Effects ---

    // Initialize AOS library
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        })
    }, [])

    // Countdown timer effect
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const endDate = new Date("Sep 20, 2025 23:59:59").getTime()
            const now = new Date().getTime()
            const diff = endDate - now

            if (diff < 0) {
                setCountdown("Offer ended")
                clearInterval(countdownInterval)
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const secs = Math.floor((diff % (1000 * 60)) / 1000)
            setCountdown(`${days}d ${hours}h ${mins}m ${secs}s left`)
        }, 1000)

        return () => clearInterval(countdownInterval) // Cleanup on component unmount
    }, [])

    // Toast message timer
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage("")
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [toastMessage])

    // Carousel auto-scroll effect
    useEffect(() => {
        const scrollAmount = 300
        let autoScroll

        const startAutoScroll = () => {
            autoScroll = setInterval(() => {
                if (carouselRef.current) {
                    if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
                        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
                    } else {
                        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
                    }
                }
            }, 3000)
        }

        const stopAutoScroll = () => {
            clearInterval(autoScroll)
        }

        const carouselElement = carouselRef.current
        if (carouselElement) {
            carouselElement.addEventListener("mouseenter", stopAutoScroll)
            carouselElement.addEventListener("mouseleave", startAutoScroll)
        }

        startAutoScroll()

        return () => {
            // Cleanup
            clearInterval(autoScroll)
            if (carouselElement) {
                carouselElement.removeEventListener("mouseenter", stopAutoScroll)
                carouselElement.removeEventListener("mouseleave", startAutoScroll)
            }
        }
    }, [])

    // --- Handlers ---

    // Gallery thumbnail click handler
    const handleThumbClick = (type, src) => {
        setMainDisplay({ type, src })
    }

    // Copy link handler
    const copyLink = () => {
        const pageLink = window.location.href
        navigator.clipboard.writeText(pageLink).then(() => {
            setToastMessage("Link copied to clipboard")
        })
    }

    // Favorite button handler
    const handleFavoriteClick = () => {
        const newFavStatus = !isFavorite
        setIsFavorite(newFavStatus)
        setToastMessage(newFavStatus ? "Added to favorites" : "Removed from favorites")
    }

    // Carousel navigation
    const handleCarouselNav = (direction) => {
        const scrollAmount = 300
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" })
        }
    }

    // Booking form validation handler
    const handleBooking = () => {
        const errors = []
        const name = nameRef.current.value.trim()
        const phone = phoneRef.current.value.trim()
        const email = emailRef.current.value.trim()

        if (!name) errors.push("fName")
        if (!phone) errors.push("fPhone")
        if (!email) errors.push("fEmail")

        setFormErrors(errors)

        if (errors.length > 0) {
            setToastMessage("Please fill Name, Phone & Email")
            return
        }

        setToastMessage("✅ Booking details received")
        // Here you would typically send the data to a server
    }

    const RashiOptions = [
        "Aries (Mesh)",
        "Taurus (Vrishabh)",
        "Gemini (Mithun)",
        "Cancer (Kark)",
        "Leo (Simha)",
        "Virgo (Kanya)",
        "Libra (Tula)",
        "Scorpio (Vrishchik)",
        "Sagittarius (Dhanu)",
        "Capricorn (Makkar)",
        "Aquarius (Kumbh)",
        "Pisces (Meen)",
    ]
    const NakshatraOptions = [
        "Ashwini",
        "Bharani",
        "Krittika",
        "Rohini",
        "Mrigashira",
        "Ardra",
        "Punarvashu",
        "Pushya",
        "Ashlesha",
        "Magha",
        "Purva Phalguni",
        "Uttara Phalguni",
        "Hasta",
        "Chitra",
        "Swati",
        "Vishakha",
        "Anuradha",
        "Jyeshtha",
        "Mula",
        "Purva Ashadha",
        "Uttara Ashadha",
        "Shravana",
        "Dhanishtha",
        "Shatabhisha",
        "Purva Bhadrapada",
        "Uttar Bhadrapada",
        "Revati",
    ]

    const imgUrl = apiUrl.replace("/api", "")

    const [relatedPujas, setRelatedPujas] = useState([])
    // const relatedPujas = [
    //     { name: "Bagalmukhi Puja", price: "₹1150", img: "images/Bagalamukhi Puja.jpg" },
    //     { name: "Sawan Special Vedic Yagya 2025 – In Kashi", price: "📆 Saturday, 9 August 2025", img: "/images/Sawan Special Vedic Yagya 2025 – In Kashi.jpg" },
    //     { name: "Adi Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Adi Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Dhana Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "images/Dhana Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Dhanya Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Dhanya Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Gaja Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Gaja Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Santana Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Santana Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Dhairya Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Dhairya Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Vijaya Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Vijaya Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Vidya Lakshmi Puja (Ashta-Lakshmi)", price: "₹5100.00", img: "/images/Vidya Lakshmi Puja (Ashta-Lakshmi).jpg" },
    //     { name: "Surya Puja", price: "₹5100.00", img: "/images/Surya Puja.jpg" },
    // ]
    useEffect(() => {
        if (!pujaData?.category?.name) return

        const fetchPujas = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pujas/all`)
                const allPujas = response.data // ✅ use .data
                // console.log("All Pujas:", allPujas)

                // ✅ Filter pujas that share the same category name
                const filtered = allPujas.filter((p) => p.category?.name === pujaData.category.name && p._id !== pujaData._id)

                // ✅ Format data for UI
                const formatted = filtered.map((p) => ({
                    id: p._id,
                    name: p.title,
                    price: p.price ? `₹${p.price}` : "—",
                    img: p.image ? `${imgUrl}${p.image}` : "localhost:5000/images/default-puja.jpg",
                }))
                // console.log("Related Pujas:", formatted)

                setRelatedPujas(formatted)
            } catch (error) {
                console.error("Error fetching related pujas:", error)
            }
        }

        fetchPujas()
    }, [pujaData?.category?.name, pujaData?._id])

    // console.log(pujaData)
    return (
        <>
            {/* Inline styles from the original <style> tag */}
            <style>{`
        .gold-text { background: linear-gradient(90deg,#f59e0b,#d97706); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .glass { background: rgba(255,255,255,.85); backdrop-filter: blur(12px); }
        .soft-border { border: 1px solid rgba(250,204,21,.35); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlide { from {opacity:0; transform: translateY(10px)} to {opacity:1; transform: translateY(0)} }
        .fadeSlide { animation: fadeSlide .5s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 text-gray-800">
                <div className="pointer-events-none fixed -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-300/40 blur-3xl"></div>
                <div className="pointer-events-none fixed -right-24 -bottom-24 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl"></div>

                <nav className="mx-auto flex max-w-7xl items-center gap-2 px-6 pt-6 text-sm text-gray-600">
                    <a className="font-medium transition hover:text-yellow-700" href="/">
                        Home
                    </a>
                    <span>›</span>
                    <a className="font-medium transition hover:text-yellow-700" href="/yagya-puja">
                        Puja
                    </a>
                    <span>›</span>
                    <a className="font-medium transition hover:text-yellow-700" href="/yagya-puja">
                        Yagya Puja
                    </a>
                    <span>›</span>
                    <span className="font-semibold text-red-600">{pujaData?.title}</span>
                </nav>

                {/* Main Section */}
                <section className="mx-auto grid max-w-7xl gap-8 p-6 md:p-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div id="mainDisplay" className="group relative aspect-[6/5] h-[750px] w-full overflow-hidden bg-transparent">
                            {mainDisplay.type === "image" ? (
                                <img src={mainDisplay.src} alt="Product" className="h-full w-full object-contain object-top transition duration-700 group-hover:scale-[1.03]" data-aos="zoom-in" />
                            ) : (
                                <video key={mainDisplay.src} autoPlay loop muted playsInline className="h-full w-full rounded-2xl object-cover" data-aos="zoom-in">
                                    <source src={mainDisplay.src} type="video/mp4" />
                                </video>
                            )}
                        </div>

                        {/* Thumbnails row
                        <div id="thumbRow" className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-7" data-aos="zoom-in">
                            <img
                                onClick={() => handleThumbClick("image", "/images/Bagalamukhi Puja.jpg")}
                                src="/images/Bagalamukhi Puja.jpg"
                                className="aspect-square w-full cursor-pointer rounded-xl border-2 border-transparent object-cover transition hover:border-yellow-600"
                                alt="thumbnail"
                            />
                            <img
                                onClick={() => handleThumbClick("image", "/images/A3.jpg")}
                                src="/images/A3.jpg"
                                className="aspect-square w-full cursor-pointer rounded-xl border-2 border-transparent object-cover transition hover:border-yellow-600"
                                alt="thumbnail"
                            />
                            <img
                                onClick={() => handleThumbClick("image", "/images/A4.jpg")}
                                src="/images/A4.jpg"
                                className="aspect-square w-full cursor-pointer rounded-xl border-2 border-transparent object-cover transition hover:border-yellow-600"
                                alt="thumbnail"
                            />
                            <img
                                onClick={() => handleThumbClick("image", "/images/Adi Lakshmi Puja (Ashta-Lakshmi).jpg")}
                                src="/images/Adi Lakshmi Puja (Ashta-Lakshmi).jpg"
                                className="aspect-square w-full cursor-pointer rounded-xl border-2 border-transparent object-cover transition hover:border-yellow-600"
                                alt="thumbnail"
                            />
                            <img
                                onClick={() => handleThumbClick("image", "/images/arpit.jpg")}
                                src="/images/arpit.jpg"
                                className="aspect-square w-full cursor-pointer rounded-xl border-2 border-transparent object-cover transition hover:border-yellow-600"
                                alt="thumbnail"
                            />
                        </div> */}
                    </div>

                    {/* Product Details Card */}
                    <div className="glass soft-border fadeSlide rounded-2xl p-6 md:p-8">
                        <div className="glass flex items-start justify-between gap-4 rounded-2xl p-6" data-aos="fade-left">
                            <div>
                                <p className="text-xs tracking-wide text-gray-500 uppercase">Yagya Puja</p>
                                <h1 className="gold-text mt-1 mb-6 text-3xl font-extrabold md:text-4xl" data-aos="fade-down">
                                    {pujaData?.title}
                                </h1>
                                {/* <div className="mt-2 flex items-center gap-3">
                                    <div className="flex items-center text-yellow-600">★★★★★</div>
                                    <span className="text-xs text-gray-500">(124 reviews)</span>
                                </div> */}
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleFavoriteClick}
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-red-50 ${isFavorite ? "text-red-600" : "hover:text-red-600"}`}
                                >
                                    ❤️
                                </button>
                                <button
                                    onClick={() => setPopupVisible(true)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-yellow-50 hover:text-yellow-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                        <path d="M18 8a3 3 0 1 0-2.82-4H14a2 2 0 0 0-2 2v7.23l-2.4-1.2a3 3 0 1 0-.9 1.79l3.74 1.87A2 2 0 0 0 15 15V6h.18A3 3 0 0 0 18 8Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 flex items-end gap-3">
                            <span className="text-3xl font-bold text-red-600">₹{pujaData?.price}</span>
                            {/* <span className="text-sm text-gray-400 line-through">₹1,599</span> */}
                            {/* <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">Save 28%</span> */}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-3 text-yellow-800 shadow">
                            <div className="font-semibold">🎉 Offer: 25/08/25 – 20/09/25</div>
                            <div id="countdown" className="text-xs font-bold">
                                {countdown}
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                            <div className="rounded-xl border bg-white p-3 hover:scale-105 hover:bg-yellow-500 hover:shadow-md">✅ Certified Priests</div>
                            <div className="rounded-xl border bg-white p-3 hover:scale-105 hover:bg-yellow-500 hover:shadow-md">🕉️ Vedic Rituals</div>
                            <div className="p rounded-xl border bg-white">🚚 Prasad Delivery</div>
                        </div>

                        {/* Form */}
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={nameRef}
                                        id="fName"
                                        type="text"
                                        placeholder="Enter Name"
                                        className={`mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${formErrors.includes("fName") ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={phoneRef}
                                        id="fPhone"
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        className={`mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${formErrors.includes("fPhone") ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={emailRef}
                                        id="fEmail"
                                        type="email"
                                        placeholder="Enter your email"
                                        className={`mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${formErrors.includes("fEmail") ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Gotra (If you know)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Gotra"
                                        className="mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Rashi</label>
                                    <select className="mt-1 w-full rounded-lg border p-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500">
                                        <option>--Choose--</option>
                                        {RashiOptions.map((rashi) => (
                                            <option key={rashi}>{rashi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Nakshatra</label>
                                    <select className="mt-1 w-full rounded-lg border p-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500">
                                        <option>--Choose--</option>
                                        {NakshatraOptions.map((nakshatra) => (
                                            <option key={nakshatra}>{nakshatra}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium">
                                    Choose Puja Date <span className="text-red-500">*</span>
                                </label>
                                <input type="date" className="mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Choose Puja Time <span className="text-red-500">*</span>
                                </label>
                                <input type="time" className="mt-1 w-full rounded-lg border px-4 py-2.5 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Recommended Muhurat</label>
                                <input type="text" value="28 Sept 2025, 10:30 AM" readOnly className="mt-1 w-full rounded-lg border bg-gray-100 px-4 py-2.5 text-gray-600 shadow-sm" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" id="consultOpt" className="h-4 w-4 rounded border-gray-300 text-yellow-600" />
                            <label htmlFor="consultOpt" className="text-sm text-gray-700">
                                Consult with Pandit ji for best date & time
                            </label>
                        </div>

                        <button
                            onClick={handleBooking}
                            className="hover:shadow-mdc mt-6 w-full transform rounded-xl bg-yellow-600 py-3.5 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-yellow-700 hover:shadow-amber-300/40 active:scale-[.98]"
                        >
                            {" "}
                            Book Now
                        </button>
                    </div>
                </section>

                {/* Info Tabs */}
                <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8">
                    <div className="glass soft-border rounded-2xl p-6" data-aos="fade-left">
                        <h3 className="gold-text mb-3 text-center text-xl font-extrabold">About the Puja</h3>
                        <div dangerouslySetInnerHTML={{ __html: pujaData?.description }} />

                        {/* <h5 className="text-lg font-semibold">Bagalamukhi Puja (Das Mahavidyas) </h5>
                        <p className="text-sm leading-7">
                            Bagalamukhi, one of the Das Mahavidyas, is the goddess of power, victory, and protection. She is known to paralyze the negativity of enemies and safeguard devotees. Worship
                            is considered highly auspicious for justice and triumph in complex situations.
                        </p>
                        <h5 className="text-lg font-semibold">Significance and Importance of Bagalamukhi Puja</h5>
                        <ul className="list-inside list-disc space-y-2 text-sm">
                            <li>
                                Neutralization of Enemies:- The puja is particularly powerful for those facing challenges from adversaries, whether in the form of legal disputes, rivalries, or
                                jealousy. It neutralizes the malefic intents of enemies.
                            </li>
                            <li>Speech and Communication:- Bagalamukhi is often invoked to improve communication and to silence harmful gossip or slander against the devotee.</li>
                            <li>Protection from Negativity:- The puja is believed to shield the devotee from evil eyes, curses, and negative energies.</li>
                            <li>Justice and Resolution:- It is highly recommended for individuals involved in court cases or any situation requiring justice to prevail.</li>
                            <li>Spiritual Empowerment:- Practicing Bagalamukhi worship fosters inner strength, courage, and confidence.</li>
                        </ul>
                        <blockquote className="mt-4 border-l-4 border-yellow-500 pl-4 font-semibold text-red-600 italic">
                            ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिव्हां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा॥
                        </blockquote> */}
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-lg font-extrabold">Benefits</h3>
                            {/* <div dangerouslySetInnerHTML={{ __html: pujaData?.benefits?.details }} /> */}
                            {/* ✅ Render HTML from each benefit */}
                            {pujaData?.benefits && pujaData.benefits.length > 0 ? (
                                pujaData.benefits.map((benefit, index) => (
                                    <div key={benefit._id || index} className="prose prose-yellow max-w-none" dangerouslySetInnerHTML={{ __html: benefit.detail }} />
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500">No benefits available.</p>
                            )}
                            {/* <ul className="list-inside list-disc space-y-2 text-sm">
                                {pujaData?.benefits && pujaData.benefits.length > 0 ? (
                                    pujaData.benefits.map((benefit, index) => (
                                        <li key={benefit._id || index} className="mt-4 font-medium">
                                            <strong>{benefit.title}:</strong> {benefit.detail}
                                        </li>
                                    ))
                                ) : (
                                    <li className="mt-4 font-medium">No benefits available.</li>
                                )}
                            </ul> */}

                            {/* <ul className="list-inside list-disc space-y-2 text-sm">
                                <li className="mt-4 font-medium">Victory Over Obstacles: The puja helps in overcoming hurdles in personal and professional life.</li>
                                <li className="mt-4 font-medium">Resolution of Disputes: It aids in resolving misunderstandings and conflicts, leading to peaceful outcomes.</li>
                                <li className="mt-4 font-medium">
                                    Enhanced Focus: Devotees experience an increase in mental clarity and concentration, which is beneficial for making decisions and achieving goals.
                                </li>
                                <li className="mt-4 font-medium">Protection: Offers divine protection from unforeseen dangers and malicious intentions.</li>
                                <li className="mt-4 font-medium">
                                    Success in Legal and Financial Matters: Bagalamukhi puja is particularly effective for success in litigation and stabilizing financial situations.
                                </li>
                                <li className="mt-4 font-medium">Spiritual Growth: It helps in developing a balanced mindset and spiritual detachment, leading to personal transformation. </li>
                            </ul> */}
                        </div>
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-lg font-extrabold">FAQ</h3>
                            {/* ✅ Render HTML from each FAQ */}
                            {pujaData?.faqs && pujaData.faqs.length > 0 ? (
                                pujaData.faqs.map((faq, index) => <div key={faq._id || index} className="prose prose-yellow max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />)
                            ) : (
                                <p className="text-center text-sm text-gray-500">No FAQs available.</p>
                            )}
                            {/* {pujaData?.faqs && pujaData.faqs.length > 0 ? (
                                pujaData.faqs.map((faq, index) => (
                                    <details key={faq._id || index} className="mb-2 rounded-lg border bg-white/70 p-3">
                                        <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                                        <p className="mt-2 text-sm">{faq.answer}</p>
                                    </details>
                                ))
                            ) : (
                                <p>No FAQs available.</p>
                            )} */}
                            {/* <details className="mb-2 rounded-lg border bg-white/70 p-3">
                                <summary className="cursor-pointer font-semibold">Who should perform Bagalamukhi Puja? </summary>
                                <p className="mt-2 text-sm">
                                    Those facing persistent struggles with enemies, legal issues, or negative influences should perform this puja. It is also beneficial for anyone seeking justice,
                                    protection, and empowerment.
                                </p>
                            </details>
                            <details className="mb-2 rounded-lg border bg-white/70 p-3">
                                <summary className="cursor-pointer font-semibold">What are the key rituals of the puja?</summary>
                                <p className="mt-2 text-sm">
                                    The puja involves chanting the Bagalamukhi mantra, performing havan (fire ritual), and offering yellow flowers, turmeric, and yellow sweets, as yellow is the
                                    goddess's favorite color.
                                </p>
                            </details> */}
                            {/* ... other FAQs ... */}
                        </div>
                    </div>
                    {/* ... other info sections ... */}
                </section>

                {/* Related Carousel Section */}
                <section className="relative mx-auto mt-12 max-w-7xl px-6">
                    <h2 className="gold-text mb-4 text-center text-3xl font-extrabold" data-aos="fade-right">
                        You May Also Like
                    </h2>

                    {/* ◀ Left Scroll Button */}
                    <button onClick={() => handleCarouselNav(-1)} className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-yellow-500 px-3 py-2 text-white shadow hover:bg-yellow-600">
                        ◀
                    </button>

                    {/* ✅ Carousel Section */}
                    <div ref={carouselRef} id="carousel" className="scrollbar-hide flex space-x-6 overflow-x-auto scroll-smooth pb-4" data-aos="fade-up">
                        {relatedPujas.length > 0 ? (
                            relatedPujas.map((puja, index) => (
                                <div key={index} className="min-w-[250px] rounded-xl border bg-white p-3 text-center shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                    <img src={puja.img} alt={puja.name} className="mx-auto h-64 w-64 rounded-lg object-cover transition-transform duration-500 hover:scale-110" />
                                    <p className="mt-2 font-bold">{puja.name}</p>
                                    <p className="font-semibold text-red-600">{puja.price}</p>
                                    <button
                                        // onClick={`/yagya-puja/${puja.id}`} // ✅ navigate to details
                                        onClick={() => router.push(`/yagya-puja/${puja.id}`)} // ✅ Next.js navigation
                                        className="hover:shadow-mdc mt-2 transform rounded-lg bg-yellow-500 px-4 py-1 text-white transition duration-300 hover:scale-105 hover:bg-yellow-700"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="mx-auto text-center text-gray-500">No related pujas found.</p>
                        )}
                    </div>

                    {/* ▶ Right Scroll Button */}
                    <button onClick={() => handleCarouselNav(1)} className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-yellow-500 px-3 py-2 text-white shadow hover:bg-yellow-600">
                        ▶
                    </button>
                </section>

                {/* Share Popup */}
                {isPopupVisible && (
                    <div onClick={() => setPopupVisible(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div onClick={(e) => e.stopPropagation()} className="w-96 animate-[fadeSlide_.4s_ease] rounded-2xl border-t-4 border-yellow-500 bg-white p-6 shadow-2xl">
                            <h2 className="mb-3 text-xl font-bold text-yellow-700">Share this Puja 🙏</h2>
                            <div className="mb-4 flex items-center">
                                <input type="text" value={window.location.href} readOnly className="flex-1 rounded-l-lg border bg-gray-100 px-3 py-2 text-sm" />
                                <button onClick={copyLink} className="rounded-r-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700">
                                    Copy
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                                    className="rounded-lg border border-green-500 py-2 text-green-600 transition hover:bg-green-500 hover:text-white"
                                >
                                    WhatsApp
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                    className="rounded-lg border border-blue-500 py-2 text-blue-600 transition hover:bg-blue-500 hover:text-white"
                                >
                                    Facebook
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.instagram.com/"
                                    className="rounded-lg border border-pink-500 py-2 text-pink-600 transition hover:bg-pink-500 hover:text-white"
                                >
                                    Instagram
                                </a>
                            </div>
                            <button onClick={() => setPopupVisible(false)} className="mt-5 w-full rounded-lg bg-gray-200 py-2.5 font-semibold text-gray-800 hover:bg-gray-300">
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toastMessage && <div className="animate-fade-in-up fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-xl">{toastMessage}</div>}
            </div>
        </>
    )
}

export default Carddetails

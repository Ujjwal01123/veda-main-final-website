"use client"

import React, { useState, useEffect, useRef } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { useParams } from "next/navigation"
import axios from "axios"
import { useRouter } from "next/navigation"

const Upcoming = () => {
    const { id } = useParams()
    const router = useRouter()
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api"
    const IMG_BASE_URL = apiUrl.replace("/api", "")
    // State for all dynamic parts of the page
    const [mainDisplay, setMainDisplay] = useState({
        type: "img",
        src: "images/main iamge.jpg",
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [participantCount, setParticipantCount] = useState(1)
    const [isShareOpen, setIsShareOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [isFavorite, setIsFavorite] = useState(false)
    const [countdown, setCountdown] = useState("")
    const [gotra, setGotra] = useState("")
    const [isGotraDisabled, setIsGotraDisabled] = useState(false)
    const [showPrasad, setShowPrasad] = useState(false)
    const [pujaData, setPujaData] = useState(null)
    const [relatedPujas, setRelatedPujas] = useState([])

    const carouselRef = useRef(null)
    const pageLinkRef = useRef(null)

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

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        })
    }, [])

    // Countdown Timer Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const end = new Date("Nov 20, 2025 23:59:59").getTime()
            const now = new Date().getTime()
            const diff = end - now

            if (diff < 0) {
                setCountdown("Offer ended")
                clearInterval(interval)
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const secs = Math.floor((diff % (1000 * 60)) / 1000)

            setCountdown(`${days}d ${hours}h ${mins}m ${secs}s left`)
        }, 1000)

        return () => clearInterval(interval) // Cleanup interval on unmount
    }, [])

    // Carousel Auto-scroll Logic
    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        let autoScroll
        const scrollAmount = 300

        const startAutoScroll = () => {
            autoScroll = setInterval(() => {
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
                    carousel.scrollTo({ left: 0, behavior: "smooth" })
                } else {
                    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" })
                }
            }, 3000)
        }

        const stopAutoScroll = () => {
            clearInterval(autoScroll)
        }

        carousel.addEventListener("mouseenter", stopAutoScroll)
        carousel.addEventListener("mouseleave", startAutoScroll)
        startAutoScroll()

        return () => {
            // Cleanup listeners and interval on unmount
            carousel.removeEventListener("mouseenter", stopAutoScroll)
            carousel.removeEventListener("mouseleave", startAutoScroll)
            clearInterval(autoScroll)
        }
    }, [])

    // Toast message auto-hide logic
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage("")
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [toastMessage])

    // --- Event Handlers ---

    // Gallery thumbnail click
    const handleThumbClick = (el) => {
        if (el.tagName === "VIDEO") {
            setMainDisplay({ type: "video", src: el.src })
        } else {
            setMainDisplay({ type: "img", src: el.src })
        }
    }

    // Favorite button toggle
    const handleFavToggle = () => {
        const newFavState = !isFavorite
        setIsFavorite(newFavState)
        setToastMessage(newFavState ? "Added to favorites" : "Removed from favorites")
    }

    // Share popup copy link
    const handleCopyLink = () => {
        const input = pageLinkRef.current
        if (input) {
            input.select()
            input.setSelectionRange(0, 99999) // For mobile
            navigator.clipboard.writeText(input.value).then(() => {
                setToastMessage("Link copied to clipboard")
            })
        }
    }

    // Modal: Open modal and set participant count
    const openModalWithParticipants = (count) => {
        setParticipantCount(count)
        setIsModalOpen(true)
    }

    // Modal: "I don't know my Gotra" checkbox
    const handleGotraCheck = (e) => {
        if (e.target.checked) {
            setGotra("Kashyap")
            setIsGotraDisabled(true)
        } else {
            setGotra("")
            setIsGotraDisabled(false)
        }
    }

    // Modal: Prasad toggle
    const handlePrasadToggle = (e) => {
        setShowPrasad(e.target.checked)
    }

    // Modal: Next button
    const handleFormNext = () => {
        alert("Proceeding to Review Cart...")
        // Add your redirection or next step logic here
    }

    // Carousel navigation buttons
    const handleCarouselNav = (direction) => {
        const carousel = carouselRef.current
        if (carousel) {
            const scrollAmount = 300
            carousel.scrollBy({
                left: direction === "next" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            })
        }
    }

    // Helper to render dynamic participant inputs
    const renderParticipantInputs = () => {
        return Array.from({ length: participantCount }, (_, i) => (
            <input key={i} type="text" placeholder={`Participant ${i + 1} *`} required className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400" />
        ))
    }

    const imageUrl = apiUrl.replace("/api", "") + pujaData?.image
    // console.log("kahdfajg adgah gasjdg a", imageUrl)

    const baseUrl = apiUrl.replace("/api", "")

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
                    img: p.image ? `${baseUrl}${p.image}` : "localhost:5000/images/default-puja.jpg",
                }))
                // console.log("Related Pujas:", formatted)

                setRelatedPujas(formatted)
            } catch (error) {
                console.error("Error fetching related pujas:", error)
            }
        }

        fetchPujas()
    }, [pujaData?.category?.name, pujaData?._id])

    return (
        <>
            <style>{`
        .gold-text { background: linear-gradient(90deg,#f59e0b,#d97706); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .glass { background: rgba(255,255,255,.85); backdrop-filter: blur(12px); }
        .soft-border { border: 1px solid rgba(250,204,21,.35); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlide { from {opacity:0; transform: translateY(10px)} to {opacity:1; transform: translateY(0)} }
        .fadeSlide { animation: fadeSlide .5s ease; }
      `}</style>

            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 text-gray-800">
                <div className="pointer-events-none fixed -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-300/40 blur-3xl"></div>
                <div className="pointer-events-none fixed -right-24 -bottom-24 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl"></div>

                <nav className="mx-auto flex max-w-7xl items-center gap-2 px-6 pt-6 text-sm text-gray-600">
                    <a className="font-medium transition hover:text-yellow-700" href="#">
                        Home
                    </a>
                    <span>›</span>
                    <a className="font-medium transition hover:text-yellow-700" href="#">
                        Puja
                    </a>
                    <span>›</span>
                    <a className="font-medium transition hover:text-yellow-700" href="#">
                        Yagya Puja
                    </a>
                    <span>›</span>
                    <span className="font-semibold text-red-600">{pujaData?.title}</span>
                </nav>

                {/* Main Section */}
                <section className="mx-auto grid max-w-7xl gap-8 p-6 md:p-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div id="mainDisplay" className="shimmer group relative aspect-[6/5] h-[500px] w-full overflow-hidden">
                            {/* This part is now controlled by React state */}
                            <img
                                id="mainImage"
                                src={imageUrl}
                                alt="Product Image"
                                className="flex h-full w-full space-x-3 object-contain transition duration-700 group-hover:scale-[1.03]"
                                data-aos="zoom-in"
                            />
                        </div>
                    </div>

                    {/* Product Details Card */}
                    <div className="glass soft-border fadeSlide h-[500px] w-full rounded-2xl p-6 md:p-8">
                        <div className="glass flex items-start justify-between gap-4 rounded-2xl p-6" data-aos="fade-left">
                            <div>
                                <p className="text-xs tracking-wide text-gray-500 uppercase">Yagya Puja</p>
                                <h1 className="gold-text gold-text mt-1 mb-6 text-3xl font-extrabold md:text-4xl" data-aos="fade-down">
                                    {pujaData?.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    id="favBtn"
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-red-50 ${isFavorite ? "text-red-600" : "hover:text-red-600"}`}
                                    onClick={handleFavToggle}
                                >
                                    ❤️
                                </button>
                                <button
                                    id="shareBtn"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-yellow-50 hover:text-yellow-700"
                                    onClick={() => setIsShareOpen(true)}
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

                        {/* Offer countdown */}
                        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-3 text-yellow-800 shadow">
                            <div className="font-semibold">Booking closes in: 01/11/25 – 20/11/25</div>
                            <div id="countdown" className="text-xs font-bold">
                                {countdown}
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                            <div className="rounded-xl border bg-white p-3 hover:scale-105 hover:bg-yellow-500 hover:shadow-md">✅ Certified Priests</div>
                            <div className="rounded-xl border bg-white p-3 hover:scale-105 hover:bg-yellow-500 hover:shadow-md">🕉️ Vedic Rituals</div>
                            <div className="rounded-xl border bg-white p-3 hover:scale-105 hover:bg-yellow-500 hover:shadow-md">🚚 Prasad Delivery</div>
                        </div>

                        <a href="#participate-section">
                            {" "}
                            <button
                                id="bookBtn"
                                className="hover:shadow-mdc mt-6 w-full transform rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-700 hover:shadow-amber-300/40 active:scale-[.98]"
                            >
                                Participate in Puja
                            </button>
                        </a>
                    </div>
                </section>

                <h3 id="participate-section" className="gold-text mt-9 text-center text-4xl font-extrabold">
                    4 Ways to Participate
                </h3>

                <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="mx-auto max-w-sm">
                        <div className="overflow-hidden rounded-2xl border-2 border-orange-200 bg-white shadow-md transition hover:shadow-xl">
                            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 text-left text-white">
                                <h3 className="text-lg font-semibold">Individual Lakshmi Puja</h3>
                                <p className="mt-1 text-xl font-bold">₹851</p>
                                <img src="/images/participate-id/one_family.avif" alt="Individual" className="mt-3 rounded-lg" />
                            </div>
                            <div className="space-y-3 p-5 text-sm text-gray-700">
                                <p>🔸 Link for Recorded video of Lakshmi Puja</p>
                                <p>🔸 Individual’s Name and Gotra will be chanted during the Puja Sankalp</p>
                                <p>🔸 You can choose to offer Vastra & Bhog to Lakshmi Mata and the video of the Offerings will be shared with you</p>
                                <p>🔸 Prasad will be shipped to your home</p>
                            </div>
                            <div className="p-4 text-center">
                                <button
                                    data-participants="1"
                                    className="open-modal-btn w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
                                    onClick={() => openModalWithParticipants(1)}
                                >
                                    PARTICIPATE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="overflow-hidden rounded-2xl border-2 border-orange-200 bg-white shadow-md transition hover:shadow-xl">
                        <div className="bg-gradient-to-r from-pink-600 to-orange-500 p-4 text-left text-white">
                            <h3 className="text-lg font-semibold">Couple Lakshmi Puja</h3>
                            <p className="mt-1 text-xl font-bold">₹1251</p>
                            <img src="/images/participate-id/two_family.avif" alt="Couple" className="mt-3 rounded-lg" />
                        </div>
                        <div className="space-y-3 p-5 text-sm text-gray-700">
                            <p>🔸 Link for Recorded video of Lakshmi Puja</p>
                            <p>🔸 2 Devotee Name and Gotra will be chanted during the Puja Sankalp</p>
                            <p>🔸 You can choose to offer Vastra & Bhog to Lakshmi Mata and the video of the Offerings will be shared with you</p>
                            <p>🔸 Prasad will be shipped to your home</p>
                        </div>
                        <div className="p-4 text-center">
                            <button
                                data-participants="2"
                                className="open-modal-btn w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
                                onClick={() => openModalWithParticipants(2)}
                            >
                                PARTICIPATE
                            </button>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="overflow-hidden rounded-2xl border-2 border-orange-200 bg-white shadow-md transition hover:shadow-xl">
                        <div className="bg-gradient-to-r from-orange-600 to-red-400 p-4 text-left text-white">
                            <h3 className="text-lg font-semibold">Family Lakshmi Puja</h3>
                            <p className="mt-1 text-xl font-bold">₹1451</p>
                            <img src="/images/participate-id/four_family.avif" alt="Family" className="mt-3 rounded-lg" />
                        </div>
                        <div className="space-y-3 p-5 text-sm text-gray-700">
                            <p>🔸 Link for Recorded video of Lakshmi Puja</p>
                            <p>🔸 4 Devotee Name and Gotra will be chanted during the Puja Sankalp</p>
                            <p>🔸 You can choose to offer Vastra & Bhog to Lakshmi Mata and the video of the Offerings will be shared with you</p>
                            <p>🔸 Prasad will be shipped to your home</p>
                        </div>
                        <div className="p-4 text-center">
                            <button
                                data-participants="4"
                                className="open-modal-btn w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
                                onClick={() => openModalWithParticipants(4)}
                            >
                                PARTICIPATE
                            </button>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="overflow-hidden rounded-2xl border-2 border-orange-200 bg-white shadow-md transition hover:shadow-xl">
                        <div className="bg-gradient-to-r from-orange-600 to-red-400 p-4 text-left text-white">
                            <h3 className="text-lg font-semibold">Family Lakshmi Puja</h3>
                            <p className="mt-1 text-xl font-bold">₹1451</p>
                            <img src="/images/participate-id/six_family.avif" alt="Family" className="mt-3 rounded-lg" />
                        </div>
                        <div className="space-y-3 p-5 text-sm text-gray-700">
                            <p>🔸 Link for Recorded video of Lakshmi Puja</p>
                            <p>🔸 6 Devotee Name and Gotra will be chanted during the Puja Sankalp</p>
                            <p>🔸 You can choose to offer Vastra & Bhog to Lakshmi Mata and the video of the Offerings will be shared with you</p>
                            <p>🔸 Prasad will be shipped to your home</p>
                        </div>
                        <div className="p-4 text-center">
                            <button
                                data-participants="6"
                                className="open-modal-btn w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
                                onClick={() => openModalWithParticipants(6)}
                            >
                                PARTICIPATE
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Form Modal --- */}
                <div
                    id="formModal"
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isModalOpen ? "" : "hidden"} bg-black/20 backdrop-blur-sm`}
                    onClick={(e) => {
                        if (e.target.id === "formModal") setIsModalOpen(false)
                    }}
                >
                    <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
                        <button id="closeModalBtn" className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>
                        <div className="sticky top-0 z-50 flex w-full items-center justify-center rounded-t-lg border-b bg-white shadow-sm">
                            <div className="flex items-center justify-center space-x-6 p-3 text-sm md:text-base">
                                <div className="flex items-center space-x-2 font-semibold text-orange-500">
                                    {/* <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500"></span> */}
                                    <span>Add Details</span>
                                </div>
                            </div>
                        </div>
                        <form className="mx-auto max-w-3xl space-y-6 rounded-xl bg-white p-6 md:p-10">
                            <div>
                                <label className="flex items-center gap-2 text-lg font-semibold">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="h-5 w-5" alt="" />
                                    WhatsApp Mobile Number
                                </label>
                                <div className="mt-2 flex items-center overflow-hidden rounded-lg border">
                                    <span className="bg-gray-100 px-3 py-2 text-gray-600">+91</span>
                                    <input type="tel" placeholder="Enter WhatsApp Number" className="flex-1 px-3 py-2 outline-none" required />
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">Add Participants</h3>
                                {/* This div is now dynamically filled by React */}
                                <div className="space-y-3" id="participant-inputs-container">
                                    {renderParticipantInputs()}
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">Add Gotra</h3>
                                <input
                                    type="text"
                                    id="gotraInput"
                                    placeholder="Enter Gotra"
                                    className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400 ${isGotraDisabled ? "bg-gray-100" : ""}`}
                                    value={gotra}
                                    onChange={(e) => setGotra(e.target.value)}
                                    disabled={isGotraDisabled}
                                />
                                <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                                    <input type="checkbox" id="unknownGotra" className="h-4 w-4" onChange={handleGotraCheck} />I don’t know my Gotra
                                </label>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">Do you want the Prasad to be Delivered?</h3>
                                <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                                    <p className="text-sm text-gray-600">Note: Prasad will be delivered within 10 days of the puja/offering.</p>
                                    <label className="inline-flex cursor-pointer items-center">
                                        <input type="checkbox" className="peer sr-only" id="prasadToggle" onChange={handlePrasadToggle} />
                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-300 transition-all duration-300 peer-checked:bg-orange-500">
                                            <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5"></span>
                                        </div>
                                    </label>
                                </div>
                                <div id="prasadFields" className={`mt-4 space-y-4 ${showPrasad ? "" : "hidden"}`}>
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-700">Select Prasad Type (Only One)</h4>
                                        <div className="space-y-2">
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 hover:bg-orange-50">
                                                <input type="radio" name="prasadType" value="rudraksh" className="h-4 w-4 text-orange-500" />
                                                <span className="flex-1">Rudraksh – ₹199</span>
                                            </label>
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 hover:bg-orange-50">
                                                <input type="radio" name="prasadType" value="bracelet" className="h-4 w-4 text-orange-500" />
                                                <span className="flex-1">Bracelet – ₹299</span>
                                            </label>
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 hover:bg-orange-50">
                                                <input type="radio" name="prasadType" value="full" className="h-4 w-4 text-orange-500" />
                                                <span className="flex-1">Full Packet (Rudraksh + Bracelet) – ₹449</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Full Name" className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400" />
                                        <input type="text" placeholder="Full Address" className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400" />
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <input type="text" placeholder="City" className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400" />
                                            <input type="text" placeholder="Pincode" className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-orange-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    id="nextBtn"
                                    className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition-all hover:bg-orange-600"
                                    onClick={handleFormNext}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Info Tabs (About/Benefits/FAQ/Shipping/Reviews) */}
                <section className="mx-auto mt-6 max-w-7xl px-6 pb-16 md:px-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border glass rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-3xl font-extrabold">About the Puja</h3>
                            <div dangerouslySetInnerHTML={{ __html: pujaData?.description }} />
                        </div>
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border glass rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-3xl font-extrabold">Benefits</h3>
                            {pujaData?.benefits && pujaData.benefits.length > 0 ? (
                                pujaData.benefits.map((benefit, index) => (
                                    <div key={benefit._id || index} className="prose prose-yellow max-w-none" dangerouslySetInnerHTML={{ __html: benefit.detail }} />
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500">No benefits available.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border glass rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-3xl font-extrabold">Puja Process</h3>
                            <div dangerouslySetInnerHTML={{ __html: pujaData?.process }} />
                        </div>
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                        <div className="glass soft-border glass rounded-2xl p-6 md:col-span-3" data-aos="fade-left">
                            <h3 className="gold-text mb-3 text-center text-3xl font-extrabold">FAQ</h3>
                            {pujaData?.faqs && pujaData.faqs.length > 0 ? (
                                pujaData.faqs.map((faq, index) => <div key={faq._id || index} className="prose prose-yellow max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />)
                            ) : (
                                <p className="text-center text-sm text-gray-500">No FAQs available.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Share Popup */}
                <div
                    id="sharePopup"
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isShareOpen ? "" : "hidden"}`}
                    onClick={(e) => {
                        if (e.target.id === "sharePopup") setIsShareOpen(false)
                    }}
                >
                    <div className="w-96 animate-[fadeSlide_.4s_ease] rounded-2xl border-t-4 border-yellow-500 bg-white p-6 shadow-2xl">
                        <h2 className="mb-3 text-xl font-bold text-yellow-700">Share this Puja </h2>
                        <div className="mb-4 flex items-center">
                            <input id="pageLink" type="text" ref={pageLinkRef} defaultValue="http://127.0.0.1:5500/index.html" readOnly className="flex-1 rounded-l-lg border px-3 py-2 text-sm" />
                            <button onClick={handleCopyLink} className="rounded-r-lg bg-yellow-600 px-4 py-2 text-white">
                                Copy
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center text-sm">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://api.whatsapp.com/send?text=http://127.0.0.1:5500/index.html"
                                className="rounded-lg border border-green-500 py-2 text-green-600 transition hover:bg-green-500 hover:text-white"
                            >
                                WhatsApp
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:5500/index.html"
                                className="rounded-lg border border-blue-500 py-2 text-blue-600 transition hover:bg-blue-500 hover:text-white"
                            >
                                Facebook
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.instagram.com/"
                                className="rounded-lg border border-pink-500 py-2 text-pink-600 transition hover:bg-pink-500 hover:text-white"
                            >
                                Instagram
                            </a>
                        </div>
                        <button id="closePopup" className="mt-5 w-full rounded-lg bg-yellow-600 py-2.5 font-semibold text-white hover:bg-yellow-700" onClick={() => setIsShareOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>

                {/* Toast */}
                {toastMessage && (
                    <div id="toast" className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-xl">
                        {toastMessage}
                    </div>
                )}

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
                                        onClick={() => router.push(`/yagya-puja/participate/${puja.id}`)} // ✅ Next.js navigation
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
            </div>
        </>
    )
}

export default Upcoming

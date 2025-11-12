"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-zinc-900 md:text-5xl">{title}</h2>
        {subtitle && <p className="mx-auto max-w-3xl text-lg text-zinc-700">{subtitle}</p>}
    </div>
)

const CTAButton = ({ text, icon, className = "" }) => (
    <a
        href="#book" // ✅ Changed to 'a' tag, using href for linking/scrolling
        // onClick={} // ❌ Remove the onClick since we're navigating
        className={`// ⬅️ Add classes for proper alignment/sizing inline-block transform rounded-lg bg-orange-500 px-8 py-3 text-center text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl ${className} `}
    >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
    </a>
)

const StarIcon = ({ filled = true }) => (
    <svg className={`h-6 w-6 ${filled ? "text-yellow-400" : "text-zinc-300"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
)

const MapPinIcon = () => (
    <svg className="mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
)

// Testimonial Data
const testimonials = [
    {
        name: "Priya Sharma",
        location: "Mumbai, India",
        quote: "My family felt immense peace after the Pitru Dosh Puja. Truly divine experience.",
        stars: 5,
        img: "https://placehold.co/100x100/EAD9C7/573F28?text=PS",
    },
    {
        name: "Rohit Mehta",
        location: "Delhi, India",
        quote: "Veda Structure’s Rudrabhishek Puja changed my energy completely. Highly recommended.",
        stars: 5,
        img: "https://placehold.co/100x100/D1D5DB/374151?text=RM",
    },
    {
        name: "Aarushi Singh",
        location: "Bangalore, India",
        quote: "Never thought online Puja could feel so real and sacred. Thank you!",
        stars: 5,
        img: "https://placehold.co/100x100/F0E7D8/6B4F3A?text=AS",
    },
    {
        name: "Vishal Bhardwaj",
        location: "Varanasi, India",
        quote: "The personalized sankalp felt very powerful. The pandits were very knowledgeable.",
        stars: 4,
        img: "https://placehold.co/100x100/E0E7FF/4338CA?text=VB",
    },
]

// Duplicate data for seamless loop
const doubledTestimonials = [...testimonials, ...testimonials]

const SimplePuja = () => {
    const router = useRouter()

    const [pujas, setPujas] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchPujas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const pujaData = res.data.filter((item) => item.category.name === "Vedic Puja")
                // console.log("Fetched nitya data:", pujaData)
                setPujas(pujaData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPujas()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")

    return (
        <div className="min-h-screen bg-amber-50 font-sans text-zinc-800">
            <style>
                {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .hover-pause:hover {
            animation-play-state: paused;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
            </style>

            {/* --- Hero Section --- */}
            <section className="relative flex h-[70vh] items-center justify-center overflow-hidden p-6 text-center text-white md:h-[85vh]">
                {/* --- Video Background --- */}
                <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
                    <source src="/images/vedic-puja/Daily Puja.mp4" type="video/mp4" />
                    Aapka browser video tag ko support nahi karta.
                </video>
                <div className="absolute inset-0 z-10 bg-black opacity-60"></div> {/* Video par dark overlay (video ke upar) */}
                <div className="relative z-20 mx-auto max-w-4xl">
                    {" "}
                    {/* Text content (overlay ke upar) */}
                    <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">🙏 Experience the Power of Authentic Vedic Puja</h1>
                    <p className="mb-10 text-xl font-light md:text-2xl">Performed by Kashi Pandits for Your Peace, Health & Prosperity</p>
                    <CTAButton text="Book Your Puja Now" icon="🔮" />
                </div>
            </section>

            {/* --- Highlights Section --- */}
            <section className="bg-white px-6 py-24">
                <div className="container mx-auto max-w-7xl">
                    <SectionTitle title="Highlights of Veda Structure Puja Services" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 (Bada) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-2">
                            <span className="p-4 text-5xl text-orange-600">🌺</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Performed in Kashi</h3>
                                <p className="text-zinc-700">The City of Lord Shiva</p>
                            </div>
                        </div>

                        {/* Card 2 (Chota) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-1">
                            <span className="p-4 text-5xl text-orange-600">🕉️</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Experienced Pandits</h3>
                                <p className="text-zinc-700">Guided by Vedic experts</p>
                            </div>
                        </div>

                        {/* Card 3 (Chota) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-1">
                            <span className="p-4 text-5xl text-orange-600">🔥</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Personalized Sankalp</h3>
                                <p className="text-zinc-700">Intention ritual for you</p>
                            </div>
                        </div>

                        {/* Card 4 (Bada) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-2">
                            <span className="p-4 text-5xl text-orange-600">📿</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Pure Ingredients</h3>
                                <p className="text-zinc-700">Use of pure vedic chants & samagri</p>
                            </div>
                        </div>

                        {/* Card 5 (Bada) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-2">
                            <span className="p-4 text-5xl text-orange-600">📸</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Live Streaming</h3>
                                <p className="text-zinc-700">Video & Recording Option Available</p>
                            </div>
                        </div>

                        {/* Card 6 (Chota) */}
                        <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl lg:col-span-1">
                            <span className="p-4 text-5xl text-orange-600">💫</span>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-zinc-900">Suitable Muhurat</h3>
                                <p className="text-zinc-700">Auspicious Time Selection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- How It Works Section  --- */}
            <section className="bg-amber-50 px-6 py-24">
                <div className="container mx-auto max-w-6xl">
                    <SectionTitle title="How It Works" />

                    {/* --- Desktop Timeline (Horizontal) --- */}
                    <div className="relative mx-auto hidden max-w-5xl justify-between md:flex">
                        {/* Connecting Line */}
                        <div className="absolute top-10 left-0 z-0 h-1 w-full bg-orange-200"></div>

                        {/* Step 1 */}
                        <div className="relative z-10 flex w-60 flex-col items-center text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-3xl font-extrabold text-orange-600 shadow-lg">1</div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Fill Your Details</h3>
                            <p className="text-zinc-700">Fill your Name, Birth Details & Gotra</p>
                        </div>
                        {/* Step 2 */}
                        <div className="relative z-10 flex w-60 flex-col items-center text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-3xl font-extrabold text-orange-600 shadow-lg">2</div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Select the Puja</h3>
                            <p className="text-zinc-700">Select the Puja type & preferred date</p>
                        </div>
                        {/* Step 3 */}
                        <div className="relative z-10 flex w-60 flex-col items-center text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-3xl font-extrabold text-orange-600 shadow-lg">3</div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Puja is Performed</h3>
                            <p className="text-zinc-700">Pandits perform your Puja in Kashi (Live or Remote)</p>
                        </div>
                        {/* Step 4 */}
                        <div className="relative z-10 flex w-60 flex-col items-center text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-3xl font-extrabold text-orange-600 shadow-lg">4</div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Receive Blessings</h3>
                            <p className="text-zinc-700">Receive video/photos & blessings note</p>
                        </div>
                    </div>

                    {/* --- Mobile Timeline  --- */}
                    <div className="relative flex flex-col pl-16 md:hidden">
                        {/* Connecting Line */}
                        <div className="absolute top-0 bottom-0 left-8 z-0 w-1 bg-orange-200"></div>

                        {/* Step 1 */}
                        <div className="relative z-10 mb-16">
                            <div className="absolute top-0 -left-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-2xl font-extrabold text-orange-600 shadow-lg">
                                1
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Fill Your Details</h3>
                            <p className="text-zinc-700">Fill your Name, Birth Details & Gotra</p>
                        </div>
                        {/* Step 2 */}
                        <div className="relative z-10 mb-16">
                            <div className="absolute top-0 -left-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-2xl font-extrabold text-orange-600 shadow-lg">
                                2
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Select the Puja</h3>
                            <p className="text-zinc-700">Select the Puja type & preferred date</p>
                        </div>
                        {/* Step 3 */}
                        <div className="relative z-10 mb-16">
                            <div className="absolute top-0 -left-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-2xl font-extrabold text-orange-600 shadow-lg">
                                3
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Puja is Performed</h3>
                            <p className="text-zinc-700">Pandits perform your Puja in Kashi (Live or Remote)</p>
                        </div>
                        {/* Step 4 */}
                        <div className="relative z-10">
                            <div className="absolute top-0 -left-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-white text-2xl font-extrabold text-orange-600 shadow-lg">
                                4
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Receive Blessings</h3>
                            <p className="text-zinc-700">Receive video/photos & blessings note</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Types of Puja Section --- */}

            {/* cards */}
            <section id="book" className="bg-base-50 py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Vedic Puja You Can Book</h2>
                    {/* <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p> */}
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pujas?.map((item) => (
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
            

            {/* --- Testimonials Section --- */}
            {/* <section className="overflow-hidden bg-white px-6 py-24">
                <div className="container mx-auto max-w-7xl">
                    <SectionTitle title="Voices of Devotion" />
                </div> */}

                {/* --- Animated Swiper (Marquee) --- */}
                {/* <div className="relative w-full" style={{ maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
                    <div className="animate-marquee hover-pause flex w-max">
                        {doubledTestimonials.map((testimonial, index) => (
                            <div key={index} className="mx-4 w-[320px] flex-shrink-0 py-16 sm:w-[380px]">
                                <div className="relative h-full rounded-2xl border border-orange-100 bg-amber-50 p-8 pt-24 text-center shadow-xl">
                                    <img
                                        src={testimonial.img}
                                        alt={testimonial.name}
                                        className="absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-lg"
                                        onError={(e) => (e.target.src = "https://placehold.co/112x112/F9E5C9/8B5A2A?text=Devotee")}
                                    />
                                    <div className="mb-4 flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < testimonial.stars} />
                                        ))}
                                    </div>
                                    <h3 className="mb-1 text-2xl font-extrabold text-zinc-900">{testimonial.name}</h3>
                                    <p className="mb-6 flex items-center justify-center font-semibold text-orange-600">
                                        <MapPinIcon />
                                        {testimonial.location}
                                    </p>
                                    <p className="text-lg text-zinc-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* --- FAQ Section --- */}
            <section className="bg-amber-50 px-6 py-24">
                <div className="container mx-auto max-w-3xl">
                    <SectionTitle title="Frequently Asked Questions" />
                    <div className="space-y-4">
                        {/* FAQ 1 - Using <details> for accordion */}
                        <details className="mb-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-lg transition-all duration-300 open:shadow-xl">
                            <summary className="cursor-pointer list-none text-xl font-bold text-zinc-900 transition-colors hover:text-orange-600">Q1: Can I watch my Puja live?</summary>
                            <p className="mt-4 text-base text-zinc-700">👉 Yes, we provide live streaming and post-Puja video.</p>
                        </details>
                        {/* FAQ 2 */}
                        <details className="mb-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-lg transition-all duration-300 open:shadow-xl">
                            <summary className="cursor-pointer list-none text-xl font-bold text-zinc-900 transition-colors hover:text-orange-600">
                                Q2: How do I know which Puja is right for me?
                            </summary>
                            <p className="mt-4 text-base text-zinc-700">👉 Our astrologer will analyze your birth chart and suggest the best Puja.</p>
                        </details>
                        {/* FAQ 3 */}
                        <details className="mb-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-lg transition-all duration-300 open:shadow-xl">
                            <summary className="cursor-pointer list-none text-xl font-bold text-zinc-900 transition-colors hover:text-orange-600">Q3: What happens after booking?</summary>
                            <p className="mt-4 text-base text-zinc-700">👉 You’ll get a confirmation message, puja date, and live stream link.</p>
                        </details>
                    </div>
                </div>
            </section>

            {/* --- Final CTA Section --- */}
            <section className="bg-gradient-to-b from-orange-100 to-amber-50 px-6 py-24 text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="mb-6 text-4xl font-extrabold text-orange-900 md:text-5xl">Purify Your Karma. Strengthen Your Destiny</h2>
                    <p className="mb-10 text-xl text-zinc-800">Veda Structure’s Puja Services connect you directly to divine energies from the holy city of Kashi.</p>
                    <CTAButton text="Book Your Puja Now & Invoke Divine Blessings" icon="" className="px-10 py-4 text-xl" />
                </div>
            </section>
        </div>
    )
}

export default SimplePuja

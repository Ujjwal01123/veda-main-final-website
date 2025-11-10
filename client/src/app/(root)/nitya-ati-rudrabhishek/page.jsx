"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NityaAti = () => {
    const router = useRouter()
    const [nityas, setNityas] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchNityas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const nityaData = res.data.filter((item) => item.category.name === "Nitya Ati Rudrabhishek")
                console.log("Fetched nitya data:", nityaData)
                setNityas(nityaData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNityas()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")


    return (
        <div className="bg-cream text-charcoal font-sans antialiased">
            <header className="relative flex min-h-screen items-end overflow-hidden text-white md:items-center">
                <div className="absolute inset-0 z-0">
                    <img src="/images/nitya-ati/banner.jpg" alt="A serene Shivling during an Abhishekam ceremony" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:px-12 md:pb-0 md:text-left">
                    <h1 className="font-serif text-5xl leading-tight font-bold tracking-wide md:text-7xl">Experience Divine Grace Daily</h1>
                    <p className="mt-4 max-w-2xl text-lg text-amber-300 md:text-xl">
                        Join our Nitya Ati Rudrabhishek Yagya to invoke Lord Shiva’s blessings for profound peace, health, and prosperity.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                        <a
                            href="#participate"
                            className="bg-orange-500 hover:bg-orange-600 flex w-full transform items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-105 sm:w-auto"
                        >
                            Book Now
                        </a>
                        {/* <a
                            href="#live"
                            className="hover:text-charcoal flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-black/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white sm:w-auto"
                        >
                            Watch Live Yagya
                        </a> */}
                    </div>
                </div>
            </header>

            <main>
                <section id="about" className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            <div className="flex justify-center">
                                <div className="rounded-t-full rounded-b-xl border-2 border-yellow-500/30 bg-orange-100 p-4 shadow-2xl">
                                    <div className="overflow-hidden rounded-t-full rounded-b-lg">
                                        <img
                                            src="/images/nitya-ati/Kashi Vishvnath.jpg"
                                            alt="A serene Shivling during an Abhishekam ceremony"
                                            className="h-auto w-full transform object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <h2 className="font-serif text-4xl leading-tight font-bold text-gray-800 md:text-5xl">The Four Pillars of Divine Essence</h2>
                                <p className="mt-4 text-lg text-orange-600">Understand the sacred components that combine to create the profound spiritual energy of the Yagya.</p>
                                <div className="mx-auto my-8 h-px w-2/3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent lg:mx-0"></div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
                                        <div className="mb-3 text-4xl text-orange-500">🔱</div>
                                        <h3 className="text-xl font-semibold text-gray-800">Vedic Recitation</h3>
                                        <p className="mt-2 text-sm text-gray-600">Sacred hymns of Shri Rudram, chanted to invoke the infinite aspects of Lord Shiva.</p>
                                    </div>
                                    <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
                                        <div className="mb-3 text-4xl text-orange-500">🏺</div>
                                        <h3 className="text-xl font-semibold text-gray-800">Abhishekam</h3>
                                        <p className="mt-2 text-sm text-gray-600">The ritual bathing of the Shivling with holy offerings, purifying all existence.</p>
                                    </div>
                                    <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
                                        <div className="mb-3 text-4xl text-orange-500">🔥</div>
                                        <h3 className="text-xl font-semibold text-gray-800">Yagya (Havan)</h3>
                                        <p className="mt-2 text-sm text-gray-600">Offerings to Agni, the sacred fire, carrying prayers and intentions to the divine.</p>
                                    </div>
                                    <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
                                        <div className="mb-3 text-4xl text-orange-500">🙏</div>
                                        <h3 className="text-xl font-semibold text-gray-800">Sankalpam</h3>
                                        <p className="mt-2 text-sm text-gray-600">Devotee's intentions, guided with precision by learned and devoted Vedic priests.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="overflow-hidden py-24">
                    <div className="container mx-auto px-6">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">A River of Divine Blessings</h2>
                            <p className="mt-4 text-lg text-orange-600">Discover the sacred benefits that flow into your life through the grace of this powerful Yagya.</p>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                            <div className="flex w-full justify-center">
                                <img src="/images/nitya-ati/medi.jpg" alt="A person meditating in a serene temple" className="max-h-[600px] rounded-2xl object-cover shadow-2xl" />
                            </div>
                            <div className="relative">
                                <div className="absolute top-0 bottom-0 left-4">
                                    <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-yellow-300">
                                        <line x1="1" y1="0" x2="1" y2="100%" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="space-y-12">
                                    <div className="group relative pl-12">
                                        <div className="absolute top-0 left-0 flex h-full items-center">
                                            <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                            <svg
                                                className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 3.5a1.5 1.5 0 011.378 2.126l-1.38 3.862a.5.5 0 01-.94-.038l-1.38-3.862A1.5 1.5 0 0110 3.5zm-3.122 5.372a.5.5 0 01-.939-.038L4.56 5.626A1.5 1.5 0 016.878 3.5h6.244a1.5 1.5 0 011.378 2.126l-1.38 3.862a.5.5 0 01-.94-.038l1.38-3.862a.5.5 0 00-.46-.626H6.878a.5.5 0 00-.459.626l1.38 3.862zM4.5 10.5a1.5 1.5 0 011.378 2.126L4.5 16.5h11l-1.378-3.874a1.5 1.5 0 112.756-.972L18.5 16.5A1.5 1.5 0 0117.122 18H2.878A1.5 1.5 0 011.5 16.5l1.622-4.874A1.5 1.5 0 014.5 10.5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Inner Peace & Clarity</h3>
                                        <p className="mt-1 text-gray-600">Calm your mind, reduce stress, and find mental clarity amidst life's challenges.</p>
                                    </div>
                                    <div className="group relative pl-12">
                                        <div className="absolute top-0 left-0 flex h-full items-center">
                                            <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                            <svg
                                                className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Removes Doshas & Negativity</h3>
                                        <p className="mt-1 text-gray-600">Neutralize malefic planetary influences and cleanse energetic blockages.</p>
                                    </div>
                                    <div className="group relative pl-12">
                                        <div className="absolute top-0 left-0 flex h-full items-center">
                                            <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                            <svg
                                                className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 2a5 5 0 00-5 5c0 1.01.366 1.932.956 2.686a.5.5 0 00.708-.708A4.002 4.002 0 016 7a4 4 0 118 0 4.002 4.002 0 01-.664 2.012.5.5 0 10.708.708A5.002 5.002 0 0015 7a5 5 0 00-5-5z" />
                                                <path d="M10 12a5 5 0 00-5 5c0 1.01.366 1.932.956 2.686a.5.5 0 00.708-.708A4.002 4.002 0 016 17a4 4 0 118 0 4.002 4.002 0 01-.664 2.012.5.5 0 10.708.708A5.002 5.002 0 0015 17a5 5 0 00-5-5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Protection & Cleansing</h3>
                                        <p className="mt-1 text-gray-600">Build a divine shield of protection and cleanse your aura from impurities.</p>
                                    </div>
                                    <div className="group relative pl-12">
                                        <div className="absolute top-0 left-0 flex h-full items-center">
                                            <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                            <svg
                                                className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 2a.5.5 0 00-.485.379l-1 4A.5.5 0 009 6.5h2a.5.5 0 00.485-.621l-1-4A.5.5 0 0010 2zM5.485 5.379a.5.5 0 00-.485.621l1 4A.5.5 0 006.5 10h1.272a.5.5 0 00.464-.314l.728-1.562A.5.5 0 019.236 8h1.528a.5.5 0 01.464.686l-.728 1.562a.5.5 0 00.464.314h1.272a.5.5 0 00.485-.379l1-4a.5.5 0 00-.485-.621H5.485zM4 11a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 014 11zm11.5.5a.5.5 0 00-1 0v1a.5.5 0 001 0v-1zM5 14a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 015 14zm10.5.5a.5.5 0 00-1 0v1a.5.5 0 001 0v-1z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Blessings for Family & Home</h3>
                                        <p className="mt-1 text-gray-600">Foster love, harmony, health, and prosperity for your entire family and home.</p>
                                    </div>
                                    <div className="group relative pl-12">
                                        <div className="absolute top-0 left-0 flex h-full items-center">
                                            <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                            <svg
                                                className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M8.433 7.418c.155-.103.346-.103.5 0l4.33 2.887c.23.153.23.467 0 .62l-4.33 2.887a.375.375 0 01-.5 0L3.5 11.082a.375.375 0 010-.62L8.433 7.418zM2.25 12.332c0 .414.336.75.75.75h14a.75.75 0 00.75-.75.75.75 0 00-.75-.75h-14a.75.75 0 00-.75.75z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Growth & Prosperity</h3>
                                        <p className="mt-1 text-gray-600">Accelerate your spiritual journey and attract abundance in all your endeavors.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section  className="py-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')" }}>
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                            <div className="hidden lg:block">
                                <img src="/images/nitya-ati/download.jpg" alt="A devotee participating in a sacred ritual at Prayagraj" className="h-full w-full rounded-2xl object-cover shadow-2xl" />
                            </div>
                            <div>
                                <div className="mb-12 text-center lg:text-left">
                                    <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Begin Your Sacred Journey</h2>
                                    <p className="mt-4 text-lg text-orange-600">Follow this simple, four-step path to connect with the divine.</p>
                                </div>
                                <div className="space-y-8">
                                    <div className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
                                        <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
                                            01
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Choose Your Sankalpam</h3>
                                            <p className="mt-1 text-gray-600">Select your divine intention or prayer. This is the most crucial step, as it sets the purpose of your participation.</p>
                                        </div>
                                    </div>
                                    <div className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
                                        <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
                                            02
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Submit Your Details</h3>
                                            <p className="mt-1 text-gray-600">Provide your name (and Gotra, if known). This allows the priests to include you in the sacred ritual by name.</p>
                                        </div>
                                    </div>
                                    <div className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
                                        <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
                                            03
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Watch the Livestream</h3>
                                            <p className="mt-1 text-gray-600">Join the daily Yagya live from anywhere in the world and immerse yourself in the divine vibrations.</p>
                                        </div>
                                    </div>
                                    <div className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
                                        <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
                                            04
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">Receive Blessings</h3>
                                            <p className="mt-1 text-gray-600">Feel the grace of Lord Shiva in your life. You can also opt to receive sacred Prasadam at your home.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 text-center lg:text-left">
                                    <a
                                        href="#register"
                                        className="inline-block transform rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-orange-400/50"
                                    >
                                        Book Your Sankalpam Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* cards */}
                <section id="participate" className="bg-base-50 py-24">
                    <div className=" mx-auto max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Nitya You Can Book</h2>
                        {/* <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p> */}
                    </div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {nityas?.map((item) => (
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

                {/* <section id="testimonials" className="py-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/sand-paper.png')" }}>
                    <div className="container mx-auto px-6">
                        <div className="mx-auto mb-20 max-w-3xl text-center">
                            <h2 className="font-serif text-4xl font-bold text-[#4a2c2a] md:text-5xl">Voices of Devotion</h2>
                            <p className="mt-4 text-lg text-[#854d27]">Hear the heartfelt experiences of devotees who have been touched by the grace of Lord Shiva.</p>
                            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="transform rounded-lg bg-[#fcf6f0] p-8 shadow-[8px_8px_16px_#d1c7bc,_-8px_-8px_16px_#ffffff] transition-transform duration-300 hover:scale-105">
                                <div className="text-center">
                                    <div className="mb-4 font-serif text-3xl text-orange-600">ॐ</div>
                                    <p className="font-serif text-lg text-[#6b4a34] italic">
                                        "Since I started attending the Rudrabhishek online, my life has become more peaceful. Immensely grateful for this opportunity."
                                    </p>
                                    <div className="mt-6 flex flex-col items-center">
                                        <img src="https://i.pravatar.cc/150?u=anjali" alt="Anjali M." className="h-16 w-16 rounded-full object-cover ring-4 ring-yellow-500 ring-offset-2" />
                                        <p className="mt-3 font-semibold text-[#4a2c2a]">Anjali M.</p>
                                        <p className="text-sm text-[#854d27]">Pune</p>
                                    </div>
                                </div>
                            </div>
                            <div className="transform rounded-lg bg-[#fcf6f0] p-8 shadow-[8px_8px_16px_#d1c7bc,_-8px_-8px_16px_#ffffff] transition-transform duration-300 hover:scale-105">
                                <div className="text-center">
                                    <div className="mb-4 font-serif text-3xl text-orange-600">ॐ</div>
                                    <p className="font-serif text-lg text-[#6b4a34] italic">
                                        "The daily live Yagya is a divine experience. The energy is palpable even through the screen. My family's health has improved. Har Har Mahadev!"
                                    </p>
                                    <div className="mt-6 flex flex-col items-center">
                                        <img src="https://i.pravatar.cc/150?u=rajesh" alt="Rajesh K." className="h-16 w-16 rounded-full object-cover ring-4 ring-yellow-500 ring-offset-2" />
                                        <p className="mt-3 font-semibold text-[#4a2c2a]">Rajesh K.</p>
                                        <p className="text-sm text-[#854d27]">Delhi</p>
                                    </div>
                                </div>
                            </div>
                            <div className="transform rounded-lg bg-[#fcf6f0] p-8 shadow-[8px_8px_16px_#d1c7bc,_-8px_-8px_16px_#ffffff] transition-transform duration-300 hover:scale-105">
                                <div className="text-center">
                                    <div className="mb-4 font-serif text-3xl text-orange-600">ॐ</div>
                                    <p className="font-serif text-lg text-[#6b4a34] italic">
                                        "Booking was easy and the priests are authentic. I felt a positive shift in my career and finances. A truly blessed service."
                                    </p>
                                    <div className="mt-6 flex flex-col items-center">
                                        <img src="https://i.pravatar.cc/150?u=priya" alt="Priya S." className="h-16 w-16 rounded-full object-cover ring-4 ring-yellow-500 ring-offset-2" />
                                        <p className="mt-3 font-semibold text-[#4a2c2a]">Priya S.</p>
                                        <p className="text-sm text-[#854d27]">Bengaluru</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section id="faq" className="py-24">
                    <div className="container mx-auto max-w-4xl px-6">
                        <div className="mb-16 text-center">
                            <h2 className="text-charcoal font-serif text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            <details className="group rounded-lg bg-white p-6 shadow-sm">
                                <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                                    What is Ati Rudrabhishek?
                                    <span className="relative ml-4 h-5 w-5">
                                        <svg
                                            className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600">
                                    Ati Rudrabhishek is an intensive form of Rudrabhishek, a sacred Vedic ritual for Lord Shiva. It involves ceremonial bathing (Abhishekam) of the Shiva Linga while
                                    chanting the Shri Rudram from the Yajurveda multiple times. The prefix 'Ati' means 'extra' or 'intense', signifying its high potency in removing negativities and
                                    bestowing blessings.
                                </p>
                            </details>
                            <details className="group rounded-lg bg-white p-6 shadow-sm">
                                <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                                    Can I join online?
                                    <span className="relative ml-4 h-5 w-5">
                                        <svg
                                            className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600">
                                    Absolutely! We livestream the Nitya Yagya daily. You can participate from anywhere in the world. When you book a Sankalpam, our priests will recite your name and
                                    gotra during the ritual, ensuring the blessings reach you directly, regardless of your physical location.
                                </p>
                            </details>
                            <details className="group rounded-lg bg-white p-6 shadow-sm">
                                <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                                    Is it done by qualified priests?
                                    <span className="relative ml-4 h-5 w-5">
                                        <svg
                                            className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600">
                                    Yes, all our rituals are conducted by highly experienced and qualified Vedic priests who have dedicated their lives to the study and practice of Vedic traditions.
                                    They perform the Yagya with utmost devotion and strict adherence to scriptural injunctions.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default NityaAti

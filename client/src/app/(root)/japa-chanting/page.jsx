"use client"

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Japa = () => {
    const router = useRouter()

    // --- State for Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false)

    // --- State for FAQ Accordion ---
    const [activeFaq, setActiveFaq] = useState(null)
    const faqRefs = [useRef(null), useRef(null), useRef(null)]

    // --- State for Testimonial Slider ---
    const [currentIndex, setCurrentIndex] = useState(0)
    const trackRef = useRef(null)
    const sliderContainerRef = useRef(null)
    const autoSlideTimerRef = useRef(null)
    const numSlides = 3 // From HTML

    // --- 1. Modal Open/Close Logic ---
    const openModal = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    // Effect to lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
        // Cleanup
        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isModalOpen])

    // --- 2. FAQ Accordion Toggle Logic ---
    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index)
    }

    // --- 3. Testimonial Slider Logic ---

    // Effect for auto-sliding and resizing
    useEffect(() => {
        const handleResize = () => {
            if (trackRef.current && sliderContainerRef.current) {
                const slideWidth = sliderContainerRef.current.clientWidth
                const slides = Array.from(trackRef.current.children)
                slides.forEach((slide) => {
                    slide.style.width = `${slideWidth}px`
                })
                trackRef.current.style.width = `${slideWidth * slides.length}px`
                // Go to current slide to fix position without changing state
                trackRef.current.style.transform = `translateX(-${slideWidth * currentIndex}px)`
            }
        }

        const resetAutoSlide = () => {
            clearInterval(autoSlideTimerRef.current)
            autoSlideTimerRef.current = setInterval(() => {
                // Use functional update inside interval
                setCurrentIndex((prev) => (prev + 1) % numSlides)
            }, 5000)
        }

        handleResize() // Set initial size
        resetAutoSlide() // Start auto-slide
        window.addEventListener("resize", handleResize)

        return () => {
            clearInterval(autoSlideTimerRef.current)
            window.removeEventListener("resize", handleResize)
        }
    }, [currentIndex]) // Rerun effect when currentIndex changes to update transform

    // This effect only handles the slide transition when currentIndex changes
    useEffect(() => {
        if (trackRef.current && sliderContainerRef.current) {
            const slideWidth = sliderContainerRef.current.clientWidth
            trackRef.current.style.transform = `translateX(-${slideWidth * currentIndex}px)`
        }
    }, [currentIndex])

    const handleNextClick = () => {
        const newIndex = (currentIndex + 1) % numSlides
        setCurrentIndex(newIndex)
        // Reset timer
        clearInterval(autoSlideTimerRef.current)
        autoSlideTimerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % numSlides)
        }, 5000)
    }

    const handlePrevClick = () => {
        const newIndex = (currentIndex - 1 + numSlides) % numSlides
        setCurrentIndex(newIndex)
        // Reset timer
        clearInterval(autoSlideTimerRef.current)
        autoSlideTimerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % numSlides)
        }, 5000)
    }

    // --- 4. Vanilla JS Effects (Fade-in, Smooth-scroll, Parallax) ---
    useEffect(() => {
        // 4a. Intersection Observer for Fade-in Animations
        const fadeElements = document.querySelectorAll(".fade-in")
        const fadeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in-visible")
                        fadeObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 },
        )
        fadeElements.forEach((el) => fadeObserver.observe(el))

        // 4b. Smooth Scroll for anchor links
        const anchors = document.querySelectorAll('a[href^="#"]')
        const handleAnchorClick = (e) => {
            const href = e.currentTarget.getAttribute("href")
            // Only prevent default if it's an on-page anchor
            if (href && href.startsWith("#") && href.length > 1) {
                e.preventDefault()
                const targetElement = document.querySelector(href)

                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    })
                }
            }
        }
        anchors.forEach((anchor) => {
            anchor.addEventListener("click", handleAnchorClick)
        })

        // 4c. Hero Parallax Effect
        const heroElement = document.getElementById("hero")
        const handleScroll = () => {
            if (heroElement) {
                const scrollPosition = window.pageYOffset
                heroElement.style.backgroundPositionY = scrollPosition * 0.4 + "px"
            }
        }
        window.addEventListener("scroll", handleScroll)

        // Cleanup function
        return () => {
            fadeElements.forEach((el) => fadeObserver.unobserve(el))
            anchors.forEach((anchor) => {
                anchor.removeEventListener("click", handleAnchorClick)
            })
            window.removeEventListener("scroll", handleScroll)
        }
    }, []) // Empty dependency array, runs once on mount

    // fetch api

    const [japas, setJapas] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    useEffect(() => {
        const fetchJapas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const japaData = res.data.filter((item) => item.category.name === "Japa | Chanting")
                // console.log("Fetched japa data:", japaData)
                setJapas(japaData) // Assuming API returns an array of japa items
            } catch (error) {
                console.error("Error fetching japa data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchJapas()
    }, [apiUrl])

    const imageUrl = apiUrl.replace("/api", "")
    // console.log("Image URL:", imageUrl)

    return (
        <>
            <main>
                <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
                    <video autoPlay loop muted playsInline className="absolute top-0 left-0 z-0 h-full w-full object-cover">
                        {/* IMPORTANT: Asset paths are now relative to the 'public' folder */}
                        <source src="/images/japa/v-1.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>

                    <div className="fade-in relative z-10 container mx-auto px-6 text-center text-white">
                        <h1 className="font-serif text-5xl leading-tight font-bold text-shadow-lg md:text-7xl">📿 Awaken Divine Vibrations</h1>
                        <p className="mx-auto mt-6 max-w-3xl text-xl font-light md:text-2xl">
                            When sacred mantras are chanted with pure intention, the universe listens. Performed in Kashi by certified Vedic Pandits.
                        </p>
                        <a
                            href="#pricing"
                            className="hover:bg-veda-orange-600 mt-12 inline-block transform rounded-full bg-orange-600 px-12 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            🕉 Book Your Japa Now
                        </a>
                    </div>
                </section>

                <section id="what-is-japa" className="scroll-mt-20 bg-white py-24 md:py-32">
                    <div className="container mx-auto grid items-center gap-16 px-6 md:grid-cols-2">
                        <div className="fade-in">
                            <img src="/images/japa/p-1.jpeg" alt="Mantra Chanting" className="max-h-[500px] w-full rounded-xl object-cover shadow-2xl" />
                        </div>
                        <div className="fade-in" style={{ transitionDelay: "150ms" }}>
                            <h2 className="text-veda-dark mb-8 font-serif text-4xl font-bold md:text-5xl">What is Japa?</h2>
                            <p className="mb-6 text-xl leading-relaxed text-gray-700">
                                “Japa” means the <strong>meditative repetition of a mantra</strong> — a spiritual practice that purifies the mind, dissolves negativity, and aligns your consciousness
                                with divine frequency.
                            </p>
                            <p className="mb-6 text-lg text-gray-600">
                                Each mantra carries its own vibration. When repeated a specific number of times (108, 1,008, or 1,25,000), it activates subtle energies that transform your life.
                            </p>
                            <p className="text-veda-orange-800 border-veda-orange-500 border-l-4 pl-4 text-xl font-semibold">
                                Performed in <strong>Kashi (Varanasi)</strong>, the energy of Japa multiplies — every sound vibration resonates through the cosmic channel of Lord Shiva himself.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="features" className="from-veda-bg scroll-mt-20 bg-gradient-to-b to-white py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-veda-dark fade-in mb-20 text-center font-serif text-4xl font-bold md:text-5xl">Veda Structure Japa Services</h2>
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                                <span className="text-5xl">📿</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Trained Kashi Pandits</h3>
                                <p className="text-gray-600">Conducted by certified pandits with 15+ years of experience.</p>
                            </div>
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl" style={{ transitionDelay: "100ms" }}>
                                <span className="text-5xl">🌺</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Personalized Sankalp</h3>
                                <p className="text-gray-600">Performed with your Name, Gotra, & specific intention.</p>
                            </div>
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl" style={{ transitionDelay: "200ms" }}>
                                <span className="text-5xl">🔔</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Accurate Pronunciation</h3>
                                <p className="text-gray-600">100% accurate Vedic chanting for maximum divine impact.</p>
                            </div>
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                                <span className="text-5xl">🪔</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Pure Beej Mantras</h3>
                                <p className="text-gray-600">Using Rudraksha, Tulsi Mala, and traditional rituals.</p>
                            </div>
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl" style={{ transitionDelay: "100ms" }}>
                                <span className="text-5xl">📸</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Live Streaming</h3>
                                <p className="text-gray-600">Witness your Japa live or receive a full video recording.</p>
                            </div>
                            <div className="fade-in rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl" style={{ transitionDelay: "200ms" }}>
                                <span className="text-5xl">🕉</span>
                                <h3 className="mt-4 mb-2 text-2xl font-semibold">Flexible Mantra Counts</h3>
                                <p className="text-gray-600">Choose from 108, 1,008, or the powerful 1,25,000 Jaap.</p>
                            </div>
                        </div>
                    </div>
                </section>

                
{/* cards */}
                <section id="pricing" className="bg-base-50 py-24">
                    <div className=" mx-auto max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-bold text-neutral-900">Types of Japa You Can Book</h2>
                        {/* <p className="mt-4 text-lg text-neutral-800">Choose the sacred recitation that aligns with your needs, or let our astrologers guide you.</p> */}
                    </div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {japas?.map((item) => (
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

                <section id="why-us" className="scroll-mt-20 bg-stone-700 py-24 text-white md:py-32">
                    <div className="container mx-auto grid items-center gap-16 px-6 md:grid-cols-2">
                        <div className="fade-in">
                            <img src="/images/japa/kashi.jpeg" alt="Kashi Pandit" className="h-[600px] w-full rounded-xl object-cover shadow-2xl" />
                        </div>
                        <div className="fade-in" style={{ transitionDelay: "150ms" }}>
                            <h2 className="mb-8 font-serif text-4xl font-bold text-white md:text-5xl">Why Veda Structure?</h2>
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <span className="mr-4 text-3xl"></span>
                                    <div>
                                        <h3 className="mb-1 text-2xl font-semibold">Authenticity</h3>
                                        <p className="text-lg text-white/80">Performed strictly as per Maharishi Vedic principles.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-4 text-3xl"></span>
                                    <div>
                                        <h3 className="mb-1 text-2xl font-semibold">Experience</h3>
                                        <p className="text-lg text-white/80">Over 15 years of chanting experience in the holy city of Kashi.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-4 text-3xl"></span>
                                    <div>
                                        <h3 className="mb-1 text-2xl font-semibold">Transparency</h3>
                                        <p className="text-lg text-white/80">You can witness the Japa live or receive a full, unedited video.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* <section id="pricing" className="scroll-mt-20 bg-white py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-veda-dark fade-in mb-20 text-center font-serif text-4xl font-bold md:text-5xl">Choose Your Plan</h2>
                        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                            <div className="bg-veda-bg fade-in rounded-xl border border-gray-200 p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                                <h3 className="mb-2 text-2xl font-semibold text-gray-800"> Basic Japa</h3>
                                <p className="text-veda-orange-700 my-4 text-5xl font-bold">₹2,100</p>
                                <p className="mb-6 font-medium text-gray-600">108 Times Chanting</p>
                                <ul className="mb-8 space-y-2 text-left text-gray-600">
                                    <li>✓ 1 Pandit</li>
                                    <li>✓ Personalized Sankalp</li>
                                    <li>✓ Video Proof</li>
                                </ul>
                                <a
                                    href="#!"
                                    onClick={openModal}
                                    className="open-modal-btn bg-veda-orange-100 text-veda-orange-800 hover:bg-veda-orange-200 inline-block rounded-full px-8 py-3 font-semibold transition duration-300"
                                >
                                    Book Now
                                </a>
                            </div>

                            <div className="fade-in z-10 transform rounded-xl bg-stone-700 p-8 text-center text-white shadow-2xl md:scale-110">
                                <span className="-mt-12 mb-4 inline-block rounded-full bg-orange-600 px-4 py-1 text-sm font-bold text-white">Most Popular</span>
                                <h3 className="mb-2 text-2xl font-semibold"> Maha Japa</h3>
                                <p className="my-4 text-5xl font-bold">₹9,100</p>
                                <p className="mb-6 font-medium text-white/90">1,25,000 Times Chanting</p>
                                <ul className="mb-8 space-y-2 text-left text-white/80">
                                    <li>✓ 5 Pandits + Full Ritual</li>
                                    <li>✓ Personalized Sankalp</li>
                                    <li>✓ Live Streaming Access</li>
                                    <li>✓ Post-Japa Guidance</li>
                                </ul>
                                <a
                                    href="#!"
                                    onClick={openModal}
                                    className="open-modal-btn hover:bg-veda-orange-600 inline-block transform rounded-full bg-orange-500 px-8 py-3 font-bold text-white transition duration-300 hover:scale-105"
                                >
                                    Book Your Japa Now
                                </a>
                            </div>

                            <div className="bg-veda-bg fade-in rounded-xl border border-gray-200 p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                                <h3 className="mb-2 text-2xl font-semibold text-gray-800"> Complete Japa</h3>
                                <p className="text-veda-orange-700 my-4 text-5xl font-bold">₹5,100</p>
                                <p className="mb-6 font-medium text-gray-600">1,008 Times Chanting</p>
                                <ul className="mb-8 space-y-2 text-left text-gray-600">
                                    <li>✓ 3 Pandits</li>
                                    <li>✓ Personalized Sankalp</li>
                                    <li>✓ Video Proof</li>
                                </ul>
                                <a
                                    href="#!"
                                    onClick={openModal}
                                    className="open-modal-btn bg-veda-orange-100 text-veda-orange-800 hover:bg-veda-orange-200 inline-block rounded-full px-8 py-3 font-semibold transition duration-300"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* <section id="testimonials" className="from-veda-bg scroll-mt-20 bg-gradient-to-b to-white py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <h2 className="text-veda-dark fade-in mb-16 text-center font-serif text-4xl font-bold md:text-5xl">What Devotees Say</h2>
                        <div className="fade-in relative mx-auto max-w-3xl">
                            <div ref={sliderContainerRef} className="relative overflow-hidden" style={{ height: "250px" }}>
                                <div id="slider-track" ref={trackRef} className="slider-track absolute top-0 left-0 flex h-full">
                                    <div className="flex w-full flex-shrink-0 items-center justify-center px-4">
                                        <div className="border-veda-orange-500 rounded-lg border-t-4 bg-white p-8 text-center shadow-xl">
                                            <p className="text-xl text-gray-700 italic">"After Maha Mrityunjaya Japa, my health and sleep improved instantly. I could feel the energy."</p>
                                            <p className="text-veda-orange-800 mt-6 font-bold">– Sonal Agarwal ⭐⭐⭐⭐⭐</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-shrink-0 items-center justify-center px-4">
                                        <div className="border-veda-orange-500 rounded-lg border-t-4 bg-white p-8 text-center shadow-xl">
                                            <p className="text-xl text-gray-700 italic">"Gayatri Japa filled my home with peace and clarity. I could literally feel the vibration."</p>
                                            <p className="text-veda-orange-800 mt-6 font-bold">– Kunal Tiwari ⭐⭐⭐⭐⭐</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-shrink-0 items-center justify-center px-4">
                                        <div className="border-veda-orange-500 rounded-lg border-t-4 bg-white p-8 text-center shadow-xl">
                                            <p className="text-xl text-gray-700 italic">"Best spiritual experience! Pure chanting and energy from Kashi itself. Very transparent."</p>
                                            <p className="text-veda-orange-800 mt-6 font-bold">– Rachna Desai ⭐⭐⭐⭐⭐</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                id="prev-btn"
                                onClick={handlePrevClick}
                                className="absolute top-1/2 -left-4 -translate-y-1/2 transform rounded-full bg-white/50 p-2 shadow-lg transition-all hover:bg-white md:-left-12"
                            >
                                <svg className="text-veda-dark h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <button
                                id="next-btn"
                                onClick={handleNextClick}
                                className="absolute top-1/2 -right-4 -translate-y-1/2 transform rounded-full bg-white/50 p-2 shadow-lg transition-all hover:bg-white md:-right-12"
                            >
                                <svg className="text-veda-dark h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section> */}

                <section id="faq" className="scroll-mt-20 bg-white py-24 md:py-32">
                    <div className="container mx-auto max-w-3xl px-6">
                        <h2 className="text-veda-dark fade-in mb-16 text-center font-serif text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="bg-veda-bg fade-in overflow-hidden rounded-lg shadow-md">
                                <button onClick={() => toggleFaq(0)} className="faq-btn flex w-full items-center justify-between p-6 text-left">
                                    <span className="text-xl font-semibold text-gray-800">Q1: Can I attend the Japa remotely?</span>
                                    <span
                                        className="faq-icon text-veda-orange-600 transform text-3xl font-light transition-transform duration-300"
                                        style={{
                                            transform: activeFaq === 0 ? "rotate(45deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    ref={faqRefs[0]}
                                    className="faq-answer"
                                    style={{
                                        maxHeight: activeFaq === 0 ? faqRefs[0].current?.scrollHeight + "px" : "0px",
                                    }}
                                >
                                    <p className="p-6 pt-0 text-lg text-gray-700">👉 Yes, you’ll receive a live streaming link or a full recorded video of the chanting performed in your name.</p>
                                </div>
                            </div>
                            <div className="bg-veda-bg fade-in overflow-hidden rounded-lg shadow-md" style={{ transitionDelay: "100ms" }}>
                                <button onClick={() => toggleFaq(1)} className="faq-btn flex w-full items-center justify-between p-6 text-left">
                                    <span className="text-xl font-semibold text-gray-800">Q2: How do I know which Japa is suitable for me?</span>
                                    <span
                                        className="faq-icon text-veda-orange-600 transform text-3xl font-light transition-transform duration-300"
                                        style={{
                                            transform: activeFaq === 1 ? "rotate(45deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    ref={faqRefs[1]}
                                    className="faq-answer"
                                    style={{
                                        maxHeight: activeFaq === 1 ? faqRefs[1].current?.scrollHeight + "px" : "0px",
                                    }}
                                >
                                    <p className="p-6 pt-0 text-lg text-gray-700">
                                        👉 If you are unsure, our astrologer will analyze your horoscope and guide you to the most beneficial mantra for your situation.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-veda-bg fade-in overflow-hidden rounded-lg shadow-md" style={{ transitionDelay: "200ms" }}>
                                <button onClick={() => toggleFaq(2)} className="faq-btn flex w-full items-center justify-between p-6 text-left">
                                    <span className="text-xl font-semibold text-gray-800">Q3: Is Japa effective if done on my behalf?</span>
                                    <span
                                        className="faq-icon text-veda-orange-600 transform text-3xl font-light transition-transform duration-300"
                                        style={{
                                            transform: activeFaq === 2 ? "rotate(45deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    ref={faqRefs[2]}
                                    className="faq-answer"
                                    style={{
                                        maxHeight: activeFaq === 2 ? faqRefs[2].current?.scrollHeight + "px" : "0px",
                                    }}
                                >
                                    <p className="p-6 pt-0 text-lg text-gray-700">
                                        👉 Absolutely. In Vedic tradition, when Pandits chant in your name (Sankalp), the divine energy and positive vibrations are directly transmitted to you,
                                        regardless of your location.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="final-cta" className="bg-veda-orange-50 py-24 text-center md:py-32">
                    <div className="fade-in container mx-auto max-w-4xl px-6">
                        <h3 className="text-veda-dark mb-8 font-serif text-4xl italic md:text-5xl">"Chanting is not repetition — it is vibration. It is connection."</h3>
                        <p className="mb-12 text-xl leading-relaxed text-gray-700">
                            Let the sacred sound of divine mantras purify your karma and awaken inner light. At Veda Structure, we bring the most authentic Japa experience from Kashi to guide your
                            soul.
                        </p>
                        <a
                            href="#pricing"
                            className="hover:bg-veda-orange-700 inline-block transform rounded-full bg-orange-500 px-12 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Book Your Japa Now – Begin Your Transformation
                        </a>
                    </div>
                </section>
            </main>

            {/* --- Booking Modal --- */}
            <div
                id="booking-modal"
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
                    isModalOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                }`}
            >
                <div onClick={closeModal} className="close-modal-btn absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out">
                    <button onClick={closeModal} className="close-modal-btn absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <div className="p-8 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h3 className="text-veda-dark mb-3 font-serif text-3xl font-bold">Booking Confirmed!</h3>
                        <p className="mb-8 text-lg text-gray-600">Our team will contact you shortly with the details and next steps for your Sankalp.</p>

                        <button
                            onClick={closeModal}
                            className="close-modal-btn bg-veda-orange-600 hover:bg-veda-orange-700 w-full transform rounded-full px-8 py-3 font-bold text-white transition duration-300 hover:scale-105"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Japa

// import React from "react"

// const JapaChanting = () => {
//     return (
//         <div className="bg-cream text-charcoal font-sans antialiased">
//             {/* HEADER */}
//             <header className="relative flex min-h-screen items-end overflow-hidden text-white md:items-center">
//                 <div className="absolute inset-0 z-0">
//                     <img src="/images/nitya-ati/banner.jpg" alt="Devotees performing Japa Chanting" className="h-full w-full object-cover" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//                 </div>

//                 <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:px-12 md:pb-0 md:text-left">
//                     <h1 className="font-serif text-5xl leading-tight font-bold tracking-wide md:text-7xl">Chant the Name Divine</h1>
//                     <p className="mt-4 max-w-2xl text-lg text-amber-300 md:text-xl">
//                         Participate in sacred Japa | Chanting — a path of devotion that purifies the heart and elevates the soul through the power of mantra.
//                     </p>
//                     <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
//                         <a
//                             href="#participate"
//                             className="bg-saffron-500 hover:bg-saffron-600 flex w-full transform items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-105 sm:w-auto"
//                         >
//                             Join Chanting
//                         </a>
//                         <a
//                             href="#live"
//                             className="hover:text-charcoal flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-black/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white sm:w-auto"
//                         >
//                             Watch Live Japa
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
//                                             alt="Devotees chanting with mala beads"
//                                             className="h-auto w-full transform object-cover transition-transform duration-500 hover:scale-110"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-center lg:text-left">
//                                 <h2 className="font-serif text-4xl leading-tight font-bold text-gray-800 md:text-5xl">The Power of Mantra Japa</h2>
//                                 <p className="mt-4 text-lg text-orange-600">
//                                     Japa is the meditative repetition of a divine name or mantra. Each chant vibrates spiritual energy that transforms the mind and purifies the soul.
//                                 </p>
//                                 <div className="mx-auto my-8 h-px w-2/3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent lg:mx-0"></div>
//                                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🕉️</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Mantra Recitation</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Chanting divine mantras creates vibrations that align the heart and consciousness with universal energy.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">📿</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">108 Beads of Devotion</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Each bead represents one mantra — completing a full round deepens your spiritual focus and discipline.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🪔</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Inner Purification</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Japa calms the restless mind and burns away negative impressions (samskaras) from the subconscious.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🌼</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Divine Connection</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Regular chanting invokes blessings and unites the devotee with the energy of the chosen deity or mantra.</p>
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
//                             <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Vibrate with Peace and Power</h2>
//                             <p className="mt-4 text-lg text-orange-600">Chanting is not mere repetition — it’s a spiritual technology that transforms thought, emotion, and destiny.</p>
//                         </div>
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="flex w-full justify-center">
//                                 <img src="/images/nitya-ati/medi.jpg" alt="Meditation and chanting for peace" className="max-h-[600px] rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute top-0 bottom-0 left-4">
//                                     <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-yellow-300">
//                                         <line x1="1" y1="0" x2="1" y2="100%" strokeWidth="2" />
//                                     </svg>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {[
//                                         { title: "Mental Clarity", desc: "Mantra vibrations remove confusion, enhancing focus and awareness." },
//                                         { title: "Emotional Healing", desc: "Repetitive chanting brings peace, reducing anxiety and emotional unrest." },
//                                         { title: "Positive Energy", desc: "Each chant fills the space with spiritual vibrations that uplift and protect." },
//                                         { title: "Spiritual Growth", desc: "Japa connects you to divine consciousness and awakens higher wisdom." },
//                                         { title: "Devotion & Bhakti", desc: "Chanting transforms the heart, deepening faith, gratitude, and surrender." },
//                                     ].map((b, i) => (
//                                         <div key={i} className="group relative pl-12">
//                                             <div className="absolute top-0 left-0 flex h-full items-center">
//                                                 <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
//                                                 <div className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
//                                                     📿
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
//                                 <img src="/images/nitya-ati/download.jpg" alt="Devotees chanting mantra" className="h-full w-full rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div>
//                                 <div className="mb-12 text-center lg:text-left">
//                                     <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Join the Chanting Circle</h2>
//                                     <p className="mt-4 text-lg text-orange-600">Unite your voice with divine vibrations and be part of our sacred Japa Yajna.</p>
//                                 </div>
//                                 <div className="space-y-8">
//                                     {[
//                                         { step: "01", title: "Choose Your Mantra", desc: "Select a mantra like ‘Om Namah Shivaya’ or ‘Hare Krishna’ based on your devotion." },
//                                         { step: "02", title: "Register for Chanting", desc: "Provide your details to include your name in our daily chanting circle." },
//                                         { step: "03", title: "Join Live Sessions", desc: "Chant along with devotees and priests during live global sessions." },
//                                         { step: "04", title: "Feel the Peace", desc: "Experience inner silence, joy, and a powerful sense of divine connection." },
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
//                                         Join Chanting Now
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
//                                     What is Japa or Chanting?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Japa is the meditative repetition of a divine name or mantra. It helps focus the mind, dissolve negative thoughts, and connect with divine consciousness.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     How many times should I chant a mantra?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Traditionally, one full mala (108 repetitions) is recommended daily. However, consistency matters more than count — even 10 focused chants bring peace.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Can I participate online?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">Yes! You can join our online chanting circles and live streaming sessions conducted by Vedic priests and spiritual teachers.</p>
//                             </details>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     )
// }

// export default JapaChanting

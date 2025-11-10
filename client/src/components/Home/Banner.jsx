"use client"
import { useEffect } from "react"
import "@splidejs/react-splide/css"
import AOS from "aos"
import "aos/dist/aos.css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

function Banner() {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-in-out",
            once: true,
        })
    }, [])

    return (
        <Splide
            aria-label="Banner Slides"
            options={{
                type: "loop",
                autoplay: false,
                interval: 4000,
                pauseOnHover: false,
                pauseOnFocus: false,
                arrows: false,
                pagination: false,
            }}
        >
            {/* Slide 1 */}
            <SplideSlide className="relative h-[580px]">
                <div className="relative h-full w-full">
                    <video src="/images/praying.mp4" autoPlay muted loop playsInline controls={false} className="absolute inset-0 z-0 h-full w-full object-cover"></video>
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 z-50 p-8 sm:p-12 md:p-16">
                        <div className="space-y-5">
                            <div className="w-fit rounded-full bg-white/80 px-3 py-1 text-orange-500 font-medium text-xs tracking-wide">Spiritual wellness</div>
                            <h1 className="text-5xl font-bold text-white">Inner Peace</h1>
                            <h2 className="font-bold text-orange-500 opacity-90">Sacred Healing Products</h2>
                            <p className="mt-4 text-white lg:w-1/2 sm:text-normal text-sm">
                                {" "}
                                Discover ancient wisdom through our collection of authentic spiritual products. Find peace, prosperity, and spiritual growth with sacred items.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Rudraksha Beads</div>
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Sacred Gemstones</div>
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Spiritual Jewelry</div>
                            </div>
                            <div>
                                <Link
                                    className="group flex w-fit items-center gap-2 rounded-full border border-orange-400 px-4 py-1 font-black text-white transition-all hover:bg-orange-500 hover:text-white hover:shadow-2xl"
                                    alt="url"
                                    href="/rudraksha"
                                >
                                    <span>Rudraksha Products </span>
                                    <span className="transition-all group-hover:translate-x-1">
                                        <ArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SplideSlide>
            <SplideSlide className="relative h-[580px]">
                <div className="relative h-full w-full">
                    <video src="/images/diya-light.mp4" autoPlay muted loop playsInline controls={false} className="absolute inset-0 z-0 h-full w-full object-cover"></video>
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 z-50 p-8 sm:p-12 md:p-16">
                        <div className="space-y-5">
                            <div className="w-fit rounded-full bg-white/80 px-3 py-1 text-orange-500 font-medium text-xs tracking-wide">Traditional Puja Services</div>
                            <h1 className="text-5xl font-bold text-white">Divine Blessings</h1>
                            <h2 className="font-bold text-orange-500 opacity-90">Authentic Puja Ceremonies</h2>
                            <p className="mt-4 text-white lg:w-1/2 sm:text-normal text-sm">
                                {" "}
                                Experience the power of traditional Hindu rituals with our expert pandits. Book Online puja services and receive blessings at your doorstep.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Rudraksha Beads</div>
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Sacred Gemstones</div>
                                <div className="rounded-full bg-white px-4 py-1 font-semibold">Spiritual Jewelry</div>
                            </div>
                            <div>
                                <Link
                                    className="group flex w-fit items-center gap-2 rounded-full border border-orange-400 px-4 py-1 font-black text-white transition-all hover:bg-orange-500 hover:text-white hover:shadow-2xl"
                                    alt="url"
                                    href="/rudraksha"
                                >
                                    <span>Book Puja now</span>
                                    <span className="transition-all group-hover:translate-x-1">
                                        <ArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    )
}

export default Banner

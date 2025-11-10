"use client"
import Slider from "react-slick"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const testimonials = [
    {
        name: "Beyond my expectations",
        text: "Initially, I was unsure about buying gemstones online. But after receiving my order, I was amazed by the quality and authenticity. Excellent service and very cooperative staff!",
        image1: "https://imgcdn1.gempundit.com/media/wysiwyg/arifs-review-2.jpg",
        image2: "https://imgcdn1.gempundit.com/media/wysiwyg/arifs-review-1.jpg",
    },
    {
        name: "Beautiful Ruby Ring!",
        text: "The ruby ring I received was simply perfect! The finish, shine, and fit were beyond my expectations. I’ll definitely order again — highly recommend!",
        image1: "https://imgcdn1.gempundit.com/media/wysiwyg/colin-dsouza-review-2.jpg",
        image2: "https://imgcdn1.gempundit.com/media/wysiwyg/arifs-review-1.jpg",
    },
    {
        name: "Best quality gemstones",
        text: "I ordered a Hessonite ring, and everything from packaging to quality was exceptional. The team made the process smooth and delightful!",
        image1: "https://imgcdn1.gempundit.com/media/wysiwyg/colin-dsouza-review-2.jpg",
        image2: "https://imgcdn1.gempundit.com/media/wysiwyg/colin-dsouza-review-1.jpg",
    },
    {
        name: "Impressed with the service",
        text: "I got my gemstone ring in perfect condition. The packaging, quality, and after-sales support were top-notch. Great experience overall!",
        image1: "https://imgcdn1.gempundit.com/media/wysiwyg/sosul-review.jpg",
        image2: "https://imgcdn1.gempundit.com/media/wysiwyg/monikas-review.png",
    },
]

export default function Testimonails() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] via-[#fff5ea] to-[#ffe9d9] py-24">
            {/* Sparkle Animation */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(18)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse rounded-full bg-amber-200 opacity-25"
                        style={{
                            width: Math.random() * 10 + 5 + "px",
                            height: Math.random() * 10 + 5 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            animationDuration: Math.random() * 6 + 4 + "s",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mb-14 text-center">
                <h2 className="font-serif text-5xl font-bold text-[#6b3e08]">Customer Reviews</h2>
                <p className="mt-3 text-sm font-semibold tracking-widest text-[#8c6239] uppercase">Real Experiences From Our Happy Buyers</p>
                <div className="mx-auto mt-4 h-[3px] w-24 animate-pulse rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffcc70]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <Slider {...settings}>
                    {testimonials.map((item, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 120 }} className="px-3">
                            <div className="flex h-full flex-col rounded-2xl border border-amber-100 bg-white/90 p-8 shadow-md backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">
                                <div className="mb-5 flex justify-center gap-3">
                                    <img src={item.image1} alt="review" className="h-28 w-28 rounded-lg object-cover shadow-sm" />
                                    <img src={item.image2} alt="review" className="h-28 w-28 rounded-lg object-cover shadow-sm" />
                                </div>

                                <div className="mb-2 flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-[#6b3e08] italic">{item.name}</h3>
                                </div>

                                <div className="mb-3 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </Slider>
            </div>

            <div className="relative z-10 mt-16 text-center">
                <button className="rounded-full border-2 border-[#ffcc80] bg-gradient-to-r from-[#ffb347] via-[#ffe08a] to-[#ffb347] px-10 py-3 font-semibold text-[#6b3e08] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    Read More Reviews
                </button>
            </div>
        </section>
    )
}

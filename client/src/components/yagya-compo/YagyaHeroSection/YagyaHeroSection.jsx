import React, { useState, useEffect } from "react"
import { Leaf, Flame, Sparkles, BookOpen, Target, Wallet, ChevronLeft, ChevronRight } from "lucide-react"
// import "../../../../public/images/yagya/hero.png"
// import hero from "../../../../public/images/yagya/hero.png"

// Custom CSS for smooth transitions and hover effects
const customStyles = `
  .carousel-item-fade {
    transition: opacity 0.8s ease-in-out;
  }
  .shine-on-hover {
    transition: all 0.3s ease-in-out;
  }
  .shine-on-hover:hover {
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.7);
    filter: brightness(1.1);
  }
`

// Define the content for the rotating carousel
const CAROUSEL_ITEMS = [
    {
        icon: Flame,
        title: "Cleansing Karma",
        description: "Purify your inner self and remove obstacles with the sacred fire ceremony.",
        color: "text-red-600",
    },
    {
        icon: Target,
        title: "Planetary Harmony",
        description: "Align your life path with divine forces based on your precise astrological chart.",
        color: "text-blue-600",
    },
    {
        icon: Wallet,
        title: "Invite Prosperity",
        description: "Open pathways to wealth, abundance, and holistic well-being in all aspects of life.",
        color: "text-green-600",
    },
    {
        icon: BookOpen,
        title: "Vedic Authenticity",
        description: "Rituals are performed strictly according to ancient Shastras by Kashi Pandits.",
        color: "text-purple-600",
    },
]

const YagyaHeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    // Auto-rotation logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_ITEMS.length)
        }, 5000) // Changes every 5 seconds

        return () => clearInterval(interval)
    }, [])

    const goToNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_ITEMS.length)
    }

    const goToPrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
    }

    const currentItem = CAROUSEL_ITEMS[activeIndex]

    return (
        <section className="font-inter bg- relative flex min-h-screen items-center justify-center overflow-hidden py-20">
            <img src="images/yagya/hero.png" alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
            <style>{customStyles}</style>

            {/* Main Content Container */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
                {/* Headline */}
                <h1 className="mb-5 text-4xl leading-tight font-extrabold text-white md:text-5xl lg:text-6xl">
                    <span className="text-amber-400">Experience Sacred Yagyas</span>
                    <br className="hidden text-white lg:block" /> for Profound Life Change
                </h1>

                {/* CTA Button */}
                <a
                    href="#book"
                    className="shine-on-hover inline-flex transform items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-4 text-xl font-bold text-white shadow-xl transition duration-300 hover:scale-[1.05] focus:ring-4 focus:ring-amber-500/50 focus:outline-none sm:text-2xl"
                >
                    <Leaf className="animate-spin-slow mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Book My Personalized Yagya
                </a>
            </div>
        </section>
    )
}

export default YagyaHeroSection

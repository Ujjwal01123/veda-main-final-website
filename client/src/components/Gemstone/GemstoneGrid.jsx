"use client"
import { useState } from "react"

const allGemstones = [
    {
        name: "YELLOW SAPPHIRE",
        hindi: "(PUKHRAJ)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/yellow_sapphire.png",
    },
    {
        name: "RUBY",
        hindi: "(MANIK)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/ruby.png",
    },
    {
        name: "RED CORAL",
        hindi: "(MOONGA)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/red_coral.png",
    },
    {
        name: "BLUE SAPPHIRE",
        hindi: "(NEELAM)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/neelam.png",
    },
    {
        name: "HESSONITE GARNET",
        hindi: "(GOMED)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/gomet.png",
    },
    {
        name: "EMERALD",
        hindi: "(PANNA)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/emerald.png",
    },
    {
        name: "OPAL",
        hindi: "",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/opal.png",
    },
    {
        name: "PEARL",
        hindi: "(MOTI)",
        src: "https://cdn.dhanshreegems.com/wysiwyg/home/pearl.png",
    },
    {
        name: "CAT'S EYE",
        hindi: "(LEHSUNIA)",
        src: "./Copilot_20251022_182656 - Edited.png",
    },
    {
        name: "DIAMOND",
        hindi: "(HEERA)",
        src: "./Copilot_20251022_182045 - Edited.png",
    },
    // {
    //   name: "TANZANITE",
    //   hindi: "",
    //   src: "https://cdn.dhanshreegems.com/wysiwyg/new/tanzanite_gemstone.png",
    // },
    // {
    //   name: "GARNET",
    //   hindi: "",
    //   src: "https://cdn.dhanshreegems.com/wysiwyg/new/garnet_gemstone.png",
    // },
]

const GemstoneGrid = () => {
    const initialCount = 8
    const loadIncrement = 4

    const [visibleCount, setVisibleCount] = useState(initialCount)

    const loadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + loadIncrement, allGemstones.length))
    }

    const visibleGems = allGemstones.slice(0, visibleCount)
    const showLoadMoreButton = visibleCount < allGemstones.length

    return (
        <section className="mt-5 bg-white py-10 text-center">
            <div className="mb-8 flex items-center justify-center space-x-4">
                <span className="text-2xl text-red-500">🍃</span>
                <h2 className="font-serif text-3xl font-bold tracking-wide text-gray-800 md:text-4xl">Natural Gemstones</h2>

                <span className="text-2xl text-red-500">🍃</span>
            </div>

            <div className="px- grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 md:px-10">
                {visibleGems.map((gem, index) => {
                    const isNewlyLoaded = index >= initialCount
                    const newGemClasses = isNewlyLoaded ? "animate-fadeIn duration-500" : ""
                    const catEyeWrapperClasses = gem.name === "CAT'S EYE" ? "rounded-xl" : ""
                    const baseItemClasses = "flex flex-col items-center transition-transform duration-300 hover:scale-105"

                    return (
                        <div key={index} className={`${baseItemClasses} ${newGemClasses}`}>
                            <div className={`flex h-30 w-full items-center justify-center ${catEyeWrapperClasses}`}>
                                <img src={gem.src} alt={gem.name} className="h-full w-full object-contain" />
                            </div>
                        </div>
                    )
                })}
            </div>

            {showLoadMoreButton && (
                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={loadMore}
                        className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:from-yellow-600 hover:to-orange-600 md:text-xl"
                    >
                        View More Gems
                    </button>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </section>
    )
}

export default GemstoneGrid

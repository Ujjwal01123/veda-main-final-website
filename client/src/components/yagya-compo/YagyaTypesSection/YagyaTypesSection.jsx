import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// YAGYA IMAGES (already imported)
import yt1 from "../../../../public/images/yagya/yt1.jpg"
import yt2 from "../../../../public/images/yagya/yt2.jpg"
import yt3 from "../../../../public/images/yagya/yt3.png"
import yt4 from "../../../../public/images/yagya/yt4.png"
import yt5 from "../../../../public/images/yagya/yt5.png"
import yt6 from "../../../../public/images/yagya/yt6.png"
import yt7 from "../../../../public/images/yagya/yt7.png"
import yt8 from "../../../../public/images/yagya/yt8.png"

const YAGYA_TYPES = [
    { imageUrl: yt1, title: "Navgraha Shanti Yagya", desc: "To balance planetary energies and remove astrological obstacles." },
    { imageUrl: yt2, title: "Mahamrityunjaya Yagya", desc: "For protection, health recovery, and life-extension blessings from Lord Shiva." },
    { imageUrl: yt3, title: "Kaal Sarp Dosh Nivaran Yagya", desc: "To neutralize karmic blockages caused by Rahu-Ketu dosha." },
    { imageUrl: yt4, title: "Baglamukhi Yagya", desc: "For victory in legal, professional, and personal battles; protection from enemies." },
    { imageUrl: yt5, title: "Rudrabhishek Puja", desc: "To invoke Lord Shiva’s grace and peace during difficult Dasha periods." },
    { imageUrl: yt6, title: "Vivah & Relationship Yagya", desc: "For love, marriage harmony, and Manglik dosha balance." },
    { imageUrl: yt7, title: "Lakshmi Narayan Yagya", desc: "For wealth, abundance, and prosperity." },
    { imageUrl: yt8, title: "Pitru Dosh Nivaran Yagya", desc: "To bring peace to ancestors and remove ancestral karmic blocks." },
]

// Animation for dot glow
const customStyles = `
    @keyframes subtleGlow {
        0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
        50% { box-shadow: 0 0 8px rgba(251, 191, 36, 1); }
        100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
    }
    .glow-border {
        animation: subtleGlow 3s infinite alternate;
    }
`

const YagyaTypesSection = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const scrollRef = React.useRef(null)

    const scrollTo = (index) => {
        if (!scrollRef.current) return
        const cardWidth = scrollRef.current.children[0].offsetWidth
        scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" })
        setCurrentIndex(index)
    }

    const nextSlide = () => scrollTo((currentIndex + 1) % YAGYA_TYPES.length)
    const prevSlide = () => scrollTo((currentIndex - 1 + YAGYA_TYPES.length) % YAGYA_TYPES.length)

    // ⭐ UPDATED PREMIUM CARD (Image emerges on top)
    const YagyaCard = ({ imageUrl, title, desc }) => {
        // console.log("ljshf", imageUrl)
        return (
            <div className="w-full flex-shrink-0 snap-center px-4 sm:w-1/2 md:w-1/3 lg:w-full">
                <div className="relative mt-10 rounded-2xl border border-amber-200 bg-white px-6 pt-14 pb-2 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    {/* IMAGE POP-UP CIRCLE */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <div className="h-18 w-18 overflow-hidden rounded-full shadow-lg ring-2 ring-white">
                            <img src={imageUrl.src} className="h-full w-full object-cover" />
                        </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-0 text-lg font-bold text-amber-700">{title}</h3>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
                </div>
            </div>
        )
    }

    return (
        <section className="relative bg-white py-16">
            <style>{customStyles}</style>

            {/* Background soft dots */}
            <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffe8c7 1px, transparent 1px)", backgroundSize: "18px 18px" }}></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-3 text-center text-4xl font-extrabold text-amber-800 md:text-5xl">A Path for Every Need</h2>
                <p className="mx-auto mb-12 max-w-3xl text-center font-serif text-xl text-amber-600">Select the Yagya aligned with your specific spiritual goal, planetary need, or life challenge.</p>

                {/* DESKTOP GRID */}
                <div className="hidden grid-cols-2 gap-8 px-4 md:grid lg:grid-cols-4">
                    {YAGYA_TYPES.map((item, i) => (
                        <YagyaCard key={i} {...item} />
                    ))}
                </div>

                {/* MOBILE CAROUSEL */}
                <div className="lg:hidden">
                    <div
                        ref={scrollRef}
                        className="flex snap-x snap-mandatory space-x-0 overflow-x-scroll pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        onScroll={(e) => {
                            const width = e.target.children[0].offsetWidth
                            const idx = Math.round(e.target.scrollLeft / width)
                            if (idx !== currentIndex) setCurrentIndex(idx)
                        }}
                    >
                        {YAGYA_TYPES.map((item, i) => (
                            <YagyaCard key={i} {...item} />
                        ))}
                    </div>

                    {/* NAVIGATION */}
                    <div className="mt-6 flex items-center justify-center">
                        <button onClick={prevSlide} disabled={currentIndex === 0} className="rounded-full bg-amber-100 p-3 text-amber-700 shadow-md hover:bg-amber-200 disabled:opacity-40">
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* DOTS */}
                        <div className="mx-6 flex space-x-2">
                            {YAGYA_TYPES.map((_, i) => (
                                <div key={i} onClick={() => scrollTo(i)} className={`h-2 w-2 cursor-pointer rounded-full ${i === currentIndex ? "glow-border w-4 bg-amber-700" : "bg-gray-300"}`}></div>
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            disabled={currentIndex === YAGYA_TYPES.length - 1}
                            className="rounded-full bg-amber-100 p-3 text-amber-700 shadow-md hover:bg-amber-200 disabled:opacity-40"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default YagyaTypesSection

// import React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import yt1 from "../../../../public/images/yagya/yt1.jpg"
// import yt2 from "../../../../public/images/yagya/yt2.jpg"
// import yt3 from "../../../../public/images/yagya/yt3.png"
// import yt4 from "../../../../public/images/yagya/yt4.png"
// import yt5 from "../../../../public/images/yagya/yt5.png"
// import yt6 from "../../../../public/images/yagya/yt6.png"
// import yt7 from "../../../../public/images/yagya/yt7.png"
// import yt8 from "../../../../public/images/yagya/yt8.png"

// // --- Placeholder Data Structure with Image URLs ---
// // NOTE: Please replace these placeholder image URLs with the actual paths
// // from your assets folder when integrating this component.
// const YAGYA_TYPES = [
//     {
//         imageUrl: "images/yagya/yt1.jpg",
//         title: "Navgraha Shanti Yagya",
//         desc: "To balance planetary energies and remove astrological obstacles.",
//         bg: "bg-blue-50",
//         hoverBorder: "hover:border-blue-400",
//     },
//     {
//         imageUrl: "images/yagya/yt2.jpg",
//         title: "Mahamrityunjaya Yagya",
//         desc: "For protection, health recovery, and life-extension blessings from Lord Shiva.",
//         bg: "bg-red-50",
//         hoverBorder: "hover:border-red-400",
//     },
//     {
//         imageUrl: "images/yagya/yt3.png",
//         title: "Kaal Sarp Dosh Nivaran Yagya",
//         desc: "To neutralize karmic blockages caused by Rahu-Ketu dosha.",
//         bg: "bg-green-50",
//         hoverBorder: "hover:border-green-400",
//     },
//     {
//         imageUrl: "images/yagya/yt4.png",
//         title: "Baglamukhi Yagya",
//         desc: "For victory in legal, professional, and personal battles; protection from enemies.",
//         bg: "bg-yellow-50",
//         hoverBorder: "hover:border-yellow-400",
//     },
//     {
//         imageUrl: "images/yagya/yt5.png",
//         title: "Rudrabhishek Puja",
//         desc: "To invoke Lord Shiva’s grace and peace during difficult Dasha periods.",
//         bg: "bg-indigo-50",
//         hoverBorder: "hover:border-indigo-400",
//     },
//     {
//         imageUrl: "images/yagya/yt6.png",
//         title: "Vivah & Relationship Yagya",
//         desc: "For love, marriage harmony, and Manglik dosha balance.",
//         bg: "bg-pink-50",
//         hoverBorder: "hover:border-pink-400",
//     },
//     {
//         imageUrl: "images/yagya/yt7.png",
//         title: "Lakshmi Narayan Yagya",
//         desc: "For wealth, abundance, and prosperity.",
//         bg: "bg-teal-50",
//         hoverBorder: "hover:border-teal-400",
//     },
//     {
//         imageUrl: "images/yagya/yt8.png",
//         title: "Pitru Dosh Nivaran Yagya",
//         desc: "To bring peace to ancestors and remove ancestral karmic blocks.",
//         bg: "bg-purple-50",
//         hoverBorder: "hover:border-purple-400",
//     },
// ]

// // Custom CSS for Card Animation (Subtle rotation on hover)
// const customStyles = `
//   /* Glow Animation for Carousel Dot */
//   @keyframes subtleGlow {
//     0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
//     50% { box-shadow: 0 0 10px rgba(251, 191, 36, 0.8); }
//     100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
//   }

//   .glow-border {
//     animation: subtleGlow 4s infinite alternate;
//   }
// `

// const YagyaTypesSection = () => {
//     const [currentIndex, setCurrentIndex] = React.useState(0)
//     const scrollRef = React.useRef(null)

//     // Scroll functions for the mobile carousel effect
//     const scrollTo = (index) => {
//         if (scrollRef.current) {
//             // Find the card width dynamically
//             const cardElement = scrollRef.current.children[0]
//             if (!cardElement) return

//             // We assume each card takes up the full width of the visible container on small screens
//             const cardWidth = cardElement.offsetWidth

//             scrollRef.current.scrollTo({
//                 left: index * cardWidth,
//                 behavior: "smooth",
//             })
//             setCurrentIndex(index)
//         }
//     }

//     const nextSlide = () => {
//         const nextIndex = (currentIndex + 1) % YAGYA_TYPES.length
//         scrollTo(nextIndex)
//     }

//     const prevSlide = () => {
//         const prevIndex = (currentIndex - 1 + YAGYA_TYPES.length) % YAGYA_TYPES.length
//         scrollTo(prevIndex)
//     }

//     // Component for a single Yagya Card
//     const YagyaCard = ({ imageUrl, title, desc, bg, hoverBorder }) => (
//         // w-full on mobile, and responsive fractional widths on tablet/desktop
//         <div className="w-full flex-shrink-0 snap-center p-4 sm:w-1/2 md:w-1/3 lg:w-full">
//             <div
//                 className={`h-full transform cursor-pointer rounded-2xl border-2 border-amber-400 bg-white p-6 shadow-xl transition-all duration-500 hover:scale-[1.05] hover:rotate-z-1 hover:shadow-2xl ${hoverBorder} flex flex-col items-center text-center`}
//             >
//                 {/* Image Container: Added circular background effect */}
//                 <div className={`mb-4 rounded-full p-1 shadow-lg ${bg} border-opacity-50 border border-gray-300`}>
//                     <img
//                         src={imageUrl}
//                         alt={title}
//                         className="h-16 w-16 rounded-full object-cover p-1" // Added padding to separate image from border
//                         onError={(e) => {
//                             // Fallback if the image URL fails (shows a grey circle)
//                             e.target.onerror = null
//                             e.target.src = "https://placehold.co/64x64/ccc/999?text=IMG"
//                         }}
//                     />
//                 </div>
//                 <h3 className="mb-2 text-xl font-extrabold text-amber-400">{title}</h3>
//                 <p className="font-serif text-lg text-amber-600">{desc}</p>
//             </div>
//         </div>
//     )

//     return (
//         <section className="font-inter relative overflow-hidden bg-white">
//             <style>{customStyles}</style>

//             {/* Background Spiritual Ripple Effect (Light Gold/Cream Dots) */}
//             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at center, #fff7ed 1px, transparent 1px)`, backgroundSize: "20px 20px" }}></div>

//             <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <h2 className="mb-4 text-center text-4xl font-extrabold text-amber-800 drop-shadow-sm md:text-5xl">A Path for Every Need</h2>
//                 <p className="mx-auto mb-12 max-w-3xl text-center font-serif text-xl text-amber-600">Select the Yagya aligned with your specific spiritual goal, planetary need, or life challenge.</p>

//                 {/* --- DESKTOP GRID LAYOUT (Large Screens) --- */}
//                 <div className="hidden grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid lg:grid-cols-4">
//                     {YAGYA_TYPES.map((item, index) => (
//                         <YagyaCard key={index} imageUrl={item.imageUrl} title={item.title} desc={item.desc} bg={item.bg} hoverBorder={item.hoverBorder} />
//                     ))}
//                 </div>

//                 {/* --- MOBILE/TABLET CAROUSEL LAYOUT (Small Screens) --- */}
//                 <div className="relative lg:hidden">
//                     {/* Scrollable Container (The actual carousel effect) */}
//                     <div
//                         ref={scrollRef}
//                         className="flex snap-x snap-mandatory space-x-0 overflow-x-scroll pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//                         onScroll={(e) => {
//                             const scrollContainer = e.target
//                             if (!scrollContainer.children[0]) return

//                             const cardWidth = scrollContainer.children[0].offsetWidth
//                             // Calculate the index that is closest to the center of the viewport
//                             const scrollIndex = Math.round(scrollContainer.scrollLeft / cardWidth)
//                             if (scrollIndex !== currentIndex) {
//                                 setCurrentIndex(scrollIndex)
//                             }
//                         }}
//                     >
//                         {YAGYA_TYPES.map((item, index) => (
//                             <YagyaCard key={index} imageUrl={item.imageUrl} title={item.title} desc={item.desc} bg={item.bg} hoverBorder={item.hoverBorder} />
//                         ))}
//                     </div>

//                     {/* Navigation Controls */}
//                     <div className="mt-6 flex items-center justify-center">
//                         <button
//                             onClick={prevSlide}
//                             className="rounded-full bg-amber-100 p-3 text-amber-700 shadow-md transition-colors hover:bg-amber-200 disabled:opacity-50"
//                             disabled={currentIndex === 0}
//                             aria-label="Previous Yagya Type"
//                         >
//                             <ChevronLeft className="h-5 w-5" />
//                         </button>

//                         {/* Dots Indicator */}
//                         <div className="mx-6 flex space-x-2">
//                             {YAGYA_TYPES.map((_, index) => (
//                                 <div
//                                     key={index}
//                                     className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${index === currentIndex ? "glow-border w-4 bg-amber-700" : "bg-gray-300"}`}
//                                     onClick={() => scrollTo(index)}
//                                     aria-label={`Go to slide ${index + 1}`}
//                                 />
//                             ))}
//                         </div>

//                         <button
//                             onClick={nextSlide}
//                             className="rounded-full bg-amber-100 p-3 text-amber-700 shadow-md transition-colors hover:bg-amber-200 disabled:opacity-50"
//                             disabled={currentIndex === YAGYA_TYPES.length - 1}
//                             aria-label="Next Yagya Type"
//                         >
//                             <ChevronRight className="h-5 w-5" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default YagyaTypesSection

import {
    Gem,
    Droplets,
    Sun,
    BadgeCheck,
    Video, // Adding a new icon for the video section
} from "lucide-react"

const MakingProcess = () => {
    const steps = [
        {
            id: 1,
            title: "Gem Selection",
            desc: "We handpick natural, high-quality gemstones from trusted sources.",
            icon: <Gem className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 2,
            title: "Purification",
            desc: "Each gem is purified using sacred mantras and Ganga Jal rituals.",
            icon: <Droplets className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 3,
            title: "Energization in Kashi",
            desc: "Our Vedic Acharyas energize every gem to unlock its divine power.",
            icon: <Sun className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 4,
            title: "Certification",
            // desc: "Each gemstone is certified for authenticity and purity.",
            desc: "Each gemstone is certified for authenticity and purity by recognized labs.",
            icon: <BadgeCheck className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
    ]

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            {/* ===== Video Section Title and Container ===== */}
            <div className="mx-auto mb-12 max-w-7xl px-6 text-center md:px-12">
                <p className="mb-2 text-sm font-semibold tracking-wider text-yellow-600 uppercase">Ancient Wisdom, Modern Craftsmanship</p>
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">Witness the Sacred Transformation</h2>
                <p className="mx-auto max-w-3xl text-lg text-gray-600">See the journey of your gemstone from its natural state to a fully energized, sacred talisman.</p>
            </div>

            {/* Changes for Video Width:
        1. Changed 'max-w-6xl' to 'max-w-full' for a full-width experience within the section padding.
        2. Increased video height for a more cinematic feel.
      */}
            <div className="mx-auto mb-16 max-w-7xl px-4 md:mb-20">
                <div className="w-full overflow-hidden rounded-3xl border-4 border-yellow-100/70 shadow-2xl">
                    <video
                        src="/gemstone/gems.mp4" // Ensure this path is correct
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls // Added controls for better user experience
                        // Increased height on larger screens
                        className="h-[350px] w-full object-cover md:h-[550px]"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* --- */}

            {/* ===== Steps Section ===== */}
            <div className="mx-auto max-w-7xl px-6 text-center md:px-12">
                <h2 className="mb-12 text-3xl font-bold text-yellow-800 md:text-4xl">🔱 The Four Pillars of Sacred Gemstone Making</h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            // Enhanced styling: background color, slight shadow, better border
                            className="flex transform flex-col items-center rounded-xl border border-yellow-200/50 bg-white p-8 text-center shadow-xl transition duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                        >
                            {step.icon}
                            <h3 className="mb-3 text-xl font-bold text-yellow-900">{step.title}</h3>
                            <p className="font-medium text-gray-700">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MakingProcess

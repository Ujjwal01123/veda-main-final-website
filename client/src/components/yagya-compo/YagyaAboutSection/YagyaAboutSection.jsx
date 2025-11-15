import React from "react"
import { Tornado, Sunrise, Flame, Gem, Shield, Heart, Package, Video } from "lucide-react"
import Image from "next/image"

// Define the icons and corresponding color for each highlight
const HIGHLIGHTS = [
    {
        icon: Tornado, // Spiritual icon for Kashi/Shiva (using Tornado as a close visual substitute for Trident/Trishula)
        title: "Kashi Pandit Expertise",
        desc: "Performed by authentic Kashi Pandits with 15+ years of experience.",
        color: "text-amber-700",
        bg: "bg-amber-100",
    },
    {
        icon: Sunrise, // Icon for timing/personalization
        title: "Personalized Alignment",
        desc: "Rituals customized as per your birth details and planetary doshas (afflictions).",
        color: "text-red-700",
        bg: "bg-red-100",
    },
    {
        icon: Flame, // Icon for the ritual location
        title: "Sacred Location Conduct",
        desc: "Conducted in the sacred locations of Kashi (Varanasi) or Trimbakeshwar.",
        color: "text-orange-700",
        bg: "bg-orange-100",
    },
    {
        icon: Video, // Icon for digital inclusion
        title: "Digital & Live Inclusion",
        desc: "Includes live video access, Sankalp (vow), and a comprehensive completion report.",
        color: "text-blue-700",
        bg: "bg-blue-100",
    },
    {
        icon: Heart, // Icon for comprehensive coverage
        title: "Holistic Life Coverage",
        desc: "Covers all life aspects—health, protection, success, peace, and karma healing.",
        color: "text-green-700",
        bg: "bg-green-100",
    },
    {
        icon: Package, // Icon for physical deliverables
        title: "Energized Prasadam",
        desc: "Receive divine Prasadam and specially energized spiritual items shipped to your home.",
        color: "text-purple-700",
        bg: "bg-purple-100",
    },
]

// Custom CSS for animations
const customStyles = `
  /* Subtle heartbeat pulse for the main section to indicate life/energy */
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.005); }
  }

  .section-pulse {
    animation: heartbeat 20s infinite ease-in-out;
  }
`

const YagyaAboutSection = () => {
    // Component for a single highlight card
    const HighlightCard = ({ icon: Icon, title, desc, color, bg }) => (
        <div
            className={`transform cursor-default rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${bg} border-t-4 border-b-4 border-transparent hover:border-amber-400`}
        >
            <Icon className={`mb-3 h-8 w-8 ${color} drop-shadow-md`} strokeWidth={2.5} />
            <h3 className="mb-1 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
        </div>
    )

    return (
        <section className="section-pulse font-inter relative overflow-hidden bg-white">
            <style>{customStyles}</style>

            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100"><path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35Z" fill="%23fcdbaf" opacity="0.5"/></svg>')`,
                    backgroundSize: "80px 80px",
                }}
            ></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="mb-16 text-center text-4xl font-extrabold text-amber-800 drop-shadow-md md:text-5xl">Understanding the Sacred Yagya</h2>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* LEFT SECTION */}
                    <div className="space-y-4">
                        <h3 className="flex items-center text-3xl font-bold text-amber-700">
                            <Shield className="mr-3 h-7 w-7 text-amber-500" />
                            What is a Vedic Yagya?
                        </h3>

                        <p className="text-lg leading-relaxed text-gray-700">
                            A Yagya (Yajna) is an ancient Vedic ritual that connects you directly with the cosmic forces. It is not just an offering, but a profound spiritual technology for divine
                            intervention.
                        </p>

                        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 shadow-sm">
                            <p className="text-xl leading-relaxed font-semibold text-amber-600 italic">
                                "Through the power of fire, mantra, and intention, Yagya invokes divine blessings to heal, protect, and empower your life."
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-700">
                            Every Yagya performed through Veda Structure is based on authentic Vedic scriptures — conducted by qualified Pandits from Kashi, trained in the Maharishi & Kashi tradition.
                            This guarantees the purity and efficacy of your ritual.
                        </p>
                    </div>

                    {/* RIGHT SECTION - NEW MODERN GRID */}
                    <div>
                        <h3 className="mb-4 flex items-center text-2xl font-bold text-amber-700">
                            <Gem className="mr-3 h-6 w-6 text-amber-500" />
                            Divine Transformation Highlights
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {HIGHLIGHTS.map((item, index) => (
                                <div key={index} className="rounded-lg border border-amber-100 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                    <div className="mb-2 flex items-center">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${item.bg}`}>
                                            <item.icon className={`h-5 w-5 ${item.color}`} />
                                        </div>
                                        <h4 className="ml-2 text-base font-semibold text-amber-700">{item.title}</h4>
                                    </div>
                                    <p className="text-xs leading-relaxed text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default YagyaAboutSection

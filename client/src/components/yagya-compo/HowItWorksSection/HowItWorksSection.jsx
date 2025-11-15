import React from "react"
import { User, ScrollText, Flame, MonitorPlay, Package, ArrowRight, Sun } from "lucide-react"

// Map of all imported icons for reliable string-based rendering
const IconMap = { User, ScrollText, Flame, MonitorPlay, Package, ArrowRight, Sun }

// Define the steps and map them to appropriate spiritual icons
const STEPS = [
    {
        iconName: "User",
        title: "Share Your Sankalp & Details",
        desc: "Provide your birth details and the specific purpose (Sankalp) for which the Yagya is being performed.",
        color: "text-amber-700",
        bg: "bg-amber-100",
        ring: "ring-amber-500",
    },
    {
        iconName: "ScrollText",
        title: "Pandits Prepare Muhurat",
        desc: "Our Kashi Pandits analyze your Kundali to prepare your specific Sankalp and determine the most auspicious time (Muhurat).",
        color: "text-red-700",
        bg: "bg-red-100",
        ring: "ring-red-500",
    },
    {
        iconName: "Flame", // Sacred fire element
        title: "Yagya Conducted at Sacred Site",
        desc: "The ritual is performed live and authentically in Kashi or Trimbakeshwar, channeling potent spiritual energy.",
        color: "text-yellow-700",
        bg: "bg-yellow-100",
        ring: "ring-yellow-600",
    },
    {
        iconName: "MonitorPlay",
        title: "Receive Video & Report",
        desc: "Witness the ceremony live via video and get a detailed completion report of the proceedings and mantras chanted.",
        color: "text-teal-700",
        bg: "bg-teal-100",
        ring: "ring-teal-500",
    },
    {
        iconName: "Package",
        title: "Prasadam & Blessings at Home",
        desc: "The sacred Prasadam (blessed offerings) and energized Yantra are securely dispatched to your address.",
        color: "text-sky-700",
        bg: "bg-sky-100",
        ring: "ring-sky-500",
    },
]

// Custom CSS for enhanced aesthetics and animations in LIGHT MODE
const customStyles = `
  /* Subtle text effect for the light background */
  .luminous-text-light {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  /* Keyframes for the golden pulsing arrow connector */
  @keyframes pulseGlow {
    0%, 100% { transform: scale(0.95); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  .arrow-pulse {
    animation: pulseGlow 2s infinite ease-in-out;
  }
  
  /* Keyframes for the staggered entry animation */
  @keyframes slideUpFadeIn {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-stagger-in {
    animation: slideUpFadeIn 0.8s ease-out forwards;
    opacity: 0; /* Ensures starting state is hidden */
  }

  /* Applying delays for staggered effect (0.1s increment) */
  .animate-delay-0 { animation-delay: 0s; }
  .animate-delay-1 { animation-delay: 0.1s; }
  .animate-delay-2 { animation-delay: 0.2s; }
  .animate-delay-3 { animation-delay: 0.3s; }
  .animate-delay-4 { animation-delay: 0.4s; }

  /* Vertical Dotted Line for Mobile */
  .vertical-timeline {
    background-image: linear-gradient(to bottom, #d97706 50%, transparent 50%);
    background-size: 100% 16px;
    background-repeat: repeat-y;
  }
`

const SpiritualSteps = () => {
    return (
        // Section using a soft spiritual amber background
        <section className="font-inter relative overflow-hidden bg-amber-50 py-16 md:py-24">
            <style>{customStyles}</style>

            {/* Subtle Background pattern: Stars/Dots */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at center, #fef3c7 1px, transparent 1px)`, backgroundSize: "40px 40px" }}></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header - Dark Text Look */}
                <div className="mb-16 text-center">
                    <h2 className="mb-2 text-sm font-bold tracking-widest text-amber-700 uppercase md:text-base">The Sacred Path</h2>
                    <h1 className="luminous-text-light text-4xl font-extrabold text-amber-400 drop-shadow-sm md:text-6xl">How Your Yagya Is Performed</h1>
                </div>

                {/* Desktop/Horizontal Flow (Grid) */}
                <div className="relative hidden grid-cols-5 justify-center gap-4 lg:grid xl:gap-0">
                    {STEPS.map((step, index) => {
                        const IconComponent = IconMap[step.iconName]
                        const delayClass = `animate-delay-${index}`

                        return (
                            <div key={index} className={`animate-stagger-in relative flex flex-col items-center px-2 text-center ${delayClass} `}>
                                {/* ICON CONTAINER & GLOW */}
                                <div className="relative z-20">
                                    <div
                                        className={`mb-4 flex transform items-center justify-center rounded-full p-6 shadow-xl transition-all duration-500 ${step.bg} ring-8 ${step.ring.replace("500", "300")} `}
                                    >
                                        {IconComponent && <IconComponent className={`h-10 w-10 ${step.color}`} />}
                                    </div>
                                </div>

                                {/* Step Title and Description */}
                                <h3 className="luminous-text-light mt-2 mb-2 text-xl font-bold text-amber-700">{`Step ${index + 1}: ${step.title}`}</h3>
                                <p className="max-w-xs px-1 text-sm text-gray-700">{step.desc}</p>

                                {/* Horizontal Arrow Connector */}
                                {index < STEPS.length - 1 && (
                                    <div className="absolute top-[38px] right-[-10%] z-5 flex w-[20%] items-center justify-center">
                                        <ArrowRight className={`arrow-pulse h-10 w-10 text-amber-600`} style={{ animationDelay: `${index * 0.4}s` }} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Mobile/Vertical Timeline Flow */}
                <div className="relative pt-4 lg:hidden">
                    {/* Vertical Dotted Line */}
                    <div className="vertical-timeline absolute top-0 bottom-0 left-4 z-0 w-1"></div>

                    <div className="space-y-10">
                        {STEPS.map((step, index) => {
                            const IconComponent = IconMap[step.iconName]

                            return (
                                <div key={index} className="animate-stagger-in animate-delay-0 flex items-start">
                                    {/* Step Number & Icon Indicator (Left side) */}
                                    <div className="z-10 mr-4 flex flex-col items-center">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold shadow-lg ${step.bg} ring-4 ${step.ring.replace("500", "300")} text-gray-900`}
                                        >
                                            {IconComponent && <IconComponent className={`h-5 w-5 ${step.color}`} strokeWidth={2.5} />}
                                        </div>
                                    </div>

                                    {/* Step Content Card (Right side) */}
                                    <div className={`card-glow flex-1 rounded-xl border-l-4 border-amber-600 bg-white p-5 shadow-xl`}>
                                        <h3 className={`text-xl font-bold ${step.color} luminous-text-light mb-1`}>{`Step ${index + 1}: ${step.title}`}</h3>
                                        <p className="text-sm text-gray-700">{step.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpiritualSteps

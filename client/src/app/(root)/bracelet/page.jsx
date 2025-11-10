import BookSection from "@/components/Bracelet/BookSection"
import BraceletCard from "@/components/Bracelet/BraceletCard"
import BraceletGenstone from "@/components/Bracelet/BraceletGenstone"
import BraceletBanner from "@/components/Bracelet/BraceletBanner"
import React from "react"
import {
    Gem,
    Droplets,
    Sun,
    BadgeCheck,
    Globe,
    RefreshCw,
    Handshake,
    // Removed unused import: Video
} from "lucide-react"

// import Download from '@/components/Download'

export default function Bracelet() {
    const steps = [
        {
            id: 1,
            title: "100% Genuine & Lab Certified",
            icon: <Handshake className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 2,
            title: "Certificate of Authenticity",
            icon: <BadgeCheck className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 3,
            title: "Lifetime Repair",
            icon: <Droplets className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 4,
            title: "Secure Packaging",
            icon: <Sun className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 5,
            title: "Worldwide Shipping",
            // Using Globe for shipping
            icon: <Globe className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 6,
            title: "Easy Return Guarantee",
            // Using RefreshCw for returns/guarantee
            icon: <RefreshCw className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
    ]

    return (
        <>
            <BraceletBanner />
            {/* <div>
                <img src="/images/Artboard-1.jpg" className='max-h-[560px] w-full overflow-hidden object-cover object-center' alt="" />
            </div> */}
            <BraceletCard />
            <BraceletGenstone />
            <BookSection />
            {/* <Download /> */}
            <section className="bg-gray-50 py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-6 text-center md:px-12">
                    {/* ===== Header Section (Centered) ===== */}
                    <h2 className="mb-10 text-3xl font-bold text-yellow-800 md:text-4xl">🔱 Why Choose Veda Structure Bracelets?</h2>

                    {/* ===== Responsive Grid Card Section (Single Line on Desktop)  ===== 
          - On mobile (default): 2 columns
          - On medium screens (sm/md): 3 columns
          - On large screens (lg): 6 columns (single row), with reduced gap (lg:gap-6) for max width
        */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                // p-6 and text-lg remain for size, and grid handles the width
                                className="flex h-full transform flex-col items-center rounded-xl border border-yellow-200/50 bg-white p-6 text-center shadow-lg transition duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl"
                            >
                                {step.icon}
                                <h3 className="mb-2 text-lg leading-snug font-bold text-yellow-900">{step.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

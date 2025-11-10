import RudraBanner from "@/components/Rudraksha/RudraBanner"
import RudraCategory from "@/components/Rudraksha/RudraCategory"
import RudraProducts from "@/components/Rudraksha/RudraProducts"
import RudraSlider from "@/components/Rudraksha/RudraSlider"

import React from "react"
import {
    Gem,
    Droplets,
    Sun,
    BadgeCheck,
    Globe,
    RefreshCw,
    // Removed unused import: Video
} from "lucide-react"
import { FaOm } from "react-icons/fa"

export default function page() {
    const steps = [
        {
            id: 1,
            title: "100% Original Nepali Rudraksha",
            icon: <FaOm className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 2,
            title: "Lab Certified & Tested",
            icon: <BadgeCheck className="mx-auto mb-4 h-10 w-10 text-yellow-600" />,
        },
        {
            id: 3,
            title: "Energised & Purified",
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
            <RudraBanner />
            <RudraProducts />
            <RudraCategory />
            <RudraSlider />
            <section className="mx-auto mt-20 max-w-4xl px-4">
                <h4 className="mb-4 text-center text-3xl font-semibold text-[#b9924e]">Frequently Asked Questions</h4>
                <div className="space-y-4">
                    <div className="collapse-arrow bg-base-100 collapse rounded-xl border border-yellow-200">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-semibold">How do I create an account?</div>
                        <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div className="collapse-arrow bg-base-100 collapse rounded-xl border border-yellow-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                        <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div className="collapse-arrow bg-base-100 collapse rounded-xl border border-yellow-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update my profile information?</div>
                        <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-6 text-center md:px-12">
                    {/* ===== Header Section (Centered) ===== */}
                    <h2 className="mb-10 text-3xl font-bold text-yellow-800 md:text-4xl">🌿 Why Buy Rudraksha from Veda Structure?</h2>

                    {/* ===== Responsive Grid Card Section (Single Line on Desktop)  🔱 ===== 
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

            {/* <section class="mx-auto mt-16 max-w-5xl rounded-2xl bg-gradient-to-b from-yellow-50 via-orange-50 to-yellow-100 px-6 py-12 text-gray-800 shadow-lg">
                <div class="mb-8 text-center">
                    <h2 class="text-3xl font-extrabold text-yellow-700">✅ Trust Badges / Short Points Section</h2>
                    <p class="mt-2 text-lg font-medium text-gray-700">100% Original Nepali Rudraksha</p>
                </div>

                <h3 class="mb-6 text-center text-2xl font-bold text-yellow-700">🌿 Why Buy Rudraksha from Veda Structure?</h3>

                <ul class="space-y-4 text-base leading-relaxed">
                    <li>
                        ✅ <strong>100% Original Nepali Rudraksha</strong> – Directly sourced from Nepal
                    </li>
                    <li>
                        ✅ <strong>Lab Certified & Tested</strong> – Every bead comes with a certificate of authenticity
                    </li>
                    <li>
                        ✅ <strong>Energised & Purified</strong> – Charged with Vedic mantras before delivery
                    </li>
                    <li>
                        ✅ <strong>Secure Packaging</strong> – Delivered in tamper-proof, protective packing
                    </li>
                    <li>
                        ✅ <strong>Worldwide Shipping</strong> – From Kashi (Varanasi) to anywhere in the world
                    </li>
                    <li>
                        ✅ <strong>Easy Return Guarantee</strong> – Hassle-free replacement if authenticity is ever doubted
                    </li>
                </ul>

                <p class="mt-8 border-t border-yellow-300 pt-4 text-sm text-gray-700 italic">
                    📜 <strong>Note:</strong> Rudraksha beads are sacred spiritual products. Effects may vary as every individual’s journey is unique.
                </p>
            </section> */}
        </>
    )
}

"use client"
import { useState } from "react"

const faqs = [
    {
        question: "How do I know which gemstone suits me?",
        answer: "You can find your gemstone based on your astrological chart (Kundali) and planetary positions. Our experts guide you through the process.",
    },
    {
        question: "Can I wear multiple gemstones together?",
        answer: "Yes, but it's recommended to consult an astrologer first, as some combinations may affect the energies of the stones.",
    },
    {
        question: "Are your stones lab-certified?",
        answer: "Absolutely! All our gemstones come with proper certification to verify their authenticity and quality.",
    },
    {
        question: "How long does energization take?",
        answer: "Energization is done using traditional Vedic rituals. Depending on the type of gemstone, it usually takes 1–3 hours per stone.",
    },
]

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-4xl px-6">
                {/* Decorative Header like NaturalGemstoneHeader */}
                <div className="mb-12 flex w-full flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl text-red-500">🍃</span>
                        <h2 className="font-serif text-3xl font-bold text-gray-800 md:text-4xl">🌸 Frequently Asked Questions</h2>
                        <span className="text-2xl text-red-500">🍃</span>
                    </div>

                    {/* Gradient Bar */}
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-4 rounded-sm bg-red-500 shadow-md"></div>
                        <div className="h-2 w-48 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 shadow-md"></div>
                        <div className="h-2 w-4 rounded-sm bg-red-500 shadow-md"></div>
                    </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="cursor-pointer rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl" onClick={() => toggleFAQ(index)}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800 md:text-xl">{faq.question}</h3>
                                <span className="text-2xl font-bold text-yellow-500">{openIndex === index ? "−" : "+"}</span>
                            </div>

                            {openIndex === index && <p className="mt-4 text-sm text-gray-600 md:text-base">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQSection

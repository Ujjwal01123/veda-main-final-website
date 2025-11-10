import { useState } from "react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

// Note: 'Link' is imported but not used in this component.
// You might need it if you plan to link the 'Details' button.
import { Link } from "react-router-dom"

export default function Hero() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        AOS.init({ once: true })
    }, [])

    const nextStep = () => setStep((s) => Math.min(s + 1, 3))
    const prevStep = () => setStep((s) => Math.max(s - 1, 1))

    // Reset step to 1 when popup opens
    const openPopup = () => {
        setStep(1) // Reset to first step
        setIsPopupOpen(true)
    }

    return (
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
            {" "}
            {/* Added pb-24 for spacing from fixed button */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* LEFT CONTENT */}
                <div className="space-y-8" data-aos="fade-right" data-aos-duration="1200">
                    {/* Tagline */}
                    <div
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-orange-200/70 bg-gradient-to-r from-orange-100/90 to-yellow-100/90 px-6 py-2.5 text-base font-bold tracking-wide text-orange-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)]"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <span className="absolute inset-0 translate-x-[-150%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]"></span>
                        <span className="absolute inset-0 rounded-full ring-2 ring-orange-300/40"></span>
                        <span className="relative z-10">Popular • 24/7 Bookings</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-6xl" data-aos="fade-up" data-aos-delay="400">
                        Transform Your Home <br />
                        <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">with Sacred Puja</span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-lg text-lg leading-relaxed text-gray-600" data-aos="fade-up" data-aos-delay="600">
                        Professional priests, authentic rituals and live sessions. Choose a puja package &amp; we’ll take care of everything — decorations, prasad, and digital certificates.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={openPopup}
                            className="inline-flex transform items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                        >
                            Enquire Puja →
                        </button>
                        <button
                            onClick={openPopup}
                            className="inline-flex transform items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                        >
                            Enquire Yagya →
                        </button>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex items-center gap-4 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur-md transition hover:shadow-lg" data-aos="flip-left" data-aos-delay="1000">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-200 text-xl font-bold text-orange-600">
                                🕉️
                            </div>
                            <div>
                                <div className="font-semibold">Authentic Vedic</div>
                                <div className="text-sm text-gray-500">Priests with proper lineage</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur-md transition hover:shadow-lg">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-100 to-orange-200 text-xl font-bold text-yellow-600">
                                ★
                            </div>
                            <div>
                                <div className="font-semibold">Instant Booking</div>
                                <div className="text-sm text-gray-500">Slots available 24/7</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative mt-12 lg:mt-0" data-aos="fade-left" data-aos-duration="1200">
                    <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-orange-100">
                        <img
                            src="/images/Pujasection.png" // Make sure this path is correct
                            alt="Pandits performing puja"
                            className="h-auto max-h-[480px] w-full object-cover brightness-95 transition duration-500 hover:scale-105 lg:h-[420px]"
                        />
                        {/* The image from the screenshot had a different image */}
                        {/* You might want to use: src="httpsNext_Available_Image.png" */}
                    </div>

                    {/* Floating Card */}
                    <div
                        className="absolute -bottom-10 left-1/2 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-orange-100 bg-white/90 p-5 shadow-xl backdrop-blur-xl lg:left-6 lg:w-80 lg:-translate-x-0"
                        data-aos="zoom-in-up"
                        data-aos-delay="600"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-500">Next Available</div>
                                <div className="font-semibold">Tomorrow • 10:00 AM</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-orange-600">₹499</div>
                                <div className="text-xs text-gray-500">Starting from</div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => setIsDetailsOpen(true)}
                                className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-orange-50"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- FIXED ENQUIRE NOW BUTTON --- */}
            <button
                onClick={openPopup}
                className="fixed bottom-5 left-1/2 z-40 inline-flex -translate-x-1/2 transform items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
                <span>Enquire Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {/* --- BOOKING / ENQUIRY POPUP --- */}
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-xl rounded-2xl border border-orange-200/50 bg-white p-6 shadow-2xl sm:p-8" data-aos="zoom-in" data-aos-duration="300">
                        <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-red-500">
                            &times;
                        </button>

                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-orange-500 sm:text-3xl">Booking / Enquiry Form</h2>
                            <p className="mt-1 text-sm text-gray-500">Please fill out the form to make an enquiry.</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 sm:mb-8">
                            <div className={`flex-1 border-b-4 py-2 text-center ${step === 1 ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400"} font-semibold transition-all`}>
                                Details
                            </div>
                            <div className={`flex-1 border-b-4 py-2 text-center ${step === 2 ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400"} font-semibold transition-all`}>
                                Schedule
                            </div>
                            <div className={`flex-1 border-b-4 py-2 text-center ${step === 3 ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400"} font-semibold transition-all`}>
                                Confirm
                            </div>
                        </div>

                        {/* --- FORM STEPS --- */}

                        {/* STEP 1: Details */}
                        {step === 1 && (
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    nextStep()
                                }}
                            >
                                <input type="text" placeholder="Full Name" required className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <input type="text" placeholder="Country" required className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                    <input type="text" placeholder="City" required className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                    <input type="tel" placeholder="Phone" required className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                    <input type="email" placeholder="Email" required className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3 font-semibold text-white shadow-md transition hover:scale-105">
                                        Next →
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STEP 2: Schedule */}
                        {step === 2 && (
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    nextStep()
                                }}
                            >
                                <select required className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                                    <option value="">-- Choose Puja Name --</option>
                                    <option>Ganesh Puja</option>
                                    <option>Durga Puja</option>
                                    <option>Lakshmi Puja</option>
                                    <option>Satyanarayan Puja</option>
                                    <option>Other</option>
                                </select>

                                <div>
                                    <label className="text-sm font-medium text-gray-600">Choose your preferred day(s) (Select 1 to 3)</label>
                                    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <input
                                            type="text"
                                            placeholder="dd-mm-yyyy"
                                            required
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                            className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="dd-mm-yyyy"
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                            className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="dd-mm-yyyy"
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                            className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Temple / Address (if applicable)"
                                    className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                                <input
                                    type="text"
                                    defaultValue="Kashi / Varanasi"
                                    placeholder="Holy Place"
                                    className="w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                />

                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={prevStep} className="rounded-lg bg-gray-200 px-8 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-300">
                                        ← Back
                                    </button>
                                    <button type="submit" className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3 font-semibold text-white shadow-md transition hover:scale-105">
                                        Next →
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STEP 3: Confirm */}
                        {step === 3 && (
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    alert("Enquiry Submitted!") // Placeholder action
                                    setIsPopupOpen(false)
                                }}
                            >
                                <textarea
                                    rows="5"
                                    className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Any special requests or details..."
                                ></textarea>
                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={prevStep} className="rounded-lg bg-gray-200 px-8 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-300">
                                        ← Back
                                    </button>
                                    <button type="submit" className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3 font-semibold text-white shadow-md transition hover:scale-105">
                                        Submit Enquiry
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
            {/* --- DETAILS MODAL (Unchanged) --- */}
            {isDetailsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-3xl border border-orange-200/50 bg-white/95 p-8 shadow-2xl" data-aos="zoom-in" data-aos-duration="300">
                        <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-red-500">
                            &times;
                        </button>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 p-3 text-2xl text-white shadow-md">📖</div>
                            <h3 className="text-2xl font-extrabold text-gray-800">Puja Details</h3>
                        </div>
                        <div className="divide-y divide-orange-100">
                            <div className="py-3">
                                <h4 className="font-semibold text-orange-600">✨ Rituals</h4>
                                <p className="mt-1 text-gray-700">
                                    Performed authentically by <span className="font-semibold">Vedic priests</span>.
                                </p>
                            </div>
                            <div className="py-3">
                                <h4 className="font-semibold text-orange-600">🙏 Benefits</h4>
                                <p className="mt-1 text-gray-700">
                                    Includes <span className="font-semibold">Prasad</span>, blessings & digital certificate.
                                </p>
                            </div>
                            <div className="py-3">
                                <h4 className="font-semibold text-orange-600">📺 Access</h4>
                                <p className="mt-1 text-gray-700">
                                    Join <span className="font-semibold">live</span> or watch later anytime.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 rounded-2xl border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50 p-5 shadow-sm">
                            <h4 className="mb-2 font-bold text-orange-600">Key Highlights:</h4>
                            <ul className="list-inside list-disc space-y-1 text-gray-700">
                                <li>✔️ Experienced Pandits</li>
                                <li>✔️ All Samagri & Items included</li>
                                <li>✔️ Personalized Sankalp for your family</li>
                                <li>✔️ Digital Certificate & Prasad Delivery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

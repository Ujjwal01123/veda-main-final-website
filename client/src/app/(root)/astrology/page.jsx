import AstrologyForm from "@/components/AstrologyForm"
import Link from "next/link"

function page() {
    return (
        <>
            <div className="bg-gray-50 min-h-screen">

                {/* HERO */}
                <section className="text-center py-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Become an Astrologer</h1>
                    <p className="max-w-2xl mx-auto text-lg mb-6">
                        Share your wisdom, guide seekers, and grow with us.
                        Join our global network of trusted astrologers today.
                    </p>
                    <a
                        href="#register-form"
                        className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
                    >
                        Get Started
                    </a>
                </section>

                {/* WHY JOIN */}
                <section className="py-20 max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Join Us?</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">

                        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                            <span className="text-4xl">🌍</span>
                            <h3 className="mt-4 font-semibold text-lg">Global Reach</h3>
                            <p className="text-gray-600 mt-2">Connect with seekers worldwide.</p>
                        </div>

                        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                            <span className="text-4xl">💸</span>
                            <h3 className="mt-4 font-semibold text-lg">Earn & Grow</h3>
                            <p className="text-gray-600 mt-2">Transparent payouts and rewards.</p>
                        </div>

                        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                            <span className="text-4xl">🧘</span>
                            <h3 className="mt-4 font-semibold text-lg">Work Flexibly</h3>
                            <p className="text-gray-600 mt-2">Set your own schedule anywhere.</p>
                        </div>

                        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
                            <span className="text-4xl">🔒</span>
                            <h3 className="mt-4 font-semibold text-lg">Trusted & Secure</h3>
                            <p className="text-gray-600 mt-2">Safe platform with full support.</p>
                        </div>

                    </div>
                </section>
                <AstrologyForm />
                <section className="text-center py-16 bg-white shadow-inner">
                    <p className="text-lg mb-4 text-gray-700">Have any questions? We are here to help.</p>
                    <Link
                        href="/Contact"
                        className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
                    >
                        Contact Us
                    </Link>
                </section>

            </div>
        </>
    )
}

export default page

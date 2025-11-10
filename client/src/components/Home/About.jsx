import React from 'react'

export default function About() {
    return (
        <section className="relative py-16 px-6 bg-gray-50 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div
                    className="relative flex justify-center items-center"
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                >
                    <img
                        src="/images/about-us.png"
                        className="w-full max-w-xs sm:max-w-md md:max-w-[600px] h-65 sm:h-64 md:h-[450px] object-cover rounded-2xl"
                        alt="About Us"
                    />
                    <div
                        className="absolute top-0 left-0 w-full h-full rounded-full"
                        data-aos="zoom-in-up"
                        data-aos-delay="300"
                    >
                        <img
                            src="/images/Veda.png"
                            alt="logo"
                            className="absolute -top-2 left-3/4 -translate-x-1/2 rounded-full 
               bg-white border-[3px] border-[#f4b61e] shadow-md 
               animate-bounce w-16 h-16 sm:w-20 sm:h-20 md:w-[110px] md:h-[110px]"
                        />
                    </div>
                </div>

                <div className="space-y-6" data-aos="fade-left" data-aos-duration="1200">
                    <div className="relative" data-aos="fade-down" data-aos-delay="200">
                        <h4 className="text-yellow-500 font-semibold">About us</h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Veda Structure
                        </h2>
                    </div>

                    <p
                        className="text-gray-600 leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Veda Structure is your one-stop rudraksha for all astrology needs.
                        Established in 2022, we are a team of highly qualified astrologers, pundits,
                        and experts dedicated to providing a safe, efficient, pleasant, and
                        personalized experience in the field of astrology, numerology, horoscope
                        prediction, Vedic Puja and various related products.
                    </p>

                    <div className="flex gap-6 flex-wrap" data-aos="fade-up" data-aos-delay="600">
                        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                            <span className="text-yellow-600 text-xl">🔮</span>
                            <span className="text-sm font-medium text-yellow-700">
                                Astrology Products & Remedies
                            </span>
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                            <span className="text-yellow-600 text-xl">📜</span>
                            <span className="text-sm font-medium text-yellow-700">
                                Personalized Reports & Puja Services
                            </span>
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 font-semibold"
                        data-aos="zoom-in"
                        data-aos-delay="800"
                    >
                        Read More <span>→</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

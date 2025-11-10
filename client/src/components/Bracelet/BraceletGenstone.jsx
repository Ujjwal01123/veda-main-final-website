export default function BraceletGenstone() {
    return (
        <section className="px-6 py-10 bg-gradient-to-b from-yellow-50 to-orange-50 ">
            {/* Heading */}
            <div className="text-center mb-12" data-aos="fade-down">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                    Bracelets That Define You
                </h2>
                <p
                    className="text-gray-700 mt-3 text-lg max-w-2xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Explore the range of exquisite designs that blend elegance with modern style.
                </p>
            </div>

            {/* Top Big Banner */}
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-10" data-aos="zoom-in">
                <img
                    src="/images/Hand1.jpg"
                    alt="Bracelet Collection"
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div
                    className="absolute bottom-10 left-10 text-white"
                    data-aos="fade-left"
                    data-aos-delay="300"
                >
                    <h2 className="text-4xl font-bold">Bracelet Collection</h2>
                    <p className="mt-2 text-lg">A Range of Exquisite Bracelets</p>
                    <button className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-white transition">
                        SHOP BRACELETS
                    </button>
                </div>
            </div>

            {/* 4 Grid Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Block 1 - Image (fade) */}
                <div
                    className="relative group rounded-xl overflow-hidden shadow-md"
                    data-aos="fade-up"
                >
                    <img
                        src="/images/braclete1.jpg"
                        alt="Gold Bracelet"
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-bold">Gold Bracelets</h3>
                        <button className="mt-2 bg-white/80 text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-400 hover:text-white transition">
                            SHOP NOW
                        </button>
                    </div>
                </div>

                {/* Block 2 - Video (flip) */}
                <div
                    className="relative group rounded-xl overflow-hidden shadow-md"
                    data-aos="flip-left"
                    data-aos-delay="150"
                >
                    <video
                        src="/images/gemsto.mp4"
                        autoPlay
                        loop
                        muted
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    ></video>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-bold">Silver Bracelets</h3>
                        <button className="mt-2 bg-white/80 text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-400 hover:text-white transition">
                            SHOP NOW
                        </button>
                    </div>
                </div>

                {/* Block 3 - Image (fade) */}
                <div
                    className="relative group rounded-xl overflow-hidden shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <img
                        src="/images/braclete2.jpg"
                        alt="Designer Bracelet"
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-bold">Designer Bracelets</h3>
                        <button className="mt-2 bg-white/80 text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-400 hover:text-white transition">
                            SHOP NOW
                        </button>
                    </div>
                </div>

                {/* Block 4 - Video (flip) */}
                <div
                    className="relative group rounded-xl overflow-hidden shadow-md"
                    data-aos="flip-right"
                    data-aos-delay="450"
                >
                    <video
                        src="/images/gemstone.mp4"
                        autoPlay
                        loop
                        muted
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    ></video>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-bold">Stone Bracelets</h3>
                        <button className="mt-2 bg-white/80 text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-400 hover:text-white transition">
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

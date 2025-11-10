import React from 'react'

export default function RudraCategory() {
    return (
        <>
            {' '}
            <section className="py-16 bg-gray-50" data-aos="zoom-in-up">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2
                            className="text-4xl font-bold text-gray-800"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            Product Categories
                        </h2>
                        <p className="text-gray-600 mt-3" data-aos="fade-down" data-aos-delay="200">
                            Discover the Essence: Explore our diverse product categories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div
                            className="relative rounded-xl overflow-hidden shadow-lg group"
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-80 transform transition duration-700 group-hover:scale-110">
                                <img src="images/p1.jpg" className="object-cover w-full h-full" />
                                <img src="images/p2.jpg" className="object-cover w-full h-full" />
                                <img src="images/p3.jpg" className="object-cover w-full h-full" />
                                <img src="images/p4.jpg" className="object-cover w-full h-full" />
                                <img src="images/p5.jpg" className="object-cover w-full h-full" />
                                <img src="images/p6.jpg" className="object-cover w-full h-full" />
                                <img src="images/m5.jpg" className="object-cover w-full h-full" />
                                <img src="images/p8.jpg" className="object-cover w-full h-full" />
                                <img src="images/p9.jpg" className="object-cover w-full h-full" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold">
                                    <a href="rudraksha.html">All Rudraksha</a>
                                </h3>
                            </div>
                        </div>

                        <div
                            className="relative rounded-xl overflow-hidden shadow-lg group"
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >
                            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-80 transform transition duration-700 group-hover:scale-110">
                                <img src="images/m1.jpg" className="object-cover w-full h-full" />
                                <img src="images/m2.jpg" className="object-cover w-full h-full" />
                                <img src="images/m3.jpg" className="object-cover w-full h-full" />
                                <img src="images/m4.jpg" className="object-cover w-full h-full" />
                                <img src="images/m5.jpg" className="object-cover w-full h-full" />
                                <img src="images/m6.jpg" className="object-cover w-full h-full" />
                                <img src="images/m7.jpg" className="object-cover w-full h-full" />
                                <img src="images/m8.jpg" className="object-cover w-full h-full" />
                                <img src="images/m9.jpg" className="object-cover w-full h-full" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold">
                                    <a href="rudraksha.html"> Siddha Mala </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

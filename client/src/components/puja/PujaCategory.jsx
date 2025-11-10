import React from "react"

export default function PujaCategory() {
    return (
        <>
            {" "}
            <section className="bg-gray-50 py-16" data-aos="zoom-in-up">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-bold text-gray-800" data-aos="fade-up" data-aos-delay="100">
                            Puja Categories
                        </h2>
                        <p className="mt-3 text-gray-600" data-aos="fade-down" data-aos-delay="200">
                            Discover the Essence: Explore our diverse product categories
                        </p>
                    </div>

                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-xl shadow-lg" data-aos="fade-right" data-aos-delay="200">
                            <div className="grid h-80 w-full transform grid-cols-3 grid-rows-3 gap-1 transition duration-700 group-hover:scale-110">
                                <img src="images/p1.jpg" className="h-full w-full object-cover" />
                                <img src="images/p2.jpg" className="h-full w-full object-cover" />
                                <img src="images/p3.jpg" className="h-full w-full object-cover" />
                                <img src="images/p4.jpg" className="h-full w-full object-cover" />
                                <img src="images/p5.jpg" className="h-full w-full object-cover" />
                                <img src="images/p6.jpg" className="h-full w-full object-cover" />
                                <img src="images/m5.jpg" className="h-full w-full object-cover" />
                                <img src="images/p8.jpg" className="h-full w-full object-cover" />
                                <img src="images/p9.jpg" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <h3 className="text-2xl font-bold text-white">
                                    <a href="rudraksha.html">All Pujas</a>
                                </h3>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl shadow-lg" data-aos="fade-left" data-aos-delay="400">
                            <div className="grid h-80 w-full transform grid-cols-3 grid-rows-3 gap-1 transition duration-700 group-hover:scale-110">
                                <img src="images/m1.jpg" className="h-full w-full object-cover" />
                                <img src="images/m2.jpg" className="h-full w-full object-cover" />
                                <img src="images/m3.jpg" className="h-full w-full object-cover" />
                                <img src="images/m4.jpg" className="h-full w-full object-cover" />
                                <img src="images/m5.jpg" className="h-full w-full object-cover" />
                                <img src="images/m6.jpg" className="h-full w-full object-cover" />
                                <img src="images/m7.jpg" className="h-full w-full object-cover" />
                                <img src="images/m8.jpg" className="h-full w-full object-cover" />
                                <img src="images/m9.jpg" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <h3 className="text-2xl font-bold text-white">
                                    <a href="rudraksha.html"> Sacred Offerings </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

"use client"
import { useEffect, useRef } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"

export default function PujaSlider() {
    const barRef = useRef(null)

    useEffect(() => {
        const bar = barRef.current

        const handleMove = (splide) => {
            const end = splide.Components.Controller.getEnd() + 1
            const rate = Math.min((splide.index + 1) / end, 1)
            if (bar) bar.style.width = `${rate * 100}%`
        }

        document.addEventListener("splide:mounted", (e) => handleMove(e.detail))
        document.addEventListener("splide:move", (e) => handleMove(e.detail))

        return () => {
            document.removeEventListener("splide:mounted", (e) => handleMove(e.detail))
            document.removeEventListener("splide:move", (e) => handleMove(e.detail))
        }
    }, [])

    return (
        <div className="mx-auto max-w-7xl px-6">
            <Splide
                aria-label="Puja Slider"
                options={{
                    type: "loop",
                    perPage: 3,
                    autoplay: true,
                    interval: 4000,
                    pauseOnHover: true,
                    pauseOnFocus: false,
                    arrows: true,
                    breakpoints: {
                        1024: { perPage: 2 },
                        640: { perPage: 1 },
                    },
                }}
            >
                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="300">
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img src="images/ganesh_puja.jpg" alt="Ganesh Puja" className="h-40 w-full transform object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition duration-500 group-hover:bg-black/50">
                                <h4 className="text-lg font-bold text-white drop-shadow-md transition group-hover:scale-110 md:text-xl">
                                    <a href="/puja/ganesh-puja">Ganesh Puja</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="400">
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img src="images/lakshmi_puja.avif" alt="Lakshmi Puja" className="h-40 w-full transform object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition duration-500 group-hover:bg-black/50">
                                <h4 className="text-lg font-bold text-white drop-shadow-md transition group-hover:scale-110 md:text-xl">
                                    <a href="/puja/lakshmi-puja">Lakshmi Puja</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="200">
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img src="images/hanuman_puja.avif" alt="Hanuman Puja" className="h-40 w-full transform object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition duration-500 group-hover:bg-black/50">
                                <h4 className="text-lg font-bold text-white drop-shadow-md transition group-hover:scale-110 md:text-xl">
                                    <a href="/puja/hanuman-puja">Hanuman Puja</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="100">
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img src="images/mahamrityunjaya_puja.avif" alt="Mahamrityunjaya Puja" className="h-40 w-full transform object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition duration-500 group-hover:bg-black/50">
                                <h4 className="text-lg font-bold text-white drop-shadow-md transition group-hover:scale-110 md:text-xl">
                                    <a href="/puja/mahamrityunjaya-puja">Mahamrityunjaya Puja</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
            </Splide>

            {/* Optional progress bar (if you want to add it later) */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-200">
                <div ref={barRef} className="h-full bg-orange-500 transition-all duration-500"></div>
            </div>
        </div>
    )
}

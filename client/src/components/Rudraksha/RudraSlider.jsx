'use client'
import { useEffect, useRef } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function RudraSlider() {
    const barRef = useRef(null)

    useEffect(() => {
        const bar = barRef.current

        const handleMove = (splide) => {
            const end = splide.Components.Controller.getEnd() + 1
            const rate = Math.min((splide.index + 1) / end, 1)
            bar.style.width = `${rate * 100}%`
        }
        document.addEventListener('splide:mounted', (e) => handleMove(e.detail))
        document.addEventListener('splide:move', (e) => handleMove(e.detail))

        return () => {
            document.removeEventListener('splide:mounted', (e) => handleMove(e.detail))
            document.removeEventListener('splide:move', (e) => handleMove(e.detail))
        }
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6">
            <Splide
                aria-label="My React Splide"
                options={{
                    type: 'loop',
                    perPage: 3,
                    autoplay: true,
                    interval: 4000,
                    pauseOnHover: true,
                    pauseOnFocus: false,
                    arrows: true,
                    breakpoints: {
                        1024: {
                            perPage: 2,
                        },
                        640: {
                            perPage: 1,
                        },
                    },
                }}
            >
                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="300">
                        <div className="relative rounded-lg overflow-hidden group shadow-md">
                            <img
                                src="images/bracelets.jpg"
                                className="w-full h-40 object-cover transform transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 flex items-center justify-center">
                                <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md transition duration-500 group-hover:scale-110">
                                    <a href="bracelet.html"> Bracelet </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    {' '}
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="400">
                        <div className="relative rounded-lg overflow-hidden group shadow-md">
                            <img
                                src="images/rudra c.jpg"
                                className="w-full h-40 object-cover transform transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 flex items-center justify-center">
                                <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md transition duration-500 group-hover:scale-110">
                                    <a href="rudraksha.html"> Rudraksha Combo </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    {' '}
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="200">
                        <div className="relative rounded-lg overflow-hidden group shadow-md">
                            <img
                                src="images/gemsc.jpg"
                                className="w-full h-40 object-cover transform transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 flex items-center justify-center">
                                <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md transition duration-500 group-hover:scale-110">
                                    <a> Gems </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="px-2" data-aos="zoom-in" data-aos-delay="100">
                        <div className="relative rounded-lg overflow-hidden group shadow-md">
                            <img
                                src="images/shankh.jpg"
                                className="w-full h-40 object-cover transform transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 flex items-center justify-center">
                                <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md transition duration-500 group-hover:scale-110">
                                    Shankh
                                </h4>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    )
}

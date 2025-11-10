"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// --- Custom Components (Unchanged) ---
const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-zinc-900 md:text-5xl">{title}</h2>
        {subtitle && <p className="mx-auto max-w-3xl text-lg text-zinc-700">{subtitle}</p>}
    </div>
)

const CTAButton = ({ text, icon, className = "" }) => (
    <a
        href="#book"
        className={`inline-block w-fit transform rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl ${className}`}
    >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
    </a>
)

const StarIcon = ({ filled = true }) => (
    <svg className={`h-6 w-6 ${filled ? "text-yellow-400" : "text-zinc-300"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
)

const testimonials = [
    {
        name: "Sneha Iyer",
        location: "Chennai, India",
        quote: "Doing Daily Puja through Veda Structure keeps my mind calm and focused every morning.",
        stars: 5,
        img: "https://placehold.co/100x100/F0E7D8/6B4F3A?text=SI",
    },
    {
        name: "Rajesh Patel",
        location: "Ahmedabad, India",
        quote: "Beautifully arranged rituals, even online! Feels like true devotion from home.",
        stars: 5,
        img: "https://placehold.co/100x100/EAD9C7/573F28?text=RP",
    },
    {
        name: "Meera Kapoor",
        location: "Lucknow, India",
        quote: "My mornings now begin with divine peace — thank you for making this possible.",
        stars: 4,
        img: "https://placehold.co/100x100/D1D5DB/374151?text=MK",
    },
]

const doubledTestimonials = [...testimonials, ...testimonials]
// --- End Custom Components ---

const DailyPuja = () => {
    const router = useRouter()
    const [pujas, setPujas] = useState([])
    const [loading, setLoading] = useState(true)

    // Use a more dynamic, staggered approach for delays if needed, but keeping it simple for now.
    const highlights = [
        { icon: "🕉️", title: "Daily Devotion", description: "Keep your home filled with positive vibrations every morning." },
        { icon: "🪔", title: "Simplified Rituals", description: "Short yet powerful pujas done by learned Kashi Pandits." },
        { icon: "📿", title: "Personal Intentions", description: "We offer a custom Sankalp before every daily puja." },
        { icon: "✨", title: "Instant Access", description: "Seamless, live darshan and puja from anywhere in the world." },
    ]

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    const imageUrl = apiUrl.replace("/api", "")

    useEffect(() => {
        const fetchPujas = async () => {
            try {
                const res = await axios.get(`${apiUrl}/pujas/all`)
                const filtered = res.data.filter((item) => item.category.name === "Daily Puja")
                setPujas(filtered)
            } catch (error) {
                console.error("Error fetching Daily Puja data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPujas()
    }, [apiUrl])

    return (
        <div className="min-h-screen bg-amber-50 font-sans text-zinc-800">
            {/* // === SECTION 1: HERO (Revised Design) ===
      // Full-screen video background with refined title and CTA
      */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden p-6 text-center text-white">
                <div className="absolute inset-0 z-0 h-full w-full">
                    <Image src="/images/daily/v.jpg" alt="Daily Puja Background" fill priority className="object-cover object-center" />
                </div>

                {/* <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/images/daily-puja/DailyPujaHero.mp4" type="video/mp4" />
        </video> */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-black/30"></div>
                <div className="relative z-20 mx-auto max-w-5xl">
                    <h1 className="mb-8 font-serif text-5xl font-extrabold tracking-tight md:text-7xl">✨ Your Daily Dose of Divine Tranquility</h1>
                    <p className="mb-12 text-xl font-light italic md:text-2xl">Sanskrit Mantras, Vedic Rituals, Delivered Live.</p>
                    <CTAButton text="Explore Daily Pujas" icon="🪷" className="px-10 py-4 text-xl" />
                </div>
            </section>

            {/* --- */}

            {/* // === SECTION 2: BENEFITS/HIGHLIGHTS (Card Grid) ===
      // Using a dedicated background and simpler card design
      */}
            <section className="bg-white px-6 py-24 shadow-inner">
                <div className="container mx-auto max-w-7xl">
                    <SectionTitle title="A Sacred Start to Every Day" subtitle="Understand the profound benefits of consistent Vedic worship offered by Veda Structure." />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {highlights.map((item, index) => (
                            <div key={index} className="flex flex-col items-center rounded-2xl bg-amber-50 p-8 text-center shadow-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-2xl">
                                <span className="mb-4 text-6xl text-orange-600">{item.icon}</span>
                                <h3 className="mb-2 text-xl font-bold text-zinc-900">{item.title}</h3>
                                <p className="text-zinc-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* // === SECTION 3: PUJA CARDS (The Main Offerings) ===
      // Retained dynamic mapping with minor style tweaks
      */}
            <section id="book" className="bg-amber-50 py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Choose Your Daily Practice" subtitle="Select from our curated list of daily rituals to align your energy and receive continuous blessings." />

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {loading && <p className="col-span-full text-center">Loading sacred pujas...</p>}
                        {!loading && pujas.length === 0 && <p className="col-span-full text-center">No daily pujas found currently.</p>}

                        {pujas?.map((item) => (
                            <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:border-2 hover:border-orange-500 hover:shadow-2xl">
                                <Link href={`/yagya-puja/${item._id}`}>
                                    <div className="relative h-48 w-full">
                                        <Image src={`${imageUrl}${item.image}`} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-105" />
                                        <span className="absolute top-3 left-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white shadow-md">{item.category.name}</span>
                                    </div>
                                    <div className="p-5 text-center">
                                        <h3 className="font-serif text-xl font-bold text-orange-700">{item.title}</h3>
                                        {/* Assuming there's a short description field for the card view */}
                                        {/* <p className="text-sm text-zinc-600 mt-2">{item.shortDescription}</p> */}
                                    </div>
                                </Link>
                                <div className="p-5 pt-0">
                                    <button
                                        onClick={() => router.push(`/yagya-puja/${item._id}`)}
                                        className="mt-3 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* // === SECTION 4: TESTIMONIALS (Marquee) ===
      // Background color changed for contrast and emphasis.
      */}
            {/* <section className="overflow-hidden bg-gradient-to-r from-orange-50 to-amber-100 px-6 py-24">
                <div className="container mx-auto max-w-7xl">
                    <SectionTitle title="Hear From Our Global Devotees" subtitle="Trusted by thousands for their daily spiritual practice." />
                </div>
                <div className="relative w-full" style={{ maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
                    <div className="animate-marquee hover-pause flex w-max"> */}
                        {/* Note: The key is safe here because we are using a doubled array for the marquee effect. */}
                        {/* {doubledTestimonials.map((t, index) => (
                            <div key={index} className="mx-4 w-[320px] flex-shrink-0 py-16 sm:w-[380px]">
                                <div className="relative h-full rounded-2xl border border-orange-200 bg-white p-8 pt-24 text-center shadow-2xl">
                                    <img src={t.img} alt={t.name} className="absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-orange-500 object-cover shadow-xl" />
                                    <div className="mb-4 flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < t.stars} />
                                        ))}
                                    </div>
                                    <h3 className="mb-1 font-serif text-2xl font-bold text-zinc-900">{t.name}</h3>
                                    <p className="mb-4 font-semibold text-orange-500">{t.location}</p>
                                    <p className="text-lg text-zinc-700 italic">&ldquo;{t.quote}&rdquo;</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* --- */}

            {/* // === SECTION 5: FINAL CTA (Focus on Action) ===
             */}
            <section className="bg-zinc-800 px-6 py-24 text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">Ready to Embrace Daily Blessings?</h2>
                    <p className="mb-10 text-xl text-zinc-300">Secure your continuous devotion today and experience peace, focus, and prosperity.</p>
                    <CTAButton text="Book Daily Puja Now" icon="🔔" className="bg-yellow-500 px-10 py-4 text-xl hover:bg-yellow-600" />
                </div>
            </section>
        </div>
    )
}

export default DailyPuja

// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const SectionTitle = ({ title, subtitle }) => (
//   <div className="mb-16 text-center">
//     <h2 className="mb-4 text-4xl font-extrabold text-zinc-900 md:text-5xl">{title}</h2>
//     {subtitle && <p className="mx-auto max-w-3xl text-lg text-zinc-700">{subtitle}</p>}
//   </div>
// );

// const CTAButton = ({ text, icon, className = "" }) => (
//   <a
//     href="#book"
//     className={`inline-block w-fit transform rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl ${className}`}
//   >
//     {icon && <span className="mr-2">{icon}</span>}
//     {text}
//   </a>
// );

// const StarIcon = ({ filled = true }) => (
//   <svg
//     className={`h-6 w-6 ${filled ? "text-yellow-400" : "text-zinc-300"}`}
//     fill="currentColor"
//     viewBox="0 0 20 20"
//   >
//     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
//   </svg>
// );

// const testimonials = [
//   {
//     name: "Sneha Iyer",
//     location: "Chennai, India",
//     quote: "Doing Daily Puja through Veda Structure keeps my mind calm and focused every morning.",
//     stars: 5,
//     img: "https://placehold.co/100x100/F0E7D8/6B4F3A?text=SI",
//   },
//   {
//     name: "Rajesh Patel",
//     location: "Ahmedabad, India",
//     quote: "Beautifully arranged rituals, even online! Feels like true devotion from home.",
//     stars: 5,
//     img: "https://placehold.co/100x100/EAD9C7/573F28?text=RP",
//   },
//   {
//     name: "Meera Kapoor",
//     location: "Lucknow, India",
//     quote: "My mornings now begin with divine peace — thank you for making this possible.",
//     stars: 4,
//     img: "https://placehold.co/100x100/D1D5DB/374151?text=MK",
//   },
// ];

// const doubledTestimonials = [...testimonials, ...testimonials];

// const DailyPuja = () => {
//   const router = useRouter();
//   const [pujas, setPujas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//   const imageUrl = apiUrl.replace("/api", "");

//   useEffect(() => {
//     const fetchPujas = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/pujas/all`);
//         const filtered = res.data.filter((item) => item.category.name === "Daily Puja");
//         setPujas(filtered);
//       } catch (error) {
//         console.error("Error fetching Daily Puja data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPujas();
//   }, [apiUrl]);

//   return (
//     <div className="min-h-screen bg-amber-50 font-sans text-zinc-800">
//       {/* Hero Section */}
//       <section className="relative flex h-[70vh] items-center justify-center overflow-hidden p-6 text-center text-white md:h-[85vh]">
//         <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
//           <source src="/images/daily-puja/DailyPujaHero.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 z-10 bg-black opacity-60"></div>
//         <div className="relative z-20 mx-auto max-w-4xl">
//           <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
//             🌞 Begin Every Day with Divine Energy
//           </h1>
//           <p className="mb-10 text-xl font-light md:text-2xl">
//             Daily Puja for Harmony, Prosperity, and Inner Strength.
//           </p>
//           <CTAButton text="Start Your Daily Puja" icon="🪔" />
//         </div>
//       </section>

//       {/* Highlights */}
//       <section className="bg-white px-6 py-24">
//         <div className="container mx-auto max-w-7xl">
//           <SectionTitle title="Why Choose Daily Puja?" />
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all">
//               <span className="p-4 text-5xl text-orange-600">🕉️</span>
//               <div>
//                 <h3 className="text-xl font-bold">Daily Devotion</h3>
//                 <p>Keep your home filled with positive vibrations every morning.</p>
//               </div>
//             </div>
//             <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all">
//               <span className="p-4 text-5xl text-orange-600">🪔</span>
//               <div>
//                 <h3 className="text-xl font-bold">Simplified Rituals</h3>
//                 <p>Short yet powerful pujas done by learned Kashi Pandits.</p>
//               </div>
//             </div>
//             <div className="flex items-center rounded-xl border-l-4 border-orange-500 bg-amber-50 p-6 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all">
//               <span className="p-4 text-5xl text-orange-600">📿</span>
//               <div>
//                 <h3 className="text-xl font-bold">Personal Intentions</h3>
//                 <p>We offer a custom sankalp before every daily puja.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Puja Cards */}
//       <section id="book" className="bg-base-50 py-24">
//         <div className="mx-auto max-w-2xl text-center">
//           <h2 className="font-serif text-4xl font-bold text-neutral-900">
//             Explore Our Daily Puja Options
//           </h2>
//         </div>
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {pujas?.map((item) => (
//               <div
//                 key={item._id}
//                 className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <Link href={`/yagya-puja/${item._id}`}>
//                   <div className="relative h-56 w-full sm:h-64 md:h-72">
//                     <Image
//                       src={`${imageUrl}${item.image}`}
//                       alt={item.title}
//                       width={1000}
//                       height={1000}
//                       className="h-full w-full object-cover object-center transition-transform duration-500"
//                     />
//                     <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">
//                       {item.category.name}
//                     </span>
//                   </div>
//                   <div className="p-4 text-center">
//                     <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </Link>
//                 <div className="p-4 pt-0">
//                   <button
//                     onClick={() => router.push(`/yagya-puja/${item._id}`)}
//                     className="mt-3 w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="overflow-hidden bg-white px-6 py-24">
//         <div className="container mx-auto max-w-7xl">
//           <SectionTitle title="What Devotees Say" />
//         </div>
//         <div className="relative w-full" style={{ maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
//           <div className="animate-marquee hover-pause flex w-max">
//             {doubledTestimonials.map((t, index) => (
//               <div key={index} className="mx-4 w-[320px] flex-shrink-0 py-16 sm:w-[380px]">
//                 <div className="relative h-full rounded-2xl border border-orange-100 bg-amber-50 p-8 pt-24 text-center shadow-xl">
//                   <img
//                     src={t.img}
//                     alt={t.name}
//                     className="absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-lg"
//                   />
//                   <div className="mb-4 flex justify-center">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon key={i} filled={i < t.stars} />
//                     ))}
//                   </div>
//                   <h3 className="mb-1 text-2xl font-extrabold text-zinc-900">{t.name}</h3>
//                   <p className="mb-4 font-semibold text-orange-600">{t.location}</p>
//                   <p className="text-lg italic text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="bg-gradient-to-b from-orange-100 to-amber-50 px-6 py-24 text-center">
//         <div className="container mx-auto max-w-3xl">
//           <h2 className="mb-6 text-4xl font-extrabold text-orange-900 md:text-5xl">
//             Start Every Day with Positivity & Blessings
//           </h2>
//           <p className="mb-10 text-xl text-zinc-800">
//             Join thousands of devotees performing Daily Puja for peace, focus, and prosperity.
//           </p>
//           <CTAButton text="Book Daily Puja Now" icon="🌼" className="px-10 py-4 text-xl" />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DailyPuja;

// import React from "react"

// const DailyPuja = () => {
//     return (
//         <div className="bg-beige text-maroon-900 font-sans antialiased">
//             {/* HEADER */}
//             <header className="relative flex min-h-screen items-end overflow-hidden text-white md:items-center">
//                 <div className="absolute inset-0 z-0">
//                     <img src="/images/nitya-ati/banner.jpg" alt="Priests performing Daily Puja" className="h-full w-full object-cover" />
//                     <div className="from-maroon-900/90 via-maroon-700/60 absolute inset-0 bg-gradient-to-t to-transparent"></div>
//                 </div>

//                 <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:px-12 md:pb-0 md:text-left">
//                     <h1 className="font-serif text-5xl leading-tight font-bold tracking-wide md:text-7xl">Daily Puja Rituals</h1>
//                     <p className="mt-4 max-w-2xl text-lg text-yellow-300 md:text-xl">
//                         Begin each day with sacred devotion — connect to the divine energy through the daily rituals of Puja and prayer.
//                     </p>
//                     <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
//                         <a
//                             href="#participate"
//                             className="flex w-full transform items-center justify-center gap-2 rounded-full bg-yellow-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-700 sm:w-auto"
//                         >
//                             Join Daily Puja
//                         </a>
//                         <a
//                             href="#live"
//                             className="hover:text-maroon-900 flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white sm:w-auto"
//                         >
//                             Watch Live Puja
//                         </a>
//                     </div>
//                 </div>
//             </header>

//             <main>
//                 {/* ABOUT SECTION */}
//                 <section id="about" className="py-24">
//                     <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//                             <div className="flex justify-center">
//                                 <div className="rounded-t-full rounded-b-xl border-2 border-yellow-700/40 bg-yellow-50 p-4 shadow-2xl">
//                                     <div className="overflow-hidden rounded-t-full rounded-b-lg">
//                                         <img
//                                             src="/images/nitya-ati/Kashi Vishvnath.jpg"
//                                             alt="Priests performing morning rituals"
//                                             className="h-auto w-full transform object-cover transition-transform duration-500 hover:scale-110"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-center lg:text-left">
//                                 <h2 className="text-maroon-900 font-serif text-4xl leading-tight font-bold md:text-5xl">The Essence of Daily Puja</h2>
//                                 <p className="text-maroon-700 mt-4 text-lg">
//                                     Performing daily puja maintains a divine rhythm in life. It purifies the home environment, brings harmony, and strengthens our spiritual foundation.
//                                 </p>
//                                 <div className="mx-auto my-8 h-px w-2/3 bg-gradient-to-r from-transparent via-yellow-600 to-transparent lg:mx-0"></div>
//                                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                                     <div className="rounded-lg border border-yellow-700/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-600 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-yellow-600">🪔</div>
//                                         <h3 className="text-maroon-900 text-xl font-semibold">Morning Rituals</h3>
//                                         <p className="mt-2 text-sm text-gray-700">Begin your day with offerings of light, incense, and prayer to invoke blessings for peace and prosperity.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-700/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-600 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-yellow-600">🌸</div>
//                                         <h3 className="text-maroon-900 text-xl font-semibold">Sacred Offerings</h3>
//                                         <p className="mt-2 text-sm text-gray-700">Flowers, fruits, and ghee lamps symbolize love and gratitude toward the divine.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-700/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-600 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-yellow-600">🕉️</div>
//                                         <h3 className="text-maroon-900 text-xl font-semibold">Chanting Mantras</h3>
//                                         <p className="mt-2 text-sm text-gray-700">Recite mantras and prayers to align your energy with divine consciousness.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-700/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-600 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-yellow-600">🙏</div>
//                                         <h3 className="text-maroon-900 text-xl font-semibold">Daily Gratitude</h3>
//                                         <p className="mt-2 text-sm text-gray-700">Offering thanks daily cultivates humility, love, and continuous divine remembrance.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* BENEFITS SECTION */}
//                 <section id="benefits" className="from-beige overflow-hidden bg-gradient-to-b to-yellow-50 py-24">
//                     <div className="container mx-auto px-6">
//                         <div className="mx-auto mb-16 max-w-3xl text-center">
//                             <h2 className="text-maroon-900 font-serif text-4xl font-bold md:text-5xl">Benefits of Daily Worship</h2>
//                             <p className="text-maroon-700 mt-4 text-lg">Regular puja harmonizes your energies and transforms ordinary days into sacred experiences.</p>
//                         </div>
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="flex w-full justify-center">
//                                 <img src="/images/nitya-ati/medi.jpg" alt="Daily worship meditation" className="max-h-[600px] rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute top-0 bottom-0 left-4">
//                                     <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-yellow-500">
//                                         <line x1="1" y1="0" x2="1" y2="100%" strokeWidth="2" />
//                                     </svg>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {[
//                                         { title: "Spiritual Cleansing", desc: "Removes negative vibrations from the home and mind." },
//                                         { title: "Mental Balance", desc: "Brings peace, clarity, and focus throughout the day." },
//                                         { title: "Family Harmony", desc: "Creates unity and divine blessings for every member." },
//                                         { title: "Divine Protection", desc: "Invokes the grace of deities to protect from misfortune." },
//                                         { title: "Continuous Devotion", desc: "Keeps you connected to the divine energy at all times." },
//                                     ].map((b, i) => (
//                                         <div key={i} className="group relative pl-12">
//                                             <div className="absolute top-0 left-0 flex h-full items-center">
//                                                 <div className="bg-beige absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
//                                                 <div className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-yellow-600 transition-colors duration-300 group-hover:text-yellow-700">
//                                                     🪔
//                                                 </div>
//                                             </div>
//                                             <h3 className="text-maroon-900 text-xl font-bold transition-colors duration-300 group-hover:text-yellow-700">{b.title}</h3>
//                                             <p className="mt-1 text-gray-700">{b.desc}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* PARTICIPATION SECTION */}
//                 <section id="participate" className="py-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}>
//                     <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="hidden lg:block">
//                                 <img src="/images/nitya-ati/download.jpg" alt="Devotees performing puja" className="h-full w-full rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div>
//                                 <div className="mb-12 text-center lg:text-left">
//                                     <h2 className="text-maroon-900 font-serif text-4xl font-bold md:text-5xl">Participate in Daily Puja</h2>
//                                     <p className="text-maroon-700 mt-4 text-lg">Offer prayers, light a lamp, and be part of the divine energy circle daily.</p>
//                                 </div>
//                                 <div className="space-y-8">
//                                     {[
//                                         { step: "01", title: "Register for Puja", desc: "Submit your name and gotra for daily puja inclusion." },
//                                         { step: "02", title: "Offer Your Prayers", desc: "Send your offerings and intentions for the day’s rituals." },
//                                         { step: "03", title: "Join Morning Aarti", desc: "Witness the live puja stream performed by Vedic priests." },
//                                         { step: "04", title: "Receive Blessings", desc: "Get the divine grace and spiritual upliftment every morning." },
//                                     ].map((p, i) => (
//                                         <div key={i} className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
//                                             <div className="group-hover:text-maroon-700 flex-shrink-0 font-serif text-4xl font-bold text-yellow-500 transition-all duration-300 group-hover:scale-110">
//                                                 {p.step}
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-maroon-900 text-xl font-bold transition-colors duration-300 group-hover:text-yellow-700">{p.title}</h3>
//                                                 <p className="mt-1 text-gray-700">{p.desc}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-12 text-center lg:text-left">
//                                     <a
//                                         href="#register"
//                                         className="to-maroon-700 hover:shadow-maroon-400/50 inline-block transform rounded-full bg-gradient-to-r from-yellow-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition duration-300 hover:scale-105"
//                                     >
//                                         Join Daily Puja
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* FAQ SECTION */}
//                 <section id="faq" className="py-24">
//                     <div className="container mx-auto max-w-4xl px-6">
//                         <div className="mb-16 text-center">
//                             <h2 className="text-maroon-900 font-serif text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
//                         </div>
//                         <div className="space-y-4">
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-maroon-900 flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     What is Daily Puja?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg className="absolute h-5 w-5 text-yellow-600 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-700">
//                                     Daily puja is a morning or evening ritual of worship that connects the devotee to divine energy through offerings, prayers, and mantras.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-maroon-900 flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Can I participate from home?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg className="absolute h-5 w-5 text-yellow-600 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-700">Yes! You can register online and join the live streaming or perform your daily puja at home with our guided instructions.</p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-maroon-900 flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     What time does the puja take place?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg className="absolute h-5 w-5 text-yellow-600 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-700">The daily puja usually begins at sunrise and can also be performed during sunset hours for evening worship.</p>
//                             </details>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     )
// }

// export default DailyPuja

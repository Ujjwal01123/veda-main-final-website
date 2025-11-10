"use client"

import { useState, useMemo, useEffect } from "react"
// import { Link } from "react-router-dom"
import Link from "next/link"
import usePuja from "@/hooks/usePuja"
import { getAllCategories } from "@/apis/controllers/categoriesController"

const serverUrl = "http://localhost:5000"

// Data

// SVG Icons
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
    </svg>
)
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
)
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.875-5.939l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
)

const TempleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
    </svg>
)
const PanditIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
    </svg>
)
const SankalpIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
    </svg>
)

function PujaCard({ puja }) {
    const endsInDays = useMemo(() => Math.floor(2 + Math.random() * 10), [])

    // Determine the link based on puja type
    const link = puja.category.name === "Upcoming Festival Puja" ? `/yagya-puja/participate/${puja._id}` : `/yagya-puja/${puja._id}`

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative">
                <img
                    src={`${serverUrl}${puja.image}`}
                    alt={puja.title}
                    className="h-48 w-full object-cover"
                    style={{ objectPosition: "center 25%" }}
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://placehold.co/600x400/FFF3D7/805A2A?text=Image+Not+Found"
                    }}
                />
                {puja.category.name === "Upcoming Festival Puja" && (
                    <div className="absolute top-3 left-3 flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-red-600 shadow-md backdrop-blur-sm">
                        <ClockIcon /> Ends in {endsInDays} days
                    </div>
                )}
                <button className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-sm transition-transform duration-200 hover:scale-110 hover:bg-white">
                    <ShareIcon />
                </button>
            </div>
            <div className="flex flex-grow flex-col p-4">
                <h3 className="mb-4 flex-grow text-lg leading-tight font-bold text-gray-800">{puja.title}</h3>
                <div className="mt-auto">
                    <Link href={link}>
                        <button className="w-full transform rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                            {puja.category.name === "Upcoming Festival Puja" ? "Participate Now" : "Book Now"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Main Filter Component
export default function Filter() {
    const { puja } = usePuja()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories()
                setCategories(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        setIsExpanded(false)
    }, [filter, search])

    const upcomingPujas = puja.filter((p) => p.category.name === "Upcoming Festival Puja" && p.title.toLowerCase().includes(search.toLowerCase())).slice(0, 3)

    const otherPujas = puja.filter((p) => {
        if (p.category.name === "Upcoming Festival Puja") return false
        const matchFilter = filter === "all" || p.category.name === filter
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
        return matchFilter && matchSearch
    })

    const isFiltered = filter !== "all" || search !== ""

    const displayedOtherPujas = isFiltered ? otherPujas : isExpanded ? otherPujas : otherPujas.slice(0, 20)
    const showExploreButton = !isFiltered && !isExpanded && otherPujas.length > 20

    return (
        <section className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                        Explore Our Sacred <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">Pujas and Yagyas</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">Choose from a variety of rituals, yagya, havan, japa and more — performed authentically by expert Vedic priests.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Sidebar Filter */}
                    <aside className="top-6 h-fit rounded-2xl border border-gray-200/80 bg-gradient-to-b from-white to-amber-50 p-5 shadow-lg lg:sticky lg:col-span-3 xl:col-span-2">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-yellow-400"></span>
                            <h2 className="text-xl font-extrabold tracking-wide text-gray-900">Filters</h2>
                        </div>
                        <div className="relative mb-5">
                            <input
                                type="text"
                                placeholder="Search for Pujas..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm shadow-inner transition-all duration-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            />
                            <svg className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <ul className="space-y-2">
                            <button
                                onClick={() => setFilter("all")}
                                className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-all duration-300 ease-out ${filter === "all" ? "scale-105 bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md" : "bg-white/80 hover:bg-amber-100/70 hover:text-orange-800"}`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <button
                                        onClick={() => setFilter(cat.name)}
                                        className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-all duration-300 ease-out ${filter === cat.name ? "scale-105 bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md" : "bg-white/80 hover:bg-amber-100/70 hover:text-orange-800"}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Main Content Section */}
                    <div className="lg:col-span-9 xl:col-span-10">
                        {/* Regular Pujas Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
                            {displayedOtherPujas.length > 0
                                ? displayedOtherPujas.map((puja) => <PujaCard key={puja.id} puja={puja} />)
                                : filter !== "Upcoming Festival Puja" && (
                                      <div className="col-span-full flex h-96 flex-col items-center justify-center rounded-2xl bg-white shadow-md">
                                          <p className="text-xl font-semibold text-gray-700">No Pujas Found</p>
                                          <p className="mt-2 text-gray-500">Please try adjusting your search or filter.</p>
                                      </div>
                                  )}
                        </div>

                        {showExploreButton && (
                            <div className="mt-10 text-center">
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="transform rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                                >
                                    Explore All Pujas
                                </button>
                            </div>
                        )}

                        {/* NEW "Embrace the Festive Spirit" Section */}
                        {(filter === "all" || filter === "Upcoming Festival Puja") && upcomingPujas.length > 0 && (
                            <div className="mt-16 rounded-3xl border border-amber-200/60 bg-amber-50/50 p-6 sm:p-8 lg:p-12">
                                <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                                    {/* Left Column */}
                                    <div>
                                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                            Embrace the <span className="text-orange-600">Festive Spirit</span>
                                        </h2>
                                        <div className="mt-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500"></div>
                                        <p className="mt-6 leading-relaxed text-gray-600">
                                            This festive season, book pujas in your name at auspicious temples. We also perform pujas exclusively for you with a live stream.
                                        </p>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-xl border border-gray-200/80 bg-white p-3 shadow-md">
                                                <TempleIcon className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-bold text-gray-800">Sacred Mahurats</h4>
                                                <p className="mt-1 text-sm text-gray-600">Pujas are performed on the most auspicious days and timings for the best results.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-xl border border-gray-200/80 bg-white p-3 shadow-md">
                                                <PanditIcon className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-bold text-gray-800">Learned Pandits</h4>
                                                <p className="mt-1 text-sm text-gray-600">Every puja is performed by our team of experienced and learned pandits.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-xl border border-gray-200/80 bg-white p-3 shadow-md">
                                                <SankalpIcon className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-bold text-gray-800">Personalized Sankalps</h4>
                                                <p className="mt-1 text-sm text-gray-600">We take your personal sankalps to ensure the puja is performed for you.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Upcoming Pujas Grid */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {upcomingPujas.map((puja) => (
                                        <PujaCard key={puja._id} puja={puja} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

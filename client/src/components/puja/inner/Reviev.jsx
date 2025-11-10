"use client"
import { useState, useEffect } from "react"
// FaMapMarkerAlt import kiya gaya hai aur FaQuoteLeft hata diya gaya hai
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa"

// Sample Testimonials Data - No changes here
const testimonials = [
    {
        text: "The organization of the puja was excellent. The Pandit ji explained every ritual in detail. I felt a great sense of peace.",
        name: "Rohan Sharma",
        location: "Varanasi",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
    },
    {
        text: "The live-streaming feature was wonderful. We were able to join the puja even while living abroad, and it felt as if we were right there.",
        name: "Roshni Patel",
        location: "Kanpur",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
    },
    {
        text: "I booked the Kaal Sarp Dosh Nivaran Puja. The experience was very smooth, and I found peace of mind. Thanks to the Devdham app.",
        name: "Arpit Pandey",
        location: "Varansi",
        avatar: "images/arpit.png",
        rating: 5,
    },
    {
        text: "The service was very professional. From booking to the completion of the puja, everything was very well organized. I highly appreciate it.",
        name: "Meera Desai",
        location: "Mumbai",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
    },
    {
        text: "The Rudrabhishek experience at home was divine. I felt a very positive energy. All my family members are very happy.",
        name: "Vikram Rathod",
        location: "Varanasi",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
    },
]

// Helper component for Star Ratings - UPDATED
const StarRating = ({ rating }) => (
    <div className="my-4 flex justify-center">
        {" "}
        {/* Added spacing */}   {" "}
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                // Style badal diya gaya hai: text-white aur size w-7 h-7
                className={`h-7 w-7 ${i < rating ? "text-white" : "text-white opacity-40"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                       {" "}
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                     {" "}
            </svg>
        ))}
         {" "}
    </div>
)

// Helper component for decorative border in the header - No changes
const DecorativeBorder = () => (
    <div className="my-4 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-l from-amber-400 to-transparent"></div>        <div className="h-2 w-2 rotate-45 bg-amber-400"></div>       {" "}
        <div className="h-px w-16 bg-gradient-to-r from-amber-400 to-transparent"></div>   {" "}
    </div>
)

export default function Reviev() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    }

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }

    useEffect(() => {
        const timer = setTimeout(nextReview, 6000)
        return () => clearTimeout(timer)
    }, [currentIndex])

    return (
        <section className="relative overflow-hidden py-20 sm:py-28">
                  {/* Background Spiritual Pattern */}      <div className="absolute inset-0 z-[-1] bg-[url('https://www.transparenttextures.com/patterns/asanoha.png')] opacity-[0.03]"></div>         
             {" "}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Section Header - No changes */}       {" "}
                <div className="mb-16 text-center">
                              <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">            Voice of Faith           </h2>
                              <DecorativeBorder />         {" "}
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">            Sacred journeys and divine experiences, shared by our cherished devotees.           </p>       {" "}
                </div>
                        {/* Reviews Carousel */}
                {/* Container ki height badha di gayi hai taaki overlapping image fit ho sake */}       {" "}
                <div className="relative h-[500px] sm:h-[420px]">
                             {" "}
                    {testimonials.map((review, index) => {
                        let positionClasses = "opacity-0 scale-75 transform"
                        if (index === currentIndex) {
                            positionClasses = "opacity-100 scale-100 transform translate-x-0 z-10"
                        } else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
                            positionClasses = "opacity-30 scale-90 transform -translate-x-1/2 md:-translate-x-3/4 lg:-translate-x-[65%] z-0 hidden md:block"
                        } else if (index === (currentIndex + 1) % testimonials.length) {
                            positionClasses = "opacity-30 scale-90 transform translate-x-1/2 md:translate-x-3/4 lg:translate-x-[65%] z-0 hidden md:block"
                        }

                        return (
                            <div
                                key={index}
                                className={`ease-cubic-bezier absolute top-0 left-1/2 h-full w-[90%] p-4 transition-all duration-700 sm:w-[70%] md:w-[55%] lg:w-[48%] ${positionClasses}`}
                                style={{ transform: `translateX(-50%) ${positionClasses.includes("translate-x-") ? "" : ""}` }}
                            >
                                {/* === CARD STYLING START === */}               {" "}
                                <div className="relative flex h-full flex-col items-center justify-center rounded-3xl bg-yellow-400 p-8 text-center shadow-lg shadow-yellow-800/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-800/30">
                                                     {/* Profile Picture (Absolutely Positioned) */}
                                    <div className="absolute -top-14 left-1/2 z-20 -translate-x-1/2">
                                        <div className="h-28 w-28 rounded-full bg-white p-1 shadow-lg">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="h-full w-full rounded-full border-4 border-yellow-400 object-cover" // Border card ke bg se match karta hai
                                            />
                                        </div>
                                    </div>
                                                        {/* Card Content (with padding-top to clear the image) */}                   {" "}
                                    <div className="relative z-10 flex flex-col items-center pt-14">
                                        {" "}
                                        {/* pt-14 image ke liye jagah banata hai */}                       {/* Star rating upar aa gaya hai */}
                                        <StarRating rating={review.rating} />                       
                                        <p className="mt-2 font-serif text-2xl font-bold text-gray-900">
                                            {" "}
                                            {/* Text color dark kar diya hai */}                            {review.name}                       {" "}
                                        </p>
                                                               {/* Location ke saath icon add kiya hai */}
                                        <p className="mb-4 flex items-center gap-1 text-sm text-gray-800">
                                            <FaMapMarkerAlt className="text-red-600" />                          {review.location}
                                        </p>
                                                               
                                        <p className="mt-4 text-base leading-relaxed text-gray-800 md:text-lg">
                                            {" "}
                                            {/* Text color dark kar diya hai */}                            {review.text}              Bha          {" "}
                                        </p>
                                                           {" "}
                                    </div>
                                                   {" "}
                                </div>
                                {/* === CARD STYLING END === */}             {" "}
                            </div>
                        )
                    })}
                           {" "}
                </div>
                                {/* Navigation Arrows - No changes */}       {" "}
                <button
                    onClick={prevReview}
                    className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition hover:bg-white md:-left-4"
                    aria-label="Previous review"
                >
                                <FaChevronLeft className="text-orange-500" />       {" "}
                </button>
                       {" "}
                <button
                    onClick={nextReview}
                    className="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition hover:bg-white md:-right-4"
                    aria-label="Next review"
                >
                                <FaChevronRight className="text-orange-500" />       {" "}
                </button>
                        {/* Pagination Dots - No changes */}       {" "}
                <div className="mt-10 flex justify-center gap-3">
                               {" "}
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === index ? "scale-125 bg-orange-500" : "bg-orange-200 hover:bg-orange-300"}`}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                         {" "}
                </div>
                     {" "}
            </div>
               {" "}
        </section>
    )
}

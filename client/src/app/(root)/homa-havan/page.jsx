"use client"


import React, { useState, useEffect } from "react"

import NityaAtiRudrabhishek from "../../../components/homa-list/page.jsx";

// import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
    BadgeCheck,
    Globe,
    Handshake,
    LifeBuoy,
    X,
    ChevronRight,
    User,
    BookOpen,
    Calendar,
} from "lucide-react";

import { ChevronDown, ChevronUp,  Lightbulb, HeartCrack, Ban, Zap, Shield, Sparkles } from "lucide-react";

import {
  ChevronLeft,
 

  Image,
  Video,
  Plus,
  Star,
  CheckCircle,
} from "lucide-react";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const imageBackgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
};


const faqs = [
    // --- NEW HOMA/HAVAN QUESTIONS ADDED HERE ---
    {
        question: "Can I perform the Homa/Havan from another city?",
        answer:
            "Yes! Our dedicated team performs the Homa authentically in the sacred city of **Kashi (Varanasi)** and streams the ritual **live** to you, so you can witness it from anywhere in the world.",
    },
    {
        question: "How do I know which specific Homa or Havan I need?",
        answer:
            "Our expert astrologers analyze your birth chart (Janma Kundali) based on the details you provide to recommend the **perfect ritual** tailored to your planetary needs and life goals.",
    },
    {
        question: "How soon can my Homa be performed after booking?",
        answer:
            "The ritual is usually scheduled within **3–5 days** of booking, depending on identifying the most **auspicious muhurat** (time) based on the Vedic calendar and your details.",
    },
    // --- EXISTING GENERAL QUESTIONS ---
    {
        question: "What is Veda Structure and what services does it offer?",
        answer:
            "Veda Structure is a spiritual platform offering **astrology consultations**, online puja services, temple rituals in Varanasi, Rudraksha & gemstones, Vedic products, and spiritual courses.",
    },
    {
        question: "How do I book a puja through Veda Structure?",
        answer:
            "You can easily book a puja by selecting the desired service, entering your details, and confirming the booking. Our dedicated priests will perform the puja authentically on your behalf.",
    },
    {
        question: "Are the pujas performed authentically as per Vedic traditions?",
        answer:
            "Yes, all pujas are conducted by **certified Vedic priests** with strict adherence to authentic Vedic rituals, mantras, and traditions.",
    },
    {
        question: "Can I get my horoscope prepared or analyzed?",
        answer:
            "Yes, we provide personalized horoscope predictions and detailed chart analysis based on your date, time, and place of birth by expert astrologers.",
    },
    {
        question: "Do you provide guidance for choosing the right Rudraksha or gemstone?",
        answer:
            "Absolutely. Our astrologers and Vedic experts guide you to select the right Rudraksha or gemstone according to your planetary positions and requirements.",
    },
    {
        question: "Are the Rudraksha & gemstones authentic?",
        answer:
            "Yes, we only provide **100% original, lab-certified** Rudraksha and gemstones sourced ethically, ensuring purity and spiritual benefits.",
    },
    {
        question: "Do you ship Vedic products internationally?",
        answer:
            "Yes, we deliver Rudraksha, gemstones, and Vedic products across India and **internationally** with safe and secure packaging.",
    },
    {
        question: "What types of online courses are available?",
        answer:
            "We offer online courses in astrology, Vedic scriptures, mantra chanting, meditation practices, and spiritual living to deepen your knowledge.",
    },
    {
        question: "Can I consult an astrologer online?",
        answer:
            "Yes, we provide live online astrology consultations via video call, phone, or chat for personalized guidance and remedies.",
    },
    {
        question: "How do I contact Veda Structure for support?",
        answer:
            "You can reach our support team via the contact form on our website or through WhatsApp/phone for assistance with bookings, consultations, and orders.",
    },
];

const HowItWorksItem = ({ step, text, icon }) => (
    <div className="flex items-start space-x-3">
        <div className="flex flex-col items-center">
            <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md flex-shrink-0">
                {step}
            </div>
            {step < 4 && <div className="w-0.5 h-12 bg-amber-200"></div>}
        </div>
        <p className="text-gray-700 pt-1 text-left">{text}</p>
    </div>
);

const WhoShouldBookItem = ({ text, icon: Icon }) => (
    <li className="flex items-start space-x-3 text-left">
        <Icon className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
        <p className="text-gray-700">{text}</p>
    </li>
);


// --- Common Features for Booking Summary ---
const COMMON_BOOKING_FEATURES = [
    "✅ Personalized Sankalp (based on your name, gotra & purpose)",
    "✅ Homa performed by **Kashi Pandits**",
    "✅ Use of 108 herbal offerings & pure ghee",
    "✅ Live video link or full recording (optional)",
    "✅ Post-Homa digital blessings report",
    "✅ Guidance on post-homa rituals & do’s/don’ts",
];






// 🔮 Booking Modal Component (Responsive Adjustments)
const BookingModal = ({ isOpen, onClose, item }) => {
    if (!item) return null;

    // Combine item-specific features with common features
    const planFeatures = item.features || [];
    const panditCountText = item.panditCount ? `Homa performed by ${item.panditCount} Kashi Pandit${item.panditCount > 1 ? 's' : ''}` : null;

    let allFeatures;

    if (item.type === 'plan') {
        // For pricing plans, show plan features + common non-conflicting features
        allFeatures = [
            ...planFeatures,
            ...COMMON_BOOKING_FEATURES.filter(f => !f.includes('Homa performed by'))
        ];
    } else {
        // For individual services or generic booking, show standard features
        allFeatures = [
            "✅ Homa performed by **3–5 Kashi Pandits**",
            ...COMMON_BOOKING_FEATURES.filter(f => !f.includes('Homa performed by'))
        ];
    }

    // Modal variants for Framer Motion
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-orange-200 bg-opacity-70 z-50 flex justify-center items-center p-4 overflow-y-auto"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose} // Close on backdrop click
                >
                    <motion.div
                        // Responsive: Max-width is large enough for LG, p-4 on mobile, p-8 on MD+
                        className="relative bg-white rounded-xl max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 shadow-2xl transform transition-all duration-300" 
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                            aria-label="Close booking form"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* --------------------------------------------------- */}
                        {/* 💡 CHANGE: Display the selected Homa/Plan name here */}
                        {/* --------------------------------------------------- */}
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mb-2">
                            Book: {item.name}
                        </h2>
                        {item.type === 'plan' && (
                            <p className="text-xl text-red-600 font-bold mb-6">Price: {item.price}</p>
                        )}
                        <p className="text-gray-600 mb-8">{item.description || "Enter your details to proceed with this sacred Homa."}</p>

                        {/* Responsive Grid: Stacks on mobile, 2 columns on MD and up */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* 1. User Details Form */}
                            {/* Responsive divider: border-b on mobile, md:border-r on MD+ */}
                            <div className="border-b md:border-b-0 pb-8 md:pb-0 md:border-r md:pr-8">
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-amber-100 text-amber-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mr-3 font-bold">1</span>
                                    Fill in Your Details
                                </h3>

                                <div className="space-y-4">
                                    <FormInput Icon={User} label="Your Name" placeholder="Full Name for Sankalp" />
                                    <FormInput Icon={BookOpen} label="Gotra" placeholder="Optional, for higher Sankalp power" />
                                    <FormInput Icon={Calendar} label="Birth Details" placeholder="Date, Time, Place (for Astrological Alignment)" />
                                    <FormInput Icon={User} label="Purpose of Homa" placeholder={`e.g., Career Success with ${item.name}`} />
                                    <FormInput Icon={User} label="Contact Email" placeholder="Where to send the Live Link & Report" type="email" />
                                </div>

                                <motion.button
                                    className="mt-6 w-full py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-xl hover:from-red-700 hover:to-amber-700 transition duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => alert(`Proceeding to payment for ${item.name} with Sankalp details!`)}
                                >
                                    Proceed to Payment
                                </motion.button>
                            </div>

                            {/* 2. Service Features/Inclusions */}
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-green-100 text-green-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mr-3 font-bold">2</span>
                                    Homa Ritual Package – What’s Included
                                </h3>
                                <ul className="space-y-3 text-left">
                                    {allFeatures.map((feature, i) => (
                                        <li key={i} className="flex items-start text-gray-700 text-base sm:text-lg">
                                            <BadgeCheck className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                            <span dangerouslySetInnerHTML={{ __html: feature }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Simple reusable form input component (Unchanged)
const FormInput = ({ Icon, label, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
            <input
                type={type}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                placeholder={placeholder}
            />
        </div>
    </div>
);


const HomaInfoSection = ({ content }) => (
  <section className="bg-gradient-to-b from-amber-50 to-white text-gray-800 py-16 md:py-24">
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-16 lg:gap-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* --- Left Image Section --- */}
      <motion.div
        className="w-full md:w-[45%] relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200">
          <img
            src={content.image}
            alt="Homa Ritual"
            className="w-full h-[380px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </motion.div>

      {/* --- Right Text Content --- */}
      <motion.div
        className="w-full md:w-[50%] text-center md:text-left"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-amber-700 leading-tight">
          {content.title}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-700 mb-10 max-w-xl">
          {content.description}
        </p>

        <div className="space-y-6">
          {content.points.map((point, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-amber-500 hover:border-amber-600 hover:shadow-amber-100 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <p className="text-gray-800 text-base sm:text-lg font-medium">
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

// --- Content for Info Section Below ---
const INFO_CONTENT = {
  title: "What is Homa or Havan?",
  description:
    "A Homa (Havan) is the most powerful Vedic fire ritual, where sacred mantras are chanted, and offerings are made to Agni Dev — the Fire God — who acts as a divine messenger between humans and gods.",
  points: [
    "🔥 It’s not just a ritual; it’s an energy process that cleanses your aura, home, and karma.",
    "When performed in Kashi — the land of Lord Shiva — the power of the Homa multiplies manifolds."
  ],
  image:
    "images/homa/hawan-puja_1165568-315.avif"
};


// 🌟 Service Booking List (with Background Image)
const ServiceBookingList = ({ services, onBookClick }) => (
  <section
    className="py-16 md:py-20 bg-cover bg-center bg-no-repeat relative"
    style={{
      backgroundImage:
        "url('./WhatsApp Image 2025-11-08 at 17.01.29_129afa3a.jpg')",
    }}
  >
    {/* Optional overlay for better text readability */}
    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-amber-700">
        Book Your Preferred Homa & Havan Ceremony
      </h2>

      <div className="gradient-line"></div>

      {/* Vertical Separator Line (Only visible on MD+) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-500 -translate-x-1/2 hidden md:block z-0"></div>

      {/* Adjusted space-y for mobile */}
      <div className="space-y-16 md:space-y-20 relative z-10">
        {services.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className={`flex flex-col items-center md:gap-16 relative text-left ${
              index % 2 !== 0
                ? "md:flex-row-reverse md:text-right"
                : "md:flex-row"
            }`}
          >
            {/* 1. Text Content Box */}
            <div
              className={`flex-1 max-w-full md:max-w-xl p-6 sm:p-8 rounded-xl shadow-lg bg-white/90 md:p-10 transition-all duration-500 ease-out ${
                index % 2 === 0
                  ? "border-l-4 border-amber-600 hover:shadow-2xl hover:shadow-amber-200/50"
                  : "border-r-4 border-amber-600 hover:shadow-2xl hover:shadow-amber-200/50"
              }`}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-red-700 mb-3 leading-snug title-hover-line">
                {item.title}
              </h3>

              <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Book Now Button */}
              <motion.button
                onClick={() => onBookClick(item)}
                className="inline-block px-8 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-xl hover:bg-amber-700 transition-colors duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </div>

            {/* 2. Central Timeline Dot */}
            <div className="hidden md:flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-5 h-5 rounded-full bg-amber-600 ring-4 ring-white shadow-lg" />
            </div>

            {/* 3. Image Section */}
            <div className="flex-1 mt-6 md:mt-0 flex justify-center w-full md:w-auto">
              <div className="max-w-xs w-full overflow-hidden rounded-2xl shadow-2xl animate-border-spin p-[4px] bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-[14px] transform hover:scale-[1.03] transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



// 🌟 Pricing Card Component (Unchanged)
const PricingCard = ({ plan, index, onBookClick }) => (
    <motion.div
        className={`relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 transition-all duration-500 ease-in-out ${plan.color} ${plan.isPopular ? 'ring-4 ring-amber-500/50 scale-[1.03] shadow-2xl' : 'hover:shadow-2xl hover:scale-[1.01]'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        whileHover={{ y: plan.isPopular ? -10 : -5 }}
    >
        {plan.isPopular && (
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-6">
                Most Popular
            </div>
        )}

        <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
            {plan.name}
        </h3>

        <p className="text-5xl font-extrabold text-amber-600 mb-6">
            {plan.price}
        </p>

        <ul className="space-y-3 mb-8 text-left w-full">
            {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-gray-700">
                    <BadgeCheck className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        {/* Changed <a> to <button> and added onClick handler */}
        <motion.button
            onClick={() => onBookClick(plan)} // Pass plan to the handler
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-auto px-10 py-4 text-lg font-bold rounded-full text-white shadow-xl w-full text-center transition duration-300 ease-in-out
                ${plan.isPopular
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
                }
            `}
        >
            {plan.cta}
        </motion.button>
    </motion.div>
);



// ----------------------------------------------------------------------
// 4. MAIN LANDING PAGE COMPONENT (Responsive Adjustments)
// ----------------------------------------------------------------------

const LandingPage = () => { 

//  highlights
    const highlights = [
    { icon: '🌿', text: 'Performed in the sacred land of Kashi' },
    { icon: '🪔', text: 'Conducted by experienced, certified Vedic Pandits' },
    { icon: '📿', text: 'Personalized Sankalp (your name, gotra & intention)' },
    { icon: '🔥', text: 'Use of pure ghee, herbs, and vedic samagri' },
    { icon: '🕉', text: 'Mantras from Rigveda, Yajurveda, and Atharvaveda' },
    { icon: '📸', text: 'Live Streaming & Recorded Video Option Available' },
    { icon: '💫', text: 'Performed on Auspicious Muhurat (Selected by Jyotish Expert)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


     // Controls the transition from video (false) to final image background (true)
      const [isFinalState, setIsFinalState] = useState(false);
      // State to manage the visibility of the video element (for clean unmount)
      const [showVideo, setShowVideo] = useState(true);
    
      const handleVideoEnd = () => {
        setIsFinalState(true);
        setTimeout(() => {
          setShowVideo(false);
        }, 1500);
      };

      const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


     const [currentIndex, setCurrentIndex] = useState(0);
      const [showModal, setShowModal] = useState(false);
      const [showToast, setShowToast] = useState(false);
      const [feedback, setFeedback] = useState({
        name: "",
        role: "",
        text: "",
        rating: 0,
        avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
        images: [],
        videos: [],
      });
    
      const [reviews, setReviews] = useState([
        {
         name: "Rajesh Mishra",
                role: "Software Consultant, Mumbai",
                text: "My Maha Mrityunjaya Havan removed a lot of negativity from my life. Felt real peace and a renewed sense of purpose. Highly recommended.",
                rating: 5,
                img: "https://randomuser.me/api/portraits/men/9.jpg",
                images: [],
                videos: [],
        },
        {
          name: "Karan Singh",
                role: "Vedic Seeker",
                text: "Best part? Authentic Kashi Pandits and real chanting, not commercial. This is genuine Vedic service.",
                rating: 5,
                img: "https://randomuser.me/api/portraits/men/14.jpg",
                images: [],
                videos: [],
        },
        {
       name: "Ananya Sharma",
                role: "Student",
                text: "This course changed my life! The mentors explained astrology in such a simple and practical way.",
                rating: 5,
                img: "https://randomuser.me/api/portraits/women/65.jpg",
                images: [],
                videos: [],
        },
            {
      name: "Priya Singh",
                role: "Life Coach",
                text: "The certification helped me expand my career. The live classes and case studies are truly valuable.",
                rating: 5,
                img: "https://randomuser.me/api/portraits/women/22.jpg",
                images: [],
                videos: [],
        },
      ]);
    
      const handlePrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
      const handleNext = () =>
        currentIndex < reviews.length - 3 && setCurrentIndex(currentIndex + 1);
      const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
    
      // Avatar Upload
      const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) setFeedback({ ...feedback, avatar: URL.createObjectURL(file) });
      };
    
      // Image Upload
      const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setFeedback((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
      };
    
      // Video Upload
      const handleVideoUpload = (e) => {
        const files = Array.from(e.target.files);
        const newVideos = files.map((file) => URL.createObjectURL(file));
        setFeedback((prev) => ({ ...prev, videos: [...prev.videos, ...newVideos] }));
      };
    
      const removeImage = (i) =>
        setFeedback((prev) => ({
          ...prev,
          images: prev.images.filter((_, idx) => idx !== i),
        }));
    
      const removeVideo = (i) =>
        setFeedback((prev) => ({
          ...prev,
          videos: prev.videos.filter((_, idx) => idx !== i),
        }));
    
      const handleRating = (rating) => setFeedback({ ...feedback, rating });
    
      // Submit feedback
      const handleSubmit = (e) => {
        e.preventDefault();
        const newFeedback = {
          name: feedback.name,
          role: feedback.role,
          text: feedback.text,
          rating: feedback.rating,
          img: feedback.avatar,
          images: feedback.images,
          videos: feedback.videos,
        };
        setReviews([newFeedback, ...reviews]);
        setFeedback({
          name: "",
          role: "",
          text: "",
          rating: 0,
          avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
          images: [],
          videos: [],
        });
        setShowModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setCurrentIndex(0);
      };

    // --- State for Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Holds the service or plan data

    // --- Steps Data (Unchanged) ---
    const steps = [
        {
            id: 1,
            title: "Authenticity",
            icon: <Handshake className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-4" />,
        },
        {
            id: 2,
            title: "Transparency",
            icon: <BadgeCheck className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-4" />,
        },
        {
            id: 3,
            title: "Personalization",
            icon: <LifeBuoy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-4" />,
        },
        {
            id: 4,
            title: "Spritiual Impact",
            icon: <LiaPrayingHandsSolid className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-4" />,
        },
        {
            id: 5,
            title: "Accessibility",
            icon: <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 mx-auto mb-4" />,
        },
    ];

    // --- Handler to open modal with item data ---
    const handleBookClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // --- Handler for the main CTA button in the pricing section ---
    const handleCentralBookNow = () => {
        // Create a generic item object for the general CTA
        const genericItem = {
            name: "Custom Homa Booking",
            description: "A customized Homa to meet your specific spiritual or life goals.",
            type: "generic",
        };
        handleBookClick(genericItem);
    }


    return (
        <>
            {/* --- CUSTOM CSS (Unchanged) --- */}
            <style>
                {`
                    /* Custom CSS for Main Section Gradient Line */
                    .gradient-line {
                        height: 4px;
                        width: 80px;
                        margin: 0 auto 4rem auto; /* Center the line and add space below it */
                        background: linear-gradient(to right, #F97316, #FBBF24, #EF4444); /* Orange-Yellow-Red Gradient */
                        border-radius: 9999px;
                    }

                    /* Keyframes for the border animation */
                    @keyframes border-spin {
                        0% { border-color: #FBBF24; box-shadow: 0 0 10px 1px #FBBF24; } /* Yellow */
                        25% { border-color: #F97316; box-shadow: 0 0 10px 1px #F97316; } /* Orange */
                        50% { border-color: #EF4444; box-shadow: 0 0 10px 1px #EF4444; } /* Red */
                        75% { border-color: #D97706; box-shadow: 0 0 10px 1px #D97706; } /* Amber-700 */
                        100% { border-color: #FBBF24; box-shadow: 0 0 10px 1px #FBBF24; }
                    }

                    /* Class for applying the border animation */
                    .animate-border-spin {
                        animation: border-spin 4s linear infinite;
                        border-style: solid;
                        border-width: 4px;
                        transition: all 0.3s ease-in-out;
                    }

                    /* Custom CSS for Title Hover Gradient Line */
                    .title-hover-line {
                        display: inline-block;
                        position: relative;
                        cursor: pointer; /* Indicate it's interactive */
                    }

                    /* The actual line element (hidden by default) */
                    .title-hover-line::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: -5px; /* Position it slightly below the text */
                        height: 3px;
                        width: 100%;
                        background: linear-gradient(to right, #F97316, #FBBF24, #EF4444); /* Fiery Gradient */
                        border-radius: 9999px;
                        transform: scaleX(0); /* Start hidden */
                        transform-origin: left;
                        transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1); /* Smooth transition */
                    }

                    /* Show the line on hover */
                    .title-hover-line:hover::after {
                        transform: scaleX(1); /* Expand to full width */
                    }
                `}
            </style>
            {/* ---------------------------------------------------- */}



 <section className="relative w-full overflow-hidden max-h-[90vh]   md:h-screen flex flex-col justify-end bg-gray-900">

      {/* ---------------- BACKGROUNDS (VIDEO + IMAGE) ---------------- */}9
      <AnimatePresence>
        {/* 🎥 Initial Background Video */}
        {showVideo && (
          <motion.video
            key="background-video"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="images/homa/Hailuo_Video_generate video havan , like va_443248759853068294.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          />
        )}

        {/* 🖼️ Final Full Background Image */}
        {isFinalState && (
          <motion.img
            key="background-image"
            src="images/homa/dc3de1f1-c4db-4c8a-ba17-3b916f2b8c29.jpg"
            alt="Homa Havan Final Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            variants={imageBackgroundVariants}
            initial="initial"
            animate="animate"
          />
        )}
      </AnimatePresence>

      {/* ---------------- TEXT + BUTTON (ONLY ON VIDEO) ---------------- */}
      <AnimatePresence>
        {!isFinalState && (
          <motion.div
            key="video-overlay-content"
            className="absolute inset-0 flex flex-col items-start justify-center p-4 sm:p-8 md:p-16 lg:p-24 z-20 text-white"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* Title */}
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-3 tracking-tight leading-tight drop-shadow-2xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Vedic Homa & Puja Services
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 font-medium max-w-sm sm:max-w-md md:max-w-xl drop-shadow-xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              Bringing peace, prosperity, and blessings to your life through ancient rituals.
            </motion.p>

            {/* Button */}
            <motion.button
              className="px-5 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-gray-900 font-bold uppercase rounded-full shadow-2xl hover:bg-yellow-400 transform hover:scale-105 transition duration-300 ring-2 sm:ring-4 ring-yellow-300 ring-opacity-50 text-xs sm:text-sm md:text-base"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Book Your Havan Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- SCROLLING HIGHLIGHT BAR ---------------- */}
      <motion.div
        className="w-full bg-gradient-to-r from-orange-600/95 via-yellow-500/95 to-orange-600/95 text-white py-3 font-extrabold text-xs sm:text-sm md:text-lg lg:text-xl overflow-hidden relative z-50 drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          <span className="mx-10 uppercase tracking-widest">🔥 Book Auspicious Homa & Havan Services for Every Occasion 🔥</span>
          <span className="mx-10 uppercase tracking-widest">🙏 Performed by Experienced Vedic Priests at Your Home or Venue 🙏</span>
          <span className="mx-10 uppercase tracking-widest">✨ Bring Peace, Prosperity, and Positive Energy into Your Life ✨</span>
          <span className="mx-10 uppercase tracking-widest">🕉️ Special Homas for Health, Wealth, Career Growth & Protection 🕉️</span>
          <span className="mx-10 uppercase tracking-widest">📜 Authentic Vedic Procedure with Complete Puja Samagri Included 📜</span>
          <span className="mx-10 uppercase tracking-widest">🔥 Satyanarayan Katha, Griha Pravesh, Navagraha Havan & More 🔥</span>
        </motion.div>
      </motion.div>
    </section>

            {/* <Hero /> */}

            {/* 🚀 Homa Information Section */}
            <HomaInfoSection content={INFO_CONTENT} />

            {/* 🌟 Service Booking List Section
            <ServiceBookingList services={SERVICES_LIST} onBookClick={handleBookClick} /> */}



            {/*  */}

            <NityaAtiRudrabhishek />
            
            {/*  */}




            {/* ===== Features Section (Responsive Adjustments) ===== */}
            <section className="bg-gray-50 py-16 md:py-24 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-12 text-center">

                    <h2 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-10">
                        🔱  Why Choose Veda Structure?
                    </h2>

                    <div className="flex justify-center">
                        {/* Responsive Grid: grid-cols-2 on mobile, sm:grid-cols-3, md:grid-cols-5 */}
                        <div className="grid grid-cols gap-6 sm:grid-cols-1 md:grid-cols-5 md:gap-8 lg:gap-12 max-w-full">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    // Adjusted padding (p-4 on mobile, p-6 on sm) and minimum height
                                    className="p-4 sm:p-6 rounded-xl bg-white shadow-lg border border-yellow-200/50 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl min-h-[140px] lg:min-h-[180px] justify-center"
                                >
                                    {step.icon}

                                    {/* Adjusted title size for responsiveness */}
                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-yellow-900 mt-2 leading-snug">
                                        {step.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            


                {/*  */}
            {/* <Testimonial /> */}

            {/* 🌟 Pricing/Plan Section (Responsive Adjustments) */}
            {/* <section className="bg-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center"> */}

                    {/* Section Title - Adjusted size */}
                    {/* <h2 className="text-3xl md:text-5xl font-extrabold text-amber-600 mb-4">
                        Choose Your Homa Plan
                    </h2> */}

                    {/* Adjusted text size and margin */}
                    {/* <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16">
                        Select the sacred fire ceremony that aligns with your spiritual needs and goals.
                    </p> */}

                    {/* Pricing Cards Grid - Already responsive (1 col on mobile, 3 on MD+) */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
                        {PRICING_PLANS.map((plan, index) => (
                            <PricingCard
                                key={index}
                                plan={plan}
                                index={index}
                                onBookClick={handleBookClick} // Pass the handler
                            />
                        ))}
                    </div> */}

                    {/* Central CTA Button - Adjusted padding/font size for mobile */}
                    {/* <motion.button
                        onClick={handleCentralBookNow}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-12 md:mt-16 inline-block px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full bg-red-600 text-white shadow-2xl hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:ring-8 ring-red-300/50"
                    >
                        🔥 Book Your Homa Now — Invoke Divine Fire Energy
                    </motion.button>

                </div>
            </section> */}

             <div className="bg-gray-50 flex flex-col items-center py-16 px-4">
                        <div className="max-w-4xl w-full">
                            {/* Title */}
                            <h2 className="text-4xl font-extrabold text-center text-red-700 mb-2">
                                Frequently Asked Questions
                            </h2>
            
                            {/* border image */}
                            <div className="flex justify-center mb-10">
                                <img
                                    src="https://aap.astroarunpandit.org/wp-content/uploads/2025/07/wave-1-768x54.png"
                                    alt="decorative border"
                                    className="w-48 md:w-64 lg:w-72"
                                />
                            </div>
                            
                            <p className="text-center text-gray-600 mb-12 text-xl font-medium max-w-2xl mx-auto">
                                Find **quick, authentic answers** to common questions about our Vedic services and spiritual offerings.
                            </p>
                            
                            {/* --- CONTEXTUAL SECTIONS (New Data) --- */}
                            <div className="grid md:grid-cols-2 gap-12 mb-16">
                                
                                {/* How It Works */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-amber-600">
                                    <h3 className="text-2xl font-bold text-amber-700 mb-6 flex items-center justify-center md:justify-start">
                                        <Zap className="w-6 h-6 mr-2" /> How Your Homa Works
                                    </h3>
                                    <div className="space-y-4">
                                        <HowItWorksItem step={1} text="Fill in your **Name, Gotra & Birth Details** accurately on the booking form." />
                                        <HowItWorksItem step={2} text="Choose your desired **Homa / Havan** based on your goals or astrologer's advice." />
                                        <HowItWorksItem step={3} text="**Vedic Pandits** perform your ritual authentically in sacred **Kashi (Varanasi)**." />
                                        <HowItWorksItem step={4} text="Receive **live video** link, photos, and a **blessings certificate** after completion." />
                                    </div>
                                </div>
                                
                                {/* Who Should Book This Homa / Havan */}
                                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-600">
                                    <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center justify-center md:justify-start">
                                        <Lightbulb className="w-6 h-6 mr-2" /> Who Should Book This?
                                    </h3>
                                    <ul className="space-y-4 list-none pl-0">
                                        <WhoShouldBookItem icon={Ban} text="Facing **repeated obstacles or failures** in personal or professional life." />
                                        <WhoShouldBookItem icon={Shield} text="Feeling **negative energy or restlessness** at home or around your aura." />
                                        <WhoShouldBookItem icon={HeartCrack} text="Experiencing relationship, health, or **financial instability**." />
                                        <WhoShouldBookItem icon={Sparkles} text="Seeking **peace, protection,** and profound **divine blessings**." />
                                        <WhoShouldBookItem icon={CheckCircle} text="Wanting to begin a new phase of life (e.g., new job, marriage, home) with **purity and auspiciousness**." />
                                    </ul>
                                </div>
                            </div>
                            {/* --- END CONTEXTUAL SECTIONS --- */}
            
                            {/* FAQ List */}
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-100 rounded-lg">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
                                    >
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full flex justify-between items-center px-6 py-4 text-left text-red-800 font-semibold text-lg hover:bg-yellow-50 transition"
                                        >
                                            {faq.question}
                                            {openIndex === index ? (
                                                <ChevronUp className="w-6 h-6 text-amber-600 flex-shrink-0 ml-4" />
                                            ) : (
                                                <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0 ml-4" />
                                            )}
                                        </button>
            
                                        {/* Answer with smooth transition */}
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                openIndex === index ? "max-h-40 px-6 pb-4" : "max-h-0"
                                            }`}
                                        >
                                            <div className="text-gray-600 border-t border-gray-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            {/* <FAQPage /> */}


    {/* // Outer container: Softer, slightly off-white background for a premium feel */}
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      {/* Content wrapper for centering and max width */}
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Main Heading and Havan Image Container */}
        <div className="flex items-center justify-center mb-6"> {/* Flex container for heading and image */}
          {/* Main Heading - Larger, more impactful */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }} // Animate from left for heading
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mr-4" // Added mr-4 for spacing
          >
            Let the Power of <span className="text-orange-600">Sacred Fire</span> Transform You.
          </motion.h2>

          {/* Small Havan Image on the Right */}
          <motion.img
            src="./pngtree-indian-hindu-wedding-mandap-fire-design-havan-kund-homam-vector-png-image_15190267 (1).png" // <--- REPLACE THIS WITH YOUR IMAGE PATH
            alt="Sacred Havan Fire"
            initial={{ opacity: 0, x: 30 }} // Animate from right for image
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 object-contain" // Adjust size as needed
          />
        </div>
        
        {/* Core Description - More refined font size and spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Homas are *living oblations*. When offered with devotion, they align your environment, consciousness, and aspirations with purifying universal energies. At Veda Structure, we bring this ancient Vedic healing into your life.
        </motion.p>
        
        {/* --- CTA Button with Framer Motion --- */}
        <motion.a
          href="#" // Link your booking page here
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(255, 120, 0, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-12 py-5 border border-transparent text-xl font-bold rounded-xl shadow-2xl text-white bg-orange-600 hover:bg-orange-700 transition duration-300 ease-in-out uppercase tracking-wide transform hover:-translate-y-1"
        >
          Book Your Path Now – Experience the Energy
        </motion.a>
        
      </div>
    </div>

            {/* 💡 Booking Modal (Placed at the end for z-index visibility) */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
            />
        </>
    );
};

export default LandingPage;

// import React from "react"

// const HomaHavan = () => {
//     return (
//         <div className="bg-cream text-charcoal font-sans antialiased">
//             {/* HEADER */}
//             <header className="relative flex min-h-screen items-end overflow-hidden text-white md:items-center">
//                 <div className="absolute inset-0 z-0">
//                     <img src="/images/nitya-ati/banner.jpg" alt="Sacred fire ritual Homa ceremony" className="h-full w-full object-cover" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//                 </div>

//                 <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:px-12 md:pb-0 md:text-left">
//                     <h1 className="font-serif text-5xl leading-tight font-bold tracking-wide md:text-7xl">Awaken the Fire of Transformation</h1>
//                     <p className="mt-4 max-w-2xl text-lg text-amber-300 md:text-xl">
//                         Participate in our sacred Homa | Havan rituals to purify your body, mind, and soul through the power of Agni — the divine fire.
//                     </p>
//                     <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
//                         <a
//                             href="#participate"
//                             className="bg-saffron-500 hover:bg-saffron-600 flex w-full transform items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-105 sm:w-auto"
//                         >
//                             Book Your Homa
//                         </a>
//                         <a
//                             href="#live"
//                             className="hover:text-charcoal flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-black/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white sm:w-auto"
//                         >
//                             Watch Live Ceremony
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
//                                 <div className="rounded-t-full rounded-b-xl border-2 border-yellow-500/30 bg-orange-100 p-4 shadow-2xl">
//                                     <div className="overflow-hidden rounded-t-full rounded-b-lg">
//                                         <img
//                                             src="/images/nitya-ati/Kashi Vishvnath.jpg"
//                                             alt="Sacred fire offerings in a Homa ceremony"
//                                             className="h-auto w-full transform object-cover transition-transform duration-500 hover:scale-110"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-center lg:text-left">
//                                 <h2 className="font-serif text-4xl leading-tight font-bold text-gray-800 md:text-5xl">The Sacred Essence of Homa</h2>
//                                 <p className="mt-4 text-lg text-orange-600">
//                                     Homa or Havan is an ancient Vedic fire ritual that invokes divine energies and purifies the atmosphere through sacred offerings to Agni, the fire deity.
//                                 </p>
//                                 <div className="mx-auto my-8 h-px w-2/3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent lg:mx-0"></div>
//                                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🔥</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Agni Invocation</h3>
//                                         <p className="mt-2 text-sm text-gray-600">The fire represents transformation — turning offerings into divine blessings and purifying energies.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🌿</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Sacred Offerings</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Ghee, herbs, and grains are offered into the fire with mantras to harmonize nature and the soul.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">📜</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Mantra Recitation</h3>
//                                         <p className="mt-2 text-sm text-gray-600">Ancient Sanskrit chants vibrate through the air, cleansing subtle layers of consciousness.</p>
//                                     </div>
//                                     <div className="rounded-lg border border-yellow-500/30 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-yellow-500 hover:shadow-lg">
//                                         <div className="mb-3 text-4xl text-orange-500">🙏</div>
//                                         <h3 className="text-xl font-semibold text-gray-800">Divine Connection</h3>
//                                         <p className="mt-2 text-sm text-gray-600">The ritual unites the devotee’s heart with universal energies, invoking divine grace and protection.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* BENEFITS SECTION */}
//                 <section id="benefits" className="overflow-hidden py-24">
//                     <div className="container mx-auto px-6">
//                         <div className="mx-auto mb-16 max-w-3xl text-center">
//                             <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Purify, Protect, and Prosper</h2>
//                             <p className="mt-4 text-lg text-orange-600">Discover how performing Homa invites divine blessings into every aspect of life.</p>
//                         </div>
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="flex w-full justify-center">
//                                 <img src="/images/nitya-ati/medi.jpg" alt="Meditation and purification after fire ritual" className="max-h-[600px] rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute top-0 bottom-0 left-4">
//                                     <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-yellow-300">
//                                         <line x1="1" y1="0" x2="1" y2="100%" strokeWidth="2" />
//                                     </svg>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {[
//                                         { title: "Spiritual Cleansing", desc: "Burn away karmic impurities and emotional burdens through divine fire energy." },
//                                         { title: "Improved Health & Energy", desc: "Enhance vitality, immunity, and balance the five elements within the body." },
//                                         { title: "Protection from Negativity", desc: "Agni dev dispels dark influences, restoring harmony in your home and aura." },
//                                         { title: "Family Harmony", desc: "Promotes love, understanding, and auspicious vibrations in family life." },
//                                         { title: "Wealth & Prosperity", desc: "Attract abundance and remove blockages to success through sacred offerings." },
//                                     ].map((b, i) => (
//                                         <div key={i} className="group relative pl-12">
//                                             <div className="absolute top-0 left-0 flex h-full items-center">
//                                                 <div className="bg-cream absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
//                                                 <div className="absolute top-1/2 left-4 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
//                                                     🔥
//                                                 </div>
//                                             </div>
//                                             <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">{b.title}</h3>
//                                             <p className="mt-1 text-gray-600">{b.desc}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* PARTICIPATION SECTION */}
//                 <section id="participate" className="py-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')" }}>
//                     <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
//                             <div className="hidden lg:block">
//                                 <img src="/images/nitya-ati/download.jpg" alt="Devotees performing sacred Homa ritual" className="h-full w-full rounded-2xl object-cover shadow-2xl" />
//                             </div>
//                             <div>
//                                 <div className="mb-12 text-center lg:text-left">
//                                     <h2 className="font-serif text-4xl font-bold text-gray-800 md:text-5xl">Join the Sacred Fire</h2>
//                                     <p className="mt-4 text-lg text-orange-600">Take part in this ancient Vedic ceremony and experience its purifying grace.</p>
//                                 </div>
//                                 <div className="space-y-8">
//                                     {[
//                                         { step: "01", title: "Select Your Intention", desc: "Choose the purpose of your Homa — for peace, prosperity, or spiritual upliftment." },
//                                         { step: "02", title: "Submit Participant Details", desc: "Provide your name and details so that priests can include you in the offerings." },
//                                         { step: "03", title: "Join the Live Ritual", desc: "Witness the sacred fire ceremony online and connect energetically with Agni Dev." },
//                                         { step: "04", title: "Receive Divine Blessings", desc: "Feel renewed energy, harmony, and blessings in your home and heart." },
//                                     ].map((p, i) => (
//                                         <div key={i} className="group flex items-start gap-6 rounded-lg p-4 transition-colors duration-300 hover:bg-white">
//                                             <div className="flex-shrink-0 font-serif text-4xl font-bold text-yellow-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500">
//                                                 {p.step}
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">{p.title}</h3>
//                                                 <p className="mt-1 text-gray-600">{p.desc}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-12 text-center lg:text-left">
//                                     <a
//                                         href="#register"
//                                         className="inline-block transform rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-orange-400/50"
//                                     >
//                                         Book Your Homa Now
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
//                             <h2 className="text-charcoal font-serif text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
//                         </div>
//                         <div className="space-y-4">
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     What is a Homa or Havan?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Homa or Havan is an ancient Vedic fire ritual performed to invoke divine blessings, remove negativity, and purify the surroundings. Offerings made into the sacred
//                                     fire are believed to reach the deities through Agni, the messenger of gods.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Can I participate from home?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Yes, you can join our Homa live online. When you register, your name and intention will be included in the offerings by our Vedic priests.
//                                 </p>
//                             </details>
//                             <details className="group rounded-lg bg-white p-6 shadow-sm">
//                                 <summary className="text-charcoal flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
//                                     Who performs the Homa?
//                                     <span className="relative ml-4 h-5 w-5">
//                                         <svg
//                                             className="text-saffron-500 absolute h-5 w-5 transition-transform duration-300 group-open:rotate-180"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <p className="mt-4 text-slate-600">
//                                     Our ceremonies are conducted by experienced Vedic priests who are well-versed in the Shastras and traditional fire rituals, ensuring authenticity and divine
//                                     sanctity.
//                                 </p>
//                             </details>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     )
// }

// export default HomaHavan

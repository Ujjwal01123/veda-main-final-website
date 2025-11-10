import React from "react"

const services = [
    {
        icon: "🔮",
        title: "Astrological Consultations",
        desc: "Personalized consultations by experienced astrologers to help you understand life challenges & make informed decisions.",
        bg: "bg-yellow-100",
        text: "text-yellow-500",
        aos: "fade-right",
        delay: "100",
    },
    {
        icon: "📜",
        title: "Horoscope Predictions",
        desc: "Get daily, weekly, and monthly horoscope updates crafted by our expert astrologers.",
        bg: "bg-purple-100",
        text: "text-purple-500",
        aos: "fade-up",
        delay: "200",
    },
    {
        icon: "🛕",
        title: "Online Puja Services",
        desc: "Book personalized online puja rituals with our knowledgeable pandits for your well-being.",
        bg: "bg-pink-100",
        text: "text-pink-500",
        aos: "fade-left",
        delay: "300",
    },
    {
        icon: "📿",
        title: "Vedic Products",
        desc: "Explore authentic Vedic products including Rudraksha, malas, yantras & gemstones delivered to your doorstep.",
        bg: "bg-green-100",
        text: "text-green-500",
        aos: "fade-right",
        delay: "400",
    },
    {
        icon: "📚",
        title: "Online Courses",
        desc: "Deepen your spiritual knowledge with our astrology & Vedic science courses available online.",
        bg: "bg-blue-100",
        text: "text-blue-500",
        aos: "fade-up",
        delay: "500",
    },
    {
        icon: "📝",
        title: "Informative Blogs",
        desc: "Access a comprehensive library of blogs covering astrology, puja rituals, gemstones & more.",
        bg: "bg-orange-100",
        text: "text-orange-500",
        aos: "fade-left",
        delay: "600",
    },
    {
        icon: "📝",
        title: "Online Pandit Services",
        desc: "Connect with our experienced pandits for personalized guidance and assistance with various aspects of Hinduism, including puja ceremonies, sloka recitations, and spiritual counseling.",
        bg: "bg-orange-100",
        text: "text-orange-500",
        aos: "fade-left",
        delay: "600",
    },
    {
        icon: "📝",
        title: "Puja in Varanasi",
        desc: "Fulfill your desire to perform pujas in the holy city of Varanasi. We offer puja services performed by our pandits in Varanasi, adhering to the specific guidelines outlined in the Kashi Khand.",
        bg: "bg-orange-100",
        text: "text-orange-500",
        aos: "fade-left",
        delay: "600",
    },
    {
        icon: "📝",
        title: "Rudraksha & Gemstones",
        desc: "We provide a curated selection of authentic rudraksha beads and gemstones, each chosen for its specific qualities and potential benefits.",
        bg: "bg-orange-100",
        text: "text-orange-500",
        aos: "fade-left",
        delay: "600",
    },
]
export default function Services() {
    return (
        <section className="bg-gray-50 px-6 py-16 md:px-20">
            <div className="mx-auto mb-12 max-w-7xl text-center">
                <h2 className="text-3xl font-bold text-gray-800 md:text-4xl" data-aos="fade-up">
                    Our Services
                </h2>
                <p className="mt-3 text-lg text-gray-600" data-aos="fade-down">
                    Explore our comprehensive range of spiritual services designed to support your journey towards inner peace and divine connection.
                </p>
            </div>

            {/* Grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {services.map((service, i) => (
                    <div key={i} className="service-card rounded-xl bg-white p-6 shadow-md transition-all duration-300" data-aos={service.aos} data-aos-delay={service.delay}>
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${service.bg} ${service.text} mb-4 text-2xl`}>{service.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

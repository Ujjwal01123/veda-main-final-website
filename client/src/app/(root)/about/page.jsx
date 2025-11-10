import AboutVidComp from "@/components/AboutVidComp"
import Stat from "@/components/Stat"
import Link from "next/link"

const features = [
    {
        imageSrc: "https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp",
        title: "Latest Milling Machinery",
    },
    {
        imageSrc: "https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp",
        title: "Reasonable Rates",
    },
    {
        imageSrc: "https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp",
        title: "Time Efficiency",
    },
    {
        imageSrc: "https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp",
        title: "Expertise in Industry",
    },
]

const images = [
    {
        src: "/images/tp_img/rudraks.jpg",
        alt: "Woman with a dog",
        rotation: "rotate-6",
        link: "/rudraksha",
    },
    {
        src: "/images/tp_img/yantra.jpg",
        alt: "Man taking a photo",
        rotation: "-rotate-12",
        link: "#",
    },
    {
        src: "/images/tp_img/gemstone.jpg",
        alt: "Cityscape at dusk",
        rotation: "rotate-6",
        link: "#",
    },
    {
        src: "/images/tp_img/seven_c.jpg",
        alt: "Person sitting with a laptop",
        rotation: "-rotate-12",
        link: "#",
    },
]

const reviewsData = [
    {
        name: "Ananya Sharma",
        title: "Heartfelt & Simple",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        review: `Every visit fills me with calmness and clarity. This place has given me strength in difficult times and joy in everyday life. It feels like a true home for my soul.`,
    },
    {
        name: "Gayatri Iyer",
        title: "Devotee",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        review: `The divine atmosphere here is beyond words. I always leave with a peaceful heart and renewed positivity to face life’s challenges.`,
    },
    {
        name: "Rohan Verma",
        title: "Spiritual Seeker",
        avatar: "https://randomuser.me/api/portraits/men/18.jpg",
        review: `Being connected here has been a turning point in my spiritual journey. The teachings are simple yet powerful, and they resonate with my daily life.`,
    },
    {
        name: "Meera Nair",
        title: "Family-Oriented Devotee",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        review: `Visiting with my family has been a blessing. It brings us closer not only to the divine but also strengthens the love and harmony in our home.`,
    },
    {
        name: "Arjun Singh",
        title: "Youth Devotee",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        review: `As a young devotee, I find the guidance here inspiring and practical. It motivates me to live with faith while staying grounded in today’s world.`,
    },
    {
        name: "Kavya Deshmukh",
        title: "Grateful Devotee",
        avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        review: `This place feels like a sanctuary of love and light. Every prayer here fills me with gratitude and brings me a step closer to the divine.`,
    },
]

function page() {
    return (
        <>
            <div className="relative flex min-h-[550px] animate-[gradient-animation_10s_ease-in-out_infinite] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 bg-[length:200%_200%] px-4 sm:min-h-[560px] dark:bg-gray-950 dark:text-white">
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative z-10 order-2 flex flex-col justify-center gap-4 text-center sm:order-1 sm:pt-0 sm:text-left">
                            <h1 data-aos="zoom-out" data-aos-duration="500" data-aos-once="true" className="text-5xl font-bold text-red-950/85 sm:text-6xl lg:text-7xl">
                                Your one-stop shop for all things Vedic
                            </h1>
                            <p data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" className="text-lg text-yellow-800">
                                From gemstones to yantras, explore our curated collection of authentic Vedic products.
                            </p>
                        </div>
                        <div className="order-1 sm:order-2">
                            <div data-aos="zoom-in" data-aos-once="true" className="relative z-10">
                                <img src={"/images/about-hero-img.png"} alt="" className="mx-auto max-h-[400px] object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="body-font text-gray-700">
                <div className="mt-12 flex justify-center text-4xl font-semibold">Why Us?</div>
                <div className="container mx-auto px-5 py-6">
                    <div className="flex flex-wrap justify-center text-center">
                        {features.map((feature, index) => (
                            <div className="p-4 sm:w-1/2 md:w-1/4" key={index}>
                                <div className="duration-500">
                                    <div className="flex justify-center">
                                        <img src={feature.imageSrc} className="mb-3 w-32" alt={feature.title} />
                                    </div>
                                    <h2 className="title-font font-regular text-xl text-neutral-800">{feature.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            <div className="bg-gray-100">
                <div className="pt-10">
                    <h3 className="text-center text-4xl font-bold text-red-800">Top Products</h3>
                </div>

                <div className="2xl:max-w-screen-3xl mx-auto flex max-w-screen-xl flex-col justify-center px-8 py-12 md:px-12 lg:py-24">
                    <div className="mx-auto flex flex-col sm:flex-row">
                        {images.map((image, index) => (
                            <Link key={index} href={image.link}>
                                <img
                                    src={image.src}
                                    className={`rounded-xl ${image.rotation} h-full w-full origin-bottom transform object-cover duration-500 hover:-translate-y-12 hover:scale-150 hover:rotate-0`}
                                    alt={image.alt}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-white sm:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-y-0 right-1/2 -z-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-gray-200/50 sm:right-1/2 sm:skew-x-0 md:right-2/3"></div>
                    <div className="absolute top-0 left-0 -z-20 h-1/3 w-full rounded-b-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 -z-20 h-1/3 w-full rounded-t-full bg-gradient-to-l from-yellow-400/10 to-yellow-500/10 blur-3xl"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 text-left">
                        <section class="mx-auto max-w-5xl rounded-2xl bg-gradient-to-b from-yellow-50 via-orange-50 to-yellow-100 px-6 py-12 leading-relaxed text-gray-800 shadow-lg">
                            <h1 class="mb-6 text-center text-4xl font-extrabold text-yellow-700">🌸 About Veda Structure</h1>

                            <p>
                                Veda is eternal. Dharma is timeless. And through <strong>Veda Structure</strong>, we bring this eternal wisdom into the lives of modern seekers.
                            </p>
                            <p class="mt-3">
                                Veda Structure is not just a service — it is a sacred mission. Our purpose is to preserve the purity of Sanatan traditions while making them accessible to everyone who
                                wishes to walk the path of clarity, peace, and spiritual awakening.
                            </p>
                            <p class="mt-3">
                                We are a dedicated family of astrologers, Vedic pundits, spiritual scholars, and energy healers, united by one vision — to guide humanity through the wisdom of
                                astrology, mantras, rituals, and sacred tools. Whether it is a personal problem, family challenge, or spiritual journey, Veda Structure is here as your trusted
                                companion.
                            </p>

                            <h2 class="mt-10 mb-3 text-2xl font-bold text-yellow-700">✨ Our Sacred Purpose</h2>
                            <ul class="list-inside list-disc space-y-2">
                                <li>
                                    🌿 <strong>To Preserve Authenticity</strong> – Every mantra, every puja, and every ritual we perform is rooted in scriptures and performed with devotion.
                                </li>
                                <li>
                                    🌿 <strong>To Offer Guidance</strong> – Astrology is not about fear, it is about awareness. We help you understand your karmic patterns and choose the right
                                    remedies for a harmonious life.
                                </li>
                                <li>
                                    🌿 <strong>To Empower Seekers</strong> – Through kundali analysis, personalized remedies, and spiritual tools, we empower individuals to face challenges with
                                    strength and confidence.
                                </li>
                                <li>
                                    🌿 <strong>To Build a Spiritual Family</strong> – Veda Structure is not just about services. It is a community of seekers walking the path of Sanatan Dharma
                                    together.
                                </li>
                            </ul>

                            <h2 class="mt-10 mb-3 text-2xl font-bold text-yellow-700">🌺 Who We Are</h2>
                            <p>Veda Structure was founded with one vision — to create a bridge between the eternal knowledge of the Vedas and the needs of today’s world.</p>
                            <p class="mt-3">Our team consists of:</p>
                            <ul class="mt-2 list-inside list-disc space-y-2">
                                <li>
                                    <strong>Experienced Astrologers</strong> – Guiding seekers with accurate kundali analysis, predictions, and remedies.
                                </li>
                                <li>
                                    <strong>Vedic Pundits & Priests</strong> – Performing pujas, yagyas, and rituals in sacred places like Kashi, Ujjain, and Haridwar.
                                </li>
                                <li>
                                    <strong>Spiritual Experts</strong> – Helping seekers choose authentic Rudraksha, gemstones, and yantras that truly work.
                                </li>
                                <li>
                                    <strong>Teachers & Scholars</strong> – Sharing knowledge through blogs, courses, and consultations to help spread awareness of Sanatan Dharma.
                                </li>
                            </ul>
                            <p class="mt-3">
                                Each member of our team works with devotion, integrity, and respect for tradition, ensuring that every seeker receives not just a service — but a divine experience.
                            </p>

                            <h2 class="mt-10 mb-3 text-2xl font-bold text-yellow-700">🔱 What We Offer</h2>
                            <ul class="list-inside list-disc space-y-2">
                                <li>
                                    🌸 <strong>Personalized Kundali & Astrology</strong> – Deep analysis of your horoscope, numerology, and planetary positions to unlock the hidden patterns of your
                                    destiny.
                                </li>
                                <li>
                                    🌸 <strong>Sacred Pujas & Yagyas</strong> – Performed with Vedic mantras by experienced priests, covering health, wealth, relationships, prosperity, and spiritual
                                    progress.
                                </li>
                                <li>
                                    🌸 <strong>Rudraksha & Gemstones</strong> – Authentic, energized, and blessed tools to align you with cosmic energies and bring balance into your life.
                                </li>
                                <li>
                                    🌸 <strong>Spiritual Guidance & Learning</strong> – Through our blogs, articles, and courses, we help seekers understand Vedic traditions and apply them in their
                                    daily life.
                                </li>
                                <li>
                                    🌸 <strong>Global Services</strong> – Whether you live in India or abroad, our services, consultations, and rituals are available worldwide — so that distance never
                                    comes between you and divine blessings.
                                </li>
                            </ul>

                            <h2 class="mt-10 mb-3 text-2xl font-bold text-yellow-700">🌿 Why Choose Veda Structure?</h2>
                            <ul class="list-inside list-disc space-y-2">
                                <li>
                                    ✨ <strong>Authenticity from the Source</strong> – All rituals and remedies are performed as per authentic scriptures and traditions.
                                </li>
                                <li>
                                    ✨ <strong>Transparency & Integrity</strong> – No false promises. We guide only with truth, devotion, and responsibility.
                                </li>
                                <li>
                                    ✨ <strong>Personalized Approach</strong> – Every soul is unique, and so is the guidance we provide.
                                </li>
                                <li>
                                    ✨ <strong>Spiritual Energy</strong> – Rituals are performed in holy cities like Kashi, with full Vedic discipline and devotion.
                                </li>
                                <li>
                                    ✨ <strong>Trusted by Seekers Worldwide</strong> – From individuals to families, thousands of seekers trust us for astrology, puja, and spiritual guidance.
                                </li>
                            </ul>

                            <h2 class="mt-10 mb-3 text-2xl font-bold text-yellow-700">🌼 Our Vision</h2>
                            <p>We dream of a world where the wisdom of the Vedas becomes the guiding light of humanity. A world where every person can:</p>
                            <ul class="mt-2 list-inside list-disc space-y-2">
                                <li>Live with clarity instead of confusion.</li>
                                <li>Experience peace instead of stress.</li>
                                <li>Walk the path of prosperity without losing spiritual values.</li>
                                <li>Connect with the divine while fulfilling worldly duties.</li>
                            </ul>
                            <p class="mt-3">Through Veda Structure, we strive to awaken inner strength, heal karmic blocks, and spread the light of Sanatan Dharma to every corner of the world.</p>

                            <p class="mt-6 text-center font-semibold text-yellow-700">
                                🙏 Veda is the root. Dharma is the path. And with Veda Structure, we build the foundation of a divine and fulfilled life.
                            </p>
                        </section>
                    </div>
                    <AboutVidComp />
                </div>
            </div>

            <div className="container mx-auto my-12 w-[95%] items-center justify-center rounded-lg bg-red-900/5 px-4 pb-12">
                <div className="flex flex-col items-center justify-center p-6 py-12">
                    <h2 className="mb-1 text-2xl font-bold text-red-900">Our Services</h2>
                    <p className="flex justify-center text-orange-400">Explore our spiritual services to guide your journey toward inner peace and divine connection.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s1.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Astrology Consultations</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Our experienced pandits offer personalized consultations to help you understand your unique astrological profile, navigate life challenges, and make informed
                                    decisions.
                                </p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s2.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Horoscope Predictions</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>Get regular horoscope predictions on our website to gain insights into your daily, weekly, monthly, and yearly outlooks.</p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s3.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Vedic Products</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Explore our wide range of authentic Vedic products, including gemstones, rudraksha beads, yantras, and other spiritual items, delivered conveniently to your
                                    doorstep.
                                </p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s4.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Informative Blogs</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>Access our comprehensive library of informative blogs covering various aspects of astrology, spirituality, and Vedic wisdom to enhance your knowledge.</p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s5.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Online Courses</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>Deepen your astrological knowledge and understanding with our comprehensive online courses led by our expert pandits.</p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s6.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Online Puja Services</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Experience the convenience of our online puja services. Our knowledgeable pandits will perform pujas on your behalf according to your specific needs and traditions.
                                </p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s7.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Online Pandit Services</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Connect with our experienced pandits for personalized guidance and assistance with various aspects of Hinduism, including puja ceremonies, sloka recitations, and
                                    spiritual counseling.
                                </p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s8.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Puja In Varanasi</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Fulfill your desire to perform pujas in the holy city of Varanasi. We offer puja services performed by our pandits in Varanasi, adhering to the specific guidelines
                                    outlined in the Kashi Khand.
                                </p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-red-900">
                                <img src={"/images/Services_img/s9.png"} alt="" className="h-15 w-15" />
                            </span>
                            <h1 className="text-lg font-semibold text-red-900">Rudraksha & Gemstones</h1>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p>We provide a curated selection of authentic rudraksha beads and gemstones, each chosen for its specific qualities and potential benefits.</p>
                            </div>
                            <div className="pt-5 text-base leading-7 font-semibold">
                                <p>
                                    <a href="#" className="text-yellow-500 transition-all duration-300 group-hover:text-white">
                                        Read the docs &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Stat />

            <div className="pt-8 text-gray-600 dark:text-gray-300" id="reviews">
                <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
                    <div className="mb-10 space-y-4 px-6 md:px-0">
                        <h2 className="pt-5 text-center text-2xl font-bold text-yellow-600 md:text-4xl dark:text-white">What Our Devotees Say.</h2>
                    </div>

                    <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">
                        {reviewsData.map((review, index) => (
                            <div
                                key={index}
                                className="aspect-auto rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-transform hover:scale-105 hover:bg-red-900/15 hover:text-red-950 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="flex gap-4">
                                    <img className="h-12 w-12 rounded-full" src={review.avatar} alt="user avatar" width="400" height="400" loading="lazy" />
                                    <div>
                                        <h6 className="text-lg font-medium text-gray-700 dark:text-white">{review.name}</h6>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">{review.title}</p>
                                    </div>
                                </div>
                                <p className="mt-8">{review.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto my-12 grid max-w-4xl grid-cols-1 gap-6 rounded-2xl border border-yellow-500 bg-white p-4 shadow-md sm:p-6 lg:grid-cols-6">
                {/* Review Form Section */}
                <div className="col-span-1 lg:col-span-4">
                    <form action="" method="POST" className="space-y-4">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Write a review</h2>
                        {/* Star Rating Inputs */}
                        <div className="mb-4 flex items-center justify-start space-x-1">
                            {/* 5-star rating */}
                            <input type="radio" id="5-stars" name="rating" value="5" className="hidden" />
                            <label htmlFor="5-stars" className="cursor-pointer text-2xl text-yellow-400 hover:scale-110">
                                ★
                            </label>
                            {/* 4-star rating */}
                            <input type="radio" id="4-stars" name="rating" value="4" className="hidden" />
                            <label htmlFor="4-stars" className="cursor-pointer text-2xl text-yellow-400 hover:scale-110">
                                ★
                            </label>
                            {/* 3-star rating */}
                            <input type="radio" id="3-stars" name="rating" value="3" className="hidden" />
                            <label htmlFor="3-stars" className="cursor-pointer text-2xl text-yellow-400 hover:scale-110">
                                ★
                            </label>
                            {/* 2-star rating */}
                            <input type="radio" id="2-stars" name="rating" value="2" className="hidden" />
                            <label htmlFor="2-stars" className="cursor-pointer text-2xl text-yellow-400 hover:scale-110">
                                ★
                            </label>
                            {/* 1-star rating */}
                            <input type="radio" id="1-star" name="rating" value="1" className="hidden" />
                            <label htmlFor="1-star" className="cursor-pointer text-2xl text-yellow-400 hover:scale-110">
                                ★
                            </label>
                        </div>
                        {/* Review Text Area */}
                        <textarea
                            id="review"
                            name="review"
                            rows="4"
                            required={true}
                            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Write your review"
                        ></textarea>
                        {/* Action Button */}
                        <div className="py-4 text-right">
                            <a href="/user" className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-white hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 focus:outline-none">
                                Login to Post Review
                            </a>
                        </div>
                    </form>
                </div>

                {/* Ratings Summary Section */}
                <div className="hidden flex-col space-y-4 lg:col-span-2 lg:flex">
                    {/* Overall Rating */}
                    <div className="flex items-center">
                        <span className="text-xl text-yellow-400">★★★★★</span>
                        <p className="ml-2 text-sm font-medium text-gray-900">4.7 out of 5</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500">4.7 global ratings</p>

                    {/* Individual Star Ratings Progress Bars */}
                    <div className="mt-2 flex items-center">
                        <span className="shrink-0 text-sm font-medium text-blue-600 hover:underline">5 star</span>
                        <div className="mx-2 h-4 w-3/4 rounded bg-gray-200">
                            <div className="h-4 rounded bg-yellow-400" style={{ width: "50%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">50%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="shrink-0 text-sm font-medium text-blue-600 hover:underline">4 star</span>
                        <div className="mx-2 h-4 w-3/4 rounded bg-gray-200">
                            <div className="h-4 rounded bg-yellow-400" style={{ width: "25%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">25%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="shrink-0 text-sm font-medium text-blue-600 hover:underline">3 star</span>
                        <div className="mx-2 h-4 w-3/4 rounded bg-gray-200">
                            <div className="h-4 rounded bg-yellow-400" style={{ width: "10%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">10%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="shrink-0 text-sm font-medium text-blue-600 hover:underline">2 star</span>
                        <div className="mx-2 h-4 w-3/4 rounded bg-gray-200">
                            <div className="h-4 rounded bg-yellow-400" style={{ width: "5%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">5%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="shrink-0 text-sm font-medium text-blue-600 hover:underline">1 star</span>
                        <div className="mx-2 h-4 w-3/4 rounded bg-gray-200">
                            <div className="h-4 rounded bg-yellow-400" style={{ width: "10%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">10%</span>
                    </div>
                </div>
            </div>

            {/* <div className="container mx-auto mt-10 mb-10 flex h-[400px] max-w-4xl animate-[gradient-animation_10s_ease-in-out_infinite] items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 bg-[length:200%_200%] text-5xl font-extrabold text-white sm:h-[200px]">
                <div className="flex flex-col items-center justify-between gap-10 sm:flex-row">
                    <div>
                        <img src={"/images/phone_app/m_app.png"} alt="" className="align-left mt-[-40px] h-50 w-30 transform transition duration-300 ease-in-out hover:rotate-5" />
                    </div>
                    <div className="mt-[-40px] text-center">
                        <h1 className="text-3xl font-bold text-red-900">Download Our Mobile App</h1>
                        <p className="mt-2 text-lg text-white">Get access to exclusive offers and a seamless shopping experience.</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <img src={"/images/phone_app/G_play.png"} alt="Google Play Store" className="h-10 w-32 transform cursor-pointer transition duration-300 ease-in-out hover:scale-105" />
                            <img src={"/images/phone_app/App_store.png"} alt="Apple App Store" className="h-10 w-32 transform cursor-pointer transition duration-300 ease-in-out hover:scale-105" />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default page

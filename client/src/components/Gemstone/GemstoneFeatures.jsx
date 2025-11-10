"use client"
import { motion } from "framer-motion"

const eliteFeatures = [
    {
        image: "https://cdn.dhanshreegems.com/wysiwyg/natural_gemstones_1_.png",
        title: "100% Natural & Untreated",
        desc: "Every gemstone is guaranteed to be free from heat or chemical enhancements, preserving its true, natural beauty.",
    },
    {
        image: "https://cdn.dhanshreegems.com/wysiwyg/lab_certified.png",
        title: "Certified Purity & Origin",
        desc: "We provide official lab certification from leading authorities to assure you of the stone's quality and authenticity.",
    },
    {
        image: "https://cdn.dhanshreegems.com/wysiwyg/Direct_from_mines_1.png",
        title: "Ethical Direct Sourcing",
        desc: "By sourcing directly from vetted mines, we ensure ethical practices and offer you unmatched value and transparency.",
    },
    {
        image: "https://cdn.dhanshreegems.com/wysiwyg/world_wide_shipping.png",
        title: "Fully Insured Global Transit",
        desc: "Enjoy peace of mind knowing your precious investment is fully insured and handled with care until it reaches your door.",
    },
]

export default function EliteGemstoneFeatures() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-100 py-20">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,150,0.2),transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
                    <p className="mb-3 text-sm font-medium tracking-widest text-amber-600 uppercase">Our Foundation</p>
                    <h2 className="text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">The Pillars of Our Promise</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">Experience gemstone perfection through integrity, authenticity, and excellence.</p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {eliteFeatures.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="flex items-start space-x-6 rounded-2xl border border-amber-100 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
                        >
                            {/* Image with glow */}
                            <div className="relative h-16 w-16 flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-amber-100 opacity-40 blur-lg" />
                                <img src={item.image} alt={item.title} className="relative h-16 w-16 object-contain transition-transform duration-300 hover:scale-110" />
                            </div>

                            {/* Text Content */}
                            <div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                                <p className="leading-relaxed text-gray-600">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-amber-200 text-center"
        >
          <p className="text-sm text-gray-600">
            Browse our curated collection and experience the difference true quality makes.
          </p>
          <button className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium shadow-md hover:from-amber-500 hover:to-orange-600 transition-all duration-300">
            Explore Collection
          </button>
        </motion.div> */}
            </div>
        </section>
    )
}

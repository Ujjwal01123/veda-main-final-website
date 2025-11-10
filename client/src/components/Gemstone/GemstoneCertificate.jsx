"use client"
import { motion } from "framer-motion"

// Remaining feature set (icons are kept, but colors will be controlled by CSS)
const features = [
    {
        icon: "💎",
        title: "Global Certification",
        desc: "Verified for trusted authenticity by international labs.",
    },
    {
        icon: "🛡",
        title: "Premium Quality",
        desc: "Each stone hand-selected for exceptional brilliance and purity.",
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
}

export default function CertifiedStonesSection() {
    return (
        <motion.section
            className="relative flex min-h-screen flex-col items-center justify-center gap-0 overflow-hidden bg-gray-50 px-0 md:flex-row md:px-16"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            {/* Modern Blurs - Changed from Pink to Gold/Blue */}
            <div className="pointer-events-none absolute top-[-120px] left-[-50px] h-[350px] w-[350px] rounded-full bg-amber-200 opacity-30 blur-3xl"></div>
            <div className="pointer-events-none absolute right-[-100px] bottom-[-80px] h-[300px] w-[450px] rounded-full bg-blue-200 opacity-25 blur-2xl"></div>

            {/* Certificate Image - Hover Effect Removed */}
            <motion.div
                className="z-10 flex min-h-[80vh] w-full items-center justify-center md:w-1/2"
                // style={{ minHeight: "90vh" }} // Keep as is or remove for more control
                transition={{ type: "spring", stiffness: 190 }}
            >
                <motion.img
                    src="https://imgcdn1.gempundit.com/media/wysiwyg/grsss-bg-img-040324.webp?imgeng=/w_960/f_webp/cmpr_20/s_7&aio-w=960"
                    alt="Gemstone Certificate"
                    // Removed all pink/rose border classes. Used border-amber-400 for a premium gold accent.
                    className="max-h-[90vh] w-auto rounded-2xl border-4 border-amber-400/80 bg-white object-contain shadow-2xl"
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </motion.div>

            {/* Info & Features */}
            <motion.div
                className="z-10 flex w-full flex-col items-center justify-center gap-8 px-6 py-12 text-center md:w-1/2 md:items-start md:text-left"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 1.2 }}
            >
                <motion.h2
                    // Changed text-pink-600 to text-amber-600
                    className="tracking-tightest mt-8 text-4xl font-extrabold text-amber-600 drop-shadow-sm md:mt-0 md:text-5xl"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    The Seal of Authenticity
                </motion.h2>
                <motion.p className="max-w-lg text-xl leading-relaxed font-normal text-gray-700 md:text-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    Every gemstone comes with our guarantee—certified by world-renowned laboratories, ensuring clarity and value beyond compare.
                </motion.p>

                {/* Features Grid - Refined Colors and Hover */}
                <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {features.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            // Changed all pink/rose hover classes to blue/amber
                            className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition duration-300 hover:border-blue-400 hover:shadow-xl"
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                        >
                            {/* Icon */}
                            <div className="mb-2 text-4xl text-blue-600">{icon}</div>
                            {/* Title - Changed text-pink-600 to text-gray-900 for boldness */}
                            <div className="text-lg font-bold text-gray-900">{title}</div>
                            <div className="mt-1 text-sm font-light text-gray-600">{desc}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    )
}

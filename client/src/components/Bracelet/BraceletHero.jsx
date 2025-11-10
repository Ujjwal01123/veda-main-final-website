'use client'
import { motion } from 'framer-motion'
export default function BraceletHero() {
    return (
        <section className="relative flex items-center justify-center h-[600px] bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] overflow-hidden">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 blur-3xl opacity-30 animate-pulse"></div>

            <motion.img
                src="/images/brace.png"
                alt="Spiritual Bracelet"
                className="relative z-10 w-80 drop-shadow-2xl"
                animate={{ opacity: 1, y: [0, -15, 0], scale: 1 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-4 text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wide drop-shadow-lg">
                    Spiritual Bracelets
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                    Balance your energy, embrace divinity ✨
                </p>
            </motion.div>
        </section>
    )
}

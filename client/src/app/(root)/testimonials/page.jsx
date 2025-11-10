"use client"

import { motion } from "framer-motion"

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-20 md:px-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 h-56 w-56 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
                <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
                <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl">What Our Customers Say</h2>
                <p className="text-lg text-gray-600 italic">Real experiences from people who trust our products.</p>
                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex justify-center">
                <div className="w-full max-w-5xl rounded-3xl bg-white/60 p-4 shadow-2xl ring-1 ring-gray-200 backdrop-blur-lg">
                    <iframe src='https://widgets.sociablekit.com/google-reviews/iframe/25619836' frameborder='0' width='100%' height='1000'></iframe>
                </div>
            </motion.div>
        </section>
    )
}

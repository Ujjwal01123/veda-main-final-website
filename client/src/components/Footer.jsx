import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="relative mt-20 overflow-hidden">
            <div
                className="relative z-10 mx-auto -mb-20 w-[90%] max-w-5xl rounded-2xl bg-[#f4b61e] px-2 py-6 text-center text-white shadow-lg sm:w-[80%] sm:px-6 sm:py-10 md:w-[65%] md:px-8 md:py-12"
                data-aos="zoom-in-up"
                data-aos-delay="100"
                data-aos-duration="1200"
            >
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">UNLOCK 10% OFF YOUR FIRST ORDER</h2>
                <p className="mt-2 text-base sm:text-lg">Reveal coupon code by entering your email</p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row" data-aos="fade-up" data-aos-delay="400">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="h-10 w-full rounded-md border border-white/70 bg-transparent px-4 py-2 text-white placeholder-white/70 focus:outline-none sm:w-[300px] sm:px-8"
                    />
                    <button className="h-10 w-full rounded-md bg-green-500 px-6 py-2 font-semibold hover:bg-green-600 sm:w-auto sm:px-8">Reveal coupon</button>
                </div>
            </div>

            <div className="bg-[#081124] px-10 pt-28 pb-12 text-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
                    <div data-aos="fade-right" data-aos-delay="200">
                        <img src="/images/footer-logo.png" className="h-12" alt="Logo" />
                        <p className="mt-6 text-sm leading-relaxed text-gray-300">
                            We bring you authentic spiritual products like Rudraksha, healing bracelets, and sacred items, along with trusted Puja and Astrology services. Our aim is to guide you on
                            your spiritual journey with purity, devotion, and care.
                        </p>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="300">
                        <h3 className="mb-4 text-lg font-semibold">QUICK LINK</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/astrology" className="hover:text-yellow-300">
                                    Astrology
                                </Link>
                            </li>
                            <li>
                                <Link href="/bracelet" className="hover:text-yellow-300">
                                    Buy Bracelets
                                </Link>
                            </li>
                            <li>
                                <Link href="/rudraksha" className="hover:text-yellow-300">
                                    Buy Rudraksha
                                </Link>
                            </li>
                            <li>
                                <Link href="/yagya-puja" className="hover:text-yellow-300">
                                    Yagya Puja
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-yellow-300">
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="400">
                        <h3 className="mb-4 text-lg font-semibold">MORE</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="terms-and-condition" className="hover:text-white">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="privacy-policy" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="refund-policy" className="hover:text-white">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="shipping-policy" className="hover:text-white">
                                    Shipping Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div data-aos="fade-left" data-aos-delay="500">
                        <h3 className="mb-4 text-lg font-semibold">CONTACT US</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-yellow-300">
                                <Mail className="inline h-4 text-yellow-500" /> support@vedastructure.com
                            </li>
                            <li className="hover:text-yellow-300">
                                <Phone className="inline h-4 text-yellow-500" /> +91 9634876239
                            </li>
                            <li className="hover:text-yellow-300">
                                <FaWhatsapp className="inline h-4 w-6 text-yellow-500" /> +91 9621340116
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex justify-start gap-4 border-t border-white/20 pt-10" data-aos="fade-up" data-aos-delay="600">
                    <img src="/images/visa.jpg" className="h-7" alt="Visa" />
                    <img src="/images/paypal.jpg" className="h-7" alt="Paypal" />
                    <img src="/images/card.jpg" className="h-7" alt="Card" />
                </div>
            </div>

            <div className="relative z-20 flex flex-col items-center justify-between gap-3 overflow-hidden bg-[#111827] px-6 py-4 text-xs text-gray-300 md:flex-row">
                <div>© 2025 Rudraksha Store. All Rights Reserved.</div>
            </div>
        </footer>
    )
}

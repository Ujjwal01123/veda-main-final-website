import { Mail, Phone, MapPin, PhoneCall, Facebook, Instagram } from "lucide-react"

function page() {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100 px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    {/* Title */}
                    <h2 className="relative mb-4 text-center text-4xl font-extrabold text-yellow-800 md:text-5xl">
                        Get in Touch
                        <span className="mx-auto mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-md"></span>
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">We’d love to hear from you. Please fill out the form below or connect through our contact details.</p>

                    {/* Layout */}
                    <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Image Section */}

                        <div className="perspective-1000 relative flex items-center justify-center">
                            {/* Main Circle Image */}
                            <div className="transform-style-preserve-3d transition-transform duration-700">
                                <img
                                    src="/images/Contactus.jpg"
                                    alt="Main Ritual"
                                    className="h-72 w-72 rounded-full border-none object-cover shadow-2xl transition-transform duration-500 hover:scale-105 md:h-96 md:w-96"
                                    style={{
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.2)",
                                    }}
                                />
                            </div>

                            {/* Small Overlapping Image */}
                            <div className="transform-style-preserve-3d absolute right-10 bottom-1 transition-transform duration-700">
                                <img
                                    src="/images/havan.jpg"
                                    alt="Badge"
                                    className="h-45 w-45 rounded-full border-none object-cover shadow-xl transition-transform duration-500 hover:scale-110"
                                    style={{
                                        boxShadow: "0 15px 30px rgba(0,0,0,0.3), inset 0 5px 10px rgba(255,255,255,0.15)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Form */}
                        <form className="relative space-y-6 rounded-2xl border border-yellow-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md">
                            {/* Floating Inputs */}
                            {/* {["name", "email", "phone"].map((field, idx) => (
                                <div key={idx} className="relative">
                                    <input
                                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                                        name={field}
                                        required
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="peer w-full border border-yellow-300 px-3 pt-5 pb-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-transparent"
                                        placeholder={field}
                                    />
                                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-600">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                </div>
                            ))} */}
                            <div className="relative">
                                <input
                                    type={"text"}
                                    name={"name"}
                                    required
                                    className="peer w-full rounded-lg border border-yellow-300 px-3 pt-5 pb-2 placeholder-transparent transition outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <label className="absolute top-1 left-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600">
                                    Name
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={"email"}
                                    name={"email"}
                                    required
                                    className="peer w-full rounded-lg border border-yellow-300 px-3 pt-5 pb-2 placeholder-transparent transition outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <label className="absolute top-1 left-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600">
                                    Email
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={"number"}
                                    name={"mobile"}
                                    required
                                    className="peer w-full rounded-lg border border-yellow-300 px-3 pt-5 pb-2 placeholder-transparent transition outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <label className="absolute top-1 left-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600">
                                    Mobile
                                </label>
                            </div>
                            <div className="relative">
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    className="peer w-full rounded-lg border border-yellow-300 px-3 pt-5 pb-2 placeholder-transparent transition outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="Message"
                                />
                                <label className="absolute top-0 left-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600">
                                    Message
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 py-3 font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                            >
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { icon: <Mail />, title: "Email", detail: "support@vedastructure.com" },
                            { icon: <Phone />, title: "Phone", detail: "+91 9634876239" },
                            { icon: <MapPin />, title: "Address", detail: "Varanasi, Uttar Pradesh 221001" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 rounded-xl border border-yellow-200 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <span className="text-2xl text-orange-500">{item.icon}</span>
                                <div>
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map Section */}
                    <div className="mb-20">
                        <h3 className="relative mx-auto mb-8 inline-block text-center text-3xl font-bold text-yellow-900">
                            Find Us on the Map
                            <span className="mx-auto mt-2 block h-1 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></span>
                        </h3>

                        <div className="group relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-yellow-200/70 shadow-2xl backdrop-blur-md">
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.011058690995!2d83.0107637746288!3d25.31764527763627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e1f3a03f4b9%3A0x3f8f3c7!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1725625738291!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-3xl"
                            />
                            {/* Animated Overlay */}
                        </div>

                        <p className="mt-5 text-center text-lg text-gray-700">We’re just a click away – come visit us anytime!</p>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-10 flex justify-center gap-8">
                        <a
                            href={"#"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative transform rounded-2xl bg-green-500 p-6 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-3 hover:shadow-2xl`}
                        >
                            {/* Glow effect */}
                            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-md transition-opacity group-hover:opacity-100"></span>
                            <PhoneCall />
                        </a>
                        <a
                            href={"#"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative transform rounded-2xl bg-pink-500 p-6 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-3 hover:shadow-2xl`}
                        >
                            {/* Glow effect */}
                            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-md transition-opacity group-hover:opacity-100"></span>
                            <Facebook />
                        </a>
                        <a
                            href={"#"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative transform rounded-2xl bg-blue-500 p-6 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-3 hover:shadow-2xl`}
                        >
                            {/* Glow effect */}
                            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-md transition-opacity group-hover:opacity-100"></span>
                            <Instagram />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page

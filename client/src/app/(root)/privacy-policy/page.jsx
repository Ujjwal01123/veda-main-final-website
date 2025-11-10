import Link from "next/link"

export const metadata = {
    title: "Privacy Policy | Veda Structure",
}

function page() {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-100 py-16 px-6">
                <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-yellow-200">
                    <h1 className="text-4xl font-extrabold text-yellow-800 mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-700 mb-4">
                        Your privacy is important to us. This Privacy Policy explains how we
                        collect, use, and protect your personal information when you use our
                        website and services.
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-700 mt-6 mb-2">
                        1. Information We Collect
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We may collect your name, email address, phone number, and other
                        details when you fill forms, contact us, or use our services.
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-700 mt-6 mb-2">
                        2. How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>To provide and improve our services</li>
                        <li>To respond to your inquiries</li>
                        <li>To send updates, offers, and promotions</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-yellow-700 mt-6 mb-2">
                        3. Data Protection
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We implement strong security measures to keep your information safe.
                        However, please note that no method of transmission over the internet
                        is 100% secure.
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-700 mt-6 mb-2">
                        4. Third-Party Services
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We may use third-party tools (e.g., Google Analytics) that collect
                        non-personal data to help us understand user behavior.
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-700 mt-6 mb-2">
                        5. Changes to This Policy
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We may update our Privacy Policy from time to time. Any changes will
                        be posted on this page with the updated date.
                    </p>

                    <p className="text-gray-700 mt-6">📅 Last Updated: September 2025</p>

                    {/* Closing Section */}
                    <div className="mt-10 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                        <h2 className="text-2xl font-bold text-yellow-800 mb-3">
                            Have Questions?
                        </h2>
                        <p className="text-gray-700 mb-4">
                            If you have any queries regarding our Privacy Policy or how we
                            handle your personal data, feel free to reach out.
                            We’re here to assist you.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page

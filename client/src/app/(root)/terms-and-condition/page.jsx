import Link from "next/link"

export const metadata = {
    title: "Terms & Conditions | Veda Structure",
}

function page() {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-16 px-6">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-yellow-200">
                    {/* Title */}
                    <h1 className="text-4xl font-extrabold text-yellow-800 mb-6 text-center">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-600 text-center mb-10">
                        Please read these terms and conditions carefully before using our website.
                    </p>

                    {/* Terms Content */}
                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by these
                                Terms and Conditions. If you do not agree, you must not use this website.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                2. Use of Website
                            </h2>
                            <p>
                                You agree to use the website only for lawful purposes. Any misuse, including
                                attempts to hack, exploit, or harm the platform, will result in termination of
                                access.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                3. Intellectual Property
                            </h2>
                            <p>
                                All content, designs, logos, and media are the property of our company unless
                                otherwise stated. Unauthorized reproduction or distribution is strictly
                                prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                4. Limitation of Liability
                            </h2>
                            <p>
                                We are not responsible for any damages, losses, or issues arising from the use
                                of this website. Use the platform at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                5. Changes to Terms
                            </h2>
                            <p>
                                We may update these Terms and Conditions from time to time. Continued use of
                                the website after changes implies acceptance of the updated terms.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page

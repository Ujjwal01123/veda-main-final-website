import Link from "next/link";

export const metadata = {
    title: "Refund Policy | Veda Structure",
};

function page() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-yellow-100 px-6 py-12">
                <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
                    {/* Heading */}
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">Refund Policy</h1>
                    <p className="mb-10 text-center text-gray-600">
                        At <span className="font-semibold text-yellow-500">VedaStructure</span>, we value our customers and their trust. Please read our refund policy carefully before making any
                        bookings or purchases.
                    </p>

                    {/* Policy Sections */}
                    <div className="space-y-6 leading-relaxed text-gray-700">
                        <section>
                            <h2 className="mb-2 text-xl font-semibold text-yellow-600">1. Eligibility for Refund</h2>
                            <p>
                                Refunds will be considered only in cases of incorrect payments, double transactions, or technical errors. Please note that consultation fees for astrologers, puja
                                services, and rituals are
                                <span className="font-medium"> non-refundable</span> once the service has been delivered or initiated.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-semibold text-yellow-600">2. Time Frame</h2>
                            <p>
                                Any refund requests must be raised within <span className="font-medium">7 working days</span> from the date of payment. Requests received after this time will not be
                                considered.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-semibold text-yellow-600">3. Mode of Refund</h2>
                            <p>
                                Approved refunds will be processed back to the <span className="font-medium">original payment method</span> used during the transaction. Please allow{" "}
                                <span className="font-medium">7-10 business days</span> for the amount to reflect in your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-semibold text-yellow-600">4. Non-Refundable Cases</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Change of mind after booking a service.</li>
                                <li>Services already delivered (consultation, puja, or ritual).</li>
                                <li>Failure to attend a scheduled consultation or puja.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-semibold text-yellow-600">5. Contact for Refunds</h2>
                            <p>
                                For refund-related queries, please contact us at: <br />
                                <span className="mt-2 block font-medium">📧 care@vedastructure.com</span>
                                <span className="block font-medium">📞 +91-9634876239</span>
                            </p>
                        </section>
                    </div>

                    {/* Footer note */}
                    <p className="mt-10 text-center text-sm text-gray-500">This Refund Policy is subject to change without prior notice. Please review it periodically for updates.</p>

                    {/* Any Query Section */}
                    <div className="mt-12 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Any Query?</h2>
                        <Link href="/contact" className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-yellow-600">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;

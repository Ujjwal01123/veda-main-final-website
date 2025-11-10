import Link from "next/link"

export const metadata = {
    title: "Shipping Policy | Veda Structure",
}

function page() {
    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-16 px-6">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-yellow-200">
                    {/* Title */}
                    <h1 className="text-4xl font-extrabold text-yellow-800 mb-6 text-center">
                        Shipping policy
                    </h1>
                    <p className="text-gray-600 text-center mb-10">
                        Thank you for choosing Veda Structure for your shopping needs. We strive to ensure a seamless delivery experience for all our customers. Please read through our detailed shipping policy below:
                    </p>

                    {/* Terms Content */}
                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                1. Local Shipping Charges (Within India):
                            </h2>
                            <p>
                                Orders below INR 999: A flat shipping rate is applied.
                            </p>
                            <p>
                                Orders above INR 999: Free shipping is offered.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                2. International Shipping Charges:
                            </h2>
                            <p>
                                Orders below 500$: A flat shipping fee is applied.
                            </p>
                            <p>
                                Orders above 500$: Free shipping is provided.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                3. Express Shipping (Dispatch within 2-5 Working Days):
                            </h2>
                            <p>
                                Orders below 500$: Express shipping is chargeable.
                            </p>
                            <p>
                                Orders above 500$: Free express shipping.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                4. Delivery Time:
                            </h2>
                            <p>
                                Metro Cities in India: Delivery within 7 working days.
                            </p>
                            <p>
                                Non-Metro Cities in India: Delivery within 10 working days.
                            </p>
                        </div>
                        <p><span className="font-semibold text-red-500">Note:{" "}</span>Delivery times are in addition to dispatch times. Most orders are dispatched within 2-5 working days using reputable shipping providers.</p>
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                5. Shipment Safety:
                            </h2>
                            <p>
                                All orders are meticulously checked and packed in tamper-proof packaging.
                            </p>
                            <p>
                                Every shipment is insured and traceable for your peace of mind.
                            </p>
                            <p>
                                Tracking details are shared via email once the order is dispatched.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                6. Tracking Shipments:
                            </h2>
                            <p>
                                All shipments are trackable online. The tracking details and links will be emailed to you upon dispatch.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                7. Customs Charges & Duties:
                            </h2>
                            <p>
                                Customers are responsible for any customs charges, duties, VAT, or related fees for international orders.
                            </p>
                            <p>
                                Veda Structure is not liable for these charges. We recommend contacting your local customs office for more information.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                                8. Returns & Customs Charges:
                            </h2>
                            <p>
                                For canceled or refused international orders after dispatch, customers will be liable for any customs duties and VAT incurred.
                            </p>
                            <p>
                                Items must clear all customs charges before being returned to Veda Structure for a refund.
                            </p>
                            <p>
                                If you have any further questions or concerns, please feel free to contact our customer support team at support@vedastructure.com.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">We thank you for shopping with Veda Structure!</p>
                            <p className="font-semibold">For any further questions or queries, please contact our customer support team.</p>
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

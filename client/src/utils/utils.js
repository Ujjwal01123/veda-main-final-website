import { createOrder, verifyPayment } from "@/apis/controllers/paymentController"
import { toast } from "sonner"

export function calculateDiscount(price, discountPercent) {
    if (!price || !discountPercent) return price

    const discountAmount = (price * discountPercent) / 100
    const finalPrice = price - discountAmount

    return Math.round(finalPrice) // or keep decimals if you want
}

export const handlePayment = async (amount, cart, user, clearCart, router) => {
    try {
        const res = await createOrder({ amount })

        if (!res.orderId) {
            toast.error("Something went wrong!")
            return
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: res.amount,
            currency: res.currency,
            name: "Veda Structure",
            description: "Checkout Payment",
            order_id: res.orderId,
            handler: async function (response) {
                const verifyResponse = await verifyPayment({
                    ...response,
                    userId: user._id,
                    products: cart.items.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                        energizationForm: item?.energizationForm,
                    })),
                })

                if (verifyResponse.success) {
                    router.push("/")
                    toast.success("✅ Payment Successful")
                    clearCart()
                } else {
                    toast.error("❌ Payment Verification Failed")
                }
            },
            theme: { color: "#F0B100" },
        }

        const razor = new window.Razorpay(options)
        razor.open()
    } catch (err) {
        toast.error(err.message)
    }
}

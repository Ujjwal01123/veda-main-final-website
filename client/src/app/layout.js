import { DM_Sans } from "next/font/google"
import ClientWrappers from "@/utils/ClientWrappers"
import "./globals.css"
import Script from "next/script"

export const metadata = {
    title: "Veda Structure",
    description: "Cool App",
    icons: {
        icon: "/images/favicon.png",
    },
}

export const viewport = {
    themeColor: "#f4b61e",
}

const dm_sans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm_sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light" data-scroll-behavior="smooth">
            <body className={`${dm_sans.variable} font-dm_sans antialiased`}>
                <ClientWrappers>{children}</ClientWrappers>

                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
            </body>
        </html>
    )
}

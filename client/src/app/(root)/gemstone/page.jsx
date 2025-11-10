import FAQSection from "@/components/Gemstone/FAQSection"
import CertifiedStonesSection from "@/components/Gemstone/GemstoneCertificate"
import EliteGemstoneFeatures from "@/components/Gemstone/GemstoneFeatures"
import GemstoneGrid from "@/components/Gemstone/GemstoneGrid"
import HeroSection from "@/components/Gemstone/HeroSection"
import MakingProcess from "@/components/Gemstone/MakingProcess"
import RareGemstoneSection from "@/components/Gemstone/RareGemstoneSection"
import Testimonails from "@/components/Gemstone/Testimonials"
import React from "react"

export default function Gemstone() {
    return (
        <>
            <HeroSection />
            <GemstoneGrid />
            <RareGemstoneSection />
            <MakingProcess />
            <Testimonails />
            <CertifiedStonesSection />
            <EliteGemstoneFeatures />
            <FAQSection />
        </>
    )
}

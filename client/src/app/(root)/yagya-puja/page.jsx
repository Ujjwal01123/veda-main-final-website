"use client"

import Footer from "@/components/Footer"
import Filter from "@/components/puja/inner/Filter"
import FilterHero from "@/components/puja/inner/FilterHero"
import Reviev from "@/components/puja/inner/Reviev"

function Puja() {
    return (
        <div className="bg-gray-50">
            <FilterHero />
            <Filter />

            <Reviev />
            <Footer />
        </div>
    )
}

export default Puja
